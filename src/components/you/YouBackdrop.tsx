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
  // DR-040 / brand cohesion: Profile + safety surfaces share the master
  // ambient gradient with Discover/Home/Growth/Connections. `tone="serious"`
  // shifts to the editorial variant for safety/pause flows.
  const bg =
    tone === "serious"
      ? "var(--gradient-ambient-editorial)"
      : "var(--gradient-ambient)";
  return (
    <div
      className="relative"
      style={{ minHeight: "100dvh", background: bg }}
    >
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