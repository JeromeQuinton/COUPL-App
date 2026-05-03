import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { OnboardingFrame } from "@/components/onboarding/OnboardingFrame";
import { OnboardingButton } from "@/components/onboarding/OnboardingButton";

export const Route = createFileRoute("/onboarding/paused")({
  head: () => ({
    meta: [
      { title: "Joining is paused — coupl" },
      {
        name: "description",
        content: "We expand carefully to protect quality, safety, and balance.",
      },
    ],
  }),
  component: PausedScreen,
});

function PausedScreen() {
  const navigate = useNavigate();

  return (
    <OnboardingFrame>
      <div className="pt-12">
        <p className="text-label-mono">Waitlist</p>
        <h1 className="mt-3 text-display-xl text-ink">
          Joining is paused.
        </h1>
        <p className="mt-3 text-body-md text-slate">
          We expand carefully to protect quality, safety, and balance.
        </p>
        <p className="mt-4 text-body-sm italic text-stone">
          Some doors open slowly for good reason.
        </p>

        <div className="mt-8 rounded-[14px] border border-line bg-paper px-4 py-4">
          <p className="text-label-mono">What happens next</p>
          <ul className="mt-3 space-y-2 font-body text-[13px] text-ink">
            <li>· You keep your place on the list.</li>
            <li>· We'll email when your invite opens.</li>
            <li>· No queue jumping. No paid skip.</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 space-y-3">
        <OnboardingButton
          type="button"
          variant="primary"
          onClick={() => navigate({ to: "/onboarding" })}
        >
          Hold my place
        </OnboardingButton>
        <p className="text-center text-body-sm italic text-stone">
          Invitation follows capacity.
        </p>
      </div>
    </OnboardingFrame>
  );
}
