import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

type Props = {
  /** 0–1, where 1 means "full bandwidth this week". */
  level: number;
  /** e.g. "Some bandwidth". */
  label: string;
  /** Short helper, e.g. "a handful of strong matches". */
  hint?: string;
  /** Days remaining in the current capacity window. */
  daysLeft?: number;
};

/**
 * Today's capacity card on /home.
 *
 * Editorial: paper surface on the peach base, ink keyline, plum bar.
 * Card body is a Link to the weekly check-in. Two inline secondary
 * actions ("Adjust" + "Pause for a week") sit beneath the bar.
 */
export function CapacityCard({ level, label, hint, daysLeft }: Props) {
  const pct = Math.round(Math.max(0, Math.min(1, level)) * 100);

  return (
    <div
      className="relative overflow-hidden rounded-[20px] border border-plum-300/30 p-5 shadow-elev-1"
      style={{
        background:
          "linear-gradient(160deg, var(--paper) 0%, color-mix(in oklab, var(--lavender-50) 90%, var(--paper)) 100%)",
      }}
    >
      {/* Quiet plum bloom in the bottom-right corner */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--plum-300) 30%, transparent) 0%, transparent 70%)",
        }}
      />

      <div className="relative flex items-center justify-between">
        <span className="text-label-mono">Today's capacity</span>
        {typeof daysLeft === "number" ? (
          <span className="text-body-sm text-slate">{daysLeft} days left</span>
        ) : null}
      </div>

      <p className="relative mt-3 text-h1 text-ink">
        {label}
        {hint ? <span className="text-ink"> — {hint}</span> : null}
      </p>

      <div
        className="relative mt-4 h-2 w-full overflow-hidden rounded-full"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Capacity ${pct} percent`}
        style={{
          background:
            "linear-gradient(90deg, color-mix(in oklab, var(--lavender-100) 80%, transparent) 0%, color-mix(in oklab, var(--lavender-50) 80%, transparent) 100%)",
        }}
      >
        <span
          className={cn("block h-full rounded-full")}
          style={{
            width: `${pct}%`,
            background:
              "linear-gradient(90deg, var(--plum-500) 0%, var(--plum-300) 100%)",
            boxShadow: "0 0 8px color-mix(in oklab, var(--plum-500) 35%, transparent)",
          }}
        />
      </div>

      <div className="relative mt-4 grid grid-cols-2 gap-2">
        <Link
          to="/home/check-in"
          className="flex h-10 items-center justify-center rounded-[10px] border border-plum-300/45 bg-paper/80 text-body-sm font-medium text-ink backdrop-blur-sm transition-colors hover:border-plum-500 hover:bg-paper"
        >
          Adjust
        </Link>
        <button
          type="button"
          className="flex h-10 items-center justify-center rounded-[10px] border border-plum-300/45 bg-paper/80 text-body-sm font-medium text-ink backdrop-blur-sm transition-colors hover:border-plum-500 hover:bg-paper"
        >
          Pause for a week
        </button>
      </div>
    </div>
  );
}