import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { OnboardingFrame } from "@/components/onboarding/OnboardingFrame";
import { OnboardingButton } from "@/components/onboarding/OnboardingButton";
import { SelectablePill } from "@/components/onboarding/SelectablePill";

/**
 * /onboarding/interests/refresh — Discover Interests refresh (UI-0532).
 *
 * Mirror of UI-0531 with the previously chosen chips pre-populated. In
 * Phase 1 we seed a small handful of defaults to demonstrate the
 * mirror; Phase 4 will read from the persisted onboarding draft.
 *
 * Voice: no second-guessing prompts. Plain confirmation.
 *
 * DR refs: DR-INTERESTS-FIELDS (same as UI-0531).
 */
export const Route = createFileRoute("/onboarding/interests/refresh")({
  head: () => ({
    meta: [
      { title: "Anything to add or take off? — coupl" },
      {
        name: "description",
        content:
          "Quick mirror of what you picked. Adjust if anything's off.",
      },
    ],
  }),
  component: InterestsRefreshScreen,
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

/** Phase-1 mirror: pre-seeded defaults so the screen reads as a refresh. */
const SEEDED: ReadonlyArray<string> = [
  "Long walks",
  "Pottery",
  "Vinyl",
  "Slow cooking",
];

function InterestsRefreshScreen() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(SEEDED),
  );

  const toggle = (chip: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(chip)) next.delete(chip);
      else next.add(chip);
      return next;
    });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Phase 1: state-free. Phase 4 will persist edits to draft.
    navigate({ to: "/onboarding/discover-lifestyle" });
  };

  return (
    <OnboardingFrame backTo="/onboarding/interests">
      <form id="interests-refresh-form" onSubmit={onSubmit}>
        <p className="text-mono-sm uppercase tracking-[0.14em] text-slate">
          Onboarding · interests · refresh
        </p>
        <h1 className="mt-3 font-display text-[28px] leading-[1.15] text-ink">
          Anything to add or take off?
        </h1>
        <p className="mt-3 font-display italic text-[14.5px] leading-relaxed text-plum-500">
          These shape what we surface, not what you'll see only.
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
          form="interests-refresh-form"
        >
          Looks right
        </OnboardingButton>
      </div>
    </OnboardingFrame>
  );
}
