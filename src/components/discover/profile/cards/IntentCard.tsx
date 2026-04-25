import { SectionCard } from "./SectionCard";
import { Heart, Info } from "lucide-react";

/**
 * Card 1 — Intent (DR-023 vocabulary).
 * Pill chips reflect the user's stated intent + relationship style.
 * Header trailing slot carries the Attuned pill (DR-023 v2) — the
 * relabelled compatibility surface, relocated above the hero.
 */
export function IntentCard({
  primary,
  relationshipStyle,
  attunedValue,
  onInfo,
}: {
  primary: string;
  relationshipStyle: string;
  attunedValue: number;
  onInfo: () => void;
}) {
  return (
    <SectionCard
      title="Intent"
      trailing={<AttunedPill value={attunedValue} onInfo={onInfo} />}
    >
      <div className="flex flex-wrap gap-2">
        <Chip>{primary}</Chip>
        <Chip>{relationshipStyle}</Chip>
      </div>
      <p className="mt-3 font-body text-[12px] italic text-stone">
        Every connection begins with self-understanding.
      </p>
    </SectionCard>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-lavender-100 px-3 py-1.5 font-body text-[12px] font-medium text-plum-700">
      {children}
    </span>
  );
}

function AttunedPill({ value, onInfo }: { value: number; onInfo: () => void }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-paper px-3 py-1.5 shadow-elev-1">
      <Heart
        aria-hidden
        width={14}
        height={14}
        strokeWidth={2}
        className="text-plum-500"
        fill="currentColor"
      />
      <span className="font-display text-[13px] font-semibold leading-none text-plum-700">
        {value}% Attuned
      </span>
      <button
        type="button"
        onClick={onInfo}
        aria-label="About attunement"
        className="inline-flex h-4 w-4 items-center justify-center text-stone transition-colors hover:text-plum-500"
      >
        <Info aria-hidden width={12} height={12} strokeWidth={1.75} />
      </button>
    </div>
  );
}