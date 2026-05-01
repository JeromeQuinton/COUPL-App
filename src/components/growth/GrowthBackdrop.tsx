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
      ? "linear-gradient(180deg, #F6E7F2 0%, #FCEEF0 45%, #EFE2F4 100%)"
      : "linear-gradient(180deg, #FCEEF0 0%, #F6E7F2 35%, #EFE2F4 100%)";
  return (
    <div className="relative" style={{ minHeight: "100dvh", background: bg }}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[360px]"
        style={{
          background:
            "radial-gradient(110% 70% at 85% 0%, color-mix(in oklab, var(--lavender-100) 55%, transparent) 0%, transparent 70%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}