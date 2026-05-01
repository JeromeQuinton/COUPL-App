import { createFileRoute } from "@tanstack/react-router";
import { CapacityCard } from "@/components/home/CapacityCard";
import { CoachCard } from "@/components/home/CoachCard";
import { ReflectionCard } from "@/components/home/ReflectionCard";
import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";

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
  const openConvos = [
    { id: 1, name: "Jules", note: "Replied this morning" },
    { id: 2, name: "Sara", note: "Your turn" },
    { id: 3, name: "Theo", note: "Quiet for 2 days" },
  ];

  return (
    <div className="px-5 pb-12 pt-8">
      <header>
        <p className="text-label-mono">Today · A quiet Tuesday</p>
        <h1 className="mt-2 text-display-xxl text-ink">Hi, {userName}.</h1>
      </header>

      <section className="mt-8 space-y-4">
        <CapacityCard
          level={0.55}
          label="Some bandwidth"
          hint="A handful of strong matches only."
        />

        <CoachCard
          coach="Remi"
          title="Why slow attention is the new intimacy."
          preview="The shape of attention you give early decides what kind of relationship you can sustain later."
          readTime="4 min read"
        />

        <ReflectionCard
          prompt="What did you notice about your own calm today?"
        />
      </section>

      <section className="mt-10">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-h1 text-ink">Open conversations</h2>
          <Link
            to="/connections"
            className="text-label-mono"
          >
            See all
          </Link>
        </div>
        <ul className="space-y-2">
          {openConvos.map((c) => (
            <li
              key={c.id}
              className="flex items-center gap-3 rounded-[16px] border border-line bg-paper px-4 py-3"
            >
              <span
                aria-hidden
                className="flex h-9 w-9 items-center justify-center rounded-full bg-lavender-100 text-body-sm font-semibold text-plum-500"
              >
                {c.name.charAt(0)}
              </span>
              <div className="flex-1">
                <p className="text-body-md font-medium text-ink">{c.name}</p>
                <p className="text-body-sm text-slate">{c.note}</p>
              </div>
              <MessageCircle className="h-4 w-4 text-stone" aria-hidden />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}