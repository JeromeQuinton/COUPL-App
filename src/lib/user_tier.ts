/**
 * User tier stub — DR-027, DR-028.
 *
 * Phase 1: all users treated as `'free'`. Real detection wires up in Phase 4
 * once payments + the `user_tier` table land. Flip `CURRENT_TIER` here to
 * preview paid-tier UI during development.
 */

export type UserTier = "free" | "paid";

export const FREE_TIER_CAP = 10;
export const PAID_TIER_CAP = 40;

// Phase 1 stub — DR-028. Flip to "paid" locally to QA paid-tier UI.
export const CURRENT_TIER: UserTier = "free";

export const capForTier = (tier: UserTier): number =>
  tier === "paid" ? PAID_TIER_CAP : FREE_TIER_CAP;

export const useUserTier = (): UserTier => CURRENT_TIER;
