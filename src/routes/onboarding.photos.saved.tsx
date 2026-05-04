import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { OnboardingFrame } from "@/components/onboarding/OnboardingFrame";
import { OnboardingButton } from "@/components/onboarding/OnboardingButton";

/**
 * /onboarding/photos/saved — Banani UI-3218 "Photos Saved".
 *
 * R2-08 — quiet acknowledgement after photo-review completes. No
 * "great job", no "perfect". Plain noticing that the upload finished.
 *
 * Reads photo count from the onboarding draft in Phase 4. Phase 1
 * shows a fixed "six" since the existing review screen ships six.
 */

const PHOTO_COUNT: number = 6;

export const Route = createFileRoute("/onboarding/photos/saved")({
  head: () => ({
    meta: [
      { title: "Your photos are in — coupl" },
      {
        name: "description",
        content: "Photos uploaded. You can swap any of them later from your profile.",
      },
    ],
  }),
  component: PhotosSavedScreen,
});

function PhotosSavedScreen() {
  const navigate = useNavigate();

  const onContinue = () => {
    navigate({ to: "/home" });
  };

  return (
    <OnboardingFrame
      footer={
        <div className="px-5 pb-8 pt-4">
          <OnboardingButton type="button" onClick={onContinue}>
            Continue
          </OnboardingButton>
        </div>
      }
    >
      <div className="px-5 pt-12">
        <p className="text-label-mono">Onboarding · photos</p>
        <h1 className="mt-3 text-display-xl text-ink">Your photos are in.</h1>
      </div>

      <div className="px-5 pt-7">
        <p className="font-display text-[15px] italic leading-relaxed text-ink/85">
          {PHOTO_COUNT === 1 ? "One photo" : `${PHOTO_COUNT === 6 ? "Six" : PHOTO_COUNT} photos`} uploaded.
        </p>
        <p className="mt-2 font-display text-[15px] italic leading-relaxed text-ink/85">
          You can swap any of them later from your profile.
        </p>
      </div>
    </OnboardingFrame>
  );
}
