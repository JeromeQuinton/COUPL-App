type Props = {
  /** Centred label, e.g. "3–4". */
  value: string;
  /** Caption beneath the circle, e.g. "per week, on average". */
  caption?: string;
  /** Fraction of the ring filled, 0–1. */
  progress?: number;
};

/**
 * Small SVG ring used on the pace step. Plum stroke on a soft track,
 * with a centred numeric label. Visual reference: 01 Onboarding · Step 4.
 */
export function OnboardingProgressCircle({
  value,
  caption,
  progress = 0.7,
}: Props) {
  const size = 168;
  const stroke = 6;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = c * Math.max(0, Math.min(1, progress));

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            className="text-lavender-100"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${dash} ${c - dash}`}
            className="text-plum-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-display-xl text-ink">{value}</span>
        </div>
      </div>
      {caption ? (
        <p className="mt-3 text-body-sm text-slate">{caption}</p>
      ) : null}
    </div>
  );
}