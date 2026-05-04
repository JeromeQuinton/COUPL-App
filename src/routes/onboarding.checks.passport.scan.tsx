import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Camera } from "lucide-react";
import { OnboardingFrame } from "@/components/onboarding/OnboardingFrame";
import { OnboardingButton } from "@/components/onboarding/OnboardingButton";

export const Route = createFileRoute("/onboarding/checks/passport/scan")({
  head: () => ({
    meta: [{ title: "Scan your ID — coupl" }],
  }),
  component: PassportScanScreen,
});

function PassportScanScreen() {
  const navigate = useNavigate();

  return (
    <OnboardingFrame backTo="/onboarding/checks/id-select">
      <div>
        <p className="text-label-mono">Verify · ID</p>
        <h1 className="mt-3 text-display-xl text-ink">Scan your ID.</h1>
        <p className="mt-2 text-body-md text-slate">
          Rear camera. Hold steady — the frame turns plum when the edges line
          up.
        </p>
      </div>

      <div className="mt-10 grid place-items-center">
        <div
          aria-hidden
          className="aspect-[3/2] w-full rounded-[18px] border-2 border-dashed border-plum-300/50 bg-paper/50 grid place-items-center"
        >
          <div className="flex flex-col items-center gap-2 text-stone">
            <Camera size={32} strokeWidth={1.5} />
            <p className="text-label-mono">Auto-capture on edge detect</p>
          </div>
        </div>
      </div>

      <p className="mt-6 text-center font-body text-[12.5px] italic text-stone">
        If auto-capture doesn't trigger, tap Capture manually.
      </p>

      <div className="mt-8 space-y-3">
        <OnboardingButton
          type="button"
          variant="primary"
          onClick={() =>
            navigate({ to: "/onboarding/checks/passport/review" })
          }
        >
          Looks right
        </OnboardingButton>
        <OnboardingButton
          type="button"
          variant="ghost"
          onClick={() => navigate({ to: "/onboarding/checks/passport/scan" })}
        >
          Retake
        </OnboardingButton>
      </div>
    </OnboardingFrame>
  );
}
