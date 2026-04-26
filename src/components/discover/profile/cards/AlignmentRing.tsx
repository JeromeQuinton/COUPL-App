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
};

export function AlignmentRing({
  value,
  label,
  stroke = "var(--plum-500)",
  size = 88,
  strokeWidth = 8,
  centerLabel,
}: AlignmentRingProps) {
  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  const v = Math.max(0, Math.min(100, value));
  const offset = c - (v / 100) * c;
  const display = centerLabel ?? `${v}%`;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
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
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </svg>
        <div
          className="absolute inset-0 flex items-center justify-center font-display text-[16px] font-semibold text-plum-700"
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
