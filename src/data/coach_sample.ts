/**
 * Coach (Polaris) fixtures — used by R3-17/18 monthly summaries,
 * R3-19/20 audit log, R3-21/22 weekly reviews. Phase 4 reads these
 * from a Polaris-authored job pipeline (monthly digest, audit log,
 * weekly digest).
 *
 * Voice: every Polaris-authored string here must hold to
 * `coupl-hq/01-the-doctrine/voice-and-brand/polaris-voice-charter.md`
 * (DR-100). Eight principles + five failure modes. Drop-in fixtures
 * for the audit log come from the charter's 12 worked translations.
 */

export type AuditSurface = "discover" | "chat" | "coach" | "date-plans";

export type AuditLogEntry = {
  id: string;
  signalLabel: string;
  surface: AuditSurface;
  whenRelative: string;
  connectionInitial?: string;
  inputs: string[];
  reasoning: string;
};

// 12 worked translations from the Polaris voice charter (drop-in).
export const SAMPLE_AUDIT_LOG: AuditLogEntry[] = [
  {
    id: "a-01",
    signalLabel: "A moment of urgency",
    surface: "chat",
    whenRelative: "Thursday afternoon",
    connectionInitial: "A",
    inputs: ["Five messages sent in roughly ten minutes.", "No reply in that window."],
    reasoning:
      "Polaris noticed a moment of urgency on Thursday afternoon — a rhythm that moved out ahead of the reply.",
  },
  {
    id: "a-02",
    signalLabel: "A pause after a difficult conversation",
    surface: "chat",
    whenRelative: "last week",
    connectionInitial: "M",
    inputs: ["Three days of silence.", "The exchange before was about future intent."],
    reasoning:
      "A pause followed your conversation about future intent. It might have been processing time, or a quiet retreat — Polaris isn't sure yet.",
  },
  {
    id: "a-03",
    signalLabel: "Symmetry in the exchange",
    surface: "chat",
    whenRelative: "this week",
    connectionInitial: "S",
    inputs: ["Sustained equal message lengths (within ten words).", "Across seven days."],
    reasoning:
      "There's a striking symmetry in your exchanges this week. You're meeting one another's depth with unusual precision.",
  },
  {
    id: "a-04",
    signalLabel: "A small repair offered",
    surface: "chat",
    whenRelative: "Monday",
    connectionInitial: "A",
    inputs: ["You apologised for a two-hour reply delay."],
    reasoning:
      "You seem particularly attuned to time with this connection. You offered a small repair for a delay that, on the clock, was quite brief.",
  },
  {
    id: "a-05",
    signalLabel: "A shift from I to we",
    surface: "chat",
    whenRelative: "the last fortnight",
    connectionInitial: "S",
    inputs: ["Pronoun shift in messaging across two weeks."],
    reasoning:
      "A subtle shift in language: the 'I' has softened into 'we' over the last fortnight. The boundary between you is becoming more permeable.",
  },
  {
    id: "a-06",
    signalLabel: "A late-night cluster",
    surface: "chat",
    whenRelative: "this week",
    connectionInitial: "R",
    inputs: ["A cluster of messages after 22:00.", "Topics moved towards the personal."],
    reasoning:
      "The tone of your conversation changes after the sun sets. The topics grow more intimate as the hour grows later.",
  },
  {
    id: "a-07",
    signalLabel: "Curiosity becoming one-sided",
    surface: "chat",
    whenRelative: "the past few days",
    connectionInitial: "M",
    inputs: ["You've asked questions; they haven't returned them."],
    reasoning:
      "The curiosity in the exchange has become one-sided. You're still reaching; the lantern from their side has dimmed.",
  },
  {
    id: "a-08",
    signalLabel: "Both naming an edge",
    surface: "chat",
    whenRelative: "this week",
    connectionInitial: "S",
    inputs: ["Both used 'boundary' or 'comfortable' in the same week."],
    reasoning:
      "You're both doing the careful work of naming your edges. That clarity is rare and worth noticing.",
  },
  {
    id: "a-09",
    signalLabel: "A logistical thread left hanging",
    surface: "date-plans",
    whenRelative: "Tuesday",
    connectionInitial: "A",
    inputs: ["The plan-making thread went quiet just as it asked for a time commitment."],
    reasoning:
      "A logistical thread was left hanging on Tuesday — you moved away from it just as it asked for a commitment of time.",
  },
  {
    id: "a-10",
    signalLabel: "A lighter orbit",
    surface: "chat",
    whenRelative: "this week",
    connectionInitial: "R",
    inputs: ["A high frequency of 'haha' and emoji-only replies."],
    reasoning:
      "The conversation has moved into a lighter, perhaps more guarded, orbit. Plenty of play; less noticing of the deeper threads.",
  },
  {
    id: "a-11",
    signalLabel: "A swift repair",
    surface: "chat",
    whenRelative: "Sunday",
    connectionInitial: "S",
    inputs: ["A point of friction.", "Repair offered within thirty minutes."],
    reasoning:
      "A moment of friction came up, and the repair was swift. You didn't let it sit and harden into something else.",
  },
  {
    id: "a-12",
    signalLabel: "A heightened return",
    surface: "discover",
    whenRelative: "today",
    connectionInitial: "M",
    inputs: ["You returned to this profile more than ten times in twenty-four hours."],
    reasoning:
      "There's a heightened return to this connection today — you keep coming back to their words, looking for something new in them.",
  },
];

