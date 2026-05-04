import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { TrendingUp, Minus, Moon } from "lucide-react";
import { PageBackdrop } from "@/components/connections/PageBackdrop";
import {
  RING_CONNECTIONS,
  TIMELINE_CARDS,
} from "@/data/wireframe_chap_extras";

/**
 * Screen 18 — Connections list.
 * Wireframe-anchored (UI-Connections):
 *   header → connection rings → pattern pills → timeline cards.
 * AD-CN-WF1: alignment % + tone chip use lavender (DR-032 informational tier).
 */
export const Route = createFileRoute("/_main/connections/")({
  head: () => ({
    meta: [
      { title: "Connections — COUPL" },
      {
        name: "description",
        content:
          "Recent connections + conversations. Rings show ongoing care.",
      },
    ],
  }),
  component: ConnectionsListScreen,
});

const PATTERNS = [
  { id: "patterns", label: "your patterns" },
  { id: "weekly", label: "weekly review" },
  { id: "monthly", label: "monthly" },
] as const;

type ConnectionId = (typeof TIMELINE_CARDS)[number]["id"];

const HUE_GRADIENTS: Record<"lavender" | "blush" | "beeswax", string> = {
  lavender:
    "linear-gradient(135deg, color-mix(in oklab, var(--lavender-100) 80%, var(--paper)) 0%, color-mix(in oklab, var(--plum-300) 22%, var(--paper)) 100%)",
  blush:
    "linear-gradient(135deg, color-mix(in oklab, var(--pink-100) 75%, var(--paper)) 0%, color-mix(in oklab, var(--blush) 50%, var(--paper)) 100%)",
  beeswax:
    "linear-gradient(135deg, color-mix(in oklab, var(--blush) 80%, var(--paper)) 0%, color-mix(in oklab, var(--blush) 35%, var(--paper)) 100%)",
};

