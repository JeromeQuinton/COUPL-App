import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Eye,
  Gauge,
  TrendingUp,
} from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import {
  AUDIT_ENTRIES,
  AUDIT_SUMMARY,
  AUDIT_PATTERNS,
  type AuditFilter,
  type AuditCategory,
  type AuditSeverity,
} from "@/data/wireframe_chap_extras";

/**
 * Decision Intelligence (formerly Decision audit log).
 * Premium relational-governance surface — every AI influence rendered
 * inspectable. Distinct from /profile/audit (visibility audit, viewers).
 */
export const Route = createFileRoute("/_main/profile/audit-log")({
  head: () => ({ meta: [{ title: "Decision Intelligence — COUPL" }] }),
  component: DecisionIntelligenceScreen,
});

const FILTERS: { id: AuditFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "nudges", label: "Nudges" },
  { id: "safety", label: "Safety" },
  { id: "pacing", label: "Pacing" },
  { id: "visibility", label: "Visibility" },
];

const CATEGORY_ICON: Record<
  AuditCategory,
  React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>
> = {
  nudges: Sparkles,
  safety: ShieldCheck,
  pacing: Gauge,
  visibility: Eye,
};

const SEVERITY_LABEL: Record<AuditSeverity, string> = {
  ambient: "Ambient",
  considered: "Considered",
  protective: "Protective",
};

