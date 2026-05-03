import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { EventsBackdrop } from "@/components/events/EventsBackdrop";
import { StatusBar } from "@/components/events/StatusBar";

export const Route = createFileRoute("/_main/host/new_/community-detail")({
  head: () => ({ meta: [{ title: "Community · details — COUPL" }] }),
  component: CommunityDetailScreen,
});

function CommunityDetailScreen() {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [capacity, setCapacity] = useState("12");

  return (
    <EventsBackdrop>
      <StatusBar
        leading={
          <Link to="/host/new/community" aria-label="Back" className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5">
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <p className="text-label-mono">Community · 2 / 3</p>
        <h1 className="mt-2 font-display text-[26px] leading-tight text-ink">
          Tell people what they're walking into.
        </h1>
        <p className="mt-3 font-body text-[12.5px] italic text-stone">
          Belonging requires boundaries too.
        </p>
      </header>

      <form className="px-5 pb-32 space-y-5">
        <div>
          <label className="text-label-mono" htmlFor="cm-description">What it actually is</label>
          <textarea
            id="cm-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            placeholder="A 90-minute slow loop on Hampstead Heath. We start at Parliament Hill, walk in pairs, then sit and write for ten minutes."
            className="mt-2 w-full resize-none rounded-[14px] border border-line bg-paper px-4 py-3 font-body text-[14px] leading-relaxed text-ink placeholder:text-stone focus:border-plum-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-label-mono" htmlFor="cm-date">Date</label>
            <input
              id="cm-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-2 w-full rounded-[14px] border border-line bg-paper px-4 py-3 font-display text-[14px] text-ink focus:border-plum-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-label-mono" htmlFor="cm-time">Time</label>
            <input
              id="cm-time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-2 w-full rounded-[14px] border border-line bg-paper px-4 py-3 font-display text-[14px] text-ink focus:border-plum-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-label-mono" htmlFor="cm-capacity">Capacity</label>
          <input
            id="cm-capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            type="number"
            min="2"
            max="20"
            className="mt-2 w-full rounded-[14px] border border-line bg-paper px-4 py-3 font-display text-[14px] text-ink focus:border-plum-500 focus:outline-none"
          />
          <p className="mt-2 font-body text-[12px] italic text-stone">
            8 to 20 works best for community shapes.
          </p>
        </div>
      </form>

      <div className="sticky bottom-24 z-30 px-5 pb-6 space-y-3">
        <button
          type="button"
          onClick={() => navigate({ to: "/host/new/community-review" })}
          className="flex w-full items-center justify-center rounded-full bg-ink py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90"
        >
          Continue · 3 / 3
        </button>
      </div>
    </EventsBackdrop>
  );
}
