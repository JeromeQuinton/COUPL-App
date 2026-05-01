import { Sparkles } from "lucide-react";

/**
 * FeedHeader — top of /discover (DR-024).
 * Filters now live in <FeedFilterRow />. This component renders the
 * brand line, display heading, and the standing tone-setter pill.
 */
export function FeedHeader() {
  return (
    <header className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles aria-hidden width={18} height={18} className="text-ink" strokeWidth={1.75} />
          <span className="font-display text-[17px] font-semibold text-ink">Curated For You</span>
        </div>
        <span className="rounded-full border border-ink/60 bg-blush/60 px-3 py-1.5 font-body text-[12px] font-medium text-ink">
          Aligned · Mindful
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="font-display text-[28px] font-semibold leading-tight text-ink">
          Discover people who move at your pace.
        </h1>
        <p className="font-body text-[14px] leading-relaxed text-slate">
          Your feed of aligned profiles. Refine by intent, values, lifestyle, and pacing.
        </p>
      </div>
    </header>
  );
}
