import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { OnboardingFrame } from "@/components/onboarding/OnboardingFrame";
import { OnboardingButton } from "@/components/onboarding/OnboardingButton";
import { ScreenHeader } from "@/components/shell/ScreenHeader";

export const Route = createFileRoute("/system/offline")({
  head: () => ({
    meta: [
      { title: "We can't reach the network — coupl" },
      {
        name: "description",
        content: "Your progress is safe. We'll continue when signal returns.",
      },
    ],
  }),
  component: OfflineScreen,
});

function OfflineScreen() {
  const navigate = useNavigate();

  return (
    <OnboardingFrame>
      <div className="pt-12">
        <ScreenHeader
          eyebrow="Connection"
          title="We can't reach the network."
          titleSize="display-xl"
        />
        <p className="mt-3 text-body-md text-slate">
          Your progress is safe. We'll continue when signal returns.
        </p>
        <p className="mt-4 text-body-sm italic text-stone">
          Pause. Not loss.
        </p>
      </div>

      <div className="mt-12 space-y-3">
        <OnboardingButton
          type="button"
          variant="primary"
          onClick={() => navigate({ to: "/" })}
        >
          Retry
        </OnboardingButton>
        <p className="mt-3 text-center text-body-sm italic text-stone">
          Saved locally until restored.
        </p>
      </div>
    </OnboardingFrame>
  );
}
