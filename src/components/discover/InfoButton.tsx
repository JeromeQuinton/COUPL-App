import { useState } from "react";
import { Info } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { INFO_CONTENT } from "@/data/info_button_content";

/**
 * InfoButton — explainability affordance for any psychological term,
 * score, or assessment surfaced in the UI. Tapping opens a bottom sheet
 * with "What this means" + "What it means for you" copy sourced from
 * the central registry (`info_button_content.ts`).
 *
 * v0 copy is placeholder pending psych advisor sign-off (DR-015).
 */
export function InfoButton({
  termKey,
  inline = true,
}: {
  termKey: string;
  inline?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const content = INFO_CONTENT[termKey];

  if (!content) {
    if (typeof console !== "undefined") {
      console.warn(`[InfoButton] Missing INFO_CONTENT entry for "${termKey}"`);
    }
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`More information about ${content.termName}`}
        className={
          (inline ? "inline-flex align-middle " : "inline-flex ") +
          "relative h-4 w-4 items-center justify-center rounded-full border border-rust/40 text-rust opacity-80 transition-opacity hover:opacity-100 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
        }
      >
        <Info aria-hidden width={11} height={11} strokeWidth={2} />
        {/* Invisible 32x32 tap target */}
        <span aria-hidden className="absolute -inset-2" />
      </button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="bottom"
          className="rounded-t-[24px] border-t border-ink bg-blush px-5 pb-8 pt-6"
        >
          <SheetHeader className="text-left">
            <SheetTitle className="font-display text-[18px] font-semibold text-ink">
              {content.termName}
            </SheetTitle>
          </SheetHeader>

          <div className="mt-4 h-px w-full bg-line/60" />

          <section className="mt-4 flex flex-col gap-2">
            <h3 className="font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">
              What this means
            </h3>
            <p className="font-body text-[14px] leading-relaxed text-ink">
              {content.whatThisMeans}
            </p>
          </section>

          <section className="mt-5 flex flex-col gap-2">
            <h3 className="font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">
              What it means for you
            </h3>
            <p className="font-body text-[14px] leading-relaxed text-ink">
              {content.whatItMeansForYou}
            </p>
          </section>

          {content.ctaLabel && content.ctaDestination ? (
            <a
              href={content.ctaDestination}
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-ink px-5 py-3 font-body text-[14px] font-medium text-blush transition-opacity hover:opacity-90"
            >
              {content.ctaLabel}
            </a>
          ) : null}
        </SheetContent>
      </Sheet>
    </>
  );
}