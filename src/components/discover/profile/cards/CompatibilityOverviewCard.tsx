import { useState } from "react";
import { Sparkles, Compass, Users, Heart, Waves, Target } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { SectionCard } from "./SectionCard";
import { InfoButton } from "@/components/discover/InfoButton";
import { VIEWER_PROFILE } from "@/data/discover_profile_detail_sample";
import { computeAlignment } from "@/lib/compatibility";
import { bandLabelFor } from "@/components/discover/profile/RelationalBand";

/**
 * Card 4 — Compatibility Overview (DR-018).
 * YOU-vs-THEM alignment view. Distinct from Big Five Snapshot
 * (raw psychological profile). Renders 6 stacked trait rows, each
 * showing per-trait alignment % + a thin alignment bar + raw scores.
 */

type TraitKey =
  | "openness"
  | "conscientiousness"
  | "extraversion"
  | "agreeableness"
  | "emotionalBalance"
  | "sharedIntent";

type TraitDef = {
  key: TraitKey;
  label: string;
  termKey: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const TRAITS: TraitDef[] = [
  { key: "openness", label: "Openness", termKey: "openness", icon: Sparkles },
  { key: "conscientiousness", label: "Conscientiousness", termKey: "conscientiousness", icon: Target },
  { key: "extraversion", label: "Extraversion", termKey: "extraversion", icon: Users },
  { key: "agreeableness", label: "Agreeableness", termKey: "agreeableness", icon: Heart },
  { key: "emotionalBalance", label: "Emotional Balance", termKey: "emotional_balance", icon: Waves },
  { key: "sharedIntent", label: "Shared Intent", termKey: "shared_intent", icon: Compass },
];

export function CompatibilityOverviewCard({
  values,
  profileName,
}: {
  values: {
    openness: number;
    conscientiousness: number;
    extraversion: number;
    agreeableness: number;
    emotionalBalance: number;
    sharedIntent: number;
  };
  profileName: string;
}) {
  const rows = TRAITS.map((t) => {
    const viewer = VIEWER_PROFILE[t.key];
    const theirs = values[t.key];
    return { ...t, viewer, theirs, alignment: computeAlignment(viewer, theirs) };
  });

  const overall = Math.round(
    rows.reduce((sum, r) => sum + r.alignment, 0) / rows.length,
  );

  const [expanded, setExpanded] = useState(false);

  // Top 3 highest-aligned traits (stable ordering on ties via TRAITS order).
  const topThree = [...rows]
    .sort((a, b) => b.alignment - a.alignment)
    .slice(0, 3);

  return (
    <SectionCard
      title={
        <span className="inline-flex items-baseline gap-1.5">
          <span className="inline-flex items-center gap-1.5">
            Compatibility Overview
            <InfoButton termKey="compatibility_overview" />
          </span>
          <span
            className="font-body text-[14px] font-medium text-plum-700"
            style={{ marginLeft: "12px" }}
          >
            {overall}% Aligned overall
          </span>
        </span>
      }
      subtitle={`How aligned you are with ${profileName} across the traits that matter most.`}
    >
      {!expanded ? (
        <div className="flex flex-col gap-3">
          <p className="font-body text-[13px] text-ink">
            <span className="text-stone">Strong fit on: </span>
            {topThree.map((r) => r.label).join(", ")}
          </p>
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="self-start font-body text-[13px] font-medium text-plum-700"
            aria-expanded={false}
            aria-controls="compat-overview-bars"
          >
            See all six →
          </button>
        </div>
      ) : (
        <div id="compat-overview-bars" className="flex flex-col gap-4">
          {rows.map((r) => {
          const Icon = r.icon;
          return (
            <div key={r.key} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-1.5">
                  <Icon
                    aria-hidden
                    width={14}
                    height={14}
                    strokeWidth={1.75}
                    className="flex-shrink-0 text-plum-500"
                  />
                  <span className="font-body text-[13px] font-medium text-ink">
                    {r.label}
                  </span>
                  <InfoButton termKey={r.termKey} />
                </div>
                <span className="font-display text-[12.5px] italic text-plum-700">
                  {bandLabelFor(r.alignment)}
                </span>
              </div>
              <p className="font-body text-[11px] text-stone">
                Polaris reads {r.label.toLowerCase()} as a {bandLabelFor(r.alignment)} signal.
              </p>
            </div>
          );
          })}
          <button
            type="button"
            onClick={() => setExpanded(false)}
            className="self-start font-body text-[13px] font-medium text-plum-700"
            aria-expanded={true}
            aria-controls="compat-overview-bars"
          >
            Show less
          </button>
        </div>
      )}
    </SectionCard>
  );
}
