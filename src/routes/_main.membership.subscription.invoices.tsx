import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Download } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { ScreenHeader } from "@/components/shell/ScreenHeader";

/**
 * /membership/subscription/invoices — what you've paid.
 *
 * Stream-20 SCREEN-40. Phase 1 visual + mocked list. Phase 4 wires Stripe
 * invoice list. Refund states surface explicitly — never silently hidden.
 */

type InvoiceStatus = "Paid" | "Refunded" | "Pending";

type Invoice = {
  id: string;
  date: string;
  amount: string;
  status: InvoiceStatus;
};

const INVOICES: Invoice[] = [
  { id: "inv_2026-05", date: "4 May 2026", amount: "£12.99", status: "Paid" },
  { id: "inv_2026-04", date: "4 Apr 2026", amount: "£12.99", status: "Paid" },
  { id: "inv_2026-03", date: "4 Mar 2026", amount: "£12.99", status: "Paid" },
  { id: "inv_2026-02", date: "4 Feb 2026", amount: "£12.99", status: "Paid" },
  { id: "inv_2026-01", date: "4 Jan 2026", amount: "£12.99", status: "Paid" },
  { id: "inv_2025-12", date: "4 Dec 2025", amount: "£12.99", status: "Refunded" },
  { id: "inv_2025-11", date: "4 Nov 2025", amount: "£12.99", status: "Paid" },
  { id: "inv_2025-10", date: "4 Oct 2025", amount: "£12.99", status: "Paid" },
];

const TOTAL_THIS_YEAR = "£64.95";
const TOTAL_THIS_MONTH = "£12.99";

export const Route = createFileRoute("/_main/membership/subscription/invoices")({
  head: () => ({ meta: [{ title: "Invoices — COUPL" }] }),
  component: InvoicesScreen,
});

function InvoicesScreen() {
  const empty = INVOICES.length === 0;

  return (
    <YouBackdrop>
      <StatusBar
        leading={
          <Link
            to="/membership/subscription"
            aria-label="Back"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <ScreenHeader
          eyebrow="Subscription · invoices"
          title="What you've paid."
          titleItalic
        />
      </header>

      {empty ? (
        <section className="px-5">
          <article className="rounded-[18px] bg-paper px-5 py-8 text-center shadow-elev-1">
            <p className="font-body text-[14px] text-ink">No invoices yet.</p>
            <p className="mt-1 font-body text-[12.5px] italic text-stone">
              Your first charge falls on the day after your trial ends.
            </p>
          </article>
        </section>
      ) : (
        <>
          {/* Annual summary */}
          <section className="px-5">
            <article className="rounded-[18px] bg-paper px-5 py-5 shadow-elev-1">
              <p className="text-label-mono">This year</p>
              <p className="mt-2 font-display text-[28px] text-ink">{TOTAL_THIS_YEAR}</p>
              <p className="mt-1 font-body text-[12.5px] text-stone">
                This month · {TOTAL_THIS_MONTH}
              </p>
              <p className="mt-3 font-body text-[12.5px] italic text-stone">
                Tax-time honesty, not a leaderboard.
              </p>
            </article>
          </section>

          {/* List */}
          <ul className="px-5 pt-4 space-y-2">
            {INVOICES.map((inv) => (
              <li
                key={inv.id}
                className="flex items-center gap-3 rounded-[14px] bg-paper px-4 py-3 shadow-elev-1"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-display text-[14px] text-ink">{inv.date}</p>
                  <p className="mt-0.5 font-body text-[12.5px] text-stone">
                    {inv.amount}
                  </p>
                </div>
                <StatusPill status={inv.status} />
                <button
                  type="button"
                  aria-label={`Download invoice for ${inv.date}`}
                  className="ml-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-stone hover:bg-lavender-50 hover:text-plum-700"
                  onClick={() => {
                    /* Phase 4: route to Stripe-hosted PDF URL */
                  }}
                >
                  <Download size={16} />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      <p className="px-5 pt-8 pb-12 text-center font-body text-[12px] italic text-stone">
        What we charged. Your record.
      </p>
    </YouBackdrop>
  );
}

function StatusPill({ status }: { status: InvoiceStatus }) {
  const styles: Record<InvoiceStatus, string> = {
    Paid: "bg-lavender-50 text-plum-700",
    Refunded: "bg-blush-50 text-ink/70",
    Pending: "bg-paper text-stone border border-line",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-body text-[11px] font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}
