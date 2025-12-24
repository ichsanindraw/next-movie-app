type Props = {
  title: string;
  children: React.ReactNode;
};

export default function BlockInfo({ title, children }: Props) {
  return (
    <div>
      <h2 className="mb-2 text-lg font-semibold">{title}</h2>
      {children}
    </div>
  );
}
