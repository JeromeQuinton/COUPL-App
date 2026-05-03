import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { PageBackdrop } from "@/components/connections/PageBackdrop";
import { getConnection } from "@/data/connections_sample";

/**
 * /connections/$id/moments — vertical timeline of shared history.
 *
 * Quiet timeline of plan-attended dates, voice memos, photos, coach
 * insights actioned, and milestone-as-noticing markers (first hello,
 * first plan accepted, first photo, first repair). Editorial framing,
 * never gamified. Phase 4 sources from real events.
 */
export const Route = createFileRoute("/_main/connections/$id_/moments")({
  head: () => ({
    meta: [
      { title: "Moments — COUPL" },
      {
        name: "description",
        content:
          "A timeline of what's happened between you. Noticed, not scored.",
      },
    ],
  }),
  component: MomentsScreen,
});

type MomentKind =
  | "milestone"
  | "plan"
  | "voice"
  | "photo"
  | "coach"
  | "message";

type Moment = {
  kind: MomentKind;
  whenLabel: string;
  title: string;
  body?: string;
};

const MOMENTS: Record<string, Moment[]> = {
  ava: [
    {
      kind: "milestone",
      whenLabel: "Today",
      title: "First repair",
      body: "A small misread. You named it. They met you there.",
    },
    {
      kind: "voice",
      whenLabel: "Yesterday",
      title: "Voice memo",
      body: "Forty-three seconds. About the pottery studio.",
    },
    {
      kind: "coach",
      whenLabel: "Sunday",
      title: "Coach insight actioned",
      body: "You slowed the pace after a quick read.",
    },
    {
      kind: "milestone",
      whenLabel: "Last Thursday",
      title: "First shared photo",
      body: "The Sunday morning bowl. Sent without caption.",
    },
    {
      kind: "plan",
      whenLabel: "Two weeks ago",
      title: "Plan attended · pottery taster",
      body: "Two hours. Walked back the long way.",
    },
    {
      kind: "milestone",
      whenLabel: "Three weeks ago",
      title: "First plan accepted",
      body: "Pottery on a Sunday morning.",
    },
    {
      kind: "milestone",
      whenLabel: "A month ago",
      title: "First hello",
      body: "Started with a question, not a compliment.",
    },
  ],
  maya: [
    {
      kind: "voice",
      whenLabel: "Today",
      title: "Voice memo",
      body: "Reading aloud from the book you swapped.",
    },
    {
      kind: "milestone",
      whenLabel: "Last weekend",
      title: "First plan accepted",
      body: "Bookshop crawl, Saturday afternoon.",
    },
    {
      kind: "coach",
      whenLabel: "Last Tuesday",
      title: "Coach insight actioned",
      body: "You shared something specific instead of polished.",
    },
    {
      kind: "milestone",
      whenLabel: "A week ago",
      title: "First hello",
      body: "Opened with a real question.",
    },
  ],
  jade: [
    {
      kind: "milestone",
      whenLabel: "Last week",
      title: "First plan accepted",
      body: "Sunday walk along the canal.",
    },
    {
      kind: "photo",
      whenLabel: "Two weeks ago",
      title: "Shared photo",
      body: "The ferry. Light on the water.",
    },
    {
      kind: "milestone",
      whenLabel: "Three weeks ago",
      title: "First hello",
      body: "A slow start. Both warm from the off.",
    },
  ],
};

const KIND_LABEL: Record<MomentKind, string> = {
  milestone: "Noticed",
  plan: "Plan",
  voice: "Voice",
  photo: "Photo",
  coach: "Coach",
  message: "Message",
};

function momentsFor(id: string): Moment[] {
  return (
    MOMENTS[id] ?? [
      {
        kind: "milestone",
        whenLabel: "This week",
        title: "First hello",
        body: "The start of whatever this becomes.",
      },
    ]
  );
}

function MomentsScreen() {
  const { id } = useParams({ from: "/_main/connections/$id_/moments" });
  const c = getConnection(id);
  const name = c?.name ?? "them";
  const moments = momentsFor(id);

  return (
    <PageBackdrop>
      <div
        className="mx-auto flex w-full max-w-[480px] flex-col px-6"
        style={{
          minHeight: "100dvh",
          paddingTop: "calc(env(safe-area-inset-top) + 0.75rem)",
          paddingBottom: "calc(env(safe-area-inset-bottom) + 2rem)",
        }}
      >
        <header className="flex items-center gap-2 py-2">
          <Link
            to="/connections/$id"
            params={{ id }}
            aria-label="Back to conversation"
            className="-ml-1 rounded-full p-1.5 text-plum-700 hover:bg-lavender-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <p className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-plum-500">
            Moments
          </p>
        </header>

        <div className="mt-6">
          <h1 className="font-display text-[26px] leading-[1.15] text-ink">
            What's happened between you.
          </h1>
          <p className="mt-3 font-body text-[14.5px] leading-relaxed text-slate">
            Quietly noticed. With {name}, in order. Not a tally.
          </p>
        </div>

        <ol className="mt-7 space-y-0" aria-label="Timeline of moments">
          {moments.map((m, i) => {
            const isLast = i === moments.length - 1;
            const isMilestone = m.kind === "milestone";
            return (
              <li key={i} className="relative pl-8">
                {/* Vertical guideline */}
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="absolute left-[7px] top-4 bottom-0 w-px bg-plum-300/40"
                  />
                )}
                {/* Node dot */}
                <span
                  aria-hidden="true"
                  className={
                    isMilestone
                      ? "absolute left-[2px] top-2.5 h-3.5 w-3.5 rounded-full border-2 border-plum-500 bg-paper"
                      : "absolute left-[4px] top-3 h-2.5 w-2.5 rounded-full bg-plum-400"
                  }
                />
                <article className="pb-6">
                  <p className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-plum-500">
                    {m.whenLabel} · {KIND_LABEL[m.kind]}
                  </p>
                  <h2
                    className={
                      isMilestone
                        ? "mt-2 font-display text-[18px] leading-[1.25] text-ink"
                        : "mt-2 font-display text-[16px] leading-[1.25] text-ink"
                    }
                  >
                    {m.title}
                  </h2>
                  {m.body && (
                    <p className="mt-1.5 font-body text-[13.5px] leading-relaxed text-slate">
                      {m.body}
                    </p>
                  )}
                </article>
              </li>
            );
          })}
        </ol>

        <p className="mt-2 text-[11.5px] text-slate">
          Milestones are noticed, not unlocked. Visible only to you.
        </p>
      </div>
    </PageBackdrop>
  );
}
