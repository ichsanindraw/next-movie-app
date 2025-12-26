"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useMovies } from "@features/movies/hooks/useMovie";
import { MAX_SUGGESTIONS, MIN_QUERY_LENGTH } from "@constant";
import { useInfiniteScroll, useSearchAutocomplete } from "@hooks";
import MovieCard from "@features/movies/components/MovieCard";
import { EmptyState, ScrollToTop, Toast } from "@components";
import MovieSuggestionItem from "@features/movies/components/MovieSuggestionItem";

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const observerTarget = useRef<HTMLDivElement>(null);

  const urlQuery = searchParams.get("q")?.trim() ?? "";

  const [query, setQuery] = useState<string>(urlQuery);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const {
    movies,
    loading,
    hasMore,
    error,
    selectedPoster,
    loadMore,
    search,
    resetMovie,
    selectPoster,
  } = useMovies();

  const isTooShort =
    query.trim().length > 0 && query.trim().length < MIN_QUERY_LENGTH;

  useEffect(() => {
    if (!urlQuery) return;

    search(urlQuery);
  }, [urlQuery]);

  const {
    suggestions,
    totalResults,
    loading: autoLoading,
  } = useSearchAutocomplete(query, {
    minLength: MAX_SUGGESTIONS,
    limit: MIN_QUERY_LENGTH,
  });

  useInfiniteScroll({
    target: observerTarget,
    onLoadMore: () => loadMore(),
    hasMore,
    loading,
  });

  const handleSearch = () => {
    setShowSuggestions(false);
    const value = query.trim();

    search(value);
    router.push(`/?q=${encodeURIComponent(value)}`);
  };

  const handleClearButton = () => {
    setQuery("");
    resetMovie();
    router.push(`/`);
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="px-6 py-12 md:px-12">
        <div className="sticky top-0 z-40 -mx-6 mb-6 bg-neutral-950/90 px-6 py-4 backdrop-blur md:-mx-12 md:px-12">
          <h2 className="mb-4 text-2xl font-semibold">Search Movies</h2>

          <div className="w-full">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => {
                  const value = e.target.value;
                  setQuery(value);
                  setShowSuggestions(value.trim().length >= MIN_QUERY_LENGTH);
                }}
                onFocus={() => {
                  if (query.trim().length >= MIN_QUERY_LENGTH) {
                    setShowSuggestions(true);
                  }
                }}
                onBlur={() => {
                  setTimeout(() => setShowSuggestions(false), 150);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();

                    if (query.trim().length < MIN_QUERY_LENGTH) return;

                    handleSearch();
                  }

                  if (e.key === "Escape") {
                    setShowSuggestions(false);
                  }
                }}
                placeholder="Search movies..."
                className="w-full rounded-lg bg-neutral-900 pl-4 pr-10 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-white/20"
              />

              {/* Clear button */}
              {query && (
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={handleClearButton}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-neutral-400 hover:bg-neutral-800 hover:text-white"
                >
                  ✕
                </button>
              )}

              {/* Suggestions */}
              {showSuggestions && (suggestions.length > 0 || autoLoading) && (
                <div className="absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-lg bg-neutral-900 shadow-lg">
                  {autoLoading ? (
                    <div className="flex items-center gap-2 px-4 py-3 text-sm text-neutral-400">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-600 border-t-white" />
                      Searching…
                    </div>
                  ) : (
                    <>
                      {suggestions.map((movie, index) => (
                        <MovieSuggestionItem
                          key={`${index}-${movie.imdbID}`}
                          movie={movie}
                          onSelect={() => setShowSuggestions(false)}
                        />
                      ))}

                      {query.trim().length > 0 && (
                        <button
                          onMouseDown={handleSearch}
                          className="w-full px-4 py-2 text-left text-sm text-neutral-300 hover:bg-neutral-800"
                        >
                          🔍 Show all{" "}
                          <span className="font-semibold text-white">
                            {totalResults}
                          </span>{" "}
                          results for
                          <span className="ml-1 font-semibold text-white">
                            "{query}"
                          </span>
                        </button>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Error Message */}
            {isTooShort && (
              <p className="mt-1 text-xs text-red-400">
                Minimum {MIN_QUERY_LENGTH} characters required
              </p>
            )}
          </div>
        </div>

        {query.length > MIN_QUERY_LENGTH &&
        movies.length === 0 &&
        !loading &&
        suggestions.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {movies.map((movie, index) => (
              <MovieCard
                key={`${index}-${movie.imdbID}`}
                movie={movie}
                onPosterClick={selectPoster}
              />
            ))}
          </div>
        )}

        <div ref={observerTarget} className="flex justify-center py-10">
          {loading && (
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/20 border-t-white"></div>
          )}
          {!hasMore && movies.length > 0 && (
            <p className="text-sm text-neutral-500">No more movies to load.</p>
          )}
        </div>
      </section>

      {/* MARK: Modal */}

      {selectedPoster && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => selectPoster(null)}
        >
          <div className="relative h-[80vh] w-[60vw] max-w-md">
            <Image
              src={selectedPoster}
              alt="Poster Preview"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      <ScrollToTop threshold={600} />

      {error && <Toast message={error} />}
    </main>
  );
}
