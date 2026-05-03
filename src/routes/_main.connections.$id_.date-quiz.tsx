import { useState } from "react";
import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { PageBackdrop } from "@/components/connections/PageBackdrop";

export const Route = createFileRoute("/_main/connections/$id_/date-quiz")({
  head: () => ({ meta: [{ title: "Alignment quiz — COUPL" }] }),
  component: DateQuizScreen,
});

const QUESTIONS = [
  {
    q: "What sounds best for a first meet?",
    options: [
      { id: "walk", label: "A short walk" },
      { id: "coffee", label: "A slow coffee" },
      { id: "thing", label: "Something with a thing to do (gallery, reading, market)" },
    ],
  },
  {
    q: "How long do you want it to feel?",
    options: [
      { id: "hour", label: "An hour or so" },
      { id: "afternoon", label: "A long afternoon or evening" },
      { id: "open", label: "Open-ended — see how it goes" },
    ],
  },
  {
    q: "What kind of pace?",
    options: [
      { id: "quiet", label: "Quiet and slow — talking is enough" },
      { id: "mixed", label: "A bit of doing, a bit of talking" },
      { id: "busy", label: "Plenty going on around us" },
    ],
  },
];

function DateQuizScreen() {
  const { id } = useParams({ from: "/_main/connections/$id_/date-quiz" });
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0 = intro, 1-3 = Qs, 4 = result
  const [answers, setAnswers] = useState<(string | null)[]>([null, null, null]);

  // Sample mocked partner answers (in real Phase 4 we'd fetch their answers)
  const partner = ["walk", "afternoon", "quiet"];

  const setAnswer = (i: number, v: string) => {
    const next = [...answers];
    next[i] = v;
    setAnswers(next);
    if (i < 2) setStep(step + 1);
    else setStep(4);
  };

  const matchCount = answers.filter((a, i) => a === partner[i]).length;
  const summary =
    matchCount === 3
      ? "You're both pointing in the same direction. Lean into it."
      : matchCount === 2
      ? "You agree on most of it. The one difference is worth a quick word before you meet."
      : "You're after different things. Not a problem — but worth talking about now rather than at the table.";

  const labelOf = (qi: number, optId: string | null) =>
    QUESTIONS[qi].options.find((o) => o.id === optId)?.label ?? "—";

  return (
    <PageBackdrop>
      <div
        className="mx-auto w-full max-w-[460px] px-5"
        style={{
          minHeight: "100dvh",
          paddingTop: "calc(env(safe-area-inset-top) + 0.75rem)",
          paddingBottom: "calc(env(safe-area-inset-bottom) + 1.5rem)",
        }}
      >
        <header className="flex items-center justify-between">
          <Link to="/connections/$id" params={{ id }} aria-label="Back" className="-ml-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-plum-700 hover:bg-lavender-50">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <p className="text-label-mono">Alignment</p>
          <span aria-hidden className="w-8" />
        </header>

        {step >= 1 && step <= 3 && (
          <div className="mt-6 flex items-center gap-2" aria-hidden>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-1.5 w-6 rounded-full"
                style={{ background: i < step ? "var(--lavender-100)" : "var(--line)" }}
              />
            ))}
          </div>
        )}

        {step === 0 && (
          <div className="mt-8">
            <h1 className="font-display text-[28px] leading-tight text-ink">
              Three questions. Two minutes. No score.
            </h1>
            <p className="mt-4 font-body text-[14px] leading-relaxed text-slate">
              Both of you answer separately. Then we show what you both said. If you're not aligned, that's just useful context — not a verdict.
            </p>
            <div className="mt-8">
              <button type="button" onClick={() => setStep(1)} className="w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90">
                Start
              </button>
            </div>
          </div>
        )}

        {step >= 1 && step <= 3 && (
          <div className="mt-8">
            <h1 className="font-display text-[24px] leading-tight text-ink">
              {QUESTIONS[step - 1].q}
            </h1>
            <ul className="mt-6 space-y-2">
              {QUESTIONS[step - 1].options.map((opt) => (
                <li key={opt.id}>
                  <button
                    type="button"
                    onClick={() => setAnswer(step - 1, opt.id)}
                    className="block w-full rounded-[14px] border border-line bg-paper px-4 py-3.5 text-left transition-colors hover:bg-lavender-50"
                  >
                    <p className="font-display text-[14.5px] text-ink">{opt.label}</p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {step === 4 && (
          <div className="mt-8">
            <h1 className="font-display text-[26px] leading-tight text-ink">
              What you both said.
            </h1>
            <ul className="mt-6 space-y-5">
              {QUESTIONS.map((q, i) => (
                <li key={i} className="rounded-[14px] border border-line bg-paper px-4 py-3.5">
                  <p className="text-label-mono">Q{i + 1}</p>
                  <p className="mt-1 font-body text-[13px] text-slate">{q.q}</p>
                  <p className="mt-3 text-label-mono">YOU SAID</p>
                  <p className="mt-1 font-display text-[14.5px] italic text-ink">{labelOf(i, answers[i])}</p>
                  <p className="mt-3 text-label-mono">THEM</p>
                  <p className="mt-1 font-display text-[14.5px] italic text-ink">{labelOf(i, partner[i])}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-display text-[16px] italic text-stone">
              {summary}
            </p>
            <div className="mt-8">
              <Link
                to="/connections/$id"
                params={{ id }}
                className="block w-full rounded-full bg-plum-700 px-5 py-3.5 text-center font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90"
              >
                Back to thread
              </Link>
            </div>
          </div>
        )}
      </div>
    </PageBackdrop>
  );
}
