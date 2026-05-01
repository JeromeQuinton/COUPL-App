import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { OnboardingFrame } from "@/components/onboarding/OnboardingFrame";
import { OnboardingButton } from "@/components/onboarding/OnboardingButton";
import { StepEyebrow } from "@/components/onboarding/StepEyebrow";

export const Route = createFileRoute("/onboarding/verify")({
  head: () => ({
    meta: [
      { title: "Verify your number — coupl" },
      {
        name: "description",
        content:
          "We text a code to verify your number. We never share it.",
      },
    ],
  }),
  component: VerifyPhoneScreen,
});

/**
 * Screen 02 of 9 — Verify phone.
 *
 * Country prefix segment (us +1) + phone number entry. Validation is
 * loose at this stage — we only block the CTA until at least 7 digits
 * are present. Real Twilio/SMS dispatch lands when Lovable Cloud auth
 * is wired (Phase 2).
 */
function VerifyPhoneScreen() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");

  const digits = phone.replace(/\D/g, "");
  const canSubmit = digits.length >= 7;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;
    // Phase 1: skip to next step. Phase 2 wires SMS verification.
    navigate({ to: "/onboarding/intent" });
  };

  return (
    <OnboardingFrame backTo="/onboarding">
      <form id="verify-form" onSubmit={onSubmit}>
        <StepEyebrow step={1} />
        <h1 className="mt-3 text-display-xl text-ink">What's your number?</h1>
        <p className="mt-2 text-body-md text-slate">
          We text a code. We don't share it, ever.
        </p>

        <div className="mt-8 flex h-14 items-stretch overflow-hidden rounded-[12px] border border-line bg-paper focus-within:border-plum-500 focus-within:ring-2 focus-within:ring-plum-300">
          <div className="flex items-center gap-1 border-r border-line bg-cloud px-4 text-body-md text-slate">
            <span className="font-medium uppercase">us</span>
            <span className="text-stone">·</span>
            <span>+1</span>
          </div>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder="415 · 555 · 0142"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-label="Phone number"
            className="flex-1 bg-transparent px-4 text-body-md text-ink outline-none placeholder:text-stone"
          />
        </div>
      </form>

      <div className="mt-6 space-y-3">
        <OnboardingButton type="submit" form="verify-form" disabled={!canSubmit}>
          Send code
        </OnboardingButton>
        <p className="text-center text-body-sm text-slate">
          We verify humans, not photos. ID check happens later.
        </p>
      </div>
    </OnboardingFrame>
  );
}