function ConnectionsListScreen() {
  const [active, setActive] = useState<string>("patterns");

  // Phase 4 will source these from the user's real connections;
  // when both lists empty, render an editorial empty state.
  const isEmpty =
    RING_CONNECTIONS.length === 0 && TIMELINE_CARDS.length === 0;

  if (isEmpty) {
    return (
      <PageBackdrop>
        <div
          className="mx-auto flex w-full max-w-[480px] flex-col px-5"
          style={{
            paddingTop: "calc(env(safe-area-inset-top) + 1.25rem)",
            paddingBottom: "calc(env(safe-area-inset-bottom) + 100px)",
          }}
        >
          <header className="text-center">
            <h1 className="font-display text-[26px] font-semibold text-ink">
              Connections
            </h1>
            <p className="mt-1.5 font-body text-[13px] text-slate">
              recent connections + conversations
            </p>
          </header>

          <article className="mt-10 rounded-[18px] border border-dashed border-line bg-paper px-5 py-10 text-center">
            <p className="font-display text-[18px] text-ink">
              No connections yet.
            </p>
            <p className="mt-2 font-body text-[13.5px] leading-relaxed text-slate">
              Connections start when you and someone else both attune. Browse
              Discover, attune to a profile that stays with you, and the
              first thread will land here.
            </p>
            <Link
              to="/discover"
              className="mt-5 inline-flex items-center justify-center rounded-full bg-plum-500 px-5 py-2.5 font-body text-[13.5px] font-medium text-paper hover:bg-plum-700"
            >
              Browse Discover
            </Link>
            <p className="mt-4 font-body text-[12px] italic text-stone">
              Polaris is quiet until there's something to read.
            </p>
          </article>
        </div>
      </PageBackdrop>
    );
  }

  return (
    <PageBackdrop>
      <div
        className="mx-auto w-full max-w-[480px] px-5"
        style={{
          paddingTop: "calc(env(safe-area-inset-top) + 1.25rem)",
          paddingBottom: "calc(env(safe-area-inset-bottom) + 100px)",
        }}
      >
        {/* Header */}
        <header className="text-center">
          <h1 className="font-display text-[26px] font-semibold text-ink">
            Connections
          </h1>
          <p className="mt-1.5 font-body text-[13px] text-slate">
            recent connections + conversations
          </p>
        </header>

        {/* Connection rings · timeline */}
        <section
          aria-label="Connection rings"
          className="mt-5 rounded-[20px] border border-plum-300/25 bg-paper/80 p-4 shadow-elev-1 backdrop-blur"
        >
          <p className="font-body text-[10.5px] font-semibold uppercase tracking-[0.16em] text-plum-700/80">
            Connection rings · timeline
          </p>
          <ul className="mt-4 flex items-start justify-around">
            {RING_CONNECTIONS.map((r) => (
              <li key={r.id} className="flex flex-col items-center gap-2">
                <span
                  aria-hidden
                  className="grid h-[58px] w-[58px] place-items-center rounded-full p-[2.5px]"
                  style={{
                    background:
                      "conic-gradient(from 210deg, var(--plum-500) 0%, var(--plum-300) 50%, var(--lavender-100) 100%)",
                  }}
                >
                  <span
                    className="grid h-full w-full place-items-center rounded-full font-display text-[18px] font-semibold text-plum-700"
                    style={{ background: HUE_GRADIENTS[r.hue] }}
                  >
                    {r.initial}
                  </span>
                </span>
                <span className="font-display text-[13px] font-medium text-ink">
                  {r.name}
                </span>
                <span className="font-body text-[11px] text-stone">
                  — {r.trait}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Pattern pills */}
        <div className="mt-4 flex flex-wrap items-center gap-2" role="tablist">
          {PATTERNS.map((p) => {
            const on = p.id === active;
            return (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActive(p.id)}
                className={
                  "rounded-full border px-3.5 py-1.5 font-body text-[12.5px] transition-colors " +
                  (on
                    ? "border-plum-500/70 bg-lavender-100 text-plum-700"
                    : "border-plum-300/30 bg-paper/70 text-stone hover:border-plum-300/55 hover:text-plum-700")
                }
              >
                {p.label}
              </button>
            );
          })}
        </div>

        {/* Timeline cards */}
        <section className="mt-4 space-y-2.5" aria-label="Recent conversations">
          {TIMELINE_CARDS.map((c) => (
            <TimelineRow key={c.id} card={c} />
          ))}
        </section>
      </div>
    </PageBackdrop>
  );
}

function TimelineRow({ card }: { card: (typeof TIMELINE_CARDS)[number] }) {
  const ToneIcon =
    card.toneIcon === "rising"
      ? TrendingUp
      : card.toneIcon === "quiet"
        ? Moon
        : Minus;
  return (
    <Link
      to="/connections/$id"
      params={{ id: card.id as ConnectionId }}
      className="block rounded-[18px] border border-plum-300/25 bg-paper/85 p-3.5 shadow-elev-1 backdrop-blur transition-colors hover:bg-lavender-50"
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full font-display text-[15px] font-semibold text-plum-700"
          style={{ background: HUE_GRADIENTS[card.hue] }}
        >
          {card.initial}
        </span>
        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-between gap-2">
            <p className="font-display text-[14.5px] font-semibold text-ink">
              {card.name}, {card.age}
            </p>
            <span className="font-body text-[11.5px] text-stone">
              {card.ago}
            </span>
          </div>
          <p className="mt-0.5 font-body text-[12.5px] italic text-slate">
            {card.preview}
          </p>
          <div className="mt-2 flex items-center gap-1.5">
            <Chip>{card.alignment}%</Chip>
            <Chip>
              <ToneIcon
                size={11}
                strokeWidth={2}
                className="mr-0.5 inline-block align-[-1px]"
              />
              {card.tone}
            </Chip>
            {card.extraChip && <Chip>{card.extraChip}</Chip>}
          </div>
        </div>
      </div>
    </Link>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-plum-300/35 bg-lavender-50 px-2.5 py-0.5 font-body text-[11px] text-plum-700">
      {children}
    </span>
  );
}
