import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ProfileView } from "@/components/discover/ProfileView";
import { ProfileActions } from "@/components/discover/ProfileActions";
import type { MetricPrecision } from "@/components/discover/MetricDisplay";

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

// Phase 1: hard-coded stub data. No backend, no persistence.
// Per DR-009 these numbers are NOT shipped scores — they are placeholder fixtures
// for layout. Phase 4 replaces SAMPLE with computed values from
// pair_compatibility (see DR-017).
//
// Per DR-013, display precision is decided by the weakest link between the two
// users' assessment depth. `precisionMode` here is the rendering toggle that
// Phase 4 will switch per-pair. Default 'exact' so the reference visual still
// reads as designed.
const precisionMode: MetricPrecision = "exact";

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
  // Per DR-006/DR-007 this is NOT a deck index. It's a pointer to the single
  // profile currently being viewed; on action, the next profile replaces it
  // in place on the same route. No transition, no swipe, no stack.
  const [currentIndex, setCurrentIndex] = useState(0);
  const profile = SAMPLE[currentIndex];

  const loadNextProfile = () => setCurrentIndex((i) => i + 1);

  return (
    <div
      className="relative flex flex-col px-4 pt-4 pb-[180px]"
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
        {state === "ready" && !profile && <EmptyState />}
        {state === "ready" && profile && (
          <>
            <ProfileView
              name={profile.name}
              age={profile.age}
              city={profile.city}
              prompt={profile.prompt}
              answer={profile.answer}
              compatibility={profile.compatibility}
              precisionMode={precisionMode}
              imageHue={profile.imageHue}
            />
            <ProfileActions
              onNotToday={loadNextProfile}
              onInviteToChat={loadNextProfile}
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