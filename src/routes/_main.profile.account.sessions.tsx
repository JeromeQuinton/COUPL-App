import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Smartphone, Laptop, Monitor } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";

/**
 * /profile/account/sessions — active sessions.
 *
 * Closes the dead "Sign out everywhere" row on /profile/account.
 * List of devices + per-session sign-out + sign-out-all CTA.
 *
 * Stream-19 SCREEN-19.
 */
export const Route = createFileRoute("/_main/profile/account/sessions")({
  head: () => ({ meta: [{ title: "Active sessions — COUPL" }] }),
  component: SessionsScreen,
});

type Session = {
  id: string;
  device: string;
  os: string;
  area: string;
  lastSeen: string;
  current?: boolean;
  Icon: typeof Smartphone;
};

const INITIAL: Session[] = [
  { id: "this", device: "iPhone 15 Pro", os: "iOS 18.4", area: "London, UK", lastSeen: "Now", current: true, Icon: Smartphone },
  { id: "mb", device: "MacBook Pro", os: "Safari", area: "London, UK", lastSeen: "2 hours ago", Icon: Laptop },
  { id: "tab", device: "iPad Pro", os: "Safari", area: "London, UK", lastSeen: "Yesterday", Icon: Monitor },
];

function SessionsScreen() {
  const [sessions, setSessions] = useState<Session[]>(INITIAL);
  const [signedOutAll, setSignedOutAll] = useState(false);

  const signOut = (id: string) => setSessions((s) => s.filter((x) => x.id !== id));
  const signOutAll = () => {
    setSessions((s) => s.filter((x) => x.current));
    setSignedOutAll(true);
  };

  return (
    <YouBackdrop tone="serious">
      <StatusBar
        leading={
          <Link to="/profile/account" aria-label="Back" className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5">
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <p className="text-label-mono">Account · active sessions</p>
        <h1 className="mt-2 font-display text-[28px] italic leading-tight text-ink">
          Where you're signed in.
        </h1>
        <p className="mt-3 font-body text-[13.5px] leading-relaxed text-slate">
          One row per device. Sign one out, or all but this one.
        </p>
      </header>

      <ul className="px-5 space-y-2.5">
        {sessions.map((s) => {
          const Icon = s.Icon;
          return (
            <li
              key={s.id}
              className="flex items-start gap-3 rounded-[14px] bg-paper px-4 py-3.5 shadow-elev-1"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-lavender-100 text-plum-700">
                <Icon size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-[15px] text-ink">
                  {s.device}
                  {s.current && <span className="ml-2 rounded-full bg-success/10 px-2 py-0.5 text-label-mono text-success">This device</span>}
                </p>
                <p className="mt-0.5 font-body text-[12px] text-stone">
                  {s.os} · {s.area} · {s.lastSeen}
                </p>
              </div>
              {!s.current && (
                <Link
                  to="/profile/account/sessions/$sessionId_/revoke"
                  params={{ sessionId_: s.id }}
                  className="self-center rounded-full border border-line bg-paper px-3 py-1.5 font-body text-[12px] text-ink hover:bg-lavender-50"
                >
                  Sign out
                </Link>
              )}
            </li>
          );
        })}
      </ul>

      <div className="px-5 pt-8 pb-12">
        <button
          type="button"
          onClick={signOutAll}
          disabled={sessions.length <= 1}
          className="w-full rounded-full border border-plum-700 bg-paper px-5 py-3 font-display text-[14px] text-plum-700 hover:bg-lavender-50 disabled:opacity-50"
        >
          Sign out of every other session
        </button>
        {signedOutAll && (
          <p className="mt-3 text-center font-body text-[12.5px] italic text-success">
            Other sessions signed out. You're still here.
          </p>
        )}
      </div>
    </YouBackdrop>
  );
}
