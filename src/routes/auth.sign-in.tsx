import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell } from "@/components/auth/AuthShell";
import { ScreenHeader } from "@/components/shell/ScreenHeader";

export const Route = createFileRoute("/auth/sign-in")({
  head: () => ({ meta: [{ title: "Sign in — COUPL" }] }),
  component: SignIn,
});

function SignIn() {
  const [field, setField] = useState("");
  const [sent, setSent] = useState(false);
  const valid = field.trim().length > 0;

  if (sent) {
    return (
      <AuthShell>
        <ScreenHeader eyebrow="Check your inbox" title="Link on its way." eyebrowTone="stone" />
        <p className="mt-3 font-body text-[14px] leading-relaxed text-slate">
          Open the email or message we just sent. The link works for fifteen minutes.
        </p>
        <button
          type="button"
          className="mt-6 w-full rounded-full border border-line bg-paper py-2.5 font-body text-[13px] text-slate hover:bg-lavender-50"
        >
          Resend link
        </button>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <ScreenHeader eyebrow="Sign in" title="Welcome back." eyebrowTone="stone" />
      <p className="mt-3 font-body text-[14px] leading-relaxed text-slate">
        Sign in with the email or phone you used to join.
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
          className="mt-5 w-full rounded-full px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 transition-colors disabled:opacity-50"
          style={{ background: "linear-gradient(135deg, var(--plum-700) 0%, var(--blush) 200%)" }}
        >
          Continue
        </button>
      </form>
      <p className="mt-4 text-center font-body text-[12px] text-stone">
        We'll send a link. No password to remember.
      </p>
      <p className="mt-6 text-center">
        <Link to="/auth/sign-up" className="font-body text-[13.5px] text-plum-700 hover:underline">
          New here? Sign up instead.
        </Link>
      </p>
      <p className="mt-3 text-center">
        <Link to="/auth/recover" className="font-body text-[12.5px] text-stone hover:text-plum-700 hover:underline">
          Can't sign in?
        </Link>
      </p>
    </AuthShell>
  );
}
