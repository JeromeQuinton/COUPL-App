import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ChevronLeft, Lock } from "lucide-react";
import { EventsBackdrop } from "@/components/events/EventsBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { getEvent, FEATURED_EVENT } from "@/data/events_sample";

export const Route = createFileRoute("/_main/events/$id_/attendees")({
  head: () => ({
    meta: [
      { title: "Who's coming — COUPL" },
      {
        name: "description",
        content: "Names and first letters only. Full profiles unlock at the door.",
      },
    ],
  }),
  component: AttendeesScreen,
});

const ATTENDEES = [
  { initial: "M", name: "Maya" },
  { initial: "L", name: "Lena" },
  { initial: "N", name: "Noah" },
  { initial: "A", name: "Ari" },
  { initial: "S", name: "Saoirse" },
];

function AttendeesScreen() {
  const { id } = useParams({ from: "/_main/events/$id_/attendees" });
  const e = getEvent(id) ?? FEATURED_EVENT;
  const total = ATTENDEES.length;
  const cap = e.seatsLeft + total;

  return (
    <EventsBackdrop>
      <StatusBar
        leading={
          <Link
            to="/events/$id"
            params={{ id }}
            aria-label="Back to event"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <p className="text-label-mono">
          Attending · {total} of {cap}
        </p>
        <h1 className="mt-2 font-display text-[28px] leading-tight text-ink">
          Who's coming.
        </h1>
        <p className="mt-3 font-body text-[14px] italic leading-relaxed text-slate">
          Names and first letters only — full profiles unlock at the door.
        </p>
      </header>

      <ul className="px-5 pb-12 flex flex-col gap-2.5">
        {ATTENDEES.map((a) => (
          <li
            key={a.name}
            className="flex items-center justify-between gap-3 rounded-[14px] bg-paper px-4 py-3.5 shadow-elev-1"
          >
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="grid h-10 w-10 place-items-center rounded-full bg-lavender-100 font-display text-[16px] font-semibold text-plum-700"
              >
                {a.initial}
              </span>
              <p className="font-display text-[15px] text-ink">{a.name}</p>
            </div>
            <Lock size={14} className="text-stone" aria-label="Locked until door" />
          </li>
        ))}
      </ul>
    </EventsBackdrop>
  );
}
