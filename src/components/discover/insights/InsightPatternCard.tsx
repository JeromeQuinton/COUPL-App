type Props = {
  title: string;
  /** 0..100 score shown in the right gutter. */
  score: number;
  body: string;
};

/**
 * Premium pattern card used inside any RelationalInsightExplainer.
 * Paper surface with plum-300 hairline, score in plum-700 to the right.
 */
export function InsightPatternCard({ title, score, body }: Props) {
  const v = Math.round(Math.max(0, Math.min(100, score)));
  return (
    <article className="rounded-[16px] border border-plum-300/30 bg-paper/90 p-4 shadow-elev-1 backdrop-blur-sm">
      <header className="flex items-baseline justify-between gap-3">
        <h3 className="text-h2 text-ink">{title}</h3>
        <span
          aria-label={`Pattern strength ${v} out of 100`}
          className="font-body text-[15px] font-semibold tabular-nums text-plum-700"
        >
          {v}
        </span>
      </header>
      <p className="mt-1.5 text-body-sm text-slate">{body}</p>
    </article>
  );
}