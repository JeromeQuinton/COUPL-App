export type GrowthArc = {
  id: string;
  title: string;
  weekIndex: number;       // 1-based
  weeksTotal: number;
  weekTheme: string;       // "Saying the harder thing, sooner."
  weekPractice: string;    // "This week: ..."
  lessonCta: string;       // "Open this week's lesson"
};

export type ReflectionEntry = {
  id: string;
  dateLabel: string;       // "Yesterday" | "Last Tuesday" | "Oct 28"
  prompt: string;
  wordCount?: number;      // undefined => unanswered
};

export type WorkshopSummary = {
  id: string;
  title: string;
  sessionCount: number;
  startsLabel: string;     // "starts Nov 11"
  blurb: string;
  practitioner: string;
  practitionerCredential: string;   // "LMFT"
  practitionerInitial: string;
  practitionerBio: string;
  format: string;          // "Four 75-min small-group video sessions. Up to 8 participants."
  swatch: string;          // CSS gradient
  sessions: { index: number; title: string }[];
};

export const CURRENT_ARC: GrowthArc = {
  id: "arc-naming-the-need",
  title: "Naming the need",
  weekIndex: 3,
  weeksTotal: 6,
  weekTheme: "Saying the harder thing, sooner.",
  weekPractice:
    "This week: practice naming a need, in writing, before resentment builds.",
  lessonCta: "Open this week's lesson",
};

export const REFLECTIONS: ReflectionEntry[] = [
  {
    id: "r-1",
    dateLabel: "Yesterday",
    prompt: "What did Asha actually offer when she shared the bookstore story?",
    wordCount: 142,
  },
  {
    id: "r-2",
    dateLabel: "Last Tuesday",
    prompt: "Where did you bend toward something that wasn't yours this week?",
  },
  {
    id: "r-3",
    dateLabel: "Oct 28",
    prompt: "What's one belief about partnership you inherited from your parents?",
    wordCount: 380,
  },
];

export const WORKSHOPS: WorkshopSummary[] = [
  {
    id: "ws-repair",
    title: "The repair conversation",
    sessionCount: 4,
    startsLabel: "starts Nov 11",
    blurb:
      "Four small-group sessions on what to do when someone you like has hurt you — and how to ask for repair without making them defensive.",
    practitioner: "Lena Park",
    practitionerCredential: "LMFT",
    practitionerInitial: "L",
    practitionerBio:
      "Couples therapist, 12 years in private practice. Trained in EFT and Gottman Method.",
    format:
      "Four 75-min small-group video sessions. Up to 8 participants. Optional 1:1 with Lena after Session 2.",
    swatch:
      "linear-gradient(150deg, #F4E1CC 0%, #E8C9A8 50%, #C99E76 100%)",
    sessions: [
      { index: 1, title: "Naming the hurt without naming the verdict" },
      { index: 2, title: "The repair script — and when not to use it" },
      { index: 3, title: "Receiving an apology you didn't want" },
      { index: 4, title: "When repair isn't possible. Leaving well." },
    ],
  },
  {
    id: "ws-attachment",
    title: "Reading your own attachment, kindly",
    sessionCount: 3,
    startsLabel: "starts Dec 2",
    blurb:
      "A three-session arc on noticing your attachment patterns in real time — without using them as a verdict on yourself or anyone else.",
    practitioner: "Idris Mensah",
    practitionerCredential: "PsyD",
    practitionerInitial: "I",
    practitionerBio:
      "Clinical psychologist focused on adult attachment. Author of 'Quiet Patterns'.",
    format:
      "Three 60-min small-group video sessions. Up to 6 participants. Reflection prompts between sessions.",
    swatch:
      "linear-gradient(150deg, #EDE0F1 0%, #D5BCE0 55%, #9C7BB0 100%)",
    sessions: [
      { index: 1, title: "The pattern is not the person" },
      { index: 2, title: "What activation actually feels like" },
      { index: 3, title: "Choosing the slower response" },
    ],
  },
];

export function getWorkshop(id: string) {
  return WORKSHOPS.find((w) => w.id === id);
}

// Post-date reflection (Chapter 08) — body-state options
export type BodyState =
  | "settled"
  | "warm"
  | "neutral"
  | "guarded"
  | "depleted"
  | "activated";

export const BODY_STATES: { id: BodyState; label: string; hint: string }[] = [
  { id: "settled", label: "Settled", hint: "breath was easy" },
  { id: "warm", label: "Warm", hint: "open in the chest" },
  { id: "neutral", label: "Neutral", hint: "nothing one way or the other" },
  { id: "guarded", label: "Guarded", hint: "shoulders held tight" },
  { id: "depleted", label: "Depleted", hint: "tired, slightly flat" },
  { id: "activated", label: "Activated", hint: "fast heart, racing thoughts" },
];

export const SEE_AGAIN_OPTIONS: { id: string; label: string; sub: string }[] = [
  { id: "yes-soon", label: "Yes — soon", sub: "this week if possible" },
  { id: "yes-no-rush", label: "Yes — no rush", sub: "the next month is fine" },
  { id: "unsure", label: "Genuinely unsure", sub: "needs another data point" },
  { id: "no", label: "Not again", sub: "kindly close the loop" },
];