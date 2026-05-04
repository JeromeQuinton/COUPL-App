import { type ReactNode } from "react";

/**
 * LoveLanguagePicker — shared body for the love-language assessment.
 *
 * Used by both /onboarding/love-language and /_main/polaris/love-language.
 * Keeps the cards, soft caveat, and primary/secondary selection logic
 * identical across surfaces; the chrome (header, CTAs, skip link) lives
 * in each route. DR-DRAFT-ASSESSMENT-PLACEMENT-PATTERN.
 */

export type LoveLanguage = "words" | "time" | "touch" | "acts" | "gifts";

export const LOVE_LANGUAGES: ReadonlyArray<{
  value: LoveLanguage;
  label: string;
  body: string;
}> = [
  {
    value: "words",
    label: "Words",
    body: "Spoken or written. The right line at the right moment.",
  },
  {
    value: "time",
    label: "Time",
    body: "Undivided attention. Long walks. The phone, face down.",
  },
  {
    value: "touch",
    label: "Touch",
    body: "A hand on the back. Held close. Quiet, frequent contact.",
  },
  {
    value: "acts",
    label: "Acts",
    body: "Tea brought in. The shop run done. Quiet practical care.",
  },
  {
    value: "gifts",
    label: "Gifts",
    body: "Small noticings. A book they remembered. Felt, not priced.",
  },
];

type Props = {
  primary: LoveLanguage | null;
  secondary: LoveLanguage | null;
  onPrimaryChange: (next: LoveLanguage) => void;
  onSecondaryChange: (next: LoveLanguage | null) => void;
  /** Optional footer slot for surface-specific CTAs and skip links. */
  footer?: ReactNode;
};

export function LoveLanguagePicker({
  primary,
  secondary,
  onPrimaryChange,
  onSecondaryChange,
  footer,
}: Props) {
  const onCardClick = (v: LoveLanguage) => {
    if (primary === null) {
      onPrimaryChange(v);
      return;
    }
    if (v === primary) {
      // Tapping the primary again clears the secondary selection but keeps primary.
      onSecondaryChange(null);
      return;
    }
    if (secondary === v) {
      onSecondaryChange(null);
      return;
    }
    onSecondaryChange(v);
  };

  return (
    <div className="flex flex-col">
      <ul className="flex flex-col gap-2.5">
        {LOVE_LANGUAGES.map((opt) => {
          const isPrimary = primary === opt.value;
          const isSecondary = secondary === opt.value;
          return (
            <li key={opt.value}>
              <button
                type="button"
                aria-pressed={isPrimary || isSecondary}
                onClick={() => onCardClick(opt.value)}
                className={`flex w-full items-start justify-between gap-3 rounded-[16px] px-4 py-3.5 text-left shadow-elev-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-300 ${
                  isPrimary
                    ? "bg-plum-500 text-paper hover:bg-plum-700"
                    : isSecondary
                      ? "bg-lavender-100 text-ink hover:bg-lavender-50"
                      : "bg-paper text-ink hover:bg-lavender-50"
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p
                      className={`font-display text-[16px] ${
                        isPrimary ? "text-paper" : "text-ink"
                      }`}
                    >
                      {opt.label}
                    </p>
                    {isPrimary ? (
                      <span className="rounded-full bg-paper/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-paper">
                        Primary
                      </span>
                    ) : null}
                    {isSecondary ? (
                      <span className="rounded-full bg-plum-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-plum-700">
                        Secondary
                      </span>
                    ) : null}
                  </div>
                  <p
                    className={`mt-1 font-body text-[12.5px] leading-relaxed ${
                      isPrimary ? "text-paper/85" : "text-stone"
                    }`}
                  >
                    {opt.body}
                  </p>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      <p className="mt-5 font-body text-[12.5px] italic text-stone">
        This is a starting frame, not a verdict. People shift.
      </p>

      {footer ? <div className="mt-6">{footer}</div> : null}
    </div>
  );
}
