import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Compass, Shield, BadgeCheck, CalendarDays, Cog } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";

export const Route = createFileRoute("/_main/profile/help")({
  head: () => ({ meta: [{ title: "Help — COUPL" }] }),
  component: HelpHome,
});

const TOPICS: {
  id: string;
  topicId: string;
  icon: typeof Compass;
  label: string;
  helper: string;
}[] = [
  { id: "starting", topicId: "getting-started", icon: Compass, label: "Getting started", helper: "First-week walkthroughs and onboarding hiccups." },
  { id: "attune", topicId: "how-attune-works", icon: BadgeCheck, label: "How Attune works", helper: "What the signal means and how mutuality works." },
  { id: "pause", topicId: "pause-vs-cancel", icon: Cog, label: "Pause vs cancel", helper: "What stays, what doesn't, and the seven-day window." },
  { id: "safety", topicId: "what-we-do-with-reports", icon: Shield, label: "What we do with reports", helper: "How we assess, what we tell the other person." },
  { id: "verify", topicId: "verifying-your-photos", icon: CalendarDays, label: "Verifying your photos", helper: "How the automatic check works and what to try." },
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
              <Link
                to="/profile/help/$topicId"
                params={{ topicId: t.topicId }}
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
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="px-5 pt-8 pb-12">
        <Link
          to="/profile/help/contact"
          className="block w-full rounded-full border border-line bg-paper px-5 py-3 text-center font-display text-[14px] text-ink hover:bg-lavender-50"
        >
          Contact us
        </Link>
      </div>
    </YouBackdrop>
  );
}
