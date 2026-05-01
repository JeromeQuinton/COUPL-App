import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { OnboardingFrame } from "@/components/onboarding/OnboardingFrame";
import { OnboardingButton } from "@/components/onboarding/OnboardingButton";
import { StepEyebrow } from "@/components/onboarding/StepEyebrow";
import { PromptCard } from "@/components/onboarding/PromptCard";

export const Route = createFileRoute("/onboarding/prompts")({
  head: () => ({
    meta: [
      { title: "Three prompts. Be specific. — coupl" },
      {
        name: "description",
        content: "The best openings come from one true detail.",
      },
    ],
  }),
  component: PromptsScreen,
});

const PROMPTS: string[] = [
  "I get unreasonably excited about",
  "I'd rather skip small talk about",
  "Therapy taught me",
];

/**
 * Screen 07 of 9 — Prompts.
 *
 * Three editable prompt cards. The CTA unlocks once any prompt has
 * been answered. We don't gate on all three — the spec rewards depth,
 * not completion theatre. Coach guidance lives in the soft footer.
 */
function PromptsScreen() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<string[]>(["", "", ""]);

  const filled = answers.filter((a) => a.trim().length > 0).length;
  const canSubmit = filled >= 1;

  const update = (i: number, v: string) =>
    setAnswers((prev) => prev.map((a, idx) => (idx === i ? v : a)));

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;
    navigate({ to: "/onboarding/capacity" });
  };

  return (
    <OnboardingFrame backTo="/onboarding/photos">
      <form id="prompts-form" onSubmit={onSubmit}>
        <StepEyebrow step={7} />
        <h1 className="mt-3 text-display-xl text-ink">
          Three prompts. Be specific.
        </h1>
        <p className="mt-2 text-body-md text-slate">
          The best openings come from one true detail.
        </p>

        <div className="mt-8 space-y-3">
          {PROMPTS.map((p, i) => (
            <PromptCard
              key={p}
              prompt={p}
              active={answers[i].trim().length > 0}
              value={answers[i]}
              onChange={(e) => update(i, e.target.value)}
              aria-label={p}
            />
          ))}
        </div>

        <aside className="mt-6 flex gap-3 rounded-[14px] bg-beeswax-100 p-4 text-body-sm text-ink">
          <Sparkles
            className="mt-0.5 h-4 w-4 shrink-0 text-caution"
            aria-hidden
          />
          <p>
            <span className="font-semibold">Reflection:</span> the second
            prompt is good — it asks for vulnerability without performing it.
          </p>
        </aside>
      </form>

      <div className="mt-8">
        <OnboardingButton
          type="submit"
          form="prompts-form"
          disabled={!canSubmit}
        >
          Continue
        </OnboardingButton>
      </div>
    </OnboardingFrame>
  );
}