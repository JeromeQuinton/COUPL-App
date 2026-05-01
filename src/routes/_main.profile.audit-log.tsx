import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import {
  AUDIT_ENTRIES,
  type AuditFilter,
} from "@/data/wireframe_chap_extras";

/**
 * Screen 22 — Decision audit log.
 * Wireframe-anchored (UI-DecisionAudit):
 *   back → header → filter chips → audit cards.
 * AD-YOU-WF2: distinct route from /profile/audit (visibility audit).
 *   Decision audit logs every AI surface; visibility audit logs viewers.
 */
export const Route = createFileRoute("/_main/profile/audit-log")({
  head: () => ({ meta: [{ title: "Decision audit log — COUPL" }] }),
  component: AuditLogScreen,
});

const FILTERS: { id: AuditFilter; label: string }[] = [
  { id: "all", label: "all" },
  { id: "nudges", label: "nudges" },
  { id: "filters", label: "filters" },
  { id: "safety", label: "safety" },
];

function AuditLogScreen() {
  const [filter, setFilter] = useState<AuditFilter>("all");
  const visible =
    filter === "all"
      ? AUDIT_ENTRIES
      : AUDIT_ENTRIES.filter((e) => e.category === filter);

  return (
    <YouBackdrop tone="serious">
      <StatusBar
        leading={
          <Link
            to="/profile"
            aria-label="Back to Profile"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />

      {/* Header */}
      <header className="px-5 pt-1 pb-4 text-center">
        <h1 className="font-display text-[24px] font-semibold text-ink">
          Decision audit log
        </h1>
        <p className="mt-1.5 font-body text-[12.5px] text-slate">
          Every AI surface. Yours to inspect.
        </p>
        <p className="mt-1 inline-flex items-center gap-1.5 font-body text-[10.5px] font-semibold uppercase tracking-[0.16em] text-plum-700/80">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-plum-500" />
          UI-DecisionAudit · Decision audit log
        </p>
      </header>

      {/* Filters */}
      <div className="px-5">
        <div className="flex flex-wrap items-center gap-2" role="tablist">
          {FILTERS.map((f) => {
            const on = f.id === filter;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setFilter(f.id)}
                className={
                  "rounded-full border px-3.5 py-1.5 font-body text-[12.5px] transition-colors " +
                  (on
                    ? "border-plum-500/70 bg-lavender-100 text-plum-700"
                    : "border-plum-300/30 bg-paper/70 text-stone hover:border-plum-300/55 hover:text-plum-700")
                }
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards */}
      <section className="px-5 pt-4 pb-12">
        <ul className="flex flex-col gap-2.5">
          {visible.map((e) => (
            <li key={e.id}>
              <article className="rounded-[16px] bg-paper p-4 shadow-elev-1">
                <div className="flex items-start justify-between gap-3">
                  <span className="font-body text-[11.5px] uppercase tracking-[0.12em] text-stone">
                    {e.when}
                  </span>
                  <span className="font-body text-[10.5px] uppercase tracking-[0.16em] text-plum-700/70">
                    {e.ref}
                  </span>
                </div>
                <p className="mt-1.5 font-display text-[15px] font-semibold text-ink">
                  {e.title}
                </p>
                <p className="mt-0.5 font-body text-[12.5px] text-slate">
                  {e.detail}
                </p>
                <div className="mt-3 flex items-center gap-4 font-body text-[12px]">
                  <button
                    type="button"
                    className="text-plum-700 underline-offset-4 hover:underline"
                  >
                    why this matters
                  </button>
                  <button
                    type="button"
                    className="text-stone underline-offset-4 hover:underline"
                  >
                    hide entry
                  </button>
                </div>
              </article>
            </li>
          ))}
          {visible.length === 0 && (
            <li>
              <p className="rounded-2xl border border-dashed border-plum-300/40 bg-paper/40 px-4 py-6 text-center font-body text-[13px] text-slate">
                No entries in this category.
              </p>
            </li>
          )}
        </ul>
      </section>
    </YouBackdrop>
  );
}
