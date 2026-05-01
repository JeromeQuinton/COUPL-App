/**
 * CoachPromptCard — in-thread, beeswax surface, dashed plum/lavender
 * border. Visible only to the viewer ("only you can see this").
 * Provides gentle, context-aware guidance without interrupting flow.
 */
type Props = {
  title: string;
  body: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
};

export function CoachPromptCard({
  title,
  body,
  onPrimary,
  onSecondary,
}: Props) {
  return (
    <article
      role="note"
      aria-label="Coach guidance, visible only to you"
      className="rounded-[18px] border border-dashed border-plum-300/55 px-4 py-3.5 shadow-[0_1px_2px_rgba(143,94,156,0.08)]"
      style={{
        background:
          "linear-gradient(150deg, var(--beeswax-100) 0%, color-mix(in oklab, var(--beeswax-300) 35%, var(--beeswax-100)) 100%)",
      }}
    >
      <header className="flex items-center gap-2">
        <span
          aria-hidden
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-plum-300/25 text-[11px] font-semibold text-plum-700"
        >
          ✦
        </span>
        <p className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-plum-700">
          {title}
        </p>
      </header>
      <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink">{body}</p>
      {(onPrimary || onSecondary) && (
        <div className="mt-3 flex items-center gap-4">
          {onPrimary && (
            <button
              type="button"
              onClick={onPrimary}
              className="text-[13px] font-medium text-plum-700 hover:text-plum-500"
            >
              Got it
            </button>
          )}
          {onSecondary && (
            <button
              type="button"
              onClick={onSecondary}
              className="text-[13px] font-medium text-plum-500 hover:text-plum-700"
            >
              Show me how →
            </button>
          )}
        </div>
      )}
    </article>
  );
}