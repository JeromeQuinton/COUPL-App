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
        "group relative block overflow-hidden rounded-[20px] border border-beeswax-300/60 p-5 shadow-elev-1 transition-shadow hover:shadow-elev-2",
        className,
      )}
      style={{
        background:
          "linear-gradient(155deg, var(--beeswax-100) 0%, color-mix(in oklab, var(--beeswax-300) 28%, var(--beeswax-100)) 60%, color-mix(in oklab, var(--plum-300) 8%, var(--beeswax-100)) 100%)",
      }}
    >
      {/* Editorial monogram seal — premium guidance feel */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--beeswax-300) 60%, transparent) 0%, transparent 70%)",
        }}
      />
      <div className="relative flex items-center gap-3">
        <span
          aria-hidden
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink text-body-sm font-semibold shadow-elev-1 ring-1 ring-plum-300/30"
          style={{
            background:
              "linear-gradient(135deg, var(--beeswax-300) 0%, color-mix(in oklab, var(--plum-300) 25%, var(--beeswax-300)) 100%)",
          }}
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
      <h3 className="relative mt-4 text-display-xl text-ink">{title}</h3>
      {preview ? (
        <p className="relative mt-2 text-body-md text-slate">{preview}</p>
      ) : null}
      <p className="relative mt-4 inline-flex items-center gap-1 text-label-mono">
        {readTime}
        <span
          aria-hidden
          className="transition-transform group-hover:translate-x-0.5"
        >
          →
        </span>
      </p>
    </Link>
  );
}