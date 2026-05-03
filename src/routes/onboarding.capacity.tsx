import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { OnboardingFrame } from "@/components/onboarding/OnboardingFrame";
import { OnboardingButton } from "@/components/onboarding/OnboardingButton";
import { StepEyebrow } from "@/components/onboarding/StepEyebrow";
import {
  CapacitySelector,
  type CapacityValue,
} from "@/components/onboarding/CapacitySelector";

export const Route = createFileRoute("/onboarding/capacity")({
  head: () => ({
    meta: [
      { title: "How are you, actually? — coupl" },
      {
        name: "description",
        content:
          "This sets your discovery for the next 7 days. We'll ask again.",
      },
    ],
  }),
  component: CapacityScreen,
});

/**
 * Screen 08 of 9 — Initial capacity.
 *
 * Three stacked cards with a gentle "you can change this from Home"
 * footnote. Routes to /onboarding/complete (Step 9). Phase 1: local
 * state only — Phase 4 writes to the weekly_check_in table.
 */
function CapacityScreen() {
  const navigate = useNavigate();
  const [capacity, setCapacity] = useState<CapacityValue | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!capacity) return;
    navigate({ to: "/onboarding/checks" });
  };

  return (
    <OnboardingFrame backTo="/onboarding/prompts">
      <form id="capacity-form" onSubmit={onSubmit}>
        <StepEyebrow step={8} />
        <h1 className="mt-3 text-display-xl text-ink">
          How are you, actually?
        </h1>
        <p className="mt-2 text-body-md text-slate">
          This sets your discovery for the next 7 days. We'll ask again.
        </p>

        <div className="mt-8">
          <CapacitySelector value={capacity} onChange={setCapacity} />
        </div>

        <p className="mt-4 text-center text-body-sm text-slate">
          You can change this from Home, anytime.
        </p>
      </form>

      <div className="mt-8">
        <OnboardingButton
          type="submit"
          form="capacity-form"
          disabled={!capacity}
        >
          Set my capacity
        </OnboardingButton>
      </div>
    </OnboardingFrame>
  );
}