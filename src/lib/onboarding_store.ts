/**
 * Onboarding draft persistence.
 *
 * Phase 1 stub: localStorage as the source of truth. Phase 4 will migrate
 * this to a server-backed `onboarding_drafts` table (one row per user)
 * keyed by `auth.uid()`. The shape returned here is the prop interface the
 * server fn will populate — do not change it without a corresponding DR.
 *
 * NOTE: revenue-gating state (tier, quota) does NOT live here. This file
 * holds onboarding answers only. Tier remains server-derived.
 */

const STORAGE_KEY = "coupl.onboarding.draft.v1";

export type OnboardingStep =
  | "start"
  | "intent"
  | "pacing"
  | "values"
  | "review";

export const ORDERED_STEPS: OnboardingStep[] = [
  "start",
  "intent",
  "pacing",
  "values",
  "review",
];

export type OnboardingDraft = {
  displayName?: string;
  intent?: "long_term" | "exploring" | "friendship";
  pacing?: "slow" | "steady" | "open";
  values?: string[]; // up to 5
  lastStep?: OnboardingStep;
  updatedAt?: number;
};

function isBrowser() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function loadDraft(): OnboardingDraft | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as OnboardingDraft;
    if (typeof parsed !== "object" || parsed === null) return null;
    return parsed;
  } catch {
    // Corrupt JSON — treat as no draft. Don't throw on read.
    return null;
  }
}

export function saveDraft(patch: Partial<OnboardingDraft>): OnboardingDraft {
  const current = loadDraft() ?? {};
  const next: OnboardingDraft = {
    ...current,
    ...patch,
    updatedAt: Date.now(),
  };
  if (isBrowser()) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Quota or privacy mode — silently degrade. The current step still
      // works; Resume just won't survive a reload.
    }
  }
  return next;
}

export function clearDraft(): void {
  if (!isBrowser()) return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* noop */
  }
}

export function hasDraft(): boolean {
  const d = loadDraft();
  return !!(d && (d.displayName || d.intent || d.pacing || d.values?.length));
}

export function nextStep(current: OnboardingStep): OnboardingStep | null {
  const idx = ORDERED_STEPS.indexOf(current);
  if (idx < 0 || idx === ORDERED_STEPS.length - 1) return null;
  return ORDERED_STEPS[idx + 1];
}

export function prevStep(current: OnboardingStep): OnboardingStep | null {
  const idx = ORDERED_STEPS.indexOf(current);
  if (idx <= 0) return null;
  return ORDERED_STEPS[idx - 1];
}