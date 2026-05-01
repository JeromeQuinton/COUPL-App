import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { OnboardingFrame } from "@/components/onboarding/OnboardingFrame";
import { OnboardingButton } from "@/components/onboarding/OnboardingButton";
import { StepEyebrow } from "@/components/onboarding/StepEyebrow";
import { OnboardingProgressCircle } from "@/components/onboarding/OnboardingProgressCircle";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding/pace")({
  head: () => ({
    meta: [
      { title: "What pace feels kind? — coupl" },
      {
        name: "description",
        content:
          "We use this to throttle who you see — and who sees you.",
      },
    ],
  }),
  component: PaceScreen,
});

type PaceValue = "slow" | "steady" | "open";

const OPTIONS: Array<{
  value: PaceValue;
  label: string;
  hint: string;
}> = [
  { value: "slow", label: "Slow", hint: "1–2 new people / week" },
  { value: "steady", label: "Steady", hint: "3–4 new people / week" },
  { value: "open", label: "Open", hint: "5+ when capacity allows" },
];

/**
 * Screen 04 of 9 — Pacing.
 *
 * Three-up segmented selector with a calm explanatory ring above. The
 * ring is decorative — the source of truth is the selected option.
 */
function PaceScreen() {
  const navigate = useNavigate();
  const [pace, setPace] = useState<PaceValue | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!pace) return;
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
          We use this to throttle who you see — and who sees you.
        </p>

        <div className="mt-10 flex justify-center">
          <OnboardingProgressCircle
            value="3–4"
            caption="per week, on average"
            progress={0.7}
          />
        </div>

        <fieldset className="mt-10 grid grid-cols-3 gap-3">
          <legend className="sr-only">Choose a pace</legend>
          {OPTIONS.map((opt) => {
            const checked = pace === opt.value;
            return (
              <label
                key={opt.value}
                className={cn(
                  "flex cursor-pointer flex-col items-center justify-center rounded-[14px] border px-2 py-3 text-center transition-colors",
                  checked
                    ? "border-plum-500 bg-lavender-50"
                    : "border-line bg-paper hover:bg-cloud",
                )}
              >
                <input
                  type="radio"
                  name="pace"
                  value={opt.value}
                  checked={checked}
                  onChange={() => setPace(opt.value)}
                  className="sr-only"
                />
                <span className="text-body-md font-semibold text-ink">
                  {opt.label}
                </span>
                <span className="mt-1 text-body-sm leading-tight text-slate">
                  {opt.hint}
                </span>
              </label>
            );
          })}
        </fieldset>
      </form>

      <div className="mt-8">
        <OnboardingButton type="submit" form="pace-form" disabled={!pace}>
          Continue
        </OnboardingButton>
      </div>
    </OnboardingFrame>
  );
}