import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Compass, Shield, BadgeCheck, CalendarDays, Cog } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";

export const Route = createFileRoute("/_main/profile/help")({
  head: () => ({ meta: [{ title: "Help — COUPL" }] }),
  component: HelpHome,
});

const TOPICS = [
  { id: "starting", icon: Compass, label: "Getting started", helper: "First-week walkthroughs and onboarding hiccups." },
  { id: "safety", icon: Shield, label: "Safety", helper: "Reporting, blocking, verification, in-person meets." },
  { id: "membership", icon: BadgeCheck, label: "Membership", helper: "Plans, cancellation, billing, refunds." },
  { id: "events", icon: CalendarDays, label: "Events", helper: "Booking, hosting, attending, refunds." },
  { id: "technical", icon: Cog, label: "Technical issues", helper: "Login, sync, performance, devices." },
];

function HelpHome() {
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
        <p className="text-label-mono">Help</p>
        <h1 className="mt-2 font-display text-[28px] italic leading-tight text-ink">
          What needs untangling?
        </h1>
      </header>

      <ul className="px-5 space-y-2.5">
        {TOPICS.map((t) => {
          const Icon = t.icon;
          return (
            <li key={t.id}>
              <button
                type="button"
                // TODO: stream-5-next help topic pages
                className="flex w-full items-start gap-3 rounded-[14px] bg-paper px-4 py-3.5 text-left shadow-elev-1 transition-colors hover:bg-lavender-50"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-lavender-100 text-plum-700">
                  <Icon size={16} strokeWidth={2} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-[15px] text-ink">{t.label}</p>
                  <p className="mt-0.5 font-body text-[12px] text-stone">{t.helper}</p>
                </div>
                <ChevronRight size={16} className="self-center text-stone" />
              </button>
            </li>
          );
        })}
      </ul>

      <div className="px-5 pt-8 pb-12">
        <button
          type="button"
          // TODO: stream-5-next contact route
          className="w-full rounded-full border border-line bg-paper px-5 py-3 text-center font-display text-[14px] text-ink hover:bg-lavender-50"
        >
          Contact us
        </button>
      </div>
    </YouBackdrop>
  );
}
