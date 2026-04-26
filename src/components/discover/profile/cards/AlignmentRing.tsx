/**
 * AlignmentRing — circular ring visualisation, extracted from the
 * (now deprecated) BigFiveSnapshotCard. Reused by DifferencesCard
 * and available for future surfaces that need a single 0–100 metric
 * rendered as a ring with a centred percentage.
 */
export type AlignmentRingProps = {
  value: number;
  label?: string;
  /** stroke colour (CSS color). Defaults to plum-500 token. */
  stroke?: string;
  /** outer pixel size of the ring. */
  size?: number;
  /** stroke width in px. */
  strokeWidth?: number;
  /** override the centred text — defaults to `${value}%`. */
  centerLabel?: string;
  /** When true, applies the canonical COUPL brand gradient to the
   * progress stroke (DR-036). Single sanctioned product-UI moment —
   * currently AttuneSentConfirmation only. */
  brandGradient?: boolean;
};

export function AlignmentRing({
  value,
  label,
  stroke = "var(--plum-500)",
  size = 88,
  strokeWidth = 8,
  centerLabel,
  brandGradient = false,
}: AlignmentRingProps) {
  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  const v = Math.max(0, Math.min(100, value));
  const offset = c - (v / 100) * c;
  const display = centerLabel ?? `${v}%`;
  // Unique id so multiple rings on the page don't collide.
  const gradientId = `coupl-brand-gradient-${size}-${strokeWidth}`;
  const progressStroke = brandGradient ? `url(#${gradientId})` : stroke;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
          {brandGradient ? (
            <defs>
              <linearGradient
                id={gradientId}
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="0"
                x2={size}
                y2={size}
              >
                <stop offset="0%" stopColor="#1A0533" />
                <stop offset="35%" stopColor="#6B21A8" />
                <stop offset="75%" stopColor="#EC4899" />
                <stop offset="100%" stopColor="#FDF2F8" />
              </linearGradient>
            </defs>
          ) : null}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="var(--lavender-100)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={progressStroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </svg>
        <div
          className={`absolute inset-0 flex items-center justify-center font-display font-semibold ${
            brandGradient ? "text-white text-[28px]" : "text-plum-700 text-[16px]"
          }`}
          aria-label={label ? `${label} ${v}%` : `${v}%`}
        >
          {display}
        </div>
      </div>
      {label ? (
        <span className="font-body text-[12px] font-medium text-ink">{label}</span>
      ) : null}
    </div>
  );
}
