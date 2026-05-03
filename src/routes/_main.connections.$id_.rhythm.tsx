import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { PageBackdrop } from "@/components/connections/PageBackdrop";
import { getConnection } from "@/data/connections_sample";

/**
 * /connections/$id/rhythm — descriptive reading of conversation pace.
 *
 * Polaris-toned: surfaces patterns, never prescriptions. Phase 1 uses
 * deterministic per-connection synthetic readings; Phase 4 derives
 * from real `messages` timestamps server-side.
 */
export const Route = createFileRoute("/_main/connections/$id_/rhythm")({
  head: () => ({
    meta: [
      { title: "Rhythm — COUPL" },
      {
        name: "description",
        content:
          "How this conversation moves. A descriptive reading, not a score.",
      },
    ],
  }),
  component: RhythmScreen,
});

type Reading = {
  yourReply: string;
  theirReply: string;
  longestGap: string;
  longestGapNote: string;
  timeOfDay: string;
  dayPattern: string;
  bars: number[]; // 7 values 0-100, Mon-Sun activity heatline
  observation: string;
};

const READINGS: Record<string, Reading> = {
  ava: {
    yourReply: "Within an hour",
    theirReply: "Within twenty minutes",
    longestGap: "Three days",
    longestGapNote: "After the museum plan landed.",
    timeOfDay: "Evenings, mostly",
    dayPattern: "Sunday is quietest. Tuesday and Thursday carry the week.",
    bars: [55, 72, 40, 78, 50, 35, 18],
    observation:
      "There's a steady warmth here. Not constant, not anxious. They lead the back-and-forth on weekday evenings; you tend to surface ideas at the weekend.",
  },
  maya: {
    yourReply: "A few hours",
    theirReply: "Within an hour",
    longestGap: "A day and a half",
    longestGapNote: "A natural pause, no edge.",
    timeOfDay: "Late mornings",
    dayPattern: "Most active mid-week. Quieter at the weekend.",
    bars: [42, 68, 80, 70, 55, 22, 18],
    observation:
      "Quick, attentive replies from their side. Yours arrive considered. The pace is asymmetric but unhurried.",
  },
  jade: {
    yourReply: "Two to three hours",
    theirReply: "A day",
    longestGap: "Five days",
    longestGapNote: "A quiet stretch — you both came back warm.",
    timeOfDay: "Late evenings",
    dayPattern: "Bursts on Friday and Saturday.",
    bars: [25, 30, 28, 35, 60, 75, 45],
    observation:
      "The rhythm is slow and considered. Long gaps don't seem to cool the warmth. You both write more, less often.",
  },
};

const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];

function readingFor(id: string): Reading {
  return (
    READINGS[id] ?? {
      yourReply: "A few hours",
      theirReply: "A few hours",
      longestGap: "Two days",
      longestGapNote: "A natural pause.",
      timeOfDay: "Evenings",
      dayPattern: "Steady through the week.",
      bars: [45, 50, 55, 50, 60, 40, 35],
      observation:
        "There's a steady, unhurried pace here. Nothing performative on either side.",
    }
  );
}

function RhythmScreen() {
  const { id } = useParams({ from: "/_main/connections/$id_/rhythm" });
  const c = getConnection(id);
  const name = c?.name ?? "them";
  const r = readingFor(id);
  const max = Math.max(...r.bars, 1);

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
            Rhythm
          </p>
        </header>

        <div className="mt-6">
          <h1 className="font-display text-[26px] leading-[1.15] text-ink">
            How this conversation moves.
          </h1>
          <p className="mt-3 font-body text-[14.5px] leading-relaxed text-slate">
            A descriptive reading of pace and presence with {name}. Not a score.
            Not a target.
          </p>
        </div>

        {/* Reply pace */}
        <section className="mt-7 rounded-[18px] border border-plum-300/25 bg-paper/70 p-5 backdrop-blur-sm">
          <p className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-plum-500">
            Reply pace · last 30 days
          </p>
          <div className="mt-3 grid grid-cols-2 gap-4">
            <div>
              <p className="font-display text-[18px] text-ink">{r.yourReply}</p>
              <p className="mt-1 text-[12px] text-slate">Your typical reply</p>
            </div>
            <div>
              <p className="font-display text-[18px] text-ink">
                {r.theirReply}
              </p>
              <p className="mt-1 text-[12px] text-slate">Their typical reply</p>
            </div>
          </div>
          <p className="mt-4 font-body text-[13.5px] leading-relaxed text-slate">
            Reply pace varies with the day, the mood, the message. There's no
            "right" speed.
          </p>
        </section>

        {/* Gaps */}
        <section className="mt-4 rounded-[18px] border border-plum-300/25 bg-paper/70 p-5 backdrop-blur-sm">
          <p className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-plum-500">
            Longest gap
          </p>
          <p className="mt-2 font-display text-[20px] text-ink">
            {r.longestGap}
          </p>
          <p className="mt-2 font-body text-[13.5px] leading-relaxed text-slate">
            {r.longestGapNote}
          </p>
        </section>

        {/* Time of day */}
        <section className="mt-4 rounded-[18px] border border-plum-300/25 bg-paper/70 p-5 backdrop-blur-sm">
          <p className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-plum-500">
            Time of day
          </p>
          <p className="mt-2 font-display text-[18px] text-ink">
            {r.timeOfDay}
          </p>
          <p className="mt-2 font-body text-[13.5px] leading-relaxed text-slate">
            When you tend to find each other.
          </p>
        </section>

        {/* Day pattern */}
        <section className="mt-4 rounded-[18px] border border-plum-300/25 bg-paper/70 p-5 backdrop-blur-sm">
          <p className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-plum-500">
            Day pattern
          </p>
          <div className="mt-4 flex items-end justify-between gap-2">
            {r.bars.map((value, i) => {
              const h = Math.round((value / max) * 56) + 4;
              return (
                <div key={i} className="flex flex-1 flex-col items-center">
                  <div
                    className="w-full rounded-t-[6px] bg-gradient-to-t from-plum-300/60 to-plum-500/80"
                    style={{ height: `${h}px` }}
                    aria-hidden="true"
                  />
                  <span className="mt-2 text-[10.5px] font-medium uppercase tracking-[0.18em] text-plum-500">
                    {DAY_LABELS[i]}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="mt-4 font-body text-[13.5px] leading-relaxed text-slate">
            {r.dayPattern}
          </p>
        </section>

        {/* Polaris observation */}
        <section className="mt-4 rounded-[18px] border border-plum-300/25 bg-lavender-50/50 p-5 backdrop-blur-sm">
          <p className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-plum-500">
            Polaris · noticing
          </p>
          <p className="mt-3 font-body text-[14.5px] leading-relaxed text-ink">
            {r.observation}
          </p>
        </section>

        <p className="mt-6 text-[11.5px] text-slate">
          Rhythm is read from your shared messages. Nothing is shared with{" "}
          {name}.
        </p>
      </div>
    </PageBackdrop>
  );
}
