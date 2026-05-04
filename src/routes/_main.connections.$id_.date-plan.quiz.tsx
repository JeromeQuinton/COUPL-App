import { useState } from "react";
import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { PageBackdrop } from "@/components/connections/PageBackdrop";
import { PolarisHeader } from "@/components/shell/PolarisHeader";

export const Route = createFileRoute("/_main/connections/$id_/date-plan/quiz")({
  head: () => ({ meta: [{ title: "A few quick choices — COUPL" }] }),
  component: PlanQuizScreen,
});

const VIBE = ["Quiet", "Lively", "Active", "Slow"] as const;
const TIME = ["Morning", "Afternoon", "Evening"] as const;
const SPEND = ["Free", "Low", "Medium", "No cap"] as const;

type Vibe = (typeof VIBE)[number];
type Time = (typeof TIME)[number];
type Spend = (typeof SPEND)[number];

function PillRow<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T | null;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <p className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-stone">
        {label}
      </p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt;
          return (
            <li key={opt}>
              <button
                type="button"
                onClick={() => onChange(opt)}
                className={`rounded-full border px-3.5 py-1.5 font-body text-[13px] transition-colors ${
                  active
                    ? "border-plum-700 bg-plum-700 text-paper"
                    : "border-line bg-paper text-ink hover:bg-lavender-50"
                }`}
              >
                {opt}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function PlanQuizScreen() {
  const { id } = useParams({ from: "/_main/connections/$id_/date-plan/quiz" });
  const navigate = useNavigate();
  const [vibe, setVibe] = useState<Vibe | null>(null);
  const [time, setTime] = useState<Time | null>(null);
  const [spend, setSpend] = useState<Spend | null>(null);

  const ready = vibe && time && spend;

  return (
    <PageBackdrop>
      <div
        className="mx-auto flex w-full max-w-[480px] flex-col px-6"
        style={{
          minHeight: "100dvh",
          paddingTop: "calc(env(safe-area-inset-top) + 0.75rem)",
          paddingBottom: "calc(env(safe-area-inset-bottom) + 2rem)",
        }}
      >
        <header className="flex items-center py-2">
          <Link
            to="/connections/$id/date-plan/city"
            params={{ id }}
            aria-label="Back"
            className="-ml-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-plum-700 hover:bg-lavender-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </header>

        <div className="mt-4">
          <PolarisHeader
            eyebrow="Plan · what kind of date"
            title="A few quick choices."
            eyebrowTone="plum-700"
          />
        </div>

        <div className="mt-7 space-y-6">
          <PillRow label="Vibe" options={VIBE} value={vibe} onChange={setVibe} />
          <PillRow label="Time of day" options={TIME} value={time} onChange={setTime} />
          <PillRow label="Spend" options={SPEND} value={spend} onChange={setSpend} />
        </div>

        <div className="mt-auto pt-10">
          <button
            type="button"
            disabled={!ready}
            onClick={() =>
              navigate({
                to: "/connections/$id/date-plan/details",
                params: { id },
              })
            }
            className="w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 disabled:opacity-40 hover:opacity-90"
          >
            See suggestions
          </button>
        </div>
      </div>
    </PageBackdrop>
  );
}
