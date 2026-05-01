import { createFileRoute, Link } from "@tanstack/react-router";
import { CapacityCard } from "@/components/home/CapacityCard";
import { CoachCard } from "@/components/home/CoachCard";
import { ReflectionCard } from "@/components/home/ReflectionCard";

export const Route = createFileRoute("/_main/home")({
  head: () => ({
    meta: [
      { title: "Home — COUPL" },
      { name: "description", content: "Your calm, grounded entry into COUPL." },
    ],
  }),
  component: HomeScreen,
});

function HomeScreen() {
  // Phase 1: local-only sample state. Real values come from the
  // weekly check-in + assessments tables in Phase 4.
  const userName = "Mira";
  const openConvosCount = 3;

  return (
    <div className="relative px-5 pb-12 pt-8">
      {/* Ambient page wash — soft lavender-into-blush bloom anchored top-right.
          Pointer-events-none so it never intercepts taps. Page-scoped only. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[480px]"
        style={{
          background:
            "radial-gradient(120% 80% at 85% 0%, color-mix(in oklab, var(--lavender-100) 70%, transparent) 0%, color-mix(in oklab, var(--lavender-50) 35%, transparent) 35%, transparent 70%)",
        }}
      />

      <header className="relative flex items-start justify-between">
        <div>
          <p className="text-label-mono">Tuesday · Slow morning</p>
          <h1 className="mt-2 text-display-xl text-ink">Hi, {userName}.</h1>
        </div>
        <span
          aria-hidden
          className="flex h-10 w-10 items-center justify-center rounded-full text-body-sm font-semibold text-plum-700 shadow-elev-1 ring-1 ring-plum-300/40"
          style={{
            background:
              "linear-gradient(135deg, var(--lavender-50) 0%, var(--lavender-100) 100%)",
          }}
        >
          {userName.charAt(0)}
        </span>
      </header>

      <section className="relative mt-6 space-y-4">
        <CapacityCard
          level={0.55}
          label="Some bandwidth"
          hint="a handful of strong matches"
          daysLeft={2}
        />

        <CoachCard
          coach="Reni"
          title="Open with a noticing, not a question."
          when="Tuesday, 9:14am"
          readTime="2 min read"
        />

        <ReflectionCard
          prompt="Name one thing you're not willing to compromise on, and one you've changed your mind about."
        />
      </section>

      <section className="relative mt-8">
        {/* Hairline plum divider — quiet section break, premium tone */}
        <div
          aria-hidden
          className="mb-4 h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, color-mix(in oklab, var(--plum-300) 45%, transparent) 50%, transparent 100%)",
          }}
        />
        <Link
          to="/connections"
          className="group flex items-center justify-between rounded-[16px] border border-plum-300/35 bg-paper/80 px-4 py-3 backdrop-blur-sm transition-colors hover:border-plum-300/70 hover:bg-paper"
        >
          <span className="text-label-mono">Open conversations</span>
          <span
            aria-label={`${openConvosCount} open conversations`}
            className="flex h-7 min-w-7 items-center justify-center rounded-full bg-plum-500 px-2 text-body-sm font-semibold text-paper"
          >
            {openConvosCount}
          </span>
        </Link>
      </section>
    </div>
  );
}