import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { AuthShell } from "@/components/auth/AuthShell";
import { CodeInput } from "@/components/CodeInput";

export const Route = createFileRoute("/auth/verify-email")({
  head: () => ({ meta: [{ title: "Verify email — COUPL" }] }),
  component: VerifyEmail,
  validateSearch: (s: Record<string, unknown>) => ({
    email: typeof s.email === "string" ? s.email : undefined,
  }),
});

function VerifyEmail() {
  const navigate = useNavigate();
  const { email } = useSearch({ from: "/auth/verify-email" });
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
    // DR-AUTH-METHOD: post-token routes to /onboarding (new) or /home (existing).
    // Phase 1 always routes to /onboarding (no session check yet); Phase 2 wires the
    // existing-user branch via the auth-guard at index.tsx.
    return (
      <AuthShell>
        <p className="text-label-mono text-stone">Verified</p>
        <h1 className="mt-3 font-display text-[26px] leading-tight text-ink">You're in.</h1>
        <button
          type="button"
          onClick={() => navigate({ to: "/onboarding" })}
          className="mt-6 w-full rounded-full bg-plum-700 px-5 py-3 font-display text-[14.5px] font-medium text-paper shadow-elev-1 hover:opacity-90"
        >
          Continue
        </button>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <p className="text-label-mono text-stone">Verify</p>
      <h1 className="mt-3 font-display text-[26px] leading-tight text-ink">Check your email.</h1>
      <p className="mt-3 font-body text-[14px] leading-relaxed text-slate">
        We sent a code to {email ?? "your email"}.
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
          Use a different email
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
