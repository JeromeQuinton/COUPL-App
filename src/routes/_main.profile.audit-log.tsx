import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  ShieldCheck,
  Sparkles,
  Eye,
  Gauge,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Heart,
  Flower2,
} from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import {
  AUDIT_ENTRIES,
  AUDIT_SUMMARY,
  AUDIT_SPARKLINE,
  AUDIT_PATTERN_SERIES,
  AUDIT_PATTERNS,
  type AuditFilter,
  type AuditCategory,
  type AuditSeverity,
  type AuditStatus,
} from "@/data/wireframe_chap_extras";

/**
 * Decision Intelligence — premium relational governance dashboard.
 * Distinct from /profile/audit (visibility audit). Renders every AI
 * influence with status, severity, AI confidence, and behavioural
 * pattern intelligence.
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
  nudges: Flower2,
  safety: ShieldCheck,
  pacing: Gauge,
  visibility: Eye,
};

const SEVERITY_LABEL: Record<AuditSeverity, string> = {
  ambient: "Low",
  considered: "Medium",
  protective: "High",
};

const STATUS_CONFIG: Record<
  AuditStatus,
  { label: string; bg: string; fg: string; ring: string }
> = {
  applied: {
    label: "Applied",
    bg: "color-mix(in oklab, var(--success) 12%, var(--paper))",
    fg: "var(--success)",
    ring: "color-mix(in oklab, var(--success) 35%, transparent)",
  },
  dismissed: {
    label: "Dismissed",
    bg: "color-mix(in oklab, var(--blush) 55%, var(--paper))",
    fg: "var(--plum-700)",
    ring: "color-mix(in oklab, var(--plum-500) 25%, transparent)",
  },
  override: {
    label: "Override",
    bg: "color-mix(in oklab, var(--caution) 14%, var(--paper))",
    fg: "var(--caution)",
    ring: "color-mix(in oklab, var(--caution) 35%, transparent)",
  },
};

function DecisionIntelligenceScreen() {
  const [filter, setFilter] = useState<AuditFilter>("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const visible =
    filter === "all"
      ? AUDIT_ENTRIES
      : AUDIT_ENTRIES.filter((e) => e.category === filter);
  const total = useMemo(
    () => AUDIT_SUMMARY.reduce((s, x) => s + x.value, 0),
    [],
  );

  return (
    <YouBackdrop tone="serious">
      <StatusBar
        leading={
          <Link
            to="/profile"
            aria-label="Back to Profile"
            className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-paper/80 text-plum-700 shadow-elev-1 backdrop-blur-sm hover:bg-paper"
          >
            <ChevronLeft size={18} />
          </Link>
        }
        trailing={
          <button
            type="button"
            aria-label="More"
            className="mr-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-paper/80 text-plum-700 shadow-elev-1 backdrop-blur-sm hover:bg-paper"
          >
            <MoreHorizontal size={18} />
          </button>
        }
      />

      {/* Editorial header */}
      <header className="px-5 pt-1 pb-5 text-center">
        <div className="mx-auto mb-2 flex h-7 w-7 items-center justify-center">
          <Flower2 size={20} strokeWidth={1.5} className="text-plum-500" />
        </div>
        <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em] text-plum-500">
          Relational Governance
        </p>
        <h1 className="mt-2 font-display text-[30px] font-semibold leading-[1.05] tracking-[-0.02em] text-plum-700">
          Decision Intelligence
        </h1>
        <p className="mx-auto mt-2 max-w-[32ch] font-body text-[13.5px] leading-relaxed text-plum-700/70">
          Every AI influence. Fully visible. Fully yours.
        </p>
      </header>

      {/* === Top overview card === */}
      <section className="px-5">
        <div
          className="rounded-[24px] bg-paper/85 p-5 shadow-elev-2 backdrop-blur-md"
          style={{
            border:
              "1px solid color-mix(in oklab, var(--plum-500) 12%, transparent)",
          }}
          aria-label="Last 7 days overview"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-plum-700/80">
              Last 7 days overview
            </span>
            <span className="font-body text-[11.5px] font-medium text-stone">
              {total} total
            </span>
          </div>

          {/* Stat grid */}
          <div className="mt-4 grid grid-cols-4 gap-1">
            {AUDIT_SUMMARY.map((s) => {
              const Icon = CATEGORY_ICON[s.id];
              const TrendIcon = s.direction === "up" ? TrendingUp : TrendingDown;
              const trendColor =
                s.direction === "up" ? "var(--success)" : "var(--danger)";
              return (
                <div
                  key={s.id}
                  className="flex flex-col items-center gap-1.5 px-1"
                >
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-full"
                    style={{
                      background:
                        "linear-gradient(180deg, color-mix(in oklab, var(--lavender-100) 70%, var(--paper)) 0%, color-mix(in oklab, var(--blush) 30%, var(--paper)) 100%)",
                      border:
                        "1px solid color-mix(in oklab, var(--plum-500) 14%, transparent)",
                    }}
                  >
                    <Icon
                      size={17}
                      strokeWidth={1.6}
                      className="text-plum-500"
                    />
                  </span>
                  <span className="mt-0.5 font-display text-[22px] font-semibold leading-none tabular-nums text-plum-700">
                    {s.value}
                  </span>
                  <span className="font-mono text-[9.5px] font-medium uppercase tracking-[0.14em] text-stone">
                    {s.label}
                  </span>
                  <span
                    className="mt-0.5 inline-flex items-center gap-0.5 font-body text-[10.5px] font-semibold tabular-nums"
                    style={{ color: trendColor }}
                  >
                    <TrendIcon size={10} strokeWidth={2} />
                    {s.delta}%
                  </span>
                </div>
              );
            })}
          </div>

          {/* Sparkline divider */}
          <div className="mt-4">
            <Sparkline data={AUDIT_SPARKLINE} />
          </div>

          {/* Footer row: AI guidance summary + CTA */}
          <div
            className="mt-4 flex items-center gap-3 rounded-[16px] p-3"
            style={{
              background:
                "linear-gradient(180deg, color-mix(in oklab, var(--lavender-100) 55%, var(--paper)) 0%, var(--paper) 100%)",
              border:
                "1px solid color-mix(in oklab, var(--plum-500) 8%, transparent)",
            }}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-paper shadow-elev-1">
              <Sparkles size={13} strokeWidth={1.75} className="text-plum-500" />
            </span>
            <p className="min-w-0 flex-1 font-body text-[12.5px] leading-snug text-slate">
              AI guided you{" "}
              <span className="font-semibold text-plum-700">{total} times</span>{" "}
              to support healthier connection.
            </p>
            <button
              type="button"
              className="inline-flex shrink-0 items-center gap-1 rounded-full bg-paper px-3 py-1.5 font-body text-[11.5px] font-medium text-plum-700 shadow-elev-1"
              style={{
                border:
                  "1px solid color-mix(in oklab, var(--plum-500) 18%, transparent)",
              }}
            >
              <ArrowUpRight size={11} strokeWidth={2} />
              View insights
            </button>
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
                  "shrink-0 rounded-full border px-4 py-1.5 font-body text-[12.5px] font-medium transition-colors " +
                  (on
                    ? "border-plum-700 bg-plum-700 text-paper shadow-elev-1"
                    : "border-plum-300/40 bg-paper/70 text-plum-700/80 hover:border-plum-500/60 hover:text-plum-700")
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
        <ul className="flex flex-col gap-3.5">
          {visible.map((e) => {
            const Icon = CATEGORY_ICON[e.category];
            const isOpen = expanded === e.id;
            const sCfg = STATUS_CONFIG[e.status];
            return (
              <li key={e.id}>
                <article
                  className="rounded-[22px] bg-paper p-4 shadow-elev-1"
                  style={{
                    border:
                      "1px solid color-mix(in oklab, var(--plum-500) 10%, transparent)",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                      style={{
                        background:
                          "linear-gradient(180deg, color-mix(in oklab, var(--lavender-100) 75%, var(--paper)) 0%, color-mix(in oklab, var(--blush) 25%, var(--paper)) 100%)",
                        border:
                          "1px solid color-mix(in oklab, var(--plum-500) 14%, transparent)",
                      }}
                    >
                      <Icon
                        size={16}
                        strokeWidth={1.6}
                        className="text-plum-500"
                      />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-stone">
                            {e.when}
                          </p>
                          <h3 className="mt-0.5 font-display text-[16px] font-semibold leading-tight text-plum-700">
                            {e.title}
                          </h3>
                          <p className="mt-1 font-body text-[12.5px] leading-relaxed text-slate">
                            {e.action}
                          </p>
                        </div>
                        <div className="flex shrink-0 flex-col items-end gap-1.5">
                          <span className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.16em] text-plum-700/60">
                            {e.ref}
                          </span>
                          <StatusPill cfg={sCfg} />
                        </div>
                      </div>

                      {/* Tag row */}
                      <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                        <span
                          className="rounded-full px-2 py-[3px] font-body text-[10.5px] font-medium tracking-wide"
                          style={{
                            background:
                              "color-mix(in oklab, var(--blush) 50%, var(--paper))",
                            color: "var(--plum-700)",
                          }}
                        >
                          {e.emotion}
                        </span>
                        <span
                          className="rounded-full px-2 py-[3px] font-body text-[10.5px] font-medium tracking-wide"
                          style={{
                            background:
                              "color-mix(in oklab, var(--lavender-100) 70%, var(--paper))",
                            color: "var(--plum-700)",
                          }}
                        >
                          {SeverityLabelText(e.severity)}
                        </span>
                      </div>

                      {/* Telemetry row: signal · severity dot · confidence bar */}
                      <div className="mt-3 flex items-center gap-3">
                        <span className="inline-flex items-center gap-1 font-body text-[11px] text-plum-700/80">
                          <Heart
                            size={11}
                            strokeWidth={1.6}
                            className="text-plum-500"
                          />
                          {e.signal}
                        </span>
                        <span className="inline-flex items-center gap-1 font-body text-[11px] text-stone">
                          Severity:{" "}
                          <span className="text-plum-700/80">
                            {SEVERITY_LABEL[e.severity]}
                          </span>
                          <SeverityDot level={e.severity} />
                        </span>
                        <div className="ml-auto flex min-w-0 flex-1 items-center gap-1.5">
                          <span className="shrink-0 font-body text-[10.5px] text-stone">
                            AI {e.confidence}%
                          </span>
                          <ConfidenceBar value={e.confidence} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div
                    className="mt-3.5 flex items-center justify-between border-t pt-2.5"
                    style={{
                      borderColor:
                        "color-mix(in oklab, var(--plum-500) 8%, transparent)",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setExpanded(isOpen ? null : e.id)}
                      aria-expanded={isOpen}
                      className="font-body text-[12px] font-medium text-plum-700 underline-offset-4 hover:underline"
                    >
                      Why this mattered
                    </button>
                    <span className="inline-flex items-center gap-1 font-body text-[11.5px] text-plum-700/70">
                      {isOpen ? "Hide" : "Show"}
                      <ChevronRight
                        size={13}
                        className={
                          "transition-transform " +
                          (isOpen ? "rotate-90" : "")
                        }
                      />
                    </span>
                  </div>
                  {isOpen && (
                    <div className="mt-2.5 grid gap-2 rounded-[14px] bg-lavender-100/60 p-3">
                      <Row label="You" value={e.response} />
                      <Row label="Why" value={e.why} />
                    </div>
                  )}
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

      {/* === Your patterns === */}
      <section className="px-5 pb-6">
        <div
          className="rounded-[22px] bg-paper/85 p-5 shadow-elev-2 backdrop-blur-md"
          style={{
            border:
              "1px solid color-mix(in oklab, var(--plum-500) 12%, transparent)",
          }}
        >
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-plum-700/80">
              <TrendingUp size={12} strokeWidth={1.75} />
              Your patterns
            </span>
            <span
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-body text-[10.5px] font-medium"
              style={{
                background:
                  "color-mix(in oklab, var(--success) 12%, var(--paper))",
                color: "var(--success)",
                border:
                  "1px solid color-mix(in oklab, var(--success) 25%, transparent)",
              }}
            >
              <TrendingDown size={10} strokeWidth={2} />
              Trend: Improving
            </span>
          </div>

          <div className="mt-3 flex items-end gap-4">
            <div className="min-w-0 flex-1">
              <PatternChart data={AUDIT_PATTERN_SERIES} />
            </div>
            <div className="shrink-0 text-right">
              <p className="font-body text-[11.5px] leading-tight text-plum-700/70">
                Anxiety triggers
                <br />
                decreasing
              </p>
              <p className="mt-1 font-display text-[26px] font-semibold leading-none tracking-[-0.02em] text-plum-500">
                −22%
              </p>
              <p className="font-body text-[10.5px] text-stone">this week</p>
            </div>
          </div>

          {/* Insight rows */}
          <ul className="mt-4 flex flex-col gap-2.5">
            {AUDIT_PATTERNS.map((p) => (
              <li
                key={p.id}
                className="rounded-[14px] p-3"
                style={{
                  background:
                    "linear-gradient(180deg, color-mix(in oklab, var(--lavender-100) 50%, var(--paper)) 0%, var(--paper) 100%)",
                  border:
                    "1px solid color-mix(in oklab, var(--plum-500) 8%, transparent)",
                }}
              >
                <p className="font-display text-[13.5px] font-semibold leading-snug text-plum-700">
                  {p.title}
                </p>
                <p className="mt-0.5 font-body text-[12px] leading-relaxed text-slate">
                  {p.body}
                </p>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="mt-3 inline-flex w-full items-center justify-center gap-1 rounded-full py-2 font-body text-[12px] font-medium text-plum-700 hover:underline underline-offset-4"
          >
            View all insights <ArrowUpRight size={11} strokeWidth={2} />
          </button>
        </div>
      </section>

      {/* === Trust / sovereignty footer === */}
      <section className="px-5 pb-12">
        <Link
          to="/profile/safety"
          className="flex items-center gap-3 rounded-[20px] p-4 shadow-elev-1 backdrop-blur-sm"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in oklab, var(--plum-500) 8%, var(--paper)) 0%, color-mix(in oklab, var(--blush) 30%, var(--paper)) 100%)",
            border:
              "1px solid color-mix(in oklab, var(--plum-500) 16%, transparent)",
          }}
        >
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
            style={{
              background:
                "linear-gradient(180deg, var(--paper) 0%, color-mix(in oklab, var(--lavender-100) 60%, var(--paper)) 100%)",
              border:
                "1px solid color-mix(in oklab, var(--plum-500) 18%, transparent)",
            }}
          >
            <ShieldCheck
              size={17}
              strokeWidth={1.6}
              className="text-plum-500"
            />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-[15px] font-semibold text-plum-700">
              Your data. Your rules.
            </p>
            <p className="font-body text-[12px] text-slate">
              Learn how COUPL protects your relational sovereignty.
            </p>
          </div>
          <ChevronRight size={16} className="text-plum-700/70" />
        </Link>
      </section>
    </YouBackdrop>
  );
}

/* ---------------- subcomponents ---------------- */

function StatusPill({
  cfg,
}: {
  cfg: { label: string; bg: string; fg: string; ring: string };
}) {
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-[3px] font-body text-[10.5px] font-semibold tracking-wide"
      style={{
        background: cfg.bg,
        color: cfg.fg,
        border: `1px solid ${cfg.ring}`,
      }}
    >
      {cfg.label}
    </span>
  );
}

function SeverityDot({ level }: { level: AuditSeverity }) {
  const color =
    level === "protective"
      ? "var(--danger)"
      : level === "considered"
        ? "var(--caution)"
        : "var(--success)";
  return (
    <span
      aria-hidden
      className="ml-0.5 inline-block h-1.5 w-1.5 rounded-full"
      style={{ background: color }}
    />
  );
}

function SeverityLabelText(level: AuditSeverity): string {
  return level === "protective"
    ? "Protective"
    : level === "considered"
      ? "Considered"
      : "Ambient";
}

function ConfidenceBar({ value }: { value: number }) {
  return (
    <div
      className="relative h-1 min-w-[40px] flex-1 overflow-hidden rounded-full"
      style={{ background: "color-mix(in oklab, var(--lavender-100) 80%, var(--paper))" }}
    >
      <div
        className="absolute inset-y-0 left-0 rounded-full"
        style={{
          width: `${value}%`,
          background:
            "linear-gradient(90deg, var(--plum-500) 0%, var(--plum-300) 100%)",
        }}
      />
    </div>
  );
}

function Sparkline({ data }: { data: number[] }) {
  const w = 320;
  const h = 36;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = w / (data.length - 1);
  const points = data
    .map((v, i) => {
      const x = i * step;
      const y = h - ((v - min) / range) * (h - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");
  const area = `0,${h} ${points} ${w},${h}`;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className="h-9 w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="spark-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--plum-500)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--plum-500)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill="url(#spark-fill)" />
      <polyline
        points={points}
        fill="none"
        stroke="var(--plum-500)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PatternChart({ data }: { data: number[] }) {
  const w = 220;
  const h = 80;
  const max = Math.max(...data, 10);
  const min = Math.min(...data, -10);
  const range = max - min || 1;
  const step = w / (data.length - 1);
  const points = data
    .map((v, i) => {
      const x = i * step;
      const y = h - ((v - min) / range) * (h - 8) - 4;
      return `${x},${y}`;
    })
    .join(" ");
  const area = `0,${h} ${points} ${w},${h}`;
  const lastIdx = data.length - 1;
  const lastX = lastIdx * step;
  const lastY =
    h - ((data[lastIdx] - min) / range) * (h - 8) - 4;
  // zero baseline
  const zeroY = h - ((0 - min) / range) * (h - 8) - 4;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className="h-20 w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="pat-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--plum-500)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--plum-500)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="pat-stroke" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="var(--plum-300)" />
          <stop offset="100%" stopColor="var(--plum-500)" />
        </linearGradient>
      </defs>
      <line
        x1="0"
        x2={w}
        y1={zeroY}
        y2={zeroY}
        stroke="color-mix(in oklab, var(--plum-500) 15%, transparent)"
        strokeWidth="0.5"
        strokeDasharray="2 3"
      />
      <polygon points={area} fill="url(#pat-fill)" />
      <polyline
        points={points}
        fill="none"
        stroke="url(#pat-stroke)"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={lastX} cy={lastY} r="3" fill="var(--plum-500)" />
      <circle
        cx={lastX}
        cy={lastY}
        r="6"
        fill="var(--plum-500)"
        opacity="0.18"
      />
    </svg>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[44px_1fr] gap-2">
      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-plum-700/70">
        {label}
      </span>
      <span className="font-body text-[12.5px] leading-relaxed text-ink">
        {value}
      </span>
    </div>
  );
}