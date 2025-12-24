import { http } from "@lib/http";
import {
  MovieDetailResponse,
  MovieDetailResult,
  SearchMovieResponse,
} from "../types/movie";

export const MovieService = {
  search: (query: string, page = 1) =>
    http.get<SearchMovieResponse>("", {
      params: {
        s: query,
        t: "movie",
        page,
      },
    }),

  getDetail: (id: string) =>
    http.get<MovieDetailResult>("", {
      params: {
        i: id,
        plot: "full",
      },
    }),
};
