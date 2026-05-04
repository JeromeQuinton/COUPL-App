import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { CaseTimeline } from "@/components/safety/CaseTimeline";
import { SAMPLE_CASE_DETAILS } from "@/data/safety_sample";

export const Route = createFileRoute("/_main/profile/safety/cases/$caseId_")({
  head: () => ({ meta: [{ title: "Case detail — COUPL" }] }),
  component: CaseDetailScreen,
});

function CaseDetailScreen() {
  const { caseId } = useParams({
    from: "/_main/profile/safety/cases/$caseId_",
  });
  const detail = SAMPLE_CASE_DETAILS[caseId_];

  if (!detail) {
    return (
      <YouBackdrop tone="serious">
        <StatusBar
          leading={
            <Link
              to="/profile/safety/cases"
              aria-label="Back"
              className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
            >
              <ChevronLeft size={18} />
            </Link>
          }
        />
        <div className="px-5 pt-12 text-center">
          <p className="text-label-mono">Not found</p>
          <h1 className="mt-3 font-display text-[22px] text-ink">
            We couldn't find that case.
          </h1>
        </div>
      </YouBackdrop>
    );
  }

  return (
    <YouBackdrop tone="serious">
      <StatusBar
        leading={
          <Link
            to="/profile/safety/cases"
            aria-label="Back"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <p className="text-label-mono">Case · {detail.id}</p>
        <h1 className="mt-2 font-display text-[28px] leading-tight text-ink">
          Where this stands.
        </h1>
      </header>

      <section className="px-5">
        <article className="rounded-[18px] bg-paper p-5 shadow-elev-1">
          <p className="font-body text-[14px] leading-relaxed text-ink">
            This page shows what you reported and what the safety team has
            done so far. Where we can't share detail, we'll say why.
          </p>
        </article>
      </section>

      <section className="px-5 pt-7">
        <p className="text-label-mono">Timeline</p>
        <div className="mt-4">
          <CaseTimeline events={detail.timeline} />
        </div>
      </section>

      <section className="px-5 pt-7">
        <p className="text-label-mono">Privacy</p>
        <p className="mt-2 font-body text-[13.5px] leading-relaxed text-slate">
          The other person will not see this report or this page.
        </p>
      </section>

      <div className="px-5 pt-8 pb-12 space-y-3">
        {detail.status === "reviewing" && (
          <Link
            to="/profile/safety/report/$reportId_/evidence"
            params={{ reportId_: detail.id }}
            className="block w-full rounded-full border border-line bg-paper px-5 py-3 text-center font-display text-[13.5px] text-ink hover:bg-lavender-50"
          >
            Add more evidence
          </Link>
        )}
        {detail.status === "decided" && detail.decision?.kind === "no-action" && (
          <Link
            to="/profile/safety/cases"
            className="block w-full rounded-full px-5 py-3 text-center font-body text-[13.5px] text-slate hover:text-plum-500"
          >
            Close this case
          </Link>
        )}
      </div>
    </YouBackdrop>
  );
}
