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
  const isDeep = tone === "deep";
  return (
    <div
      className="relative"
      style={{
        minHeight: "100dvh",
        background: isDeep
          ? "linear-gradient(180deg, color-mix(in oklab, var(--lavender-100) 70%, var(--blush)) 0%, color-mix(in oklab, var(--blush) 75%, var(--lavender-50)) 55%, color-mix(in oklab, var(--lavender-50) 85%, var(--paper)) 100%)"
          : "linear-gradient(180deg, color-mix(in oklab, var(--lavender-50) 80%, var(--paper)) 0%, color-mix(in oklab, var(--blush) 25%, var(--paper)) 100%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
        style={{
          background:
            "radial-gradient(120% 80% at 90% 0%, color-mix(in oklab, var(--lavender-100) 75%, transparent) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[360px]"
        style={{
          background:
            "radial-gradient(110% 70% at 5% 100%, color-mix(in oklab, var(--blush) 65%, transparent) 0%, transparent 70%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}