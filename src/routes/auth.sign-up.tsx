import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell } from "@/components/auth/AuthShell";

export const Route = createFileRoute("/auth/sign-up")({
  head: () => ({ meta: [{ title: "Sign up — COUPL" }] }),
  component: SignUp,
});

function SignUp() {
  const [field, setField] = useState("");
  const [sent, setSent] = useState(false);
  const valid = field.trim().length > 0;

  if (sent) {
    return (
      <AuthShell>
        <p className="text-label-mono text-stone">Check your inbox</p>
        <h1 className="mt-3 font-display text-[26px] leading-tight text-ink">Link on its way.</h1>
        <p className="mt-3 font-body text-[14px] leading-relaxed text-slate">
          Open the link to start your onboarding.
        </p>
        <Link
          to="/onboarding"
          className="mt-6 block rounded-full bg-plum-700 px-5 py-3 text-center font-display text-[14.5px] font-medium text-paper shadow-elev-1 hover:opacity-90"
        >
          Continue to onboarding
        </Link>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <p className="text-label-mono text-stone">Sign up</p>
      <h1 className="mt-3 font-display text-[28px] leading-tight text-ink">
        Make space for someone real.
      </h1>
      <p className="mt-3 font-body text-[14px] leading-relaxed text-slate">
        We'll send a link to confirm it's you.
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
            Email or phone
          </span>
          <input
            type="text"
            inputMode="email"
            value={field}
            onChange={(e) => setField(e.target.value)}
            className="mt-1.5 w-full rounded-[12px] border border-line bg-paper px-4 py-3 font-body text-[14px] text-ink focus:border-plum-500 focus:outline-none"
          />
        </label>
        <button
          type="submit"
          disabled={!valid}
          className="mt-5 w-full rounded-full px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 disabled:opacity-50"
          style={{ background: "linear-gradient(135deg, var(--plum-700) 0%, var(--blush) 200%)" }}
        >
          Get started
        </button>
      </form>
      <p className="mt-4 font-body text-[11.5px] leading-relaxed text-stone">
        By continuing you agree to our Terms and Privacy. Both are short.
      </p>
      <p className="mt-6 text-center">
        <Link to="/auth/sign-in" className="font-body text-[13.5px] text-plum-700 hover:underline">
          Already on COUPL? Sign in.
        </Link>
      </p>
    </AuthShell>
  );
}
