import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { ScreenHeader } from "@/components/shell/ScreenHeader";
import { SAMPLE_MONTHLY_SUMMARIES } from "@/data/coach_sample";

export const Route = createFileRoute("/_main/polaris/monthly-summary")({
  head: () => ({ meta: [{ title: "Monthly summary — COUPL" }] }),
  component: MonthlySummaryScreen,
});

// Phase 1 fixture: member tier on. Phase 4 reads from account_state.tier.
const isMember = true;

function MonthlySummaryScreen() {
  const summary = SAMPLE_MONTHLY_SUMMARIES.current;

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
        <ScreenHeader
          eyebrow="Polaris · monthly summary"
          title={`${summary.monthLabel}, in the round.`}
        />
      </header>

      {!isMember ? (
        <section className="px-5">
          <article className="rounded-[18px] border border-line bg-paper p-6 text-center shadow-elev-1">
            <p className="text-label-mono text-stone">Member</p>
            <p className="mt-3 font-display text-[16px] italic leading-relaxed text-ink">
              Polaris writes a longer reflection at the end of each month — a
              letter to keep, not a notification to swipe.
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
            <article className="rounded-[18px] bg-paper p-5 shadow-elev-1 space-y-4">
              {summary.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="font-body text-[14px] leading-relaxed text-ink"
                >
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

          <section className="px-5 pt-7">
            <p className="font-body text-[13.5px] italic leading-relaxed text-slate">
              If one thing stood out — sit with it.
            </p>
            <Link
              to="/polaris/chat"
              className="mt-3 inline-flex text-label-mono text-plum-700 hover:text-plum-500"
            >
              Talk to Polaris about it →
            </Link>
          </section>

          <div className="px-5 pt-8 pb-12">
            <Link
              to="/polaris/monthly-summary/$monthId"
              params={{ monthId: "2026-03" }}
              className="block w-full rounded-full px-5 py-3 text-center font-body text-[13.5px] text-slate hover:text-plum-500"
            >
              Past summaries
            </Link>
          </div>
        </>
      )}
    </YouBackdrop>
  );
}
