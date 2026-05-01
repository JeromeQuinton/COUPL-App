import { cn } from "@/lib/utils";

type Props = {
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
  /** Optional max selections — extras become disabled. */
  max?: number;
  legend?: string;
};

/**
 * Multi-select chip group used on the weekly check-in for "How are you,
 * actually?" Lavender-50 unselected, plum filled when selected. Mirrors
 * the chip language already used in the values onboarding step so the
 * interaction feels native to the app.
 */
export function EmotionalChipSelector({
  options,
  selected,
  onToggle,
  max,
  legend,
}: Props) {
  const isFull = typeof max === "number" && selected.length >= max;

  return (
    <fieldset>
      {legend ? <legend className="sr-only">{legend}</legend> : null}
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isSel = selected.includes(opt);
          const disabled = !isSel && isFull;
          return (
            <button
              key={opt}
              type="button"
              aria-pressed={isSel}
              disabled={disabled}
              onClick={() => onToggle(opt)}
              className={cn(
                "rounded-full px-4 py-2 text-body-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-300",
                isSel
                  ? "bg-plum-500 text-paper hover:bg-plum-700"
                  : "bg-lavender-50 text-ink hover:bg-lavender-100",
                disabled && "cursor-not-allowed opacity-50",
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}