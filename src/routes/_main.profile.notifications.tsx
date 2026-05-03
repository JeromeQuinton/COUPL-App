import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { PreferenceToggle } from "@/components/profile/PreferenceToggle";

export const Route = createFileRoute("/_main/profile/notifications")({
  head: () => ({ meta: [{ title: "Notifications — COUPL" }] }),
  component: NotificationsScreen,
});

function NotificationsScreen() {
  const [conn, setConn] = useState({ push: true });
  const [weekly, setWeekly] = useState({ push: true, email: true });
  const [events, setEvents] = useState({ push: true });
  const [workshops, setWorkshops] = useState({ push: false, email: true });
  const [marketing, setMarketing] = useState({ push: false, email: false });

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
      </header>

      <ul className="px-5 space-y-2.5">
        <PreferenceToggle
          label="Connections"
          helper="Attunes, replies, plan invites."
          pushValue={conn.push}
          pushOnChange={(v) => setConn({ push: v })}
          pushOnly
        />
        <PreferenceToggle
          label="Weekly check-in"
          helper="Sunday morning, one prompt."
          pushValue={weekly.push}
          pushOnChange={(v) => setWeekly((s) => ({ ...s, push: v }))}
          emailValue={weekly.email}
          emailOnChange={(v) => setWeekly((s) => ({ ...s, email: v }))}
        />
        <PreferenceToggle
          label="Event reminders"
          helper="Only for events you've booked."
          pushValue={events.push}
          pushOnChange={(v) => setEvents({ push: v })}
          pushOnly
        />
        <PreferenceToggle
          label="Workshop announcements"
          helper="When new workshops open."
          pushValue={workshops.push}
          pushOnChange={(v) => setWorkshops((s) => ({ ...s, push: v }))}
          emailValue={workshops.email}
          emailOnChange={(v) => setWorkshops((s) => ({ ...s, email: v }))}
        />
        <PreferenceToggle
          label="Marketing"
          helper="Off unless you opt in."
          pushValue={marketing.push}
          pushOnChange={(v) => setMarketing((s) => ({ ...s, push: v }))}
          emailValue={marketing.email}
          emailOnChange={(v) => setMarketing((s) => ({ ...s, email: v }))}
        />
      </ul>

      <p className="px-5 pt-6 pb-12 text-center font-body text-[12.5px] italic text-stone">
        We default to less. You can always turn things on.
      </p>
    </YouBackdrop>
  );
}
