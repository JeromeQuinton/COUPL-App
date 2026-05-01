import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

type Props = {
  /** Coach's first name. */
  coach?: string;
  /** Lesson title. */
  title: string;
  /** Optional 1–2 sentence preview. */
  preview?: string;
  /** Estimated read time, e.g. "4 min read". */
  readTime?: string;
  /** Day-of-week + time meta, e.g. "Tuesday, 9:14am". */
  when?: string;
  className?: string;
};

/**
 * "From Reni, your coach" card on /home. Editorial beeswax surface
 * with a serif lesson title and a quiet "N min read →" affordance.
 * Whole card is the link target.
 */
export function CoachCard({
  coach = "Reni",
  title,
  preview,
  readTime = "2 min read",
  when,
  className,
}: Props) {
  return (
    <Link
      to="/home/coach"
      className={cn(
        "group block rounded-[20px] bg-beeswax-100 p-5 transition-colors hover:bg-beeswax-300/60",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="flex h-9 w-9 items-center justify-center rounded-full bg-beeswax-300 text-ink text-body-sm font-semibold"
        >
          {coach.charAt(0)}
        </span>
        <div>
          <p className="text-label-mono">From {coach}, your coach</p>
          <p className="text-body-sm text-slate">
            {when ? `${when} · ${readTime}` : readTime}
          </p>
        </div>
      </div>
      <h3 className="mt-4 text-display-xl text-ink">{title}</h3>
      {preview ? (
        <p className="mt-2 text-body-md text-slate">{preview}</p>
      ) : null}
      <p className="mt-4 text-label-mono">{readTime} →</p>
    </Link>
  );
}