import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  /** 0–1, where 1 means "full bandwidth this week". */
  level: number;
  /** e.g. "Some bandwidth". */
  label: string;
  /** Short helper, e.g. "3 of 4 conversations active". */
  hint?: string;
};

/**
 * Today's capacity card on /home.
 *
 * Editorial: blush surface, plum bar, label-mono caption. Tapping the
 * whole card routes to the weekly check-in so the user can adjust.
 */
export function CapacityCard({ level, label, hint }: Props) {
  const pct = Math.round(Math.max(0, Math.min(1, level)) * 100);

  return (
    <Link
      to="/home/check-in"
      className="group block rounded-[20px] bg-blush p-5 transition-colors hover:bg-blush/80"
    >
      <div className="flex items-center justify-between">
        <span className="text-label-mono">Today's capacity</span>
        <ArrowRight className="h-4 w-4 text-plum-500 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </div>
      <p className="mt-3 text-display-xl text-ink">{label}</p>
      {hint ? <p className="mt-1 text-body-md text-slate">{hint}</p> : null}

      <div
        className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-paper/70"
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
    </Link>
  );
}