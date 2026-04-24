import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
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
    name: "Sophie",
    age: 29,
    city: "San Francisco, CA",
    prompt: "A small ritual I keep",
    answer:
      "Morning coffee on the balcony, no phone. Ten minutes of watching the street wake up.",
    compatibility: 68,
    imageHue: "#F3E8F5",
  },
  {
    id: "p2",
    name: "Theo",
    age: 34,
    city: "Bristol, UK",
    prompt: "Something I'm slowly learning",
    answer: "That patience is a kind of attention, not a kind of waiting.",
    compatibility: 74,
    imageHue: "#FDE9C2",
  },
  {
    id: "p3",
    name: "Iris",
    age: 29,
    city: "Edinburgh",
    prompt: "Where I feel most myself",
    answer: "Long walks in unfamiliar cities. The not-knowing is the point.",
    compatibility: 81,
    imageHue: "#D9E4DC",
  },
];

function DiscoverScreen() {
  const [state] = useState<ViewState>("ready");
  const [index, setIndex] = useState(0);
  const card = SAMPLE[index];

  const advance = () => setIndex((i) => i + 1);

  return (
    <div
      className="relative flex flex-col px-4 pt-4 pb-[120px]"
      style={{
        minHeight: "100dvh",
        paddingTop: "calc(env(safe-area-inset-top) + 1rem)",
        background:
          "linear-gradient(180deg, #FCEEF0 0%, #F6E7F2 35%, #EFE2F4 100%)",
      }}
    >
      <div className="flex flex-1 flex-col">
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
              compatibility={card.compatibility}
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
      className="flex h-full flex-1 flex-col gap-3"
    >
      <div className="h-[88px] animate-pulse rounded-[20px] bg-paper/70" />
      <div className="h-[52px] animate-pulse rounded-full bg-paper/70" />
      <div className="flex-1 animate-pulse rounded-[24px] bg-lavender-100/70" />
      <span className="sr-only">Bringing today's profiles into view</span>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-[24px] bg-paper/60 p-10 text-center backdrop-blur-sm">
      <h2 className="text-display-xl text-plum-700">That's everyone for today.</h2>
      <p className="mt-3 max-w-sm text-body-md text-slate">
        New profiles arrive each morning. There's nothing to chase — come back when you're ready.
      </p>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-[24px] bg-paper/80 p-10 text-center">
      <h2 className="text-h1 text-ink">We couldn't load profiles just now.</h2>
      <p className="mt-2 max-w-sm text-body-md text-slate">
        Check your connection. We'll try again the next time you open Discover.
      </p>
    </div>
  );
}