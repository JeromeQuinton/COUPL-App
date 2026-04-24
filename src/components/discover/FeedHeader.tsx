import { Sparkles } from "lucide-react";

const FILTERS = ["Intent", "Values", "Lifestyle", "Interests"] as const;
export type FeedFilter = (typeof FILTERS)[number];

type Props = {
  activeFilter: FeedFilter;
  onFilterChange: (f: FeedFilter) => void;
};

/**
 * FeedHeader — top of /discover (DR-019).
 * Filter chips are visually toggleable in Phase 1; they don't filter data yet.
 */
export function FeedHeader({ activeFilter, onFilterChange }: Props) {
  return (
    <header className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles aria-hidden width={18} height={18} className="text-plum-700" strokeWidth={1.75} />
          <span className="font-display text-[17px] font-semibold text-plum-700">Curated For You</span>
        </div>
        <span className="rounded-full border border-plum-300/60 bg-paper/60 px-3 py-1.5 font-body text-[12px] font-medium text-plum-700">
          Aligned · Mindful
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="font-display text-[28px] font-semibold leading-tight text-ink">
          Discover people who move at your pace.
        </h1>
        <p className="font-body text-[14px] leading-relaxed text-slate">
          Explore matches aligned in intent, values, lifestyle, and interests.
        </p>
      </div>

      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Feed filters">
        {FILTERS.map((f) => {
          const active = f === activeFilter;
          return (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onFilterChange(f)}
              className={
                active
                  ? "rounded-full bg-plum-500 px-5 py-2 font-display text-[14px] font-medium text-paper shadow-elev-1"
                  : "rounded-full border border-plum-300 bg-paper/60 px-5 py-2 font-display text-[14px] font-medium text-plum-700 transition-colors hover:bg-lavender-50"
              }
            >
              {f}
            </button>
          );
        })}
      </div>
    </header>
  );
}
