import type { ReactNode } from "react";

/**
 * YouBackdrop — quietly premium ambient surface for the You / Settings
 * chapter (DR-040, DR-BRAND-V2-B). Calm cream-paper base with a low
 * lavender wash; `tone="serious"` shifts to a slightly cooler surface
 * for safety/pause flows.
 */
export function YouBackdrop({
  children,
  tone = "calm",
}: {
  children: ReactNode;
  tone?: "calm" | "serious";
}) {
  const bg =
    tone === "serious"
      ? "linear-gradient(180deg, color-mix(in oklab, var(--paper) 96%, var(--lavender-100)) 0%, var(--paper) 65%, color-mix(in oklab, var(--paper) 94%, var(--blush)) 100%)"
      : "linear-gradient(180deg, color-mix(in oklab, var(--paper) 92%, var(--blush)) 0%, color-mix(in oklab, var(--paper) 96%, var(--lavender-50)) 60%, color-mix(in oklab, var(--blush) 18%, var(--paper)) 100%)";
  return (
    <div
      className="relative"
      style={{ minHeight: "100dvh", background: bg }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[320px]"
        style={{
          background:
            "radial-gradient(110% 70% at 80% 0%, color-mix(in oklab, var(--lavender-100) 45%, transparent) 0%, transparent 70%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}