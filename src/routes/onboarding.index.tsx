import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { OnboardingFrame } from "@/components/onboarding/OnboardingFrame";
import { OnboardingButton } from "@/components/onboarding/OnboardingButton";

export const Route = createFileRoute("/onboarding/")({
  head: () => ({
    meta: [
      { title: "coupl — Slow dating for people who want to be known" },
      {
        name: "description",
        content:
          "coupl is slow dating for people who want to be known. One question at a time. No rush, no scoring.",
      },
      {
        property: "og:title",
        content: "coupl — Slow dating for people who want to be known",
      },
      {
        property: "og:description",
        content:
          "Slow dating for people who want to be known. One question at a time.",
      },
    ],
  }),
  component: SplashScreen,
});

/**
 * Screen 01 of 9 — Splash.
 *
 * Single hero word ("coupl"), one-line positioning, two CTAs.
 * Phone CTA routes to /onboarding/verify. Apple CTA is wired but
 * non-functional in Phase 1 (toast only — managed Sign in with Apple
 * lands later via Lovable Cloud).
 */
function SplashScreen() {
  const navigate = useNavigate();

  return (
    <OnboardingFrame
      showBlush
      footer={
        <p className="pt-6 text-center text-body-sm text-slate">
          By continuing you agree to our{" "}
          <a href="/care-pact" className="underline">
            Care Pact
          </a>
          .
        </p>
      }
    >
      <div className="flex min-h-[80vh] flex-col">
        <div className="flex-1 pt-12">
          <img
            src="/brand/coupl-logo.png"
            alt="COUPL"
            className="h-10 w-auto"
          />
          <p className="mt-4 max-w-[18rem] text-body-lg text-slate">
            Slow dating for people who want to be known.
          </p>
        </div>

        <div className="space-y-3">
          <OnboardingButton
            type="button"
            variant="primary"
            onClick={() => navigate({ to: "/onboarding/verify" })}
          >
            Continue with phone
          </OnboardingButton>
          <OnboardingButton
            type="button"
            variant="secondary"
            onClick={() => navigate({ to: "/onboarding/verify" })}
          >
            Continue with Apple
          </OnboardingButton>
        </div>
      </div>
    </OnboardingFrame>
  );
}