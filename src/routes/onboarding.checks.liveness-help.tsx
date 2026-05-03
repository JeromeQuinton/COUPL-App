import { createFileRoute, Link } from "@tanstack/react-router";
import { OnboardingFrame } from "@/components/onboarding/OnboardingFrame";
import { OnboardingButton } from "@/components/onboarding/OnboardingButton";

export const Route = createFileRoute("/onboarding/checks/liveness-help")({
  head: () => ({
    meta: [{ title: "Liveness help — coupl" }],
  }),
  component: LivenessHelpScreen,
});

const TIPS = [
  { label: "Light", body: "Face a window or lamp. Avoid backlight." },
  { label: "Distance", body: "Phone roughly arm's length away." },
  { label: "Frame", body: "Keep the whole face inside the circle." },
  { label: "Glasses", body: "Off if there's reflection. On is fine if not." },
];

function LivenessHelpScreen() {
  return (
    <OnboardingFrame backTo="/onboarding/checks/liveness">
      <div>
        <p className="text-label-mono">Liveness · help</p>
        <h1 className="mt-3 text-display-xl text-ink">Four small things.</h1>
        <p className="mt-2 text-body-md text-slate">
          Most failures come from one of these. Try once more.
        </p>
      </div>

      <ul className="mt-8 space-y-2.5">
        {TIPS.map((t) => (
          <li
            key={t.label}
            className="rounded-[14px] border border-line bg-paper px-4 py-3.5"
          >
            <p className="text-label-mono">{t.label}</p>
            <p className="mt-1 font-body text-[13.5px] text-ink">{t.body}</p>
          </li>
        ))}
      </ul>

      <div className="mt-8 space-y-3">
        <Link
          to="/onboarding/checks/liveness"
          className="flex items-center justify-center w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90"
        >
          Try again
        </Link>
        <p className="text-center font-body text-[12.5px] italic text-stone">
          Still stuck? Skip for now — you can verify later from Profile.
        </p>
        <Link
          to="/onboarding/review"
          className="block w-full rounded-full px-5 py-3 text-center font-body text-[13.5px] text-slate hover:text-plum-500"
        >
          Skip for now
        </Link>
      </div>
    </OnboardingFrame>
  );
}
