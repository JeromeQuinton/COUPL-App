import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { ScreenHeader } from "@/components/shell/ScreenHeader";

/**
 * /membership/upgraded — post-checkout confirmation.
 *
 * Calm. Editorial. Not "Welcome aboard 🎉".
 *
 * Stream-19 SCREEN-35.
 */
export const Route = createFileRoute("/_main/membership/upgraded")({
  head: () => ({ meta: [{ title: "Welcome — COUPL" }] }),
  component: UpgradedScreen,
});

const UNLOCKED = [
  { label: "Five issues a day", helper: "Discover deepens. Same curation." },
  { label: "Polaris", helper: "Your monthly attachment-health reading." },
  { label: "Coach video sessions", helper: "Twenty minutes, when you want one." },
];

function UpgradedScreen() {
  return (
    <main className="mx-auto max-w-[480px] px-6 pt-16 pb-24 text-center">
      <span
        aria-hidden
        className="mx-auto grid h-14 w-14 place-items-center rounded-full text-plum-700"
        style={{
          background:
            "linear-gradient(135deg, color-mix(in oklab, var(--lavender-100) 70%, var(--paper)) 0%, color-mix(in oklab, var(--blush) 50%, var(--paper)) 100%)",
        }}
      >
        <Sparkles size={22} />
      </span>

      <div className="mt-6">
        <ScreenHeader
          eyebrow="Membership"
          title="You're a Member."
          titleSize="display-xl"
          titleItalic
        />
      </div>
      <p className="mt-4 font-body text-[14px] leading-relaxed text-slate">
        Quietly, properly. The product opens up, but the rhythm stays
        yours. No notifications urging you in.
      </p>

      <ul className="mt-10 space-y-3 text-left">
        {UNLOCKED.map((u) => (
          <li
            key={u.label}
            className="rounded-[16px] bg-paper p-4 shadow-elev-1"
          >
            <p className="font-display text-[15px] text-ink">{u.label}</p>
            <p className="mt-1 font-body text-[12.5px] text-slate">{u.helper}</p>
          </li>
        ))}
      </ul>

      <Link
        to="/discover"
        className="mt-10 inline-flex rounded-full bg-plum-700 px-6 py-3 font-display text-[14px] font-medium text-paper hover:bg-plum-500"
      >
        Take a look around
      </Link>
      <Link
        to="/membership/subscription"
        className="mt-3 block font-body text-[13px] text-stone hover:text-ink"
      >
        See your subscription
      </Link>
    </main>
  );
}
