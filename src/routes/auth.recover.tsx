import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell } from "@/components/auth/AuthShell";

export const Route = createFileRoute("/auth/recover")({
  head: () => ({ meta: [{ title: "Reset password — COUPL" }] }),
  component: Recover,
});

function Recover() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [secs, setSecs] = useState(30);
  const valid = email.includes("@");

  useEffect(() => {
    if (!sent) return;
    const t = setInterval(() => setSecs((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [sent]);

  if (sent) {
    return (
      <AuthShell>
        <p className="text-label-mono text-stone">Email sent</p>
        <h1 className="mt-3 font-display text-[26px] leading-tight text-ink">Link sent.</h1>
        <p className="mt-3 font-body text-[14px] leading-relaxed text-slate">
          We've sent a link to <span className="font-semibold">{email}</span>. It works for an hour.
        </p>
        <button
          type="button"
          disabled={secs > 0}
          onClick={() => setSecs(30)}
          className="mt-6 w-full rounded-full border border-line bg-paper py-2.5 font-body text-[13px] text-slate hover:bg-lavender-50 disabled:opacity-50"
        >
          {secs > 0 ? `Resend in ${secs}s` : "Resend link"}
        </button>
        <p className="mt-6 text-center">
          <Link to="/auth/sign-in" className="font-body text-[13.5px] text-plum-700 hover:underline">
            Back to sign in
          </Link>
        </p>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <p className="text-label-mono text-stone">Recover access</p>
      <h1 className="mt-3 font-display text-[28px] leading-tight text-ink">Let's get you back in.</h1>
      <p className="mt-3 font-body text-[14px] leading-relaxed text-slate">
        Tell us the email on your account. We'll send a link to reset things.
      </p>
      <form
        className="mt-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (valid) setSent(true);
        }}
      >
        <label className="block">
          <span className="font-body text-[12px] font-semibold uppercase tracking-[0.12em] text-stone">
            Email
          </span>
          <input
            type="email"
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full rounded-[12px] border border-line bg-paper px-4 py-3 font-body text-[14px] text-ink focus:border-plum-500 focus:outline-none"
          />
        </label>
        <button
          type="submit"
          disabled={!valid}
          className="mt-5 w-full rounded-full px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 disabled:opacity-50"
          style={{ background: "linear-gradient(135deg, var(--plum-700) 0%, var(--blush) 200%)" }}
        >
          Send a reset link
        </button>
      </form>
      <p className="mt-6 text-center">
        <Link to="/auth/sign-in" className="font-body text-[13.5px] text-plum-700 hover:underline">
          Back to sign in
        </Link>
      </p>
    </AuthShell>
  );
}
