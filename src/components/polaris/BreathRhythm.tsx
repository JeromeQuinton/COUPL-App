import type { PaceLabel, PacingDimension } from "@/data/coach_sample";

/**
 * BreathRhythm — soft animated band primitive for R3-23 pacing.
 *
 * One band per pace dimension (pace / presence / repair). Each band gently
 * rises and falls on a slow cycle — read as breath, not as data. Cadence is
 * 10 seconds (5–7 breaths/min, vagal-toning register; per Brand Steward
 * 2026-05-04 amendment to the original 6-second cycle in the brief).
 *
 * Labels are descriptive only ("steady", "spirited", "in a hurry",
 * "attuned", "needing repair"). Never numbered. Intensity drives only the
 * band's amplitude — it must not surface to the user.
 *
 * DR refs: DR-093 (locked).
 */

const BREATH_CYCLE_SECONDS = 10;

export function BreathRhythm({ bands }: { bands: PacingDimension[] }) {
  return (
    <div className="space-y-4">
      {bands.map((b, i) => (
        <Band key={b.band} band={b} delaySeconds={i * (BREATH_CYCLE_SECONDS / bands.length / 2)} />
      ))}
    </div>
  );
}

function Band({
  band,
  delaySeconds,
}: {
  band: PacingDimension;
  delaySeconds: number;
}) {
  const amplitude = Math.max(0.3, Math.min(1, band.intensity));
  return (
    <article className="overflow-hidden rounded-[18px] border border-line bg-paper p-4">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-label-mono">{BAND_LABEL[band.band]}</p>
        <p className="font-display text-[15px] italic text-plum-700">
          {band.label}
        </p>
      </div>
      <div className="mt-3 grid h-[64px] place-items-center">
        <div
          aria-hidden
          style={{
            width: "100%",
            height: `${Math.round(20 + amplitude * 30)}px`,
            background: bandGradientFor(band.label),
            borderRadius: "999px",
            transformOrigin: "center",
            animation: `coupl-breath ${BREATH_CYCLE_SECONDS}s ease-in-out infinite`,
            animationDelay: `${delaySeconds}s`,
            opacity: 0.85,
          }}
        />
      </div>
      <style>{`@keyframes coupl-breath {
        0%, 100% { transform: scaleY(0.65); }
        50% { transform: scaleY(1.05); }
      }`}</style>
    </article>
  );
}

const BAND_LABEL: Record<PacingDimension["band"], string> = {
  pace: "Pace",
  presence: "Presence",
  repair: "Repair",
};

function bandGradientFor(label: PaceLabel): string {
  if (label === "needing repair") {
    return "linear-gradient(90deg, color-mix(in oklab, var(--blush) 70%, var(--paper)) 0%, color-mix(in oklab, var(--beeswax-100) 70%, var(--paper)) 100%)";
  }
  if (label === "in a hurry" || label === "spirited") {
    return "linear-gradient(90deg, color-mix(in oklab, var(--lavender-100) 80%, var(--paper)) 0%, color-mix(in oklab, var(--blush) 60%, var(--paper)) 100%)";
  }
  return "linear-gradient(90deg, color-mix(in oklab, var(--lavender-100) 90%, var(--paper)) 0%, color-mix(in oklab, var(--plum-300) 50%, var(--paper)) 100%)";
}
