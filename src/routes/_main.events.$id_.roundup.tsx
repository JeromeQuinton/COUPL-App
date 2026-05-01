import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { EventsBackdrop } from "@/components/events/EventsBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import {
  getEvent,
  FEATURED_EVENT,
  ROUNDUP_YESES,
  QUIETLY_NOTED,
  REFLECTION_QUOTE,
  type RoundUpYes,
} from "@/data/events_sample";

export const Route = createFileRoute("/_main/events/$id_/roundup")({
  head: () => ({
    meta: [{ title: "Round-up · COUPL" }],
  }),
  component: RoundUpPage,
});

const HUE_BG: Record<RoundUpYes["hue"], string> = {
  lavender: "var(--lavender-100)",
  blush: "color-mix(in oklab, var(--blush) 80%, var(--paper))",
  beeswax: "var(--beeswax-100)",
};

function RoundUpPage() {
  const { id } = useParams({ from: "/_main/events/$id_/roundup" });
  const e = getEvent(id) ?? FEATURED_EVENT;
  return (
    <EventsBackdrop>
      <StatusBar
        leading={
          <Link
            to="/events"
            className="ml-1 inline-flex items-center gap-1 text-[12.5px] text-ink/75 hover:text-ink"
          >
            <ChevronLeft size={14} />
            Events
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-4">
        <p className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-plum-500">
          Sunday morning · Round-up
        </p>
        <h1 className="mt-2 font-display text-[26px] leading-[1.15] text-ink">
          Last night, you sat with five strangers.
        </h1>
        <p className="mt-2 text-[13px] text-plum-500/90">
          Here's who said yes to staying in touch.
        </p>
      </header>

      {/* Mutual yeses */}
      <section className="px-5 pt-2">
        <p className="text-label-mono mb-2">Mutual yeses</p>
        <ul className="space-y-2.5">
          {ROUNDUP_YESES.map((y) => (
            <li
              key={y.initial}
              className="rounded-2xl bg-paper px-4 py-3.5 shadow-[0_2px_10px_rgba(61,26,71,0.06)]"
            >
              <div className="flex items-start gap-3">
                <div
                  aria-hidden
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-[14px] text-plum-700"
                  style={{ background: HUE_BG[y.hue] }}
                >
                  {y.initial}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-[15px] text-ink">{y.name}</p>
                  <p className="mt-0.5 text-[13px] leading-snug text-ink/80">{y.note}</p>
                  <Link
                    to="/connections"
                    className="mt-2 inline-flex items-center gap-1 rounded-full bg-plum-700 px-3 py-1.5 text-[12px] font-medium text-paper hover:bg-plum-500"
                  >
                    Open conversation →
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Quietly noted */}
      <section className="px-5 pt-6">
        <p className="text-label-mono mb-2">Quietly noted</p>
        <p
          className="rounded-2xl px-4 py-3.5 text-[12.5px] leading-snug text-plum-700"
          style={{ background: "var(--beeswax-100)" }}
        >
          {QUIETLY_NOTED}
        </p>
      </section>

      {/* How it felt */}
      <section className="px-5 pt-6 pb-12">
        <p className="text-label-mono mb-2">How it felt</p>
        <article className="rounded-2xl bg-paper px-4 py-3.5 shadow-[0_2px_10px_rgba(61,26,71,0.06)]">
          <p className="text-[11.5px] uppercase tracking-[0.12em] text-plum-500">
            From your post-dinner reflection
          </p>
          <p className="mt-2 font-display text-[15.5px] italic leading-snug text-ink">
            “{REFLECTION_QUOTE}”
          </p>
        </article>
        <p className="mt-4 text-center text-[11.5px] text-slate">
          Coach insight on {e.host.split(" ")[0]}'s table arrives Tuesday.
        </p>
      </section>
    </EventsBackdrop>
  );
}