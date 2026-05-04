import { Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";

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
          <Sparkles aria-hidden width={18} height={18} className="text-plum-700" strokeWidth={1.75} />
          <span className="font-display text-[17px] font-semibold text-plum-700">Curated For You</span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/discover/attuned-with-me"
            className="rounded-full border border-plum-300/60 bg-paper/60 px-3 py-1.5 font-body text-[12px] font-medium text-plum-700 transition-colors hover:bg-lavender-50"
          >
            Attuned with me →
          </Link>
          <Link
            to="/polaris/weekly-review"
            className="rounded-full border border-plum-300/60 bg-paper/60 px-3 py-1.5 font-body text-[12px] font-medium text-plum-700 transition-colors hover:bg-lavender-50"
          >
            Weekly review →
          </Link>
        </div>
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
