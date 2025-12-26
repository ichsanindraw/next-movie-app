import Image from "next/image";

type Props = {
  title?: string;
  description?: string;
  imageSrc?: string;
};

export function EmptyState({
  title = "Movie not found",
  description = "Try using a different keyword",
  imageSrc = "/not-found.png",
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center text-neutral-400">
      <Image
        src={imageSrc}
        alt="Empty state"
        width={120}
        height={120}
        className="mb-4 opacity-70"
      />

      <h3 className="text-sm font-medium text-neutral-200">{title}</h3>

      {description && (
        <p className="mt-1 text-xs text-neutral-400">{description}</p>
      )}
    </div>
  );
}
