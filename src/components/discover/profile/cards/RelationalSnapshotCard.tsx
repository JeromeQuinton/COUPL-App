import {
  RelationalBand,
  bandLabelFor,
} from "@/components/discover/profile/RelationalBand";
import { SectionCard } from "./SectionCard";

/**
 * Card 2 — Relational Snapshot (R4 Stream 1.1, DR-103).
 * Pair-level signals rendered as descriptive bands. The numeric inputs map
 * to one of five charter-aligned labels at the boundary; the surface itself
 * never carries the number.
 */
export function RelationalSnapshotCard({
  empathy,
  communication,
}: {
  empathy: number;
  communication: number;
  /**
   * Legacy callback kept for backwards-compatibility with existing
   * consumers; no longer wired since the band primitive doesn't surface
   * numeric metrics.
   */
  onInfo?: (label: string, body: string) => void;
}) {
  return (
    <SectionCard
      title="Relational Snapshot"
      subtitle="A quick sense of how your styles align today."
    >
      <div className="flex flex-col gap-4">
        <RelationalBand
          dimension="Empathy"
          label={bandLabelFor(empathy)}
          context="How attuned you both are to emotional nuance."
        />
        <RelationalBand
          dimension="Communication"
          label={bandLabelFor(communication)}
          context="How aligned your communication styles are."
        />
      </div>
    </SectionCard>
  );
}
