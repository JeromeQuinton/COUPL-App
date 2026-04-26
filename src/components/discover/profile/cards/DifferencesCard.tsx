import { SectionCard } from "./SectionCard";
import { AlignmentRing } from "./AlignmentRing";
import { InfoButton } from "@/components/discover/InfoButton";
import { VIEWER_PROFILE } from "@/data/discover_profile_detail_sample";
import { TRAIT_DIFFERENCES_COPY } from "@/data/trait_differences_copy";

/**
 * Card — "Worth being curious about" (DifferencesCard).
 * Supersedes Big Five Snapshot in the detail view. Surfaces the 2
 * lowest-alignment traits between viewer and profile. Edge case:
 * when all 6 traits sit within 4% of each other AND every alignment
 * is above 92%, renders a single celebratory "remarkably aligned"
 * state instead.
 *
 * Selection logic intentionally mirrors <CompatibilityOverviewCard/>'s
 * alignment heuristic so the two modules tell a coherent story.
 */

type TraitKey =
  | "openness"
  | "conscientiousness"
  | "extraversion"
  | "agreeableness"
  | "emotionalBalance"
  | "sharedIntent";

const TRAIT_LABELS: Record<TraitKey, string> = {
  openness: "Openness",
  conscientiousness: "Conscientiousness",
  extraversion: "Extraversion",
  agreeableness: "Agreeableness",
  emotionalBalance: "Emotional Balance",
  sharedIntent: "Shared Intent",
};

const TRAIT_ORDER: TraitKey[] = [
  "openness",
  "conscientiousness",
  "extraversion",
  "agreeableness",
  "emotionalBalance",
  "sharedIntent",
];

// V0 PLACEHOLDER alignment heuristic — mirrors CompatibilityOverviewCard
function computeAlignment(viewer: number, profile: number): number {
  return Math.max(0, 100 - Math.abs(viewer - profile));
}

export function DifferencesCard({
  values,
  profileName,
}: {
  values: Record<TraitKey, number>;
  profileName: string;
}) {
  const rows = TRAIT_ORDER.map((key) => {
    const viewer = VIEWER_PROFILE[key];
    const theirs = values[key];
    return {
      key,
      label: TRAIT_LABELS[key],
      viewer,
      theirs,
      alignment: computeAlignment(viewer, theirs),
    };
  });

  const alignments = rows.map((r) => r.alignment);
  const minA = Math.min(...alignments);
  const maxA = Math.max(...alignments);
  const remarkablyAligned = minA > 92 && maxA - minA <= 4;

  if (remarkablyAligned) {
    const overall = Math.round(alignments.reduce((s, n) => s + n, 0) / alignments.length);
    return (
      <SectionCard
        title={
          <span className="inline-flex items-center gap-1.5">
            Remarkably aligned
            <InfoButton termKey="differences_card" />
          </span>
        }
        subtitle="Your styles run unusually close on every trait we measure."
      >
        <div className="flex justify-center py-2">
          <AlignmentRing value={overall} />
        </div>
        <p className="mt-4 text-center font-body text-[12px] italic text-stone">
          Worth being curious about each other anyway.
        </p>
      </SectionCard>
    );
  }

  // Sort ascending by alignment, take the 2 lowest. Stable on ties via
  // original TRAIT_ORDER (which sort preserves for equal keys).
  const surfaced = [...rows].sort((a, b) => a.alignment - b.alignment).slice(0, 2);

  return (
    <SectionCard
      title={
        <span className="inline-flex items-center gap-1.5">
          Worth being curious about
          <InfoButton termKey="differences_card" />
        </span>
      }
      subtitle="Where your styles are most different."
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:gap-4">
        {surfaced.map((r) => {
          const copy = TRAIT_DIFFERENCES_COPY[r.key];
          const direction =
            r.viewer > r.theirs ? copy.whenViewerHigher : copy.whenProfileHigher;
          return (
            <div
              key={r.key}
              className="flex flex-1 flex-col items-center gap-2 text-center"
            >
              <AlignmentRing value={r.alignment} label={r.label} />
              <p className="font-body text-[11px] text-stone">
                You {r.viewer}% · {profileName} {r.theirs}%
              </p>
              <p className="mt-2 font-body text-[13px] leading-relaxed text-ink">
                {direction}
              </p>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-center font-body text-[12px] italic text-stone">
        These are tendencies, not definitions.
      </p>
    </SectionCard>
  );
}
