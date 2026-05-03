import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { OnboardingFrame } from "@/components/onboarding/OnboardingFrame";
import { OnboardingButton } from "@/components/onboarding/OnboardingButton";

export const Route = createFileRoute("/onboarding/resume")({
  head: () => ({
    meta: [
      { title: "You left off at Chapter Four — coupl" },
      {
        name: "description",
        content: "No scramble. We kept your place.",
      },
    ],
  }),
  component: ResumeScreen,
});

function ResumeScreen() {
  const navigate = useNavigate();

  return (
    <OnboardingFrame>
      <div className="pt-12">
        <p className="text-label-mono">Return</p>
        <h1 className="mt-3 text-display-xl text-ink">
          You left off at Chapter Four.
        </h1>
        <p className="mt-3 text-body-md text-slate">
          No scramble. We kept your place.
        </p>
        <p className="mt-4 text-body-sm italic text-stone">
          Pausing is allowed.
        </p>
      </div>

      <div className="mt-12 space-y-3">
        <OnboardingButton
          type="button"
          variant="primary"
          onClick={() => navigate({ to: "/onboarding/pace" })}
        >
          Resume
        </OnboardingButton>
        <button
          type="button"
          onClick={() => navigate({ to: "/onboarding/" })}
          className="w-full rounded-full px-5 py-3 text-center font-body text-[13.5px] text-slate hover:text-plum-500"
        >
          Start over
        </button>
        <p className="mt-3 text-center text-body-sm italic text-stone">
          Your saved progress remains private.
        </p>
      </div>
    </OnboardingFrame>
  );
}
