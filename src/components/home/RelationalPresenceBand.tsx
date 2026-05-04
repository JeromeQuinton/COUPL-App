import { Link } from "@tanstack/react-router";

/**
 * RelationalPresenceBand — replaces the deleted <CapacityCard /> primitive
 * (R4 Stream 1.8, DR-103). Visual is a soft colour field plus a descriptive
 * label; no progress bar, no level, no percentage. Members can adjust or
 * pause via the secondary actions below.
 */

export type PresenceLabel =
  | "Steady presence"
  | "Room for someone new noticed"
  | "High presence this week"
  | "Needing space observed";

interface RelationalPresenceBandProps {
  label: PresenceLabel;
  /** Optional 1-line elaboration. Polaris register; never analytic. */
  context?: string;
}

export function RelationalPresenceBand({
  label,
  context,
}: RelationalPresenceBandProps) {
  return (
    <article
      className="relative overflow-hidden rounded-[20px] border border-plum-300/30 p-5 shadow-elev-1"
      style={{
        background:
          "linear-gradient(160deg, var(--paper) 0%, color-mix(in oklab, var(--lavender-50) 90%, var(--paper)) 100%)",
      }}
      aria-label={label}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--plum-300) 30%, transparent) 0%, transparent 70%)",
        }}
      />

      <p className="relative text-label-mono">Presence this week</p>
      <p className="relative mt-2 text-h1 italic text-plum-700">{label}</p>
      {context && (
        <p className="relative mt-2 font-body text-[13.5px] leading-relaxed text-slate">
          {context}
        </p>
      )}

      <div className="relative mt-5 grid grid-cols-2 gap-2">
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
    </article>
  );
}
