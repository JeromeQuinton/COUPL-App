import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { EventsBackdrop } from "@/components/events/EventsBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { FEATURED_EVENT, UPCOMING_EVENTS } from "@/data/events_sample";

/**
 * /events/search — filter + search across the events feed.
 *
 * Events index is featured + upcoming only. This is the dig.
 *
 * Stream-19 SCREEN-32.
 */
export const Route = createFileRoute("/_main/events/search")({
  head: () => ({ meta: [{ title: "Find an event — COUPL" }] }),
  component: SearchScreen,
});

const WHEN: { id: "this" | "next" | "month"; label: string }[] = [
  { id: "this", label: "This week" },
  { id: "next", label: "Next week" },
  { id: "month", label: "This month" },
];

function SearchScreen() {
  const [q, setQ] = useState("");
  const [when, setWhen] = useState<"this" | "next" | "month">("this");

  const all = useMemo(() => [FEATURED_EVENT, ...UPCOMING_EVENTS], []);
  const filtered = all.filter((e) =>
    q.length === 0
      ? true
      : (e.title + " " + e.blurb + " " + e.neighborhood).toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <EventsBackdrop>
      <StatusBar
        leading={
          <Link to="/events" aria-label="Back" className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5">
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-3">
        <p className="text-label-mono">Events · find one</p>
        <h1 className="mt-2 font-display text-[26px] italic leading-tight text-ink">
          What are you in the mood for?
        </h1>
      </header>

      <section className="px-5">
        <label className="flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2.5 shadow-elev-1">
          <Search size={16} className="text-stone" aria-hidden />
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Tea, a workshop, somewhere quiet…"
            className="flex-1 bg-transparent font-body text-[14px] text-ink placeholder:text-stone outline-none"
          />
        </label>

        <div className="mt-3 inline-flex rounded-full border border-line bg-paper p-0.5">
          {WHEN.map((w) => (
            <button
              key={w.id}
              type="button"
              onClick={() => setWhen(w.id)}
              className={
                when === w.id
                  ? "rounded-full bg-plum-700 px-3 py-1 text-label-mono text-paper"
                  : "rounded-full px-3 py-1 text-label-mono text-slate"
              }
            >
              {w.label}
            </button>
          ))}
        </div>
      </section>

      <ul className="px-5 pt-6 pb-12 space-y-2.5">
        {filtered.map((e) => (
          <li key={e.id}>
            <Link
              to="/events/$id"
              params={{ id: e.id }}
              className="flex items-center gap-3 rounded-2xl bg-paper/85 px-3 py-3 shadow-[0_2px_8px_rgba(61,26,71,0.06)] backdrop-blur-sm hover:bg-paper"
            >
              <div aria-hidden className="h-12 w-12 shrink-0 rounded-xl" style={{ background: e.swatch }} />
              <div className="min-w-0 flex-1">
                <p className="text-label-mono text-plum-500">{e.dateLabel.split(" · ").slice(0, 2).join(" · ")}</p>
                <p className="mt-0.5 truncate font-display text-[15px] text-ink">{e.title}</p>
                <p className="mt-0.5 text-[11.5px] text-slate">{e.neighborhood} · {e.capacityLabel}</p>
              </div>
              <ChevronRight size={16} className="text-stone" />
            </Link>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="px-2 py-12 text-center font-body text-[13px] italic text-stone">
            Nothing matched. Try a softer search.
          </li>
        )}
      </ul>
    </EventsBackdrop>
  );
}
