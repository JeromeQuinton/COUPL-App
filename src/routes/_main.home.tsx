import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, Calendar } from "lucide-react";
import { RelationalPresenceBand } from "@/components/home/RelationalPresenceBand";
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
      {/* Ambient page wash — two layered glows give Home its premium
          "psychological surface" tone. Page-scoped only; pointer-events-none
          so taps pass straight through to cards beneath. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[640px]"
        style={{
          background:
            "radial-gradient(130% 90% at 88% -5%, color-mix(in oklab, var(--lavender-100) 95%, transparent) 0%, color-mix(in oklab, var(--lavender-100) 55%, transparent) 30%, color-mix(in oklab, var(--lavender-50) 30%, transparent) 55%, transparent 80%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-0 h-[520px]"
        style={{
          background:
            "radial-gradient(110% 70% at 8% 100%, color-mix(in oklab, var(--blush) 80%, transparent) 0%, color-mix(in oklab, var(--plum-300) 22%, transparent) 35%, transparent 70%)",
        }}
      />

      <header className="relative flex items-start justify-between">
        <div>
          <p className="text-label-mono">Tuesday · Slow morning</p>
          <h1 className="mt-2 text-display-xl text-ink">Hi, {userName}.</h1>
        </div>
        <div className="flex items-center gap-1.5">
          <Link
            to="/notifications"
            aria-label="Activity"
            className="flex h-9 w-9 items-center justify-center rounded-full text-plum-700 transition-colors hover:bg-lavender-50"
          >
            <Bell className="h-5 w-5" strokeWidth={1.75} />
          </Link>
          <Link
            to="/calendar"
            aria-label="Calendar"
            className="flex h-9 w-9 items-center justify-center rounded-full text-plum-700 transition-colors hover:bg-lavender-50"
          >
            <Calendar className="h-5 w-5" strokeWidth={1.75} />
          </Link>
          <span
            aria-hidden
            className="ml-1 flex h-10 w-10 items-center justify-center rounded-full text-body-sm font-semibold text-plum-700 shadow-elev-1 ring-1 ring-plum-300/40"
            style={{
              background:
                "linear-gradient(135deg, var(--lavender-50) 0%, var(--lavender-100) 100%)",
            }}
          >
            {userName.charAt(0)}
          </span>
        </div>
      </header>

      <section className="relative mt-6 space-y-4">
        <RelationalPresenceBand
          label="Steady presence"
          context="A handful of strong recommendations sit in your week. Polaris isn't pushing for more."
        />

        <CoachCard
          coach="Polaris"
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