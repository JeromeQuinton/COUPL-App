/**
 * NamedPhaseStepper — replaces the linear progressbar in OnboardingShell.
 * Charter (R4 Stream 1.5, DR-103) bans progressbars; replace with a soft
 * 4-dot row of named phases. Current phase = filled dot + colour shift on
 * the label only. No fill animation. No "step N of M".
 */

export type OnboardingPhase = "Arrival" | "Reflection" | "Presence" | "Clarity";

interface NamedPhaseStepperProps {
  phases: OnboardingPhase[];
  currentPhase: OnboardingPhase;
}

export function NamedPhaseStepper({
  phases,
  currentPhase,
}: NamedPhaseStepperProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-body-sm italic text-slate">
        Polaris is guiding you through these few steps. You can return to any
        of them at any time.
      </p>
      <ol className="flex items-center justify-between gap-3">
        {phases.map((phase) => {
          const active = phase === currentPhase;
          return (
            <li key={phase} className="flex flex-1 flex-col items-center gap-1.5">
              <span
                aria-hidden
                className={
                  active
                    ? "h-2 w-2 rounded-full bg-plum-500"
                    : "h-2 w-2 rounded-full bg-lavender-100"
                }
              />
              <span
                className={
                  active
                    ? "text-label-mono text-plum-700"
                    : "text-label-mono text-stone"
                }
              >
                {phase}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export const ONBOARDING_PHASES: OnboardingPhase[] = [
  "Arrival",
  "Reflection",
  "Presence",
  "Clarity",
];

/**
 * Map a step index (0-based) within `total` steps onto one of the four
 * named phases. Quartile split.
 */
export function phaseForStep(
  stepIndex: number,
  totalSteps: number,
): OnboardingPhase {
  const t = totalSteps > 0 ? totalSteps : 1;
  const fraction = stepIndex / t;
  if (fraction < 0.25) return "Arrival";
  if (fraction < 0.5) return "Reflection";
  if (fraction < 0.75) return "Presence";
  return "Clarity";
}