export type MonthlySummary = {
  id: string;
  monthLabel: string;
  paragraphs: string[];
  patternGrid: { label: string; phrase: string }[];
};

export const SAMPLE_MONTHLY_SUMMARIES: Record<string, MonthlySummary> = {
  current: {
    id: "current",
    monthLabel: "April",
    paragraphs: [
      "April was a month of returning. Two connections that had gone quiet over March came back into the rhythm of regular noticing — neither dramatically, both at the pace of someone choosing again rather than rushing.",
      "Polaris noticed a softening in how you approached repair this month. After Sunday the tenth, when something was misread between you and Sam, the way you came back the next day was specific and unhurried. That kind of repair is the work, and you did it without fanfare.",
      "The thread with River stayed in a slower register — fewer messages, longer pauses, more weight in each exchange. There's no need to read that as withdrawal. Some connections come into focus across weeks, not days.",
      "If one thing stood out this month, it was the return to your own pace after a busier March. Polaris isn't sure yet whether that's permission you've granted yourself or a season passing through. Either is alright.",
    ],
    patternGrid: [
      { label: "Most common signal", phrase: "Repair, offered without delay" },
      { label: "Pace this month", phrase: "Steadier than March" },
      { label: "Repair moments", phrase: "Three, all on the same day they arose" },
    ],
  },
  "2026-03": {
    id: "2026-03",
    monthLabel: "March",
    paragraphs: [
      "March asked more of you than you might have realised at the time. There were three weeks where the messaging cadence held above your usual; whether that was a season of attention or a season of urgency is something only you'd know.",
      "Polaris noticed a recurring pattern around plan-making — proposals offered, dates suggested, then a softening of follow-through as the day approached. That's a rhythm worth sitting with, not a flag.",
      "By the last week of the month, the cadence had eased. Whatever held you in the busier weeks seems to have moved through.",
    ],
    patternGrid: [
      { label: "Most common signal", phrase: "Plan-making in flight" },
      { label: "Pace this month", phrase: "Spirited, then softening" },
      { label: "Repair moments", phrase: "One, late and careful" },
    ],
  },
  "2026-02": {
    id: "2026-02",
    monthLabel: "February",
    paragraphs: [
      "February was quieter — fewer new connections, more depth with the ones already in motion. The shape of your time on COUPL contracted in a way that read as deliberate rather than absent.",
      "There were two longer pauses with Sam this month, both followed by what Polaris would call a careful return — a question that opened the conversation back up rather than picking up the previous thread.",
    ],
    patternGrid: [
      { label: "Most common signal", phrase: "Careful returns after pause" },
      { label: "Pace this month", phrase: "In a slower register" },
      { label: "Repair moments", phrase: "Two, both with Sam" },
    ],
  },
};

export type WeeklyReview = {
  id: string;
  weekLabel: string;
  reflection: string;
  prompts: string[];
};

export const SAMPLE_WEEKLY_REVIEWS: Record<string, WeeklyReview> = {
  current: {
    id: "current",
    weekLabel: "This week",
    reflection:
      "A steadier rhythm than last week. The exchange with Sam settled after Sunday's small misread, and the return on Monday was specific. River stayed in the slower register; that has been the pattern for a few weeks now.",
    prompts: [
      "What felt good?",
      "What felt off?",
      "What do you want to carry forward?",
    ],
  },
  "2026-w17": {
    id: "2026-w17",
    weekLabel: "Week of 21 April",
    reflection:
      "A busier week — three plan-making threads in motion at once. Polaris noticed you stretching slightly to keep up; by Friday, the rhythm had eased.",
    prompts: [
      "What felt good?",
      "What felt off?",
      "What do you want to carry forward?",
    ],
  },
  "2026-w16": {
    id: "2026-w16",
    weekLabel: "Week of 14 April",
    reflection:
      "Quieter overall. The thread with River held in a slow register; the moments of presence that did arrive felt deliberate.",
    prompts: [
      "What felt good?",
      "What felt off?",
      "What do you want to carry forward?",
    ],
  },
};
