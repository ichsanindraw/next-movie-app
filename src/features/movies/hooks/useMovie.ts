import { useCallback } from "react";
import {
  fetchMovies,
  resetMovies,
  selectPoster,
  clearPoster,
  clearError,
  MovieState,
  searchMovies,
} from "@features/movies/store/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@lib/store";

export type UseMoviesReturn = MovieState & {
  loadMore: () => void;
  search: (keyword: string) => void;
  resetMovie: () => void;
  selectPoster: (url: string | null) => void;
  clearPoster: () => void;
  clearError: () => void;
};

export const useMovies = (): UseMoviesReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state.movies);

  const search = (keyword: string) => {
    dispatch(searchMovies(keyword));
    dispatch(fetchMovies());
  };

  const loadMore = useCallback(() => {
    if (state.keyword.length === 0) return;

    if (state.loading || !state.hasMore) return;

    dispatch(fetchMovies());
  }, [state.loading, state.hasMore, state.page, dispatch]);

  return {
    ...state,

    loadMore,
    search,
    resetMovie: () => dispatch(resetMovies()),
    selectPoster: (url: string | null) => dispatch(selectPoster(url)),
    clearPoster: () => dispatch(clearPoster()),
    clearError: () => dispatch(clearError()),
  };
};
