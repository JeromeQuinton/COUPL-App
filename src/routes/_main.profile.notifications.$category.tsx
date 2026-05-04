import { useState } from "react";
import { createFileRoute, Link, notFound, useParams } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { ScreenHeader } from "@/components/shell/ScreenHeader";

/**
 * /profile/notifications/$category — per-category notification settings.
 *
 * Stream-20 SCREEN-37. Phase 1 visual + local state. Phase 4 binds to a real
 * preferences table keyed on (user_id, category).
 *
 * Categories:
 *   connections · discover · growth · coach · safety · events · account
 */

type CategoryId =
  | "connections"
  | "discover"
  | "growth"
  | "coach"
  | "safety"
  | "events"
  | "account";

type Category = {
  label: string;
  h1: string;
  helper: string;
  bundle?: string;
  bundleMemberOnly?: boolean;
};

const CATEGORIES: Record<CategoryId, Category> = {
  connections: {
    label: "Connections",
    h1: "When someone reaches.",
    helper: "Replies, plan invites, voice memos.",
    bundle: "Send me a single morning summary instead of pings.",
  },
  discover: {
    label: "Discover",
    h1: "When a new issue lands.",
    helper: "The daily issue, plus who attuned to you (Members).",
    bundle: "Send me a single morning summary instead of pings.",
    bundleMemberOnly: true,
  },
  growth: {
    label: "Growth",
    h1: "When the next workshop nears.",
    helper: "Workshop reminders, journal nudges, library new entry.",
  },
  coach: {
    label: "Coach",
    h1: "When Polaris has noticed something.",
    helper: "Polaris reflections, video session reminders.",
  },
  safety: {
    label: "Safety",
    h1: "When something needs your eyes.",
    helper: "Verification status, safety-share events, report updates.",
  },
  events: {
    label: "Events",
    h1: "When the room shifts.",
    helper: "Upcoming events, waitlist position changes.",
  },
  account: {
    label: "Account",
    h1: "When the platform changes.",
    helper: "Sign-in alerts, billing, terms updates.",
  },
};

export const Route = createFileRoute("/_main/profile/notifications/$category")({
  head: () => ({ meta: [{ title: "Notifications — COUPL" }] }),
  component: NotificationCategoryScreen,
  beforeLoad: ({ params }) => {
    if (!(params.category in CATEGORIES)) throw notFound();
  },
});

const IS_PAID_USER_V0 = false;

function NotificationCategoryScreen() {
  const { category } = useParams({
    from: "/_main/profile/notifications/$category",
  });
  const cat = CATEGORIES[category as CategoryId];

  const [push, setPush] = useState(true);
  const [email, setEmail] = useState(false);
  const [inApp, setInApp] = useState(true);
  const [quietFrom, setQuietFrom] = useState("22:00");
  const [quietTo, setQuietTo] = useState("08:00");
  const [bundle, setBundle] = useState(false);

  const bundleAvailable = !!cat.bundle;
  const bundleLocked = cat.bundleMemberOnly && !IS_PAID_USER_V0;

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
        <ScreenHeader
          eyebrow={`Notifications · ${cat.label.toLowerCase()}`}
          title={cat.h1}
          titleItalic
        />
        <p className="mt-2 font-body text-[13.5px] text-stone">{cat.helper}</p>
      </header>

      <ul className="px-5 space-y-2.5">
        <ToggleRow
          label="Push"
          helper="A quiet ping on your device."
          value={push}
          onChange={setPush}
        />
        <ToggleRow
          label="Email"
          helper="A note in your inbox."
          value={email}
          onChange={setEmail}
        />
        <ToggleRow
          label="In-app banner"
          helper="A small mark next to the bell."
          value={inApp}
          onChange={setInApp}
        />
      </ul>

      <section className="px-5 pt-6">
        <article className="rounded-[14px] bg-paper px-4 py-4 shadow-elev-1">
          <p className="text-label-mono">Quiet hours</p>
          <p className="mt-1 font-body text-[12.5px] italic text-stone">
            Mutes push only. Email and banner still arrive.
          </p>
          <div className="mt-3 flex items-center gap-3">
            <label className="flex-1">
              <span className="text-label-mono">From</span>
              <input
                type="time"
                value={quietFrom}
                onChange={(e) => setQuietFrom(e.target.value)}
                className="mt-1 w-full rounded-[10px] border border-line bg-paper px-3 py-2 font-body text-[14px] text-ink"
              />
            </label>
            <label className="flex-1">
              <span className="text-label-mono">To</span>
              <input
                type="time"
                value={quietTo}
                onChange={(e) => setQuietTo(e.target.value)}
                className="mt-1 w-full rounded-[10px] border border-line bg-paper px-3 py-2 font-body text-[14px] text-ink"
              />
            </label>
          </div>
        </article>
      </section>

      {bundleAvailable && (
        <section className="px-5 pt-3">
          <article
            className={`rounded-[14px] bg-paper px-4 py-4 shadow-elev-1 ${
              bundleLocked ? "opacity-60" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="text-label-mono">Bundle</p>
                <p className="mt-1 font-body text-[13.5px] text-ink">{cat.bundle}</p>
                {bundleLocked && (
                  <p className="mt-1 font-body text-[12px] italic text-stone">
                    Bundling is part of Membership.
                  </p>
                )}
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={bundle}
                disabled={bundleLocked}
                onClick={() => setBundle((v) => !v)}
                className={`mt-1 inline-flex h-6 w-11 shrink-0 items-center rounded-full transition ${
                  bundle && !bundleLocked ? "bg-plum-700" : "bg-line"
                } ${bundleLocked ? "cursor-not-allowed" : ""}`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-paper shadow transition ${
                    bundle && !bundleLocked ? "translate-x-[22px]" : "translate-x-[2px]"
                  }`}
                />
              </button>
            </div>
          </article>
        </section>
      )}

      <p className="px-5 pt-8 pb-12 text-center font-body text-[12.5px] italic text-stone">
        We default to less. You can always turn things on.
      </p>
    </YouBackdrop>
  );
}

function ToggleRow({
  label,
  helper,
  value,
  onChange,
}: {
  label: string;
  helper: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <li className="rounded-[14px] bg-paper px-4 py-3.5 shadow-elev-1">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="font-display text-[14.5px] text-ink">{label}</p>
          <p className="mt-0.5 font-body text-[12.5px] text-stone">{helper}</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={value}
          onClick={() => onChange(!value)}
          className={`mt-1 inline-flex h-6 w-11 shrink-0 items-center rounded-full transition ${
            value ? "bg-plum-700" : "bg-line"
          }`}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-paper shadow transition ${
              value ? "translate-x-[22px]" : "translate-x-[2px]"
            }`}
          />
        </button>
      </div>
    </li>
  );
}
