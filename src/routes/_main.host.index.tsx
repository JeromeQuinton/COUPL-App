import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Plus } from "lucide-react";
import { EventsBackdrop } from "@/components/events/EventsBackdrop";
import { StatusBar } from "@/components/events/StatusBar";

export const Route = createFileRoute("/_main/host/")({
  head: () => ({
    meta: [{ title: "Host — COUPL" }],
  }),
  component: HostDashboard,
});

const ROOMS = {
  live: [
    { id: "tea-honesty", title: "Tea & Honesty", date: "Thu 30 Oct · Toconoco", revenue: "£162", booked: 9, capacity: 12, waitlist: 3 },
  ],
  drafts: 1,
  past: 8,
};

function HostDashboard() {
  return (
    <EventsBackdrop>
      <StatusBar
        leading={
          <Link
            to="/profile"
            aria-label="Back"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <p className="text-label-mono">Hosting · verified</p>
        <h1 className="mt-2 font-display text-[28px] leading-tight text-ink">
          Your rooms.
        </h1>
        <p className="mt-3 font-body text-[13.5px] italic text-stone">
          Hosts shape nervous systems before guests ever arrive.
        </p>
      </header>

      <section className="px-5">
        <div className="inline-flex rounded-full border border-line bg-paper p-0.5 mb-4">
          <span className="rounded-full bg-plum-700 px-3 py-1 text-label-mono text-paper">Live · {ROOMS.live.length}</span>
          <span className="rounded-full px-3 py-1 text-label-mono text-slate">Drafts · {ROOMS.drafts}</span>
          <span className="rounded-full px-3 py-1 text-label-mono text-slate">Past · {ROOMS.past}</span>
        </div>

        <ul className="space-y-3">
          {ROOMS.live.map((r) => (
            <li key={r.id} className="rounded-[16px] bg-paper p-4 shadow-elev-1">
              <span className="inline-flex items-center gap-1 text-label-mono" style={{ color: "var(--success)" }}>
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-success" /> Live · Workshop
              </span>
              <p className="mt-2 font-display text-[18px] font-semibold leading-snug text-ink">{r.title}</p>
              <p className="mt-1 font-body text-[12.5px] text-slate">{r.date}</p>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div>
                  <p className="font-display text-[18px] text-ink">{r.revenue}</p>
                  <p className="text-label-mono">Revenue</p>
                </div>
                <div>
                  <p className="font-display text-[18px] text-ink">{r.booked}</p>
                  <p className="text-label-mono">Booked</p>
                </div>
                <div>
                  <p className="font-display text-[18px] text-ink">{r.waitlist}</p>
                  <p className="text-label-mono">Waitlist</p>
                </div>
              </div>
              <Link
                to="/host/attendees"
                className="mt-4 inline-flex items-center gap-1 text-label-mono text-plum-500 hover:text-plum-700"
              >
                See attendees →
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="px-5 pt-6 pb-12">
        <Link
          to="/host/new"
          className="flex items-center justify-between rounded-[16px] bg-ink px-5 py-4 text-paper hover:opacity-90"
        >
          <div>
            <p className="font-display text-[16px] font-semibold">Create a new room</p>
            <p className="mt-0.5 font-body text-[12px] text-paper/70">Workshop · Community</p>
          </div>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-paper text-ink">
            <Plus size={18} strokeWidth={2.25} />
          </span>
        </Link>
      </section>
    </EventsBackdrop>
  );
}
