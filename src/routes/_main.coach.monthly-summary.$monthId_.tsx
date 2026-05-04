import { useState } from "react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { SAMPLE_MONTHLY_SUMMARIES } from "@/data/coach_sample";

export const Route = createFileRoute(
  "/_main/coach/monthly-summary/$monthId_",
)({
  head: () => ({ meta: [{ title: "Monthly summary — COUPL" }] }),
  component: ArchivedSummaryScreen,
});

function ArchivedSummaryScreen() {
  const { monthId_ } = useParams({
    from: "/_main/coach/monthly-summary/$monthId_",
  });
  const summary = SAMPLE_MONTHLY_SUMMARIES[monthId_];
  const [compareOpen, setCompareOpen] = useState(false);

  if (!summary) {
    return (
      <YouBackdrop>
        <StatusBar
          leading={
            <Link
              to="/coach/monthly-summary"
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
            That summary isn't in the archive.
          </h1>
        </div>
      </YouBackdrop>
    );
  }

  const prevId = monthId_ === "2026-03" ? "2026-02" : null;
  const prev = prevId ? SAMPLE_MONTHLY_SUMMARIES[prevId] : null;

  return (
    <YouBackdrop>
      <StatusBar
        leading={
          <Link
            to="/coach/monthly-summary"
            aria-label="Back"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <p className="text-label-mono">Polaris · {summary.monthLabel}</p>
        <h1 className="mt-2 font-display text-[28px] leading-tight text-ink">
          {summary.monthLabel}, in the round.
        </h1>
      </header>

      <section className="px-5">
        <article className="rounded-[18px] bg-paper p-5 shadow-elev-1 space-y-4">
          {summary.paragraphs.map((p, i) => (
            <p key={i} className="font-body text-[14px] leading-relaxed text-ink">
              {p}
            </p>
          ))}
        </article>
      </section>

      <section className="px-5 pt-7">
        <p className="text-label-mono">Patterns this month</p>
        <ul className="mt-3 grid grid-cols-3 gap-2">
          {summary.patternGrid.map((t) => (
            <li
              key={t.label}
              className="rounded-[14px] border border-line bg-paper px-3 py-3"
            >
              <p className="font-body text-[10.5px] uppercase tracking-[0.12em] text-stone">
                {t.label}
              </p>
              <p className="mt-2 font-display text-[12.5px] leading-snug text-ink">
                {t.phrase}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {prev && (
        <section className="px-5 pt-7">
          <button
            type="button"
            onClick={() => setCompareOpen((c) => !c)}
            className="block w-full rounded-full px-5 py-3 text-center font-body text-[13.5px] text-slate hover:text-plum-500"
          >
            {compareOpen ? "Hide comparison" : `Compare to ${prev.monthLabel}`}
          </button>
          {compareOpen && (
            <article className="mt-3 rounded-[14px] border border-line bg-paper p-4">
              <p className="text-label-mono">{prev.monthLabel} · pattern grid</p>
              <ul className="mt-3 space-y-2 font-body text-[13px] leading-relaxed text-ink">
                {prev.patternGrid.map((t) => (
                  <li key={t.label}>
                    <span className="text-stone">{t.label}:</span> {t.phrase}
                  </li>
                ))}
              </ul>
            </article>
          )}
        </section>
      )}

      <div className="px-5 pt-8 pb-12" />
    </YouBackdrop>
  );
}
