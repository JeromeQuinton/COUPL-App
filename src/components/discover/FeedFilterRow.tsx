import { Lock, SlidersHorizontal } from "lucide-react";
import type { UserTier } from "@/lib/user_tier";

/**
 * Filter taxonomy per DR-025.
 *
 * - Intent + Distance: locked tier-defaults for free users (open upgrade
 *   sheet on tap); paid users open a picker (stub for now).
 * - Values / Lifestyle / Pacing: toggleable on feed.
 *   Free tier = single-select (one active at a time).
 *   Paid tier = multi-select (stackable).
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

const TOGGLES: ToggleFilter[] = ["Values", "Lifestyle", "Pacing"];

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
    <div className="flex flex-col gap-2.5" role="group" aria-label="Feed filters">
      <div className="flex flex-wrap gap-2">
        <LockedChip
          label={`Intent · ${intentLabel}`}
          locked={isFree}
          onTap={() => onLockedTap("Intent")}
        />
        <LockedChip
          label={`Distance · ${distanceLabel}`}
          locked={isFree}
          onTap={() => onLockedTap("Distance")}
        />
        {TOGGLES.map((f) => {
          const active = activeToggles.has(f);
          return (
            <button
              key={f}
              type="button"
              aria-pressed={active}
              onClick={() => onToggle(f)}
              className={
                active
                  ? "rounded-full bg-ink px-4 py-2 font-display text-[13px] font-medium text-blush shadow-elev-1"
                  : "rounded-full border border-ink bg-blush/60 px-4 py-2 font-display text-[13px] font-medium text-ink transition-colors hover:bg-blush"
              }
            >
              {f}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onMoreFilters}
        className="inline-flex items-center gap-1.5 self-start rounded-full px-2 py-1 font-body text-[13px] font-medium text-ink transition-colors hover:text-plum-500"
      >
        <SlidersHorizontal aria-hidden width={14} height={14} strokeWidth={1.75} />
        More filters
      </button>
    </div>
  );
}

function LockedChip({
  label,
  locked,
  onTap,
}: {
  label: string;
  locked: boolean;
  onTap: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onTap}
      className="inline-flex items-center gap-1.5 rounded-full border border-ink bg-blush/60 px-4 py-2 font-display text-[13px] font-medium text-ink transition-colors hover:bg-blush"
    >
      {locked && (
        <Lock aria-hidden width={12} height={12} strokeWidth={2} className="text-stone" />
      )}
      {label}
    </button>
  );
}
