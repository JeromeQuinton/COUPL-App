import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ArrowRight } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";

export const Route = createFileRoute("/_main/membership/")({
  head: () => ({
    meta: [
      { title: "Membership — COUPL" },
      {
        name: "description",
        content: "Go a little deeper. Pay for depth, not desperation.",
      },
    ],
  }),
  component: MembershipIndex,
});

const LADDER = [
  {
    n: "01",
    title: "Five suggestions a day",
    sub: "From three. Hand-picked, not algorithm-flooded.",
  },
  {
    n: "02",
    title: "Coach cards · deep mode",
    sub: "Pattern reading across all your threads, not just one.",
  },
  {
    n: "03",
    title: "Room invites · priority",
    sub: "First-look at hosted events, before public release.",
  },
];

function MembershipIndex() {
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
        <p className="text-label-mono">Membership</p>
        <h1 className="mt-2 font-display text-[30px] leading-tight text-ink">
          What it <em className="font-display italic">actually changes.</em>
        </h1>
        <p className="mt-3 font-body text-[14px] leading-relaxed text-slate">
          More clarity. More range. The foundation stays the same: thoughtful dating, steadier pacing, clearer relational tools.
        </p>
        <p className="mt-3 font-body text-[12.5px] italic text-stone">
          Pay for depth, not desperation.
        </p>
      </header>

      <ul className="px-5 flex flex-col gap-2.5">
        {LADDER.map((l) => (
          <li
            key={l.n}
            className="flex items-start gap-4 rounded-[14px] bg-paper px-4 py-3.5 shadow-elev-1"
          >
            <span className="font-display text-[16px] font-semibold text-plum-500 min-w-[2rem]">
              {l.n}
            </span>
            <div>
              <p className="font-display text-[15px] font-medium text-ink">
                {l.title}
              </p>
              <p className="mt-0.5 font-body text-[12.5px] text-slate">
                {l.sub}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="px-5 pt-8 pb-12 space-y-3">
        <Link
          to="/membership/subscription"
          className="flex items-center justify-center gap-2 w-full rounded-full border border-line bg-paper px-5 py-3 font-display text-[14px] text-ink hover:bg-lavender-50"
        >
          Manage current subscription
        </Link>
        <Link
          to="/membership/plans"
          className="flex items-center justify-center gap-2 w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90"
        >
          See plans
          <ArrowRight size={15} strokeWidth={2} />
        </Link>
        <Link
          to="/profile"
          className="block w-full rounded-full px-5 py-3 text-center font-body text-[13.5px] text-slate hover:text-plum-500"
        >
          Maybe later
        </Link>
        <p className="mt-2 text-center text-body-sm italic text-stone">
          Free remains intentional. Membership expands.
        </p>
      </div>
    </YouBackdrop>
  );
}
