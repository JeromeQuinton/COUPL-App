/**
 * Profile detail sample data (DR-017, DR-018, DR-013).
 *
 * Phase 1: hand-shaped detail record for `p-maya-1`. Phase 4 replaces
 * with computed `pair_compatibility` + `user_traits` joined to profile
 * record. Numeric values render via shared <MetricDisplay/> with
 * precision='exact' for Phase 1 sample (DR-013).
 */

export type ProfileDetail = {
  id: string;
  name: string;
  age: number;
  city: string;
  region: string;
  verified: boolean;

  /** Overall compatibility — exact % per DR-013 default in Phase 1. */
  compatibility: number;
  /** Identity + account integrity score (0–100). */
  trustScore: number;

  intent: { primary: string; relationshipStyle: string };

  /** 4 portrait slots — Phase 1 uses lavender/blush gradient seeds. */
  photos: { hue: string; alt: string }[];

  /** Relational Snapshot — pair-level metrics. */
  empathy: number;
  communication: number;

  bio: string;
  seeking: string;

  /** DR-018: 6 fixed chips, in this order, every time. */
  compatibilityOverview: {
    openness: number;
    conscientiousness: number;
    extraversion: number;
    agreeableness: number;
    emotionalBalance: number; // Neuroticism, surfaced positively (DR-018)
    sharedIntent: number;
  };

  aiInsight: string;

  howIShowUp: string;

  /**
   * Connection Language (DR-010 OVERRIDE — reference said "Love Language").
   * Labels are placeholders from legacy framework.
   */
  // TODO: replace with Connection Language categories
  // (Verbal Presence, Practical Care, Tokens & Gestures, Shared Attention,
  // Physical Attunement, Emotional Co-regulation) post-DR-015.
  connectionLanguage: {
    primary: string;
    primaryValue: number;
    secondary: string;
    observation: string;
  };

  attachmentStyle: {
    label: string;
    leaning: string;
    chips: string[];
  };

  /** Big Five Snapshot — 5 trait values 0–100 (DR-018, DR-013). */
  bigFive: {
    openness: number;
    conscientiousness: number;
    extraversion: number;
    agreeableness: number;
    neuroticism: number;
  };

  interests: { label: string; favorite?: boolean }[];
  conversationStarters: string[];

  lifestyle: {
    work: string;
    education: string;
    exercise: string;
    diet: string;
    drinking: string;
    smoking: string;
    kids: string;
    haveKids: string;
    height: string;
    politics: string;
    religion: string;
    language: string;
    pronouns: string;
  };
};

export const SAMPLE_PROFILE_DETAILS: Record<string, ProfileDetail> = {
  "p-maya-1": {
    id: "p-maya-1",
    name: "Maya",
    age: 34,
    city: "Crystal Palace",
    region: "London, UK",
    verified: true,

    compatibility: 68,
    trustScore: 92,

    intent: { primary: "Long-term", relationshipStyle: "Relationship" },

    photos: [
      { hue: "#F7E1D4", alt: "Soft warm portrait placeholder" },
      { hue: "#EFE2F4", alt: "Lavender portrait placeholder" },
      { hue: "#FCEEF0", alt: "Blush portrait placeholder" },
      { hue: "#E8D5EC", alt: "Plum tint portrait placeholder" },
    ],

    empathy: 68,
    communication: 54,

    bio: "Weekend hiker, weekday product designer. I value slow mornings, honest conversations, and curiosity.",
    seeking:
      "Someone grounded and kind who enjoys building routines together and exploring new cities.",

    compatibilityOverview: {
      openness: 78,
      conscientiousness: 72,
      extraversion: 61,
      agreeableness: 81,
      emotionalBalance: 70,
      sharedIntent: 88,
    },

    aiInsight:
      "You both tend to check in before big plans, which supports secure pacing. Try a low-stakes coffee plan this week and reflect after.",

    howIShowUp:
      "I communicate directly and check in regularly. I appreciate shared calendars and making space for each other's solo time.",

    connectionLanguage: {
      primary: "Quality Time",
      primaryValue: 42,
      secondary: "Words",
      observation:
        "Their connections deepen through quality time and meaningful words.",
    },

    attachmentStyle: {
      label: "Mostly Secure",
      leaning: "Secure Leaning",
      chips: ["High Intimacy", "Stable Trust"],
    },

    bigFive: {
      openness: 78,
      conscientiousness: 72,
      extraversion: 61,
      agreeableness: 81,
      neuroticism: 30,
    },

    interests: [
      { label: "Hiking", favorite: true },
      { label: "Ceramics" },
      { label: "Thai Food" },
      { label: "Film Photography" },
    ],
    conversationStarters: [
      "Two truths and a lie — your turn?",
      "A small joy from this week?",
      "If there were 3 hours in the city…",
    ],

    lifestyle: {
      work: "Product Designer",
      education: "Master's Degree",
      exercise: "3x per week",
      diet: "Vegetarian",
      drinking: "Socially",
      smoking: "Never",
      kids: "Undecided",
      haveKids: "Open to more",
      height: "5 ft 7 in",
      politics: "Moderate",
      religion: "Spiritual",
      language: "English + Spanish",
      pronouns: "she / her",
    },
  },
};

export const getProfileDetail = (id: string): ProfileDetail | undefined =>
  SAMPLE_PROFILE_DETAILS[id];
