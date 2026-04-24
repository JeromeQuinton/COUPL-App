import { RefreshCw } from "lucide-react";

const TAGS = ["Quality Time", "Gentle pace", "Honesty"];

export function UpdatingPanel() {
  return (
    <section className="flex flex-col gap-3 rounded-[20px] bg-paper p-4 shadow-elev-1">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <RefreshCw aria-hidden width={16} height={16} strokeWidth={2} className="text-plum-700" />
          <span className="font-display text-[15px] font-semibold text-plum-700">
            Updating aligned profiles
          </span>
        </div>
        <span className="rounded-full bg-lavender-100 px-3 py-1 font-body text-[12px] font-medium text-plum-700">
          Intent · Nearby
        </span>
      </div>
      <p className="font-body text-[13px] text-slate">
        Rebalancing by intent, values, and recent activity.
      </p>
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-lavender-100"
        role="progressbar"
        aria-valuenow={62}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="h-full w-[62%] rounded-full bg-plum-300" />
      </div>
      <div className="flex flex-wrap gap-2 pt-1">
        {TAGS.map((t) => (
          <span
            key={t}
            className="rounded-full bg-lavender-50 px-3 py-1.5 font-body text-[12px] font-medium text-plum-700"
          >
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}
