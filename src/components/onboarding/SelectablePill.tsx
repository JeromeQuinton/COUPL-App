import { type ButtonHTMLAttributes } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  selected: boolean;
  label: string;
};

/**
 * Pill chip with two states. Selected: plum fill, paper text, with a
 * leading check glyph. Unselected: lavender-50 fill, ink text. Used by
 * the values step (and reusable by future taste/lifestyle pickers).
 */
export function SelectablePill({
  selected,
  label,
  className,
  ...rest
}: Props) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-body-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-300",
        selected
          ? "bg-plum-500 text-paper hover:bg-plum-700"
          : "bg-lavender-50 text-ink hover:bg-lavender-100",
        className,
      )}
      {...rest}
    >
      {selected ? <Check className="h-3.5 w-3.5" aria-hidden /> : null}
      <span>{label}</span>
    </button>
  );
}