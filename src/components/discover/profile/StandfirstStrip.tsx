import type { PacingValue } from "@/data/discover_profile_detail_sample";

/**
 * StandfirstStrip (DR-045, DR-043). Single horizontal line rendered
 * directly under Photo 1 caption: "[intent] · [pacing] [dot-rhythm]".
 * Pacing glyph: 1/2/3 filled 4×4px Brand Violet circles for
 * Slow & deliberate / Open to depth / In the moment respectively.
 * sr-only text accompanies the dots for a11y parity (R2).
 */

const PACING_DOTS: Record<PacingValue, number> = {
  "Slow & deliberate": 1,
  "Open to depth": 2,
  "In the moment": 3,
};

const DOT_WORDS = ["one-dot", "two-dot", "three-dot"] as const;

export function StandfirstStrip({
  intent,
  pacing,
}: {
  intent: string;
  pacing: PacingValue;
}) {
  const dots = PACING_DOTS[pacing] ?? 2;
  const rhythmWord = DOT_WORDS[dots - 1];

  return (
    <div
      className="flex items-center justify-center gap-2"
      style={{
        padding: "18px 18px",
        fontFamily: "var(--font-body)",
        fontSize: "12px",
        fontWeight: 500,
        color: "#6B6280",
        letterSpacing: "0.04em",
        borderBottom: "0.5px solid #F5F0FF",
      }}
    >
      <span>{intent}</span>
      <span aria-hidden style={{ color: "#C0BCC9", fontSize: "12px" }}>·</span>
      <span>{pacing}</span>
      <span
        aria-hidden
        className="inline-flex items-center"
        style={{ gap: "3px", marginLeft: "2px" }}
      >
        {Array.from({ length: dots }).map((_, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              width: "4px",
              height: "4px",
              borderRadius: "9999px",
              background: "#6B21A8",
            }}
          />
        ))}
      </span>
      <span className="sr-only">{`Pacing: ${pacing} (${rhythmWord} rhythm)`}</span>
    </div>
  );
}