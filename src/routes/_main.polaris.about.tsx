import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

/**
 * /polaris/about — explainer for the Polaris reading.
 *
 * Closes the dead-end where the dashboard's 'What this means' link
 * looped back to /polaris. Editorial framing: attunement, not
 * achievement; descriptive, not prescriptive.
 */
export const Route = createFileRoute("/_main/polaris/about")({
  head: () => ({
    meta: [
      { title: "About Polaris — COUPL" },
      {
        name: "description",
        content: "What Polaris reads, what it doesn't, and why.",
      },
    ],
  }),
  component: PolarisAbout,
});

function PolarisAbout() {
  return (
    <div
      className="min-h-[100dvh] bg-paper px-5"
      style={{
        paddingTop: "calc(env(safe-area-inset-top) + 1.25rem)",
        paddingBottom: "calc(env(safe-area-inset-bottom) + 1.5rem)",
      }}
    >
      <div className="mx-auto max-w-md">
        <header className="flex items-center gap-2">
          <Link
            to="/polaris"
            aria-label="Back to Polaris"
            className="-ml-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-plum-700 hover:bg-lavender-50"
          >
            <ChevronLeft size={18} />
          </Link>
          <p className="text-label-mono text-plum-700">About Polaris</p>
        </header>

        <h1 className="mt-6 font-display text-[28px] leading-[1.1] text-ink">
          What Polaris reads.
        </h1>
        <p className="mt-3 font-body text-[14.5px] leading-relaxed text-slate">
          Polaris is the reflective layer of COUPL. It pays attention to how
          you connect — pace, presence, repair — and offers descriptions, not
          targets.
        </p>

        <Section
          eyebrow="Attunement, not achievement"
          body="Polaris doesn't grade you. There's no score to chase, no streak to break. The lenses describe how you've been showing up, not whether you're doing it 'right'."
        />

        <Section
          eyebrow="What it reads"
          body="Pace of replies, the rhythm of your conversations, repair after misreads, capacity over recent weeks. All from your own activity. No data leaves your account."
        />

        <Section
          eyebrow="What it doesn't read"
          body="Tone-of-voice, sentiment, who 'should' message first. Polaris isn't a coach with opinions — it's a quiet reading of patterns. You decide what to do with it."
        />

        <Section
          eyebrow="What 'high', 'steady', 'low' mean"
          body="Comparative, not evaluative. 'High' on Pace this week means quicker than your usual rhythm — not better. 'Low' on Lifestyle means less alignment surfaced lately, not a failing. Read it the way you'd read the weather: noticing, not judgement."
        />

        <Section
          eyebrow="Why it changes"
          body="Polaris re-reads each week. Patterns shift; that's the point. If you're suddenly busier, the readings will say so — and that's fine. Capacity ebbs."
        />

        <Section
          eyebrow="If something feels off"
          body="Polaris is one description, not the description. If a reading doesn't match your sense of what's happening, trust your sense. The map isn't the territory."
        />

        <p className="mt-10 font-body text-[12.5px] italic leading-relaxed text-stone">
          Polaris is the only AI persona inside COUPL. There is no separate
          coach or signal — what you see in the dashboard is the whole of it.
        </p>

        <div className="mt-6 mb-12">
          <Link
            to="/polaris"
            className="inline-flex items-center justify-center rounded-full bg-plum-500 px-5 py-2.5 font-body text-[14px] font-medium text-paper hover:bg-plum-700"
          >
            Back to your reading
          </Link>
        </div>
      </div>
    </div>
  );
}

function Section({ eyebrow, body }: { eyebrow: string; body: string }) {
  return (
    <section className="mt-7">
      <p className="text-label-mono text-plum-700">{eyebrow}</p>
      <p className="mt-2 font-body text-[14.5px] leading-relaxed text-ink">
        {body}
      </p>
    </section>
  );
}
