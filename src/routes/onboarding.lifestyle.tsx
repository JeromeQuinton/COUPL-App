import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { OnboardingFrame } from "@/components/onboarding/OnboardingFrame";
import { OnboardingButton } from "@/components/onboarding/OnboardingButton";
import { StepEyebrow } from "@/components/onboarding/StepEyebrow";
import { SelectablePill } from "@/components/onboarding/SelectablePill";

export const Route = createFileRoute("/onboarding/lifestyle")({
  head: () => ({
    meta: [
      { title: "What's a usual week like? — coupl" },
      {
        name: "description",
        content:
          "Attraction is shaped by ordinary life as much as chemistry.",
      },
    ],
  }),
  component: LifestyleScreen,
});

type LifestyleCategory = "rhythm" | "movement" | "creativity" | "outdoors";

const LIFESTYLE: Record<
  LifestyleCategory,
  { label: string; chips: string[] }
> = {
  rhythm: {
    label: "Slow living",
    chips: ["Reading", "Cooking", "Long walks", "Tea", "Vinyl"],
  },
  movement: {
    label: "Movement",
    chips: ["Yoga", "Hiking", "Climbing", "Running", "Swimming"],
  },
  creativity: {
    label: "Creativity",
    chips: ["Pottery", "Writing", "Film", "Music", "Photography"],
  },
  outdoors: {
    label: "Outdoors",
    chips: ["Camping", "Sea swimming", "Gardening", "Cycling"],
  },
};

const CATEGORY_KEYS = Object.keys(LIFESTYLE) as LifestyleCategory[];

/**
 * Screen 06 of 10 — Lifestyle.
 *
 * Combined Interests + Lifestyle multi-select. Chips are organised under
 * mono-caps category labels for browsability. Continue unlocks at 3+.
 */
function LifestyleScreen() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (chip: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(chip)) next.delete(chip);
      else next.add(chip);
      return next;
    });
  };

  const canSubmit = selected.size >= 3;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;
    navigate({ to: "/onboarding/prompts" });
  };

  return (
    <OnboardingFrame backTo="/onboarding/values">
      <form id="lifestyle-form" onSubmit={onSubmit}>
        <StepEyebrow step={6} />
        <h1 className="mt-3 text-display-xl text-ink">
          What&rsquo;s a usual week like?
        </h1>
        <p className="mt-2 text-body-md text-slate">
          Attraction is shaped by ordinary life as much as chemistry.
        </p>
        <p className="mt-3 font-display italic text-body-md text-plum-500">
          Patterns matter more than performance.
        </p>

        <div className="mt-8 space-y-6">
          {CATEGORY_KEYS.map((cat) => (
            <fieldset key={cat}>
              <legend className="text-mono-sm uppercase tracking-[0.14em] text-slate">
                {LIFESTYLE[cat].label}
              </legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {LIFESTYLE[cat].chips.map((chip) => (
                  <SelectablePill
                    key={chip}
                    label={chip}
                    selected={selected.has(chip)}
                    onClick={() => toggle(chip)}
                  />
                ))}
              </div>
            </fieldset>
          ))}
        </div>

        <p className="mt-6 text-body-sm text-slate">
          {selected.size} chosen · pick 3 or more
        </p>
      </form>

      <div className="mt-8">
        <OnboardingButton
          type="submit"
          form="lifestyle-form"
          disabled={!canSubmit}
        >
          Continue
        </OnboardingButton>
        <p className="mt-3 text-center text-body-sm text-slate">
          This helps us match rhythm, not just taste.
        </p>
      </div>
    </OnboardingFrame>
  );
}