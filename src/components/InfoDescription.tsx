type Props = {
  label: string;
  value: string;
};

export default function InfoDescription({ label, value }: Props) {
  if (!value || value === "N/A") return null;

  return (
    <p className="text-neutral-400">
      <span className="text-white font-medium">{label}:</span> {value}
    </p>
  );
}
