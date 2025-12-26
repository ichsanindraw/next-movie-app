import { useEffect, useState } from "react";
import { MovieService } from "../features/movies/services/movie.service";
import {
  MovieListItem,
  SearchMovieResponse,
} from "../features/movies/types/movie";

type UseSearchAutocompleteOptions = {
  minLength?: number;
  limit?: number;
  debounce?: number;
};

export type UseSearchAutocompleteReturn = {
  suggestions: MovieListItem[];
  totalResults: number;
  loading: boolean;
  clear: () => void;
};

export const useSearchAutocomplete = (
  query: string,
  {
    minLength = 2,
    limit = 5,
    debounce = 350,
  }: UseSearchAutocompleteOptions = {}
): UseSearchAutocompleteReturn => {
  const [suggestions, setSuggestions] = useState<MovieListItem[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const value = query.trim();

    if (value.length < minLength) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await MovieService.search(value, 1);
        const data: SearchMovieResponse = res.data;

        if (data.Response === "True" && data.Search) {
          const total = Number(data.totalResults ?? 0);

          setSuggestions(data.Search.slice(0, limit));
          setTotalResults(total);
        } else {
          setSuggestions([]);
        }
      } catch {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, debounce);

    return () => clearTimeout(timer);
  }, [query, minLength, limit, debounce]);

  return {
    suggestions,
    totalResults,
    loading,
    clear: () => setSuggestions([]),
  };
};
