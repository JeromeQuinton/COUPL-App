import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { OnboardingFrame } from "@/components/onboarding/OnboardingFrame";
import { OnboardingButton } from "@/components/onboarding/OnboardingButton";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding/photo-review")({
  head: () => ({
    meta: [
      { title: "Photo review — coupl" },
      {
        name: "description",
        content:
          "Automated checks for safety and authenticity. Usually done in minutes.",
      },
    ],
  }),
  component: PhotoReviewScreen,
});

const PHOTOS: Array<{ id: number; gradient: string }> = [
  { id: 1, gradient: "bg-gradient-to-br from-lavender-100 to-plum-300" },
  { id: 2, gradient: "bg-gradient-to-br from-lavender-50 to-plum-500" },
  { id: 3, gradient: "bg-gradient-to-br from-beeswax-100 to-beeswax-300" },
];

const STAGES = [
  { key: "submitted", label: "Submitted" },
  { key: "safety", label: "Safety check" },
  { key: "authenticity", label: "Authenticity" },
  { key: "released", label: "Released" },
] as const;

function PhotoReviewScreen() {
  const navigate = useNavigate();
  // 0 = only Submitted complete, 3 = all complete
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const t1 = setTimeout(() => setProgress(1), 1000);
    const t2 = setTimeout(() => setProgress(2), 2000);
    const t3 = setTimeout(() => setProgress(3), 3000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const done = progress >= 3;
  const checking = progress < 3;

  return (
    <OnboardingFrame
      footer={
        <p className="pt-6 text-center text-body-sm text-slate">
          Flagged content goes to a small safety team. Most photos never need that.
        </p>
      }
    >
      <p className="text-label-mono">Photo review</p>
      <h1 className="mt-2 text-display-xl text-ink">
        Quietly checking your photos.
      </h1>
      <p className="mt-3 text-body-md text-slate">
        Automated checks for safety and authenticity. Usually done in minutes. No team scrolling through your album.
      </p>

      <section className="mt-8 rounded-[20px] bg-beeswax-100 p-5">
        <div className="flex items-center justify-between text-label-mono">
          <span>Submitted just now</span>
          <span>{done ? "Released" : "Est. 1–2 min remaining"}</span>
        </div>

        <ol className="mt-5 grid grid-cols-4 gap-2">
          {STAGES.map((stage, i) => {
            const isComplete = i <= progress;
            const isRunning = i === progress + 1 - 1 && !isComplete;
            // running stage = the next one after the last complete
            const running = i === progress + 1 && progress < 3;
            return (
              <li
                key={stage.key}
                className="flex flex-col items-center text-center"
              >
                <span
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full border-2 transition-colors",
                    isComplete
                      ? "border-plum-500 bg-plum-500 text-paper"
                      : running
                        ? "border-plum-500 bg-paper text-plum-500"
                        : "border-line bg-paper text-stone",
                  )}
                  aria-hidden
                >
                  {isComplete ? (
                    <Check className="h-4 w-4" strokeWidth={2.5} />
                  ) : running ? (
                    <span className="h-2 w-2 animate-pulse rounded-full bg-plum-500" />
                  ) : null}
                </span>
                <span
                  className={cn(
                    "mt-2 text-mono-sm uppercase tracking-[0.1em]",
                    isComplete || running
                      ? "text-plum-700"
                      : "text-stone",
                  )}
                >
                  {stage.label}
                </span>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="mt-6">
        <div className="grid grid-cols-3 gap-3">
          {PHOTOS.map((p) => (
            <div
              key={p.id}
              className={`relative aspect-[4/5] w-full overflow-hidden rounded-[16px] ${p.gradient}`}
              aria-label={checking ? "Checking photo" : "Photo"}
            >
              {checking ? (
                <span className="absolute inset-x-0 bottom-3 text-center text-mono-sm uppercase tracking-[0.12em] text-paper/90">
                  Checking
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <div className="mt-8">
        <OnboardingButton
          type="button"
          disabled={!done}
          onClick={() => navigate({ to: "/home" })}
        >
          Continue to home
        </OnboardingButton>
      </div>
    </OnboardingFrame>
  );
}