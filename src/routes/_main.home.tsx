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
    <div className="px-5 pb-12 pt-8">
      <header className="flex items-start justify-between">
        <div>
          <p className="text-body-sm text-slate">Tuesday, slow morning</p>
          <h1 className="mt-2 text-display-xl text-ink">Hi, {userName}.</h1>
        </div>
        <span
          aria-hidden
          className="flex h-9 w-9 items-center justify-center rounded-full bg-lavender-100 text-body-sm font-semibold text-plum-500"
        >
          {userName.charAt(0)}
        </span>
      </header>

      <section className="mt-6 space-y-4">
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

      <section className="mt-8">
        <Link
          to="/connections"
          className="flex items-center justify-between rounded-[16px] border border-ink bg-paper px-4 py-3 transition-colors hover:bg-cloud"
        >
          <span className="text-label-mono">Open conversations</span>
          <span className="text-body-md font-medium text-ink">
            {openConvosCount}
          </span>
        </Link>
      </section>
    </div>
  );
}