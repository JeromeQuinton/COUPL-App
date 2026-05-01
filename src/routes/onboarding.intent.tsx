import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { OnboardingFrame } from "@/components/onboarding/OnboardingFrame";
import { OnboardingButton } from "@/components/onboarding/OnboardingButton";
import { StepEyebrow } from "@/components/onboarding/StepEyebrow";
import { ChoiceCard } from "@/components/onboarding/ChoiceCard";

export const Route = createFileRoute("/onboarding/intent")({
  head: () => ({
    meta: [
      { title: "What are you here for? — coupl" },
      {
        name: "description",
        content:
          "Pick the one that's truest today. You can change this anytime.",
      },
    ],
  }),
  component: IntentScreen,
});

type IntentValue = "long_term" | "exploring" | "friendship";

const OPTIONS: Array<{ value: IntentValue; label: string; hint: string }> = [
  {
    value: "long_term",
    label: "Long, real partnership",
    hint: "Open to one person. Patient with the search.",
  },
  {
    value: "exploring",
    label: "Slowly figuring it out",
    hint: "Curious. Ready to learn what fits.",
  },
  {
    value: "friendship",
    label: "Someone to grow with",
    hint: "Friendship-first, romance possible.",
  },
];

/**
 * Screen 03 of 9 — Intent selection.
 *
 * Three card-style radio options. Selection is local-state only here;
 * persistence into the onboarding draft store lands when the rest of
 * the chapter is wired (steps 4+).
 */
function IntentScreen() {
  const navigate = useNavigate();
  const [intent, setIntent] = useState<IntentValue | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!intent) return;
    navigate({ to: "/onboarding/pace" });
  };

  return (
    <OnboardingFrame backTo="/onboarding/verify">
      <form id="intent-form" onSubmit={onSubmit}>
        <StepEyebrow step={3} />
        <h1 className="mt-3 text-display-xl text-ink">
          What are you here for?
        </h1>
        <p className="mt-2 text-body-md text-slate">
          Pick the one that's truest today. You can change this anytime.
        </p>

        <fieldset className="mt-8 space-y-3">
          <legend className="sr-only">Choose one</legend>
          {OPTIONS.map((opt) => (
            <ChoiceCard
              key={opt.value}
              name="intent"
              value={opt.value}
              label={opt.label}
              hint={opt.hint}
              checked={intent === opt.value}
              onChange={() => setIntent(opt.value)}
            />
          ))}
        </fieldset>
      </form>

      <div className="mt-8">
        <OnboardingButton type="submit" form="intent-form" disabled={!intent}>
          Continue
        </OnboardingButton>
      </div>
    </OnboardingFrame>
  );
}