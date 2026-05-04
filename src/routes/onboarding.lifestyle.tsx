import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { OnboardingFrame } from "@/components/onboarding/OnboardingFrame";
import { OnboardingButton } from "@/components/onboarding/OnboardingButton";
import { StepEyebrow } from "@/components/onboarding/StepEyebrow";
import { SelectablePill } from "@/components/onboarding/SelectablePill";

/**
 * /onboarding/lifestyle — Banani UI-0016 "Lifestyle Habits".
 *
 * R2-05 — replaces the prior chip-based interests/lifestyle hybrid
 * with the canonical lifestyle-habits surface: pace, energy, drinking,
 * smoking, movement. Discover ranking weights live in Phase 4.
 *
 * No moralising on substances. "Rarely" not "social." Plain options,
 * editorial helper lines.
 *
 * DR-LIFESTYLE-FIELDS — field set pending PRD confirmation.
 */

type Pace = "slow" | "steady" | "spirited";
type Energy = "morning" | "evening" | "both";
type Frequency = "often" | "sometimes" | "rarely" | "never";
type Movement = "walks" | "studio" | "lifting" | "outdoors" | "none";

const PACE: ReadonlyArray<{ value: Pace; label: string; helper: string }> = [
  { value: "slow", label: "Slow", helper: "Ease, long mornings, room to land." },
  { value: "steady", label: "Steady", helper: "Even rhythm. Things finish where they start." },
  { value: "spirited", label: "Spirited", helper: "Plans, plans on plans, plenty of pace." },
];

const ENERGY: ReadonlyArray<{ value: Energy; label: string }> = [
  { value: "morning", label: "Morning" },
  { value: "evening", label: "Evening" },
  { value: "both", label: "Both" },
];

const FREQUENCIES: ReadonlyArray<{ value: Frequency; label: string }> = [
  { value: "often", label: "Often" },
  { value: "sometimes", label: "Sometimes" },
  { value: "rarely", label: "Rarely" },
  { value: "never", label: "Never" },
];

const MOVEMENT: ReadonlyArray<{ value: Movement; label: string }> = [
  { value: "walks", label: "Walks" },
  { value: "studio", label: "Studio" },
  { value: "lifting", label: "Lifting" },
  { value: "outdoors", label: "Outdoors" },
  { value: "none", label: "None right now" },
];

export const Route = createFileRoute("/onboarding/lifestyle")({
  head: () => ({
    meta: [
      { title: "A few things we shape Discover around — coupl" },
      {
        name: "description",
        content: "Lifestyle habits: pace, energy, drinking, smoking, movement.",
      },
    ],
  }),
  component: LifestyleScreen,
});

function LifestyleScreen() {
  const navigate = useNavigate();
  const [pace, setPace] = useState<Pace | null>(null);
  const [energy, setEnergy] = useState<Energy | null>(null);
  const [drinking, setDrinking] = useState<Frequency | null>(null);
  const [smoking, setSmoking] = useState<Frequency | null>(null);
  const [movement, setMovement] = useState<Set<Movement>>(new Set());

  const toggleMovement = (m: Movement) => {
    setMovement((prev) => {
      const next = new Set(prev);
      if (next.has(m)) next.delete(m);
      else next.add(m);
      return next;
    });
  };

  const canContinue = pace && energy && drinking && smoking;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canContinue) return;
    navigate({ to: "/onboarding/love-language" });
  };

  return (
    <OnboardingFrame
      backTo="/onboarding/intent"
      footer={
        <div className="px-5 pb-8 pt-4">
          <OnboardingButton
            type="submit"
            form="lifestyle-form"
            disabled={!canContinue}
          >
            Continue
          </OnboardingButton>
        </div>
      }
    >
      <form id="lifestyle-form" onSubmit={onSubmit} className="px-5 pt-4">
        <StepEyebrow step={5} />
        <h1 className="mt-3 text-display-xl text-ink">
          A few things we shape Discover around.
        </h1>
        <p className="mt-2 text-body-md text-slate">
          Honest answers do more than tidy ones. You can change any of these later.
        </p>

        {/* Pace */}
        <fieldset className="mt-8">
          <legend className="text-mono-sm uppercase tracking-[0.14em] text-slate">
            Pace
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {PACE.map((p) => (
              <SelectablePill
                key={p.value}
                selected={pace === p.value}
                label={p.label}
                onClick={() => setPace(p.value)}
              />
            ))}
          </div>
          {pace ? (
            <p className="mt-2 font-body text-[12.5px] italic text-stone">
              {PACE.find((p) => p.value === pace)?.helper}
            </p>
          ) : null}
        </fieldset>

        {/* Energy */}
        <fieldset className="mt-7">
          <legend className="text-mono-sm uppercase tracking-[0.14em] text-slate">
            Energy
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {ENERGY.map((e) => (
              <SelectablePill
                key={e.value}
                selected={energy === e.value}
                label={e.label}
                onClick={() => setEnergy(e.value)}
              />
            ))}
          </div>
        </fieldset>

        {/* Drinking */}
        <fieldset className="mt-7">
          <legend className="text-mono-sm uppercase tracking-[0.14em] text-slate">
            Drinking
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {FREQUENCIES.map((f) => (
              <SelectablePill
                key={f.value}
                selected={drinking === f.value}
                label={f.label}
                onClick={() => setDrinking(f.value)}
              />
            ))}
          </div>
        </fieldset>

        {/* Smoking / vaping */}
        <fieldset className="mt-7">
          <legend className="text-mono-sm uppercase tracking-[0.14em] text-slate">
            Smoking / vaping
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {FREQUENCIES.map((f) => (
              <SelectablePill
                key={f.value}
                selected={smoking === f.value}
                label={f.label}
                onClick={() => setSmoking(f.value)}
              />
            ))}
          </div>
        </fieldset>

        {/* Movement */}
        <fieldset className="mt-7 mb-4">
          <legend className="text-mono-sm uppercase tracking-[0.14em] text-slate">
            Movement
          </legend>
          <p className="mt-1 font-body text-[12.5px] text-stone">Pick any that fit.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {MOVEMENT.map((m) => (
              <SelectablePill
                key={m.value}
                selected={movement.has(m.value)}
                label={m.label}
                onClick={() => toggleMovement(m.value)}
              />
            ))}
          </div>
        </fieldset>
      </form>
    </OnboardingFrame>
  );
}
