import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Check } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";

export const Route = createFileRoute("/_main/membership/plans")({
  head: () => ({
    meta: [
      { title: "Plans — COUPL Membership" },
      {
        name: "description",
        content: "Choose the pace that fits.",
      },
    ],
  }),
  component: MembershipPlans,
});

type Cadence = "weekly" | "monthly" | "yearly";
type Currency = "GBP" | "USD" | "EUR";

const PRICING: Record<Cadence, Record<Currency, { display: string; sub: string }>> = {
  weekly: {
    GBP: { display: "£4.99", sub: "per week · cancel anytime" },
    USD: { display: "$5.99", sub: "per week · cancel anytime" },
    EUR: { display: "€5.49", sub: "per week · cancel anytime" },
  },
  monthly: {
    GBP: { display: "£12.99", sub: "per month · cancel anytime" },
    USD: { display: "$15.99", sub: "per month · cancel anytime" },
    EUR: { display: "€14.99", sub: "per month · cancel anytime" },
  },
  yearly: {
    GBP: { display: "£9.99", sub: "per month · billed £119.88 yearly · save 23%" },
    USD: { display: "$11.99", sub: "per month · billed $143.88 yearly · save 25%" },
    EUR: { display: "€10.99", sub: "per month · billed €131.88 yearly · save 27%" },
  },
};

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  GBP: "£",
  USD: "$",
  EUR: "€",
};

function MembershipPlans() {
  const [cadence, setCadence] = useState<Cadence>("yearly");
  const [currency, setCurrency] = useState<Currency>("GBP");

  const price = PRICING[cadence][currency];

  return (
    <YouBackdrop tone="serious">
      <StatusBar
        leading={
          <Link
            to="/membership"
            aria-label="Back"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <p className="text-label-mono">Plans</p>
        <h1 className="mt-2 font-display text-[28px] leading-tight text-ink">
          Choose the pace that <em className="font-display italic">fits.</em>
        </h1>
        <p className="mt-3 font-body text-[14px] leading-relaxed text-slate">
          No dark patterns. No pressure. Cancel anytime, clear pricing, no hidden friction.
        </p>
      </header>

      <section className="px-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-label-mono">Currency</p>
          <div className="inline-flex rounded-full border border-line bg-paper p-0.5">
            {(["GBP", "USD", "EUR"] as Currency[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCurrency(c)}
                className={`rounded-full px-3 py-1 text-label-mono transition-colors ${
                  currency === c ? "bg-plum-700 text-paper" : "text-slate"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {(["weekly", "monthly", "yearly"] as Cadence[]).map((c) => {
            const active = cadence === c;
            const best = c === "yearly";
            return (
              <button
                key={c}
                type="button"
                onClick={() => setCadence(c)}
                className={`relative rounded-[16px] border px-3 py-4 text-center transition-colors ${
                  active
                    ? "border-plum-500 bg-lavender-100"
                    : "border-line bg-paper hover:bg-lavender-50"
                }`}
              >
                {best && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-plum-700 px-2 py-0.5 font-body text-[10px] font-semibold uppercase tracking-[0.12em] text-paper">
                    Best
                  </span>
                )}
                <p className={`font-display text-[14px] capitalize ${active ? "text-plum-700 font-semibold" : "text-ink"}`}>
                  {c}
                </p>
              </button>
            );
          })}
        </div>

        <article className="mt-5 rounded-[18px] bg-paper px-5 py-5 shadow-elev-1">
          <p className="text-label-mono">{cadence}</p>
          <p className="mt-2 font-display text-[36px] leading-none text-ink">
            {price.display}
          </p>
          <p className="mt-2 font-body text-[12.5px] text-slate">
            {price.sub}
          </p>
        </article>
      </section>

      <section className="px-5 pt-6">
        <p className="text-label-mono">Included</p>
        <ul className="mt-3 space-y-2">
          {[
            "Five suggestions a day",
            "Coach cards · deep mode",
            "Priority event invites",
            "Monthly pacing review",
            "Cancel anytime, no questions",
          ].map((line) => (
            <li
              key={line}
              className="flex items-center gap-2.5 font-body text-[13.5px] text-ink"
            >
              <Check size={14} className="text-success" aria-hidden />
              {line}
            </li>
          ))}
        </ul>
      </section>

      <div className="px-5 pt-8 pb-12 space-y-3">
        <button
          type="button"
          className="w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90"
        >
          Start membership · {price.display}
        </button>
        <Link
          to="/profile"
          className="block w-full rounded-full px-5 py-3 text-center font-body text-[13.5px] text-slate hover:text-plum-500"
        >
          Stay free
        </Link>
        <p className="mt-2 text-center text-body-sm italic text-stone">
          Billing is transparent. Leaving is simple.
        </p>
      </div>
    </YouBackdrop>
  );
}
