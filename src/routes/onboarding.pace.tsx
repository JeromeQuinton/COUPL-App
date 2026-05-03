import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { OnboardingFrame } from "@/components/onboarding/OnboardingFrame";
import { OnboardingButton } from "@/components/onboarding/OnboardingButton";
import { StepEyebrow } from "@/components/onboarding/StepEyebrow";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding/pace")({
  head: () => ({
    meta: [
      { title: "What pace feels kind? — coupl" },
      {
        name: "description",
        content:
          "Fast isn't always honest. Slow isn't always fear. Choose the rhythm that protects your capacity.",
      },
    ],
  }),
  component: PaceScreen,
});

type PaceValue =
  | "asap"
  | "two_weeks"
  | "four_weeks"
  | "six_weeks"
  | "no_pressure";

const PACE_OPTIONS: Array<{
  value: PaceValue;
  label: string;
  answerLine: string;
}> = [
  {
    value: "asap",
    label: "Same week",
    answerLine: "Move quickly. Meet within the week.",
  },
  {
    value: "two_weeks",
    label: "~2 weeks",
    answerLine: "A short build-up. Meet within a fortnight.",
  },
  {
    value: "four_weeks",
    label: "~4 weeks",
    answerLine: "A few weeks of messages before meeting.",
  },
  {
    value: "six_weeks",
    label: "~6 weeks",
    answerLine: "Slower texts. Meet only when it feels right.",
  },
  {
    value: "no_pressure",
    label: "When ready",
    answerLine: "No fixed timeline. The rhythm sets itself.",
  },
];

const DEFAULT_INDEX = 2;

function PaceScreen() {
  const navigate = useNavigate();
  const [index, setIndex] = useState<number>(DEFAULT_INDEX);
  const selected = PACE_OPTIONS[index];
  const fillPct = (index / (PACE_OPTIONS.length - 1)) * 100;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate({ to: "/onboarding/values" });
  };

  return (
    <OnboardingFrame backTo="/onboarding/intent">
      <form id="pace-form" onSubmit={onSubmit}>
        <StepEyebrow step={4} />
        <h1 className="mt-3 text-display-xl text-ink">
          What pace feels kind?
        </h1>
        <p className="mt-2 text-body-md text-slate">
          Fast isn't always honest. Slow isn't always fear. Choose the rhythm that protects your capacity.
        </p>
        <p className="mt-3 text-body-sm italic text-stone">
          Pacing is not avoidance.
        </p>

        {/* Slider */}
        <div className="mt-12">
          <div className="relative px-3">
            {/* Track */}
            <div className="relative h-1 w-full rounded-full bg-line">
              <div
                className="absolute left-0 top-0 h-1 rounded-full bg-plum-500"
                style={{ width: `${fillPct}%` }}
              />
              {/* Tick marks */}
              <div className="pointer-events-none absolute inset-x-0 -bottom-2 flex justify-between">
                {PACE_OPTIONS.map((opt) => (
                  <span
                    key={opt.value}
                    className="h-2 w-px bg-stone/40"
                    aria-hidden
                  />
                ))}
              </div>
            </div>

            {/* Native range input overlayed on track */}
            <input
              type="range"
              min={0}
              max={PACE_OPTIONS.length - 1}
              step={1}
              value={index}
              onChange={(e) => setIndex(Number(e.target.value))}
              aria-label="Pace"
              aria-valuetext={selected.label}
              className="absolute inset-x-3 top-1/2 h-6 -translate-y-1/2 cursor-pointer appearance-none bg-transparent focus:outline-none [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-plum-500 [&::-moz-range-thumb]:bg-paper [&::-moz-range-thumb]:shadow-elev-1 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-plum-500 [&::-webkit-slider-thumb]:bg-paper [&::-webkit-slider-thumb]:shadow-elev-1"
            />
          </div>

          {/* Labels */}
          <div className="mt-6 flex justify-between px-1">
            {PACE_OPTIONS.map((opt, i) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setIndex(i)}
                className={cn(
                  "max-w-[64px] text-mono-sm uppercase tracking-[0.1em] transition-colors",
                  i === index
                    ? "font-semibold text-plum-700"
                    : "text-stone hover:text-slate",
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Your answer */}
        <div
          className="mt-8 rounded-[18px] border border-plum-300/25 px-5 py-5"
          style={{
            background:
              "linear-gradient(150deg, color-mix(in oklab, var(--blush) 70%, var(--paper)) 0%, color-mix(in oklab, var(--blush) 35%, var(--paper)) 100%)",
          }}
          aria-live="polite"
        >
          <p className="text-label-mono">Your answer</p>
          <p className="mt-2 font-display text-[18px] italic leading-snug text-ink">
            {selected.answerLine}
          </p>
        </div>

        {/* Liora */}
        <figure className="mt-6">
          <blockquote className="font-body text-[13.5px] italic leading-relaxed text-slate">
            "Most people who sit between two and four weeks of messages tend to be the most compatible. The slower ones are often the steadiest."
          </blockquote>
          <figcaption className="mt-2 text-label-mono">— Liora</figcaption>
        </figure>
      </form>

      <div className="mt-10 space-y-3">
        <OnboardingButton type="submit" form="pace-form">
          Continue
        </OnboardingButton>
        <p className="text-center text-body-sm text-stone">
          Pace settings can evolve.
        </p>
      </div>
    </OnboardingFrame>
  );
}