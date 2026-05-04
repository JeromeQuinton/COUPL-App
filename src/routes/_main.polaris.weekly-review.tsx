import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { SAMPLE_WEEKLY_REVIEWS } from "@/data/coach_sample";

export const Route = createFileRoute("/_main/polaris/weekly-review")({
  head: () => ({ meta: [{ title: "This week — COUPL" }] }),
  component: WeeklyReviewScreen,
});

const isMember = true;

function WeeklyReviewScreen() {
  const review = SAMPLE_WEEKLY_REVIEWS.current;
  const [answers, setAnswers] = useState<Record<number, string>>({});

  return (
    <YouBackdrop>
      <StatusBar
        leading={
          <Link
            to="/polaris/chat"
            aria-label="Back"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <p className="text-label-mono">Polaris · this week</p>
        <h1 className="mt-2 font-display text-[28px] leading-tight text-ink">
          What this week was like.
        </h1>
      </header>

      {!isMember ? (
        <section className="px-5">
          <article className="rounded-[18px] border border-line bg-paper p-6 text-center shadow-elev-1">
            <p className="text-label-mono text-stone">Member</p>
            <p className="mt-3 font-display text-[16px] italic leading-relaxed text-ink">
              A short Polaris reflection on your week, plus three quiet prompts
              to sit with.
            </p>
            <Link
              to="/membership/plans"
              className="mt-6 inline-flex rounded-full bg-plum-700 px-5 py-2.5 font-display text-[13.5px] font-medium text-paper hover:opacity-90"
            >
              See member plans
            </Link>
          </article>
        </section>
      ) : (
        <>
          <section className="px-5">
            <article className="rounded-[18px] bg-paper p-5 shadow-elev-1">
              <p className="font-body text-[14px] leading-relaxed text-ink">
                {review.reflection}
              </p>
            </article>
          </section>

          <section className="px-5 pt-7">
            <p className="text-label-mono">Three small prompts</p>
            <ul className="mt-3 space-y-3">
              {review.prompts.map((prompt, i) => (
                <li key={i}>
                  <label className="block">
                    <span className="font-display text-[14px] text-ink">
                      {prompt}
                    </span>
                    <input
                      type="text"
                      value={answers[i] ?? ""}
                      onChange={(e) =>
                        setAnswers((a) => ({ ...a, [i]: e.target.value }))
                      }
                      placeholder="A line or two."
                      className="mt-2 w-full rounded-[12px] border border-line bg-paper px-3.5 py-2.5 font-body text-[13.5px] text-ink placeholder:text-stone focus:border-plum-500 focus:outline-none"
                    />
                  </label>
                </li>
              ))}
            </ul>
          </section>

          <div className="px-5 pt-8 pb-12">
            <Link
              to="/polaris/weekly-review/$weekId_"
              params={{ weekId: "2026-w17" }}
              className="block w-full rounded-full px-5 py-3 text-center font-body text-[13.5px] text-slate hover:text-plum-500"
            >
              Past weeks
            </Link>
          </div>
        </>
      )}
    </YouBackdrop>
  );
}
