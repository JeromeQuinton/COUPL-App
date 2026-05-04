import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import {
  getEmail,
  getPhone,
  getTwoFactorMethod,
  maskEmail,
  maskPhone,
  type TwoFactorMethod,
} from "@/lib/account_state";

export const Route = createFileRoute("/_main/profile/account")({
  head: () => ({ meta: [{ title: "Account — COUPL" }] }),
  component: AccountHome,
});

function twoFactorLabel(m: TwoFactorMethod): string {
  if (m === "totp") return "Authenticator app";
  if (m === "sms") return "Text message";
  return "Not set up";
}

function AccountHome() {
  const [email, setEmail] = useState<string>("jerome@coupl.app");
  const [phone, setPhone] = useState<string>("+44 ···· 0142");
  const [twoFactor, setTwoFactor] = useState<TwoFactorMethod>("off");

  // Read live values on mount; localStorage may have been updated
  // by Stream 18 sub-routes since the last visit.
  useEffect(() => {
    setEmail(getEmail());
    setPhone(getPhone());
    setTwoFactor(getTwoFactorMethod());
  }, []);

  return (
    <YouBackdrop>
      <StatusBar
        leading={
          <Link
            to="/profile"
            aria-label="Back"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <p className="text-label-mono">Account</p>
        <h1 className="mt-2 font-display text-[28px] italic leading-tight text-ink">
          What sits underneath?
        </h1>
      </header>

      <ul className="px-5 pb-12 space-y-2.5">
        <Row
          to="/profile/account/email"
          label="Email"
          value={maskEmail(email)}
        />
        <Row
          to="/profile/account/phone"
          label="Phone"
          value={maskPhone(phone)}
        />
        <Row
          to="/profile/account/password"
          label="Password"
          value="Last changed 12 days ago"
        />
        <Row
          to="/profile/account/2fa"
          label="Two-factor authentication"
          value={twoFactorLabel(twoFactor)}
        />
        <li>
          <Link
            to="/profile/account/linked"
            className="flex w-full items-center justify-between gap-3 rounded-[14px] bg-paper px-4 py-3.5 text-left shadow-elev-1 transition-colors hover:bg-lavender-50"
          >
            <div>
              <p className="font-display text-[15px] text-ink">
                Linked accounts
              </p>
              <p className="mt-0.5 font-body text-[12px] text-stone">Apple</p>
            </div>
            <ChevronRight size={16} className="text-stone" />
          </Link>
        </li>
        <li>
          <Link
            to="/profile/account/sessions"
            className="flex w-full items-center justify-between gap-3 rounded-[14px] bg-paper px-4 py-3.5 text-left shadow-elev-1 transition-colors hover:bg-lavender-50"
          >
            <div>
              <p className="font-display text-[15px] text-ink">
                Active sessions
              </p>
              <p className="mt-0.5 font-body text-[12px] text-stone">
                Sign one out, or all but this one
              </p>
            </div>
            <ChevronRight size={16} className="text-stone" />
          </Link>
        </li>
        <li className="pt-3">
          <Link
            to="/profile/account/delete"
            className="flex w-full items-center justify-between gap-3 rounded-[14px] bg-paper px-4 py-3.5 text-left shadow-elev-1 transition-colors hover:bg-blush-50"
          >
            <div>
              <p className="font-display text-[15px] text-danger">
                Delete account
              </p>
              <p className="mt-0.5 font-body text-[12px] text-stone">
                Pause is reversible. This isn't.
              </p>
            </div>
            <ChevronRight size={16} className="text-stone" />
          </Link>
        </li>
      </ul>
    </YouBackdrop>
  );
}

function Row({
  to,
  label,
  value,
}: {
  to: string;
  label: string;
  value: string;
}) {
  return (
    <li>
      <Link
        to={to}
        className="flex w-full items-center justify-between gap-3 rounded-[14px] bg-paper px-4 py-3.5 text-left shadow-elev-1 transition-colors hover:bg-lavender-50"
      >
        <div>
          <p className="font-display text-[15px] text-ink">{label}</p>
          <p className="mt-0.5 font-body text-[12px] text-stone">{value}</p>
        </div>
        <ChevronRight size={16} className="text-stone" />
      </Link>
    </li>
  );
}
