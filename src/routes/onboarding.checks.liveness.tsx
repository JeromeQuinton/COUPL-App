import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Video } from "lucide-react";
import { OnboardingFrame } from "@/components/onboarding/OnboardingFrame";
import { OnboardingButton } from "@/components/onboarding/OnboardingButton";

export const Route = createFileRoute("/onboarding/checks/liveness")({
  head: () => ({
    meta: [{ title: "Quick selfie video — coupl" }],
  }),
  component: LivenessScreen,
});

function LivenessScreen() {
  const navigate = useNavigate();

  return (
    <OnboardingFrame backTo="/onboarding/checks/id-scan">
      <div>
        <p className="text-label-mono">Verification · 3 of 3</p>
        <h1 className="mt-3 text-display-xl text-ink">A 30-second selfie.</h1>
        <p className="mt-2 text-body-md text-slate">
          Look at the dot, follow it slowly. We're checking the photo is you, in this moment.
        </p>
      </div>

      <div className="mt-10 grid place-items-center">
        <div
          aria-hidden
          className="aspect-square w-2/3 rounded-full border-2 border-dashed border-plum-300/50 bg-paper/50 grid place-items-center"
        >
          <div className="flex flex-col items-center gap-2 text-stone">
            <Video size={32} strokeWidth={1.5} />
            <p className="text-label-mono">Camera placeholder</p>
          </div>
        </div>
      </div>

      <p className="mt-6 text-center text-body-sm italic text-stone">
        We never share liveness video. It's used once, then deleted.
      </p>

      <div className="mt-8 space-y-3">
        <OnboardingButton
          type="button"
          variant="primary"
          onClick={() => navigate({ to: "/onboarding/review" })}
        >
          Start 30-second capture
        </OnboardingButton>
        <Link
          to="/onboarding/checks/liveness/help"
          className="block w-full rounded-full px-5 py-3 text-center font-body text-[13.5px] text-slate hover:text-plum-500"
        >
          I'm having trouble
        </Link>
      </div>
    </OnboardingFrame>
  );
}
