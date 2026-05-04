import { type ReactNode } from "react";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { ORDERED_STEPS, type OnboardingStep } from "@/lib/onboarding_store";
import { OfflineBanner } from "./OfflineBanner";
import {
  NamedPhaseStepper,
  ONBOARDING_PHASES,
  phaseForStep,
} from "./NamedPhaseStepper";

type Props = {
  step: OnboardingStep;
  title: string;
  subtitle?: string;
  children: ReactNode;
  /** Footer is the place for primary/secondary CTAs. */
  footer?: ReactNode;
  /** Override default back behaviour (e.g. confirm-discard on first step). */
  onBack?: () => void;
};

/**
 * Shared chrome for every onboarding step:
 *   - back arrow (history-aware)
 *   - named-phase stepper (R4 Stream 1.5, DR-103) — no progressbar, no
 *     "step N of M", no percentage
 *   - sticky footer for CTAs
 *   - offline banner pinned to top
 */
export function OnboardingShell({
  step,
  title,
  subtitle,
  children,
  footer,
  onBack,
}: Props) {
  const router = useRouter();
  const navigate = useNavigate();
  const idx = ORDERED_STEPS.indexOf(step);
  const total = ORDERED_STEPS.length;
  const currentPhase = phaseForStep(idx, total);

  const handleBack = () => {
    if (onBack) return onBack();
    if (window.history.length > 1) router.history.back();
    else navigate({ to: "/onboarding" });
  };

  return (
    <div
      className="mx-auto flex min-h-screen max-w-[640px] flex-col bg-paper"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 96px)" }}
    >
      <OfflineBanner />

      {/* Sticky header with back + named-phase stepper */}
      <header className="sticky top-0 z-20 -mx-0 bg-paper/85 px-6 pb-3 pt-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleBack}
            aria-label="Go back"
            className="-ml-2 inline-flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-cloud"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden />
          </button>
        </div>
        <div className="mt-3">
          <NamedPhaseStepper
            phases={ONBOARDING_PHASES}
            currentPhase={currentPhase}
          />
        </div>
      </header>

      <main className="flex-1 px-6 pt-8">
        <h1 className="text-display-xl text-ink">{title}</h1>
        {subtitle ? (
          <p className="mt-3 text-body-lg text-slate">{subtitle}</p>
        ) : null}
        <div className="mt-8">{children}</div>
      </main>

      {footer ? (
        <footer
          className="fixed bottom-0 left-1/2 z-20 w-full max-w-[640px] -translate-x-1/2 border-t border-line bg-paper px-6 pt-4"
          style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 16px)" }}
        >
          {footer}
        </footer>
      ) : null}
    </div>
  );
}
