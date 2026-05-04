import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Phone, Mail } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";

/**
 * /profile/safety/help — crisis + support resources.
 *
 * UK-first hardcoded resources. Plain factual signposting; no
 * "we care about your safety" filler. Trust surface — never gated.
 *
 * Stream 26 SCREEN-R2-23.
 */
export const Route = createFileRoute("/_main/profile/safety/help")({
  head: () => ({ meta: [{ title: "Get help — COUPL" }] }),
  component: SafetyHelpScreen,
});

const RESOURCES = [
  {
    title: "National Domestic Abuse helpline",
    sub: "Refuge · 24/7",
    detail: "0808 2000 247",
    href: "tel:08082000247",
  },
  {
    title: "Suzy Lamplugh Trust — National Stalking helpline",
    sub: "Mon–Fri · 09:30–16:00",
    detail: "0808 802 0300",
    href: "tel:08088020300",
  },
  {
    title: "Switchboard LGBT+ helpline",
    sub: "Daily · 10:00–22:00",
    detail: "0800 0119 100",
    href: "tel:08000119100",
  },
];

function SafetyHelpScreen() {
  return (
    <YouBackdrop tone="serious">
      <StatusBar
        leading={
          <Link
            to="/profile/safety"
            aria-label="Back to Safety"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-4">
        <p className="text-label-mono">Safety · help</p>
        <h1 className="mt-2 font-display text-[28px] leading-tight text-ink">
          Get help.
        </h1>
      </header>

      <section className="px-5">
        <article
          className="rounded-[18px] border border-pink-100 p-5 shadow-elev-1"
          style={{
            background:
              "linear-gradient(160deg, color-mix(in oklab, var(--pink-100) 65%, var(--paper)) 0%, color-mix(in oklab, var(--pink-100) 28%, var(--paper)) 100%)",
          }}
        >
          <p className="text-label-mono">In a crisis</p>
          <p className="mt-2 font-body text-[14.5px] leading-relaxed text-ink">
            Samaritans (UK): <a href="tel:116123" className="font-medium underline">116 123</a>, free, 24/7.
            If you or someone else is in immediate danger, call <a href="tel:999" className="font-medium underline">999</a>.
          </p>
        </article>
      </section>

      <section className="px-5 pt-5">
        <p className="text-label-mono mb-2">Specialist UK lines</p>
        <ul className="flex flex-col gap-2">
          {RESOURCES.map((r) => (
            <li key={r.title}>
              <a
                href={r.href}
                className="block rounded-[14px] bg-paper p-4 shadow-elev-1 transition-colors hover:bg-lavender-50"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-[14.5px] font-medium text-ink">
                      {r.title}
                    </p>
                    <p className="mt-0.5 font-body text-[12px] text-stone">
                      {r.sub}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 font-body text-[13px] text-plum-700">
                    <Phone size={14} aria-hidden />
                    {r.detail}
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="px-5 pt-5 pb-12">
        <p className="text-label-mono mb-2">In-app</p>
        <a
          href="mailto:support@coupl.app"
          className="flex items-center justify-between gap-3 rounded-[14px] bg-paper p-4 shadow-elev-1 transition-colors hover:bg-lavender-50"
        >
          <div className="min-w-0">
            <p className="font-display text-[14.5px] font-medium text-ink">
              Talk to COUPL support
            </p>
            <p className="mt-0.5 font-body text-[12px] text-stone">
              We read every message, usually within a working day.
            </p>
          </div>
          <Mail size={16} className="text-plum-700" aria-hidden />
        </a>
      </section>
    </YouBackdrop>
  );
}
