import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

/**
 * /polaris/methodology — what Polaris actually reads.
 *
 * Polaris dashboard references "What this means" — this is the guide.
 * Five sections (what Polaris reads, what it doesn't, the four lenses,
 * descriptive not prescriptive, where the data comes from).
 *
 * Stream-19 SCREEN-21.
 */
export const Route = createFileRoute("/_main/polaris/methodology")({
  head: () => ({ meta: [{ title: "Polaris methodology — COUPL" }] }),
  component: MethodologyScreen,
});

function MethodologyScreen() {
  return (
    <div className="relative px-5 pb-16 pt-6">
      <header className="flex items-center gap-3">
        <Link to="/polaris" aria-label="Back" className="-ml-1 rounded-full p-1.5 text-plum-700 hover:bg-lavender-50">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <p className="text-label-mono">Polaris · what this means</p>
      </header>

      <h1 className="mt-3 font-display text-[28px] leading-[1.1] text-ink">
        Polaris reads <em className="font-display italic">attunement.</em>
        <br />
        Not achievement.
      </h1>
      <p className="mt-4 font-body text-[14px] leading-relaxed text-slate">
        There is no score to chase. No streak to keep. Polaris is a quiet,
        editorial reading of how you've been showing up across the last
        thirty days — pace, presence, capacity, repair.
      </p>

      <Section title="What Polaris reads">
        Patterns — how often you reply, how the gap between messages
        widens or narrows, where you returned to a hard moment instead of
        letting it sit, when you held back instead of pushing through.
        Patterns over time. Never single moments.
      </Section>

      <Section title="What Polaris doesn't read">
        The content of your conversations. Whether someone "liked you back".
        Whether anything ended in a date or a relationship. None of these
        are the point. Health comes first; outcomes follow.
      </Section>

      <Section title="The four lenses">
        <strong>Pace</strong> — your tempo, your steadiness.{" "}
        <strong>Presence</strong> — how present you were when you showed
        up. <strong>Capacity</strong> — what you had to give that week.{" "}
        <strong>Repair</strong> — when something jarred, did you come
        back to it.
      </Section>

      <Section title="Why descriptive, not prescriptive">
        We don't tell you what to do next. The reading exists so you can
        notice for yourself. Self-knowledge over self-improvement.
      </Section>

      <Section title="Where the data comes from">
        Your in-app behaviour only — message timestamps, voice memos sent,
        plans accepted, reflections logged. We don't read your
        conversations. We never share Polaris readings with anyone else.
      </Section>

      <p className="mt-12 font-body text-[12.5px] italic text-stone">
        Polaris is a health reading, not a diagnosis. If something here
        prompts a real question, take it to the journal — or to a person
        who knows you.
      </p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="font-display text-[19px] font-semibold text-ink">{title}</h2>
      <p className="mt-2 font-body text-[14px] leading-relaxed text-slate">{children}</p>
    </section>
  );
}
