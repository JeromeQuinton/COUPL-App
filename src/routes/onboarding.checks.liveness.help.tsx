import { createFileRoute, Link } from "@tanstack/react-router";
import { OnboardingFrame } from "@/components/onboarding/OnboardingFrame";

export const Route = createFileRoute("/onboarding/checks/liveness/help")({
  head: () => ({
    meta: [{ title: "Trouble with the selfie? — coupl" }],
  }),
  component: LivenessHelpScreen,
});

function LivenessHelpScreen() {
  return (
    <OnboardingFrame backTo="/onboarding/checks/liveness">
      <div>
        <p className="text-label-mono">Verify · help</p>
        <h1 className="mt-3 text-display-xl text-ink">
          Trouble with the selfie?
        </h1>
      </div>

      <section className="mt-8 space-y-4">
        <p className="font-body text-[14px] leading-relaxed text-ink">
          Lighting matters most. Face a window or a lamp — backlight throws the
          camera off and washes out detail.
        </p>
        <p className="font-body text-[14px] leading-relaxed text-ink">
          Glasses and hats can confuse the check. Take them off if there's
          glare; otherwise leave them on. Hair across the face is the same
          story.
        </p>
        <p className="font-body text-[14px] leading-relaxed text-ink">
          If it still fails, retry once with the phone held at arm's length.
          Most second attempts pass.
        </p>
      </section>

      <div className="mt-10 space-y-3">
        <Link
          to="/onboarding/checks/liveness"
          className="flex items-center justify-center w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90"
        >
          Try again
        </Link>
        <Link
          to="/profile/help/contact"
          className="block w-full rounded-full px-5 py-3 text-center font-body text-[13.5px] text-slate hover:text-plum-500"
        >
          Contact support
        </Link>
      </div>
    </OnboardingFrame>
  );
}
