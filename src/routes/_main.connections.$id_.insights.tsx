import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { PageBackdrop } from "@/components/connections/PageBackdrop";
import { getConnection } from "@/data/connections_sample";

/**
 * /connections/$id/insights — Conversation Insights (UI-0063).
 *
 * Three editorial cards: Pace · Tone · Repair noticing. Polaris voice,
 * no scores, no metrics. Member-only — free users see a paywall card.
 *
 * Phase 1 inlines the fixture (kept here to keep this PR atomic). A
 * later move will lift the data to src/data/conversation_insights_sample.ts
 * and source it via getConversationInsights(threadId).
 *
 * Voice: no "performance", no "metrics". Plain noticing.
 *
 * DR refs: DR-CONV-INSIGHTS (Stream 1 chat depth).
 */
export const Route = createFileRoute("/_main/connections/$id_/insights")({
  head: () => ({
    meta: [
      { title: "How this conversation is moving — COUPL" },
      {
        name: "description",
        content:
          "Pace, tone, and repair — three quiet reads. No scores. No metrics.",
      },
    ],
  }),
  component: InsightsScreen,
});

type DayBar = { label: string; intensity: number }; // intensity 0..1

type Insights = {
  paceLine: string;
  paceWeek: DayBar[];
  toneLine: string;
  repairLine?: string;
};

/** Phase-1 inline fixture. Phase 4 sources from getConversationInsights(). */
const INSIGHTS: Insights = {
  paceLine: "You've been replying within a day on average.",
  paceWeek: [
    { label: "M", intensity: 0.4 },
    { label: "T", intensity: 0.7 },
    { label: "W", intensity: 0.3 },
    { label: "T", intensity: 0.55 },
    { label: "F", intensity: 0.85 },
    { label: "S", intensity: 0.2 },
    { label: "S", intensity: 0.6 },
  ],
  toneLine:
    "There's curiosity on both sides. Questions land and get answered. The texture is unhurried.",
  repairLine:
    "After Friday's mismatch about the weekend, both of you came back gently. That's repair, named.",
};

/** Phase-1 gate stub. Phase 4 reads from auth.user.tier. */
const IS_MEMBER = true;

function InsightsScreen() {
  const { id } = useParams({ from: "/_main/connections/$id_/insights" });
  const navigate = useNavigate();
  const c = getConnection(id);
  const name = c?.name ?? "them";

  return (
    <PageBackdrop>
      <div
        className="mx-auto flex w-full max-w-[480px] flex-col px-6"
        style={{
          minHeight: "100dvh",
          paddingTop: "calc(env(safe-area-inset-top) + 0.75rem)",
          paddingBottom: "calc(env(safe-area-inset-bottom) + 2rem)",
        }}
      >
        <header className="flex items-center gap-2 py-2">
          <Link
            to="/connections/$id"
            params={{ id }}
            aria-label="Back to thread"
            className="-ml-1 rounded-full p-1.5 text-plum-700 hover:bg-lavender-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <p className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-plum-500">
            Conversation · insights
          </p>
        </header>

        <div className="mt-6">
          <h1 className="font-display text-[28px] leading-[1.15] text-ink">
            How this conversation is moving.
          </h1>
          <p className="mt-2 font-body text-[14.5px] leading-relaxed text-slate">
            With {name}. Three quiet reads — no scores.
          </p>
        </div>

        {IS_MEMBER ? (
          <div className="mt-8 space-y-4">
            <section className="rounded-[18px] border border-line bg-paper p-5">
              <p className="text-mono-sm uppercase tracking-[0.14em] text-slate">
                Pace · last 7 days
              </p>
              <div
                className="mt-4 flex h-16 items-end gap-2"
                aria-label="Message cadence over the last seven days"
                role="img"
              >
                {INSIGHTS.paceWeek.map((d, i) => (
                  <div
                    key={`${d.label}-${i}`}
                    className="flex flex-1 flex-col items-center gap-2"
                  >
                    <div
                      className="w-full rounded-t-md bg-plum-500/70"
                      style={{
                        height: `${Math.max(8, Math.round(d.intensity * 56))}px`,
                      }}
                    />
                    <span className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-stone">
                      {d.label}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 font-body text-[14px] leading-relaxed text-ink">
                {INSIGHTS.paceLine}
              </p>
            </section>

            <section className="rounded-[18px] border border-line bg-paper p-5">
              <p className="text-mono-sm uppercase tracking-[0.14em] text-slate">
                Tone
              </p>
              <p className="mt-3 font-display text-[15px] italic leading-relaxed text-plum-700">
                {INSIGHTS.toneLine}
              </p>
            </section>

            {INSIGHTS.repairLine ? (
              <section className="rounded-[18px] border border-plum-300/40 bg-lavender-50/60 p-5">
                <p className="text-mono-sm uppercase tracking-[0.14em] text-slate">
                  Repair noticed
                </p>
                <p className="mt-3 font-body text-[14.5px] leading-relaxed text-ink">
                  {INSIGHTS.repairLine}
                </p>
              </section>
            ) : null}
          </div>
        ) : (
          <section className="mt-8 rounded-[18px] border border-plum-300/40 bg-paper p-5">
            <p className="text-mono-sm uppercase tracking-[0.14em] text-slate">
              Member-only
            </p>
            <h2 className="mt-3 font-display text-[18px] leading-snug text-ink">
              Conversation insights are part of membership.
            </h2>
            <p className="mt-2 font-body text-[14px] leading-relaxed text-slate">
              Plain reads on pace, tone, and repair — no scores, no metrics.
            </p>
            <button
              type="button"
              onClick={() => navigate({ to: "/profile" })}
              className="mt-4 inline-flex h-10 items-center rounded-full bg-plum-700 px-4 font-body text-[13.5px] text-paper hover:opacity-90"
            >
              See membership
            </button>
          </section>
        )}

        <div className="mt-auto pt-10">
          <Link
            to="/connections/$id"
            params={{ id }}
            className="block w-full rounded-full px-5 py-3 text-center font-body text-[13.5px] text-slate hover:text-plum-500"
          >
            Back to thread
          </Link>
        </div>
      </div>
    </PageBackdrop>
  );
}
