import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { EventsBackdrop } from "@/components/events/EventsBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import {
  getEvent,
  FEATURED_EVENT,
  TONIGHT_SEATING,
  type SeatPerson,
} from "@/data/events_sample";

export const Route = createFileRoute("/_main/events/$id_/checkin")({
  head: () => ({
    meta: [{ title: "At the event · COUPL" }],
  }),
  component: CheckInPage,
});

function Seat({ p }: { p: SeatPerson }) {
  const isYou = p.isYou;
  return (
    <div className="flex flex-col items-center gap-1">
      {isYou && (
        <span className="text-[9px] uppercase tracking-[0.18em] text-beeswax-300">
          You
        </span>
      )}
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-full font-display text-[13px] ${
          isYou
            ? "bg-beeswax-300 text-plum-700 ring-2 ring-beeswax-300/50 ring-offset-2 ring-offset-transparent"
            : "bg-paper/15 text-paper/85 ring-1 ring-paper/20"
        }`}
      >
        {p.initial}
      </div>
    </div>
  );
}

function CheckInPage() {
  const { id } = useParams({ from: "/_main/events/$id_/checkin" });
  const e = getEvent(id) ?? FEATURED_EVENT;

  return (
    <EventsBackdrop tone="dark">
      <StatusBar tone="dark" />

      <header className="px-5 pt-2 pb-4">
        <p className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-beeswax-300/85">
          You're here · 5:58pm
        </p>
        <h1 className="mt-2 font-display text-[26px] leading-[1.15] text-paper">
          Welcome to {e.venue.split(" — ")[0]},
          <br />
          Mira.
        </h1>
        <p className="mt-3 text-[13.5px] leading-relaxed text-paper/75">
          {e.host.split(" ")[0]} saved you a seat on the long side, third from the left.
          Your name card is folded. Your water is poured.
        </p>
      </header>

      {/* Seating chart */}
      <section className="px-5">
        <div className="rounded-2xl border border-paper/10 bg-paper/[0.04] px-4 py-5 backdrop-blur-md">
          <p className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-paper/60">
            Tonight's seating
          </p>
          <div className="mt-4 flex flex-col items-center gap-3">
            <div className="flex items-end gap-7">
              {TONIGHT_SEATING.topRow.map((p) => (
                <Seat key={p.initial} p={p} />
              ))}
            </div>
            <div
              aria-hidden
              className="h-3 w-[78%] rounded-full bg-paper/10"
            />
            <div className="flex gap-7">
              {TONIGHT_SEATING.bottomRow.map((p) => (
                <Seat key={p.initial} p={p} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* First prompt */}
      <section className="px-5 pt-5">
        <article className="rounded-2xl border border-beeswax-300/40 bg-paper/[0.05] px-4 py-4 backdrop-blur-md">
          <p className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-beeswax-300">
            First prompt · 6:30pm
          </p>
          <p className="mt-2 font-display text-[18px] leading-snug text-paper">
            "Tell us about a place that made you feel like yourself."
          </p>
        </article>
      </section>

      {/* Phone tuck-away */}
      <section className="px-5 pt-5 pb-12">
        <button
          type="button"
          className="w-full rounded-full bg-paper py-3.5 text-[14px] font-medium text-plum-700 transition-colors hover:bg-paper/90"
        >
          Phones away — tuck in
        </button>
        <p className="mt-3 text-center text-[11.5px] text-paper/55">
          Round-up arrives tomorrow morning.
        </p>
        <Link
          to="/events/$id/roundup"
          params={{ id: e.id }}
          className="mt-4 block text-center text-[11px] uppercase tracking-[0.14em] text-beeswax-300/70 hover:text-beeswax-300"
        >
          Preview round-up →
        </Link>
      </section>
    </EventsBackdrop>
  );
}