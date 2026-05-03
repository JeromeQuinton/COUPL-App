import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Check, Clock } from "lucide-react";
import { EventsBackdrop } from "@/components/events/EventsBackdrop";
import { StatusBar } from "@/components/events/StatusBar";

export const Route = createFileRoute("/_main/host/attendees")({
  head: () => ({
    meta: [{ title: "Attendees — COUPL Host" }],
  }),
  component: HostAttendees,
});

const ATTENDEES = [
  { initial: "M", name: "Maya R.", note: "Verified · referred by Polaris", status: "paid", first: true },
  { initial: "S", name: "Sam P.", note: "Verified · 3rd workshop", status: "paid", first: false },
  { initial: "I", name: "Iris B.", note: "Pending verification", status: "held", first: false },
  { initial: "T", name: "Theo M.", note: "Verified · first time", status: "paid", first: true },
];

function HostAttendees() {
  return (
    <EventsBackdrop>
      <StatusBar
        leading={
          <Link to="/host" aria-label="Back" className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5">
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <p className="text-label-mono">Tea & Honesty · Thu 30 Oct</p>
        <h1 className="mt-2 font-display text-[28px] leading-tight text-ink">
          Your room.
        </h1>
        <p className="mt-3 font-body text-[12.5px] italic text-stone">
          Hosts curate chemistry through composition.
        </p>
      </header>

      <ul className="px-5 flex flex-col gap-2.5">
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
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="font-display text-[15px] text-ink">{a.name}</p>
                  {a.status === "paid" && <Check size={14} style={{ color: "var(--success)" }} aria-label="Paid" />}
                </div>
                <p className="font-body text-[11.5px] text-stone">{a.note}</p>
              </div>
            </div>
            <span className={`text-label-mono ${a.status === "paid" ? "text-success" : "text-caution"}`}>
              {a.status === "paid" ? "Paid" : "Held"}
            </span>
          </li>
        ))}
      </ul>

      <p className="px-5 pt-5 pb-12 text-center font-body text-[12.5px] italic text-stone">
        3 seats left · waitlist open
      </p>
    </EventsBackdrop>
  );
}
