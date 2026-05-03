import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CITY_DATE_PLANS,
  CATEGORY_LABEL,
  type CityDateCategory,
} from "@/data/cityDatePlans";

export const Route = createFileRoute("/_main/date-plans/")({
  head: () => ({ meta: [{ title: "Date plans — COUPL" }] }),
  component: DatePlansIndex,
});

const FILTERS: { id: "all" | CityDateCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "walk", label: "Walks" },
  { id: "coffee", label: "Coffees" },
  { id: "slow-lunch", label: "Slow lunches" },
  { id: "gallery", label: "Galleries" },
  { id: "evening-reading", label: "Evening readings" },
];

function DatePlansIndex() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");

  const visible = useMemo(
    () => (filter === "all" ? CITY_DATE_PLANS : CITY_DATE_PLANS.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <div
      className="min-h-[100dvh] px-5 bg-paper"
      style={{ paddingTop: "calc(env(safe-area-inset-top) + 1.5rem)", paddingBottom: "calc(env(safe-area-inset-bottom) + 1.5rem)" }}
    >
      <div className="mx-auto max-w-[640px]">
        <p className="text-label-mono">Date plans · London</p>
        <h1 className="mt-2 font-display text-[32px] leading-tight text-ink">
          Places that make a first meet easier.
        </h1>
        <p className="mt-3 font-body text-[14px] leading-relaxed text-slate">
          Quietly curated. The room does some of the work, so you don't have to.
        </p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <li key={f.id}>
                <button
                  type="button"
                  onClick={() => setFilter(f.id)}
                  className={`rounded-full border px-3.5 py-1.5 text-label-mono transition-colors ${
                    active
                      ? "border-plum-500 bg-lavender-100 text-plum-700"
                      : "border-line bg-paper text-slate hover:bg-lavender-50"
                  }`}
                >
                  {f.label}
                </button>
              </li>
            );
          })}
        </ul>

        <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {visible.map((p) => (
            <li key={p.id}>
              <Link
                to="/date-plans/$id"
                params={{ id: p.id }}
                className="block rounded-[18px] bg-paper p-5 shadow-elev-1 transition-colors hover:bg-lavender-50"
              >
                <p className="text-label-mono">{CATEGORY_LABEL[p.category].toUpperCase()}</p>
                <p className="mt-2 font-display text-[18px] italic leading-snug text-ink">
                  {p.title}
                </p>
                <p className="mt-1 font-body text-[12.5px] text-slate">
                  {p.venue} · {p.area}
                </p>
                <span className="mt-3 inline-block rounded-full border border-line bg-paper px-2.5 py-0.5 text-label-mono text-stone">
                  {p.durationMin} min
                </span>
                <p
                  className="mt-3 font-body text-[13px] text-ink"
                  style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                >
                  {p.whyItWorks}
                </p>
                <div
                  aria-hidden
                  className="mt-4 h-px"
                  style={{
                    background: "color-mix(in oklab, var(--blush) 60%, var(--paper))",
                  }}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
