import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Search } from "lucide-react";
import { EventsBackdrop } from "@/components/events/EventsBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { ScreenHeader } from "@/components/shell/ScreenHeader";
import { FEATURED_EVENT, UPCOMING_EVENTS } from "@/data/events_sample";

export const Route = createFileRoute("/_main/events/")({
  head: () => ({
    meta: [
      { title: "Events — In person · COUPL" },
      { name: "description", content: "Small, hosted, intentional gatherings near you." },
    ],
  }),
  component: EventsListPage,
});

function EventsListPage() {
  const f = FEATURED_EVENT;
  return (
    <EventsBackdrop>
      <StatusBar />

      {/* Header */}
      <header className="px-5 pt-2 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <ScreenHeader title="In person" titleSize="display-xl" />
            <p className="mt-1 text-body-sm text-slate">
              Small. Hosted. Easy to leave.
            </p>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <Link
              to="/events/search"
              aria-label="Search events"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-paper text-plum-700 shadow-elev-1 hover:bg-lavender-50"
            >
              <Search size={15} />
            </Link>
            <span className="rounded-full bg-beeswax-300/70 px-2.5 py-1 text-[11px] font-medium text-plum-700">
              {f.neighborhood}
            </span>
          </div>
        </div>
      </header>

      {/* Featured card */}
      <section className="px-5">
        <article className="overflow-hidden rounded-[20px] bg-paper shadow-[0_12px_32px_rgba(61,26,71,0.10)]">
          <Link to="/events/$id" params={{ id: f.id }} className="block">
            <div
              aria-hidden
              className="h-[140px] w-full"
              style={{ background: f.swatch }}
            />
          </Link>
          <div className="px-4 pt-3 pb-4">
            <div className="flex items-center justify-between">
              <p className="text-label-mono">{f.dateLabel}</p>
              <span className="text-[11px] font-medium text-caution">
                {f.capacityLabel}
              </span>
            </div>
            <Link to="/events/$id" params={{ id: f.id }}>
              <h2 className="mt-1.5 font-display text-[20px] leading-tight text-ink">
                {f.title}
              </h2>
            </Link>
            <p className="mt-2 text-[13.5px] leading-snug text-ink/80">
              {f.blurb}
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span className="rounded-full bg-lavender-100 px-2.5 py-1 text-[11px] font-medium text-plum-700">
                {f.ageRange}
              </span>
              <span className="rounded-full bg-lavender-100 px-2.5 py-1 text-[11px] font-medium text-plum-700">
                {f.price}
              </span>
            </div>
            <Link
              to="/events/$id/booked"
              params={{ id: f.id }}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-plum-700 py-3.5 text-[14px] font-medium text-paper transition-colors hover:bg-plum-500"
            >
              Hold a seat →
            </Link>
          </div>
        </article>
      </section>

      {/* Upcoming */}
      <section className="px-5 pt-6 pb-10">
        <p className="text-label-mono mb-3">Coming up</p>
        <ul className="space-y-2.5">
          {UPCOMING_EVENTS.map((e) => (
            <li key={e.id}>
              <Link
                to="/events/$id"
                params={{ id: e.id }}
                className="flex items-center gap-3 rounded-2xl bg-paper/85 px-3 py-3 shadow-[0_2px_8px_rgba(61,26,71,0.06)] backdrop-blur-sm transition-colors hover:bg-paper"
              >
                <div
                  aria-hidden
                  className="h-12 w-12 shrink-0 rounded-xl"
                  style={{ background: e.swatch }}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[10.5px] font-medium uppercase tracking-[0.12em] text-plum-500">
                    {e.dateLabel.split(" · ").slice(0, 2).join(" · ")}
                  </p>
                  <p className="mt-0.5 truncate font-display text-[15px] text-ink">
                    {e.title}
                  </p>
                  <p className="mt-0.5 text-[11.5px] text-slate">
                    {e.capacityLabel}
                  </p>
                </div>
                <ChevronRight size={16} className="text-stone" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </EventsBackdrop>
  );
}