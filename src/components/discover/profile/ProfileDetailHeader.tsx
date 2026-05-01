import { ArrowLeft, SlidersHorizontal } from "lucide-react";

/**
 * Sticky header (DR-020, DR-023 v2 update). Minimal chrome — only
 * back navigation and the filter affordance. Identity (name, age,
 * region, Verified) now lives inside the Introduction Card below.
 *
 * Prompt 5.1: when `revealName` is true (set by the detail route once
 * Photo 1 has scrolled past the header), cross-fade `Name · Age` into
 * the centre slot. Reduced-motion users get an instant snap.
 */
export function ProfileDetailHeader({
  onBack,
  revealName = false,
  name,
  age,
}: {
  onBack: () => void;
  revealName?: boolean;
  name?: string;
  age?: number;
}) {
  const showLabel = Boolean(name) && typeof age === "number";
  return (
    <header
      className="sticky top-0 z-30 -mx-4 border-b border-ink/60 bg-blush/85 px-4 py-3 backdrop-blur-md"
      style={{ paddingTop: "calc(env(safe-area-inset-top) + 0.5rem)" }}
    >
      <div className="relative flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to discover"
          className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-blush text-ink transition-colors hover:bg-blush/70"
        >
          <ArrowLeft aria-hidden width={18} height={18} strokeWidth={1.75} />
        </button>

        {showLabel ? (
          <span
            aria-hidden={!revealName}
            className={`pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-display text-[17px] font-medium leading-none tracking-[-0.005em] text-ink transition-opacity duration-200 ease-out motion-reduce:transition-none ${
              revealName ? "opacity-100" : "opacity-0"
            }`}
          >
            {name} · {age}
          </span>
        ) : null}

        <button
          type="button"
          aria-label="Filter options"
          className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-slate transition-colors hover:text-ink"
        >
          <SlidersHorizontal aria-hidden width={18} height={18} strokeWidth={1.75} />
        </button>
      </div>
    </header>
  );
}
