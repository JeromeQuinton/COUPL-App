import { useState } from "react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { SAMPLE_WEEKLY_REVIEWS } from "@/data/coach_sample";

export const Route = createFileRoute("/_main/polaris/weekly-review/$weekId_")({
  head: () => ({ meta: [{ title: "Past week — COUPL" }] }),
  component: ArchivedWeeklyScreen,
});

function ArchivedWeeklyScreen() {
  const { weekId_ } = useParams({
    from: "/_main/polaris/weekly-review/$weekId_",
  });
  const review = SAMPLE_WEEKLY_REVIEWS[weekId_];
  const [compareOpen, setCompareOpen] = useState(false);

  if (!review) {
    return (
      <YouBackdrop>
        <StatusBar
          leading={
            <Link
              to="/polaris/weekly-review"
              aria-label="Back"
              className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
            >
              <ChevronLeft size={18} />
            </Link>
          }
        />
        <div className="px-5 pt-12 text-center">
          <p className="text-label-mono">Not found</p>
          <h1 className="mt-3 font-display text-[22px] text-ink">
            That week isn't in the archive.
          </h1>
        </div>
      </YouBackdrop>
    );
  }

  const prevId = weekId_ === "2026-w17" ? "2026-w16" : null;
  const prev = prevId ? SAMPLE_WEEKLY_REVIEWS[prevId] : null;

  return (
    <YouBackdrop>
      <StatusBar
        leading={
          <Link
            to="/polaris/weekly-review"
            aria-label="Back"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <p className="text-label-mono">Polaris · {review.weekLabel}</p>
        <h1 className="mt-2 font-display text-[28px] leading-tight text-ink">
          {review.weekLabel}.
        </h1>
      </header>

      <section className="px-5">
        <article className="rounded-[18px] bg-paper p-5 shadow-elev-1">
          <p className="font-body text-[14px] leading-relaxed text-ink">
            {review.reflection}
          </p>
        </article>
      </section>

      <section className="px-5 pt-7">
        <p className="text-label-mono">Your prompts that week</p>
        <ul className="mt-3 space-y-3">
          {review.prompts.map((prompt, i) => (
            <li
              key={i}
              className="rounded-[14px] border border-line bg-paper px-4 py-3"
            >
              <p className="font-display text-[13.5px] text-ink">{prompt}</p>
              <p className="mt-1 font-body text-[12.5px] italic text-stone">
                — your answer is private to you.
              </p>
            </li>
          ))}
        </ul>
      </section>

      {prev && (
        <section className="px-5 pt-7 pb-12">
          <button
            type="button"
            onClick={() => setCompareOpen((c) => !c)}
            className="block w-full rounded-full px-5 py-3 text-center font-body text-[13.5px] text-slate hover:text-plum-500"
          >
            {compareOpen ? "Hide comparison" : `Compare to ${prev.weekLabel}`}
          </button>
          {compareOpen && (
            <article className="mt-3 rounded-[14px] border border-line bg-paper p-4">
              <p className="text-label-mono">{prev.weekLabel}</p>
              <p className="mt-2 font-body text-[13px] leading-relaxed text-ink">
                {prev.reflection}
              </p>
            </article>
          )}
        </section>
      )}
    </YouBackdrop>
  );
}
