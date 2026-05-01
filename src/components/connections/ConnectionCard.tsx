import { Link } from "@tanstack/react-router";
import { ConnectionAvatar } from "./Avatar";
import type { ConnectionSummary } from "@/data/connections_sample";

type Props = { connection: ConnectionSummary };

/**
 * ConnectionCard — list row in the Connections hub. Active and cool-off
 * variants share a layout but cool-off adds an italic plum note about
 * the natural-close window. Tapping opens the thread.
 */
export function ConnectionCard({ connection }: Props) {
  const c = connection;
  const isCoolOff = c.state === "cool-off";
  return (
    <Link
      to="/connections/$id"
      params={{ id: c.id }}
      className="group block rounded-2xl border border-plum-300/30 bg-paper/90 px-4 py-3 shadow-[0_1px_2px_rgba(61,26,71,0.05)] backdrop-blur-sm transition-colors hover:border-plum-300/60 hover:bg-paper"
    >
      <div className="flex items-start gap-3">
        <ConnectionAvatar initial={c.initial} hue={c.hue} />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <p className="font-display text-[16px] font-semibold text-ink">
              {c.name}
            </p>
            <span className="text-[11px] text-slate">{c.lastTouch}</span>
          </div>
          <p className="mt-0.5 text-[11.5px] uppercase tracking-[0.12em] text-plum-500">
            {c.dayLabel}
          </p>
          <p className="mt-1.5 text-[13.5px] leading-snug text-ink/85">
            {c.preview}
          </p>
        </div>
      </div>
      {isCoolOff && c.cooloffNote && (
        <p
          className="mt-3 rounded-xl px-3 py-2 text-[12.5px] italic leading-snug text-plum-700"
          style={{
            background:
              "linear-gradient(150deg, var(--beeswax-100) 0%, color-mix(in oklab, var(--beeswax-300) 30%, var(--beeswax-100)) 100%)",
          }}
        >
          {c.cooloffNote}
        </p>
      )}
    </Link>
  );
}