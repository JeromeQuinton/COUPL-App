import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Camera, ChevronDown, ChevronUp } from "lucide-react";
import { OnboardingFrame } from "@/components/onboarding/OnboardingFrame";
import { OnboardingButton } from "@/components/onboarding/OnboardingButton";

export const Route = createFileRoute("/onboarding/checks/licence/scan")({
  head: () => ({ meta: [{ title: "Capture licence — coupl" }] }),
  component: LicenceScanScreen,
});

type Side = "front" | "back";

function LicenceScanScreen() {
  const navigate = useNavigate();
  const [side, setSide] = useState<Side>("front");
  const [captured, setCaptured] = useState<{ front: boolean; back: boolean }>({
    front: false,
    back: false,
  });
  const [feedback, setFeedback] = useState(false);
  const [whyOpen, setWhyOpen] = useState(false);

  useEffect(() => {
    if (!feedback) return;
    const t = setTimeout(() => {
      setFeedback(false);
      if (side === "front") setSide("back");
      else navigate({ to: "/onboarding/checks/licence/review" });
    }, 1100);
    return () => clearTimeout(t);
  }, [feedback, side, navigate]);

  const onCapture = () => {
    setCaptured((p) => ({ ...p, [side]: true }));
    setFeedback(true);
  };

  return (
    <OnboardingFrame backTo="/onboarding/checks/id-select">
      <div>
        <p className="text-label-mono">Verify · licence</p>
        <h1 className="mt-3 text-display-xl text-ink">
          {side === "front" ? "Front of your licence." : "Back of your licence."}
        </h1>
        <p className="mt-2 text-body-md text-slate">
          Keep it flat, with all details visible. We'll guide you if anything
          needs adjusting.
        </p>
      </div>

      <div className="mt-8 grid place-items-center">
        <div
          aria-hidden
          className="aspect-[3/2] w-full rounded-[18px] border-2 border-dashed border-plum-300/50 bg-paper/50 grid place-items-center"
        >
          <div className="flex flex-col items-center gap-2 text-stone">
            <Camera size={32} strokeWidth={1.5} />
            <p className="text-label-mono">
              {feedback ? "We've captured what we need" : "Auto-capture on edge detect"}
            </p>
          </div>
        </div>
      </div>

      <p className="mt-6 text-center font-body text-[12.5px] italic text-stone">
        If auto-capture doesn't trigger, tap Capture manually.
      </p>

      <div className="mt-7 space-y-3">
        <OnboardingButton type="button" variant="primary" onClick={onCapture}>
          Capture {side}
        </OnboardingButton>
        <p className="text-center text-label-mono text-stone">
          {captured.front && side === "back"
            ? "Front captured — finish the back to continue."
            : "Two sides — front first, then back."}
        </p>
      </div>

      <section className="mt-8">
        <button
          type="button"
          onClick={() => setWhyOpen((w) => !w)}
          className="flex w-full items-center justify-between rounded-[14px] border border-line bg-paper px-4 py-3 text-left hover:bg-lavender-50"
        >
          <span className="font-body text-[13px] text-slate">Why this matters</span>
          {whyOpen ? (
            <ChevronUp size={16} className="text-stone" />
          ) : (
            <ChevronDown size={16} className="text-stone" />
          )}
        </button>
        {whyOpen && (
          <div className="mt-3 rounded-[14px] bg-paper px-4 py-4 shadow-elev-1">
            <p className="font-body text-[13.5px] leading-relaxed text-ink">
              We only use this image for verification. If you'd like to know
              exactly what we share, you'll see a breakdown on the next screen.
            </p>
          </div>
        )}
      </section>
    </OnboardingFrame>
  );
}
