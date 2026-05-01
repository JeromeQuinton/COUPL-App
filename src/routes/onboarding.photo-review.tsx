import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { OnboardingFrame } from "@/components/onboarding/OnboardingFrame";
import { OnboardingButton } from "@/components/onboarding/OnboardingButton";
import { ReviewProgressTracker } from "@/components/onboarding/ReviewProgressTracker";

export const Route = createFileRoute("/onboarding/photo-review")({
  head: () => ({
    meta: [
      { title: "Photo review — coupl" },
      {
        name: "description",
        content:
          "Three pairs of eyes. About 14 hours left. Every photo is reviewed by trained humans.",
      },
    ],
  }),
  component: PhotoReviewScreen,
});

const PENDING: Array<{ id: number; gradient: string }> = [
  { id: 1, gradient: "bg-gradient-to-br from-lavender-100 to-plum-300" },
  { id: 2, gradient: "bg-gradient-to-br from-lavender-50 to-plum-500" },
  { id: 3, gradient: "bg-gradient-to-br from-beeswax-100 to-beeswax-300" },
];

/**
 * Photo review pending state. Reachable after Complete when human
 * review is in flight. Not part of the 1–9 numbered ladder — it's a
 * post-onboarding holding screen, so no StepEyebrow.
 */
function PhotoReviewScreen() {
  const navigate = useNavigate();

  return (
    <OnboardingFrame
      footer={
        <p className="pt-6 text-center text-body-sm text-slate">
          You can browse, reflect, and edit your prompts while you wait.
          Discovery opens once your photos are released.
        </p>
      }
    >
      <p className="text-label-mono">Photo review</p>
      <h1 className="mt-2 text-display-xl text-ink">
        Three pairs of eyes.
        <br />
        About 14 hours left.
      </h1>
      <p className="mt-3 text-body-md text-slate">
        Every photo is reviewed by trained humans before it's shown to
        anyone. We're never automated.
      </p>

      <section className="mt-8 rounded-[20px] bg-beeswax-100 p-5">
        <div className="flex items-center justify-between text-label-mono">
          <span>Submitted 10h ago</span>
          <span>est. 14h remaining</span>
        </div>
        <div className="mt-5">
          <ReviewProgressTracker currentIndex={1} />
        </div>
      </section>

      <section className="mt-6">
        <div className="grid grid-cols-3 gap-3">
          {PENDING.map((p) => (
            <div
              key={p.id}
              className={`relative aspect-[4/5] w-full overflow-hidden rounded-[16px] ${p.gradient}`}
              aria-label="Pending photo"
            >
              <span className="absolute inset-x-0 bottom-3 text-center text-mono-sm uppercase tracking-[0.12em] text-paper/90">
                Pending
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-8">
        <OnboardingButton
          type="button"
          onClick={() => navigate({ to: "/onboarding/prompts" })}
        >
          Edit prompts in the meantime
        </OnboardingButton>
      </div>
    </OnboardingFrame>
  );
}