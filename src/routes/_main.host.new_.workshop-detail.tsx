import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, Plus } from "lucide-react";
import { EventsBackdrop } from "@/components/events/EventsBackdrop";
import { StatusBar } from "@/components/events/StatusBar";

export const Route = createFileRoute("/_main/host/new_/workshop-detail")({
  head: () => ({ meta: [{ title: "Workshop · description — COUPL" }] }),
  component: WorkshopDetailScreen,
});

function WorkshopDetailScreen() {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");

  return (
    <EventsBackdrop>
      <StatusBar
        leading={
          <Link to="/host/new/workshop" aria-label="Back" className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5">
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <p className="text-label-mono">Workshop · 3 / 4</p>
        <h1 className="mt-2 font-display text-[26px] leading-tight text-ink">
          Tell people what to expect.
        </h1>
        <p className="mt-3 font-body text-[12.5px] italic text-stone">
          Specificity is more attractive than performance.
        </p>
      </header>

      <form className="px-5 pb-32 space-y-5">
        <div>
          <label className="text-label-mono" htmlFor="ws-description">Description</label>
          <textarea
            id="ws-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            placeholder="A long table, three courses, no phones. Hosted by you. Three prompts to start, then conversation finds itself."
            className="mt-2 w-full resize-none rounded-[14px] border border-line bg-paper px-4 py-3 font-body text-[14px] leading-relaxed text-ink placeholder:text-stone focus:border-plum-500 focus:outline-none"
          />
          <p className="mt-2 font-body text-[12px] italic text-stone">
            What will people remember the day after?
          </p>
        </div>

        <div>
          <p className="text-label-mono">Cover image</p>
          <button
            type="button"
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-[14px] border border-dashed border-plum-300/50 bg-paper/50 py-8 text-stone hover:bg-lavender-50"
          >
            <Plus size={18} strokeWidth={2} />
            Add an image
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-label-mono" htmlFor="ws-date">Date</label>
            <input
              id="ws-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-2 w-full rounded-[14px] border border-line bg-paper px-4 py-3 font-display text-[14px] text-ink focus:border-plum-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-label-mono" htmlFor="ws-time">Time</label>
            <input
              id="ws-time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-2 w-full rounded-[14px] border border-line bg-paper px-4 py-3 font-display text-[14px] text-ink focus:border-plum-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-label-mono" htmlFor="ws-venue">Venue</label>
          <input
            id="ws-venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            placeholder="Toconoco · 28 Coronet St, London"
            className="mt-2 w-full rounded-[14px] border border-line bg-paper px-4 py-3 font-body text-[14px] text-ink placeholder:text-stone focus:border-plum-500 focus:outline-none"
          />
        </div>
      </form>

      <div className="sticky bottom-24 z-30 px-5 pb-6 space-y-3">
        <button
          type="button"
          onClick={() => navigate({ to: "/host/new/workshop-review" })}
          className="flex w-full items-center justify-center rounded-full bg-ink py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90"
        >
          Continue · 4 / 4
        </button>
      </div>
    </EventsBackdrop>
  );
}
