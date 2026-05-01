import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

type Props = {
  /** Coach's first name. */
  coach?: string;
  /** Lesson title. */
  title: string;
  /** 1–2 sentence preview. */
  preview: string;
  /** Estimated read time, e.g. "4 min read". */
  readTime?: string;
  className?: string;
};

/**
 * "From Remi, your coach" card on /home. Editorial lavender surface
 * with a serif lesson title and a quiet "Read" affordance. Whole card
 * is the link target.
 */
export function CoachCard({
  coach = "Remi",
  title,
  preview,
  readTime = "4 min read",
  className,
}: Props) {
  return (
    <Link
      to="/home/coach"
      className={cn(
        "group block rounded-[20px] bg-lavender-50 p-5 transition-colors hover:bg-lavender-100",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="flex h-9 w-9 items-center justify-center rounded-full bg-plum-500 text-paper text-body-sm font-semibold"
        >
          {coach.charAt(0)}
        </span>
        <div>
          <p className="text-label-mono">From {coach}, your coach</p>
          <p className="text-body-sm text-slate">{readTime}</p>
        </div>
      </div>
      <h3 className="mt-4 text-display-xl text-ink">{title}</h3>
      <p className="mt-2 text-body-md text-slate">{preview}</p>
      <p className="mt-4 text-label-mono">Read →</p>
    </Link>
  );
}