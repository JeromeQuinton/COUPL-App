import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Heart } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { INCIDENT_CATEGORIES } from "@/data/you_sample";

export const Route = createFileRoute("/_main/profile/safety")({
  head: () => ({ meta: [{ title: "Safety report · COUPL" }] }),
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

  return (
    <YouBackdrop tone="serious">
      <StatusBar
        leading={
          <Link
            to="/profile"
            aria-label="Back to You"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
        trailing={<span className="font-body text-[12.5px] font-medium text-stone">Conversation</span>}
      />

      <header className="px-5 pt-2 pb-5">
        <p className="inline-flex items-center gap-1.5 font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-plum-500">
          <Heart size={11} strokeWidth={2} /> Safety · we believe you
        </p>
        <h1 className="mt-2 font-display text-[26px] font-semibold leading-tight text-ink">
          Tell us what happened.
        </h1>
        <p className="mt-2 font-body text-[13px] leading-relaxed text-slate">
          A real human reads every report within 4 hours. Marco won't be told
          you reported, ever.
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
          In your own words <span className="text-stone normal-case tracking-normal">(optional)</span>
        </h2>
        <textarea
          value={words}
          onChange={(e) => setWords(e.target.value)}
          rows={4}
          placeholder={`"He kept asking why I hadn't sent a photo even after I said I wasn't comfortable. Three times."`}
          className="mt-3 w-full resize-none rounded-[14px] border border-line bg-paper px-4 py-3 font-body text-[13.5px] italic leading-relaxed text-ink placeholder:not-italic placeholder:text-stone focus:border-plum-700 focus:outline-none"
        />
      </section>

      {/* Auto-protection */}
      <section className="px-5 pt-6 pb-32">
        <p className="font-body text-[12.5px] leading-relaxed text-slate">
          We'll automatically: block him from seeing you, freeze his ability to
          message anyone new, and brief a Trust reviewer with this report.
        </p>
      </section>

      {/* Sticky CTA */}
      <div className="sticky bottom-0 left-0 right-0 border-t border-line/70 bg-paper/85 px-5 pt-3 pb-6 backdrop-blur-md">
        <button
          type="button"
          className="w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 transition-colors hover:opacity-90"
        >
          Send to Trust team
        </button>
        <p className="mt-2 text-center font-body text-[11.5px] text-stone">
          You'll hear back within 4 hours, even at night.
        </p>
      </div>
    </YouBackdrop>
  );
}