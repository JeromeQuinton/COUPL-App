/**
 * Action row (DR-020). Two equal-weight actions:
 *   Not Today      — outline pill, dismisses + returns to feed
 *   Invite to Chat — filled plum pill, marks invited + returns to feed
 * Vocabulary per DR-023 — never "match," never "like."
 */
export function ActionRow({
  onNotToday,
  onInvite,
}: {
  onNotToday: () => void;
  onInvite: () => void;
}) {
  return (
    <div className="rounded-[20px] bg-paper p-3 shadow-elev-1">
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onNotToday}
          className="rounded-full border border-plum-300 bg-paper px-4 py-3 font-body text-[14px] font-medium text-plum-700 transition-colors hover:bg-lavender-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-plum-300"
        >
          Not Today
        </button>
        <button
          type="button"
          onClick={onInvite}
          aria-label="Attune"
          className="rounded-full bg-plum-500 px-4 py-3 font-body text-[14px] font-medium text-paper shadow-elev-1 transition-colors hover:bg-plum-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-plum-300"
        >
          Attune
        </button>
      </div>
    </div>
  );
}
