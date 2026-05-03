import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { OnboardingFrame } from "@/components/onboarding/OnboardingFrame";
import { OnboardingButton } from "@/components/onboarding/OnboardingButton";
import { StepEyebrow } from "@/components/onboarding/StepEyebrow";

const CHECKS = [
  { n: 1, label: "ID document", hint: "Passport or driving licence." },
  { n: 2, label: "Liveness check", hint: "30 seconds — short selfie video." },
  { n: 3, label: "Social link (optional)", hint: "Instagram or LinkedIn." },
];

export const Route = createFileRoute("/onboarding/checks")({
  head: () => ({
    meta: [
      { title: "Three quick checks — coupl" },
      {
        name: "description",
        content: "Verified profiles get more replies. Under 2 min.",
      },
    ],
  }),
  component: ChecksScreen,
});

function ChecksScreen() {
  const navigate = useNavigate();

  return (
    <OnboardingFrame backTo="/onboarding/capacity">
      <StepEyebrow step={10} />
      <h1 className="mt-3 text-display-xl text-ink">Three quick checks.</h1>
      <p className="mt-2 text-body-md text-slate">
        Verified profiles get more replies. Under 2 min.
      </p>

      <ul className="mt-8 space-y-4">
        {CHECKS.map((c) => (
          <li
            key={c.n}
            className="flex items-start gap-4 rounded-[14px] border border-line bg-paper px-4 py-4"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lavender-50 text-body-md font-semibold text-plum-500">
              {c.n}
            </span>
            <div className="flex-1">
              <p className="text-body-md font-medium text-ink">{c.label}</p>
              <p className="mt-1 text-body-sm text-slate">{c.hint}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 space-y-3">
        <OnboardingButton
          type="button"
          onClick={() => navigate({ to: "/onboarding/complete" })}
        >
          Continue with social link
        </OnboardingButton>
        <button
          type="button"
          onClick={() => navigate({ to: "/onboarding/complete" })}
          className="w-full rounded-full px-5 py-3 text-body-md text-slate transition-colors hover:text-plum-500"
        >
          Skip social — verify ID only
        </button>
      </div>

      <p className="mt-6 text-body-sm text-slate">
        Verification stays private. We use it to keep the community honest, not to share with profiles.
      </p>
    </OnboardingFrame>
  );
}