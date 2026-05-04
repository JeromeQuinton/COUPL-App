import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { ScreenHeader } from "@/components/shell/ScreenHeader";
import { SAMPLE_AUDIT_LOG, type AuditSurface } from "@/data/coach_sample";

export const Route = createFileRoute("/_main/polaris/audit-log")({
  head: () => ({ meta: [{ title: "Audit log — COUPL" }] }),
  component: AuditLogScreen,
});

const isMember = true;

const FILTERS: { id: "all" | AuditSurface; label: string }[] = [
  { id: "all", label: "All" },
  { id: "discover", label: "Discover" },
  { id: "chat", label: "Chat" },
  { id: "coach", label: "Coach" },
  { id: "date-plans", label: "Date plans" },
];

const SURFACE_LABEL: Record<AuditSurface, string> = {
  discover: "Discover",
  chat: "Chat",
  coach: "Coach",
  "date-plans": "Date plans",
};

function AuditLogScreen() {
  const [filter, setFilter] = useState<"all" | AuditSurface>("all");

  const entries = useMemo(
    () =>
      filter === "all"
        ? SAMPLE_AUDIT_LOG
        : SAMPLE_AUDIT_LOG.filter((e) => e.surface === filter),
    [filter],
  );

  return (
    <YouBackdrop>
      <StatusBar
        leading={
          <Link
            to="/polaris/chat"
            aria-label="Back"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <ScreenHeader
          eyebrow="Polaris · audit log"
          title="Why Polaris said what it said."
        />
        <p className="mt-3 font-body text-[13.5px] leading-relaxed text-slate">
          Every signal Polaris raised, with the reason. Read backwards in time.
        </p>
      </header>

      {!isMember ? (
        <section className="px-5">
          <article className="rounded-[18px] border border-line bg-paper p-6 text-center shadow-elev-1">
            <p className="text-label-mono text-stone">Member</p>
            <p className="mt-3 font-display text-[16px] italic leading-relaxed text-ink">
              See the receipts on every signal Polaris raises — what was being
              looked at, why it was raised, and the option to disagree.
            </p>
            <Link
              to="/membership/plans"
              className="mt-6 inline-flex rounded-full bg-plum-700 px-5 py-2.5 font-display text-[13.5px] font-medium text-paper hover:opacity-90"
            >
              See member plans
            </Link>
          </article>
        </section>
      ) : (
        <>
          <div className="px-5">
            <ul className="flex gap-1.5 overflow-x-auto pb-1">
              {FILTERS.map((f) => {
                const active = filter === f.id;
                return (
                  <li key={f.id}>
                    <button
                      type="button"
                      onClick={() => setFilter(f.id)}
                      className={
                        active
                          ? "rounded-full bg-plum-700 px-3 py-1 text-label-mono text-paper"
                          : "rounded-full border border-line bg-paper px-3 py-1 text-label-mono text-slate hover:bg-lavender-50"
                      }
                    >
                      {f.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <ul className="px-5 pt-4 space-y-2.5 pb-12">
            {entries.map((e) => (
              <li key={e.id}>
                <Link
                  to="/polaris/audit-log/$entryId"
                  params={{ entryId: e.id }}
                  className="flex items-center justify-between gap-3 rounded-[14px] bg-paper px-4 py-3.5 shadow-elev-1 hover:bg-lavender-50"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-[14px] text-ink">{e.signalLabel}</p>
                    <p className="mt-0.5 font-body text-[12px] text-stone">
                      {SURFACE_LABEL[e.surface]} · {e.whenRelative}
                      {e.connectionInitial && ` · with ${e.connectionInitial}.`}
                    </p>
                  </div>
                  <ChevronRight size={16} className="shrink-0 text-stone" />
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </YouBackdrop>
  );
}
