import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { OnboardingFrame } from "@/components/onboarding/OnboardingFrame";
import { OnboardingButton } from "@/components/onboarding/OnboardingButton";
import { ScreenHeader } from "@/components/shell/ScreenHeader";

export const Route = createFileRoute("/onboarding/checks/id-select")({
  head: () => ({
    meta: [{ title: "Choose your ID — coupl" }],
  }),
  component: IDSelectScreen,
});

type IDType = "passport" | "licence" | "national-id";

function IDSelectScreen() {
  const navigate = useNavigate();
  const [pick, setPick] = useState<IDType | null>(null);

  return (
    <OnboardingFrame backTo="/onboarding/checks">
      <div>
        <ScreenHeader
          eyebrow="Verify · choose ID"
          title="Choose how to prove it's you."
          titleSize="display-xl"
        />
        <p className="mt-2 text-body-md text-slate">
          We ask for one official document once, to help keep impersonation
          and fake profiles out of COUPL.
        </p>
      </div>

      <div className="mt-8 space-y-3">
        {([
          { id: "passport", label: "Passport", hint: "Best for most UK citizens." },
          { id: "licence", label: "Driving licence", hint: "If you don't have a passport, a UK licence works too." },
          { id: "national-id", label: "National ID card", hint: "If you have a national identity card." },
        ] as Array<{ id: IDType; label: string; hint: string }>).map((opt) => {
          const active = pick === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setPick(opt.id)}
              className={`w-full rounded-[14px] border px-4 py-3.5 text-left transition-colors ${
                active
                  ? "border-plum-500 bg-lavender-100"
                  : "border-line bg-paper hover:bg-lavender-50"
              }`}
            >
              <p className={`font-display text-[15px] font-semibold ${active ? "text-plum-700" : "text-ink"}`}>
                {opt.label}
              </p>
              <p className="mt-0.5 font-body text-[12.5px] text-slate">{opt.hint}</p>
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        <OnboardingButton
          type="button"
          variant="primary"
          disabled={!pick}
          onClick={() =>
            navigate({
              to:
                pick === "passport"
                  ? "/onboarding/checks/passport/scan"
                  : "/onboarding/checks/id-scan",
            })
          }
        >
          Continue
        </OnboardingButton>
        <p className="mt-3 text-center text-body-sm italic text-stone">
          You can skip this step for now, but some features may stay limited
          until you've verified.
        </p>
      </div>
    </OnboardingFrame>
  );
}
