/**
 * User preferences stub — onboarding-derived defaults.
 *
 * Phase 1: hardcoded constants representing what onboarding will collect.
 * Phase 4 swaps `CURRENT_USER_PREFERENCES` for the real session-loaded
 * value without touching consumers (see `useUserPreferences`).
 *
 * Per DR-027: Intent + Distance defaults are non-editable on free tier
 * (gated by tier, not by this stub).
 */

export type UserPreferences = {
  intent: string;
  distanceKm: number;
  // Future: values, lifestyle, pacing preferences land here.
};

export const CURRENT_USER_PREFERENCES: UserPreferences = {
  intent: "Long-term",
  distanceKm: 25,
};

export function useUserPreferences(): UserPreferences {
  return CURRENT_USER_PREFERENCES;
}
