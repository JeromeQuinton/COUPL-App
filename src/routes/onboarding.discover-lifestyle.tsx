import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { OnboardingFrame } from "@/components/onboarding/OnboardingFrame";
import { OnboardingButton } from "@/components/onboarding/OnboardingButton";
import { SelectablePill } from "@/components/onboarding/SelectablePill";

/**
 * /onboarding/discover-lifestyle — Discover Lifestyle (UI-0054).
 *
 * Three single-select pill groups: Pace · Routine · Energy. These
 * weight Discover surfacing — they don't filter. Distinct from the
 * Lifestyle Habits surface (UI-0016 / onboarding.lifestyle).
 *
 * Voice: no personality-test language. Plain naming.
 *
 * DR refs: DR-LIFESTYLE-FIELDS.
 */
export const Route = createFileRoute("/onboarding/discover-lifestyle")({
  head: () => ({
    meta: [
      { title: "What kind of life you keep — coupl" },
      {
        name: "description",
        content:
          "Pace, routine, energy. Quick read of how you live, not who you are.",
      },
    ],
  }),
  component: DiscoverLifestyleScreen,
});

type Group = "pace" | "routine" | "energy";

const GROUPS: Record<Group, { label: string; options: string[] }> = {
  pace: { label: "Pace", options: ["Slow", "Steady", "Spirited"] },
  routine: { label: "Routine", options: ["Anchored", "Variable", "In-flux"] },
  energy: { label: "Energy", options: ["Quiet", "Mid", "Lively"] },
};

const GROUP_KEYS = Object.keys(GROUPS) as Group[];

function DiscoverLifestyleScreen() {
  const navigate = useNavigate();
  const [picked, setPicked] = useState<Partial<Record<Group, string>>>({});

  const choose = (group: Group, value: string) => {
    setPicked((prev) => ({ ...prev, [group]: value }));
  };

  const canSubmit = GROUP_KEYS.every((g) => Boolean(picked[g]));

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;
    // Phase 1: state-free. Phase 4 will save the three picks to draft.
    navigate({ to: "/onboarding/photos" });
  };

  return (
    <OnboardingFrame backTo="/onboarding/interests/refresh">
      <form id="discover-lifestyle-form" onSubmit={onSubmit}>
        <p className="text-mono-sm uppercase tracking-[0.14em] text-slate">
          Onboarding · what you're drawn to
        </p>
        <h1 className="mt-3 font-display text-[28px] leading-[1.15] text-ink">
          What kind of life you keep.
        </h1>
        <p className="mt-2 font-body text-[14.5px] leading-relaxed text-slate">
          Three quick reads. Not a test.
        </p>

        <div className="mt-8 space-y-6">
          {GROUP_KEYS.map((g) => (
            <fieldset key={g}>
              <legend className="text-mono-sm uppercase tracking-[0.14em] text-slate">
                {GROUPS[g].label}
              </legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {GROUPS[g].options.map((opt) => (
                  <SelectablePill
                    key={opt}
                    label={opt}
                    selected={picked[g] === opt}
                    onClick={() => choose(g, opt)}
                  />
                ))}
              </div>
            </fieldset>
          ))}
        </div>
      </form>

      <div className="mt-8">
        <OnboardingButton
          type="submit"
          form="discover-lifestyle-form"
          disabled={!canSubmit}
        >
          Continue
        </OnboardingButton>
      </div>
    </OnboardingFrame>
  );
}
