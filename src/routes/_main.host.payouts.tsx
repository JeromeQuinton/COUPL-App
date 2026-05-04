import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { EventsBackdrop } from "@/components/events/EventsBackdrop";
import { StatusBar } from "@/components/events/StatusBar";

/**
 * /host/payouts — host payout dashboard.
 *
 * Phase 1 visual; Phase 4 sources from Stripe Connect transfers
 * + COUPL fee ledger. Net = revenue − COUPL fee − Stripe fee.
 */
export const Route = createFileRoute("/_main/host/payouts")({
  head: () => ({
    meta: [{ title: "Payouts — COUPL Host" }],
  }),
  component: HostPayouts,
});

type Status = "paid" | "pending" | "scheduled";

type Payout = {
  id: string;
  title: string;
  date: string; // event date label
  attendees: number;
  revenue: number; // gross
  couplFee: number;
  stripeFee: number;
  status: Status;
  payoutDate: string; // when the net hits the bank
};

const PAYOUTS: Payout[] = [
  {
    id: "tea-oct",
    title: "Tea & Honesty",
    date: "30 Oct",
    attendees: 9,
    revenue: 162,
    couplFee: 24.3,
    stripeFee: 4.86,
    status: "paid",
    payoutDate: "5 Nov",
  },
  {
    id: "slow-sundays-oct",
    title: "Slow Sundays",
    date: "26 Oct",
    attendees: 8,
    revenue: 96,
    couplFee: 14.4,
    stripeFee: 2.88,
    status: "paid",
    payoutDate: "1 Nov",
  },
  {
    id: "after-work-oct",
    title: "After-work room",
    date: "22 Oct",
    attendees: 6,
    revenue: 84,
    couplFee: 12.6,
    stripeFee: 2.52,
    status: "pending",
    payoutDate: "8 Nov (estimated)",
  },
  {
    id: "tea-nov",
    title: "Tea & Honesty · Nov",
    date: "13 Nov",
    attendees: 11,
    revenue: 198,
    couplFee: 29.7,
    stripeFee: 5.94,
    status: "scheduled",
    payoutDate: "20 Nov (estimated)",
  },
];

const fmt = (n: number) =>
  `£${n.toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

function net(p: Payout) {
  return p.revenue - p.couplFee - p.stripeFee;
}

function HostPayouts() {
  const totalThisMonth = PAYOUTS.filter(
    (p) => p.status === "paid" || p.status === "pending",
  ).reduce((s, p) => s + net(p), 0);

  const nextPayout = PAYOUTS.find(
    (p) => p.status === "pending" || p.status === "scheduled",
  );

  return (
    <EventsBackdrop>
      <StatusBar
        leading={
          <Link
            to="/host"
            aria-label="Back to host dashboard"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <p className="text-label-mono">Hosting · payouts</p>
        <h1 className="mt-2 font-display text-[28px] leading-tight text-ink">
          What you've earned.
        </h1>
        <p className="mt-3 font-body text-[12.5px] italic text-stone">
          Quietly running the room. Quietly paid for it.
        </p>
      </header>

      <section className="px-5 grid grid-cols-2 gap-3">
        <div className="rounded-[16px] bg-paper p-4 shadow-elev-1">
          <p className="text-label-mono">This month · net</p>
          <p className="mt-2 font-display text-[24px] text-ink">
            {fmt(totalThisMonth)}
          </p>
        </div>
        <div className="rounded-[16px] bg-paper p-4 shadow-elev-1">
          <p className="text-label-mono">Next payout</p>
          <p className="mt-2 font-display text-[16px] text-ink">
            {nextPayout ? fmt(net(nextPayout)) : "—"}
          </p>
          <p className="mt-1 font-body text-[12px] text-stone">
            {nextPayout?.payoutDate ?? "Nothing scheduled"}
          </p>
        </div>
      </section>

      <section className="px-5 pt-6">
        <p className="text-label-mono mb-2">Recent rooms</p>
        <ul className="flex flex-col gap-2.5">
          {PAYOUTS.map((p) => (
            <li
              key={p.id}
              className="rounded-[14px] bg-paper p-4 shadow-elev-1"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-[15px] font-semibold text-ink">
                    {p.title}
                  </p>
                  <p className="mt-0.5 font-body text-[12px] text-stone">
                    {p.date} · {p.attendees} attendees
                  </p>
                </div>
                <StatusPill status={p.status} />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 font-body text-[12.5px]">
                <span className="text-slate">Revenue</span>
                <span className="text-right text-ink">{fmt(p.revenue)}</span>
                <span className="text-slate">COUPL fee</span>
                <span className="text-right text-ink">−{fmt(p.couplFee)}</span>
                <span className="text-slate">Card fee</span>
                <span className="text-right text-ink">−{fmt(p.stripeFee)}</span>
                <span className="font-medium text-ink">Net to you</span>
                <span className="text-right font-display text-[14px] text-ink">
                  {fmt(net(p))}
                </span>
              </div>
              <p className="mt-2 font-body text-[11.5px] text-stone">
                Payout · {p.payoutDate}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <p className="px-5 pt-6 pb-12 text-center font-body text-[11.5px] text-stone">
        Phase 1 figures are illustrative. Live amounts arrive when Stripe
        Connect is enabled on your account.
      </p>
    </EventsBackdrop>
  );
}

function StatusPill({ status }: { status: Status }) {
  const map: Record<Status, { label: string; color: string }> = {
    paid: { label: "Paid", color: "text-success" },
    pending: { label: "Pending", color: "text-caution" },
    scheduled: { label: "Scheduled", color: "text-slate" },
  };
  const m = map[status];
  return <span className={`text-label-mono ${m.color}`}>{m.label}</span>;
}
