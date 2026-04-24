import { ArrowLeft, BadgeCheck, SlidersHorizontal } from "lucide-react";

/**
 * Sticky header (DR-020). Pinned on scroll. Holds back, identity,
 * verified pill, and a filter affordance (no-op in Phase 1; reserved
 * for in-detail filters later).
 */
export function ProfileDetailHeader({
  name,
  age,
  region,
  verified,
  onBack,
}: {
  name: string;
  age: number;
  region: string;
  verified: boolean;
  onBack: () => void;
}) {
  return (
    <header
      className="sticky top-0 z-30 -mx-4 border-b border-line/60 bg-paper/85 px-4 py-3 backdrop-blur-md"
      style={{ paddingTop: "calc(env(safe-area-inset-top) + 0.5rem)" }}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to discover"
          className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-lavender-100 text-plum-700 transition-colors hover:bg-lavender-100/70"
        >
          <ArrowLeft aria-hidden width={18} height={18} strokeWidth={1.75} />
        </button>

        <div className="flex min-w-0 flex-1 flex-col">
          <h1 className="font-display text-[17px] font-semibold leading-tight text-ink">
            {name} · {age}
          </h1>
          <p className="truncate font-body text-[12px] text-slate">{region}</p>
        </div>

        {verified ? (
          <span
            className="inline-flex items-center gap-1 rounded-full border border-line bg-paper px-2.5 py-1 font-body text-[11px] font-medium text-plum-700"
            aria-label="Verified profile"
          >
            <BadgeCheck aria-hidden width={12} height={12} strokeWidth={2} />
            Verified
          </span>
        ) : null}

        <button
          type="button"
          aria-label="Filter options"
          className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-slate transition-colors hover:text-plum-700"
        >
          <SlidersHorizontal aria-hidden width={18} height={18} strokeWidth={1.75} />
        </button>
      </div>
    </header>
  );
}
