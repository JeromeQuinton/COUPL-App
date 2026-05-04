import { createFileRoute, Link } from "@tanstack/react-router";

/**
 * /community-guidelines — public guidelines.
 *
 * Editorial. Specific not vague. "We believe you" register.
 *
 * Stream-19 SCREEN-34.
 */
export const Route = createFileRoute("/community-guidelines")({
  head: () => ({
    meta: [
      { title: "Community guidelines — COUPL" },
      { name: "description", content: "How we behave with each other on COUPL." },
    ],
  }),
  component: GuidelinesPage,
});

function GuidelinesPage() {
  return (
    <main className="mx-auto max-w-[680px] px-6 pt-16 pb-24 text-ink">
      <p className="text-label-mono">Community guidelines</p>
      <h1 className="mt-3 font-display text-[36px] leading-tight">
        How we are <em className="font-display italic">with each other.</em>
      </h1>
      <p className="mt-6 font-body text-[15px] leading-relaxed text-slate">
        COUPL is a small, careful space. These are the things we ask of
        everyone — and the things we'll act on if they slip.
      </p>

      <Section title="Respect">
        Speak to the person, not the screen. Different views are welcome;
        contempt isn't. If something lands sideways, repair beats
        retreat.
      </Section>

      <Section title="Honesty">
        Real photos, real age, real intent. Misrepresenting yourself —
        deliberately or by sustained omission — is the most common
        reason we close accounts.
      </Section>

      <Section title="Consent">
        Every photo, every meeting, every escalation needs a yes. "Maybe
        later" is not a yes. Pressure isn't persuasion.
      </Section>

      <Section title="Off-platform">
        Sharing contact details is fine when both people are ready. We
        ask people not to push for it early — it's where most red flags
        live.
      </Section>

      <Section title="What we act on">
        Harassment, abuse, threats. Catfishing. Sexual content sent
        without consent. Promoting other services or scams. Patterns of
        unkindness across multiple matches.
      </Section>

      <Section title="How to report">
        From a profile or thread, tap the menu and choose Report. We
        read every one. We don't tell the other person who flagged
        them.
      </Section>

      <p className="mt-12 text-label-mono">Updated 2026-05-04</p>
      <Link to="/" className="mt-6 inline-flex font-body text-[14px] text-plum-700 hover:underline">
        ← Back home
      </Link>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-[20px] font-semibold text-ink">{title}</h2>
      <p className="mt-3 font-body text-[14.5px] leading-relaxed text-slate">{children}</p>
    </section>
  );
}
