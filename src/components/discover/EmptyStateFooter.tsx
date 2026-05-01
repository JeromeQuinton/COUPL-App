import type { UserTier } from "@/lib/user_tier";

/**
 * Empty-state footer shown after the last profile in the daily allotment.
 * DR-024 + DR-026 — observational, invitational, no urgency.
 */
export function EmptyStateFooter({
  tier,
  onUpgrade,
}: {
  tier: UserTier;
  onUpgrade: () => void;
}) {
  if (tier === "paid") {
    return (
      <div className="rounded-[20px] bg-blush/70 px-5 py-5 text-center shadow-elev-1">
        <p className="font-display text-[15px] font-semibold text-ink">
          You've seen today's recommendations.
        </p>
        <p className="pt-1.5 font-body text-[13px] text-slate">
          Come back tomorrow for fresh curation.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-stretch gap-3 rounded-[20px] bg-blush/70 px-5 py-5 text-center shadow-elev-1">
      <p className="font-display text-[15px] font-semibold text-ink">
        You've seen today's recommendations.
      </p>
      <p className="font-body text-[13px] text-slate">
        Come back tomorrow for fresh curation, or upgrade to see more aligned profiles today.
      </p>
      <button
        type="button"
        onClick={onUpgrade}
        className="mx-auto mt-1 rounded-full bg-ink px-5 py-2.5 font-display text-[14px] font-medium text-blush shadow-elev-1 transition-colors hover:bg-ink/90"
      >
        Upgrade
      </button>
    </div>
  );
}
