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
  /** Whether the Intent filter is currently constraining the feed. */
  intentActive?: boolean;
  /** Whether the Distance filter is currently constraining the feed. */
  distanceActive?: boolean;
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
  intentActive = true,
  distanceActive = true,
  activeToggles,
  onToggle,
  onLockedTap,
  onMoreFilters,
}: Props) {
  void tier;
  void onMoreFilters;
  return (
    <div className="flex w-full items-center justify-between gap-2" role="group" aria-label="Feed filters">
      <LockedKey
        label={collapseIntent(intentLabel)}
        active={intentActive}
        onTap={() => onLockedTap("Intent")}
      />
      <LockedKey
        label={collapseDistance(distanceLabel)}
        active={distanceActive}
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
  active,
  onTap,
}: {
  label: string;
  active: boolean;
  onTap: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onTap}
      className={
        active
          ? `${KEYLINE_BASE} gap-1.5 border-ink bg-ink text-blush`
          : `${KEYLINE_BASE} gap-1.5 border-ink bg-blush text-ink hover:bg-ink/5`
      }
    >
      {label}
    </button>
  );
}
