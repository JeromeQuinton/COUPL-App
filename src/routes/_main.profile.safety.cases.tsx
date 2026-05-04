import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { SAMPLE_USER_CASES, type CaseStatus } from "@/data/safety_sample";

export const Route = createFileRoute("/_main/profile/safety/cases")({
  head: () => ({ meta: [{ title: "Your reports — COUPL" }] }),
  component: CasesScreen,
});

const STATUS_LABEL: Record<CaseStatus, string> = {
  raised: "Raised",
  reviewing: "Reviewing",
  decided: "Decided",
};

const STATUS_TINT: Record<CaseStatus, string> = {
  raised: "color-mix(in oklab, var(--lavender-100) 80%, var(--paper))",
  reviewing: "color-mix(in oklab, var(--beeswax-100) 70%, var(--paper))",
  decided: "color-mix(in oklab, var(--success) 18%, var(--paper))",
};

function CasesScreen() {
  const cases = SAMPLE_USER_CASES;

  return (
    <YouBackdrop tone="serious">
      <StatusBar
        leading={
          <Link
            to="/profile/safety"
            aria-label="Back"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <p className="text-label-mono">Safety · cases</p>
        <h1 className="mt-2 font-display text-[28px] leading-tight text-ink">
          Your reports.
        </h1>
        <p className="mt-3 font-body text-[13.5px] leading-relaxed text-slate">
          We aim to review reports within a few days. You'll see what stage
          each one is at, and where possible, what happened next.
        </p>
      </header>

      {cases.length === 0 ? (
        <article className="mx-5 rounded-[18px] border border-dashed border-line bg-paper px-5 py-8 text-center">
          <p className="font-display text-[15px] text-ink">
            When you report someone, your reports will appear here.
          </p>
          <p className="mt-2 font-body text-[13px] italic text-stone">
            You can see what stage they're at and, where possible, what happened next.
          </p>
        </article>
      ) : (
        <ul className="px-5 space-y-2.5">
          {cases.map((c) => (
            <li key={c.id}>
              <Link
                to="/profile/safety/cases/$caseId"
                params={{ caseId: c.id }}
                className="flex items-center justify-between gap-3 rounded-[14px] bg-paper px-4 py-4 shadow-elev-1 hover:bg-lavender-50"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-display text-[14.5px] text-ink">
                    {c.pseudonym} · {c.category}
                  </p>
                  <p className="mt-1 font-body text-[12px] text-stone">
                    Raised {c.raisedRelative}
                  </p>
                </div>
                <span
                  className="rounded-full px-3 py-1 text-label-mono text-plum-700"
                  style={{ background: STATUS_TINT[c.status] }}
                >
                  {STATUS_LABEL[c.status]}
                </span>
                <ChevronRight size={16} className="ml-1 shrink-0 text-stone" />
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="px-5 pt-8 pb-12">
        <Link
          to="/profile/safety/moderation"
          className="block w-full rounded-full px-5 py-3 text-center font-body text-[13.5px] text-slate hover:text-plum-500"
        >
          How we review reports
        </Link>
      </div>
    </YouBackdrop>
  );
}
