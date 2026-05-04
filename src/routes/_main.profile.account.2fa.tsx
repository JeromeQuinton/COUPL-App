import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import {
  DEFAULT_PHONE,
  getPhone,
  maskPhone,
  setTwoFactorMethod,
  type TwoFactorMethod,
} from "@/lib/account_state";

export const Route = createFileRoute("/_main/profile/account/2fa")({
  head: () => ({ meta: [{ title: "Two-factor — COUPL" }] }),
  component: TwoFactor,
});

type Method = "totp" | "sms" | null;

function TwoFactor() {
  const navigate = useNavigate();
  const [method, setMethod] = useState<Method>(null);
  const [smsSent, setSmsSent] = useState(false);
  const [code, setCode] = useState("");
  const [done, setDone] = useState<TwoFactorMethod>("off");
  const [phone, setPhone] = useState<string>(DEFAULT_PHONE);

  useEffect(() => {
    setPhone(getPhone());
  }, []);

  const onTurnOn = () => {
    if (!method || code.length !== 6) return;
    const m: TwoFactorMethod = method === "totp" ? "totp" : "sms";
    setTwoFactorMethod(m);
    setDone(m);
  };

  if (done !== "off") {
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
        <div className="mx-auto flex w-full max-w-[480px] flex-col px-5 pt-10">
          <p className="text-label-mono text-plum-700">Two-factor on</p>
          <h1 className="mt-3 font-display text-[26px] leading-tight text-ink">
            2FA on.
          </h1>
          <p className="mt-3 font-body text-[14px] leading-relaxed text-slate">
            You'll be asked for a code each time you sign in from a new
            device. Method:{" "}
            <strong>
              {done === "totp" ? "Authenticator app" : "Text message"}
            </strong>
            .
          </p>
          <button
            type="button"
            onClick={() => navigate({ to: "/profile/account" })}
            className="mt-7 rounded-full bg-plum-500 px-5 py-3 font-display text-[14px] font-medium text-paper shadow-elev-1 hover:bg-plum-700 self-start"
          >
            Done
          </button>
        </div>
      </YouBackdrop>
    );
  }

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
        <p className="text-label-mono">Account · two-factor</p>
        <h1 className="mt-2 font-display text-[26px] leading-tight text-ink">
          A second step at sign-in.
        </h1>
        <p className="mt-3 font-body text-[13.5px] leading-relaxed text-slate">
          Choose how you'd like to receive your code.
        </p>
      </header>

      <ul className="px-5 flex flex-col gap-2.5">
        <li>
          <button
            type="button"
            onClick={() => {
              setMethod("totp");
              setCode("");
              setSmsSent(false);
            }}
            aria-pressed={method === "totp"}
            className={
              method === "totp"
                ? "w-full rounded-[16px] border-2 border-plum-500 bg-paper p-4 text-left shadow-elev-1"
                : "w-full rounded-[16px] border border-plum-300/40 bg-paper p-4 text-left shadow-elev-1 hover:bg-lavender-50"
            }
          >
            <p className="font-display text-[15px] font-semibold text-ink">
              Authenticator app
            </p>
            <p className="mt-1 font-body text-[12.5px] text-stone">
              Use an app like 1Password or Authy.
            </p>
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => {
              setMethod("sms");
              setCode("");
              setSmsSent(false);
            }}
            aria-pressed={method === "sms"}
            className={
              method === "sms"
                ? "w-full rounded-[16px] border-2 border-plum-500 bg-paper p-4 text-left shadow-elev-1"
                : "w-full rounded-[16px] border border-plum-300/40 bg-paper p-4 text-left shadow-elev-1 hover:bg-lavender-50"
            }
          >
            <p className="font-display text-[15px] font-semibold text-ink">
              Text message
            </p>
            <p className="mt-1 font-body text-[12.5px] text-stone">
              Get a code by SMS.
            </p>
          </button>
        </li>
      </ul>

      {method === "totp" && (
        <section className="px-5 pt-5">
          <div className="rounded-[16px] bg-paper p-5 shadow-elev-1">
            <div
              aria-hidden
              className="mx-auto grid h-[200px] w-[200px] place-items-center rounded-[12px] border border-plum-300/40 bg-lavender-50/40 font-body text-[12px] text-stone"
            >
              QR placeholder — Phase 4
            </div>
            <p className="mt-4 font-body text-[13.5px] leading-relaxed text-slate">
              Scan this in your authenticator app, then enter the 6-digit code
              below.
            </p>
            <CodeInput value={code} onChange={setCode} />
          </div>
        </section>
      )}

      {method === "sms" && (
        <section className="px-5 pt-5">
          <div className="rounded-[16px] bg-paper p-5 shadow-elev-1">
            <p className="font-body text-[13.5px] text-ink">
              We'll send the code to: <strong>{maskPhone(phone)}</strong>
            </p>
            <Link
              to="/profile/account/phone"
              className="mt-1 inline-block text-label-mono text-plum-500 hover:text-plum-700"
            >
              Use a different number →
            </Link>
            {!smsSent ? (
              <button
                type="button"
                onClick={() => setSmsSent(true)}
                className="mt-4 rounded-full bg-plum-500 px-5 py-2.5 font-body text-[14px] font-medium text-paper hover:bg-plum-700"
              >
                Send code
              </button>
            ) : (
              <div className="mt-4">
                <p className="font-body text-[13px] text-slate">
                  Enter the code we sent.
                </p>
                <CodeInput value={code} onChange={setCode} />
              </div>
            )}
          </div>
        </section>
      )}

      <div className="px-5 pt-6 pb-12">
        <button
          type="button"
          onClick={onTurnOn}
          disabled={
            !method ||
            (method === "sms" && !smsSent) ||
            code.length !== 6
          }
          className="w-full rounded-full bg-plum-500 px-5 py-3 font-display text-[14px] font-medium text-paper shadow-elev-1 hover:bg-plum-700 disabled:bg-plum-300"
        >
          Turn on 2FA
        </button>
      </div>
    </YouBackdrop>
  );
}

function CodeInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      inputMode="numeric"
      pattern="[0-9]*"
      maxLength={6}
      value={value}
      onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 6))}
      placeholder="000000"
      className="mt-3 w-full rounded-[12px] border border-line bg-paper px-3.5 py-2.5 text-center font-mono text-[18px] tracking-[0.4em] text-ink focus:border-plum-500 focus:outline-none"
      aria-label="6-digit code"
    />
  );
}
