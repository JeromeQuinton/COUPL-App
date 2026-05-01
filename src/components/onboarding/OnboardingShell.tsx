import { type ReactNode } from "react";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { ORDERED_STEPS, type OnboardingStep } from "@/lib/onboarding_store";
import { OfflineBanner } from "./OfflineBanner";

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
 *   - step counter
 *   - linear progress bar
 *   - sticky footer for CTAs
 *   - offline banner pinned to top
 *
 * Keeping chrome in one component prevents drift between step screens.
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
  const progress = ((idx + 1) / total) * 100;

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

      {/* Sticky header with back + progress */}
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
          <p className="text-body-sm text-slate">
            Step {idx + 1} of {total}
          </p>
        </div>
        <div
          className="mt-3 h-1 w-full overflow-hidden rounded-full bg-cloud"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
        >
          <div
            className="h-full rounded-full bg-plum-500 transition-[width] duration-300 ease-[var(--ease-coupl)]"
            style={{ width: `${progress}%` }}
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