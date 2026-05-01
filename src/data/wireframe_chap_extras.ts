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
    | "/profile/audit-log"
    | "/profile/edit"
    | "/profile/pause"
    | "/profile/audit";
};

export const SAFETY_ROWS: SafetyRow[] = [
  {
    id: "report",
    title: "Report a concern",
    sub: "Confidential, evidence-supported",
    to: "/profile/safety",
  },
  {
    id: "block",
    title: "Block + cool-off",
    sub: "24h state — wait, send one, block, release",
    to: "/profile/pause",
  },
  {
    id: "share",
    title: "Safety share",
    sub: "Share live location with a trusted contact",
    to: "/profile/safety",
  },
  {
    id: "verify",
    title: "Verification status",
    sub: "ID + selfie + social",
    to: "/profile/edit",
  },
  {
    id: "privacy",
    title: "Privacy controls",
    sub: "What others see + when",
    to: "/profile/audit",
  },
];

/* ---------------- Decision audit log ---------------- */

export type AuditFilter = "all" | "nudges" | "filters" | "safety";

export type AuditEntry = {
  id: string;
  ref: string; // e.g. NUD-501
  category: Exclude<AuditFilter, "all">;
  when: string; // "Today 14:22" | "Yesterday 22:14"
  title: string;
  detail: string;
};

export const AUDIT_ENTRIES: AuditEntry[] = [
  {
    id: "nud-501",
    ref: "NUD-501",
    category: "nudges",
    when: "Today 14:22",
    title: "Coach Card",
    detail: "Acknowledge shown · dismissed",
  },
  {
    id: "fil-201",
    ref: "FIL-201",
    category: "filters",
    when: "Today 09:01",
    title: "Discover",
    detail: "Profile filtered · low-attune mode",
  },
  {
    id: "nud-477",
    ref: "NUD-477",
    category: "nudges",
    when: "Yesterday 22:14",
    title: "Draft Intercept",
    detail: "Sent anyway",
  },
  {
    id: "pca-012",
    ref: "PCA-012",
    category: "safety",
    when: "Yesterday 08:00",
    title: "Pacing",
    detail: "Daily cap reached",
  },
];
