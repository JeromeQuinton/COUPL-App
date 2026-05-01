import { ChevronRight } from "lucide-react";
import type { UserTier } from "@/lib/user_tier";

/**
 * Subtle tier indicator — DR-028.
 * Observational framing only (no "X of N" counters). Optional Upgrade
 * link for free users.
 */
export function TierIndicator({
  tier,
  onUpgrade,
}: {
  tier: UserTier;
  onUpgrade: () => void;
}) {
  const label = tier === "paid" ? "Paid tier" : "Free tier";
  return (
    <div className="inline-flex items-center gap-2 self-start rounded-full bg-paper/60 px-3 py-1.5 font-body text-[12px] text-slate">
      <span className="font-medium text-plum-700">{label}</span>
      <span aria-hidden className="text-stone">·</span>
      <span>Today's recommendations</span>
      {tier === "free" && (
        <>
          <span aria-hidden className="text-stone">·</span>
          <button
            type="button"
            onClick={onUpgrade}
            className="inline-flex items-center gap-0.5 font-body text-[12px] font-semibold text-plum-500 underline decoration-plum-300/60 decoration-1 underline-offset-[3px] transition-colors hover:text-plum-700 hover:decoration-plum-500"
          >
            Upgrade
            <ChevronRight aria-hidden width={12} height={12} strokeWidth={2.25} />
          </button>
        </>
      )}
    </div>
  );
}
