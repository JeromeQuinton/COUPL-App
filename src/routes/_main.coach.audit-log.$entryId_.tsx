import { useState } from "react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ChevronLeft, X } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { SAMPLE_AUDIT_LOG, type AuditSurface } from "@/data/coach_sample";

export const Route = createFileRoute("/_main/coach/audit-log/$entryId_")({
  head: () => ({ meta: [{ title: "Why Polaris said that — COUPL" }] }),
  component: AuditEntryScreen,
});

const SURFACE_LABEL: Record<AuditSurface, string> = {
  discover: "Discover",
  chat: "Chat",
  coach: "Coach",
  "date-plans": "Date plans",
};

function AuditEntryScreen() {
  const { entryId_ } = useParams({
    from: "/_main/coach/audit-log/$entryId_",
  });
  const entry = SAMPLE_AUDIT_LOG.find((e) => e.id === entryId_);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [sent, setSent] = useState(false);

  if (!entry) {
    return (
      <YouBackdrop>
        <StatusBar
          leading={
            <Link
              to="/coach/audit-log"
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
            That entry isn't in the log.
          </h1>
        </div>
      </YouBackdrop>
    );
  }

  return (
    <YouBackdrop>
      <StatusBar
        leading={
          <Link
            to="/coach/audit-log"
            aria-label="Back"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <p className="text-label-mono">Polaris · why</p>
        <h1 className="mt-2 font-display text-[28px] leading-tight text-ink">
          {entry.signalLabel}.
        </h1>
      </header>

      <section className="px-5">
        <article className="rounded-[14px] bg-paper px-4 py-4 shadow-elev-1">
          <p className="text-label-mono">When + where</p>
          <p className="mt-2 font-body text-[14px] leading-relaxed text-ink">
            {SURFACE_LABEL[entry.surface]} · {entry.whenRelative}
            {entry.connectionInitial && (
              <span className="text-stone"> · with {entry.connectionInitial}.</span>
            )}
          </p>
        </article>
      </section>

      <section className="px-5 pt-5">
        <p className="text-label-mono">What Polaris was looking at</p>
        <ul className="mt-3 space-y-2 font-body text-[13.5px] leading-relaxed text-ink">
          {entry.inputs.map((input, i) => (
            <li key={i} className="flex items-start gap-2">
              <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-plum-500" />
              {input}
            </li>
          ))}
        </ul>
      </section>

      <section className="px-5 pt-5">
        <p className="text-label-mono">Why Polaris raised this</p>
        <article className="mt-3 rounded-[18px] bg-paper p-5 shadow-elev-1">
          <p className="font-body text-[14px] leading-relaxed text-ink">
            {entry.reasoning}
          </p>
        </article>
      </section>

      <div className="px-5 pt-7 pb-12">
        <button
          type="button"
          onClick={() => setFeedbackOpen(true)}
          className="block w-full rounded-full px-5 py-3 text-center font-body text-[13.5px] text-slate hover:text-plum-500"
        >
          I disagree with this signal
        </button>
      </div>

      {feedbackOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40"
          onClick={() => setFeedbackOpen(false)}
          role="presentation"
        >
          <div
            className="w-full max-w-md rounded-t-3xl bg-paper px-6 pb-8 pt-4"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="audit-feedback-title"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-label-mono text-stone">FEEDBACK</span>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setFeedbackOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-full text-slate hover:bg-lavender-100"
              >
                <X size={16} />
              </button>
            </div>
            {sent ? (
              <>
                <h2
                  id="audit-feedback-title"
                  className="font-display text-[20px] leading-tight text-ink"
                >
                  Thanks — we've recorded it.
                </h2>
                <p className="mt-3 font-body text-[13.5px] text-slate">
                  Polaris will use it when reviewing similar signals.
                </p>
              </>
            ) : (
              <>
                <h2
                  id="audit-feedback-title"
                  className="font-display text-[20px] leading-tight text-ink"
                >
                  What did Polaris miss?
                </h2>
                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  rows={4}
                  placeholder="Anything you want us to know."
                  className="mt-3 w-full resize-none rounded-[14px] border border-line bg-paper p-3 font-body text-[13.5px] leading-relaxed text-ink shadow-elev-1 placeholder:text-stone focus:border-plum-500 focus:outline-none"
                />
                <button
                  type="button"
                  disabled={!feedbackText.trim()}
                  onClick={() => setSent(true)}
                  className="mt-4 w-full rounded-full bg-plum-700 px-5 py-3 font-display text-[14px] font-medium text-paper shadow-elev-1 hover:opacity-90 disabled:opacity-40"
                >
                  Send
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </YouBackdrop>
  );
}
