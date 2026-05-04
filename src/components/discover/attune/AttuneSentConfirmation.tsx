import { useEffect, useState } from "react";

/**
 * AttuneSentConfirmation — the single post-Attune visual moment.
 * Full-screen overlay, fixed 800ms duration (200ms in / 400ms hold /
 * 200ms out). No tap interactions. Reduced-motion users get a flat
 * full-opacity render for the same total duration.
 *
 * R4 Stream 1.2: ring primitive removed. Confirmation now reads as a
 * soft glow + ∞ glyph + sentence — ceremonial without surfacing a number
 * or progress visual.
 */

const TOTAL_MS = 800;
const FADE_MS = 200;

export function AttuneSentConfirmation({
  visible,
  profileName,
  targetType,
  onDismissed,
}: {
  visible: boolean;
  profileName: string;
  targetType: "profile" | "module" | "photo";
  onDismissed: () => void;
}) {
  const [phase, setPhase] = useState<"hidden" | "in" | "hold" | "out">("hidden");

  useEffect(() => {
    if (!visible) {
      setPhase("hidden");
      return;
    }
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setPhase("hold");
      const t = setTimeout(onDismissed, TOTAL_MS);
      return () => clearTimeout(t);
    }

    setPhase("in");
    const t1 = setTimeout(() => setPhase("hold"), FADE_MS);
    const t2 = setTimeout(() => setPhase("out"), TOTAL_MS - FADE_MS);
    const t3 = setTimeout(onDismissed, TOTAL_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [visible, onDismissed]);

  if (!visible) return null;

  // V0 PRONOUN — derive from profile.pronouns in Phase 4.
  const body =
    targetType === "photo"
      ? `${profileName} will know what attuned you to this photo.`
      : `${profileName} will know what attuned you to her.`;

  const opacity = phase === "in" || phase === "out" ? 0 : 1;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-y-0 left-1/2 z-50 flex w-full max-w-[640px] -translate-x-1/2 flex-col items-center justify-center px-6"
      style={{
        opacity,
        transition: `opacity ${FADE_MS}ms ease-out`,
        background:
          "radial-gradient(circle at 50% 45%, rgba(252, 228, 236, 0.96) 0%, rgba(243, 232, 245, 0.96) 60%, rgba(143, 94, 156, 0.92) 100%)",
        pointerEvents: "none",
      }}
    >
      <span
        aria-hidden
        className="grid h-[140px] w-[140px] place-items-center rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, var(--brand-gradient-stop-3, #EC4899) 0%, var(--brand-gradient-stop-2, #6B21A8) 70%, var(--brand-gradient-stop-1, #1A0533) 100%)",
        }}
      >
        <span className="font-display text-[44px] font-semibold text-paper">
          ∞
        </span>
      </span>
      <h2 className="mt-6 font-display text-[24px] font-semibold text-plum-700">
        Attune sent
      </h2>
      <p className="mt-2 max-w-xs text-center font-body text-[14px] text-ink">
        {body}
      </p>
    </div>
  );
}

export const ATTUNE_CONFIRMATION_MS = TOTAL_MS;