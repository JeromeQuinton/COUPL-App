import type { CaseTimelineEvent } from "@/data/safety_sample";

/**
 * CaseTimeline — vertical event-by-event timeline for a safety case.
 * Replaces the prior 3-pill horizontal stage indicator (R3-03 uplift).
 * Each event renders as a labelled milestone with plain-language detail.
 */
export function CaseTimeline({ events }: { events: CaseTimelineEvent[] }) {
  return (
    <ol className="relative space-y-5 pl-6">
      <span
        aria-hidden
        className="absolute left-[7px] top-2 bottom-2 w-px bg-line"
      />
      {events.map((ev) => (
        <li key={ev.id} className="relative">
          <span
            aria-hidden
            className="absolute -left-[22px] top-1 grid h-[15px] w-[15px] place-items-center rounded-full border border-plum-500 bg-paper"
          >
            <span className="h-[7px] w-[7px] rounded-full bg-plum-500" />
          </span>
          <p className="font-display text-[14px] font-medium text-ink">{ev.label}</p>
          <p className="mt-1 font-body text-[13px] leading-relaxed text-slate">
            {ev.detail}
          </p>
          <p className="mt-1 font-body text-[11.5px] uppercase tracking-[0.12em] text-stone">
            {ev.timestamp}
          </p>
        </li>
      ))}
    </ol>
  );
}
