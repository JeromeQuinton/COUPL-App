import type { AlignmentBand } from "@/data/discover_feed_sample";

/**
 * AlignmentPill — DR-021 compliant.
 * The feed surfaces ALIGNMENT BANDS, never percentages. The label is
 * always visible so colour is supportive, not the differentiator.
 */
const STYLES: Record<AlignmentBand, { bg: string; text: string; border: string }> = {
  "Strongly Aligned": {
    bg: "bg-plum-500",
    text: "text-paper",
    border: "border-plum-700",
  },
  "Well Aligned": {
    bg: "bg-plum-300",
    text: "text-paper",
    border: "border-plum-300",
  },
  "Aligned": {
    bg: "bg-lavender-100",
    text: "text-plum-700",
    border: "border-plum-300/40",
  },
  "Early Signal": {
    bg: "bg-cloud",
    text: "text-slate",
    border: "border-line",
  },
};

export function AlignmentPill({ band }: { band: AlignmentBand }) {
  const s = STYLES[band];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 font-body text-[11px] font-medium leading-none ${s.bg} ${s.text} ${s.border}`}
      aria-label={`Alignment: ${band}`}
    >
      {band}
    </span>
  );
}
