import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { OnboardingFrame } from "@/components/onboarding/OnboardingFrame";
import { OnboardingButton } from "@/components/onboarding/OnboardingButton";

/**
 * /onboarding/discover-refresh — Discover Refresh Update (UI-55).
 *
 * Compact read-back of all previous onboarding selections. Each card
 * is tappable and routes back to its source step. Phase 1 uses a
 * static mirror — Phase 4 will read the live draft.
 *
 * Voice: no "perfect". Plain confirmation.
 *
 * DR refs: DR-ONBOARDING-CONFIRM (Stream 12).
 */
export const Route = createFileRoute("/onboarding/discover-refresh")({
  head: () => ({
    meta: [
      { title: "Anything we got wrong? — coupl" },
      {
        name: "description",
        content:
          "Quick mirror of what you told us. Tap any card to adjust.",
      },
    ],
  }),
  component: DiscoverRefreshScreen,
});

type MirrorCard = {
  id: string;
  label: string;
  value: string;
  to: string;
};

/** Phase-1 mirror data. Phase 4 reads from `getOnboardingDraft()`. */
const MIRROR: MirrorCard[] = [
  {
    id: "intent",
    label: "Intent",
    value: "Long-term partnership",
    to: "/onboarding/intent",
  },
  {
    id: "lifestyle",
    label: "Lifestyle",
    value: "Steady pace · low drinking · daily movement",
    to: "/onboarding/lifestyle",
  },
  {
    id: "interests",
    label: "Interests",
    value: "Long walks, pottery, vinyl, slow cooking",
    to: "/onboarding/interests/refresh",
  },
  {
    id: "discover",
    label: "What you're drawn to",
    value: "Pace: Steady · Routine: Anchored · Energy: Mid",
    to: "/onboarding/discover-lifestyle",
  },
];

function DiscoverRefreshScreen() {
  const navigate = useNavigate();

  const onFinish = () => {
    navigate({ to: "/onboarding/complete" });
  };

  return (
    <OnboardingFrame backTo="/onboarding/discover-lifestyle">
      <p className="text-mono-sm uppercase tracking-[0.14em] text-slate">
        Onboarding · refresh
      </p>
      <h1 className="mt-3 font-display text-[28px] leading-[1.15] text-ink">
        Anything we got wrong?
      </h1>
      <p className="mt-2 font-body text-[14.5px] leading-relaxed text-slate">
        Tap a card to adjust it. Otherwise we're done.
      </p>

      <div className="mt-8 space-y-3">
        {MIRROR.map((card) => (
          <Link
            key={card.id}
            to={card.to}
            className="block rounded-[16px] border border-line bg-paper px-4 py-3.5 transition-colors hover:bg-cloud"
          >
            <p className="text-mono-sm uppercase tracking-[0.14em] text-slate">
              {card.label}
            </p>
            <p className="mt-1 font-body text-[14.5px] leading-relaxed text-ink">
              {card.value}
            </p>
            <p className="mt-1 font-body text-[12px] text-plum-500">
              Edit
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <OnboardingButton type="button" onClick={onFinish}>
          All good — finish onboarding
        </OnboardingButton>
      </div>
    </OnboardingFrame>
  );
}
