"use client";

import ScrollToTop from "@components/ScrollToTop";
import Toast from "@components/Toast";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MovieService } from "src/features/movies/services/movie.service";
import {
  MovieListItem,
  SearchMovieResponse,
} from "src/features/movies/types/movie";

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const observerTarget = useRef<HTMLDivElement>(null);

  const keyword = searchParams.get("q")?.trim() ?? "";

  const [movies, setMovies] = useState<MovieListItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>(keyword);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [selectedPoster, setSelectedPoster] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const fetchMovies = async (pageNumber: number, keyword: string = "") => {
    setLoading(true);

    try {
      const res = await MovieService.search(keyword, pageNumber);
      const data: SearchMovieResponse = res.data;

      console.log("data");
      console.log(data);

      if (data.Response === "True") {
        if (data?.Search) {
          setMovies((prev) =>
            pageNumber === 1 ? data.Search : [...prev, ...data.Search]
          );
          if (data.Search.length < 10) setHasMore(false);
        } else {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
        setToast(data.Error || "Failed to fetch movies");
      }
    } catch (error: any) {
      console.error(error);
      setToast(error?.message ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (keyword) {
      fetchMovies(page, keyword);
    }
  }, [page, keyword]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore && keyword) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0, rootMargin: "100px" }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [loading, hasMore, keyword]);

  const handleSearch = () => {
    const keyword = query.trim();
    if (!keyword) return;

    setPage(1);
    setMovies([]);

    router.push(`/?q=${encodeURIComponent(keyword)}`);
    fetchMovies(1, keyword);
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* MARK: Movie List */}
      <section className="px-6 py-12 md:px-12">
        <div className="sticky top-0 z-40 -mx-6 mb-6 bg-neutral-950/90 px-6 py-4 backdrop-blur md:-mx-12 md:px-12">
          <h2 className="mb-4 text-2xl font-semibold">Search Movies</h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex gap-2"
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies..."
              className="w-full rounded-lg bg-neutral-900 px-4 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-white/20"
            />
            <button
              type="submit"
              className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-neutral-200"
            >
              Search
            </button>
          </form>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {movies.map((movie, index) => (
            <div
              key={`${index}-${movie.imdbID}`}
              className="group cursor-pointer overflow-hidden rounded-xl bg-neutral-900"
            >
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-t-xl">
                <Image
                  src={
                    movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"
                  }
                  alt={movie.Title}
                  fill
                  onClick={() =>
                    movie.Poster !== "N/A" && setSelectedPoster(movie.Poster)
                  }
                  className="cursor-pointer object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                />
              </div>

              <div className="p-3">
                <h3
                  onClick={() => router.push(`/movies/${movie.imdbID}`)}
                  className="cursor-pointer text-sm font-medium line-clamp-1 hover:underline"
                >
                  {movie.Title}
                </h3>
                <p className="text-xs text-neutral-400">{movie.Year}</p>
              </div>
            </div>
          ))}
        </div>

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
          onClick={() => setSelectedPoster(null)}
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

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </main>
  );
}
