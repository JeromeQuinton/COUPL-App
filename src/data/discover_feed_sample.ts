/**
 * Sample data for the curated daily feed (DR-019).
 *
 * Phase 1 stub only — Phase 4 replaces this with the computed
 * `daily_profile_queues` + `pair_compatibility` outputs (see DR-017).
 *
 * Per DR-021 the feed surfaces alignment BANDS, never percentages.
 * The `bandValue` field is here purely so we can derive a band label
 * deterministically; it is never rendered as a number in the feed.
 */

export const DAILY_QUEUE_SIZE = 8;

export type AlignmentBand =
  | "Strongly Aligned"
  | "Well Aligned"
  | "Aligned"
  | "Early Signal";

export type FeedProfile = {
  id: string;
  name: string;
  age: number;
  city: string;
  distanceKm: number;
  observation: string;
  /** 0–100 — internal only. Never rendered in the feed. */
  bandValue: number;
  band: AlignmentBand;
  /** Lavender / blush gradient seed for the photo placeholder. */
  hue: string;
};

export const bandFor = (value: number): AlignmentBand => {
  if (value >= 81) return "Strongly Aligned";
  if (value >= 66) return "Well Aligned";
  if (value >= 51) return "Aligned";
  return "Early Signal";
};

// Distribution per spec: 2 Strongly, 3 Well, 2 Aligned, 1 Early Signal.
export const SAMPLE_FEED: FeedProfile[] = [
  {
    id: "p-maya",
    name: "Maya",
    age: 31,
    city: "Camden",
    distanceKm: 5,
    observation: "Both seeking intentional connection.",
    bandValue: 84,
    band: "Strongly Aligned",
    hue: "#F3E8F5",
  },
  {
    id: "p-lena",
    name: "Lena",
    age: 27,
    city: "Islington",
    distanceKm: 3,
    observation: "Shared focus on honesty and empathy.",
    bandValue: 82,
    band: "Strongly Aligned",
    hue: "#FCEEF0",
  },
  {
    id: "p-noah",
    name: "Noah",
    age: 30,
    city: "Brixton",
    distanceKm: 6,
    observation: "Both prefer slower, deliberate getting-to-know.",
    bandValue: 78,
    band: "Well Aligned",
    hue: "#EFE2F4",
  },
  {
    id: "p-ari",
    name: "Ari",
    age: 33,
    city: "Greenwich",
    distanceKm: 9,
    observation: "You both value steady, thoughtful pacing.",
    bandValue: 72,
    band: "Well Aligned",
    hue: "#F6E7F2",
  },
  {
    id: "p-saoirse",
    name: "Saoirse",
    age: 29,
    city: "Peckham",
    distanceKm: 4,
    observation: "Aligned on quiet weekends and long conversations.",
    bandValue: 68,
    band: "Well Aligned",
    hue: "#FDE9C2",
  },
  {
    id: "p-rohan",
    name: "Rohan",
    age: 35,
    city: "Shoreditch",
    distanceKm: 7,
    observation: "Curious about each other's creative practice.",
    bandValue: 62,
    band: "Aligned",
    hue: "#D9E4DC",
  },
  {
    id: "p-imogen",
    name: "Imogen",
    age: 28,
    city: "Hackney",
    distanceKm: 2,
    observation: "A shared appreciation for unhurried mornings.",
    bandValue: 56,
    band: "Aligned",
    hue: "#E8D5EC",
  },
  {
    id: "p-finn",
    name: "Finn",
    age: 32,
    city: "Stoke Newington",
    distanceKm: 8,
    observation: "Different rhythms; some shared values to explore.",
    bandValue: 47,
    band: "Early Signal",
    hue: "#EFEFEF",
  },
];
