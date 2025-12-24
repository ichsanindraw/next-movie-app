type Props = {
  children: React.ReactNode;
};

export default function Label({ children }: Props) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
      {children}
    </span>
  );
}
