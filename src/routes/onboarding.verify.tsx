import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { OnboardingFrame } from "@/components/onboarding/OnboardingFrame";
import { OnboardingButton } from "@/components/onboarding/OnboardingButton";
import { StepEyebrow } from "@/components/onboarding/StepEyebrow";

type Method = "email" | "phone" | "apple";

function isMethod(v: unknown): v is Method {
  return v === "email" || v === "phone" || v === "apple";
}

export const Route = createFileRoute("/onboarding/verify")({
  validateSearch: (search: Record<string, unknown>): { method: Method } => ({
    method: isMethod(search.method) ? search.method : "email",
  }),
  head: () => ({
    meta: [
      { title: "Verify — coupl" },
      {
        name: "description",
        content: "Confirm it's you. We never share how we reached you.",
      },
    ],
  }),
  component: VerifyScreen,
});

function VerifyScreen() {
  const { method } = Route.useSearch();

  return (
    <OnboardingFrame backTo="/onboarding">
      <StepEyebrow step={1} />
      {method === "email" ? (
        <EmailVerify />
      ) : method === "phone" ? (
        <PhoneVerify />
      ) : (
        <AppleVerify />
      )}
    </OnboardingFrame>
  );
}

function EmailVerify() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const canSubmit = code.replace(/\D/g, "").length >= 6;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;
    navigate({ to: "/onboarding/name" });
  };

  return (
    <>
      <form id="verify-form" onSubmit={onSubmit}>
        <h1 className="mt-3 text-display-xl text-ink">Check your email.</h1>
        <p className="mt-2 text-body-md text-slate">
          We've sent a sign-in link to your address. Tap it to continue, or enter the 6-digit code below.
        </p>

        <div className="mt-8">
          <input
            id="code"
            name="code"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            placeholder="••••••"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            aria-label="6-digit code"
            className="w-full rounded-[12px] border border-line bg-paper px-4 py-3.5 text-center text-display-xl tracking-[0.4em] text-ink outline-none placeholder:text-stone focus:border-plum-500 focus:ring-2 focus:ring-plum-300"
          />
        </div>
      </form>

      <div className="mt-6 space-y-3">
        <OnboardingButton type="submit" form="verify-form" disabled={!canSubmit}>
          Continue
        </OnboardingButton>
        <div className="flex items-center justify-between text-body-sm text-slate">
          <button
            type="button"
            className="underline-offset-2 hover:underline"
            onClick={() => {
              /* phase 2: trigger resend */
            }}
          >
            Didn't arrive? Resend code
          </button>
          <Link
            to="/onboarding/verify"
            search={{ method: "phone" }}
            className="underline-offset-2 hover:underline"
          >
            Use phone instead
          </Link>
        </div>
      </div>
    </>
  );
}

function PhoneVerify() {
  // DR-AUTH-METHOD: in-flow OTP capture, no deep-link round-trip.
  // Two stages: phone capture -> inline OTP entry -> continue.
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [stage, setStage] = useState<"phone" | "otp">("phone");
  const [code, setCode] = useState("");
  const digits = phone.replace(/\D/g, "");
  const canSendCode = digits.length >= 7;
  const codeDigits = code.replace(/\D/g, "");
  const canSubmitCode = codeDigits.length >= 6;

  const onSendCode = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSendCode) return;
    setStage("otp");
  };

  const onSubmitCode = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmitCode) return;
    navigate({ to: "/onboarding/name" });
  };

  if (stage === "otp") {
    return (
      <>
        <form id="verify-form" onSubmit={onSubmitCode}>
          <h1 className="mt-3 text-display-xl text-ink">Enter the code.</h1>
          <p className="mt-2 text-body-md text-slate">
            We sent it to {phone}. The code arrives in a moment.
          </p>

          <div className="mt-8">
            <input
              id="otp"
              name="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              placeholder="••••••"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              aria-label="6-digit code"
              className="w-full rounded-[12px] border border-line bg-paper px-4 py-3.5 text-center text-display-xl tracking-[0.4em] text-ink outline-none placeholder:text-stone focus:border-plum-500 focus:ring-2 focus:ring-plum-300"
            />
          </div>
        </form>

        <div className="mt-6 space-y-3">
          <OnboardingButton type="submit" form="verify-form" disabled={!canSubmitCode}>
            Continue
          </OnboardingButton>
          <div className="flex items-center justify-between text-body-sm text-slate">
            <button
              type="button"
              className="underline-offset-2 hover:underline"
              onClick={() => {
                /* phase 2: trigger resend */
              }}
            >
              Didn't arrive? Resend
            </button>
            <button
              type="button"
              className="underline-offset-2 hover:underline"
              onClick={() => {
                setStage("phone");
                setCode("");
              }}
            >
              Use a different number
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <form id="verify-form" onSubmit={onSendCode}>
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
        <OnboardingButton type="submit" form="verify-form" disabled={!canSendCode}>
          Send code
        </OnboardingButton>
        <div className="flex items-center justify-between text-body-sm text-slate">
          <span>We verify humans, not photos.</span>
          <Link
            to="/onboarding/verify"
            search={{ method: "email" }}
            className="underline-offset-2 hover:underline"
          >
            Use email instead
          </Link>
        </div>
      </div>
    </>
  );
}

function AppleVerify() {
  const navigate = useNavigate();

  useEffect(() => {
    // Phase 1 stub — managed Sign in with Apple wires in Phase 2.
    const t = setTimeout(() => {
      navigate({ to: "/onboarding/name" });
    }, 900);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="mt-3">
      <h1 className="text-display-xl text-ink">Signing in with Apple…</h1>
      <p className="mt-2 text-body-md text-slate">
        Hang tight — we'll bring you back in a moment.
      </p>
    </div>
  );
}