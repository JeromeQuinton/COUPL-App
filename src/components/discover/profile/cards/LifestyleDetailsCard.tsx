import { SectionCard } from "./SectionCard";
import type { ProfileDetail } from "@/data/discover_profile_detail_sample";

/**
 * Card 10 — Lifestyle & Details. Two-column label + chip-value grid.
 *
 * Empty-field policy: any field whose value is undefined / null /
 * empty string / "Undisclosed" / "Prefer not to say" is hidden
 * entirely (label and chip both). Sub-sections with no remaining
 * fields collapse. If the entire module is empty, the module itself
 * does not render.
 */

const EMPTY_TOKENS = new Set(["", "undisclosed", "prefer not to say"]);

function isMeaningful(value: string | null | undefined): value is string {
  if (value == null) return false;
  return !EMPTY_TOKENS.has(value.trim().toLowerCase());
}

type Field = { label: string; value: string | null | undefined };
type Group = Field[];

export function LifestyleDetailsCard({
  data,
}: {
  data: ProfileDetail["lifestyle"];
}) {
  const groups: Group[] = [
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
    [{ label: "Pronouns", value: data.pronouns }],
  ];

  const visibleGroups = groups
    .map((g) => g.filter((f) => isMeaningful(f.value)))
    .filter((g) => g.length > 0);

  if (visibleGroups.length === 0) return null;

  return (
    <SectionCard title="Lifestyle & Details">
      <div className="flex flex-col gap-3">
        {visibleGroups.map((row, i) => (
          <div key={i} className="grid grid-cols-2 gap-3">
            {row.map((c) => (
              <Cell key={c.label} label={c.label} value={c.value as string} />
            ))}
          </div>
        ))}
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
      <span className="inline-flex w-fit items-center rounded-full bg-blush px-3 py-1.5 font-body text-[12px] font-medium text-ink">
        {value}
      </span>
    </div>
  );
}
