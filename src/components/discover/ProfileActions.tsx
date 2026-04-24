type Props = {
  onNotToday: () => void;
  onInviteToChat: () => void;
  disabled?: boolean;
};

/**
 * ProfileActions — the two and only two actions on the daily profile view.
 * Per DR-006: no Pass/Save/Connect; the user takes one action and the next
 * profile loads on the same /discover route. No "save for later" — that's
 * out of scope for Build 1.
 *
 * Layout: bottom-anchored above the tab bar (tab bar is 88px tall).
 * Outline pill (Not Today) on the left, filled plum pill (Invite to Chat)
 * on the right.
 */
export function ProfileActions({ onNotToday, onInviteToChat, disabled }: Props) {
  return (
    <div className="fixed inset-x-0 bottom-[88px] z-30 px-4 pb-2">
      <div className="mx-auto flex max-w-[640px] items-stretch gap-3">
        <button
          type="button"
          onClick={onNotToday}
          disabled={disabled}
          className="flex-1 rounded-full border border-plum-300 bg-paper px-5 py-3.5 text-body-lg font-medium text-plum-700 shadow-elev-1 transition-colors hover:bg-lavender-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Not Today
        </button>
        <button
          type="button"
          onClick={onInviteToChat}
          disabled={disabled}
          className="flex-1 rounded-full bg-plum-500 px-5 py-3.5 text-body-lg font-medium text-paper shadow-elev-2 transition-colors hover:bg-plum-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Invite to Chat
        </button>
      </div>
    </div>
  );
}