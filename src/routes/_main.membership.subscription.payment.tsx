import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, CreditCard } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { ScreenHeader } from "@/components/shell/ScreenHeader";

/**
 * /membership/subscription/payment — manage payment method.
 *
 * Closes the Stripe-portal TODO on /membership/subscription. Show
 * masked current card; let the user replace it. Phase 1 visual.
 *
 * Stream-19 SCREEN-18.
 */
export const Route = createFileRoute("/_main/membership/subscription/payment")({
  head: () => ({ meta: [{ title: "Payment method — COUPL" }] }),
  component: PaymentScreen,
});

function PaymentScreen() {
  const [number, setNumber] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");
  const [postcode, setPostcode] = useState("");
  const [saved, setSaved] = useState(false);

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
          eyebrow="Subscription · payment"
          title="Card on file."
          titleItalic
        />
      </header>

      <section className="px-5">
        <div className="rounded-[18px] bg-paper p-4 shadow-elev-1 flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-lavender-100 text-plum-700">
            <CreditCard size={18} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-[15px] text-ink">Visa ···· 4242</p>
            <p className="mt-0.5 font-body text-[12px] text-stone">Expires 09/27</p>
          </div>
        </div>
      </section>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSaved(true);
        }}
        className="px-5 pt-8 pb-12 space-y-4"
      >
        <p className="text-label-mono">Replace card</p>

        <label className="block">
          <span className="text-label-mono">Card number</span>
          <input
            inputMode="numeric"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="1234 5678 9012 3456"
            className="mt-2 w-full rounded-[12px] border border-line bg-paper px-4 py-3 font-body text-[14px] text-ink placeholder:text-stone"
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-label-mono">Expiry</span>
            <input
              value={exp}
              onChange={(e) => setExp(e.target.value)}
              placeholder="MM/YY"
              className="mt-2 w-full rounded-[12px] border border-line bg-paper px-4 py-3 font-body text-[14px] text-ink"
            />
          </label>
          <label className="block">
            <span className="text-label-mono">CVC</span>
            <input
              inputMode="numeric"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              placeholder="123"
              className="mt-2 w-full rounded-[12px] border border-line bg-paper px-4 py-3 font-body text-[14px] text-ink"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-label-mono">Postcode</span>
          <input
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            placeholder="EC1V 4AB"
            className="mt-2 w-full rounded-[12px] border border-line bg-paper px-4 py-3 font-body text-[14px] text-ink"
          />
        </label>

        <button
          type="submit"
          className="w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper hover:bg-plum-500"
        >
          Save and use this card
        </button>

        {saved && (
          <p className="text-center font-body text-[12.5px] italic text-success">
            Card updated. Next charge will use the new card.
          </p>
        )}
      </form>
    </YouBackdrop>
  );
}
