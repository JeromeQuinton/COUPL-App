import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { ScreenHeader } from "@/components/shell/ScreenHeader";
import { SAMPLE_TRANSPARENCY_QUARTER } from "@/data/safety_sample";

export const Route = createFileRoute("/_main/profile/safety/transparency")({
  head: () => ({ meta: [{ title: "Transparency — COUPL" }] }),
  component: TransparencyScreen,
});

function TransparencyScreen() {
  const q = SAMPLE_TRANSPARENCY_QUARTER;

  return (
    <YouBackdrop tone="serious">
      <StatusBar
        leading={
          <Link
            to="/profile/safety/moderation"
            aria-label="Back"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <ScreenHeader eyebrow="Safety · transparency" title="What we did this quarter." />
        <p className="mt-3 text-label-mono text-stone">{q.period}</p>
      </header>

      <section className="px-5 space-y-3">
        {q.overview.map((para, i) => (
          <p
            key={i}
            className="font-body text-[14px] leading-relaxed text-ink"
          >
            {para}
          </p>
        ))}
      </section>

      <section className="px-5 pt-7">
        <p className="text-label-mono">By the numbers</p>
        <ul className="mt-3 divide-y divide-line rounded-[14px] border border-line bg-paper">
          {q.numbers.map((n) => (
            <li key={n.label} className="flex items-baseline justify-between gap-3 px-4 py-4">
              <span className="font-display text-[28px] font-semibold text-ink tabular-nums">
                {n.value}
              </span>
              <span className="font-body text-[12.5px] uppercase tracking-[0.12em] text-stone">
                {n.label}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="px-5 pt-7">
        <p className="text-label-mono">What this means for you</p>
        <p className="mt-3 font-body text-[14px] leading-relaxed text-ink">
          {q.whatThisMeans}
        </p>
      </section>

      {q.appeals && (
        <section className="px-5 pt-7">
          <p className="text-label-mono">Appeals</p>
          <p className="mt-2 font-body text-[13.5px] leading-relaxed text-ink">
            In {q.period}, {q.appeals.reviewed} people appealed moderation
            decisions. We changed our decision in {q.appeals.reversed} cases
            after a second review.
          </p>
        </section>
      )}

      <div className="px-5 pt-8 pb-12">
        <Link
          to="/community-guidelines"
          className="block w-full rounded-full px-5 py-3 text-center font-body text-[13.5px] text-slate hover:text-plum-500"
        >
          Read our community guidelines
        </Link>
      </div>
    </YouBackdrop>
  );
}
