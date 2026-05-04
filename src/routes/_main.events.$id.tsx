import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ChevronLeft, Heart, MapPin } from "lucide-react";
import { EventsBackdrop } from "@/components/events/EventsBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { getEvent, FEATURED_EVENT, SESSION_STRUCTURE } from "@/data/events_sample";

export const Route = createFileRoute("/_main/events/$id")({
  head: () => ({
    meta: [{ title: "Event detail · COUPL" }],
  }),
  component: EventDetailPage,
});

function EventDetailPage() {
  const { id } = useParams({ from: "/_main/events/$id" });
  const e = getEvent(id) ?? FEATURED_EVENT;

  return (
    <EventsBackdrop>
      <StatusBar
        leading={
          <Link
            to="/events"
            aria-label="Back to events"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />

      {/* Hero */}
      <div className="relative px-5">
        <div
          aria-hidden
          className="h-[180px] w-full rounded-[18px]"
          style={{ background: e.swatch }}
        />
        <button
          type="button"
          aria-label="Save event"
          className="absolute right-7 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-paper/90 text-plum-700 shadow-[0_2px_8px_rgba(61,26,71,0.18)] backdrop-blur-md hover:bg-paper"
        >
          <Heart size={16} />
        </button>
      </div>

      {/* Title + logistics */}
      <section className="px-5 pt-5">
        <p className="text-label-mono">{e.dateLabel}</p>
        <h1 className="mt-1.5 font-display text-[26px] leading-[1.15] text-ink">
          {e.title}
        </h1>
        <p className="mt-2 flex items-center gap-1.5 text-[13px] text-slate">
          <MapPin size={13} className="text-plum-300" aria-hidden />
          {e.address} · {e.walkNote}
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span className="rounded-full bg-lavender-100 px-2.5 py-1 text-[11px] font-medium text-plum-700">
            {e.ageRange}
          </span>
          <span className="rounded-full bg-lavender-100 px-2.5 py-1 text-[11px] font-medium text-plum-700">
            {e.price}
          </span>
          <span className="rounded-full bg-beeswax-300/70 px-2.5 py-1 text-[11px] font-medium text-caution">
            {e.capacityLabel}
          </span>
        </div>
      </section>

      {/* Host card */}
      <section className="px-5 pt-5">
        <article className="rounded-2xl bg-paper px-4 py-3.5 shadow-[0_2px_10px_rgba(61,26,71,0.06)]">
          <div className="flex items-start gap-3">
            <div
              aria-hidden
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lavender-100 font-display text-[16px] text-plum-700"
            >
              {e.hostInitial}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10.5px] font-medium uppercase tracking-[0.12em] text-plum-500">
                Hosted by
              </p>
              <p className="mt-0.5 font-display text-[15px] text-ink">{e.host}</p>
              <p className="mt-2 text-[13px] leading-snug text-ink/80">
                {e.hostBio}
              </p>
              <Link
                to="/connections/$id/organiser"
                params={{ id: e.id }}
                className="mt-3 inline-flex items-center gap-1 font-body text-[12.5px] text-plum-700 hover:underline"
              >
                Chat with {e.host} →
              </Link>
            </div>
          </div>
        </article>
      </section>

      {/* Session structure */}
      <section className="px-5 pt-6">
        <p className="text-label-mono mb-3">How the night runs</p>
        <ul className="overflow-hidden rounded-2xl bg-paper/85 shadow-[0_2px_8px_rgba(61,26,71,0.05)]">
          {SESSION_STRUCTURE.map((s, i) => (
            <li
              key={s.time}
              className={`flex items-start gap-4 px-4 py-3 ${i === 0 ? "" : "border-t border-plum-300/15"}`}
            >
              <span className="mt-0.5 w-10 shrink-0 font-mono text-[12.5px] tabular-nums text-plum-500">
                {s.time}
              </span>
              <span className="text-[13.5px] leading-snug text-ink/85">{s.copy}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Emotional safety + seating */}
      <section className="px-5 pt-6">
        <p className="text-label-mono mb-2">What to expect</p>
        <p className="text-[13.5px] leading-relaxed text-ink/80">
          A long table of six. You'll get the address and Reni's number the day before.
          No phones at the table. If you need to step away, you can — no one will make
          it a thing.
        </p>
      </section>

      {/* Sticky CTA */}
      <div className="sticky bottom-24 z-30 mt-8 px-5 pb-6">
        <Link
          to="/events/$id/reserve"
          params={{ id: e.id }}
          className="flex w-full items-center justify-center rounded-full bg-plum-700 py-4 text-[15px] font-medium text-paper shadow-[0_8px_24px_rgba(61,26,71,0.28)] transition-colors hover:bg-plum-500"
        >
          Hold a seat — {e.price}
        </Link>
        <div className="mt-3 text-center">
          <Link
            to="/events/$id_/waitlist"
            params={{ id: e.id }}
            className="font-body text-[12.5px] italic text-stone hover:text-plum-500"
          >
            If this fills, join the waitlist →
          </Link>
        </div>
      </div>
    </EventsBackdrop>
  );
}