import { useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { OnboardingFrame } from "@/components/onboarding/OnboardingFrame";
import { OnboardingButton } from "@/components/onboarding/OnboardingButton";
import { RedactionPreview } from "@/components/verification/RedactionPreview";
import { ScreenHeader } from "@/components/shell/ScreenHeader";
import {
  REDACTED_FIELDS,
  RETENTION_COPY_PLACEHOLDER,
  type DocumentType,
} from "@/data/verification_sample";

export const Route = createFileRoute("/onboarding/checks/redaction-review")({
  head: () => ({
    meta: [{ title: "Privacy review — coupl" }],
  }),
  component: RedactionReviewScreen,
});

function RedactionReviewScreen() {
  const navigate = useNavigate();
  // Phase 1: assume passport unless user has selected otherwise on R3-33.
  const docType: DocumentType = "passport";
  const fields = REDACTED_FIELDS[docType];

  const [overrides, setOverrides] = useState<Record<string, boolean>>(
    () =>
      fields.reduce(
        (acc, f) => ({ ...acc, [f.id]: f.defaultOn }),
        {} as Record<string, boolean>,
      ),
  );

  const required = fields.filter((f) => f.requirement === "required");
  const optional = fields.filter((f) => f.requirement === "optional");

  const previewFields = useMemo(
    () => fields.map((f) => ({ ...f, defaultOn: overrides[f.id] ?? f.defaultOn })),
    [fields, overrides],
  );

  return (
    <OnboardingFrame backTo="/onboarding/checks/passport/review">
      <div>
        <ScreenHeader
          eyebrow="Verify · privacy review"
          title="Choose what's shared from this document."
          titleSize="display-xl"
        />
        <p className="mt-2 text-body-md text-slate">
          To verify you, we only need a few details. Some are required for
          this check; others are your choice.
        </p>
      </div>

      <section className="mt-7">
        <p className="text-label-mono">These need to be on to complete verification</p>
        <ul className="mt-3 space-y-2">
          {required.map((f) => (
            <li
              key={f.id}
              className="flex items-start justify-between gap-3 rounded-[14px] bg-paper px-4 py-3.5 shadow-elev-1"
            >
              <div className="flex-1">
                <p className="font-display text-[14px] text-ink">{f.label}</p>
                <p className="mt-1 font-body text-[12.5px] text-stone">{f.explainer}</p>
              </div>
              <span className="rounded-full bg-plum-700 px-3 py-1 text-label-mono text-paper">
                On
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <p className="text-label-mono">Optional — your choice</p>
        <p className="mt-1 font-body text-[12px] text-stone">
          If you turn one off, it'll be blurred before we send the image.
        </p>
        <ul className="mt-3 space-y-2">
          {optional.map((f) => {
            const on = overrides[f.id] ?? f.defaultOn;
            return (
              <li
                key={f.id}
                className="rounded-[14px] bg-paper px-4 py-3.5 shadow-elev-1"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-display text-[14px] text-ink">{f.label}</p>
                    <p className="mt-1 font-body text-[12.5px] text-stone">
                      {f.explainer}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setOverrides((p) => ({ ...p, [f.id]: !on }))
                    }
                    aria-pressed={on}
                    className={
                      on
                        ? "rounded-full bg-plum-700 px-3 py-1.5 text-label-mono text-paper"
                        : "rounded-full border border-line bg-paper px-3 py-1.5 text-label-mono text-slate hover:bg-lavender-50"
                    }
                  >
                    {on ? "On" : "Off — blurred"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-7">
        <p className="text-label-mono">What we'll send</p>
        <div className="mt-3">
          <RedactionPreview fields={previewFields} />
        </div>
      </section>

      <p className="mt-5 font-body text-[13px] italic leading-relaxed text-stone">
        {RETENTION_COPY_PLACEHOLDER}
      </p>

      <p className="mt-3 font-body text-[12px] text-stone">
        If a check doesn't go through later, we'll show a soft prompt asking
        whether you'd share a specific field just for that step. You stay in
        control of what's kept afterwards.
      </p>

      <div className="mt-7">
        <OnboardingButton
          type="button"
          variant="primary"
          onClick={() => navigate({ to: "/onboarding/checks/liveness" })}
        >
          Continue with these settings
        </OnboardingButton>
      </div>
    </OnboardingFrame>
  );
}
