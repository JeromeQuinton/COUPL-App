import { SectionCard } from "./SectionCard";
import type { ProfileDetail } from "@/data/discover_profile_detail_sample";

/**
 * Card 10 — Lifestyle & Details. Two-column label + chip-value grid.
 */
export function LifestyleDetailsCard({
  data,
}: {
  data: ProfileDetail["lifestyle"];
}) {
  const rows: { label: string; value: string }[][] = [
    [
      { label: "Work", value: data.work },
      { label: "Education", value: data.education },
    ],
    [
      { label: "Exercise", value: data.exercise },
      { label: "Diet", value: data.diet },
    ],
    [
      { label: "Drinking", value: data.drinking },
      { label: "Smoking", value: data.smoking },
    ],
    [
      { label: "Kids", value: data.kids },
      { label: "Have Kids", value: data.haveKids },
    ],
    [
      { label: "Height", value: data.height },
      { label: "Politics", value: data.politics },
    ],
    [
      { label: "Religion", value: data.religion },
      { label: "Language", value: data.language },
    ],
  ];

  return (
    <SectionCard title="Lifestyle & Details">
      <div className="flex flex-col gap-3">
        {rows.map((row, i) => (
          <div key={i} className="grid grid-cols-2 gap-3">
            {row.map((c) => (
              <Cell key={c.label} label={c.label} value={c.value} />
            ))}
          </div>
        ))}
        <div className="grid grid-cols-2 gap-3">
          <Cell label="Pronouns" value={data.pronouns} />
        </div>
      </div>
    </SectionCard>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-body text-[11px] uppercase tracking-wide text-stone">
        {label}
      </span>
      <span className="inline-flex w-fit items-center rounded-full bg-lavender-100 px-3 py-1.5 font-body text-[12px] font-medium text-plum-700">
        {value}
      </span>
    </div>
  );
}