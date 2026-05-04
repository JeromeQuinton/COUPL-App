import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  mode: "block" | "unblock";
  userName: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function BlockConfirmModal({ open, mode, userName, onConfirm, onCancel }: Props) {
  const isBlock = mode === "block";

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onCancel()}>
      <DialogContent className="max-w-md rounded-3xl border-line bg-paper px-6 pb-8 pt-6 sm:rounded-3xl">
        <DialogHeader className="space-y-3 text-left">
          <p className="text-label-mono text-stone">{isBlock ? "BLOCK" : "UNBLOCK"}</p>
          <DialogTitle className="font-display text-[24px] leading-tight text-ink">
            {isBlock ? `Block ${userName}?` : `Unblock ${userName}?`}
          </DialogTitle>
          <DialogDescription className="font-body text-[14px] leading-relaxed text-ink">
            {isBlock
              ? "They can't message you. You can't see them. We don't tell them."
              : `If you unblock ${userName}, they may be able to find or contact you again. They will not be told you've unblocked them. You can block them again at any time.`}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-3">
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
      </DialogContent>
    </Dialog>
  );
}
