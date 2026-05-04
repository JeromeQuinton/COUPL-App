import type { RelationalBandLabel } from "@/components/discover/profile/RelationalBand";

/**
 * Insights fixtures — moved out of route file per R4 Stream 1.4.
 * Pattern bands are descriptive labels only (no numeric scores).
 *
 * Phase 4 reads from the assessments table joined on profile detail.
 */

export const CONNECTION_LANGUAGES_RADAR: { label: string; value: number }[] = [
  { label: "Words", value: 92 },
  { label: "Slow time", value: 84 },
  { label: "Building", value: 58 },
  { label: "Closeness", value: 71 },
  { label: "Care", value: 66 },
];

export const CONNECTION_LANGUAGES_PATTERNS: {
  title: string;
  band: RelationalBandLabel;
  body: string;
}[] = [
  {
    title: "Words of attention",
    band: "closely attuned",
    body: "Being noticed in language. Specific naming. Letters.",
  },
  {
    title: "Slow time together",
    band: "shared presence",
    body: "Long unscheduled stretches. The walk that becomes dinner.",
  },
  {
    title: "Quiet closeness",
    band: "steady pace observed",
    body: "Easy proximity. Reading on the same couch. Hand on a shoulder.",
  },
  {
    title: "Acts of care",
    band: "room for discovery",
    body: "Coffee made the way you like it. The errand done before you asked.",
  },
  {
    title: "Building together",
    band: "distinct rhythms noticed",
    body: "Small projects, shared. The studio shelf you put up on a Sunday.",
  },
];
