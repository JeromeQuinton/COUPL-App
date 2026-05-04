import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";

/**
 * /profile/notifications — index of category settings.
 *
 * Stream-20 SCREEN-37 parent edit. Each row is now a Link to the per-category
 * detail screen. Toggles, quiet hours, and bundling live there.
 */

const CATEGORIES: ReadonlyArray<{ id: string; label: string; helper: string }> = [
  { id: "connections", label: "Connections", helper: "Replies, plan invites, voice memos." },
  { id: "discover", label: "Discover", helper: "The daily issue, who attuned to you." },
  { id: "growth", label: "Growth", helper: "Workshop reminders, journal nudges." },
  { id: "coach", label: "Coach", helper: "Polaris reflections, video sessions." },
  { id: "safety", label: "Safety", helper: "Verification, safety-share, reports." },
  { id: "events", label: "Events", helper: "Upcoming events, waitlist changes." },
  { id: "account", label: "Account", helper: "Sign-in alerts, billing, terms." },
];

export const Route = createFileRoute("/_main/profile/notifications")({
  head: () => ({ meta: [{ title: "Notifications — COUPL" }] }),
  component: NotificationsScreen,
});

function NotificationsScreen() {
  return (
    <YouBackdrop>
      <StatusBar
        leading={
          <Link to="/profile" aria-label="Back" className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5">
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <p className="text-label-mono">Notifications</p>
        <h1 className="mt-2 font-display text-[28px] italic leading-tight text-ink">
          What deserves your attention?
        </h1>
        <p className="mt-2 font-body text-[13.5px] text-stone">
          One row per kind. Open one to choose how it reaches you.
        </p>
      </header>

      <section className="px-5 pb-3">
        <Link
          to="/profile/notifications/channels"
          className="flex items-center justify-between rounded-[14px] bg-paper px-4 py-3.5 shadow-elev-1 hover:bg-lavender-50"
        >
          <div>
            <p className="font-display text-[14.5px] text-ink">Per-channel control</p>
            <p className="mt-0.5 font-body text-[12.5px] text-stone">
              Push, email, SMS — set quiet hours
            </p>
          </div>
          <ChevronRight size={18} className="shrink-0 text-stone" />
        </Link>
      </section>

      <ul className="px-5 space-y-2.5">
        {CATEGORIES.map((cat) => (
          <li key={cat.id}>
            <Link
              to="/profile/notifications/$category"
              params={{ category: cat.id }}
              className="flex items-center justify-between rounded-[14px] bg-paper px-4 py-3.5 shadow-elev-1 hover:bg-lavender-50"
            >
              <div className="min-w-0 flex-1 pr-3">
                <p className="font-display text-[14.5px] text-ink">{cat.label}</p>
                <p className="mt-0.5 font-body text-[12.5px] text-stone">{cat.helper}</p>
              </div>
              <ChevronRight size={18} className="shrink-0 text-stone" />
            </Link>
          </li>
        ))}
      </ul>

      <p className="px-5 pt-6 pb-12 text-center font-body text-[12.5px] italic text-stone">
        We default to less. You can always turn things on.
      </p>
    </YouBackdrop>
  );
}
