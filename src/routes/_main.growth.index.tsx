import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { GrowthBackdrop } from "@/components/growth/GrowthBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import {
  CURRENT_ARC,
  REFLECTIONS,
  WORKSHOPS,
} from "@/data/growth_sample";

/**
 * Growth dashboard (Chapter 07).
 * Preserved by request: richer arc + reflection archive + workshops list.
 * The earlier wireframe-only "tabs + trends + flow" version is intentionally
 * rolled back; that surface lives in Insights/Workshops sub-routes when built.
 */
export const Route = createFileRoute("/_main/growth/")({
  head: () => ({
    meta: [
      { title: "Growth — COUPL" },
      {
        name: "description",
        content:
          "The work that makes the dating part easier. Six-week arcs, journal, workshops with practitioners.",
      },
    ],
  }),
  component: GrowthDashboard,
});

function GrowthDashboard() {
  const arc = CURRENT_ARC;
  const dots = Array.from({ length: arc.weeksTotal }, (_, i) => i + 1);

  return (
    <GrowthBackdrop>
      <StatusBar />

      {/* Header */}
      <header className="px-5 pt-2 pb-5">
        <h1 className="text-display-xl text-ink">Growth</h1>
        <p className="mt-1 text-body-sm text-slate">
          The work that makes the dating part easier.
        </p>
      </header>

      {/* Current arc card */}
      <section className="px-5">
        <article
          className="rounded-[20px] border border-blush/60 p-5 shadow-elev-1"
          style={{
            background:
              "linear-gradient(160deg, color-mix(in oklab, var(--blush) 55%, var(--paper)) 0%, color-mix(in oklab, var(--blush) 30%, var(--paper)) 100%)",
          }}
        >
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-plum-700/80">
            Your current arc · Week {arc.weekIndex} of {arc.weeksTotal}
          </p>
          <h2 className="mt-2 font-display text-[22px] font-semibold leading-snug text-ink">
            {arc.weekTheme}
          </h2>

          {/* Progress dashes */}
          <div className="mt-4 flex items-center gap-1.5" aria-hidden>
            {dots.map((i) => {
              const filled = i < arc.weekIndex;
              const current = i === arc.weekIndex;
              return (
                <span
                  key={i}
                  className="h-[6px] flex-1 rounded-full"
                  style={{
                    background: filled
                      ? "var(--plum-700, #5A2A6E)"
                      : current
                        ? "var(--plum-500, #8A4DA1)"
                        : "color-mix(in oklab, var(--plum-300, #C9A6D6) 40%, var(--paper))",
                  }}
                />
              );
            })}
          </div>

          <p className="mt-4 font-body text-[13.5px] leading-relaxed text-ink/80">
            {arc.weekPractice}
          </p>

          <button
            type="button"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-plum-700 px-5 py-2.5 font-display text-[14px] font-medium text-paper shadow-elev-1 transition-colors hover:opacity-90"
          >
            {arc.lessonCta}
            <ArrowRight size={15} strokeWidth={2} />
          </button>
        </article>
      </section>

      {/* Reflections */}
      <section className="px-5 pt-7">
        <h3 className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
          Reflections
        </h3>
        <ul className="mt-3 flex flex-col gap-2.5">
          {REFLECTIONS.map((r) => (
            <li key={r.id}>
              <button
                type="button"
                className="block w-full rounded-[16px] bg-paper p-4 text-left shadow-elev-1 transition-colors hover:bg-lavender-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-plum-500"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-body text-[12px] text-stone">
                    {r.dateLabel}
                  </span>
                  <span
                    className={`font-body text-[11px] ${
                      r.wordCount === undefined ? "text-plum-500" : "text-stone"
                    }`}
                  >
                    {r.wordCount === undefined
                      ? "· unanswered"
                      : `· ${r.wordCount} words`}
                  </span>
                </div>
                <p className="mt-2 font-display text-[15px] font-medium leading-snug text-ink">
                  {r.prompt}
                </p>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Workshops */}
      <section className="px-5 pt-7 pb-12">
        <div className="flex items-center justify-between">
          <h3 className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
            Workshops with practitioners
          </h3>
          <Sparkles
            aria-hidden
            size={14}
            className="text-plum-500"
            strokeWidth={1.75}
          />
        </div>
        <ul className="mt-3 flex flex-col gap-3">
          {WORKSHOPS.map((w) => (
            <li key={w.id}>
              <Link
                to="/growth/$id"
                params={{ id: w.id }}
                className="block rounded-[16px] bg-paper p-4 shadow-elev-1 transition-colors hover:bg-lavender-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-plum-500"
              >
                <div className="flex items-stretch gap-3">
                  <div
                    aria-hidden
                    className="h-[64px] w-[64px] flex-shrink-0 rounded-[12px]"
                    style={{ background: w.swatch }}
                  />
                  <div className="flex flex-1 flex-col justify-center">
                    <p className="font-display text-[15px] font-semibold leading-tight text-ink">
                      {w.title}
                    </p>
                    <p className="mt-1 font-body text-[12.5px] text-slate">
                      {w.sessionCount} sessions · {w.startsLabel}
                    </p>
                    <p className="mt-0.5 font-body text-[12px] text-stone">
                      Led by {w.practitioner}, {w.practitionerCredential}
                    </p>
                  </div>
                </div>
                <p className="mt-3 font-body text-[13px] leading-relaxed text-ink/80">
                  {w.blurb}
                </p>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-plum-700 px-4 py-2 font-display text-[13px] font-medium text-paper shadow-elev-1">
                  View workshop
                  <ArrowRight size={14} strokeWidth={2} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </GrowthBackdrop>
  );
}
