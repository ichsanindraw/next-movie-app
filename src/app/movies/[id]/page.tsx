import BackButton from "@components/BackButton";
import BlockInfo from "@components/BlockInfo";
import InfoDescription from "@components/InfoDescription";
import Label from "@components/Label";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MovieService } from "src/features/movies/services/movie.service";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function MovieDetailPage({ params }: Props) {
  const { id } = await params;

  const res = await MovieService.getDetail(id);
  const movie = res.data;

  if (movie.Response === "False") {
    notFound();
  }

  return (
    <main className="bg-neutral-950 text-white">
      <section className="relative h-screen md:h-[65vh] w-full">
        <div className="absolute top-6 left-6 z-20">
          <BackButton />
        </div>

        <Image
          src={
            movie.Poster !== "N/A" ? movie.Poster : "/poster-placeholder.png"
          }
          alt={movie.Title}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 px-6 pb-10">
          <div className="mx-auto max-w-6xl space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {movie.Title}
            </h1>

            <div className="flex flex-wrap gap-2">
              {movie.Genre.split(", ").map((genre) => (
                <Label key={genre}>{genre}</Label>
              ))}
              <Label>{movie.Year}</Label>
              <Label>{movie.Rated}</Label>
              <Label>{movie.Runtime}</Label>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-neutral-300">
              <span>IMDb ⭐ {movie.imdbRating}</span>
              <span>{movie.imdbVotes} votes</span>
              {movie.Metascore !== "N/A" && (
                <span>Metascore {movie.Metascore}</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* MARK: Content */}

      <section className="px-6 py-6">
        <div className="mx-auto max-w-6xl grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-6">
            <BlockInfo title="Story">
              <p className="text-neutral-300 leading-relaxed">{movie.Plot}</p>
            </BlockInfo>

            <BlockInfo title="Cast">
              <p className="text-neutral-400">{movie.Actors}</p>
            </BlockInfo>

            <BlockInfo title="Ratings">
              <div className="space-y-2">
                {movie.Ratings.map((rating) => (
                  <p key={rating.Source} className="text-neutral-300">
                    <span className="font-medium">{rating.Source}:</span>{" "}
                    {rating.Value}
                  </p>
                ))}
              </div>
            </BlockInfo>
          </div>

          <aside className="space-y-4 text-sm">
            <InfoDescription label="Director" value={movie.Director} />
            <InfoDescription label="Writer" value={movie.Writer} />
            <InfoDescription label="Language" value={movie.Language} />
            <InfoDescription label="Country" value={movie.Country} />
            <InfoDescription label="Awards" value={movie.Awards} />
            <InfoDescription label="Box Office" value={movie.BoxOffice} />
            <InfoDescription label="Production" value={movie.Production} />
          </aside>
        </div>
      </section>
    </main>
  );
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
