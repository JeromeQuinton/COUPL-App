import type { PacingValue } from "@/data/discover_profile_detail_sample";

/**
 * StandfirstStrip (DR-049, DR-043). Two lavender chips rendered
 * between Photo 1 and the About me card: [intent] [pacing ▪▪].
 * Pacing glyph: 1/2/3 filled 4×4px Brand Violet circles for
 * Slow & deliberate / Open to depth / In the moment respectively.
 * sr-only text accompanies the dots for a11y parity (R2).
 * Chip class string lifted verbatim per R1 (chip token reuse).
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
        padding: "20px 16px",
        borderBottom: "0.5px solid #F5F0FF",
      }}
    >
      <span className="bg-lavender-100 px-3 py-1.5 text-[12px] font-medium text-plum-700 rounded-full">
        {intent}
      </span>
      <span className="bg-lavender-100 px-3 py-1.5 text-[12px] font-medium text-plum-700 rounded-full inline-flex items-center gap-1.5">
        <span>{pacing}</span>
        <span
          aria-hidden
          className="inline-flex items-center"
          style={{ gap: "3px" }}
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
      </span>
    </div>
  );
}