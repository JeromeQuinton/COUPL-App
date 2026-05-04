import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { OnboardingFrame } from "@/components/onboarding/OnboardingFrame";
import { OnboardingButton } from "@/components/onboarding/OnboardingButton";
import { StepEyebrow } from "@/components/onboarding/StepEyebrow";
import {
  LoveLanguagePicker,
  type LoveLanguage,
} from "@/components/assessments/LoveLanguagePicker";

/**
 * /onboarding/love-language — Banani UI-0233 "Love Language".
 *
 * R2-07 (onboarding side) — primary placement of the love-language
 * assessment per DR-DRAFT-ASSESSMENT-PLACEMENT-PATTERN. Skip link
 * routes to the next onboarding step without saving and (Phase 4)
 * triggers a Polaris reminder card in the next-day digest.
 */

const NEXT_STEP = "/onboarding/photos" as const;

export const Route = createFileRoute("/onboarding/love-language")({
  head: () => ({
    meta: [
      { title: "How you feel cared for — coupl" },
      {
        name: "description",
        content: "Five frames for how love lands. Pick one. A second if it fits.",
      },
    ],
  }),
  component: OnboardingLoveLanguageScreen,
});

function OnboardingLoveLanguageScreen() {
  const navigate = useNavigate();
  const [primary, setPrimary] = useState<LoveLanguage | null>(null);
  const [secondary, setSecondary] = useState<LoveLanguage | null>(null);

  const onContinue = () => {
    if (!primary) return;
    navigate({ to: NEXT_STEP });
  };

  const onSkip = () => {
    navigate({ to: NEXT_STEP });
  };

  return (
    <OnboardingFrame
      backTo="/onboarding/lifestyle"
      footer={
        <div className="px-5 pb-8 pt-4">
          <OnboardingButton type="button" onClick={onContinue} disabled={!primary}>
            Continue
          </OnboardingButton>
          <button
            type="button"
            onClick={onSkip}
            className="mt-3 block w-full text-center font-body text-[13px] text-stone underline-offset-4 hover:text-plum-700 hover:underline"
          >
            Set this up later in Polaris →
          </button>
        </div>
      }
    >
      <div className="px-5 pt-4">
        <StepEyebrow step={6} />
        <h1 className="mt-3 text-display-xl text-ink">How you feel cared for.</h1>
        <p className="mt-2 text-body-md text-slate">
          Tap one to mark it primary. Tap another for an optional secondary.
        </p>
      </div>

      <div className="px-5 pt-7">
        <LoveLanguagePicker
          primary={primary}
          secondary={secondary}
          onPrimaryChange={setPrimary}
          onSecondaryChange={setSecondary}
        />
      </div>
    </OnboardingFrame>
  );
}
