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

type LifestyleCategory = "mornings" | "evenings" | "weekends";

const LIFESTYLE: Record<
  LifestyleCategory,
  { label: string; chips: string[] }
> = {
  mornings: {
    label: "Mornings",
    chips: [
      "Early reading",
      "Coffee rituals",
      "Run before work",
      "Meditation",
      "Journal",
      "Podcast commute",
    ],
  },
  evenings: {
    label: "Evenings",
    chips: [
      "Cooking supper",
      "Pub with friends",
      "Bath and book",
      "Vinyl",
      "Evening walk",
      "Early bed",
    ],
  },
  weekends: {
    label: "Weekends",
    chips: [
      "Sunday papers",
      "Coastal walk",
      "Hosting lunch",
      "Live music",
      "Allotment",
      "Quiet forest",
    ],
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

  const canSubmit = selected.size >= 5;

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
          Show us your week.
        </h1>
        <p className="mt-2 text-body-md text-slate">
          Not highlights. The shape of your mornings, evenings, and weekends.
        </p>
        <p className="mt-3 font-display italic text-body-md text-plum-500">
          Compatibility lives in repetition.
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
          {selected.size} chosen · pick 5 or more across the three sections
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
          Rhythm reveals more than hobbies.
        </p>
      </div>
    </OnboardingFrame>
  );
}