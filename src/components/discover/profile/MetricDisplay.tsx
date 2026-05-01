import { Info } from "lucide-react";
import { InfoButton } from "@/components/discover/InfoButton";

/**
 * Shared MetricDisplay (DR-013).
 *
 *   precision='exact' → renders exact %, filled bar (gradient plum)
 *   precision='band'  → renders alignment band label, range bar
 *
 * Every numeric metric on /discover/[id] routes through this so the
 * weakest-link rule in DR-013 is enforced in one place. Phase 1 sample
 * defaults all instances to 'exact'; Phase 4 wires per-pair precision
 * derived from short-form vs long-form completion state.
 */

export type MetricPrecision = "exact" | "band";

export type MetricDisplayProps = {
  value: number; // 0–100
  precision: MetricPrecision;
  label: string;
  /** Plain-language, observational explanation surfaced via info dot. */
  infoText: string;
  onInfo?: (label: string, infoText: string) => void;
  /**
   * When provided, renders a shared <InfoButton/> sourced from the
   * INFO_CONTENT registry instead of the legacy local info dot.
   * Takes precedence over onInfo.
   */
  termKey?: string;
  /** Visual variant — `inline` is label + bar in a row, `stacked` is label / value above bar. */
  variant?: "inline" | "stacked";
};

const bandLabel = (v: number) => {
  if (v >= 81) return "Strongly Aligned";
  if (v >= 66) return "Well Aligned";
  if (v >= 51) return "Aligned";
  return "Early Signal";
};

const bandRange = (v: number): [number, number] => {
  if (v >= 81) return [81, 100];
  if (v >= 66) return [66, 80];
  if (v >= 51) return [65, 65];
  return [0, 50];
};

export function MetricDisplay({
  value,
  precision,
  label,
  infoText,
  onInfo,
  termKey,
  variant = "stacked",
}: MetricDisplayProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const isExact = precision === "exact";
  const display = isExact ? `${clamped}%` : bandLabel(clamped);
  const [lo, hi] = isExact ? [0, clamped] : bandRange(clamped);

  return (
    <div className={variant === "inline" ? "flex items-center gap-3" : "flex flex-col gap-1.5"}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <span className="font-body text-[13px] font-medium text-ink">{label}</span>
          {termKey ? (
            <InfoButton termKey={termKey} />
          ) : onInfo ? (
            <button
              type="button"
              onClick={() => onInfo(label, infoText)}
              aria-label={`About ${label}`}
              className="inline-flex h-4 w-4 items-center justify-center rounded-full text-stone transition-colors hover:text-plum-500"
            >
              <Info aria-hidden width={13} height={13} strokeWidth={1.75} />
            </button>
          ) : null}
        </div>
        <span className="font-display text-[13px] font-semibold text-ink">{display}</span>
      </div>
      <div
        className="relative h-2 w-full overflow-hidden rounded-full bg-blush"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clamped}
        aria-label={`${label}: ${display}`}
      >
        <div
          className="absolute inset-y-0 rounded-full"
          style={{
            left: `${lo}%`,
            width: `${Math.max(2, hi - lo)}%`,
            background:
              "linear-gradient(90deg, var(--plum-300) 0%, var(--plum-500) 100%)",
          }}
        />
      </div>
    </div>
  );
}
