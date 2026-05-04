/**
 * RelationalBand — descriptive-label-only signal renderer.
 *
 * Replaces the deleted <MetricDisplay /> primitive (R4 Stream 1.1, DR-103).
 * No numbers, no progress bars, no role="progressbar". A relational signal
 * surfaces as one of five descriptive labels plus an optional one-line
 * elaboration in Polaris register.
 *
 * Map underlying numeric signal → label deterministically at the call site
 * (see `bandLabelFor` helper). The surface itself never sees the number.
 */

export type RelationalBandLabel =
  | "closely attuned"
  | "distinct rhythms noticed"
  | "shared presence"
  | "room for discovery"
  | "steady pace observed";

interface RelationalBandProps {
  label: RelationalBandLabel;
  /** Optional 1-line elaboration. Polaris register; never analytic. */
  context?: string;
  /** Optional small label rendered above (the dimension being described). */
  dimension?: string;
}

export function RelationalBand({ label, context, dimension }: RelationalBandProps) {
  return (
    <article aria-label={label} className="flex flex-col gap-1.5">
      {dimension && (
        <p className="font-body text-[10.5px] font-semibold uppercase tracking-[0.16em] text-plum-700/80">
          {dimension}
        </p>
      )}
      <p className="font-display text-[14px] italic text-plum-700">{label}</p>
      {context && (
        <p className="font-body text-[12.5px] leading-relaxed text-slate">
          {context}
        </p>
      )}
    </article>
  );
}

/**
 * Helper for deterministic numeric → descriptive mapping during refactor.
 * Phase 4 will compute the label upstream; until then call sites map at
 * the boundary so the surface itself never carries the integer.
 */
export function bandLabelFor(value: number): RelationalBandLabel {
  if (value >= 85) return "closely attuned";
  if (value >= 70) return "shared presence";
  if (value >= 55) return "steady pace observed";
  if (value >= 40) return "room for discovery";
  return "distinct rhythms noticed";
}
