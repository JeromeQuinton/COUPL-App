export type LensId = "pace" | "presence" | "values" | "lifestyle" | "communication";

export type LensReading = {
  id: LensId;
  label: string;
  summary: string;
  expanded: string;
};

// Phase 1: hand-shaped per-pair readings. Phase 4: derive from
// compatibility_signals table joined to both users' profiles.
const READINGS: LensReading[] = [
  {
    id: "pace",
    label: "Pace",
    summary: "Both of you take time before replying.",
    expanded:
      "Neither of you texts in real time. You both leave conversations open for hours then return with something thought-through. That tends to read as steadiness on both sides.",
  },
  {
    id: "presence",
    label: "Presence",
    summary: "You both notice the small things first.",
    expanded:
      "Their About paragraph and your prompts both reach for specifics — a particular street, a particular hour. People who notice this way usually find it easier to be in the same room without performance.",
  },
  {
    id: "values",
    label: "Values",
    summary: "Steady alignment on what matters at the foundation.",
    expanded:
      "You both signalled honesty over agreeableness, slow over flashy, and chosen family alongside given family. Where you'll disagree is in the small stuff. That's usually the better trade.",
  },
  {
    id: "lifestyle",
    label: "Lifestyle",
    summary: "Different rhythms — same shape.",
    expanded:
      "They run mornings, you write evenings. You both protect a quiet weekday hour. Different specifics, similar architecture. People who share architecture tend to negotiate specifics easily.",
  },
  {
    id: "communication",
    label: "Communication",
    summary: "Both of you say what you mean.",
    expanded:
      "Neither of you uses indirect language to test the other person. That removes a lot of misreads early. The flip side: you'll both feel a soft moment harder than most. Worth knowing.",
  },
];

export function useCompatibilityDeepDive(_id: string): LensReading[] {
  // _id reserved for Phase 4 per-pair lookup.
  return READINGS;
}
