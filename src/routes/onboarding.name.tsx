import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { OnboardingFrame } from "@/components/onboarding/OnboardingFrame";
import { OnboardingButton } from "@/components/onboarding/OnboardingButton";
import { StepEyebrow } from "@/components/onboarding/StepEyebrow";

export const Route = createFileRoute("/onboarding/name")({
  head: () => ({
    meta: [
      { title: "What should we call you? — coupl" },
      {
        name: "description",
        content: "Just a first name. Honest, not optimised.",
      },
    ],
  }),
  component: NameScreen,
});

function NameScreen() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) return;
    navigate({ to: "/onboarding/intent" });
  };

  return (
    <OnboardingFrame backTo="/onboarding/intent">
      <form id="name-form" onSubmit={onSubmit}>
        <StepEyebrow step={2} />
        <h1 className="mt-3 text-display-xl text-ink">
          What should we call you?
        </h1>
        <p className="mt-2 text-body-md text-slate">
          Just a first name. Honest, not optimised.
        </p>

        <div className="mt-8">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Sam"
            autoComplete="given-name"
            aria-label="First name"
            required
            minLength={1}
            className="w-full rounded-[14px] border border-line bg-paper px-4 py-3 text-display-xl text-ink placeholder:font-body placeholder:text-stone focus:border-plum-500 focus:outline-none"
          />
          <p className="mt-3 text-body-sm text-slate">
            This is what others will see.
          </p>
        </div>
      </form>

      <div className="mt-8">
        <OnboardingButton type="submit" form="name-form" disabled={!name.trim()}>
          Continue
        </OnboardingButton>
      </div>
    </OnboardingFrame>
  );
}