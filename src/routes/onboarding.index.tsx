import { useState, type FormEvent } from "react";
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
  const [email, setEmail] = useState("");

  const onEmailSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    navigate({ to: "/onboarding/verify", search: { method: "email" } });
  };

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
            src="/coupltransparentpng.png"
            alt="COUPL"
            className="block w-full max-w-[280px] h-auto"
          />
          <p className="mt-4 max-w-[18rem] text-body-lg text-slate">
            Slow dating for people who want to be known.
          </p>
        </div>

        <div className="space-y-4">
          <form onSubmit={onEmailSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-label="Email"
              required
              className="w-full rounded-[14px] border border-line bg-paper px-4 py-3.5 text-body-md text-ink placeholder:text-stone focus:border-plum-500 focus:outline-none"
            />
            <OnboardingButton type="submit" variant="primary">
              Continue with email
            </OnboardingButton>
          </form>

          <div className="flex items-center gap-3 text-body-sm text-stone">
            <span className="h-px flex-1 bg-line" />
            <span>or</span>
            <span className="h-px flex-1 bg-line" />
          </div>

          <button
            type="button"
            onClick={() =>
              navigate({ to: "/onboarding/verify", search: { method: "phone" } })
            }
            className="w-full rounded-[14px] border border-line bg-paper px-4 py-3 text-body-md text-ink hover:bg-cloud"
          >
            Continue with phone
          </button>
          <button
            type="button"
            onClick={() =>
              navigate({ to: "/onboarding/verify", search: { method: "apple" } })
            }
            className="w-full rounded-[14px] border border-line bg-paper px-4 py-3 text-body-md text-ink hover:bg-cloud"
          >
            Continue with Apple
          </button>
        </div>
      </div>
    </OnboardingFrame>
  );
}