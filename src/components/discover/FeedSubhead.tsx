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
}: {
  tier: UserTier;
  shown: number;
}) {
  const copy =
    tier === "free"
      ? "Today's three. No more, no less."
      : "Your five today, hand-curated.";
  const fmt = (n: number) => String(n).padStart(2, "0");
  const editionSize = tier === "free" ? 3 : 5;
  const shownClamped = Math.min(shown, editionSize);

  return (
    <div className="flex items-baseline justify-between gap-3">
      <p
        className="font-display italic text-ink"
        style={{ fontSize: "16px", lineHeight: 1.3 }}
      >
        {copy}
      </p>
      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-slate">
        {fmt(shownClamped)} / {fmt(editionSize)}
      </span>
    </div>
  );
}
