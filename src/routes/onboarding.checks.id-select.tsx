import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { OnboardingFrame } from "@/components/onboarding/OnboardingFrame";
import { OnboardingButton } from "@/components/onboarding/OnboardingButton";

export const Route = createFileRoute("/onboarding/checks/id-select")({
  head: () => ({
    meta: [{ title: "Choose your ID — coupl" }],
  }),
  component: IDSelectScreen,
});

type IDType = "passport" | "licence";

function IDSelectScreen() {
  const navigate = useNavigate();
  const [pick, setPick] = useState<IDType | null>(null);

  return (
    <OnboardingFrame backTo="/onboarding/checks">
      <div>
        <p className="text-label-mono">Verification · 1 of 3</p>
        <h1 className="mt-3 text-display-xl text-ink">Which document?</h1>
        <p className="mt-2 text-body-md text-slate">
          Either works. Whichever's easier to find right now.
        </p>
      </div>

      <div className="mt-8 space-y-3">
        {([
          { id: "passport", label: "Passport", hint: "Photo page only." },
          { id: "licence", label: "Driving licence", hint: "Front and back." },
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
          Your document is encrypted at upload, used once, then deleted.
        </p>
      </div>
    </OnboardingFrame>
  );
}
