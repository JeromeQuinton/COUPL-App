// DEPRECATED — superseded by DifferencesCard. Retain for potential
// future deep-dive view per design backlog. Not rendered by the
// detail route. The reusable ring lives in ./AlignmentRing.tsx.
import { SectionCard } from "./SectionCard";

/**
 * Card 8 — Big Five Snapshot (DR-018, DR-013).
 * Five circular ring visualisations. Each ring honours the same
 * precision contract as <MetricDisplay/> — Phase 1 sample is exact,
 * Phase 4 will compute precision per pair from short/long-form state.
 */

type Trait = {
  key: string;
  label: string;
  value: number;
  /** stroke colour for the ring */
  stroke: string;
};

export function BigFiveSnapshotCard({
  values,
}: {
  values: {
    openness: number;
    conscientiousness: number;
    extraversion: number;
    agreeableness: number;
    neuroticism: number;
  };
}) {
  const traits: Trait[] = [
    { key: "openness", label: "Openness", value: values.openness, stroke: "var(--plum-500)" },
    {
      key: "conscientiousness",
      label: "Conscientiousness",
      value: values.conscientiousness,
      stroke: "var(--success)",
    },
    {
      key: "extraversion",
      label: "Extraversion",
      value: values.extraversion,
      stroke: "#C97B9A",
    },
    {
      key: "agreeableness",
      label: "Agreeableness",
      value: values.agreeableness,
      stroke: "var(--plum-500)",
    },
    {
      key: "neuroticism",
      label: "Neuroticism",
      value: values.neuroticism,
      stroke: "var(--plum-300)",
    },
  ];

  const [first, second, third, fourth, fifth] = traits;

  return (
    <SectionCard title="Big Five Snapshot">
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-4">
          <Ring trait={first} />
          <Ring trait={second} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Ring trait={third} />
          <Ring trait={fourth} />
        </div>
        <div className="flex justify-center">
          <Ring trait={fifth} />
        </div>
      </div>
      <p className="mt-4 text-center font-body text-[12px] italic text-stone">
        These are tendencies, not definitions.
      </p>
    </SectionCard>
  );
}

function Ring({ trait }: { trait: Trait }) {
  const size = 88;
  const stroke = 8;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const v = Math.max(0, Math.min(100, trait.value));
  const offset = c - (v / 100) * c;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="var(--lavender-100)"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={trait.stroke}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </svg>
        <div
          className="absolute inset-0 flex items-center justify-center font-display text-[16px] font-semibold text-ink"
          aria-label={`${trait.label} ${v}%`}
        >
          {v}%
        </div>
      </div>
      <span className="font-body text-[12px] font-medium text-ink">{trait.label}</span>
    </div>
  );
}