import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/_main/polaris")({
  head: () => ({ meta: [{ title: "Polaris — COUPL" }] }),
  component: PolarisScreen,
});

const PACE_30: number[] = [
  62, 58, 55, 51, 49, 52, 54, 50, 47, 45, 48, 51, 47, 44, 42,
  46, 48, 51, 49, 46, 44, 42, 45, 49, 53, 56, 54, 51, 53, 55,
];

type Lens = { id: string; label: string; level: "low" | "steady" | "high" };
const ATTUNEMENT: Lens[] = [
  { id: "pace", label: "Pace", level: "high" },
  { id: "presence", label: "Presence", level: "steady" },
  { id: "values", label: "Values", level: "steady" },
  { id: "lifestyle", label: "Lifestyle", level: "low" },
  { id: "communication", label: "Communication", level: "high" },
];

const CAPACITY = { current: "Some bandwidth", typical: "More than usual" };
const REPAIR_LINE =
  "When something jarred, you came back to it more often than you let it sit.";

function PolarisScreen() {
  return (
    <div className="relative px-5 pb-16 pt-6">
      <header className="flex items-center gap-3">
        <Link
          to="/profile"
          aria-label="Back"
          className="-ml-1 rounded-full p-1.5 text-plum-700 hover:bg-lavender-50"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <p className="text-label-mono">Polaris</p>
      </header>

      <h1 className="mt-3 font-display text-[28px] leading-[1.1] text-ink">
        This week you noticed{" "}
        <em className="font-display italic">differently.</em>
      </h1>
      <p className="mt-3 font-body text-[13.5px] leading-relaxed text-slate">
        Polaris reads attunement, not achievement. There's no score to chase.
        Just patterns to notice — and what they tell you about your pace right now.
      </p>

      <Link
        to="/polaris/about"
        className="mt-3 inline-flex items-center gap-1 text-label-mono text-plum-500 hover:text-plum-700"
      >
        What this means →
      </Link>

      <section className="mt-8 space-y-4">
        <PaceCard data={PACE_30} />
        <AttunementCard lenses={ATTUNEMENT} />
        <CapacityCard current={CAPACITY.current} typical={CAPACITY.typical} />
        <RepairCard line={REPAIR_LINE} />
      </section>

      <div className="mt-8 text-center">
        <Link
          to="/polaris/methodology"
          className="font-body text-[12.5px] italic text-stone hover:text-plum-500"
        >
          How Polaris reads this →
        </Link>
      </div>
    </div>
  );
}

function PaceCard({ data }: { data: number[] }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 320;
  const h = 56;
  const stepX = w / (data.length - 1);
  const points = data
    .map((v, i) => {
      const x = i * stepX;
      const y = h - ((v - min) / range) * (h - 8) - 4;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <article className="rounded-[18px] bg-paper p-4 shadow-elev-1">
      <p className="font-body text-[10.5px] font-semibold uppercase tracking-[0.16em] text-slate">
        Pace · last 30 days
      </p>
      <div className="mt-3 overflow-hidden">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          width="100%"
          height={h}
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="paceLine" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="var(--plum-500)" stopOpacity="0.85" />
              <stop offset="100%" stopColor="var(--blush)" stopOpacity="0.85" />
            </linearGradient>
          </defs>
          <polyline
            fill="none"
            stroke="url(#paceLine)"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />
        </svg>
      </div>
      <p className="mt-2 font-display text-[14px] italic text-plum-700">
        Slower mid-week. Steadier weekends.
      </p>
    </article>
  );
}

function AttunementCard({ lenses }: { lenses: Lens[] }) {
  const widths: Record<Lens["level"], string> = {
    low: "30%",
    steady: "62%",
    high: "88%",
  };

  return (
    <article className="rounded-[18px] bg-paper p-4 shadow-elev-1">
      <p className="font-body text-[10.5px] font-semibold uppercase tracking-[0.16em] text-slate">
        Attunement · by lens
      </p>
      <ul className="mt-3 flex flex-col gap-2.5">
        {lenses.map((l) => {
          const tappable = l.id === "pace" || l.id === "presence";
          const inner = (
            <>
              <div className="flex items-center justify-between">
                <span className="font-body text-[12.5px] text-ink">{l.label}</span>
                <span className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-stone">
                  {l.level}
                </span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-lavender-50">
                <div
                  aria-hidden
                  className="h-full rounded-full"
                  style={{
                    width: widths[l.level],
                    background:
                      "linear-gradient(90deg, var(--plum-500) 0%, var(--blush) 100%)",
                  }}
                />
              </div>
            </>
          );
          return (
            <li key={l.id}>
              {tappable ? (
                <Link
                  to="/polaris/$lensId"
                  params={{ lensId: l.id }}
                  className="block rounded-[10px] -mx-2 px-2 py-1 hover:bg-lavender-50"
                >
                  {inner}
                </Link>
              ) : (
                inner
              )}
            </li>
          );
        })}
      </ul>
    </article>
  );
}

function CapacityCard({ current, typical }: { current: string; typical: string }) {
  return (
    <article className="rounded-[18px] bg-paper p-4 shadow-elev-1">
      <p className="font-body text-[10.5px] font-semibold uppercase tracking-[0.16em] text-slate">
        Capacity
      </p>
      <div className="mt-3 flex flex-col gap-2">
        <div className="flex items-center justify-between rounded-[10px] bg-lavender-50 px-3 py-2">
          <span className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-stone">
            Current
          </span>
          <span className="font-display text-[13.5px] text-ink">{current}</span>
        </div>
        <div className="flex items-center justify-between rounded-[10px] bg-paper px-3 py-2 ring-1 ring-line">
          <span className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-stone">
            Typical for you
          </span>
          <span className="font-display text-[13.5px] text-slate">{typical}</span>
        </div>
      </div>
    </article>
  );
}

function RepairCard({ line }: { line: string }) {
  return (
    <article className="rounded-[18px] bg-paper p-4 shadow-elev-1">
      <p className="font-body text-[10.5px] font-semibold uppercase tracking-[0.16em] text-slate">
        Repair ratio
      </p>
      <p className="mt-3 font-display text-[15px] italic leading-relaxed text-ink">
        {line}
      </p>
    </article>
  );
}
