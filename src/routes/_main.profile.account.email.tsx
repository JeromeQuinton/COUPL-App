import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { ScreenHeader } from "@/components/shell/ScreenHeader";
import {
  DEFAULT_EMAIL,
  getEmail,
  maskEmail,
  setEmail as persistEmail,
} from "@/lib/account_state";

export const Route = createFileRoute("/_main/profile/account/email")({
  head: () => ({ meta: [{ title: "Change email — COUPL" }] }),
  component: ChangeEmail,
});

type Step = "form" | "verify" | "done";

function ChangeEmail() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState<string>(DEFAULT_EMAIL);
  const [next, setNext] = useState("");
  const [step, setStep] = useState<Step>("form");
  const [code, setCode] = useState("");

  useEffect(() => {
    setCurrent(getEmail());
  }, []);

  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setStep("verify");
  };

  const onVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) return;
    persistEmail(next);
    setStep("done");
  };

  return (
    <YouBackdrop>
      <StatusBar
        leading={
          <Link
            to="/profile/account"
            aria-label="Back to Account"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-4">
        <ScreenHeader
          eyebrow="Account · email"
          title={step === "done" ? "Email updated." : "Change your email."}
        />
        {step === "form" && (
          <p className="mt-3 font-body text-[13.5px] leading-relaxed text-slate">
            We'll send a code to the new address before swapping it in.
          </p>
        )}
      </header>

      {step === "form" && (
        <form onSubmit={onSubmit} className="px-5 flex flex-col gap-4 pb-12">
          <div className="rounded-[14px] bg-paper p-4 shadow-elev-1">
            <p className="text-label-mono text-stone">Current</p>
            <p className="mt-1 font-body text-[14.5px] text-ink">
              {maskEmail(current)}
            </p>
          </div>
          <label className="flex flex-col gap-1.5">
            <span className="text-label-mono">New email</span>
            <input
              type="email"
              inputMode="email"
              value={next}
              onChange={(e) => setNext(e.target.value)}
              className="rounded-[12px] border border-line bg-paper px-3.5 py-2.5 font-body text-[14.5px] text-ink focus:border-plum-500 focus:outline-none"
            />
            {!valid && next.length > 0 && (
              <span className="font-body text-[12px] text-caution">
                Enter a valid email address.
              </span>
            )}
          </label>
          <button
            type="submit"
            disabled={!valid}
            className="mt-2 rounded-full bg-plum-500 px-5 py-3 font-display text-[14px] font-medium text-paper shadow-elev-1 hover:bg-plum-700 disabled:bg-plum-300"
          >
            Send verification code
          </button>
        </form>
      )}

      {step === "verify" && (
        <form onSubmit={onVerify} className="px-5 flex flex-col gap-4 pb-12">
          <div className="rounded-[14px] bg-paper p-4 shadow-elev-1">
            <p className="font-body text-[14px] text-ink">
              We've sent a 6-digit code to <strong>{next}</strong>. Enter it
              below to confirm the change.
            </p>
          </div>
          <label className="flex flex-col gap-1.5">
            <span className="text-label-mono">Verification code</span>
            <input
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              value={code}
              onChange={(e) =>
                setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              className="rounded-[12px] border border-line bg-paper px-3.5 py-2.5 font-mono text-[16px] tracking-[0.4em] text-ink focus:border-plum-500 focus:outline-none"
            />
          </label>
          <button
            type="button"
            className="self-start text-label-mono text-plum-500 hover:text-plum-700"
            onClick={() => setCode("")}
          >
            Resend code
          </button>
          <button
            type="submit"
            disabled={code.length !== 6}
            className="mt-2 rounded-full bg-plum-500 px-5 py-3 font-display text-[14px] font-medium text-paper shadow-elev-1 hover:bg-plum-700 disabled:bg-plum-300"
          >
            Confirm change
          </button>
        </form>
      )}

      {step === "done" && (
        <div className="px-5 pb-12">
          <p className="font-body text-[14px] leading-relaxed text-ink">
            Your email is now <strong>{next}</strong>. Sign-in links and
            account notices will go here from now on.
          </p>
          <button
            type="button"
            onClick={() => navigate({ to: "/profile/account" })}
            className="mt-6 rounded-full bg-plum-500 px-5 py-3 font-display text-[14px] font-medium text-paper shadow-elev-1 hover:bg-plum-700"
          >
            Done
          </button>
        </div>
      )}
    </YouBackdrop>
  );
}
