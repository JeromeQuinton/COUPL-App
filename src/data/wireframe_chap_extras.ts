/**
 * Phase 1 fixtures for Connections-list rings, Growth tabs, Profile
 * About card, Safety hub rows, and Decision audit log entries.
 * Stub data only — no backend.
 */

export type RingConnection = {
  id: string;
  initial: string;
  name: string;
  trait: string; // "trust" | "balance" | "pace"
  hue: "lavender" | "blush" | "beeswax";
};

export const RING_CONNECTIONS: RingConnection[] = [
  { id: "ava", initial: "A", name: "Ava", trait: "trust", hue: "lavender" },
  { id: "maya", initial: "M", name: "Maya", trait: "balance", hue: "blush" },
  { id: "jade", initial: "J", name: "Jade", trait: "pace", hue: "beeswax" },
];

export type TimelineCard = {
  id: string;
  initial: string;
  name: string;
  age: number;
  hue: "lavender" | "blush" | "beeswax";
  ago: string;
  preview: string;
  alignment: number;
  tone: string; // "rising" | "steady" | "quiet"
  toneIcon?: "rising" | "steady" | "quiet";
  extraChip?: string; // e.g. "gentle"
};

export const TIMELINE_CARDS: TimelineCard[] = [
  {
    id: "ava",
    initial: "A",
    name: "Ava",
    age: 27,
    hue: "lavender",
    ago: "2m",
    preview: "Brunch this weekend?",
    alignment: 82,
    tone: "rising",
    toneIcon: "rising",
    extraChip: "gentle",
  },
  {
    id: "maya",
    initial: "M",
    name: "Maya",
    age: 25,
    hue: "blush",
    ago: "10m",
    preview: "Loved that book rec.",
    alignment: 78,
    tone: "steady",
  },
  {
    id: "jade",
    initial: "J",
    name: "Jade",
    age: 30,
    hue: "beeswax",
    ago: "5d",
    preview: "How's your week?",
    alignment: 64,
    tone: "quiet",
  },
];

/* ---------------- Growth ---------------- */

export const GROWTH_TABS = [
  { id: "summary", label: "Summary" },
  { id: "insights", label: "Insights" },
  { id: "goals", label: "Goals" },
  { id: "workshops", label: "Workshops" },
] as const;

// Conversation flow bars — heights as % (relative)
export const CONVERSATION_FLOW: number[] = [40, 55, 35, 70, 50, 85, 100];

/* ---------------- Profile ---------------- */

export const PROFILE_ABOUT_QUOTE =
  "a small ritual that grounds me — coffee in silence.";

export const PROFILE_LANGUAGES: string[] = [
  "quiet presence",
  "thoughtful gestures",
];

/* ---------------- Safety hub ---------------- */

export type SafetyRow = {
  id: string;
  title: string;
  sub: string;
  to:
    | "/profile/safety"
    | "/profile/safety/help"
    | "/profile/safety/moderation"
    | "/profile/safety/report"
    | "/profile/safety/reports"
    | "/profile/safety/blocked"
    | "/profile/safety/trusted-contact"
    | "/profile/verification"
    | "/profile/audit-log"
    | "/profile/edit"
    | "/profile/pause"
    | "/profile/visibility";
};

export const SAFETY_ROWS: SafetyRow[] = [
  // Crisis-first: action items at top, setup tasks below, history at bottom.
  {
    id: "help",
    title: "Get help",
    sub: "Crisis lines + in-app support — UK",
    to: "/profile/safety/help",
  },
  {
    id: "report",
    title: "Submit a report",
    sub: "Confidential. We assess every report.",
    to: "/profile/safety/report",
  },
  {
    id: "moderation",
    title: "What happens when you report",
    sub: "Review window, action types, what we tell you back",
    to: "/profile/safety/moderation",
  },
  {
    id: "block",
    title: "Block + cool-off",
    sub: "24h state — wait, send one, block, release",
    to: "/profile/pause",
  },
  {
    id: "trusted-contact",
    title: "Trusted contact",
    sub: "Up to two people pinged when you start a safety share",
    to: "/profile/safety/trusted-contact",
  },
  {
    id: "verify",
    title: "Verification",
    sub: "Photo · ID · Selfie · Social",
    to: "/profile/verification",
  },
  {
    id: "privacy",
    title: "Privacy controls",
    sub: "What others see + when",
    to: "/profile/visibility",
  },
  {
    id: "share",
    title: "Safety share",
    sub: "Share live location with a trusted contact during a date",
    to: "/profile/safety/report",
  },
  {
    id: "reports",
    title: "My reports",
    sub: "Status + history of what you've raised",
    to: "/profile/safety/reports",
  },
  {
    id: "blocked",
    title: "Blocked accounts",
    sub: "People you've removed — unblock here",
    to: "/profile/safety/blocked",
  },
];

/* ---------------- Decision audit log ---------------- */

export type AuditFilter =
  | "all"
  | "nudges"
  | "safety"
  | "pacing"
  | "visibility";

export type AuditCategory = Exclude<AuditFilter, "all">;

export type AuditSeverity = "ambient" | "considered" | "protective";

