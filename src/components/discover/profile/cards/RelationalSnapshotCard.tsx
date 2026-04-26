import { MetricDisplay } from "../MetricDisplay";
import { SectionCard } from "./SectionCard";

/**
 * Card 2 — Relational Snapshot (DR-013).
 * Pair-level metrics rendered through the shared <MetricDisplay/> so
 * the weakest-link precision rule is enforced in one place.
 */
export function RelationalSnapshotCard({
  empathy,
  communication,
  onInfo,
}: {
  empathy: number;
  communication: number;
  onInfo: (label: string, body: string) => void;
}) {
  return (
    <SectionCard
      title="Relational Snapshot"
      subtitle="A quick sense of how your styles align today."
    >
      <div className="flex flex-col gap-4">
        <MetricDisplay
          label="Empathy"
          value={empathy}
          precision="exact"
          infoText="How attuned you both are to emotional nuance."
          termKey="empathy"
        />
        <MetricDisplay
          label="Communication"
          value={communication}
          precision="exact"
          infoText="How aligned your communication styles are."
          termKey="communication"
        />
      </div>
    </SectionCard>
  );
}