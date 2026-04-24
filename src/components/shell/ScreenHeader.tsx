type Props = {
  eyebrow?: string;
  title: string;
};

export function ScreenHeader({ eyebrow, title }: Props) {
  return (
    <header className="pt-2">
      {eyebrow && (
        <p className="text-body-sm uppercase tracking-[0.14em] text-stone">
          {eyebrow}
        </p>
      )}
      <h1 className="mt-1 text-h1 text-ink">{title}</h1>
    </header>
  );
}