export type AuditStatus = "applied" | "dismissed" | "override";

export type AuditEntry = {
  id: string;
  ref: string;
  category: AuditCategory;
  when: string;
  title: string;
  action: string; // what the AI did
  response: string; // what the user did
  why: string; // why it mattered
  emotion: string; // emotional category
  severity: AuditSeverity;
  status: AuditStatus;
  confidence: number; // 0-100 — AI confidence
  signal: string; // one-word relational signal (e.g. "Connection")
  /** Reason codes — diagnostic signals that triggered this nudge. */
  reasons?: string[];
};

export const AUDIT_ENTRIES: AuditEntry[] = [
  {
    id: "nud-501",
    ref: "NUD-501",
    category: "nudges",
    when: "Today · 14:22",
    title: "Coach card surfaced",
    action: "Suggested an acknowledgement before replying to Maya.",
    response: "Dismissed without sending.",
    why: "You'd been quiet for two days — repair tends to land lighter when named.",
    emotion: "Reassurance",
    severity: "ambient",
    status: "dismissed",
    confidence: 82,
    signal: "Connection",
    reasons: [
      "Reciprocity drop in last 48h",
      "Pattern matches: rapid follow-up after silence",
      "Activation Index > 0.7",
    ],
  },
  {
    id: "fil-201",
    ref: "FIL-201",
    category: "visibility",
    when: "Today · 09:01",
    title: "Profile gently filtered",
    action: "Held back one recommendation outside your stated capacity.",
    response: "No action required.",
    why: "You set a calmer week. We protected the feed accordingly.",
    emotion: "Protection",
    severity: "considered",
    status: "applied",
    confidence: 91,
    signal: "Boundaries",
    reasons: [
      "Capacity setting < 50",
      "Recommendation alignment band: Aligned (not Strongly)",
    ],
  },
  {
    id: "nud-477",
    ref: "NUD-477",
    category: "nudges",
    when: "Yesterday · 22:14",
    title: "Draft intercept offered",
    action: "Paused a late-night message and offered a softer rewrite.",
    response: "Sent the original anyway.",
    why: "Late sends with high intensity are the ones people most often regret.",
    emotion: "Restraint",
    severity: "considered",
    status: "override",
    confidence: 76,
    signal: "Growth",
    reasons: [
      "Send-time after 22:00",
      "Intensity score > 0.65",
      "Two questions, no statement",
    ],
  },
  {
    id: "pca-012",
    ref: "PCA-012",
    category: "pacing",
    when: "Yesterday · 08:00",
    title: "Daily cap reached",
    action: "Closed today's recommendations at your chosen limit.",
    response: "Returned this morning.",
    why: "Pacing is your boundary — we hold it even when the feed could go further.",
    emotion: "Steadiness",
    severity: "protective",
    status: "applied",
    confidence: 95,
    signal: "Self-Care",
    reasons: ["Daily cap = 10", "Recommendations served = 10"],
  },
  {
    id: "saf-088",
    ref: "SAF-088",
    category: "safety",
    when: "Mon · 19:42",
    title: "Tone check before send",
    action: "Flagged a phrase that often reads sharper than intended.",
    response: "Edited and sent.",
    why: "Small rewordings keep early conversations safe to stay open in.",
    emotion: "Care",
    severity: "protective",
    status: "applied",
    confidence: 88,
    signal: "Care",
    reasons: [
      "Hedging language detected",
      "Tone classifier: ambiguous",
    ],
  },
];

/* Top-of-screen summary — counts by domain over the last 7 days. */
export type AuditSummaryStat = {
  id: AuditCategory;
  label: string;
  value: number;
  delta: number; // +/- vs prior 7 days
  direction: "up" | "down";
};

export const AUDIT_SUMMARY: AuditSummaryStat[] = [
  { id: "nudges", label: "Nudges", value: 12, delta: 20, direction: "up" },
  { id: "safety", label: "Safety", value: 3, delta: 50, direction: "up" },
  { id: "pacing", label: "Pacing", value: 5, delta: 10, direction: "down" },
  { id: "visibility", label: "Visibility", value: 7, delta: 30, direction: "up" },
];

/* Mini sparkline — last 14 days of total daily AI guidance events. */
export const AUDIT_SPARKLINE: number[] = [
  3, 4, 2, 5, 4, 6, 5, 4, 7, 6, 5, 8, 6, 7,
];

/* Patterns chart — weekly anxiety-trigger delta % over last 8 weeks. */
export const AUDIT_PATTERN_SERIES: number[] = [
  6, 9, 4, 7, 2, 5, -8, -10,
];

/* Behavioural patterns surfaced from your last 30 days of decisions. */
export const AUDIT_PATTERNS: { id: string; title: string; body: string }[] = [
  {
    id: "pat-evening",
    title: "You override us most after 10pm.",
    body: "Six of your last eight overrides happened late. We'll start surfacing drafts a touch earlier.",
  },
  {
    id: "pat-pacing",
    title: "Pacing limits land well with you.",
    body: "You've kept your daily cap for three weeks straight — the feed stays calmer because of it.",
  },
];
