import { useEffect } from "react";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  mode: "block" | "unblock";
  userName: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function BlockConfirmModal({ open, mode, userName, onConfirm, onCancel }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!open) return null;

  const isBlock = mode === "block";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40"
      onClick={onCancel}
      role="presentation"
    >
      <div
        className="w-full max-w-md rounded-t-3xl bg-paper px-6 pb-8 pt-4"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="block-modal-title"
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="text-label-mono text-stone">{isBlock ? "BLOCK" : "UNBLOCK"}</span>
          <button
            type="button"
            aria-label="Close"
            onClick={onCancel}
            className="grid h-8 w-8 place-items-center rounded-full text-slate hover:bg-lavender-100"
          >
            <X size={16} />
          </button>
        </div>

        <h2 id="block-modal-title" className="font-display text-[24px] leading-tight text-ink">
          {isBlock ? `Block ${userName}?` : `Unblock ${userName}?`}
        </h2>

        <p className="mt-3 font-body text-[14px] leading-relaxed text-ink">
          {isBlock
            ? "They can't message you. You can't see them. We don't tell them."
            : "They'll be able to find you again. We won't tell them you unblocked."}
        </p>

        <div className="mt-6 space-y-3">
          <button
            type="button"
            onClick={onConfirm}
            className="w-full rounded-full px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90"
            style={{ background: isBlock ? "var(--danger)" : "var(--plum-700)" }}
          >
            {isBlock ? "Block" : "Unblock"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="w-full rounded-full px-5 py-3 text-center font-body text-[13.5px] text-slate hover:text-plum-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
