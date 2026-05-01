import { type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
  hint: string;
  /** Pass `checked` from controlled state. */
  checked: boolean;
};

/**
 * Card-style radio used by the intent / pacing onboarding screens.
 *
 * Selected state mirrors the reference: lavender-50 fill, plum border,
 * plum filled circle indicator on the right. Unselected state: paper,
 * line-grey border, hollow indicator.
 */
export function ChoiceCard({
  label,
  hint,
  checked,
  className,
  ...rest
}: Props) {
  return (
    <label
      className={cn(
        "relative flex cursor-pointer items-start gap-4 rounded-[16px] border p-4 transition-colors",
        checked
          ? "border-plum-500 bg-lavender-50"
          : "border-line bg-paper hover:bg-cloud",
        className,
      )}
    >
      <input type="radio" checked={checked} className="sr-only" {...rest} />
      <div className="flex-1">
        <p className="text-body-md font-semibold text-ink">{label}</p>
        <p className="mt-1 text-body-sm text-slate">{hint}</p>
      </div>
      <span
        aria-hidden
        className={cn(
          "mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
          checked ? "border-plum-500" : "border-line",
        )}
      >
        <span
          className={cn(
            "h-2.5 w-2.5 rounded-full transition-opacity",
            checked ? "bg-plum-500 opacity-100" : "opacity-0",
          )}
        />
      </span>
    </label>
  );
}