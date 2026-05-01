export type DiscoverySetting = {
  key: string;
  label: string;
  value: string;
};

export type CareSetting = {
  key: string;
  label: string;
  value: string;
};

export type AuditEntry = {
  id: string;
  type: "view" | "attune" | "coach" | "prompt" | "moderation" | "trust";
  title: string;
  detail?: string;
  timeLabel: string;
};

export type IncidentCategory = {
  id: string;
  label: string;
  emphasis?: boolean;
};

export const PROFILE_SUMMARY = {
  name: "Mira Halpern",
  initial: "M",
  memberSince: "Sep 2025",
  city: "Brooklyn",
};

export const DISCOVERY_SETTINGS: DiscoverySetting[] = [
  { key: "pace", label: "Pace", value: "Steady · 3–4 / week" },
  { key: "capacity", label: "Capacity", value: "Some bandwidth · 2 days left" },
  { key: "shown-to", label: "Who I'm shown", value: "Open to: women, nonbinary · 28–40" },
  { key: "distance", label: "Distance", value: "Within 8 miles" },
];

export const CARE_SETTINGS: CareSetting[] = [
  { key: "cooloff", label: "Cool-off length", value: "7 days (default)" },
  { key: "coach", label: "Coach prompts", value: "Show in chat · Save to journal" },
  { key: "draft", label: "Draft pause", value: "On — I want the gentle nudge" },
  { key: "quiet", label: "Quiet hours", value: "10pm – 8am" },
];

export const VISIBILITY_STATS = {
  windowLabel: "Last 30 days",
  profileViews: 34,
  attunesReceived: 12,
  conversations: 4,
};

export const AUDIT_ENTRIES: AuditEntry[] = [
  {
    id: "a-1",
    type: "view",
    title: "Asha viewed your profile",
    timeLabel: "10:14 AM",
  },
  {
    id: "a-2",
    type: "coach",
    title: "Reni's coach prompt referenced your conversation with Marco",
    timeLabel: "9:02 AM",
  },
  {
    id: "a-3",
    type: "prompt",
    title: "Theo unlocked your second prompt set",
    detail: "(after 3 messages)",
    timeLabel: "Yesterday 6:40 PM",
  },
  {
    id: "a-4",
    type: "moderation",
    title: "Daniel's account was paused.",
    detail: "Your shared conversation is preserved.",
    timeLabel: "Yesterday 2:11 PM",
  },
  {
    id: "a-5",
    type: "view",
    title: "Curated batch sent — you appeared in 6 people's Discover",
    timeLabel: "Yesterday 9:00 AM",
  },
  {
    id: "a-6",
    type: "trust",
    title: "Photo review completed by Yara (Trust team)",
    timeLabel: "Sun 11:05 PM",
  },
];

export const INCIDENT_CATEGORIES: IncidentCategory[] = [
  { id: "pressured", label: "Pressured me", emphasis: true },
  { id: "hateful", label: "Said something racist, sexist, or hateful" },
  { id: "explicit", label: "Asked for explicit photos" },
  { id: "threatened", label: "Threatened me, even softly" },
  { id: "lied", label: "Lied about who they are" },
  { id: "in-person", label: "Crossed a line in person" },
  { id: "other", label: "Other — I'll describe it" },
];

export const PAUSE_DURATIONS = [
  { days: 7, label: "7 days" },
  { days: 14, label: "14 days" },
  { days: 30, label: "30 days" },
  { days: 90, label: "90 days" },
];

export const PAUSE_PROMISES = [
  "You're hidden from Discover",
  "Open conversations stay readable, both sides",
  "You can still write reflections and read coach prompts",
  "We won't bill you",
  "Asha and Yuki get a small note: \"Mira is taking a pause. She'll be back.\"",
];

export const EDIT_PHOTOS = [
  { id: "p1", swatch: "linear-gradient(150deg, #B7C8E2 0%, #6F8DBE 100%)", main: true },
  { id: "p2", swatch: "linear-gradient(150deg, #C8D9B8 0%, #7E9C76 100%)" },
  { id: "p3", swatch: "linear-gradient(150deg, #E8C9A8 0%, #BC8C5E 100%)" },
];

export const EDIT_PROMPTS = [
  {
    id: "pr1",
    setup: "I get unreasonably excited about",
    answer: "the smell of basements that have books in them.",
  },
  {
    id: "pr2",
    setup: "I'd rather skip",
    answer: "small talk about the weather. Tell me what made you cry this month.",
  },
];

export const EDIT_THINGS_TO_KNOW = [
  "Not currently looking for casual",
  "Open about being in therapy",
];