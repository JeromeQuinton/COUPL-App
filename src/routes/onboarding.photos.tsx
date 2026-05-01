import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Info } from "lucide-react";
import { OnboardingFrame } from "@/components/onboarding/OnboardingFrame";
import { OnboardingButton } from "@/components/onboarding/OnboardingButton";
import { StepEyebrow } from "@/components/onboarding/StepEyebrow";
import { PhotoSlot } from "@/components/onboarding/PhotoSlot";

export const Route = createFileRoute("/onboarding/photos")({
  head: () => ({
    meta: [
      { title: "Three photos. No filters. — coupl" },
      {
        name: "description",
        content:
          "One face-clear. One you in motion. One that means something.",
      },
    ],
  }),
  component: PhotosScreen,
});

type Slot = {
  tag: string;
  gradient: string;
  filled: boolean;
};

const REQUIRED_INITIAL: Slot[] = [
  {
    tag: "Face",
    gradient: "bg-gradient-to-br from-sky-200 to-indigo-300",
    filled: true,
  },
  {
    tag: "Motion",
    gradient: "bg-gradient-to-br from-emerald-200 to-teal-400",
    filled: true,
  },
  {
    tag: "Meaning",
    gradient: "bg-gradient-to-br from-amber-200 to-orange-400",
    filled: true,
  },
];

/**
 * Screen 06 of 9 — Photos.
 *
 * Three required photo slots (rendered as pre-filled gradient stubs in
 * Phase 1) plus three optional empty slots beneath. No upload backend
 * yet — local placeholder state only. The honey-coloured note carries
 * the trust copy from the reference.
 */
function PhotosScreen() {
  const navigate = useNavigate();
  const [required] = useState<Slot[]>(REQUIRED_INITIAL);

  const requiredCount = required.filter((s) => s.filled).length;
  const canSubmit = requiredCount >= 3;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;
    // Prompts step (07) not built yet — bounce to the existing complete
    // screen so the flow doesn't dead-end during review.
    navigate({ to: "/onboarding/complete" });
  };

  return (
    <OnboardingFrame backTo="/onboarding/values">
      <form id="photos-form" onSubmit={onSubmit}>
        <StepEyebrow step={6} />
        <h1 className="mt-3 text-display-xl text-ink">
          Three photos. No filters.
        </h1>
        <p className="mt-2 text-body-md text-slate">
          One face-clear. One you in motion. One that means something.
        </p>

        <div className="mt-8 grid grid-cols-3 gap-3">
          {required.map((s, i) => (
            <PhotoSlot
              key={`req-${i}`}
              tag={s.tag}
              filled={s.filled}
              gradientClass={s.gradient}
            />
          ))}
        </div>

        <div className="mt-3 grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <PhotoSlot key={`opt-${i}`} filled={false} />
          ))}
        </div>

        <div className="mt-6 flex gap-3 rounded-[14px] bg-amber-50 p-4 text-body-sm text-ink">
          <Info
            className="mt-0.5 h-4 w-4 shrink-0 text-amber-700"
            aria-hidden
          />
          <p>
            Heads up: photos are reviewed by humans within 24h. We block
            heavy filters and group photo where you're not centered.
          </p>
        </div>
      </form>

      <div className="mt-8">
        <OnboardingButton
          type="submit"
          form="photos-form"
          disabled={!canSubmit}
        >
          Continue
        </OnboardingButton>
      </div>
    </OnboardingFrame>
  );
}