import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { OnboardingFrame } from "@/components/onboarding/OnboardingFrame";
import { OnboardingButton } from "@/components/onboarding/OnboardingButton";
import { StepEyebrow } from "@/components/onboarding/StepEyebrow";
import { SelectablePill } from "@/components/onboarding/SelectablePill";

export const Route = createFileRoute("/onboarding/values")({
  head: () => ({
    meta: [
      { title: "Pick four values you live by — coupl" },
      {
        name: "description",
        content:
          "Not aspirational. The ones already showing up.",
      },
    ],
  }),
  component: ValuesScreen,
});

const TARGET = 4;

const VALUES: string[] = [
  "Honesty over comfort",
  "Slow over fast",
  "Curiosity",
  "Repair",
  "Independence",
  "Devotion",
  "Play",
  "Stillness",
  "Direct talk",
  "Building",
];

/**
 * Screen 05 of 9 — Values.
 *
 * Pick exactly four. Once the user reaches the cap, remaining unselected
 * pills become non-interactive ("Locked in" hint near the counter).
 */
function ValuesScreen() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);

  const isFull = selected.length >= TARGET;

  const toggle = (v: string) => {
    setSelected((prev) => {
      if (prev.includes(v)) return prev.filter((x) => x !== v);
      if (prev.length >= TARGET) return prev;
      return [...prev, v];
    });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selected.length !== TARGET) return;
    navigate({ to: "/onboarding/photos" });
  };

  return (
    <OnboardingFrame backTo="/onboarding/pace">
      <form id="values-form" onSubmit={onSubmit}>
        <StepEyebrow step={5} />
        <h1 className="mt-3 text-display-xl text-ink">
          Pick four values you live by
        </h1>
        <p className="mt-2 text-body-md text-slate">
          Not aspirational. The ones already showing up.
        </p>

        <div
          role="group"
          aria-label="Values"
          className="mt-8 flex flex-wrap gap-2"
        >
          {VALUES.map((v) => {
            const isSel = selected.includes(v);
            const disabled = !isSel && isFull;
            return (
              <SelectablePill
                key={v}
                label={v}
                selected={isSel}
                disabled={disabled}
                onClick={() => toggle(v)}
                className={
                  disabled ? "cursor-not-allowed opacity-50" : undefined
                }
              />
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-between text-body-sm text-slate">
          <span>
            {selected.length} of {TARGET} chosen
          </span>
          {isFull ? (
            <span className="text-mono-sm uppercase tracking-[0.12em] text-plum-500">
              Locked in
            </span>
          ) : null}
        </div>
      </form>

      <div className="mt-8">
        <OnboardingButton
          type="submit"
          form="values-form"
          disabled={selected.length !== TARGET}
        >
          Continue
        </OnboardingButton>
      </div>
    </OnboardingFrame>
  );
}