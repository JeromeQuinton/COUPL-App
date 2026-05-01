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

  /** Pacing preference (DR-023 v2). One of PACING_VALUES. */
  pacing: PacingValue;

  /**
   * Date ideas seeded from the user's onboarding date-preferences step.
   * `undefined` (the realistic Phase 1 state) drives the EmptyStateNudge
   * inside <AttuneDateCard/>.
   */
  dateIdeas?: string[];

  /**
   * One-line, human-readable summary of this profile's stated date
   * preferences. Renders as the collapsed-state subtitle of
   * <AttuneDateCard/>. Format: "[primary activity] · [time pattern] ·
   * [location label]". Sentence case, no terminal punctuation.
   */
  dateSummary?: string;

  /**
   * Structured date preferences surfaced inside the expanded
   * <AttuneDateCard/> under "Maya's preferences". All optional so the
   * card degrades cleanly when fixtures are sparse.
   */
  datePreferences?: {
    locationFlexibility?: string;
    timingWindow?: string;
    durationPreference?: string;
    anythingElse?: string;
  };

  /**
   * Up to 5 portrait slots. Phase 1 uses lavender/blush gradient seeds
   * as fallback when `src` is missing. Each photo may carry an optional
   * user-authored `caption` rendered via `<PhotoCaption />`.
   */
  photos: { hue: string; alt: string; src?: string; caption?: string }[];

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
    secondary?: string;
    primaryStrength: number;
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
    work?: string;
    education?: string;
    exercise?: string;
    diet?: string;
    drinking?: string;
    smoking?: string;
    kids?: string;
    haveKids?: string;
    height?: string;
    politics?: string;
    religion?: string;
    language?: string;
    pronouns?: string;
  };
};

/**
 * Accepted Pacing values (DR-023 v2). Locked vocabulary — do not extend
 * without a new DR. Used by both the detail sample and the feed sample.
 */
export const PACING_VALUES = [
  "Slow & deliberate",
  "Open to depth",
  "In the moment",
] as const;
export type PacingValue = (typeof PACING_VALUES)[number];

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
    pacing: "Open to depth",
    // Intentionally undefined so the EmptyStateNudge renders for QA.
    dateIdeas: undefined,

    photos: [
      {
        hue: "#F7E1D4",
        alt: "Maya, outdoors with city skyline behind her",
        src: "https://github.com/lonestarfish/COUPL/blob/main/6bmsK.jpg?raw=true",
        caption: "Saturday morning in Borough Market — slow start, strong coffee.",
      },
      {
        hue: "#EFE2F4",
        alt: "Maya at a café, white linen shirt",
        src: "https://github.com/lonestarfish/COUPL/blob/main/CR2e1.jpg?raw=true",
        caption: "Five minutes from home and already in a better mood.",
      },
      {
        hue: "#FCEEF0",
        alt: "Maya on a London street, soft cardigan",
        src: "https://github.com/lonestarfish/COUPL/blob/main/SyPck.jpg?raw=true",
        caption: "Sometimes the river says what I can't yet.",
      },
      {
        hue: "#E8D5EC",
        alt: "Maya by the river, sage green blouse",
        src: "https://github.com/lonestarfish/COUPL/blob/main/w8YQC.jpg?raw=true",
        caption: "My favourite kind of Tuesday — somewhere I've never been.",
      },
      {
        hue: "#F3E0EE",
        alt: "Maya in soft evening light",
        src: "https://github.com/lonestarfish/COUPL/blob/main/yrikI.jpg?raw=true",
        caption: "My favourite version of myself is a little bit windswept.",
      },
      {
        hue: "#E8D5EC",
        alt: "Maya mid-skydive, arms wide",
        src: "https://raw.githubusercontent.com/JeromeQuinton/COUPL/main/LNxSI.jpg",
        caption: "The version of me that says yes before her brain catches up.",
      },
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
      secondary: "Words",
      primaryStrength: 42,
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

/**
 * Sparse profile fixture used for QA of empty-field handling in
 * <LifestyleDetailsCard/>. Most lifestyle fields are missing or set
 * to "Undisclosed" — only Work, Pronouns and Language render.
 * Visit /discover/p-sparse-1 to verify.
 */
SAMPLE_PROFILE_DETAILS["p-sparse-1"] = {
  ...SAMPLE_PROFILE_DETAILS["p-maya-1"],
  id: "p-sparse-1",
  name: "Sasha",
  lifestyle: {
    work: "Photographer",
    education: "Undisclosed",
    exercise: "",
    drinking: "Prefer not to say",
    smoking: undefined,
    language: "English",
    pronouns: "they / them",
  },
};

export const getProfileDetail = (id: string): ProfileDetail | undefined =>
  SAMPLE_PROFILE_DETAILS[id];

/**
 * Default viewer (current user) trait profile used by the
 * Compatibility Overview alignment computation. Phase 1 only —
 * Phase 4 sources this from the authenticated user's `user_traits`.
 */
export type ViewerTraitProfile = {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  emotionalBalance: number;
  sharedIntent: number;
};

export const VIEWER_PROFILE: ViewerTraitProfile = {
  openness: 78,
  conscientiousness: 84,
  extraversion: 55,
  agreeableness: 72,
  emotionalBalance: 68,
  sharedIntent: 85,
};
