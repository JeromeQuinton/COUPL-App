import { useState } from "react";
import { Info } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
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
  /**
   * When provided, tapping the button navigates to this in-app path
   * instead of opening the bottom sheet. Used by Relational Insights
   * to deep-link into the dedicated explainer screen
   * (e.g. /discover/$id/insights/connection-languages).
   */
  navigateTo,
}: {
  termKey: string;
  inline?: boolean;
  navigateTo?: string;
}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const content = INFO_CONTENT[termKey];

  if (!content) {
    if (typeof console !== "undefined") {
      console.warn(`[InfoButton] Missing INFO_CONTENT entry for "${termKey}"`);
    }
    return null;
  }

  const handleClick = () => {
    if (navigateTo) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      navigate({ to: navigateTo as any });
      return;
    }
    setOpen(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        aria-label={`More information about ${content.termName}`}
        className={
          (inline ? "inline-flex align-middle " : "inline-flex ") +
          "relative h-4 w-4 items-center justify-center rounded-full border border-plum-500/40 text-plum-500 opacity-80 transition-opacity hover:opacity-100 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-plum-500/40"
        }
      >
        <Info aria-hidden width={11} height={11} strokeWidth={2} />
        {/* Invisible 32x32 tap target */}
        <span aria-hidden className="absolute -inset-2" />
      </button>

      {navigateTo ? null : (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="bottom"
          className="rounded-t-[24px] border-t border-line bg-paper px-5 pb-8 pt-6"
        >
          <SheetHeader className="text-left">
            <SheetTitle className="font-display text-[18px] font-semibold text-ink">
              {content.termName}
            </SheetTitle>
          </SheetHeader>

          <div className="mt-4 h-px w-full bg-line/60" />

          <section className="mt-4 flex flex-col gap-2">
            <h3 className="font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-plum-700">
              What this means
            </h3>
            <p className="font-body text-[14px] leading-relaxed text-ink">
              {content.whatThisMeans}
            </p>
          </section>

          <section className="mt-5 flex flex-col gap-2">
            <h3 className="font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-plum-700">
              What it means for you
            </h3>
            <p className="font-body text-[14px] leading-relaxed text-ink">
              {content.whatItMeansForYou}
            </p>
          </section>

          {content.ctaLabel && content.ctaDestination ? (
            <a
              href={content.ctaDestination}
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-plum-500 px-5 py-3 font-body text-[14px] font-medium text-paper transition-opacity hover:opacity-90"
            >
              {content.ctaLabel}
            </a>
          ) : null}
        </SheetContent>
      </Sheet>
      )}
    </>
  );
}