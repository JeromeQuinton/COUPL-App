import { SectionCard } from "./SectionCard";

/**
 * Card 1 — Intent (DR-023 vocabulary).
 * Pill chips reflect the user's stated intent + relationship style.
 */
export function IntentCard({
  primary,
  relationshipStyle,
}: {
  primary: string;
  relationshipStyle: string;
}) {
  return (
    <SectionCard title="Intent">
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