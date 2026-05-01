import { SlidersHorizontal } from "lucide-react";
import type { UserTier } from "@/lib/user_tier";

/**
 * FeedFilterRow — editorial keyline filters (DR-BRAND-V2-A/D).
 *
 * Square 4px-radius keylines, mono uppercase labels. Active = ink fill +
 * blush text; inactive = blush fill + ink text. The leftmost
 * SlidersHorizontal icon button at the right end opens the More Filters
 * sheet (Lifestyle, etc.).
 *
 * Filter logic / state shape preserved — visual rebuild only.
 */

export type ToggleFilter = "Values" | "Lifestyle" | "Pacing";
export type LockedFilter = "Intent" | "Distance";

type Props = {
  tier: UserTier;
  intentLabel: string;
  distanceLabel: string;
  activeToggles: Set<ToggleFilter>;
  onToggle: (f: ToggleFilter) => void;
  onLockedTap: (f: LockedFilter) => void;
  onMoreFilters: () => void;
};

// "Lifestyle" overflows to the More Filters sheet — not surfaced here.
const VISIBLE_TOGGLES: ToggleFilter[] = ["Values", "Pacing"];

const KEYLINE_BASE =
  "inline-flex h-10 items-center justify-center rounded-[4px] border-[1.5px] px-3 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors";

export function FeedFilterRow({
  tier,
  intentLabel,
  distanceLabel,
  activeToggles,
  onToggle,
  onLockedTap,
  onMoreFilters,
}: Props) {
  const isFree = tier === "free";

  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Feed filters">
      <LockedKey
        label={collapseIntent(intentLabel)}
        onTap={() => onLockedTap("Intent")}
      />
      <LockedKey
        label={collapseDistance(distanceLabel)}
        onTap={() => onLockedTap("Distance")}
      />
      {VISIBLE_TOGGLES.map((f) => {
        const active = activeToggles.has(f);
        return (
          <button
            key={f}
            type="button"
            aria-pressed={active}
            onClick={() => onToggle(f)}
            className={
              active
                ? `${KEYLINE_BASE} border-ink bg-ink text-blush`
                : `${KEYLINE_BASE} border-ink bg-blush text-ink hover:bg-ink/5`
            }
          >
            {f.toUpperCase()}
          </button>
        );
      })}

      <button
        type="button"
        onClick={onMoreFilters}
        aria-label="More filters"
        className={`${KEYLINE_BASE} ml-auto border-ink bg-blush text-ink hover:bg-ink/5`}
      >
        <SlidersHorizontal aria-hidden width={14} height={14} strokeWidth={1.75} />
      </button>
    </div>
  );
}

function collapseIntent(label: string) {
  // "Long-term" / "Long Term" → "LONG-TERM"
  return label.replace(/\s+/g, "-").toUpperCase();
}

function collapseDistance(label: string) {
  // "25km" → "25 KM"
  return label.replace(/(\d+)\s*km/i, "$1 KM").toUpperCase();
}

function LockedKey({
  label,
  onTap,
}: {
  label: string;
  onTap: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onTap}
      className={`${KEYLINE_BASE} gap-1.5 border-ink bg-blush text-ink hover:bg-ink/5`}
    >
      {label}
    </button>
  );
}
