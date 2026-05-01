import type { ReactNode } from "react";

/**
 * GrowthBackdrop — calm, paper-on-blush ambient surface for the Growth
 * Hub chapter (DR-040, DR-BRAND-V2-B). Soft cream with a low lavender
 * wash at the top so editorial cards lift cleanly off the page.
 */
export function GrowthBackdrop({
  children,
  tone = "warm",
}: {
  children: ReactNode;
  tone?: "warm" | "editorial";
}) {
  // DR-040 / brand cohesion: Growth shares Discover's master gradient —
  // soft lavender → blush → pale plum — so the two surfaces feel born
  // from the same system. `tone="editorial"` keeps the same palette
  // with a slightly cooler top so editorial cards lift cleanly.
  const bg =
    tone === "editorial"
      ? "var(--gradient-ambient-editorial)"
      : "var(--gradient-ambient)";
  return (
    <div className="relative" style={{ minHeight: "100dvh", background: bg }}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
        style={{ background: "var(--gradient-ambient-radial-tr)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[360px]"
        style={{ background: "var(--gradient-ambient-radial-bl)" }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}