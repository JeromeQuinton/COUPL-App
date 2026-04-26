import { useEffect, useState } from "react";
import { X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

/**
 * AttuneDialog — bottom sheet that lets the viewer send a targeted
 * attune. Header + question copy adapt to whether the target is the
 * whole profile, a specific module, or a specific photo. Comment is
 * optional, capped at 140 characters.
 */

const MAX_COMMENT = 140;

export type AttuneDialogTarget = {
  type: "profile" | "module" | "photo";
  title: string;
  previewText?: string;
  thumbnailUrl?: string;
};

export function AttuneDialog({
  open,
  onClose,
  onSend,
  target,
  profileName,
}: {
  open: boolean;
  onClose: () => void;
  onSend: (comment: string | undefined) => void;
  target: AttuneDialogTarget;
  profileName: string;
}) {
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (open) setComment("");
  }, [open]);

  const header =
    target.type === "profile"
      ? `Attune to ${profileName}`
      : target.type === "module"
        ? `Attune to ${profileName}'s ${target.title}`
        : "Attune to this photo";

  const question =
    target.type === "profile"
      ? "What attuned you?"
      : target.type === "module"
        ? "What about this attuned you?"
        : "What attuned you to this photo?";

  const handleSend = () => {
    const trimmed = comment.trim();
    onSend(trimmed.length === 0 ? undefined : trimmed);
  };

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side="bottom"
        className="rounded-t-[24px] border-t border-line bg-paper px-5 pb-8 pt-6"
      >
        <SheetHeader className="text-left">
          <div className="flex items-start justify-between gap-3">
            <SheetTitle className="font-display text-[18px] font-semibold text-ink">
              {header}
            </SheetTitle>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="-mr-1 -mt-1 rounded-full p-1 text-stone hover:bg-lavender-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-plum-300"
            >
              <X width={18} height={18} strokeWidth={1.75} />
            </button>
          </div>
        </SheetHeader>

        {target.type === "photo" && target.thumbnailUrl ? (
          <div className="mt-4 overflow-hidden rounded-2xl">
            <img
              src={target.thumbnailUrl}
              alt=""
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        ) : null}

        {target.type === "module" && target.previewText ? (
          <p className="mt-4 rounded-2xl bg-lavender-50 px-4 py-3 font-body text-[13px] italic text-ink">
            “{target.previewText}”
          </p>
        ) : null}

        <p className="mt-5 font-body text-[14px] font-medium text-ink">
          {question}
        </p>

        <div className="mt-2">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value.slice(0, MAX_COMMENT))}
            maxLength={MAX_COMMENT}
            placeholder="Optional..."
            rows={3}
            className="w-full resize-none rounded-2xl border border-line bg-paper px-4 py-3 font-body text-[14px] text-ink placeholder:text-stone focus:border-plum-300 focus:outline-none focus:ring-2 focus:ring-plum-300/40"
          />
          <p className="mt-1 text-right font-body text-[11px] text-stone">
            {comment.length} / {MAX_COMMENT}
          </p>
        </div>

        <button
          type="button"
          onClick={handleSend}
          className="mt-4 w-full rounded-full bg-plum-500 px-5 py-3 font-display text-[15px] font-medium text-paper shadow-elev-1 transition-colors hover:bg-plum-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-plum-300"
        >
          Send Attune
        </button>
      </SheetContent>
    </Sheet>
  );
}