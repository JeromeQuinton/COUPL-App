import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { OnboardingFrame } from "@/components/onboarding/OnboardingFrame";
import { OnboardingButton } from "@/components/onboarding/OnboardingButton";
import { SelectablePill } from "@/components/onboarding/SelectablePill";

/**
 * /onboarding/interests — Discover Interests Select (UI-0531).
 *
 * Six grouped pill clusters: Movement · Make · Read · Music · Outdoors
 * · Food. Multi-select within each. Continue unlocks at 3+ across all
 * categories. Editorial eyebrow per spec (not the numbered StepEyebrow
 * pattern — onboarding chapter is mid-renumber).
 *
 * Voice: no "passion", no "unique you". Plain naming.
 *
 * DR refs: DR-INTERESTS-FIELDS (taxonomy confirmation pending).
 */
export const Route = createFileRoute("/onboarding/interests")({
  head: () => ({
    meta: [
      { title: "A few of the things you're drawn to — coupl" },
      {
        name: "description",
        content:
          "Pick a handful from each. We'll use it to surface, not to filter.",
      },
    ],
  }),
  component: InterestsScreen,
});

type InterestCategory =
  | "movement"
  | "make"
  | "read"
  | "music"
  | "outdoors"
  | "food";

const INTERESTS: Record<
  InterestCategory,
  { label: string; chips: string[] }
> = {
  movement: {
    label: "Movement",
    chips: [
      "Running",
      "Cycling",
      "Yoga",
      "Pilates",
      "Climbing",
      "Swimming",
      "Dancing",
      "Lifting",
    ],
  },
  make: {
    label: "Make",
    chips: [
      "Pottery",
      "Woodwork",
      "Knitting",
      "Painting",
      "Cooking",
      "Baking",
      "Photography",
      "Writing",
    ],
  },
  read: {
    label: "Read",
    chips: [
      "Literary fiction",
      "Essays",
      "Poetry",
      "Memoir",
      "History",
      "Long-form journalism",
      "Short stories",
      "Crime",
    ],
  },
  music: {
    label: "Music",
    chips: [
      "Live shows",
      "Vinyl",
      "Jazz",
      "Classical",
      "Electronic",
      "Folk",
      "Soul",
      "Hip-hop",
    ],
  },
  outdoors: {
    label: "Outdoors",
    chips: [
      "Long walks",
      "Hiking",
      "Sea swims",
      "Camping",
      "Allotment",
      "Birdwatching",
      "Open water",
      "Trails",
    ],
  },
  food: {
    label: "Food",
    chips: [
      "Slow cooking",
      "Markets",
      "Wine",
      "Coffee",
      "Vegetarian",
      "Bakeries",
      "New restaurants",
      "Pubs",
    ],
  },
};

const CATEGORY_KEYS = Object.keys(INTERESTS) as InterestCategory[];

function InterestsScreen() {
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
    // Phase 1: state-free. Phase 4 will save to onboarding draft.
    navigate({ to: "/onboarding/interests/refresh" });
  };

  return (
    <OnboardingFrame backTo="/onboarding/lifestyle">
      <form id="interests-form" onSubmit={onSubmit}>
        <p className="text-mono-sm uppercase tracking-[0.14em] text-slate">
          Onboarding · interests
        </p>
        <h1 className="mt-3 font-display text-[28px] leading-[1.15] text-ink">
          A few of the things you're drawn to.
        </h1>
        <p className="mt-2 font-body text-[14.5px] leading-relaxed text-slate">
          Pick at least three. More is fine.
        </p>

        <div className="mt-8 space-y-6">
          {CATEGORY_KEYS.map((cat) => (
            <fieldset key={cat}>
              <legend className="text-mono-sm uppercase tracking-[0.14em] text-slate">
                {INTERESTS[cat].label}
              </legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {INTERESTS[cat].chips.map((chip) => (
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

        <p className="mt-6 font-body text-[13.5px] text-slate">
          {selected.size} chosen
        </p>
      </form>

      <div className="mt-8">
        <OnboardingButton
          type="submit"
          form="interests-form"
          disabled={!canSubmit}
        >
          Continue
        </OnboardingButton>
      </div>
    </OnboardingFrame>
  );
}
