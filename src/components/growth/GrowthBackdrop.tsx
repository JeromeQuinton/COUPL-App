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
  if (tone === "editorial") {
    return (
      <div
        className="relative"
        style={{
          minHeight: "100dvh",
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--paper) 88%, var(--blush)) 0%, var(--paper) 60%, color-mix(in oklab, var(--paper) 92%, var(--lavender-50)) 100%)",
        }}
      >
        <div className="relative">{children}</div>
      </div>
    );
  }
  return (
    <div
      className="relative"
      style={{
        minHeight: "100dvh",
        background:
          "linear-gradient(180deg, color-mix(in oklab, var(--paper) 90%, var(--blush)) 0%, color-mix(in oklab, var(--paper) 96%, var(--lavender-50)) 55%, color-mix(in oklab, var(--blush) 22%, var(--paper)) 100%)",
      }}
    >
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