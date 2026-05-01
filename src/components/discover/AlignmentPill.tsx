import type { AlignmentBand } from "@/data/discover_feed_sample";

/**
 * AlignmentPill — DR-021 compliant.
 * The feed surfaces ALIGNMENT BANDS, never percentages. The label is
 * always visible so colour is supportive, not the differentiator.
 */
const STYLES: Record<AlignmentBand, { bg: string; text: string; border: string }> = {
  "Strongly Aligned": {
    bg: "bg-transparent",
    text: "text-plum-500",
    border: "border-ink",
  },
  "Well Aligned": {
    bg: "bg-transparent",
    text: "text-plum-500",
    border: "border-slate",
  },
  Aligned: {
    bg: "bg-transparent",
    text: "text-plum-500",
    border: "border-stone",
  },
  "Early Signal": {
    bg: "bg-transparent",
    text: "text-plum-500",
    border: "border-stone",
  },
};

export function AlignmentPill({ band }: { band: AlignmentBand }) {
  const s = STYLES[band];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] leading-none ${s.bg} ${s.text} ${s.border}`}
      aria-label={`Alignment: ${band}`}
    >
      {band}
    </span>
  );
}
