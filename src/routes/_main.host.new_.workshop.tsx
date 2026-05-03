import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { EventsBackdrop } from "@/components/events/EventsBackdrop";
import { StatusBar } from "@/components/events/StatusBar";

export const Route = createFileRoute("/_main/host/new_/workshop")({
  head: () => ({
    meta: [{ title: "New workshop — COUPL" }],
  }),
  component: WorkshopComposer,
});

function WorkshopComposer() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [duration, setDuration] = useState("90 minutes");
  const [seats, setSeats] = useState("12");
  const [price, setPrice] = useState("£18");

  return (
    <EventsBackdrop>
      <StatusBar
        leading={
          <Link to="/host/new" aria-label="Back" className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5">
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <p className="text-label-mono">Workshop · 2 / 4</p>
        <h1 className="mt-2 font-display text-[26px] leading-tight text-ink">
          What will happen?
        </h1>
        <p className="mt-3 font-body text-[12.5px] italic text-stone">
          Insight is most useful when it shifts how you notice yourself in real time.
        </p>
      </header>

      <form className="px-5 pb-32 space-y-5">
        <div>
          <label className="text-label-mono" htmlFor="ws-title">Title</label>
          <input
            id="ws-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Tea & Honesty"
            className="mt-2 w-full rounded-[14px] border border-line bg-paper px-4 py-3 font-display text-[16px] text-ink placeholder:text-stone focus:border-plum-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-label-mono" htmlFor="ws-prompt">Opening prompt · 1 sentence</label>
          <textarea
            id="ws-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            placeholder="What's a thing you've stopped pretending about?"
            className="mt-2 w-full resize-none rounded-[14px] border border-line bg-paper px-4 py-3 font-body text-[14px] italic text-ink placeholder:not-italic placeholder:text-stone focus:border-plum-500 focus:outline-none"
          />
          <p className="mt-2 font-body text-[12px] italic text-stone">
            This is the room's spine. COUPL surfaces it on the booking screen.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-label-mono" htmlFor="ws-duration">Duration</label>
            <input
              id="ws-duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="mt-2 w-full rounded-[14px] border border-line bg-paper px-4 py-3 font-display text-[14px] text-ink focus:border-plum-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-label-mono" htmlFor="ws-seats">Seats</label>
            <input
              id="ws-seats"
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              className="mt-2 w-full rounded-[14px] border border-line bg-paper px-4 py-3 font-display text-[14px] text-ink focus:border-plum-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-label-mono">Ticket</label>
          <div className="mt-2 inline-flex rounded-full border border-line bg-paper p-0.5">
            {["£12", "£18", "£24", "custom"].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPrice(p)}
                className={`rounded-full px-3 py-1.5 text-label-mono transition-colors ${
                  price === p ? "bg-plum-700 text-paper" : "text-slate"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </form>

      <div className="sticky bottom-24 z-30 px-5 pb-6 space-y-3">
        <button
          type="button"
          onClick={() => navigate({ to: "/host/new/workshop-detail" })}
          className="flex w-full items-center justify-center rounded-full bg-ink py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90"
        >
          Continue · 3 / 4
        </button>
        <button
          type="button"
          onClick={() => navigate({ to: "/host/new/workshop-detail" })}
          className="block w-full rounded-full px-5 py-3 text-center font-body text-[13.5px] text-slate hover:text-plum-500"
        >
          Save as draft
        </button>
      </div>
    </EventsBackdrop>
  );
}