function DecisionIntelligenceScreen() {
  const [filter, setFilter] = useState<AuditFilter>("all");
  const [expanded, setExpanded] = useState<string | null>(null);
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
            className="ml-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />

      {/* Editorial header */}
      <header className="px-5 pt-1 pb-5 text-center">
        <p className="font-body text-[10.5px] font-semibold uppercase tracking-[0.18em] text-plum-500">
          Relational governance
        </p>
        <h1 className="mt-2 font-display text-[26px] font-semibold leading-tight text-ink">
          Decision Intelligence
        </h1>
        <p className="mx-auto mt-1.5 max-w-[28ch] font-body text-[13px] leading-relaxed text-slate">
          Every AI influence. Fully visible. Fully yours.
        </p>
      </header>

      {/* Summary bar */}
      <section className="px-5">
        <div
          className="rounded-[20px] bg-paper/80 p-4 shadow-elev-1 backdrop-blur-sm"
          style={{
            border:
              "1px solid color-mix(in oklab, var(--plum-500) 14%, transparent)",
          }}
          aria-label="Last 7 days · AI influences by domain"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-plum-700/80">
              Last 7 days
            </span>
            <span className="font-body text-[11px] text-stone">
              {AUDIT_SUMMARY.reduce((s, x) => s + x.value, 0)} total
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {AUDIT_SUMMARY.map((s, i) => {
              const Icon = CATEGORY_ICON[s.id];
              return (
                <div
                  key={s.id}
                  className="flex flex-col items-center gap-1.5"
                  style={{
                    borderLeft:
                      i === 0
                        ? "none"
                        : "1px solid color-mix(in oklab, var(--plum-500) 8%, transparent)",
                    paddingLeft: i === 0 ? 0 : 8,
                  }}
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-lavender-100">
                    <Icon size={13} strokeWidth={1.75} className="text-plum-700" />
                  </span>
                  <span className="font-display text-[18px] font-semibold tabular-nums text-ink leading-none">
                    {s.value}
                  </span>
                  <span className="font-body text-[10.5px] uppercase tracking-[0.1em] text-stone">
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filter chips */}
      <div className="px-5 pt-5">
        <div
          className="flex flex-nowrap items-center gap-2 overflow-x-auto pb-1"
          role="tablist"
          aria-label="Filter decisions"
        >
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
                  "shrink-0 rounded-full border px-3.5 py-1.5 font-body text-[12.5px] transition-colors " +
                  (on
                    ? "border-plum-500 bg-plum-500 text-paper"
                    : "border-plum-300/35 bg-paper/70 text-stone hover:border-plum-400/55 hover:text-plum-700")
                }
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Entry cards */}
      <section className="px-5 pt-4 pb-6">
        <ul className="flex flex-col gap-3">
          {visible.map((e) => {
            const Icon = CATEGORY_ICON[e.category];
            const isOpen = expanded === e.id;
            return (
              <li key={e.id}>
                <article
                  className="rounded-[20px] bg-paper p-4 shadow-elev-1"
                  style={{
                    border:
                      "1px solid color-mix(in oklab, var(--plum-500) 10%, transparent)",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lavender-100">
                      <Icon size={16} strokeWidth={1.75} className="text-plum-700" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-body text-[11px] uppercase tracking-[0.12em] text-stone">
                            {e.when}
                          </p>
                          <h3 className="mt-0.5 font-display text-[15.5px] font-semibold leading-tight text-ink">
                            {e.title}
                          </h3>
                        </div>
                        <span className="shrink-0 font-body text-[10.5px] uppercase tracking-[0.16em] text-plum-700/70">
                          {e.ref}
                        </span>
                      </div>
                      <p className="mt-1.5 font-body text-[13px] leading-relaxed text-slate">
                        {e.action}
                      </p>

                      {/* Meta row: emotion + severity */}
                      <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                        <span
                          className="rounded-full px-2 py-[3px] font-body text-[10.5px] font-medium tracking-wide text-plum-700"
                          style={{
                            background:
                              "color-mix(in oklab, var(--blush) 55%, var(--paper))",
                          }}
                        >
                          {e.emotion}
                        </span>
                        <SeverityPill level={e.severity} />
                      </div>
                    </div>
                  </div>

                  {/* Divider + actions */}
                  <div
                    className="mt-3 border-t pt-2.5"
                    style={{
                      borderColor:
                        "color-mix(in oklab, var(--plum-500) 8%, transparent)",
                    }}
                  >
                    <div className="flex items-center justify-between font-body text-[12px]">
                      <button
                        type="button"
                        onClick={() => setExpanded(isOpen ? null : e.id)}
                        aria-expanded={isOpen}
                        className="font-medium text-plum-700 underline-offset-4 hover:underline"
                      >
                        {isOpen ? "Hide context" : "Why this mattered"}
                      </button>
                      <button
                        type="button"
                        className="text-stone underline-offset-4 hover:underline"
                      >
                        Hide entry
                      </button>
                    </div>
                    {isOpen && (
                      <div className="mt-2.5 grid gap-2 rounded-[14px] bg-lavender-100/60 p-3">
                        <Row label="You" value={e.response} />
                        <Row label="Why" value={e.why} />
                      </div>
                    )}
                  </div>
                </article>
              </li>
            );
          })}
          {visible.length === 0 && (
            <li>
              <p className="rounded-2xl border border-dashed border-plum-300/40 bg-paper/40 px-4 py-6 text-center font-body text-[13px] text-slate">
                Nothing in this category — quiet is also a signal.
              </p>
            </li>
          )}
        </ul>
      </section>

      {/* Your patterns */}
      <section className="px-5 pb-6">
        <div className="mb-2 flex items-center gap-2">
          <TrendingUp size={14} strokeWidth={1.75} className="text-plum-700" />
          <h2 className="font-display text-[14.5px] font-semibold text-ink">
            Your patterns
          </h2>
        </div>
        <ul className="flex flex-col gap-2.5">
          {AUDIT_PATTERNS.map((p) => (
            <li
              key={p.id}
              className="rounded-[18px] p-4"
              style={{
                background:
                  "linear-gradient(180deg, color-mix(in oklab, var(--lavender-100) 70%, var(--paper)) 0%, var(--paper) 100%)",
                border:
                  "1px solid color-mix(in oklab, var(--plum-500) 10%, transparent)",
              }}
            >
              <p className="font-display text-[14px] font-semibold leading-snug text-ink">
                {p.title}
              </p>
              <p className="mt-1 font-body text-[12.5px] leading-relaxed text-slate">
                {p.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Trust footer */}
      <section className="px-5 pb-12">
        <Link
          to="/profile/safety"
          className="flex items-center gap-3 rounded-[18px] bg-paper/70 p-3.5 shadow-elev-1 backdrop-blur-sm"
          style={{
            border:
              "1px solid color-mix(in oklab, var(--plum-500) 12%, transparent)",
          }}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-lavender-100">
            <ShieldCheck size={15} strokeWidth={1.75} className="text-plum-700" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-[13.5px] font-semibold text-ink">
              Transparency you can trust.
            </p>
            <p className="font-body text-[12px] text-slate">
              Learn how decisions are made.
            </p>
          </div>
          <ChevronRight size={16} className="text-plum-700/70" />
        </Link>
      </section>
    </YouBackdrop>
  );
}

function SeverityPill({ level }: { level: AuditSeverity }) {
  const cfg =
    level === "protective"
      ? {
          bg: "color-mix(in oklab, var(--plum-500) 12%, var(--paper))",
          fg: "var(--plum-700)",
          dot: "var(--plum-500)",
        }
      : level === "considered"
        ? {
            bg: "color-mix(in oklab, var(--lavender-100) 80%, var(--paper))",
            fg: "var(--plum-700)",
            dot: "color-mix(in oklab, var(--plum-500) 60%, var(--paper))",
          }
        : {
            bg: "color-mix(in oklab, var(--paper) 80%, var(--lavender-100))",
            fg: "var(--stone)",
            dot: "var(--stone)",
          };
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-[3px] font-body text-[10.5px] font-medium tracking-wide"
      style={{ background: cfg.bg, color: cfg.fg }}
    >
      <span
        aria-hidden
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: cfg.dot }}
      />
      {SEVERITY_LABEL[level]}
    </span>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[44px_1fr] gap-2">
      <span className="font-body text-[10.5px] font-semibold uppercase tracking-[0.14em] text-plum-700/70">
        {label}
      </span>
      <span className="font-body text-[12.5px] leading-relaxed text-ink">
        {value}
      </span>
    </div>
  );
}