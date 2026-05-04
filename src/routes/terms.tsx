import { createFileRoute, Link } from "@tanstack/react-router";

/**
 * /terms — public terms of service.
 *
 * UK-specific. Plain English. Editorial typography.
 *
 * Stream-19 SCREEN-27.
 */
export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms — COUPL" },
      { name: "description", content: "The agreement between you and COUPL." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <main className="mx-auto max-w-[680px] px-6 pt-16 pb-24 text-ink">
      <p className="text-label-mono">Terms</p>
      <h1 className="mt-3 font-display text-[36px] leading-tight">
        The plain version of the <em className="font-display italic">deal.</em>
      </h1>
      <p className="mt-6 font-body text-[15px] leading-relaxed text-slate">
        These terms apply when you use COUPL. We've kept them short and as
        plain as we could. They sit alongside our Privacy notice.
      </p>

      <Section title="Who we are">
        COUPL Ltd is a private company registered in England and Wales,
        company number [TBC]. Our address is [TBC]. You can reach us at
        hello@coupl.app.
      </Section>

      <Section title="What the service does">
        COUPL helps adults meet other adults thoughtfully. We surface
        profiles, host conversations, run optional events and workshops,
        and offer a coach product. We are a software platform — we are
        not your therapist, your matchmaker, or your parent.
      </Section>

      <Section title="Your account">
        You must be 18 or over to use COUPL. The account is yours alone —
        you may not let anyone else use it. You're responsible for the
        accuracy of what you put in your profile. We may pause an account
        that breaks these terms or our community guidelines.
      </Section>

      <Section title="Payments">
        Membership renews monthly until cancelled. You can cancel any
        time from your subscription settings — the cancellation takes
        effect at the end of the current billing period. We don't issue
        partial refunds for unused days.
      </Section>

      <Section title="Conduct">
        Be honest. Don't harass anyone. Don't impersonate someone else.
        Don't try to scam, scrape, or exploit the platform or other
        people. The full set sits in the community guidelines.
      </Section>

      <Section title="Content">
        The things you put into the app — photos, messages, voice memos,
        journal entries — remain yours. By posting them you give us a
        non-exclusive licence to host and display them so the service
        works. We don't sell your content.
      </Section>

      <Section title="Termination">
        You can leave any time (Account → Delete account). We can close
        accounts that breach these terms or community guidelines. Where
        possible we'll explain why before doing so.
      </Section>

      <Section title="Liability">
        We do our best to keep the service running and safe, but we
        can't promise perfect uptime or perfect outcomes. We are not
        liable for indirect or consequential losses. Nothing here limits
        liabilities the law won't let us limit.
      </Section>

      <Section title="Governing law">
        These terms are governed by the laws of England and Wales. The
        courts of England and Wales have exclusive jurisdiction.
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
