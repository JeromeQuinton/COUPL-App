import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUp, ChevronLeft, ImageIcon, Mic, MoreHorizontal, Smile, Video } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VoiceMemoSheet } from "@/components/connections/VoiceMemoSheet";
import { ConnectionAvatar } from "@/components/connections/Avatar";
import { CoachPromptCard } from "@/components/connections/CoachPromptCard";
import { MessageBubble } from "@/components/connections/MessageBubble";
import { PlanInviteCard } from "@/components/connections/PlanInviteCard";
import { ProfilePeek } from "@/components/connections/ProfilePeek";
import { TypingIndicator } from "@/components/connections/TypingIndicator";
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
 * action routes to /connections/$id/draft-pause when the draft trips a
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
  // Stream 8-3 leftover: messages held in local state so the VoiceMemoSheet
  // send action can append. Phase 4 wires a real `messages` table.
  const [messages, setMessages] = useState<ThreadMessage[]>(
    () => THREADS[id] ?? [],
  );
  const appendVoiceMemo = (durationSeconds: number) => {
    setMessages((prev) => [
      ...prev,
      {
        kind: "voice",
        from: "me",
        durationSeconds: Math.max(1, Math.round(durationSeconds)),
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };
  const [draft, setDraft] = useState("");
  const [peekOpen, setPeekOpen] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);

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
          <button
            type="button"
            onClick={() => setPeekOpen(true)}
            aria-label={`Open ${c.name} profile preview`}
            className="rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-plum-500"
          >
            <ConnectionAvatar initial={c.initial} hue={c.hue} size={36} />
          </button>
          <div className="min-w-0 flex-1">
            <p className="font-display text-[15px] font-semibold text-ink">
              {c.name}
            </p>
            <p className="text-[11.5px] text-slate">
              Connected · Coach on
            </p>
          </div>
          <Link
            to="/video/pre-meet/$connectionId"
            params={{ connectionId: id }}
            aria-label="Start a video call"
            className="rounded-full p-1.5 text-plum-700 hover:bg-lavender-50"
          >
            <Video className="h-5 w-5" />
          </Link>
          <Link
            to="/connections/$id/propose-plan"
            params={{ id }}
            className="text-label-mono text-plum-700 hover:underline"
          >
            PROPOSE
          </Link>
          <Link
            to="/connections/$id/insights"
            params={{ id }}
            className="text-label-mono text-plum-700 hover:underline"
          >
            INSIGHTS
          </Link>
          <Link
            to="/coach"
            className="text-label-mono text-plum-700 hover:underline"
          >
            ASK POLARIS
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label="More options for this conversation"
                className="rounded-full p-1.5 text-plum-700 hover:bg-lavender-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-plum-500"
              >
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={6}
              className="min-w-[200px] rounded-[14px] border-plum-300/30 bg-paper/95 p-1.5 backdrop-blur-md"
            >
              <DropdownMenuItem
                asChild
                className="rounded-[10px] px-3 py-2 text-[14px] text-ink focus:bg-lavender-50 focus:text-ink"
              >
                <Link to="/connections/$id/notes" params={{ id }}>
                  Notes
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="rounded-[10px] px-3 py-2 text-[14px] text-ink focus:bg-lavender-50 focus:text-ink"
              >
                <Link to="/connections/$id/rhythm" params={{ id }}>
                  Rhythm
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="rounded-[10px] px-3 py-2 text-[14px] text-ink focus:bg-lavender-50 focus:text-ink"
              >
                <Link to="/connections/$id/moments" params={{ id }}>
                  Moments
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="rounded-[10px] px-3 py-2 text-[14px] text-ink focus:bg-lavender-50 focus:text-ink"
              >
                <Link to="/connections/$id/export" params={{ id }}>
                  Export
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-1 bg-plum-300/30" />
              <DropdownMenuItem
                asChild
                className="rounded-[10px] px-3 py-2 text-[14px] text-plum-700 focus:bg-lavender-50 focus:text-plum-700"
              >
                <Link to="/connections/$id/clean-ending" params={{ id }}>
                  Clean ending
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Timeline */}
        <ol className="flex-1 space-y-3 py-5" aria-label="Conversation">
          {messages.map((m, i) => (
            <li key={i}>{renderMessage(m, id)}</li>
          ))}
        </ol>

        <TypingIndicator name={c.name} />

        {/* Phase 1 demo triggers — replaced by automated triggers in Phase 4 */}
        <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
          <Link
            to="/connections/$id/green-flag"
            params={{ id }}
            className="rounded-full border border-plum-300/30 bg-paper/70 px-3 py-1 text-plum-700 hover:bg-lavender-50"
          >
            Show green flag (demo)
          </Link>
          <Link
            to="/connections/$id/red-flag"
            params={{ id }}
            className="rounded-full border border-plum-300/30 bg-paper/70 px-3 py-1 text-plum-700 hover:bg-lavender-50"
          >
            Show red flag (demo)
          </Link>
        </div>

        {/* Composer */}
        <div className="sticky bottom-[88px] -mx-4 border-t border-line bg-paper px-4 py-3">
          <div className="flex items-end gap-2">
            <button
              type="button"
              aria-label="Attach photo"
              className="flex size-9 shrink-0 items-center justify-center rounded-full text-slate hover:bg-lavender-100 hover:text-plum-700 transition-colors"
            >
              <ImageIcon className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Record voice note"
              onClick={() => setVoiceOpen(true)}
              className="flex size-9 shrink-0 items-center justify-center rounded-full text-slate hover:bg-lavender-100 hover:text-plum-700 transition-colors"
            >
              <Mic className="size-5" />
            </button>
            <div className="flex flex-1 items-end rounded-2xl border border-line bg-paper focus-within:border-plum-500 transition-colors">
              <textarea
                rows={1}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Take your time…"
                className="flex-1 resize-none bg-transparent px-4 py-2 text-ink placeholder:text-stone focus:outline-none"
                aria-label="Message draft"
              />
              <button
                type="button"
                aria-label="Add emoji"
                className="mr-1 flex size-8 items-center justify-center rounded-full text-slate hover:bg-lavender-100 hover:text-plum-700 transition-colors"
              >
                <Smile className="size-4" />
              </button>
            </div>
            {draft.trim().length > 0 ? (
              <Link
                to="/connections/$id/draft-pause"
                params={{ id }}
                aria-label="Send"
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-ink text-paper hover:bg-plum-700 transition-colors"
              >
                <ArrowUp className="size-5" />
              </Link>
            ) : (
              <button
                type="button"
                aria-label="Send"
                disabled
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-stone text-paper opacity-60 cursor-not-allowed"
              >
                <ArrowUp className="size-5" />
              </button>
            )}
          </div>
        </div>
      </div>
      <VoiceMemoSheet
        open={voiceOpen}
        onClose={() => setVoiceOpen(false)}
        onSend={(seconds) => {
          appendVoiceMemo(seconds);
          setVoiceOpen(false);
        }}
      />
      <ProfilePeek
        open={peekOpen}
        onClose={() => setPeekOpen(false)}
        name={c.name}
        about="I notice the small things first — the way someone holds a coffee, what they laugh at twice."
        languages={["English", "Portuguese"]}
        topPrompt={{
          question: "Something I'm sitting with",
          answer: "How to want closeness without losing my own pace.",
        }}
      />
    </PageBackdrop>
  );
}

function renderMessage(m: ThreadMessage, id: string) {
  if (m.kind === "time") {
    return (
      <div className="flex items-center justify-center py-2">
        <span className="text-[10.5px] font-medium uppercase tracking-[0.2em] text-plum-500">
          {m.label}
        </span>
      </div>
    );
  }
  if (m.kind === "plan_invite") {
    return (
      <PlanInviteCard
        invite={m}
        connectionId={id}
        viewerIsRecipient={m.from === "them"}
        onAccept={() => {}}
        onDecline={() => {}}
      />
    );
  }
  if (m.kind === "coach") {
    return (
      <div>
        <CoachPromptCard
          title={m.title}
          body={m.body}
          wireframe
          onPrimary={() => {}}
          onSecondary={() => {}}
        />
        <Link
          to="/connections/$id/coach-insight"
          params={{ id }}
          className="mt-2 inline-block text-[12px] font-medium text-plum-500 underline decoration-plum-300/50 underline-offset-[3px] hover:text-plum-700"
        >
          Open coach note →
        </Link>
      </div>
    );
  }
  return <MessageBubble message={m} />;
}