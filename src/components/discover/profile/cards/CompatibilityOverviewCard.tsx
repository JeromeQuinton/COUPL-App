import { Sparkles, Compass, Users, Heart, Waves, Target } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { SectionCard } from "./SectionCard";

/**
 * Card 4 — Compatibility Overview (DR-018).
 * Exactly 6 chips, fixed order. DR-018 is authoritative — do not
 * substitute alternative trait taxonomies (Values/Pacing/etc).
 * Neuroticism is surfaced positively as "Emotional Balance" per DR-018.
 */

type ChipDef = {
  key: keyof typeof CHIP_VALUE_KEYS;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  tint: string; // background tint
};

const CHIP_VALUE_KEYS = {
  openness: "openness",
  conscientiousness: "conscientiousness",
  extraversion: "extraversion",
  agreeableness: "agreeableness",
  emotionalBalance: "emotionalBalance",
  sharedIntent: "sharedIntent",
} as const;

const CHIPS: ChipDef[] = [
  { key: "openness", label: "Openness", icon: Sparkles, tint: "var(--lavender-100)" },
  { key: "conscientiousness", label: "Conscientiousness", icon: Target, tint: "#F3E8F5" },
  { key: "extraversion", label: "Extraversion", icon: Users, tint: "#F6E7F2" },
  { key: "agreeableness", label: "Agreeableness", icon: Heart, tint: "#FAF5FB" },
  { key: "emotionalBalance", label: "Emotional Balance", icon: Waves, tint: "#F3E8F5" },
  { key: "sharedIntent", label: "Shared Intent", icon: Compass, tint: "#FCEEF0" },
];

export function CompatibilityOverviewCard({
  values,
}: {
  values: {
    openness: number;
    conscientiousness: number;
    extraversion: number;
    agreeableness: number;
    emotionalBalance: number;
    sharedIntent: number;
  };
}) {
  return (
    <SectionCard
      title="Compatibility Overview"
      subtitle="Balanced traits and values you both prioritize."
    >
      <div className="grid grid-cols-2 gap-2.5">
        {CHIPS.map((c) => {
          const Icon = c.icon;
          const v = values[c.key];
          return (
            <div
              key={c.key}
              className="flex items-center justify-between gap-2 rounded-[14px] px-3 py-2.5"
              style={{ backgroundColor: c.tint }}
            >
              <div className="flex min-w-0 items-center gap-2">
                <Icon
                  aria-hidden
                  width={14}
                  height={14}
                  strokeWidth={1.75}
                  className="flex-shrink-0 text-plum-500"
                />
                <span className="truncate font-body text-[12px] font-medium text-ink">
                  {c.label}
                </span>
              </div>
              <span className="font-display text-[12px] font-semibold text-plum-700">
                {v}%
              </span>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}