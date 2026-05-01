import type { UserTier } from "@/lib/user_tier";

/**
 * FeedSubhead — italic Fraunces tagline + mono count, in line.
 *
 * Free tier  → "Today's three. No more, no less."  · 03 / {n}
 * Atelier    → "Your five today, hand-curated."     · 05 / {n}
 *
 * The denominator reflects the tier cap; the numerator reflects how
 * many cards are currently rendered (post-exclusions).
 */
export function FeedSubhead({
  tier,
  shown,
  cap,
}: {
  tier: UserTier;
  shown: number;
  cap: number;
}) {
  const copy =
    tier === "free"
      ? "Today's three. No more, no less."
      : "Your five today, hand-curated.";
  const fmt = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="flex items-baseline justify-between gap-3">
      <p className="text-h3 italic text-ink">{copy}</p>
      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-slate">
        {fmt(shown)} / {fmt(cap)}
      </span>
    </div>
  );
}
