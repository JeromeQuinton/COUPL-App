import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, Feather } from "lucide-react";

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
        paddingTop: "calc(env(safe-area-inset-top) + 1.5rem)",
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

      <div className="relative flex flex-1 flex-col">
        {/* Status pill */}
        <div className="flex justify-center">
          <span
            className="inline-flex items-center gap-2 rounded-full border border-plum-300/40 bg-paper/70 px-3 py-1.5 backdrop-blur-sm"
          >
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-plum-500"
            />
            <span className="text-label-mono">Quiet day · paused for you</span>
          </span>
        </div>

        {/* Centered alignment ring — calm, not gamified */}
        <div className="mt-10 flex justify-center">
          <div className="relative h-32 w-32">
            {/* Outer soft halo */}
            <div
              aria-hidden
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in oklab, var(--plum-300) 25%, transparent) 0%, transparent 70%)",
              }}
            />
            <svg
              viewBox="0 0 128 128"
              className="relative h-32 w-32"
              aria-hidden
            >
              <defs>
                <linearGradient id="quiet-ring" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--plum-300)" />
                  <stop offset="100%" stopColor="var(--plum-500)" />
                </linearGradient>
              </defs>
              <circle
                cx="64"
                cy="64"
                r="56"
                fill="none"
                stroke="color-mix(in oklab, var(--lavender-100) 80%, transparent)"
                strokeWidth="2"
              />
              <circle
                cx="64"
                cy="64"
                r="44"
                fill="none"
                stroke="url(#quiet-ring)"
                strokeWidth="1.5"
                strokeDasharray="2 6"
                strokeLinecap="round"
                opacity="0.7"
              />
              <circle
                cx="64"
                cy="64"
                r="6"
                fill="var(--plum-500)"
                opacity="0.85"
              />
            </svg>
          </div>
        </div>

        {/* Headline + support copy */}
        <header className="mt-8 text-center">
          <h1 className="text-display-xl text-ink">
            Nothing today.<br />On purpose.
          </h1>
          <p className="mx-auto mt-4 max-w-[340px] text-body-md text-slate">
            Your capacity is set to <span className="text-ink">Some</span>, and
            you have two open conversations. We'd rather you tend to those.
          </p>
        </header>

        {/* Action cards */}
        <section className="mt-10 space-y-3" aria-label="What to tend to today">
          <Link
            to="/connections"
            className="group flex items-center gap-4 rounded-[16px] border border-plum-300/35 bg-paper/85 p-4 backdrop-blur-sm transition-colors hover:border-plum-300/70 hover:bg-paper"
          >
            <span
              aria-hidden
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-body-sm font-semibold text-plum-700 ring-1 ring-plum-300/40"
              style={{
                background:
                  "linear-gradient(135deg, var(--lavender-50) 0%, var(--lavender-100) 100%)",
              }}
            >
              A
            </span>
            <div className="flex-1">
              <p className="text-body-md font-medium text-ink">Reply to Asha</p>
              <p className="mt-0.5 text-body-sm text-slate">
                It's been 18h. Nothing urgent.
              </p>
            </div>
            <ArrowRight
              className="h-4 w-4 text-plum-500 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>

          <Link
            to="/home/reflection"
            className="group flex items-center gap-4 rounded-[16px] border border-plum-300/35 bg-paper/85 p-4 backdrop-blur-sm transition-colors hover:border-plum-300/70 hover:bg-paper"
          >
            <span
              aria-hidden
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-1 ring-plum-300/40"
              style={{
                background:
                  "linear-gradient(135deg, var(--blush) 0%, color-mix(in oklab, var(--plum-300) 25%, var(--blush)) 100%)",
              }}
            >
              <Feather className="h-4 w-4 text-plum-700" aria-hidden />
            </span>
            <div className="flex-1">
              <p className="text-body-md font-medium text-ink">
                This week's reflection
              </p>
              <p className="mt-0.5 text-body-sm text-slate">
                Saying the harder thing, sooner.
              </p>
            </div>
            <ArrowRight
              className="h-4 w-4 text-plum-500 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </section>

        {/* Hairline plum divider */}
        <div
          aria-hidden
          className="mt-10 h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, color-mix(in oklab, var(--plum-300) 45%, transparent) 50%, transparent 100%)",
          }}
        />

        {/* Secondary capacity CTA — quiet, not urgent */}
        <div className="mt-6 flex justify-center pb-4">
          <Link
            to="/home/check-in"
            className="group inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-body-sm text-slate transition-colors hover:text-plum-500"
          >
            <MessageCircle className="h-3.5 w-3.5" aria-hidden />
            <span>Want more recommendations anyway? Raise capacity</span>
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>
      </div>
    </div>
  );
}