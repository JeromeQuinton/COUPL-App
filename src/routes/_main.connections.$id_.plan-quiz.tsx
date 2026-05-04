import { useState } from "react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/_main/connections/$id_/plan-quiz")({
  head: () => ({ meta: [{ title: "Plan a date — COUPL" }] }),
  component: PlanQuizScreen,
});

type Pace = "slow" | "steady" | "spirited";
type Setting = "indoors" | "outdoors" | "either";
type Time = "daytime" | "evening" | "either";

const SUGGESTIONS = [
  { id: "s1", title: "An afternoon walk in a quiet park", note: "Slow + outdoors + daytime" },
  { id: "s2", title: "Coffee at a small bookshop café", note: "Steady + indoors + daytime" },
  { id: "s3", title: "An early dinner somewhere unhurried", note: "Steady + indoors + evening" },
];

function PlanQuizScreen() {
  const { id } = useParams({
    from: "/_main/connections/$id_/plan-quiz",
  });
  const [pace, setPace] = useState<Pace | null>(null);
  const [setting, setSetting] = useState<Setting | null>(null);
  const [time, setTime] = useState<Time | null>(null);

  const showSuggestions = pace && setting && time;

  return (
    <div className="relative min-h-[100dvh] bg-paper">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-plum-300/15 bg-paper/85 px-4 py-3 backdrop-blur-md">
        <Link
          to="/connections/$id"
          params={{ id: id }}
          aria-label="Back"
          className="-ml-1 rounded-full p-1.5 text-plum-700 hover:bg-lavender-50"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <p className="font-display text-[15px] font-semibold text-ink">Plan a date</p>
      </header>

      <div className="px-5 pt-5 pb-12">
        <p className="text-label-mono">Plan · what fits</p>
        <h1 className="mt-2 font-display text-[28px] leading-tight text-ink">
          Three quick questions.
        </h1>

        <Question
          label="Pace"
          options={[
            { id: "slow", label: "Slow" },
            { id: "steady", label: "Steady" },
            { id: "spirited", label: "Spirited" },
          ]}
          value={pace}
          onChange={(v) => setPace(v as Pace)}
        />

        <Question
          label="Setting"
          options={[
            { id: "indoors", label: "Indoors" },
            { id: "outdoors", label: "Outdoors" },
            { id: "either", label: "Either" },
          ]}
          value={setting}
          onChange={(v) => setSetting(v as Setting)}
        />

        <Question
          label="Time"
          options={[
            { id: "daytime", label: "Daytime" },
            { id: "evening", label: "Evening" },
            { id: "either", label: "Either" },
          ]}
          value={time}
          onChange={(v) => setTime(v as Time)}
        />

        {showSuggestions && (
          <section className="mt-8">
            <p className="text-label-mono">Three to start with</p>
            <ul className="mt-3 space-y-2.5">
              {SUGGESTIONS.map((s) => (
                <li
                  key={s.id}
                  className="rounded-[14px] bg-paper px-4 py-4 shadow-elev-1"
                >
                  <p className="font-display text-[14.5px] text-ink">{s.title}</p>
                  <p className="mt-1 font-body text-[12.5px] text-stone">{s.note}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <Link
          to="/connections/$id/date-plan"
          params={{ id: id }}
          className="mt-8 block w-full rounded-full px-5 py-3 text-center font-body text-[13.5px] text-slate hover:text-plum-500"
        >
          We'll just figure it out
        </Link>
      </div>
    </div>
  );
}

function Question({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { id: string; label: string }[];
  value: string | null;
  onChange: (v: string) => void;
}) {
  return (
    <section className="mt-7">
      <p className="text-label-mono">{label}</p>
      <div className="mt-3 flex gap-1.5" role="radiogroup" aria-label={label}>
        {options.map((opt) => {
          const active = value === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(opt.id)}
              className={
                active
                  ? "flex-1 rounded-full bg-plum-700 px-3 py-1.5 text-label-mono text-paper"
                  : "flex-1 rounded-full border border-line bg-paper px-3 py-1.5 text-label-mono text-slate hover:bg-lavender-50"
              }
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
