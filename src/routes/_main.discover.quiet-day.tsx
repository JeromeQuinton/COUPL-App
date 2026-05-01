import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Feather } from "lucide-react";

/**
 * /discover/quiet-day — Discover empty state for capacity-paused days.
 *
 * Surfaced when the user has no available recommendations under their
 * current capacity + filter conditions. This is COUPL protecting
 * attention, not running out of inventory (DR-027). Vocab: recommendations
 * (DR-023), Connection, Not Today. No streaks. No urgency theatre.
 *
 * Phase 1: navigated to directly. Phase 4 will route the feed here when
 * `recommendations.length === 0 && openConversations >= bandwidthFloor`.
 */
export const Route = createFileRoute("/_main/discover/quiet-day")({
  head: () => ({
    meta: [
      { title: "Quiet day — COUPL" },
      {
        name: "description",
        content:
          "No recommendations today. We'd rather you tend to the conversations already open.",
      },
    ],
  }),
  component: QuietDayScreen,
});

function QuietDayScreen() {
  return (
    <div
      className="relative flex flex-col px-5"
      style={{
        minHeight: "100dvh",
        paddingTop: "calc(env(safe-area-inset-top) + 1rem)",
        paddingBottom: "calc(env(safe-area-inset-bottom) + 120px)",
        background:
          "linear-gradient(180deg, color-mix(in oklab, var(--lavender-100) 60%, var(--blush)) 0%, color-mix(in oklab, var(--blush) 70%, var(--lavender-50)) 55%, color-mix(in oklab, var(--lavender-50) 80%, var(--paper)) 100%)",
      }}
    >
      {/* Layered ambient bloom — top-right lavender, bottom-left blush/plum */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
        style={{
          background:
            "radial-gradient(120% 80% at 90% 0%, color-mix(in oklab, var(--lavender-100) 90%, transparent) 0%, color-mix(in oklab, var(--lavender-50) 40%, transparent) 40%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[480px]"
        style={{
          background:
            "radial-gradient(110% 70% at 5% 100%, color-mix(in oklab, var(--blush) 80%, transparent) 0%, color-mix(in oklab, var(--plum-300) 22%, transparent) 35%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-[420px] flex-1 flex-col">
        {/* Status pill */}
        <div className="flex justify-center">
          <span
            className="inline-flex items-center gap-1.5 rounded-full border border-plum-300/30 px-2.5 py-1 backdrop-blur-sm"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in oklab, var(--blush) 70%, var(--paper)) 0%, color-mix(in oklab, var(--lavender-50) 80%, var(--paper)) 100%)",
            }}
          >
            <span
              aria-hidden
              className="h-1 w-1 rounded-full bg-plum-500"
            />
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-plum-700">
              Quiet day · paused for you
            </span>
          </span>
        </div>

        {/* Centered alignment ring — calm, not gamified */}
        <div className="mt-6 flex justify-center">
          <div className="relative h-44 w-44">
            {/* Outer soft halo glow */}
            <div
              aria-hidden
              className="absolute -inset-6 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in oklab, var(--lavender-100) 70%, transparent) 0%, color-mix(in oklab, var(--plum-300) 12%, transparent) 45%, transparent 75%)",
              }}
            />
            <svg
              viewBox="0 0 176 176"
              className="relative h-44 w-44"
              aria-hidden
            >
              <defs>
                <linearGradient id="quiet-ring" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--plum-300)" />
                  <stop offset="100%" stopColor="var(--plum-500)" />
                </linearGradient>
              </defs>
              {/* Soft lavender outer ring */}
              <circle
                cx="88"
                cy="88"
                r="80"
                fill="none"
                stroke="color-mix(in oklab, var(--lavender-100) 90%, transparent)"
                strokeWidth="6"
              />
              {/* Inner hairline */}
              <circle
                cx="88"
                cy="88"
                r="64"
                fill="none"
                stroke="color-mix(in oklab, var(--plum-300) 25%, transparent)"
                strokeWidth="1"
              />
              {/* Partial plum progress arc — ~30% sweep, no number */}
              <circle
                cx="88"
                cy="88"
                r="80"
                fill="none"
                stroke="url(#quiet-ring)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="150 503"
                transform="rotate(-90 88 88)"
              />
            </svg>
          </div>
        </div>

        {/* Headline + support copy */}
        <header className="mt-6 text-center">
          <h1 className="text-display-lg text-ink">
            Nothing today.<br />On purpose.
          </h1>
          <p className="mx-auto mt-3 max-w-[320px] text-body-sm text-slate">
            Your capacity is set to <span className="text-ink">Some</span>, and
            you have two open conversations. We'd rather you tend to those.
          </p>
        </header>

        {/* Action cards */}
        <section className="mt-6 space-y-2.5" aria-label="What to tend to today">
          <Link
            to="/connections"
            className="group flex items-center gap-3 rounded-2xl border border-plum-300/30 bg-paper/90 px-3.5 py-3 backdrop-blur-sm transition-colors hover:border-plum-300/60 hover:bg-paper"
          >
            <span
              aria-hidden
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-body-sm font-semibold text-plum-700 ring-1 ring-plum-300/30"
              style={{
                background:
                  "linear-gradient(135deg, var(--lavender-50) 0%, var(--lavender-100) 100%)",
              }}
            >
              A
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-body-sm font-medium text-ink">Reply to Asha</p>
              <p className="mt-0.5 text-[12px] leading-snug text-slate">
                It's been 18h. Nothing urgent.
              </p>
            </div>
            <ChevronRight
              className="h-4 w-4 text-plum-500/70 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>

          <Link
            to="/home/reflection"
            className="group flex items-center gap-3 rounded-2xl border border-plum-300/30 bg-paper/90 px-3.5 py-3 backdrop-blur-sm transition-colors hover:border-plum-300/60 hover:bg-paper"
          >
            <span
              aria-hidden
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1 ring-plum-300/30"
              style={{
                background:
                  "linear-gradient(135deg, var(--blush) 0%, color-mix(in oklab, var(--plum-300) 25%, var(--blush)) 100%)",
              }}
            >
              <Feather className="h-4 w-4 text-plum-700" aria-hidden />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-body-sm font-medium text-ink">
                This week's reflection
              </p>
              <p className="mt-0.5 text-[12px] leading-snug text-slate">
                Saying the harder thing, sooner.
              </p>
            </div>
            <ChevronRight
              className="h-4 w-4 text-plum-500/70 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </section>

        {/* Secondary capacity CTA — quiet dashed-outline card */}
        <Link
          to="/home/check-in"
          className="group mt-5 flex items-center justify-between gap-3 rounded-2xl border border-dashed border-plum-300/45 bg-paper/40 px-3.5 py-2.5 text-slate backdrop-blur-sm transition-colors hover:border-plum-300/70 hover:text-plum-700"
        >
          <span className="text-[12.5px] leading-snug">
            Want more recommendations anyway?{" "}
            <span className="text-plum-700">Raise capacity</span>
          </span>
          <ChevronRight
            className="h-3.5 w-3.5 shrink-0 text-plum-500/70 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
      </div>
    </div>
  );
}