import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";

export const Route = createFileRoute("/_main/membership/subscription/")({
  head: () => ({ meta: [{ title: "Subscription — COUPL" }] }),
  component: SubscriptionDetail,
});

function SubscriptionDetail() {
  return (
    <YouBackdrop>
      <StatusBar
        leading={
          <Link to="/membership" aria-label="Back" className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5">
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <p className="text-label-mono">Membership</p>
        <h1 className="mt-2 font-display text-[28px] italic leading-tight text-ink">
          What's currently in place?
        </h1>
      </header>

      <section className="px-5">
        <article className="rounded-[18px] bg-paper px-5 py-5 shadow-elev-1">
          <p className="text-label-mono">Plan</p>
          <p className="mt-2 font-display text-[20px] text-ink">COUPL Membership</p>
          <p className="mt-1 font-body text-[12.5px] text-slate">Monthly · £12.99</p>

          <ul className="mt-5 space-y-3 border-t border-line pt-4">
            <li className="flex items-center justify-between text-[13.5px]">
              <span className="text-label-mono">Next bill</span>
              <span className="font-display text-ink">3 June 2026</span>
            </li>
            <li className="flex items-center justify-between text-[13.5px]">
              <span className="text-label-mono">Payment method</span>
              <span className="font-display text-ink">Visa ···· 4242</span>
            </li>
          </ul>
        </article>
      </section>

      <section className="px-5 pt-6 space-y-2.5">
        <Link
          to="/membership/subscription/pause"
          className="block w-full rounded-[14px] bg-paper px-4 py-3.5 text-center font-display text-[14.5px] text-ink shadow-elev-1 hover:bg-lavender-50"
        >
          Pause membership
        </Link>
        <Link
          to="/membership/subscription/cancel"
          className="block w-full rounded-[14px] bg-paper px-4 py-3.5 text-center font-display text-[14.5px] text-ink shadow-elev-1 hover:bg-lavender-50"
        >
          Cancel membership
        </Link>
        <Link
          to="/membership/subscription/invoices"
          className="block w-full rounded-[14px] bg-paper px-4 py-3.5 text-center font-display text-[14.5px] text-ink shadow-elev-1 hover:bg-lavender-50"
        >
          Invoices
        </Link>
        <button
          type="button"
          // TODO: stream-5-next stripe portal
          className="w-full rounded-[14px] bg-paper px-4 py-3.5 text-center font-display text-[14.5px] text-ink shadow-elev-1 hover:bg-lavender-50"
        >
          Update payment method
        </button>
      </section>

      <p className="px-5 pt-8 pb-12 text-center font-body text-[12.5px] italic text-stone">
        No dark patterns. No pressure. Pause or cancel any time.
      </p>
    </YouBackdrop>
  );
}
