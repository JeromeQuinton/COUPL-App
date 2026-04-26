/**
 * Action row (DR-020). Two equal-weight actions:
 *   Not Today      — outline pill, dismisses + returns to feed
 *   Attune         — filled plum pill, marks invited + returns to feed
 * Vocabulary per DR-023 — never "match," never "like."
 *
 * `variant="compact"` is used by the sticky-pinned replica that appears
 * once the inline action row scrolls out of view — slimmer vertical
 * padding so the bar sits comfortably above the bottom nav.
 */
export function ActionRow({
  onNotToday,
  onInvite,
  variant = "inline",
}: {
  onNotToday: () => void;
  onInvite: () => void;
  variant?: "inline" | "compact";
}) {
  const isCompact = variant === "compact";
  const buttonPadding = isCompact ? "px-4 py-2.5" : "px-4 py-3";
  const wrapperPadding = isCompact ? "p-2" : "p-3";
  const wrapperRadius = isCompact ? "rounded-none" : "rounded-[20px]";
  const wrapperShadow = isCompact ? "" : "shadow-elev-1";
  return (
    <div className={`bg-paper ${wrapperPadding} ${wrapperRadius} ${wrapperShadow}`}>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onNotToday}
          className={`rounded-full border border-plum-300 bg-paper ${buttonPadding} font-body text-[14px] font-medium text-plum-700 transition-colors hover:bg-lavender-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-plum-300`}
        >
          Not Today
        </button>
        <button
          type="button"
          onClick={onInvite}
          aria-label="Attune"
          className={`rounded-full bg-plum-500 ${buttonPadding} font-body text-[14px] font-medium text-paper shadow-elev-1 transition-colors hover:bg-plum-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-plum-300`}
        >
          Attune
        </button>
      </div>
    </div>
  );
}
