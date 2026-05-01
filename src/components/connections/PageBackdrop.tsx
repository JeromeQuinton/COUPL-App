import type { ReactNode } from "react";

/**
 * PageBackdrop — shared blush/lavender ambient surface for all
 * Connections chapter screens. Keeps the chapter visually continuous
 * with Discover and Profile (DR-040). Scoped per-page; no global CSS.
 */
export function PageBackdrop({
  children,
  tone = "soft",
}: {
  children: ReactNode;
  tone?: "soft" | "deep";
}) {
  // DR-040 / brand cohesion: Connections shares the master ambient
  // gradient with Discover/Home/Growth/Profile. `tone="deep"` swaps to
  // the editorial variant for denser conversation surfaces.
  const bg =
    tone === "deep"
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