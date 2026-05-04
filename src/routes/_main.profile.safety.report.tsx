import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Heart, ShieldCheck } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { INCIDENT_CATEGORIES } from "@/data/you_sample";

/**
 * /profile/safety/report — Safety reporting flow.
 *
 * Sub-route of the Safety + Wellbeing hub. Multi-select incident
 * categories, optional written context, and a high-gravity Plum-700
 * "Send report" CTA. Auto-protection note states that the
 * reported person is never told a report was filed.
 */
export const Route = createFileRoute("/_main/profile/safety/report")({
  head: () => ({ meta: [{ title: "Safety report — COUPL" }] }),
  component: SafetyReportPage,
});

function SafetyReportPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set(["pressured"]));
  const [words, setWords] = useState("");

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const canSend = selected.size > 0;

  return (
    <YouBackdrop tone="serious">
      <StatusBar
        leading={
          <Link
            to="/profile/safety"
            aria-label="Back to Safety + Wellbeing"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
        trailing={<span className="font-body text-[12.5px] font-medium text-stone">Report</span>}
      />

      {/* Header */}
      <header className="px-5 pt-2 pb-5">
        <p className="inline-flex items-center gap-1.5 font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-plum-500">
          <Heart size={11} strokeWidth={2} /> Safety · we believe you
        </p>
        <h1 className="mt-2 font-display text-[26px] font-semibold leading-tight text-ink">
          Tell us what happened.
        </h1>
        <p className="mt-2 font-body text-[13px] leading-relaxed text-slate">
          We assess every report — usually within minutes. The other person is
          never told you reported.
        </p>
      </header>

      {/* What happened */}
      <section className="px-5">
        <h2 className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
          What happened
        </h2>
        <ul className="mt-3 flex flex-col gap-2">
          {INCIDENT_CATEGORIES.map((c) => {
            const on = selected.has(c.id);
            return (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => toggle(c.id)}
                  className={`flex w-full items-center justify-between gap-3 rounded-[14px] border px-4 py-3.5 text-left transition-colors ${
                    on
                      ? "border-plum-700 bg-plum-700/[0.06]"
                      : "border-line bg-paper hover:bg-lavender-50"
                  } ${c.emphasis && on ? "ring-1 ring-plum-700/40" : ""}`}
                >
                  <span
                    className={`font-display text-[14.5px] font-medium ${
                      on ? "text-plum-700" : "text-ink"
                    }`}
                  >
                    {c.label}
                  </span>
                  <span
                    aria-hidden
                    className={`flex h-5 w-5 items-center justify-center rounded-[5px] border ${
                      on ? "border-plum-700 bg-plum-700" : "border-stone/60 bg-paper"
                    }`}
                  >
                    {on && (
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 6L5 8.5L9.5 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Free text */}
      <section className="px-5 pt-7">
        <h2 className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
          In your own words{" "}
          <span className="text-stone normal-case tracking-normal">
            (optional)
          </span>
        </h2>
        <textarea
          value={words}
          onChange={(e) => setWords(e.target.value)}
          rows={5}
          placeholder="Anything you want us to know."
          className="mt-3 w-full resize-none rounded-[14px] border border-line bg-paper p-4 font-body text-[13.5px] leading-relaxed text-ink shadow-elev-1 placeholder:text-stone focus:border-plum-500 focus:outline-none"
        />
      </section>

      {/* Optional evidence — leads to R3-01 evidence surface */}
      <section className="px-5 pt-5">
        <Link
          to="/profile/safety/report/$reportId_/evidence"
          params={{ reportId_: "draft" }}
          className="block rounded-[14px] border border-dashed border-line bg-paper px-4 py-3.5 hover:bg-lavender-50"
        >
          <p className="font-display text-[14px] text-ink">Attach evidence (optional)</p>
          <p className="mt-1 font-body text-[12.5px] text-stone">
            Screenshots, message excerpts, or a voice note. Skip if it feels like too much.
          </p>
        </Link>
      </section>

      {/* Auto-protection */}
      <section className="px-5 pt-5">
        <div className="flex items-start gap-3 rounded-[14px] border border-line bg-paper/70 p-4">
          <ShieldCheck size={16} className="mt-0.5 text-plum-500" strokeWidth={1.75} />
          <p className="font-body text-[12.5px] leading-relaxed text-slate">
            While we review, the other person can't reach you. Your existing
            conversation is preserved and visible only to you.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pt-5 pb-12">
        <button
          type="button"
          disabled={!canSend}
          className="w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[14.5px] font-medium text-paper shadow-elev-1 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Send report
        </button>
        <p className="mt-3 text-center font-body text-[11.5px] text-stone">
          We assess reports continuously. We follow up if we need more.
        </p>
      </section>
    </YouBackdrop>
  );
}
