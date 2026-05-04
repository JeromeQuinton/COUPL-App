import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { OnboardingFrame } from "@/components/onboarding/OnboardingFrame";
import { OnboardingButton } from "@/components/onboarding/OnboardingButton";
import { RedactionPreview } from "@/components/verification/RedactionPreview";
import { ScreenHeader } from "@/components/shell/ScreenHeader";
import {
  REDACTED_FIELDS,
  RETENTION_COPY_PLACEHOLDER,
} from "@/data/verification_sample";

export const Route = createFileRoute("/onboarding/checks/licence/review")({
  head: () => ({ meta: [{ title: "Review licence — coupl" }] }),
  component: LicenceReviewScreen,
});

type Side = "front" | "back";

function LicenceReviewScreen() {
  const navigate = useNavigate();
  const [side, setSide] = useState<Side>("front");
  const fields = REDACTED_FIELDS.licence;

  return (
    <OnboardingFrame backTo="/onboarding/checks/licence/scan">
      <div>
        <ScreenHeader
          eyebrow="Verify · licence · review"
          title="Does this look right?"
          titleSize="display-xl"
        />
      </div>

      <div className="mt-6 flex gap-1.5" role="tablist" aria-label="Side">
        {(["front", "back"] as Side[]).map((s) => {
          const active = side === s;
          return (
            <button
              key={s}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setSide(s)}
              className={
                active
                  ? "flex-1 rounded-full bg-plum-700 px-3 py-1.5 text-label-mono text-paper"
                  : "flex-1 rounded-full border border-line bg-paper px-3 py-1.5 text-label-mono text-slate hover:bg-lavender-50"
              }
            >
              {s === "front" ? "Front" : "Back"}
            </button>
          );
        })}
      </div>

      <div className="mt-5">
        <RedactionPreview fields={fields} side={side} />
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

      <div className="mt-7 space-y-3">
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
          onClick={() => navigate({ to: "/onboarding/checks/licence/scan" })}
        >
          Retake
        </OnboardingButton>
      </div>
    </OnboardingFrame>
  );
}
