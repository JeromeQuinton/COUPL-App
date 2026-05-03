import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { OnboardingFrame } from "@/components/onboarding/OnboardingFrame";
import { OnboardingButton } from "@/components/onboarding/OnboardingButton";
import { StepEyebrow } from "@/components/onboarding/StepEyebrow";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding/capacity")({
  head: () => ({
    meta: [
      { title: "How much of you is here today? — coupl" },
      {
        name: "description",
        content:
          "Dating while depleted can distort clarity. Set your current capacity honestly.",
      },
    ],
  }),
  component: CapacityScreen,
});

type CapacityRange = "paused" | "guarded" | "steady" | "open" | "full";

const CAPACITY_QUOTES: Array<{
  range: CapacityRange;
  label: string;
  min: number;
  max: number;
  answerLine: string;
}> = [
  {
    range: "paused",
    label: "Paused",
    min: 0,
    max: 20,
    answerLine: "Paused today. Hold my place — I'll come back.",
  },
  {
    range: "guarded",
    label: "Guarded",
    min: 21,
    max: 40,
    answerLine: "Guarded. A few suggestions only, nothing demanding.",
  },
  {
    range: "steady",
    label: "Steady",
    min: 41,
    max: 60,
    answerLine: "Steady. Available, with a few quiet evenings I'd guard.",
  },
  {
    range: "open",
    label: "Open",
    min: 61,
    max: 80,
    answerLine: "Open. Curious. Ready to meet someone steady.",
  },
  {
    range: "full",
    label: "Full",
    min: 81,
    max: 100,
    answerLine: "Full presence. Show me everyone who's a fit.",
  },
];

function quoteFor(value: number) {
  return (
    CAPACITY_QUOTES.find((q) => value >= q.min && value <= q.max) ??
    CAPACITY_QUOTES[2]
  );
}

function CapacityScreen() {
  const navigate = useNavigate();
  const [value, setValue] = useState<number>(62);
  const current = quoteFor(value);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate({ to: "/onboarding/checks" });
  };

  return (
    <OnboardingFrame backTo="/onboarding/prompts">
      <form id="capacity-form" onSubmit={onSubmit}>
        <StepEyebrow step={9} />
        <h1 className="mt-3 text-display-xl text-ink">
          How much of you is here today?
        </h1>
        <p className="mt-2 text-body-md text-slate">
          Dating while depleted can distort clarity. Set your current capacity honestly.
        </p>
        <p className="mt-3 text-body-sm italic text-stone">
          Capacity shapes connection.
        </p>

        {/* Numeric reading */}
        <div className="mt-10 text-center">
          <p
            className="font-display text-[88px] leading-none text-ink"
            aria-live="polite"
          >
            {value}
          </p>
          <p className="mt-2 text-label-mono">Capacity · today</p>
        </div>

        {/* Slider */}
        <div className="mt-10">
          <div className="relative px-3">
            <div className="relative h-1 w-full rounded-full bg-line">
              <div
                className="absolute left-0 top-0 h-1 rounded-full bg-plum-500"
                style={{ width: `${value}%` }}
              />
              <div className="pointer-events-none absolute inset-x-0 -bottom-2 flex justify-between">
                {[0, 25, 50, 75, 100].map((t) => (
                  <span key={t} className="h-2 w-px bg-stone/40" aria-hidden />
                ))}
              </div>
            </div>

            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              aria-label="Capacity level"
              aria-valuetext={`${value}, ${current.label}`}
              className="absolute inset-x-3 top-1/2 h-6 -translate-y-1/2 cursor-pointer appearance-none bg-transparent focus:outline-none [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-plum-500 [&::-moz-range-thumb]:bg-paper [&::-moz-range-thumb]:shadow-elev-1 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-plum-500 [&::-webkit-slider-thumb]:bg-paper [&::-webkit-slider-thumb]:shadow-elev-1"
            />
          </div>

          <div className="mt-6 flex justify-between px-1">
            {CAPACITY_QUOTES.map((q) => (
              <span
                key={q.range}
                className={cn(
                  "text-mono-sm uppercase tracking-[0.1em] transition-colors",
                  q.range === current.range
                    ? "font-semibold text-plum-700"
                    : "text-stone",
                )}
              >
                {q.label}
              </span>
            ))}
          </div>
        </div>

        {/* You said */}
        <div
          className="mt-8 rounded-[18px] border border-plum-300/25 px-5 py-5"
          style={{
            background:
              "linear-gradient(150deg, color-mix(in oklab, var(--blush) 70%, var(--paper)) 0%, color-mix(in oklab, var(--blush) 35%, var(--paper)) 100%)",
          }}
          aria-live="polite"
        >
          <p className="text-label-mono">You said</p>
          <p className="mt-2 font-display text-[18px] italic leading-snug text-ink">
            {current.answerLine}
          </p>
        </div>
      </form>

      <div className="mt-10 space-y-3">
        <OnboardingButton type="submit" form="capacity-form">
          Continue
        </OnboardingButton>
        <p className="text-center text-body-sm italic text-stone">
          This can shift week to week. We'll ask again.
        </p>
      </div>
    </OnboardingFrame>
  );
}