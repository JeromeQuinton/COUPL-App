import { useState } from "react";
import { Info } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

/**
 * MetricDisplay — single source of truth for any compatibility / trait number
 * shown on the Discover profile view.
 *
 * Per DR-013 (weakest-link display precision):
 *  - precision="band" → render band label + a ~15% range bar aligned to the band
 *  - precision="exact" → render exact percentage + filled bar at that percentage
 *
 * Per DR-009, no placeholder "scores" should ever be shown as authoritative.
 * In Phase 1 the rendered numbers are stub data — once Phase 4 lands the same
 * component renders the computed values without UI changes.
 *
 * The info dot opens a bottom-sheet with a one-sentence observational
 * (non-diagnostic) explanation.
 */

export type MetricPrecision = "band" | "exact";

type Props = {
  /** 0–100 score. Used to compute the band and the bar fill. */
  value: number;
  /** Display label, e.g. "Empathy", "Compatibility", "Openness". */
  label: string;
  /** "exact" → numeric %. "band" → band label + range bar. */
  precision: MetricPrecision;
  /** One-sentence observational explanation shown in the info bottom-sheet. */
  infoText: string;
  /** Optional — overrides the auto-derived band label (e.g. "Shared Intent: aligned"). */
  bandLabelOverride?: string;
};

type Band = { min: number; max: number; label: (label: string) => string };

// Five bands across 0–100. Each band spans 20 points; the bar fill is the
// band's range (20%) — close enough to the spec's ~15% to read as a band, not
// a precise reading.
const BANDS: Band[] = [
  { min: 0, max: 20, label: (l) => `Low ${l}` },
  { min: 20, max: 40, label: (l) => `Moderately Low ${l}` },
  { min: 40, max: 60, label: (l) => `Moderate ${l}` },
  { min: 60, max: 80, label: (l) => `Moderately High ${l}` },
  { min: 80, max: 100, label: (l) => `High ${l}` },
];

function bandFor(value: number) {
  return BANDS.find((b) => value >= b.min && value < b.max) ?? BANDS[BANDS.length - 1];
}

export function MetricDisplay({
  value,
  label,
  precision,
  infoText,
  bandLabelOverride,
}: Props) {
  const [infoOpen, setInfoOpen] = useState(false);
  const clamped = Math.max(0, Math.min(100, value));
  const band = bandFor(clamped);
  const bandLabel = bandLabelOverride ?? band.label(label);

  return (
    <>
      <div className="w-full">
        <div className="flex items-baseline justify-between gap-3">
          {precision === "exact" ? (
            <p className="text-body-md text-slate">
              <span className="text-h2 font-semibold text-plum-700">{Math.round(clamped)}%</span>{" "}
              {label}
            </p>
          ) : (
            <p className="text-body-md text-plum-700">{bandLabel}</p>
          )}

          <button
            type="button"
            onClick={() => setInfoOpen(true)}
            aria-label={`What does ${label} mean?`}
            className="flex h-7 w-7 items-center justify-center rounded-full text-stone transition-colors hover:bg-lavender-50 hover:text-plum-500"
          >
            <Info aria-hidden width={14} height={14} strokeWidth={1.5} />
          </button>
        </div>

        {/* Range bar */}
        <div
          className="relative mt-2 h-1.5 w-full overflow-hidden rounded-full bg-lavender-100"
          role="img"
          aria-label={
            precision === "exact"
              ? `${label}: ${Math.round(clamped)} percent`
              : `${label}: ${bandLabel}`
          }
        >
          {precision === "exact" ? (
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-plum-500"
              style={{ width: `${clamped}%` }}
            />
          ) : (
            <div
              className="absolute inset-y-0 rounded-full bg-plum-300"
              style={{
                left: `${band.min}%`,
                width: `${band.max - band.min}%`,
              }}
            />
          )}
        </div>
      </div>

      <Sheet open={infoOpen} onOpenChange={setInfoOpen}>
        <SheetContent side="bottom" className="rounded-t-[24px] border-t border-line bg-paper">
          <SheetHeader>
            <SheetTitle className="text-h1 text-plum-700">{label}</SheetTitle>
            <SheetDescription className="text-body-md text-slate">
              {infoText}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}