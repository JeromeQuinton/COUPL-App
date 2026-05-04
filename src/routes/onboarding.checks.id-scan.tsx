import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Camera } from "lucide-react";
import { OnboardingFrame } from "@/components/onboarding/OnboardingFrame";
import { OnboardingButton } from "@/components/onboarding/OnboardingButton";
import { ScreenHeader } from "@/components/shell/ScreenHeader";

export const Route = createFileRoute("/onboarding/checks/id-scan")({
  head: () => ({
    meta: [{ title: "Capture document — coupl" }],
  }),
  component: IDScanScreen,
});

function IDScanScreen() {
  const navigate = useNavigate();

  return (
    <OnboardingFrame backTo="/onboarding/checks/id-select">
      <div>
        <ScreenHeader
          eyebrow="Verification · 2 of 3"
          title="Capture the photo page."
          titleSize="display-xl"
        />
        <p className="mt-2 text-body-md text-slate">
          Flat surface, good light, all four corners visible.
        </p>
      </div>

      <div className="mt-10 grid place-items-center">
        <div
          aria-hidden
          className="aspect-[3/2] w-full rounded-[18px] border-2 border-dashed border-plum-300/50 bg-paper/50 grid place-items-center"
        >
          <div className="flex flex-col items-center gap-2 text-stone">
            <Camera size={32} strokeWidth={1.5} />
            <p className="text-label-mono">Tap to capture</p>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-[14px] bg-beeswax-100 px-4 py-3 text-body-sm text-plum-700">
        <p className="font-semibold">Tips</p>
        <ul className="mt-1 list-disc pl-5 space-y-0.5 font-body text-[12.5px]">
          <li>No glare or shadow on the photo page.</li>
          <li>Hold steady until the frame turns plum.</li>
          <li>Black-and-white scans don't work.</li>
        </ul>
      </div>

      <div className="mt-8">
        <OnboardingButton
          type="button"
          variant="primary"
          onClick={() => navigate({ to: "/onboarding/checks/liveness" })}
        >
          Capture
        </OnboardingButton>
      </div>
    </OnboardingFrame>
  );
}
