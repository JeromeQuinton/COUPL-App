type Props = {
  step: number;
  total?: number;
};

/**
 * "STEP N OF 9" eyebrow used at the top of every numbered onboarding
 * screen. Mono, tracked, slate. Matches the visual reference.
 */
export function StepEyebrow({ step, total = 10 }: Props) {
  return (
    <p className="text-mono-sm uppercase tracking-[0.14em] text-slate">
      Step {step} of {total}
    </p>
  );
}