import type { ReactNode } from "react";

/**
 * EventsBackdrop — warm cream + soft lavender ambient surface for the
 * Events chapter (DR-040, DR-BRAND-V2-B). `tone="dark"` switches to a
 * deep plum gradient used for the live check-in screen.
 */
export function EventsBackdrop({
  children,
  tone = "warm",
}: {
  children: ReactNode;
  tone?: "warm" | "dark";
}) {
  if (tone === "dark") {
    return (
      <div
        className="relative text-paper"
        style={{
          minHeight: "100dvh",
          background:
            "radial-gradient(120% 80% at 80% 0%, #4A1F55 0%, #2A0F33 55%, #16071C 100%)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
          style={{
            background:
              "radial-gradient(80% 60% at 50% -10%, rgba(255,233,163,0.15) 0%, transparent 70%)",
          }}
        />
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
          "linear-gradient(180deg, color-mix(in oklab, var(--paper) 92%, var(--blush)) 0%, color-mix(in oklab, var(--lavender-50) 70%, var(--paper)) 60%, color-mix(in oklab, var(--blush) 35%, var(--paper)) 100%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
        style={{
          background:
            "radial-gradient(120% 80% at 90% 0%, color-mix(in oklab, var(--lavender-100) 65%, transparent) 0%, transparent 70%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}