import { useEffect, useState } from "react";
import { AlignmentRing } from "@/components/discover/profile/cards/AlignmentRing";

/**
 * AttuneSentConfirmation — the single post-Attune visual moment.
 * Full-screen overlay, fixed 800ms duration (200ms in / 400ms hold /
 * 200ms out). No tap interactions. Reduced-motion users get a flat
 * full-opacity render for the same total duration.
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
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6"
      style={{
        opacity,
        transition: `opacity ${FADE_MS}ms ease-out`,
        background:
          "radial-gradient(circle at 50% 45%, rgba(252, 228, 236, 0.96) 0%, rgba(243, 232, 245, 0.96) 60%, rgba(143, 94, 156, 0.92) 100%)",
        pointerEvents: "none",
      }}
    >
      <AlignmentRing value={100} size={140} strokeWidth={10} centerLabel="∞" />
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