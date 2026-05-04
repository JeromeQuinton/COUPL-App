import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { OnboardingFrame } from "@/components/onboarding/OnboardingFrame";
import { OnboardingButton } from "@/components/onboarding/OnboardingButton";
import { ScreenHeader } from "@/components/shell/ScreenHeader";

export const Route = createFileRoute("/system/verification-failed")({
  head: () => ({
    meta: [
      { title: "Something didn't match — coupl" },
      {
        name: "description",
        content: "One or more details need another look before we proceed.",
      },
    ],
  }),
  component: MismatchScreen,
});

function MismatchScreen() {
  const navigate = useNavigate();

  return (
    <OnboardingFrame>
      <div className="pt-12">
        <ScreenHeader
          eyebrow="Verification"
          title="Something didn't match."
          titleSize="display-xl"
        />
        <p className="mt-3 text-body-md text-slate">
          One or more details need another look before we proceed.
        </p>
        <p className="mt-4 text-body-sm italic text-stone">
          Verification is protection, not punishment.
        </p>
      </div>

      <div className="mt-12 space-y-3">
        <OnboardingButton
          type="button"
          variant="primary"
          onClick={() => navigate({ to: "/onboarding/checks" })}
        >
          Try again
        </OnboardingButton>
        <button
          type="button"
          onClick={() => navigate({ to: "/" })}
          className="w-full rounded-full px-5 py-3 text-center font-body text-[13.5px] text-slate hover:text-plum-500"
        >
          Get help
        </button>
        <p className="mt-3 text-center text-body-sm italic text-stone">
          This does not automatically remove access.
        </p>
      </div>
    </OnboardingFrame>
  );
}
