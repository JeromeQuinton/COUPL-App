import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { EventsBackdrop } from "@/components/events/EventsBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { getEvent, FEATURED_EVENT } from "@/data/events_sample";

export const Route = createFileRoute("/_main/events/$id_/booked")({
  head: () => ({
    meta: [{ title: "Seat held · COUPL" }],
  }),
  component: BookedPage,
});

function BookedPage() {
  const { id } = useParams({ from: "/_main/events/$id_/booked" });
  const e = getEvent(id) ?? FEATURED_EVENT;
  const DAY_NAMES: Record<string, string> = {
    SUN: "Sunday",
    MON: "Monday",
    TUE: "Tuesday",
    WED: "Wednesday",
    THU: "Thursday",
    FRI: "Friday",
    SAT: "Saturday",
  };
  const cap = DAY_NAMES[e.dateLabel.split(" · ")[0]] ?? "soon";

  return (
    <EventsBackdrop>
      <StatusBar />
      <main className="flex min-h-[80dvh] flex-col items-center px-6 pt-12 text-center">
        {/* Confirmation ring */}
        <div
          aria-hidden
          className="flex h-16 w-16 items-center justify-center rounded-full border-2 text-plum-700"
          style={{ borderColor: "var(--beeswax-300)" }}
        >
          <Check size={26} strokeWidth={2.25} />
        </div>

        <h1 className="mt-6 font-display text-[28px] leading-[1.15] text-ink">
          Seat held.
          <br />
          See you {cap}.
        </h1>
        <p className="mt-3 max-w-[320px] text-[14px] leading-relaxed text-slate">
          We sent the address and {e.host.split(" ")[0]}'s number to your phone. Add to calendar?
        </p>

        {/* Event summary card */}
        <article className="mt-7 w-full rounded-2xl bg-paper px-4 py-3.5 text-left shadow-[0_4px_16px_rgba(61,26,71,0.08)]">
          <div className="flex items-start gap-4">
            <div className="shrink-0 text-center">
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-plum-500">
                {e.dateShort.mon}
              </p>
              <p className="font-display text-[26px] leading-none text-ink">
                {e.dateShort.day}
              </p>
            </div>
            <div className="min-w-0 flex-1 border-l border-plum-300/25 pl-4">
              <p className="font-display text-[15px] text-ink">{e.title}</p>
              <p className="mt-0.5 text-[12px] text-slate">
                {e.timeRange} · {e.venue}, {e.neighborhood}
              </p>
              <p className="mt-1 text-[11.5px] text-plum-500">Hosted by {e.host.split(" ")[0]}</p>
            </div>
          </div>
        </article>

        {/* Coach prep framing */}
        <p className="mt-5 w-full rounded-xl bg-beeswax-100 px-4 py-3 text-left text-[12.5px] leading-snug text-plum-700">
          <span className="font-semibold">Before you go:</span> we'll send you the
          three opening prompts on Friday so you can sit with them.
        </p>

        {/* CTAs */}
        <button
          type="button"
          className="mt-6 w-full rounded-full bg-plum-700 py-3.5 text-[14px] font-medium text-paper transition-colors hover:bg-plum-500"
        >
          Add to calendar
        </button>
        <Link
          to="/events"
          className="mt-2 w-full rounded-full border border-ink/15 bg-paper py-3.5 text-[14px] font-medium text-ink transition-colors hover:bg-cloud"
        >
          Back to events
        </Link>

        {/* Attendees pre-event link */}
        <Link
          to="/events/$id/attendees"
          params={{ id: e.id }}
          className="mt-4 text-[11.5px] uppercase tracking-[0.14em] text-plum-500/80 hover:text-plum-700"
        >
          See who's coming →
        </Link>

        {/* Quiet link to live check-in (Phase 1 demo) */}
        <Link
          to="/events/$id/checkin"
          params={{ id: e.id }}
          className="mt-2 text-[11.5px] uppercase tracking-[0.14em] text-plum-500/80 hover:text-plum-700"
        >
          Preview check-in →
        </Link>
      </main>
    </EventsBackdrop>
  );
}