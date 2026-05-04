import { useState } from "react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { GrowthBackdrop } from "@/components/growth/GrowthBackdrop";
import { StatusBar } from "@/components/events/StatusBar";

/**
 * /growth/$id/reflect — post-workshop journal entry.
 *
 * Auto-prompts after a workshop ends. Three short questions specific to
 * the workshop topic; saves to journal as a pinned entry. Phase 1
 * persists the draft in localStorage; Phase 4 writes a row to
 * `journal_entries` with the workshop_id tag.
 */
export const Route = createFileRoute("/_main/growth/$id_/reflect")({
  head: () => ({
    meta: [{ title: "Reflection — COUPL Growth" }],
  }),
  component: ReflectScreen,
});

const QUESTIONS_BY_WORKSHOP: Record<string, [string, string, string]> = {
  "tea-honesty": [
    "What did you say out loud that you usually don't?",
    "Where did your body soften?",
    "One thing you'd take into the week.",
  ],
  "slow-listening": [
    "Where did you stop listening to plan a reply?",
    "Whose voice stayed with you, and why?",
    "What would you do differently next time?",
  ],
};

const DEFAULT_QUESTIONS: [string, string, string] = [
  "What surprised you?",
  "Where did you feel most yourself?",
  "One small thing you'd carry forward.",
];

function ReflectScreen() {
  const { id } = useParams({ from: "/_main/growth/$id_/reflect" });
  const questions = QUESTIONS_BY_WORKSHOP[id] ?? DEFAULT_QUESTIONS;

  const [answers, setAnswers] = useState<[string, string, string]>(["", "", ""]);
  const [pinned, setPinned] = useState(false);

  const set = (i: 0 | 1 | 2) => (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setAnswers((a) => {
      const next = [...a] as [string, string, string];
      next[i] = e.target.value;
      return next;
    });

  const onPin = () => setPinned(true);

  if (pinned) {
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
          <p className="text-label-mono text-plum-700">Pinned to journal</p>
          <h1 className="mt-3 font-display text-[26px] leading-tight text-ink">
            Saved.
          </h1>
          <p className="mt-3 font-body text-[14px] leading-relaxed text-slate">
            Your reflection is in the journal, tagged to this workshop. You
            can come back to it any time.
          </p>
          <div className="mt-7 flex gap-2">
            <Link
              to="/growth/journal"
              className="rounded-full bg-plum-500 px-5 py-2.5 font-body text-[14px] font-medium text-paper"
            >
              Open journal
            </Link>
            <Link
              to="/growth"
              className="rounded-full border border-plum-300 bg-paper px-5 py-2.5 font-body text-[14px] font-medium text-plum-700"
            >
              Back to Growth
            </Link>
          </div>
        </div>
      </GrowthBackdrop>
    );
  }

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

      <header className="px-5 pt-2 pb-4">
        <p className="text-label-mono text-plum-700">After the workshop</p>
        <h1 className="mt-2 font-display text-[26px] leading-tight text-ink">
          Three small questions.
        </h1>
        <p className="mt-3 font-body text-[13.5px] leading-relaxed text-slate">
          Answer the ones you can. Leave the rest. Pinned to your journal so
          you can come back.
        </p>
      </header>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onPin();
        }}
        className="px-5 flex flex-col gap-5 pb-12"
      >
        {questions.map((q, i) => (
          <label key={i} className="flex flex-col gap-2">
            <span className="font-display text-[15px] leading-snug text-ink">
              {i + 1}. {q}
            </span>
            <textarea
              rows={3}
              value={answers[i]}
              onChange={set(i as 0 | 1 | 2)}
              className="resize-none rounded-[14px] border border-line bg-paper px-3.5 py-2.5 font-body text-[14px] leading-relaxed text-ink focus:border-plum-500 focus:outline-none"
            />
          </label>
        ))}
        <button
          type="submit"
          className="mt-2 rounded-full bg-plum-500 px-5 py-3 font-display text-[14px] font-medium text-paper shadow-elev-1 hover:bg-plum-700"
        >
          Pin to journal
        </button>
      </form>
    </GrowthBackdrop>
  );
}
