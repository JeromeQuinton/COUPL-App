import { Heart, Info } from "lucide-react";

/**
 * Compatibility pill (DR-013, DR-008).
 * Renders the exact % via the same precision rules as MetricDisplay
 * but in a more prominent shape. Tap on info dot opens the
 * "Compatibility" explanation sheet.
 */
export function CompatibilityPill({
  value,
  onInfo,
}: {
  value: number;
  onInfo: () => void;
}) {
  return (
    <div className="flex items-center justify-center">
      <div className="inline-flex items-center gap-2 rounded-full bg-paper px-4 py-2 shadow-elev-1">
        <Heart
          aria-hidden
          width={16}
          height={16}
          strokeWidth={2}
          className="text-plum-500"
          fill="currentColor"
        />
        <span className="font-display text-[15px] font-semibold text-plum-700">
          {value}% Compatibility
        </span>
        <button
          type="button"
          onClick={onInfo}
          aria-label="About compatibility"
          className="inline-flex h-4 w-4 items-center justify-center text-stone transition-colors hover:text-plum-500"
        >
          <Info aria-hidden width={13} height={13} strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}
