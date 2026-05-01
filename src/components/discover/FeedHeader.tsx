import type { UserTier } from "@/lib/user_tier";

/**
 * FeedHeader — editorial periodical masthead (DR-BRAND-V2-A/D).
 *
 * Issue label + date row → Fraunces "Discover." headline → ink hairline.
 * Issue number is derived deterministically from the calendar day so
 * the masthead reads as a daily edition without backend wiring.
 */
function todayParts() {
  const d = new Date();
  const start = new Date(d.getFullYear(), 0, 0);
  const diff = d.getTime() - start.getTime();
  const issueNo = Math.floor(diff / 86_400_000); // day of year
  const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][d.getDay()];
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return { issueNo, dateLabel: `${weekday} · ${dd}.${mm}` };
}

export function FeedHeader({ tier }: { tier: UserTier }) {
  const { issueNo, dateLabel } = todayParts();
  const issueLabel =
    tier === "free"
      ? `ISSUE Nº ${issueNo}`
      : `ATELIER · ISSUE Nº ${issueNo}`;

  return (
    <header className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-plum-500">
          {issueLabel}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-slate">
          {dateLabel}
        </span>
      </div>

      <h1 className="text-display-xl text-ink">Discover.</h1>

      <hr className="border-0 border-t border-ink" aria-hidden />
    </header>
  );
}
