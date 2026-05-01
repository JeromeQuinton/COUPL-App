import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronLeft, MoreHorizontal, Send } from "lucide-react";
import { ConnectionAvatar } from "@/components/connections/Avatar";
import { CoachPromptCard } from "@/components/connections/CoachPromptCard";
import { MessageBubble } from "@/components/connections/MessageBubble";
import { PageBackdrop } from "@/components/connections/PageBackdrop";
import {
  getConnection,
  THREADS,
  type ThreadMessage,
} from "@/data/connections_sample";

/**
 * /connections/$id — live conversation thread.
 *
 * Calm iMessage-style timeline with embedded CoachPromptCard. Send
 * action routes to /connections/$id/pause when the draft trips a
 * pattern (Phase 1 stub: any non-empty draft routes to the intercept
 * so the flow is demonstrable). Phase 4 will run the real classifier
 * server-side and only intercept when needed.
 */
export const Route = createFileRoute("/_main/connections/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Conversation — COUPL` },
      {
        name: "description",
        content: `Conversation with ${params.id}.`,
      },
    ],
  }),
  component: ThreadScreen,
  notFoundComponent: () => (
    <div className="px-6 py-10 text-center">
      <p className="text-[14px] text-slate">Conversation not found.</p>
      <Link
        to="/connections"
        className="mt-3 inline-block text-[13px] font-medium text-plum-700"
      >
        Back to Connections
      </Link>
    </div>
  ),
  loader: ({ params }) => {
    if (!getConnection(params.id)) throw notFound();
    return null;
  },
});

function ThreadScreen() {
  const { id } = Route.useParams();
  const c = getConnection(id)!;
  const messages = THREADS[id] ?? [];
  const [draft, setDraft] = useState("");

  return (
    <PageBackdrop>
      <div
        className="mx-auto flex w-full max-w-[480px] flex-col px-4"
        style={{
          minHeight: "100dvh",
          paddingTop: "calc(env(safe-area-inset-top) + 0.75rem)",
          paddingBottom: "calc(env(safe-area-inset-bottom) + 100px)",
        }}
      >
        {/* Sticky header */}
        <header className="sticky top-0 z-10 -mx-4 flex items-center gap-3 border-b border-plum-300/15 bg-paper/85 px-4 py-3 backdrop-blur-md">
          <Link
            to="/connections"
            aria-label="Back to Connections"
            className="-ml-1 rounded-full p-1.5 text-plum-700 hover:bg-lavender-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <ConnectionAvatar initial={c.initial} hue={c.hue} size={36} />
          <div className="min-w-0 flex-1">
            <p className="font-display text-[15px] font-semibold text-ink">
              {c.name}
              <span
                aria-label="Verified"
                className="ml-1 text-[11px] text-plum-500"
              >
                ●
              </span>
            </p>
            <p className="text-[11.5px] text-slate">
              {c.daysAgoLabel} · {c.dayLabel}
            </p>
          </div>
          <button
            type="button"
            aria-label="Conversation options"
            className="rounded-full p-1.5 text-plum-700 hover:bg-lavender-50"
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </header>

        {/* Timeline */}
        <ol className="flex-1 space-y-3 py-5" aria-label="Conversation">
          {messages.map((m, i) => (
            <li key={i}>{renderMessage(m)}</li>
          ))}
        </ol>

        {/* Composer */}
        <div
          className="sticky bottom-[88px] -mx-4 border-t border-plum-300/15 bg-paper/90 px-4 py-3 backdrop-blur-md"
        >
          <div className="flex items-center gap-2 rounded-full border border-plum-300/30 bg-paper px-4 py-2">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Take your time…"
              className="flex-1 bg-transparent text-[14px] text-ink placeholder:text-stone focus:outline-none"
              aria-label="Message draft"
            />
            {draft.trim().length > 0 ? (
              <Link
                to="/connections/$id/pause"
                params={{ id }}
                aria-label="Review before sending"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-plum-500 text-paper transition-colors hover:bg-plum-700"
              >
                <Send className="h-3.5 w-3.5" />
              </Link>
            ) : (
              <span
                aria-hidden
                className="flex h-8 w-8 items-center justify-center rounded-full bg-plum-500/30 text-paper"
              >
                <Send className="h-3.5 w-3.5" />
              </span>
            )}
          </div>
        </div>
      </div>
    </PageBackdrop>
  );
}

function renderMessage(m: ThreadMessage) {
  if (m.kind === "time") {
    return (
      <div className="flex items-center justify-center py-2">
        <span className="text-[10.5px] font-medium uppercase tracking-[0.2em] text-plum-500">
          {m.label}
        </span>
      </div>
    );
  }
  if (m.kind === "coach") {
    return <CoachPromptCard title={m.title} body={m.body} onPrimary={() => {}} onSecondary={() => {}} />;
  }
  return <MessageBubble message={m} />;
}