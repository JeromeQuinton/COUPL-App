import { useId } from "react";

export type RadarPoint = {
  /** Label rendered around the polygon, e.g. "Words". */
  label: string;
  /** 0..100 — distance from centre. */
  value: number;
};

type Props = {
  points: RadarPoint[];
  /** Optional caption shown beneath, e.g. "YOUR PATTERN". */
  caption?: string;
  /** Pixel size of the SVG viewBox. Defaults to 280. */
  size?: number;
};

/**
 * Lavender-fill / plum-outline radar polygon used by Connection Languages
 * and (later) any 5-axis psych dimension. Pure SVG, no chart lib.
 * Premium calm: soft grid, no axis numbers, label-only.
 */
export function ConnectionLanguageRadar({ points, caption, size = 240 }: Props) {
  const gradientId = useId();
  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.34;
  const labelRadius = radius + 22;

  const angleFor = (i: number) =>
    -Math.PI / 2 + (i * 2 * Math.PI) / points.length;

  const ringRatios = [0.25, 0.5, 0.75, 1];

  // Polygon vertices for each grid ring
  const ringPoly = (ratio: number) =>
    points
      .map((_, i) => {
        const a = angleFor(i);
        const x = cx + Math.cos(a) * radius * ratio;
        const y = cy + Math.sin(a) * radius * ratio;
        return `${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(" ");

  // The data polygon
  const dataPoly = points
    .map((p, i) => {
      const a = angleFor(i);
      const r = radius * Math.max(0, Math.min(100, p.value)) / 100;
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");

  return (
    <div
      className="relative overflow-hidden rounded-[22px] border border-plum-300/45 px-4 pt-5 pb-4 shadow-elev-1"
      style={{
        background:
          "linear-gradient(160deg, var(--paper) 0%, color-mix(in oklab, var(--lavender-50) 88%, var(--paper)) 60%, color-mix(in oklab, var(--lavender-100) 55%, var(--paper)) 100%)",
      }}
    >
      {/* Ambient glow behind chart */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--lavender-100) 55%, transparent) 0%, transparent 70%)",
        }}
      />
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="relative mx-auto block w-full max-w-[260px]"
        role="img"
        aria-label={`Connection language pattern across ${points.map((p) => p.label).join(", ")}`}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              stopColor="var(--lavender-100)"
              stopOpacity="0.85"
            />
            <stop
              offset="100%"
              stopColor="var(--plum-300)"
              stopOpacity="0.55"
            />
          </linearGradient>
        </defs>

        {/* Concentric grid rings */}
        {ringRatios.map((r) => (
          <polygon
            key={r}
            points={ringPoly(r)}
            fill="none"
            stroke="color-mix(in oklab, var(--plum-300) 22%, transparent)"
            strokeWidth={1}
          />
        ))}

        {/* Spokes */}
        {points.map((_, i) => {
          const a = angleFor(i);
          const x = cx + Math.cos(a) * radius;
          const y = cy + Math.sin(a) * radius;
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke="color-mix(in oklab, var(--plum-300) 18%, transparent)"
              strokeWidth={1}
            />
          );
        })}

        {/* Data polygon */}
        <polygon
          points={dataPoly}
          fill={`url(#${gradientId})`}
          stroke="var(--plum-500)"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />

        {/* Vertex dots */}
        {points.map((p, i) => {
          const a = angleFor(i);
          const r = radius * Math.max(0, Math.min(100, p.value)) / 100;
          const x = cx + Math.cos(a) * r;
          const y = cy + Math.sin(a) * r;
          return (
            <circle
              key={`dot-${i}`}
              cx={x}
              cy={y}
              r={2.5}
              fill="var(--plum-500)"
            />
          );
        })}

        {/* Labels */}
        {points.map((p, i) => {
          const a = angleFor(i);
          const x = cx + Math.cos(a) * labelRadius;
          const y = cy + Math.sin(a) * labelRadius;
          const anchor =
            Math.cos(a) > 0.25 ? "start" : Math.cos(a) < -0.25 ? "end" : "middle";
          return (
            <text
              key={`lbl-${i}`}
              x={x}
              y={y}
              fontSize={11}
              fontFamily="var(--font-body)"
              fontWeight={500}
              fill="var(--plum-700)"
              textAnchor={anchor}
              dominantBaseline="middle"
              style={{ letterSpacing: "0.02em" }}
            >
              {p.label}
            </text>
          );
        })}
      </svg>

      {caption ? (
        <div className="relative mt-3 flex items-center justify-center gap-2">
          <span
            aria-hidden
            className="h-px w-6"
            style={{
              background:
                "linear-gradient(90deg, transparent, color-mix(in oklab, var(--plum-300) 60%, transparent))",
            }}
          />
          <p className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-plum-700">
            {caption}
          </p>
          <span
            aria-hidden
            className="h-px w-6"
            style={{
              background:
                "linear-gradient(90deg, color-mix(in oklab, var(--plum-300) 60%, transparent), transparent)",
            }}
          />
        </div>
      ) : null}
    </div>
  );
}