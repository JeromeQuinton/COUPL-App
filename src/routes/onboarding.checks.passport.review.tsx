import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { OnboardingFrame } from "@/components/onboarding/OnboardingFrame";
import { OnboardingButton } from "@/components/onboarding/OnboardingButton";

/**
 * /onboarding/checks/passport/review — review captured passport image.
 *
 * Lands here after the passport scan step. Plain factual prose — no
 * "secure", no "for your protection". Phase 1 stub uses placeholder
 * preview; Phase 4 reads the captured image from session state.
 *
 * Stream 26 SCREEN-R2-31.
 */
export const Route = createFileRoute("/onboarding/checks/passport/review")({
  head: () => ({
    meta: [{ title: "Does this look right? — coupl" }],
  }),
  component: PassportReviewScreen,
});

function PassportReviewScreen() {
  const navigate = useNavigate();

  return (
    <OnboardingFrame backTo="/onboarding/checks/passport/scan">
      <div>
        <p className="text-label-mono">Verify · passport · review</p>
        <h1 className="mt-3 text-display-xl text-ink">
          Does this look right?
        </h1>
      </div>

      <div className="mt-8 grid place-items-center">
        <div
          aria-hidden
          className="aspect-[3/2] w-full rounded-[18px] border border-line bg-paper grid place-items-center"
          style={{
            background:
              "linear-gradient(150deg, color-mix(in oklab, var(--blush) 35%, var(--paper)) 0%, color-mix(in oklab, var(--blush) 12%, var(--paper)) 100%)",
          }}
        >
          <div className="flex flex-col items-center gap-2 text-stone">
            <FileText size={32} strokeWidth={1.5} />
            <p className="text-label-mono">Captured image preview</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <p className="font-body text-[14px] leading-relaxed text-ink">
          Edges visible. Photo clear. Both sides if applicable. We use
          this once and don't store it.
        </p>
      </div>

      <div className="mt-10 space-y-3">
        <OnboardingButton
          type="button"
          variant="primary"
          onClick={() => navigate({ to: "/onboarding/checks/liveness" })}
        >
          Looks right
        </OnboardingButton>
        <OnboardingButton
          type="button"
          variant="secondary"
          onClick={() => navigate({ to: "/onboarding/checks/passport/scan" })}
        >
          Retake
        </OnboardingButton>
      </div>
    </OnboardingFrame>
  );
}
