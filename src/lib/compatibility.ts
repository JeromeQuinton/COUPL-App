/**
 * Shared compatibility heuristics.
 *
 * Single source of truth for derived compatibility / alignment values
 * surfaced across the discover detail view (Compatibility Overview,
 * Differences). Phase 2 swaps the heuristic for the psych-validated
 * model — keeping the call sites stable means that swap is a
 * single-file edit here.
 */

// V0 PLACEHOLDER alignment heuristic — replace with psych-validated compatibility model in Phase 2
export function computeAlignment(viewerScore: number, profileScore: number): number {
  if (typeof viewerScore !== "number" || typeof profileScore !== "number") return 0;
  return Math.max(0, 100 - Math.abs(viewerScore - profileScore));
}
