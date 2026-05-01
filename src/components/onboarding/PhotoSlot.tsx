import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  /** Tag rendered in the top-left corner (e.g. "Face"). */
  tag?: string;
  /** Whether this is a required slot (filled placeholder) or optional (dashed empty). */
  filled?: boolean;
  /** Background gradient class for the filled state. */
  gradientClass?: string;
  onClick?: () => void;
};

/**
 * Square photo slot used by the photos step. Two visual modes:
 * - filled: gradient placeholder with an optional corner tag (mirrors
 *   the reference's blue/green/honey blocks).
 * - empty: dashed lavender outline with a centred `+` icon.
 *
 * No upload backend yet — purely a visual stub.
 */
export function PhotoSlot({
  tag,
  filled = false,
  gradientClass,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative aspect-[4/5] w-full overflow-hidden rounded-[16px] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-300",
        filled
          ? "shadow-elev-1"
          : "border-2 border-dashed border-lavender-100 bg-paper hover:bg-lavender-50",
      )}
      aria-label={filled ? `Photo: ${tag ?? "filled"}` : "Add a photo"}
    >
      {filled ? (
        <>
          <div
            className={cn(
              "absolute inset-0",
              gradientClass ??
                "bg-gradient-to-br from-lavender-100 to-plum-300",
            )}
            aria-hidden
          />
          {tag ? (
            <span className="absolute left-2 top-2 rounded-full bg-paper/90 px-2 py-0.5 text-mono-sm uppercase tracking-[0.12em] text-ink">
              {tag}
            </span>
          ) : null}
        </>
      ) : (
        <span className="flex h-full w-full items-center justify-center text-plum-500">
          <Plus className="h-6 w-6" aria-hidden />
        </span>
      )}
    </button>
  );
}