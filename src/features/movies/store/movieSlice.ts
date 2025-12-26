import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MovieListItem, SearchMovieResponse } from "../types/movie";
import { MovieService } from "../services/movie.service";
import { RootState } from "@lib/store";

export interface MovieState {
  keyword: string;
  movies: MovieListItem[];
  page: number;
  loading: boolean;
  hasMore: boolean;
  error: string | null;
  selectedPoster: string | null;
}

const initialState: MovieState = {
  keyword: "",
  movies: [],
  page: 1,
  loading: false,
  hasMore: true,
  error: null,
  selectedPoster: null,
};

export const fetchMovies = createAsyncThunk<
  SearchMovieResponse,
  void,
  { state: RootState; rejectValue: string }
>("movies/fetchMovies", async (_, { getState, rejectWithValue }) => {
  const { keyword, page } = getState().movies;

  // 🔥 DEV-ONLY error simulation
  if (process.env.NODE_ENV === "development" && keyword === "__error__") {
    return rejectWithValue("Simulated API error");
  }

  try {
    const res = await MovieService.search(keyword, page);
    const data = res.data as SearchMovieResponse;

    if (data.Response === "False") {
      return rejectWithValue(data.Error ?? "No results found");
    }

    return data;
  } catch (error) {
    return rejectWithValue("Network error. Please try again.");
  }
});

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    searchMovies(state, action) {
      state.keyword = action.payload;
      state.movies = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
    resetMovies(state) {
      state.keyword = "";
      state.movies = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
    selectPoster(state, action) {
      state.selectedPoster = action.payload;
    },
    clearPoster(state) {
      state.selectedPoster = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.Response === "True") {
          const list = action.payload.Search ?? [];
          const total = Number(action.payload.totalResults ?? 0);

          state.movies = state.page === 1 ? list : [...state.movies, ...list];
          state.page += 1;
          state.hasMore = state.movies.length < total;
        } else {
          state.hasMore = false;
          state.error = action.payload.Error ?? "Failed to fetch movies";
        }
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.hasMore = false;
        state.error =
          (action.payload as string) ??
          action.error.message ??
          "Something went wrong. Please try again.";
      });
  },
});

export const {
  searchMovies,
  resetMovies,
  selectPoster,
  clearPoster,
  clearError,
} = movieSlice.actions;

export default movieSlice.reducer;
