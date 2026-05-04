import { createFileRoute, Link, useParams, notFound } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

/**
 * /polaris/$lensId — per-lens 30-day deep-dive.
 *
 * Pace, presence, capacity, repair (matches the Polaris dashboard
 * lenses). 30-day chart + two paragraphs of editorial reading +
 * three "what you might notice" prompts.
 *
 * Stream-19 SCREEN-22.
 */
export const Route = createFileRoute("/_main/polaris/$lensId")({
  head: ({ params }) => ({ meta: [{ title: `Polaris · ${params.lensId} — COUPL` }] }),
  component: LensScreen,
});

type LensId = "pace" | "presence" | "capacity" | "repair";

const LENSES: Record<LensId, { label: string; line: string; reading: string[]; prompts: string[] }> = {
  pace: {
    label: "Pace",
    line: "Faster than typical for you. Mostly on weekday evenings.",
    reading: [
      "Your tempo this month sits a touch above your usual. Replies came faster, the gaps narrowed. Tuesdays and Thursdays carried the most.",
      "That's neither good nor bad in itself. It's worth knowing — pace tends to mirror what's holding your attention. Notice whether the speed felt eager, or anxious.",
    ],
    prompts: [
      "When did pace feel right this month?",
      "When did it feel like overshoot?",
      "What's holding the urgency, if there is one?",
    ],
  },
  presence: {
    label: "Presence",
    line: "Steady. You replied with body and breath in the message.",
    reading: [
      "Presence reads as steady. Your messages have weight — sentences that wait, not sentences that fill space.",
      "There were two pockets of distance — both around late nights. Worth noticing whether tiredness or capacity was the cause.",
    ],
    prompts: [
      "Where did presence land easily?",
      "Where did it slip?",
      "What was nearby when it slipped?",
    ],
  },
  capacity: {
    label: "Capacity",
    line: "More than usual. Some bandwidth left at the end of most weeks.",
    reading: [
      "You had more to give this month than you typically do. Reading suggests a slightly emptier life schedule supporting it.",
      "Capacity changes. Don't feel obliged to keep this level — Polaris tracks what's there, not what should be.",
    ],
    prompts: [
      "What's freed up the bandwidth?",
      "What might shrink it next month?",
      "Is the extra capacity going somewhere worth it?",
    ],
  },
  repair: {
    label: "Repair",
    line: "Often. When something jarred you came back to it more than you let it sit.",
    reading: [
      "Repair is one of the lenses that matters most for long-form connection. Yours has been active — three times this month you returned to a moment that wobbled.",
      "Repair isn't about apologising. It's about not letting something become silent. You've been doing that.",
    ],
    prompts: [
      "Which repair felt easiest?",
      "Which one is still unfinished?",
      "Is anyone sitting in repair you've not reached for?",
    ],
  },
};

function LensScreen() {
  const { lensId } = useParams({ from: "/_main/polaris/$lensId" });
  const lens = LENSES[lensId as LensId];
  if (!lens) throw notFound();

  return (
    <div className="relative px-5 pb-16 pt-6">
      <header className="flex items-center gap-3">
        <Link to="/polaris" aria-label="Back" className="-ml-1 rounded-full p-1.5 text-plum-700 hover:bg-lavender-50">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <p className="text-label-mono">Polaris · {lens.label.toLowerCase()}</p>
      </header>

      <h1 className="mt-3 font-display text-[28px] leading-[1.1] text-ink">
        {lens.label}.<br />
        <em className="font-display italic">{lens.line}</em>
      </h1>

      {/* Spark chart placeholder */}
      <section className="mt-8 rounded-[18px] bg-paper p-5 shadow-elev-1">
        <p className="text-label-mono">Last 30 days</p>
        <div className="mt-3 grid h-[80px] grid-cols-30 items-end gap-[2px]">
          {Array.from({ length: 30 }).map((_, i) => (
            <span
              key={i}
              className="block w-full rounded-sm bg-plum-500/60"
              style={{ height: `${30 + ((i * 7) % 60)}%` }}
            />
          ))}
        </div>
      </section>

      <section className="mt-6 space-y-4">
        {lens.reading.map((p, i) => (
          <p key={i} className="font-body text-[14px] leading-relaxed text-ink">{p}</p>
        ))}
      </section>

      <section className="mt-8 rounded-[18px] border border-plum-300/30 px-5 py-5">
        <p className="text-label-mono">What you might notice</p>
        <ul className="mt-3 space-y-2.5">
          {lens.prompts.map((q, i) => (
            <li key={i} className="font-display italic text-[15px] leading-snug text-ink">
              — {q}
            </li>
          ))}
        </ul>
      </section>

      <Link
        to="/polaris/methodology"
        className="mt-8 inline-flex font-body text-[13px] text-plum-700 hover:underline"
      >
        How Polaris reads this →
      </Link>
    </div>
  );
}
