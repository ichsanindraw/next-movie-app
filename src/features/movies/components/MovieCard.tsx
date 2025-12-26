"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MovieListItem } from "../types/movie";
import { FALLBACK_IMAGE } from "@constant";

type Props = {
  movie: MovieListItem;
  onPosterClick: (poster: string) => void;
};

export default function MovieCard({ movie, onPosterClick }: Props) {
  const router = useRouter();
  const [imgSrc, setImgSrc] = useState(
    movie.Poster !== "N/A" ? movie.Poster : FALLBACK_IMAGE
  );

  return (
    <div className="group cursor-pointer overflow-hidden rounded-xl bg-neutral-900">
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-t-xl">
        <Image
          src={imgSrc}
          alt={movie.Title}
          priority
          fill
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          onClick={() =>
            imgSrc !== FALLBACK_IMAGE && onPosterClick(movie.Poster)
          }
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
        />
      </div>

      <div className="p-3">
        <h3
          onClick={() => router.push(`/movies/${movie.imdbID}`)}
          className="text-sm font-medium line-clamp-1 hover:underline"
        >
          {movie.Title}
        </h3>
        <p className="text-xs text-neutral-400">{movie.Year}</p>
      </div>
    </div>
  );
}
