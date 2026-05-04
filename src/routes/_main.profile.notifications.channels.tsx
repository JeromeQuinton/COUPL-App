import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Bell, Mail, MessageSquare, ChevronRight } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";

export const Route = createFileRoute("/_main/profile/notifications/channels")({
  head: () => ({ meta: [{ title: "Channels — COUPL" }] }),
  component: ChannelsScreen,
});

type ChannelState = "on" | "quiet" | "off";

const STATE_LABEL: Record<ChannelState, string> = {
  on: "On",
  quiet: "Quiet hours only",
  off: "Off",
};

type ChannelKey = "push" | "email" | "sms";

const CHANNELS: { key: ChannelKey; label: string; helper: string; Icon: typeof Bell }[] = [
  { key: "push", label: "Push", helper: "On this device.", Icon: Bell },
  { key: "email", label: "Email", helper: "To your sign-in address.", Icon: Mail },
  { key: "sms", label: "SMS", helper: "Safety, sign-in, and date confirmations only.", Icon: MessageSquare },
];

function ChannelsScreen() {
  const [state, setState] = useState<Record<ChannelKey, ChannelState>>({
    push: "on",
    email: "quiet",
    sms: "on",
  });
  const [quietStart, setQuietStart] = useState("22:00");
  const [quietEnd, setQuietEnd] = useState("07:00");

  return (
    <YouBackdrop>
      <StatusBar
        leading={
          <Link
            to="/profile/notifications"
            aria-label="Back"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <p className="text-label-mono">Notifications · channels</p>
        <h1 className="mt-2 font-display text-[28px] leading-tight text-ink">
          Where we reach you.
        </h1>
      </header>

      <ul className="px-5 space-y-2.5">
        {CHANNELS.map(({ key, label, helper, Icon }) => (
          <li
            key={key}
            className="rounded-[14px] bg-paper px-4 py-4 shadow-elev-1"
          >
            <div className="flex items-start gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-lavender-100 text-plum-700">
                <Icon size={16} strokeWidth={1.75} />
              </span>
              <div className="flex-1">
                <p className="font-display text-[14.5px] text-ink">{label}</p>
                <p className="mt-0.5 font-body text-[12px] text-stone">{helper}</p>
              </div>
            </div>
            <div className="mt-3 flex gap-1.5" role="radiogroup" aria-label={`${label} delivery`}>
              {(Object.keys(STATE_LABEL) as ChannelState[]).map((s) => {
                const active = state[key] === s;
                return (
                  <button
                    key={s}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setState((p) => ({ ...p, [key]: s }))}
                    className={
                      active
                        ? "flex-1 rounded-full bg-plum-700 px-3 py-1.5 text-label-mono text-paper"
                        : "flex-1 rounded-full border border-line bg-paper px-3 py-1.5 text-label-mono text-slate hover:bg-lavender-50"
                    }
                  >
                    {STATE_LABEL[s]}
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ul>

      <section className="px-5 pt-7">
        <p className="text-label-mono">Quiet hours</p>
        <div className="mt-3 flex items-center gap-3 rounded-[14px] bg-paper px-4 py-3.5 shadow-elev-1">
          <label className="flex items-center gap-2 font-body text-[13px] text-ink">
            From
            <input
              type="time"
              value={quietStart}
              onChange={(e) => setQuietStart(e.target.value)}
              className="rounded-[10px] border border-line bg-paper px-2 py-1 font-mono text-[13px]"
            />
          </label>
          <label className="flex items-center gap-2 font-body text-[13px] text-ink">
            to
            <input
              type="time"
              value={quietEnd}
              onChange={(e) => setQuietEnd(e.target.value)}
              className="rounded-[10px] border border-line bg-paper px-2 py-1 font-mono text-[13px]"
            />
          </label>
        </div>
        <p className="mt-2 font-body text-[12px] text-stone">
          Local to your device. Channels set to "Quiet hours only" are silent outside this window.
        </p>
      </section>

      <section className="px-5 pt-7">
        <Link
          to="/profile/notifications"
          className="flex items-center justify-between rounded-[14px] bg-paper px-4 py-3.5 shadow-elev-1 hover:bg-lavender-50"
        >
          <div>
            <p className="font-display text-[14px] text-ink">Choose what triggers each channel</p>
            <p className="mt-0.5 font-body text-[12px] text-stone">
              Per-event control by category — Connections, Discover, Safety…
            </p>
          </div>
          <ChevronRight size={16} className="text-stone" />
        </Link>
      </section>

      <p className="px-5 pt-6 pb-12 text-center font-body text-[12.5px] italic text-stone">
        We never SMS for marketing. Only safety, sign-in, and date confirmations.
      </p>
    </YouBackdrop>
  );
}
