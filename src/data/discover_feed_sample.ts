/**
 * Sample data for the ongoing filterable feed (DR-024).
 *
 * Phase 1 stub only — Phase 4 replaces this with the computed
 * `daily_recommendations` + `pair_compatibility` outputs (DR-017).
 *
 * Per DR-021 the feed surfaces alignment BANDS, never percentages.
 * `bandValue` is internal only — used to derive the band label
 * deterministically; never rendered as a number.
 */

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
  /** 0–100 — internal only. Never rendered. */
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

/* AUTO-GENERATED block start */
export const SAMPLE_FEED: FeedProfile[] = [
  { id: "p-maya-1", name: "Maya", age: 34, city: "Crystal Palace", distanceKm: 8, observation: "Curious about each other's creative practice.", bandValue: 91, band: "Strongly Aligned", hue: "#F7E1D4" },
  { id: "p-lena-2", name: "Lena", age: 32, city: "Clapham", distanceKm: 18, observation: "Different rhythms; some shared values to explore.", bandValue: 92, band: "Strongly Aligned", hue: "#FAE6D5" },
  { id: "p-noah-3", name: "Noah", age: 38, city: "Putney", distanceKm: 2, observation: "Different rhythms; some shared values to explore.", bandValue: 75, band: "Well Aligned", hue: "#FCEEF0" },
  { id: "p-ari-4", name: "Ari", age: 38, city: "Walthamstow", distanceKm: 13, observation: "Both lean towards gentle, considered communication.", bandValue: 91, band: "Strongly Aligned", hue: "#EFE2F4" },
  { id: "p-saoirse-5", name: "Saoirse", age: 29, city: "Tooting", distanceKm: 11, observation: "A shared appreciation for unhurried mornings.", bandValue: 59, band: "Aligned", hue: "#E8E2D6" },
  { id: "p-rohan-6", name: "Rohan", age: 32, city: "Holloway", distanceKm: 15, observation: "Aligned on quiet weekends and long conversations.", bandValue: 67, band: "Well Aligned", hue: "#F2DDE9" },
  { id: "p-imogen-7", name: "Imogen", age: 28, city: "Stoke Newington", distanceKm: 18, observation: "A common pull towards slower seasons.", bandValue: 92, band: "Strongly Aligned", hue: "#F2DDE9" },
  { id: "p-finn-8", name: "Finn", age: 37, city: "Tooting", distanceKm: 14, observation: "Both value emotional steadiness over sparks.", bandValue: 77, band: "Well Aligned", hue: "#F4DCE8" },
  { id: "p-aisha-9", name: "Aisha", age: 31, city: "Stoke Newington", distanceKm: 5, observation: "Aligned on building rituals that feel like home.", bandValue: 60, band: "Aligned", hue: "#E8E2D6" },
  { id: "p-theo-10", name: "Theo", age: 27, city: "Putney", distanceKm: 2, observation: "You both value steady, thoughtful pacing.", bandValue: 63, band: "Aligned", hue: "#FDE9C2" },
  { id: "p-beatrice-11", name: "Beatrice", age: 36, city: "Shoreditch", distanceKm: 14, observation: "Curiosity meets warmth on both sides.", bandValue: 75, band: "Well Aligned", hue: "#EFE2F4" },
  { id: "p-jude-12", name: "Jude", age: 32, city: "Bermondsey", distanceKm: 15, observation: "Aligned on building rituals that feel like home.", bandValue: 85, band: "Strongly Aligned", hue: "#F2DDE9" },
  { id: "p-priya-13", name: "Priya", age: 34, city: "Forest Hill", distanceKm: 1, observation: "Both lean into vulnerability when it counts.", bandValue: 40, band: "Early Signal", hue: "#F6E7F2" },
  { id: "p-oscar-14", name: "Oscar", age: 36, city: "Lewisham", distanceKm: 9, observation: "Shared interest in walks, books, and Sunday cooking.", bandValue: 51, band: "Aligned", hue: "#FAE6D5" },
  { id: "p-niamh-15", name: "Niamh", age: 27, city: "Battersea", distanceKm: 14, observation: "Curious about each other's creative practice.", bandValue: 49, band: "Early Signal", hue: "#F7E1D4" },
  { id: "p-sebastian-16", name: "Sebastian", age: 26, city: "Crystal Palace", distanceKm: 9, observation: "Aligned on building rituals that feel like home.", bandValue: 55, band: "Aligned", hue: "#D9E4DC" },
  { id: "p-yasmin-17", name: "Yasmin", age: 34, city: "Greenwich", distanceKm: 10, observation: "Shared interest in walks, books, and Sunday cooking.", bandValue: 74, band: "Well Aligned", hue: "#E8D5EC" },
  { id: "p-kit-18", name: "Kit", age: 28, city: "Dalston", distanceKm: 6, observation: "A common pull towards slower seasons.", bandValue: 69, band: "Well Aligned", hue: "#F3E8F5" },
  { id: "p-eloise-19", name: "Eloise", age: 35, city: "Walthamstow", distanceKm: 16, observation: "Both seeking intentional connection.", bandValue: 57, band: "Aligned", hue: "#F6E7F2" },
  { id: "p-marcus-20", name: "Marcus", age: 31, city: "Chiswick", distanceKm: 10, observation: "Different rhythms; some shared values to explore.", bandValue: 82, band: "Strongly Aligned", hue: "#FCEEF0" },
  { id: "p-freya-21", name: "Freya", age: 29, city: "Tooting", distanceKm: 3, observation: "Both prefer slower, deliberate getting-to-know.", bandValue: 76, band: "Well Aligned", hue: "#E8E2D6" },
  { id: "p-dara-22", name: "Dara", age: 27, city: "Putney", distanceKm: 18, observation: "Aligned on quiet weekends and long conversations.", bandValue: 64, band: "Aligned", hue: "#FDE9C2" },
  { id: "p-cleo-23", name: "Cleo", age: 36, city: "Hampstead", distanceKm: 18, observation: "Curious about each other's creative practice.", bandValue: 66, band: "Well Aligned", hue: "#F2DDE9" },
  { id: "p-hugo-24", name: "Hugo", age: 34, city: "Forest Hill", distanceKm: 14, observation: "A shared appreciation for unhurried mornings.", bandValue: 77, band: "Well Aligned", hue: "#E8D5EC" },
  { id: "p-iris-25", name: "Iris", age: 37, city: "Battersea", distanceKm: 13, observation: "Both lean into vulnerability when it counts.", bandValue: 67, band: "Well Aligned", hue: "#DCE5DA" },
  { id: "p-reuben-26", name: "Reuben", age: 33, city: "Wandsworth", distanceKm: 15, observation: "You both value steady, thoughtful pacing.", bandValue: 69, band: "Well Aligned", hue: "#EFEFEF" },
  { id: "p-phoebe-27", name: "Phoebe", age: 29, city: "Brixton", distanceKm: 11, observation: "Both seeking intentional connection.", bandValue: 44, band: "Early Signal", hue: "#EFEFEF" },
  { id: "p-ezra-28", name: "Ezra", age: 35, city: "Stoke Newington", distanceKm: 1, observation: "Both prefer slower, deliberate getting-to-know.", bandValue: 43, band: "Early Signal", hue: "#FCEEF0" },
  { id: "p-lila-29", name: "Lila", age: 29, city: "Brixton", distanceKm: 2, observation: "Shared instinct for asking better questions.", bandValue: 58, band: "Aligned", hue: "#EFE2F4" },
  { id: "p-tomas-30", name: "Tomas", age: 34, city: "Stoke Newington", distanceKm: 9, observation: "Both lean into vulnerability when it counts.", bandValue: 80, band: "Well Aligned", hue: "#E8E2D6" },
  { id: "p-sienna-31", name: "Sienna", age: 29, city: "Lewisham", distanceKm: 5, observation: "Both value emotional steadiness over sparks.", bandValue: 54, band: "Aligned", hue: "#E8E2D6" },
  { id: "p-vikram-32", name: "Vikram", age: 29, city: "Fulham", distanceKm: 16, observation: "Mutual interest in long-form thinking.", bandValue: 83, band: "Strongly Aligned", hue: "#E8D5EC" },
  { id: "p-hattie-33", name: "Hattie", age: 27, city: "Greenwich", distanceKm: 14, observation: "Both drawn to depth over volume.", bandValue: 62, band: "Aligned", hue: "#E0D6E9" },
  { id: "p-caspar-34", name: "Caspar", age: 32, city: "Notting Hill", distanceKm: 2, observation: "Both lean into vulnerability when it counts.", bandValue: 81, band: "Strongly Aligned", hue: "#F6E7F2" },
  { id: "p-anya-35", name: "Anya", age: 26, city: "Bermondsey", distanceKm: 11, observation: "You both value steady, thoughtful pacing.", bandValue: 72, band: "Well Aligned", hue: "#EFEFEF" },
  { id: "p-mateo-36", name: "Mateo", age: 29, city: "Hackney", distanceKm: 18, observation: "Both at ease with quiet companionship.", bandValue: 63, band: "Aligned", hue: "#FDE9C2" },
  { id: "p-bea-37", name: "Bea", age: 32, city: "Shoreditch", distanceKm: 9, observation: "Both at ease with quiet companionship.", bandValue: 74, band: "Well Aligned", hue: "#EFEFEF" },
  { id: "p-jonah-38", name: "Jonah", age: 27, city: "Notting Hill", distanceKm: 18, observation: "You both value steady, thoughtful pacing.", bandValue: 50, band: "Early Signal", hue: "#FCEEF0" },
  { id: "p-ottilie-39", name: "Ottilie", age: 36, city: "Lewisham", distanceKm: 1, observation: "Both prefer slower, deliberate getting-to-know.", bandValue: 66, band: "Well Aligned", hue: "#EFEFEF" },
  { id: "p-ronan-40", name: "Ronan", age: 28, city: "Kentish Town", distanceKm: 16, observation: "Shared care for honest, patient repair after conflict.", bandValue: 84, band: "Strongly Aligned", hue: "#E8D5EC" },
  { id: "p-esme-41", name: "Esme", age: 32, city: "Islington", distanceKm: 6, observation: "Aligned on caring for the small, everyday things.", bandValue: 84, band: "Strongly Aligned", hue: "#F3E8F5" },
  { id: "p-indra-42", name: "Indra", age: 32, city: "Clapham", distanceKm: 15, observation: "Aligned on prioritising rest and recovery.", bandValue: 69, band: "Well Aligned", hue: "#E0D6E9" },
  { id: "p-leo-43", name: "Leo", age: 37, city: "Crystal Palace", distanceKm: 18, observation: "Both lean into vulnerability when it counts.", bandValue: 74, band: "Well Aligned", hue: "#E8E2D6" },
  { id: "p-maeve-44", name: "Maeve", age: 28, city: "Hackney", distanceKm: 10, observation: "A shared appreciation for unhurried mornings.", bandValue: 82, band: "Strongly Aligned", hue: "#FCEEF0" },
  { id: "p-sol-45", name: "Sol", age: 35, city: "Crystal Palace", distanceKm: 18, observation: "Shared focus on honesty and empathy.", bandValue: 66, band: "Well Aligned", hue: "#FAE6D5" },
];
