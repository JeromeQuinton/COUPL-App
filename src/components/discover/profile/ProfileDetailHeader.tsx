import { ArrowLeft, SlidersHorizontal } from "lucide-react";

/**
 * Sticky header (DR-020, DR-023 v2 update). Minimal chrome — only
 * back navigation and the filter affordance. Identity (name, age,
 * region, Verified) now lives inside the Introduction Card below.
 */
export function ProfileDetailHeader({
  onBack,
}: {
  onBack: () => void;
}) {
  return (
    <header
      className="sticky top-0 z-30 -mx-4 border-b border-line/60 bg-paper/85 px-4 py-3 backdrop-blur-md"
      style={{ paddingTop: "calc(env(safe-area-inset-top) + 0.5rem)" }}
    >
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to discover"
          className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-lavender-100 text-plum-700 transition-colors hover:bg-lavender-100/70"
        >
          <ArrowLeft aria-hidden width={18} height={18} strokeWidth={1.75} />
        </button>

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
