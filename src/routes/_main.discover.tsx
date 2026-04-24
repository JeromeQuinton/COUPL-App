import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ScreenHeader } from "@/components/shell/ScreenHeader";
import { SwipeCard } from "@/components/discover/SwipeCard";
import { DiscoverActions } from "@/components/discover/DiscoverActions";

export const Route = createFileRoute("/_main/discover")({
  head: () => ({
    meta: [
      { title: "Discover — COUPL" },
      {
        name: "description",
        content: "Meet people thoughtfully. One profile at a time.",
      },
    ],
  }),
  component: DiscoverScreen,
});

type ViewState = "loading" | "ready" | "empty" | "error";

// Phase 1: hard-coded sample data. No backend, no persistence.
const SAMPLE = [
  {
    id: "p1",
    name: "Maya",
    age: 31,
    city: "London",
    prompt: "A small ritual I keep",
    answer:
      "Morning coffee on the balcony, no phone. Ten minutes of just watching the street wake up.",
    imageHue: "#E8D5EC",
  },
  {
    id: "p2",
    name: "Theo",
    age: 34,
    city: "Bristol",
    prompt: "Something I'm slowly learning",
    answer:
      "That patience is a kind of attention, not a kind of waiting.",
    imageHue: "#FDE9C2",
  },
  {
    id: "p3",
    name: "Iris",
    age: 29,
    city: "Edinburgh",
    prompt: "Where I feel most myself",
    answer:
      "Long walks in unfamiliar cities. The not-knowing is the point.",
    imageHue: "#D9E4DC",
  },
];

function DiscoverScreen() {
  const [state] = useState<ViewState>("ready");
  const [index, setIndex] = useState(0);
  const card = SAMPLE[index];

  const advance = () => setIndex((i) => i + 1);

  return (
    <div className="relative min-h-[calc(100vh-88px)] px-4 pt-6">
      <ScreenHeader eyebrow="Discover" title="Today's people" />

      <div className="mt-6">
        {state === "loading" && <LoadingState />}
        {state === "error" && <ErrorState />}
        {state === "ready" && !card && <EmptyState />}
        {state === "ready" && card && (
          <>
            <SwipeCard
              name={card.name}
              age={card.age}
              city={card.city}
              prompt={card.prompt}
              answer={card.answer}
              imageHue={card.imageHue}
            />
            <DiscoverActions
              onPass={advance}
              onSaveForLater={advance}
              onConnect={advance}
            />
          </>
        )}
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="aspect-[4/5] w-full animate-pulse rounded-[24px] bg-cloud"
    >
      <span className="sr-only">Loading profiles</span>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-[24px] border border-line bg-lavender-50 p-8 text-center">
      <h2 className="text-h2 text-ink">That's everyone for today.</h2>
      <p className="mt-2 text-body-md text-slate">
        New profiles arrive each morning. No urgency, no rush.
      </p>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="rounded-[24px] border border-line bg-paper p-8 text-center">
      <h2 className="text-h2 text-ink">Something didn't load.</h2>
      <p className="mt-2 text-body-md text-slate">
        Check your connection and try again in a moment.
      </p>
    </div>
  );
}