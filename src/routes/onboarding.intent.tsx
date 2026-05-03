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

type IntentValue = "long_term" | "exploring" | "honest_dating" | "friendship";

const OPTIONS: Array<{ value: IntentValue; label: string; hint: string }> = [
  {
    value: "long_term",
    label: "Long-term partnership",
    hint: "Building toward depth and commitment.",
  },
  {
    value: "exploring",
    label: "Relationship, exploring",
    hint: "Open to where it leads.",
  },
  {
    value: "honest_dating",
    label: "Honest dating",
    hint: "Meeting real people, no pretence.",
  },
  {
    value: "friendship",
    label: "Friendship first",
    hint: "Connection without pressure.",
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
    <OnboardingFrame backTo="/onboarding/name">
      <form id="intent-form" onSubmit={onSubmit}>
        <StepEyebrow step={3} />
        <h1 className="mt-3 text-display-xl text-ink">
          What brings you here?
        </h1>
        <p className="mt-2 text-body-md text-slate">
          You can change this anytime. No-one is shown your intent without context.
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

        <p className="mt-6 text-body-sm text-slate">
          There's no right answer. The clearer you are with yourself, the more useful this becomes — for you and for the people you meet.
        </p>
      </form>

      <div className="mt-8">
        <OnboardingButton type="submit" form="intent-form" disabled={!intent}>
          Continue
        </OnboardingButton>
      </div>
    </OnboardingFrame>
  );
}