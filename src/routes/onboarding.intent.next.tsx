import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { OnboardingFrame } from "@/components/onboarding/OnboardingFrame";
import { OnboardingButton } from "@/components/onboarding/OnboardingButton";
import { StepEyebrow } from "@/components/onboarding/StepEyebrow";

/**
 * /onboarding/intent/next — pacing transition between intent and name.
 *
 * R2-04 — Banani UI-0132 "Intent Nextstep". A small editorial breath
 * between picking intent and the next onboarding step. No "make sure",
 * no "don't worry" — plain reassurance about the lightness of the
 * choice.
 *
 * Per DR-INTENT-MUTABILITY: intent is changeable any time, including
 * later from /profile/edit/intent.
 */
export const Route = createFileRoute("/onboarding/intent/next")({
  head: () => ({
    meta: [
      { title: "A note on intent — coupl" },
      {
        name: "description",
        content: "There's no right answer. People shift.",
      },
    ],
  }),
  component: IntentNextScreen,
});

function IntentNextScreen() {
  const navigate = useNavigate();

  const onContinue = () => {
    navigate({ to: "/onboarding/name" });
  };

  return (
    <OnboardingFrame
      backTo="/onboarding/intent"
      footer={
        <div className="px-5 pb-8 pt-4">
          <OnboardingButton type="button" onClick={onContinue}>
            Continue
          </OnboardingButton>
        </div>
      }
    >
      <div className="px-5 pt-4">
        <StepEyebrow step={4} />
        <h1 className="mt-3 text-display-xl text-ink">
          Tell us how you want to be met.
        </h1>
      </div>

      <div className="px-5 pt-8">
        <p className="font-display text-[16px] italic leading-relaxed text-ink/85">
          There's no right answer.
        </p>
        <p className="mt-2 font-display text-[16px] italic leading-relaxed text-ink/85">
          Most people change this once they've been here a few weeks.
        </p>
      </div>
    </OnboardingFrame>
  );
}
