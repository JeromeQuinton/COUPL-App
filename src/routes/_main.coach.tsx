import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUp, ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/_main/coach")({
  head: () => ({ meta: [{ title: "Polaris — COUPL" }] }),
  component: CoachThread,
});

type Msg = {
  id: string;
  sender: "me" | "liora";
  body: string;
};

const SEED: Msg[] = [
  {
    id: "m1",
    sender: "me",
    body: "What did you notice with Ava?",
  },
  {
    id: "m2",
    sender: "liora",
    body:
      "Her pace shifted on Tuesday. The reply gap stretched, then her sentences got shorter. Not a withdrawal — more like she's holding capacity for something else this week. Worth noticing without pulling on it.",
  },
  {
    id: "m3",
    sender: "me",
    body: "Why did Maya go quiet?",
  },
  {
    id: "m4",
    sender: "liora",
    body:
      "Maya's quiet often arrives when the conversation gets close to something specific — work, family. Her presence comes back when the topic widens again. It's a pattern worth attunement, not a flag.",
  },
];

function CoachThread() {
  const [draft, setDraft] = useState("");

  return (
    <div className="relative flex min-h-[100dvh] flex-col bg-paper">
      {/* Sticky header — same chrome shape as connection threads */}
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-plum-300/15 bg-paper/85 px-4 py-3 backdrop-blur-md">
        <Link
          to="/home"
          aria-label="Back"
          className="-ml-1 rounded-full p-1.5 text-plum-700 hover:bg-lavender-50"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <span
          aria-hidden
          className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-100 font-display text-[15px] font-semibold text-plum-700"
        >
          P
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-[15px] font-semibold text-ink">Polaris</p>
          <p className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-plum-500">
            AI · Polaris's voice
          </p>
        </div>
      </header>

      {/* Message list */}
      <main className="flex-1 px-4 py-5">
        <ul className="flex flex-col gap-3">
          {SEED.map((m) => (
            <li
              key={m.id}
              className={`flex ${m.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[78%] rounded-[18px] px-4 py-3 font-body text-[14px] leading-relaxed shadow-elev-1 ${
                  m.sender === "me"
                    ? "bg-plum-700 text-paper"
                    : "bg-pink-100 text-ink"
                }`}
              >
                {m.body}
              </div>
            </li>
          ))}
        </ul>
      </main>

      {/* Composer */}
      <div className="sticky bottom-0 border-t border-plum-300/15 bg-paper/90 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Ask Polaris about a connection…"
            className="flex-1 bg-transparent font-body text-[14px] text-ink placeholder-stone outline-none"
            aria-label="Message Polaris"
          />
          <button
            type="button"
            disabled={!draft.trim()}
            aria-label="Send"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-plum-700 text-paper disabled:bg-lavender-100 disabled:text-stone"
          >
            <ArrowUp className="h-4 w-4" strokeWidth={2.25} />
          </button>
        </div>
      </div>
    </div>
  );
}
