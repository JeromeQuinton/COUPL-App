import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { OnboardingFrame } from "@/components/onboarding/OnboardingFrame";
import { OnboardingButton } from "@/components/onboarding/OnboardingButton";
import { RedactionPreview } from "@/components/verification/RedactionPreview";
import { ScreenHeader } from "@/components/shell/ScreenHeader";
import {
  REDACTED_FIELDS,
  RETENTION_COPY_PLACEHOLDER,
} from "@/data/verification_sample";

/**
 * /onboarding/checks/passport/review — review captured passport image
 * with R3-34 highlighted-fields overlay + fields-shared/blurred summary.
 *
 * Per DR-097, retention copy is held to a placeholder until vendor
 * integration architecture is signed off.
 */
export const Route = createFileRoute("/onboarding/checks/passport/review")({
  head: () => ({
    meta: [{ title: "Does this look right? — coupl" }],
  }),
  component: PassportReviewScreen,
});

function PassportReviewScreen() {
  const navigate = useNavigate();
  const fields = REDACTED_FIELDS.passport;

  return (
    <OnboardingFrame backTo="/onboarding/checks/passport/scan">
      <div>
        <ScreenHeader
          eyebrow="Verify · passport · review"
          title="Does this look right?"
          titleSize="display-xl"
        />
      </div>

      <div className="mt-7">
        <RedactionPreview fields={fields} />
      </div>

      <p className="mt-5 font-body text-[13px] italic leading-relaxed text-stone">
        {RETENTION_COPY_PLACEHOLDER}
      </p>

      <Link
        to="/onboarding/checks/redaction-review"
        className="mt-3 inline-flex text-label-mono text-plum-700 hover:text-plum-500"
      >
        Adjust what's shared →
      </Link>

      <div className="mt-8 space-y-3">
        <OnboardingButton
          type="button"
          variant="primary"
          onClick={() => navigate({ to: "/onboarding/checks/liveness" })}
        >
          Looks right
        </OnboardingButton>
        <OnboardingButton
          type="button"
          variant="secondary"
          onClick={() => navigate({ to: "/onboarding/checks/passport/scan" })}
        >
          Retake
        </OnboardingButton>
      </div>
    </OnboardingFrame>
  );
}
