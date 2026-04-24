import { SlidersHorizontal, BadgeCheck } from "lucide-react";
import { MetricDisplay, type MetricPrecision } from "@/components/discover/MetricDisplay";

type Props = {
  name: string;
  age: number;
  city: string;
  prompt: string;
  answer: string;
  /** 0–100. How the metric renders is decided by `precisionMode`. */
  compatibility: number;
  /** Per DR-013: weakest-link decides band vs. exact. */
  precisionMode: MetricPrecision;
  verified?: boolean;
  imageHue?: string;
};

/**
 * ProfileView — the daily profile view rendered on /discover.
 * Per DR-006/DR-007: ONE complete profile at a time, on the /discover route.
 * No deck, no swipe, no preview. The next profile replaces this one in place
 * after the user takes a Not Today / Invite to Chat action.
 *
 * Visual structure (matches 411HomeSwipeDeck reference):
 *   - Header card: name • age, city, filter icon, Verified pill
 *   - Compatibility metric (renders via MetricDisplay → DR-013 compliant)
 *   - Photo area with bottom gradient + prompt overlay
 */
export function ProfileView({
  name,
  age,
  city,
  prompt,
  answer,
  compatibility,
  precisionMode,
  verified = true,
  imageHue = "#F3E8F5",
}: Props) {
  return (
    <article className="flex h-full flex-col gap-3">
      {/* Header card */}
      <div className="flex items-center justify-between rounded-[20px] bg-paper px-5 py-4 shadow-elev-1">
        <div>
          <h2 className="text-h1 text-plum-700">
            {name} <span className="text-plum-700">• {age}</span>
          </h2>
          <p className="mt-1 text-body-sm text-stone">{city}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Filters"
            className="flex h-9 w-9 items-center justify-center rounded-full text-plum-500 transition-colors hover:bg-lavender-50"
          >
            <SlidersHorizontal aria-hidden width={20} height={20} strokeWidth={1.5} />
          </button>
          {verified && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-plum-300 px-3 py-1.5 text-body-sm font-medium text-plum-500">
              <BadgeCheck aria-hidden width={16} height={16} strokeWidth={1.75} />
              Verified
            </span>
          )}
        </div>
      </div>

      {/* Compatibility metric — routes through MetricDisplay (DR-013) */}
      <div className="rounded-[20px] bg-paper px-5 py-4 shadow-elev-1">
        <MetricDisplay
          value={compatibility}
          label="Compatibility"
          precision={precisionMode}
          infoText={
            precisionMode === "band"
              ? "Compatibility reflects how your styles align across the assessments you've both completed. Shown as a band because one of you has only completed the short-form assessment."
              : "Compatibility reflects how your styles align across the assessments you've both completed. It's a mirror, not a ranking."
          }
        />
      </div>

      {/* Photo area */}
      <div
        className="relative flex-1 overflow-hidden rounded-[24px] shadow-elev-2"
        style={{
          background: `linear-gradient(160deg, ${imageHue} 0%, var(--lavender-100) 55%, #E8D5EC 100%)`,
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5"
          style={{
            background:
              "linear-gradient(to top, rgba(26,26,26,0.72) 0%, rgba(26,26,26,0.4) 40%, rgba(26,26,26,0) 100%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-body-sm uppercase tracking-[0.14em] text-paper/80">Prompt</p>
          <p className="mt-1 text-h1 text-paper">{prompt}</p>
          <p className="mt-2 text-body-md text-paper/90">{answer}</p>
        </div>
      </div>
    </article>
  );
}