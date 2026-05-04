import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { GrowthBackdrop } from "@/components/growth/GrowthBackdrop";
import { StatusBar } from "@/components/events/StatusBar";

export const Route = createFileRoute("/_main/growth/monthly-summary")({
  head: () => ({
    meta: [
      { title: "Monthly summary — COUPL" },
      {
        name: "description",
        content: "Read yourself back. The shape of the last month.",
      },
    ],
  }),
  component: MonthlySummaryScreen,
});

// R4 Stream 1.9: STATS grid removed (DR-103). Charter-aligned descriptive
// pattern grid replaces it inline. Stream 4 will migrate this route to
// /polaris/monthly-summary; the STATS grid stays out either way.
const PATTERN_GRID = [
  { label: "Most common signal", phrase: "Repair, offered without delay" },
  { label: "Pace this month", phrase: "Steadier than March" },
  { label: "Repair moments noticed", phrase: "Three, all on the same day" },
];

function MonthlySummaryScreen() {
  return (
    <GrowthBackdrop tone="editorial">
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

      <header className="px-5 pt-2 pb-5">
        <p className="text-label-mono">Monthly · April · Issue N° 04</p>
        <h1 className="mt-2 font-display text-[30px] leading-tight text-ink">
          A month with <em className="font-display italic">yourself.</em>
        </h1>
        <p className="mt-3 font-body text-[14px] leading-relaxed text-slate">
          Across this month, your pacing, capacity, choices, and emotional patterns have begun to form a clearer shape.
        </p>
        <p className="mt-3 font-body text-[12.5px] italic text-stone">
          Retrospective honesty often reveals what intensity hides.
        </p>
      </header>

      <section className="px-5">
        <ul className="grid grid-cols-3 gap-2">
          {PATTERN_GRID.map((t) => (
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

      <section className="px-5 pt-6">
        <article
          className="rounded-[18px] border border-plum-300/25 px-5 py-5"
          style={{
            background:
              "linear-gradient(150deg, color-mix(in oklab, var(--blush) 70%, var(--paper)) 0%, color-mix(in oklab, var(--blush) 35%, var(--paper)) 100%)",
          }}
        >
          <p className="text-label-mono">A pattern we noticed</p>
          <p className="mt-2 font-display text-[16px] italic leading-snug text-ink">
            "You wrote most honestly on the days after a slow walk. There's something there."
          </p>
        </article>
      </section>

      <section className="px-5 pt-6 pb-12">
        <article className="rounded-[18px] border border-dashed border-plum-300/40 bg-paper px-5 py-5">
          <p className="text-label-mono">For May</p>
          <p className="mt-2 font-body text-[14px] leading-relaxed text-ink">
            Try writing your daily before checking the app.
          </p>
        </article>
      </section>
    </GrowthBackdrop>
  );
}
