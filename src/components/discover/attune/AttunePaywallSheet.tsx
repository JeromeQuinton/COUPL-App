// V0 PLACEHOLDER — replace when subscription flow lands (sample screens 323462–323464).
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function AttunePaywallSheet({
  open,
  onClose,
  onUpgrade,
}: {
  open: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}) {
  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side="bottom"
        className="rounded-t-[24px] border-t border-line bg-paper px-5 pb-8 pt-6"
      >
        <SheetHeader className="text-left">
          <SheetTitle className="font-display text-[18px] font-semibold text-ink">
            Module Attune is a Plus feature
          </SheetTitle>
          <SheetDescription className="font-body text-[13px] text-slate">
            Show what specifically resonated. Module Attune lets you tell
            someone exactly what part of who they are attuned you.
          </SheetDescription>
        </SheetHeader>

        <a
          href="/upgrade"
          onClick={onUpgrade}
          className="mt-5 block w-full rounded-full bg-plum-500 px-5 py-3 text-center font-display text-[15px] font-medium text-paper shadow-elev-1 transition-colors hover:bg-plum-700"
        >
          Upgrade to Plus
        </a>
        <button
          type="button"
          onClick={onClose}
          className="mt-2 w-full rounded-full px-5 py-3 font-body text-[14px] font-medium text-plum-700 hover:bg-lavender-50"
        >
          Maybe later
        </button>
      </SheetContent>
    </Sheet>
  );
}