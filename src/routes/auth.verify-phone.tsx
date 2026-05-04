import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { AuthShell } from "@/components/auth/AuthShell";
import { CodeInput } from "@/components/CodeInput";
import { ScreenHeader } from "@/components/shell/ScreenHeader";

export const Route = createFileRoute("/auth/verify-phone")({
  head: () => ({ meta: [{ title: "Verify phone — COUPL" }] }),
  component: VerifyPhone,
  validateSearch: (s: Record<string, unknown>) => ({
    phone: typeof s.phone === "string" ? s.phone : undefined,
  }),
});

function VerifyPhone() {
  const navigate = useNavigate();
  const { phone } = useSearch({ from: "/auth/verify-phone" });
  const [invalid, setInvalid] = useState(false);
  const [resetSig, setResetSig] = useState(0);
  const [success, setSuccess] = useState(false);
  const [secs, setSecs] = useState(30);

  useEffect(() => {
    const t = setInterval(() => setSecs((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [resetSig]);

  const onComplete = (code: string) => {
    if (code.startsWith("1")) setSuccess(true);
    else {
      setInvalid(true);
      setTimeout(() => {
        setInvalid(false);
        setResetSig((n) => n + 1);
      }, 800);
    }
  };

  if (success) {
    // DR-AUTH-METHOD: /auth/verify-phone is the deep-link landing for adding a phone
    // post-onboarding. On success, route to /profile/account/phone — never to
    // /onboarding (in-flow phone capture lives at /onboarding/verify, not here).
    return (
      <AuthShell>
        <ScreenHeader eyebrow="Number added" title="All set." eyebrowTone="stone" />
        <p className="mt-3 font-body text-[14px] leading-relaxed text-slate">
          Your phone is now linked to the account. We'll only use it for safety touchpoints.
        </p>
        <button
          type="button"
          onClick={() => navigate({ to: "/profile/account/phone" })}
          className="mt-6 w-full rounded-full bg-plum-700 px-5 py-3 font-display text-[14.5px] font-medium text-paper shadow-elev-1 hover:opacity-90"
        >
          Continue
        </button>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <ScreenHeader eyebrow="Verify" title="Check your messages." eyebrowTone="stone" />
      <p className="mt-3 font-body text-[14px] leading-relaxed text-slate">
        We sent a code to {phone ?? "your phone"}.
      </p>
      <div className="mt-6">
        <CodeInput onComplete={onComplete} invalid={invalid} resetSignal={resetSig} />
        {invalid ? (
          <p className="mt-2 text-center font-body text-[12.5px] text-plum-700">
            That didn't match. Try the latest code.
          </p>
        ) : null}
      </div>
      <button
        type="button"
        disabled={secs > 0}
        onClick={() => {
          setSecs(30);
          setResetSig((n) => n + 1);
        }}
        className="mt-6 w-full rounded-full border border-line bg-paper py-2.5 font-body text-[13px] text-slate hover:bg-lavender-50 disabled:opacity-50"
      >
        {secs > 0 ? `Resend in ${secs}s` : "Resend code"}
      </button>
      <p className="mt-6 text-center">
        <Link to="/auth/sign-in" className="font-body text-[13.5px] text-plum-700 hover:underline">
          Use a different number
        </Link>
      </p>
      <p className="mt-3 text-center">
        <Link to="/auth/recover" className="font-body text-[12.5px] text-stone hover:text-plum-700 hover:underline">
          Didn't get the code?
        </Link>
      </p>
    </AuthShell>
  );
}
