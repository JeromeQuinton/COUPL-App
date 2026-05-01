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
    <div className="rounded-[20px] border border-ink bg-paper p-5">
      <div className="flex items-center justify-between">
        <span className="text-label-mono">Today's capacity</span>
        {typeof daysLeft === "number" ? (
          <span className="text-body-sm text-slate">{daysLeft} days left</span>
        ) : null}
      </div>

      <p className="mt-3 text-h1 text-ink">
        {label}
        {hint ? <span className="text-ink"> — {hint}</span> : null}
      </p>

      <div
        className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-lavender-100"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Capacity ${pct} percent`}
      >
        <span
          className={cn("block h-full rounded-full bg-plum-500")}
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <Link
          to="/home/check-in"
          className="flex h-10 items-center justify-center rounded-[10px] border border-ink bg-paper text-body-sm font-medium text-ink transition-colors hover:bg-cloud"
        >
          Adjust
        </Link>
        <button
          type="button"
          className="flex h-10 items-center justify-center rounded-[10px] border border-ink bg-paper text-body-sm font-medium text-ink transition-colors hover:bg-cloud"
        >
          Pause for a week
        </button>
      </div>
    </div>
  );
}