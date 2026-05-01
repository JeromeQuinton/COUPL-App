import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { GrowthBackdrop } from "@/components/growth/GrowthBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import {
  GROWTH_TABS,
  CONVERSATION_FLOW,
} from "@/data/wireframe_chap_extras";

/**
 * Screen 19 — Growth hub.
 * Wireframe-anchored (UI-GrowthHub):
 *   tabs → trends → conversation flow → reflection streak → invitation.
 * AD-GR-WF1: tab state is local to surface; no route per tab in Phase 1.
 */
export const Route = createFileRoute("/_main/growth/")({
  head: () => ({
    meta: [
      { title: "Growth — COUPL" },
      {
        name: "description",
        content: "Unfolds at the pace of awareness.",
      },
    ],
  }),
  component: GrowthHubScreen,
});

function GrowthHubScreen() {
  const [tab, setTab] = useState<(typeof GROWTH_TABS)[number]["id"]>(
    "summary"
  );

  return (
    <GrowthBackdrop>
      <StatusBar />

      {/* Header */}
      <header className="px-5 pt-2 pb-4 text-center">
        <h1 className="font-display text-[26px] font-semibold text-ink">
          Growth
        </h1>
        <p className="mt-1.5 font-body text-[12.5px] text-slate">
          unfolds at the pace of awareness
        </p>
      </header>

      {/* Tabs */}
      <div className="px-5">
        <div className="flex flex-wrap items-center gap-2" role="tablist">
          {GROWTH_TABS.map((t) => {
            const on = t.id === tab;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setTab(t.id)}
                className={
                  "rounded-full border px-3.5 py-1.5 font-body text-[12.5px] transition-colors " +
                  (on
                    ? "border-plum-500/70 bg-lavender-100 text-plum-700"
                    : "border-plum-300/30 bg-paper/70 text-stone hover:border-plum-300/55 hover:text-plum-700")
                }
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Trends card */}
      <section className="px-5 pt-5">
        <article className="rounded-[20px] border border-plum-300/25 bg-paper p-5 shadow-elev-1">
          <h2 className="font-display text-[17px] font-semibold text-ink">
            Trends
          </h2>
          <p className="mt-1 font-body text-[12.5px] text-slate">
            A mindful look at your last 30 days
          </p>
          <p className="mt-3 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-plum-700/80">
            Mood + reflection · 30d
          </p>

          {/* Mini line visual */}
          <div
            className="mt-2 h-[88px] w-full rounded-[12px] border border-dashed border-plum-300/40"
            style={{
              background:
                "linear-gradient(180deg, color-mix(in oklab, var(--lavender-50) 75%, var(--paper)) 0%, var(--paper) 100%)",
            }}
            aria-hidden
          >
            <svg
              viewBox="0 0 320 88"
              className="h-full w-full"
              preserveAspectRatio="none"
            >
              <path
                d="M0,55 C40,40 70,68 110,52 C150,36 180,62 220,46 C260,30 290,58 320,40"
                fill="none"
                stroke="var(--plum-500)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M0,68 C40,62 70,75 110,66 C150,58 180,72 220,62 C260,52 290,70 320,58"
                fill="none"
                stroke="var(--plum-300)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="3 4"
                opacity="0.7"
              />
            </svg>
          </div>

          {/* Conversation flow */}
          <p className="mt-5 font-display text-[14px] font-medium text-ink">
            Conversation flow
          </p>
          <div
            className="mt-2 flex h-[58px] items-end gap-1.5"
            aria-label="Conversation flow last 7 days"
          >
            {CONVERSATION_FLOW.map((h, i) => {
              const peak = h === Math.max(...CONVERSATION_FLOW);
              return (
                <span
                  key={i}
                  className="flex-1 rounded-[4px]"
                  style={{
                    height: `${h}%`,
                    background: peak
                      ? "var(--plum-700)"
                      : "color-mix(in oklab, var(--lavender-100) 90%, var(--plum-300) 18%)",
                  }}
                />
              );
            })}
          </div>
        </article>
      </section>

      {/* Reflection streak */}
      <section className="px-5 pt-4">
        <article
          className="rounded-[18px] border border-blush p-4 shadow-elev-1"
          style={{
            background:
              "linear-gradient(160deg, color-mix(in oklab, var(--blush) 60%, var(--paper)) 0%, color-mix(in oklab, var(--blush) 30%, var(--paper)) 100%)",
          }}
        >
          <p className="font-body text-[10.5px] font-semibold uppercase tracking-[0.16em] text-plum-700/80">
            Reflection streak · gentle
          </p>
          <p className="mt-1.5 font-display text-[15px] font-medium leading-snug text-ink">
            Keep showing up. No pressure to perform.
          </p>
        </article>
      </section>

      {/* Invitation card */}
      <section className="px-5 pt-4 pb-12">
        <article className="rounded-[20px] border border-plum-300/25 bg-paper p-5 text-center shadow-elev-1">
          <h3 className="font-display text-[16px] font-semibold text-ink">
            This week's invitation
          </h3>
          <p className="mt-2 font-body text-[13px] italic leading-relaxed text-slate">
            "Notice what makes you reach for your phone after a date."
          </p>
          <button
            type="button"
            className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-plum-700/30 bg-paper px-5 py-2.5 font-display text-[14px] font-medium text-plum-700 transition-colors hover:bg-lavender-50"
          >
            Open journal
          </button>
        </article>
      </section>
    </GrowthBackdrop>
  );
}
