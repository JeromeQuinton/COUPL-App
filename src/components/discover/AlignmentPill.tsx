import type { AlignmentBand } from "@/data/discover_feed_sample";

/**
 * AlignmentPill — DR-021 compliant.
 * The feed surfaces ALIGNMENT BANDS, never percentages. The label is
 * always visible so colour is supportive, not the differentiator.
 */
export function AlignmentPill({ band }: { band: AlignmentBand }) {
  return (
    <span
      className="inline-flex items-center border bg-transparent font-mono uppercase tracking-[0.12em] leading-none text-rust"
      style={{
        fontSize: "10px",
        padding: "4px 10px",
        borderColor: "color-mix(in srgb, var(--rust) 35%, transparent)",
        borderWidth: "1px",
      }}
      aria-label={`Alignment: ${band}`}
    >
      {band}
    </span>
  );
}
