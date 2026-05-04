import { createFileRoute, Link } from "@tanstack/react-router";

/**
 * /privacy — public privacy notice.
 *
 * Linked from sign-up legal microcopy. Editorial-but-precise.
 * UK-specific (UK GDPR + DPA 2018). Plain English.
 *
 * Stream-19 SCREEN-15.
 */
export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — COUPL" },
      { name: "description", content: "What we collect, why, and how to remove it." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main className="mx-auto max-w-[680px] px-6 pt-16 pb-24 text-ink">
      <p className="text-label-mono">Privacy</p>
      <h1 className="mt-3 font-display text-[36px] leading-tight">
        How we hold your <em className="font-display italic">information.</em>
      </h1>
      <p className="mt-6 font-body text-[15px] leading-relaxed text-slate">
        We're a UK company. We hold your data under UK GDPR and the Data
        Protection Act 2018. This page is the short version of what we
        collect, why, and how to take it back.
      </p>

      <Section title="What we collect">
        <p>
          The basics you tell us — name, age, photos, the answers you give
          during onboarding. Messages and voice memos you send through the
          app. Verification artefacts (a photo, a document) so we can
          confirm you're a real person. Diagnostic data so we can fix what
          breaks.
        </p>
      </Section>

      <Section title="Why we hold it">
        <p>
          Almost all of it is needed to run the product — match suggestions,
          conversations, safety checks. We don't sell it. We don't share it
          with advertisers. Aggregate, anonymous data may be used to make
          the product better.
        </p>
      </Section>

      <Section title="Who sees it">
        <p>
          You decide what's on your profile. Other COUPL members see what
          you choose to show. We see what we need to in order to keep
          things working and safe. A small set of trusted infrastructure
          partners (Supabase, Cloudflare, Stripe) hold parts of the data
          on our behalf, under contract.
        </p>
      </Section>

      <Section title="Your rights">
        <p>
          You can ask us for a copy of everything we hold on you. You can
          ask us to correct anything that's wrong. You can ask us to
          delete it — within 30 days, except where we're legally obliged
          to keep something (e.g. a safety report).
        </p>
      </Section>

      <Section title="Deletion">
        <p>
          Pause your account from the Profile menu. Delete it permanently
          from Account → Delete account. Pause is reversible for 30 days.
          Delete is final.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          For privacy matters: <strong>privacy@coupl.app</strong>. For
          everything else, the Help section is the first place to look.
          You can also write to us at COUPL Ltd, [registered address].
        </p>
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
      <div className="mt-3 font-body text-[14.5px] leading-relaxed text-slate">{children}</div>
    </section>
  );
}
