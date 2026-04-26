import { Infinity as InfinityIcon } from "lucide-react";

/**
 * AttuneInfinityButton — secondary attune entry point. Light pink
 * rounded square with a plum infinity glyph. Module variant sits on
 * white card backgrounds (drop shadow); photo variant sits on photos
 * (semi-opaque white pill for legibility).
 */
export function AttuneInfinityButton({
  dimmed = false,
  variant,
  onTap,
  ariaLabel,
}: {
  dimmed?: boolean;
  variant: "module" | "photo";
  onTap: () => void;
  ariaLabel: string;
}) {
  const isPhoto = variant === "photo";
  return (
    <button
      type="button"
      onClick={dimmed ? undefined : onTap}
      aria-label={ariaLabel}
      aria-disabled={dimmed || undefined}
      disabled={dimmed}
      className={`relative inline-flex h-11 w-11 items-center justify-center rounded-2xl transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-plum-300 ${
        dimmed
          ? "pointer-events-none opacity-40"
          : "hover:scale-105 motion-reduce:hover:scale-100"
      }`}
      style={{
        background: isPhoto
          ? "rgba(255, 255, 255, 0.85)"
          : "var(--pink-100)",
        backdropFilter: isPhoto ? "blur(6px)" : undefined,
        WebkitBackdropFilter: isPhoto ? "blur(6px)" : undefined,
        boxShadow: dimmed
          ? "none"
          : isPhoto
            ? "0 1px 4px rgba(0,0,0,0.12)"
            : "var(--elevation-1)",
      }}
    >
      <InfinityIcon
        aria-hidden
        width={20}
        height={20}
        strokeWidth={2}
        className="text-plum-500"
      />
    </button>
  );
}