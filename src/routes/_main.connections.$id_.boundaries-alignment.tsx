import { useMemo, useState } from "react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { BoundariesQuestion } from "@/components/connections/BoundariesQuestion";
import {
  BOUNDARIES_QUESTIONS,
  SAMPLE_BOUNDARIES_INSIGHT,
  SAMPLE_BOUNDARIES_PARTNER_STATE,
  type BoundariesAnswer,
  type BoundariesPartnerState,
} from "@/data/connections_sample";

export const Route = createFileRoute(
  "/_main/connections/$id_/boundaries-alignment",
)({
  head: () => ({ meta: [{ title: "Before you meet — COUPL" }] }),
  component: BoundariesAlignmentScreen,
});

const isMember = true;

type Stage = "intro" | "answering" | "waiting" | "stalled" | "revealed";

function BoundariesAlignmentScreen() {
  const { id } = useParams({
    from: "/_main/connections/$id_/boundaries-alignment",
  });

  const partnerState: BoundariesPartnerState =
    SAMPLE_BOUNDARIES_PARTNER_STATE[id_] ?? "not-started";
  const partnerInsight = SAMPLE_BOUNDARIES_INSIGHT[id_];

  const [stage, setStage] = useState<Stage>("intro");
  const [answers, setAnswers] = useState<Record<string, BoundariesAnswer>>({});

  const requiredAnswered = useMemo(
    () =>
      BOUNDARIES_QUESTIONS.filter((q) => !q.optional).every(
        (q) => answers[q.id]?.choice || answers[q.id]?.freeText,
      ),
    [answers],
  );

  const onSubmit = () => {
    if (!requiredAnswered) return;
    if (partnerState === "finished") setStage("revealed");
    else if (partnerState === "stalled") setStage("stalled");
    else setStage("waiting");
  };

  return (
    <div className="relative min-h-[100dvh] bg-paper">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-plum-300/15 bg-paper/85 px-4 py-3 backdrop-blur-md">
        <Link
          to="/connections/$id"
          params={{ id: id_ }}
          aria-label="Back"
          className="-ml-1 rounded-full p-1.5 text-plum-700 hover:bg-lavender-50"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <p className="font-display text-[15px] font-semibold text-ink">Boundaries</p>
      </header>

      <div className="px-5 pt-5 pb-12">
        <p className="text-label-mono">Connection · boundaries</p>
        <h1 className="mt-2 font-display text-[28px] leading-tight text-ink">
          Before you meet.
        </h1>

        <p className="mt-3 font-body text-[13.5px] italic leading-relaxed text-slate">
          A few quiet things to align on. Polaris keeps your answers private
          until you both finish — and gently lets the other person know you've
          done your part.
        </p>

        {!isMember ? (
          <article className="mt-7 rounded-[18px] border border-line bg-paper p-6 text-center shadow-elev-1">
            <p className="text-label-mono text-stone">Member</p>
            <p className="mt-3 font-display text-[16px] italic leading-relaxed text-ink">
              The pre-meet boundaries surface is a member-tier piece of
              relational depth.
            </p>
            <Link
              to="/membership/plans"
              className="mt-6 inline-flex rounded-full bg-plum-700 px-5 py-2.5 font-display text-[13.5px] font-medium text-paper hover:opacity-90"
            >
              See member plans
            </Link>
          </article>
        ) : stage === "intro" ? (
          <section className="mt-7 space-y-4">
            <article className="rounded-[18px] bg-paper p-5 shadow-elev-1 space-y-3">
              <p className="font-body text-[14px] leading-relaxed text-ink">
                Five short prompts. None are tests. None are dealbreakers.
                Polaris will share themes ("you're close on pace; you differ
                on substances") rather than your raw answers.
              </p>
              <p className="font-body text-[13.5px] italic text-stone">
                You can come back to this later. We won't nudge.
              </p>
            </article>
            <button
              type="button"
              onClick={() => setStage("answering")}
              className="w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90"
            >
              Begin
            </button>
          </section>
        ) : stage === "answering" ? (
          <>
            <ul className="mt-7 space-y-4">
              {BOUNDARIES_QUESTIONS.map((q) => (
                <li key={q.id}>
                  <BoundariesQuestion
                    question={q}
                    answer={answers[q.id]}
                    onChange={(next) =>
                      setAnswers((p) => ({ ...p, [q.id]: next }))
                    }
                  />
                </li>
              ))}
            </ul>
            <button
              type="button"
              disabled={!requiredAnswered}
              onClick={onSubmit}
              className="mt-7 w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Save my answers
            </button>
            <p className="mt-3 text-center font-body text-[12.5px] italic text-stone">
              The other person sees only that you've finished — never your answers.
            </p>
          </>
        ) : stage === "waiting" ? (
          <article className="mt-7 rounded-[18px] bg-paper p-5 shadow-elev-1">
            <p className="text-label-mono">Saved</p>
            <h2 className="mt-2 font-display text-[20px] leading-tight text-ink">
              You've done your part.
            </h2>
            <p className="mt-3 font-body text-[14px] leading-relaxed text-ink">
              We'll surface a quiet synthesis here once they've finished too.
              No nudging — they have until day fourteen, and after that the
              comparison will gently close.
            </p>
            <p className="mt-3 font-body text-[13px] italic text-stone">
              Your partner is still reflecting.
            </p>
          </article>
        ) : stage === "stalled" ? (
          <article className="mt-7 rounded-[18px] bg-paper p-5 shadow-elev-1">
            <p className="text-label-mono">Saved</p>
            <h2 className="mt-2 font-display text-[20px] leading-tight text-ink">
              You've done your part.
            </h2>
            <p className="mt-3 font-body text-[14px] leading-relaxed text-ink">
              They haven't finished yet. Polaris noted gently a few days ago;
              you don't need to do anything more here.
            </p>
            <p className="mt-3 font-body text-[13px] italic text-stone">
              If the comparison doesn't complete, it'll close quietly on day fourteen.
            </p>
          </article>
        ) : (
          /* revealed */
          <section className="mt-7 space-y-4">
            <article className="rounded-[18px] bg-paper p-5 shadow-elev-1 space-y-3">
              <p className="text-label-mono">Polaris noticed</p>
              {partnerInsight ? (
                <>
                  <p className="font-body text-[14px] leading-relaxed text-ink">
                    {partnerInsight.pacedShared}
                  </p>
                  <p className="font-body text-[14px] leading-relaxed text-ink">
                    {partnerInsight.paceDifferent}
                  </p>
                  <ul className="mt-3 space-y-1.5 font-body text-[13px] text-slate">
                    {partnerInsight.observations.map((o, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span
                          aria-hidden
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-plum-500"
                        />
                        {o}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="font-body text-[14px] leading-relaxed text-ink">
                  You're broadly aligned. Polaris will surface anything specific
                  if it shifts as you both spend more time together.
                </p>
              )}
            </article>
            <Link
              to="/connections/$id"
              params={{ id: id_ }}
              className="block w-full rounded-full px-5 py-3 text-center font-body text-[13.5px] text-slate hover:text-plum-500"
            >
              Back to chat
            </Link>
          </section>
        )}
      </div>
    </div>
  );
}
