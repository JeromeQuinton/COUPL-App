import { cn } from "@/lib/utils";

export type CapacityValue = "full" | "some" | "low";

type Option = {
  value: CapacityValue;
  label: string;
  hint: string;
};

const OPTIONS: Option[] = [
  {
    value: "full",
    label: "Full bandwidth",
    hint: "Show me everyone who's a fit.",
  },
  {
    value: "some",
    label: "Some bandwidth",
    hint: "A handful of strong recommendations only.",
  },
  {
    value: "low",
    label: "Low bandwidth",
    hint: "Pause discovery. Hold my place.",
  },
];

const DOT: Record<CapacityValue, string> = {
  full: "bg-success",
  some: "bg-plum-500",
  low: "bg-caution",
};

type Props = {
  value: CapacityValue | null;
  onChange: (v: CapacityValue) => void;
};

/**
 * Three stacked cards used on /onboarding/capacity. Selected card gets
 * a plum border + lavender wash; unselected cards stay paper. The dot
 * colour codes intent (full / some / low) without translating to a
 * "score" — calm, not gamified.
 */
export function CapacitySelector({ value, onChange }: Props) {
  return (
    <fieldset className="space-y-3">
      <legend className="sr-only">Capacity for the next 7 days</legend>
      {OPTIONS.map((opt) => {
        const checked = value === opt.value;
        return (
          <label
            key={opt.value}
            className={cn(
              "relative flex cursor-pointer items-start gap-4 rounded-[16px] border p-4 transition-colors",
              checked
                ? "border-plum-500 bg-lavender-50"
                : "border-line bg-paper hover:bg-cloud",
            )}
          >
            <input
              type="radio"
              name="capacity"
              value={opt.value}
              checked={checked}
              onChange={() => onChange(opt.value)}
              className="sr-only"
            />
            <span
              aria-hidden
              className={cn(
                "mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full",
                DOT[opt.value],
              )}
            />
            <div className="flex-1">
              <p className="text-body-md font-semibold text-ink">{opt.label}</p>
              <p className="mt-0.5 text-body-sm text-slate">{opt.hint}</p>
            </div>
          </label>
        );
      })}
    </fieldset>
  );
}