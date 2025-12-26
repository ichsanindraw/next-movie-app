"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MovieListItem } from "../types/movie";
import { FALLBACK_IMAGE } from "@constant";

type Props = {
  movie: MovieListItem;
  onSelect?: () => void;
};

export default function MovieSuggestionItem({ movie, onSelect }: Props) {
  const router = useRouter();
  const [imgSrc, setImgSrc] = useState(
    movie.Poster !== "N/A" && movie.Poster ? movie.Poster : FALLBACK_IMAGE
  );

  const handleSelect = () => {
    router.push(`/?q=${encodeURIComponent(movie.Title)}`);
    onSelect?.();
  };

  return (
    <div
      onMouseDown={handleSelect}
      className="flex cursor-pointer items-center gap-3 px-4 py-2 hover:bg-neutral-800"
    >
      <Image
        src={imgSrc}
        alt={movie.Title}
        width={30}
        height={45}
        className="rounded object-cover"
        onError={() => setImgSrc(FALLBACK_IMAGE)}
      />

      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{movie.Title}</p>
        <p className="text-xs text-neutral-400">{movie.Year}</p>
      </div>
    </div>
  );
}
