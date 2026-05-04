import { useState } from "react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ChevronLeft, Pause, Play } from "lucide-react";
import { GrowthBackdrop } from "@/components/growth/GrowthBackdrop";
import { StatusBar } from "@/components/events/StatusBar";

/**
 * /growth/$id/replay — workshop on-demand replay.
 *
 * Membership-gated (Phase 1 hard-coded; Phase 4 reads subscription).
 * Audio + transcript + practitioner notes.
 */
export const Route = createFileRoute("/_main/growth/$id_/replay")({
  head: () => ({
    meta: [{ title: "Replay — COUPL Growth" }],
  }),
  component: Replay,
});

const IS_MEMBER_V0 = true;

type Replay = {
  title: string;
  practitioner: string;
  duration: string;
  transcript: string[];
  notes: string[];
};

const REPLAYS: Record<string, Replay> = {
  "tea-honesty": {
    title: "Tea & Honesty",
    practitioner: "Lena Park",
    duration: "58:14",
    transcript: [
      "Welcome in. Get comfortable. The tea will keep.",
      "We're going to do less than you think. Most of the work is in noticing what wants to be said and what doesn't.",
      "When it's your turn, take the breath first. Don't rehearse the line in your head while someone else is talking.",
      "We'll close with one word each — not a summary, not a hot-take. The word that's still with you.",
    ],
    notes: [
      "The hardest part for most attendees is the first thirty seconds of silence. Hold it.",
      "If a conversation gets stuck on advice-giving, name it gently and pivot back to listening.",
      "End on time. The container matters as much as the content.",
    ],
  },
};

function Replay() {
  const { id } = useParams({ from: "/_main/growth/$id_/replay" });
  const replay = REPLAYS[id];
  const [playing, setPlaying] = useState(false);

  if (!IS_MEMBER_V0) {
    return (
      <GrowthBackdrop>
        <StatusBar
          leading={
            <Link
              to="/growth/$id"
              params={{ id }}
              aria-label="Back"
              className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
            >
              <ChevronLeft size={18} />
            </Link>
          }
        />
        <div className="mx-auto flex w-full max-w-[480px] flex-col px-5 pt-10">
          <p className="text-label-mono text-plum-700">Replay · Membership</p>
          <h1 className="mt-3 font-display text-[26px] leading-tight text-ink">
            Replay is a Membership room.
          </h1>
          <p className="mt-3 font-body text-[14px] leading-relaxed text-slate">
            Audio, full transcript, and the practitioner's notes — for the
            workshops you missed and the ones you'd like to sit with again.
          </p>
          <Link
            to="/membership/plans"
            className="mt-6 inline-flex w-fit rounded-full bg-plum-500 px-5 py-2.5 font-body text-[14px] font-medium text-paper"
          >
            See Membership
          </Link>
        </div>
      </GrowthBackdrop>
    );
  }

  if (!replay) {
    return (
      <GrowthBackdrop>
        <StatusBar
          leading={
            <Link
              to="/growth"
              aria-label="Back to Growth"
              className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
            >
              <ChevronLeft size={18} />
            </Link>
          }
        />
        <div className="mx-auto flex w-full max-w-[480px] flex-col px-5 pt-10">
          <p className="text-label-mono">Replay not yet available</p>
          <h1 className="mt-3 font-display text-[24px] leading-tight text-ink">
            Quietly being edited.
          </h1>
          <p className="mt-3 font-body text-[14px] text-slate">
            Replays land within a week of the live workshop. We'll let you
            know when it's ready.
          </p>
        </div>
      </GrowthBackdrop>
    );
  }

  return (
    <GrowthBackdrop>
      <StatusBar
        leading={
          <Link
            to="/growth/$id"
            params={{ id }}
            aria-label="Back"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-4">
        <p className="text-label-mono text-plum-700">Replay</p>
        <h1 className="mt-2 font-display text-[26px] leading-tight text-ink">
          {replay.title}
        </h1>
        <p className="mt-1 font-body text-[12.5px] text-slate">
          With {replay.practitioner} · {replay.duration}
        </p>
      </header>

      {/* Audio player placeholder */}
      <section className="px-5">
        <div className="rounded-[18px] bg-paper p-5 shadow-elev-1">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setPlaying((v) => !v)}
              aria-label={playing ? "Pause replay" : "Play replay"}
              className="grid h-12 w-12 place-items-center rounded-full bg-plum-500 text-paper hover:bg-plum-700"
            >
              {playing ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <div className="flex-1">
              <div
                className="h-1 w-full rounded-full bg-plum-300/30"
                aria-hidden
              >
                <div
                  className="h-full rounded-full bg-plum-500"
                  style={{ width: playing ? "32%" : "0%" }}
                />
              </div>
              <p className="mt-2 text-label-mono text-stone">
                {playing ? "Playing · 18:30" : "Tap to play"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Transcript */}
      <section className="px-5 pt-6">
        <p className="text-label-mono text-plum-700">Transcript</p>
        <div className="mt-3 flex flex-col gap-3">
          {replay.transcript.map((line, i) => (
            <p
              key={i}
              className="font-body text-[14.5px] leading-relaxed text-ink"
            >
              {line}
            </p>
          ))}
        </div>
      </section>

      {/* Practitioner notes */}
      <section className="px-5 pt-7 pb-12">
        <div className="rounded-[18px] border border-plum-300/40 bg-lavender-50/50 p-5">
          <p className="text-label-mono text-plum-700">
            Notes from {replay.practitioner}
          </p>
          <ul className="mt-3 flex flex-col gap-2.5">
            {replay.notes.map((n, i) => (
              <li
                key={i}
                className="font-body text-[14px] leading-relaxed text-ink"
              >
                · {n}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </GrowthBackdrop>
  );
}
