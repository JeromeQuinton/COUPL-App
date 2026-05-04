import { useState } from "react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ChevronLeft, Send } from "lucide-react";
import { PageBackdrop } from "@/components/connections/PageBackdrop";
import { getEvent, FEATURED_EVENT } from "@/data/events_sample";

export const Route = createFileRoute("/_main/connections/$id_/organiser")({
  head: () => ({
    meta: [{ title: "Chat with organiser — COUPL" }],
  }),
  component: OrganiserChatScreen,
});

type Msg = { id: string; from: "you" | "organiser"; text: string; at: string };

const SAMPLE_THREAD: Msg[] = [
  {
    id: "m1",
    from: "organiser",
    text: "You're booked for Saturday — really glad. The address goes out the day before, plus my number if anything shifts.",
    at: "Wed 16:42",
  },
  {
    id: "m2",
    from: "you",
    text: "Thank you. Do you have a step-free entrance?",
    at: "Wed 17:08",
  },
  {
    id: "m3",
    from: "organiser",
    text: "Yes — main door is level, no steps to the dining room either. I'll meet you at the door if it helps.",
    at: "Wed 17:31",
  },
];

function OrganiserChatScreen() {
  const { id } = useParams({ from: "/_main/connections/$id_/organiser" });
  const e = getEvent(id) ?? FEATURED_EVENT;
  const [draft, setDraft] = useState("");
  const [thread, setThread] = useState<Msg[]>(SAMPLE_THREAD);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setThread((t) => [
      ...t,
      { id: `m${t.length + 1}`, from: "you", text, at: "now" },
    ]);
    setDraft("");
  };

  return (
    <PageBackdrop>
      <div
        className="mx-auto flex w-full max-w-[480px] flex-col px-5"
        style={{
          minHeight: "100dvh",
          paddingTop: "calc(env(safe-area-inset-top) + 0.75rem)",
          paddingBottom: "calc(env(safe-area-inset-bottom) + 1.25rem)",
        }}
      >
        <header className="flex items-center justify-between">
          <Link
            to="/events/$id"
            params={{ id: e.id }}
            aria-label="Back to event"
            className="-ml-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-plum-700 hover:bg-lavender-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <p className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-plum-700">
            Chat · organiser
          </p>
          <span aria-hidden className="w-8" />
        </header>

        <section className="mt-5 flex items-center gap-3">
          <div
            aria-hidden
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lavender-100 font-display text-[17px] text-plum-700"
          >
            {e.hostInitial}
          </div>
          <div className="min-w-0">
            <h1 className="font-display text-[22px] leading-tight text-ink">
              Chat with {e.host}.
            </h1>
            <p className="mt-0.5 font-body text-[12.5px] text-stone">
              Hosting {e.title}
            </p>
          </div>
        </section>

        <ol className="mt-6 flex-1 space-y-3">
          {thread.map((m) => (
            <li
              key={m.id}
              className={`flex flex-col ${m.from === "you" ? "items-end" : "items-start"}`}
            >
              <article
                className={`max-w-[78%] rounded-[16px] px-4 py-2.5 font-body text-[14px] leading-relaxed shadow-elev-1 ${
                  m.from === "you"
                    ? "bg-plum-700 text-paper"
                    : "bg-paper text-ink"
                }`}
              >
                {m.text}
              </article>
              <p className="mt-1 px-1 font-body text-[11px] text-stone">{m.at}</p>
            </li>
          ))}
        </ol>

        <p className="mt-6 text-center font-body text-[12px] italic text-stone">
          Organisers respond within 48 hours during workshop weeks.
        </p>

        <form
          onSubmit={(ev) => {
            ev.preventDefault();
            send();
          }}
          className="mt-3 flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-2 shadow-elev-1"
        >
          <input
            type="text"
            value={draft}
            onChange={(ev) => setDraft(ev.target.value)}
            placeholder="Write a message"
            className="flex-1 bg-transparent px-2 font-body text-[14px] text-ink placeholder:text-stone focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Send"
            disabled={!draft.trim()}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-plum-700 text-paper shadow-elev-1 disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </PageBackdrop>
  );
}
