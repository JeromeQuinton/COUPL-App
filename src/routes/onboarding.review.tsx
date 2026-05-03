import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { OnboardingFrame } from "@/components/onboarding/OnboardingFrame";
import { OnboardingButton } from "@/components/onboarding/OnboardingButton";

export const Route = createFileRoute("/onboarding/review")({
  head: () => ({
    meta: [
      { title: "Read it back to me — coupl" },
      {
        name: "description",
        content: "Before you enter, make sure this still feels like you.",
      },
    ],
  }),
  component: ReviewScreen,
});

const SECTIONS: Array<{
  label: string;
  value: string;
  editTo:
    | "/onboarding/name"
    | "/onboarding/intent"
    | "/onboarding/pace"
    | "/onboarding/values"
    | "/onboarding/lifestyle"
    | "/onboarding/prompts"
    | "/onboarding/photos"
    | "/onboarding/capacity";
}> = [
  { label: "Name", value: "Mira", editTo: "/onboarding/name" },
  { label: "Here for", value: "Honest dating", editTo: "/onboarding/intent" },
  {
    label: "Pace",
    value: "A few weeks of messages before meeting.",
    editTo: "/onboarding/pace",
  },
  {
    label: "Values",
    value:
      "Honesty over comfort · Repair · Slow over fast · Solitude alongside",
    editTo: "/onboarding/values",
  },
  {
    label: "Lifestyle",
    value:
      "Early reading · Coastal walk · Cooking supper · Allotment · Vinyl",
    editTo: "/onboarding/lifestyle",
  },
  { label: "Prompts", value: "3 written", editTo: "/onboarding/prompts" },
  { label: "Photos", value: "3 uploaded", editTo: "/onboarding/photos" },
  { label: "Capacity", value: "62 — Steady", editTo: "/onboarding/capacity" },
];

/**
 * Read-back review screen between checks and complete. Calm summary of
 * every onboarding answer with per-section edit links. Phase 1 uses
 * fixture values; Phase 4 will source from the onboarding draft store.
 */
function ReviewScreen() {
  const navigate = useNavigate();

  return (
    <OnboardingFrame backTo="/onboarding/checks">
      <div>
        <p className="text-mono-sm uppercase tracking-[0.14em] text-slate">
          Review
        </p>
        <h1 className="mt-3 text-display-xl text-ink">
          Read it back to me.
        </h1>
        <p className="mt-2 text-body-md text-slate">
          Before you enter, make sure this still feels like you.
        </p>
        <p className="mt-3 font-display italic text-body-md text-plum-500">
          Being seen accurately matters.
        </p>

        <ul className="mt-8 space-y-3">
          {SECTIONS.map((s) => (
            <li
              key={s.label}
              className="flex items-start justify-between gap-4 rounded-[14px] border border-line bg-paper px-4 py-4"
            >
              <div className="min-w-0 flex-1">
                <p className="text-mono-sm uppercase tracking-[0.14em] text-slate">
                  {s.label}
                </p>
                <p className="mt-1 text-body-md text-ink">{s.value}</p>
              </div>
              <Link
                to={s.editTo}
                className="shrink-0 self-center rounded-full px-3 py-1.5 text-label-mono text-plum-500 hover:bg-lavender-50"
              >
                Edit
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <OnboardingButton
          type="button"
          onClick={() => navigate({ to: "/onboarding/complete" })}
        >
          Complete profile
        </OnboardingButton>
        <p className="mt-3 text-center text-body-sm text-slate">
          You can adjust most things later.
        </p>
      </div>
    </OnboardingFrame>
  );
}