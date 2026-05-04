/**
 * Phase 1 Connections fixtures (DR-023, DR-030, DR-034).
 *
 * Stub data only — Phase 4 sources from `connections`, `messages`, and
 * `coach_prompts` tables. Vocabulary is canonical: Connection, Attune,
 * Day N of 7, Cool-off, Closed. Canonical vocabulary only (DR-023).
 */

export type ConnectionState = "active" | "cool-off" | "closed";

export type ConnectionSummary = {
  id: string;
  name: string;
  initial: string;
  /** "lavender" | "blush" | "beeswax" | "plum" — drives avatar gradient. */
  hue: "lavender" | "blush" | "beeswax" | "plum";
  state: ConnectionState;
  dayLabel: string; // "Day 2 of 7"
  daysAgoLabel: string; // "Connected 2 days ago"
  lastTouch: string; // "now" | "2h" | "yesterday"
  preview: string;
  meta?: string; // optional secondary line, e.g. "IRL planned"
  cooloffNote?: string; // visible only on cool-off cards
};

export const CONNECTIONS: ConnectionSummary[] = [
  {
    id: "ava",
    name: "Ava",
    initial: "A",
    hue: "lavender",
    state: "active",
    dayLabel: "Day 6 of 14",
    daysAgoLabel: "Attuned a week ago",
    lastTouch: "2m",
    preview: "Brunch this weekend?",
  },
  {
    id: "maya",
    name: "Maya",
    initial: "M",
    hue: "blush",
    state: "active",
    dayLabel: "Day 3 of 9",
    daysAgoLabel: "Attuned 3 days ago",
    lastTouch: "10m",
    preview: "Loved that book rec.",
  },
  {
    id: "jade",
    name: "Jade",
    initial: "J",
    hue: "beeswax",
    state: "active",
    dayLabel: "Day 12 of 14",
    daysAgoLabel: "Attuned 12 days ago",
    lastTouch: "5d",
    preview: "How's your week?",
  },
  {
    id: "avery",
    name: "Avery",
    initial: "A",
    hue: "lavender",
    state: "active",
    dayLabel: "Day 4 · Coach on",
    daysAgoLabel: "Connected 4 days ago",
    lastTouch: "now",
    preview: "That's a really lovely Sunday.",
  },
  {
    id: "asha",
    name: "Asha",
    initial: "A",
    hue: "lavender",
    state: "active",
    dayLabel: "Day 2 of 7",
    daysAgoLabel: "Connected 2 days ago",
    lastTouch: "now",
    preview:
      "Still have it. The pages are basically butter at this point.",
  },
  {
    id: "yuki",
    name: "Yuki",
    initial: "Y",
    hue: "blush",
    state: "active",
    dayLabel: "Day 5 · IRL planned",
    daysAgoLabel: "Connected 5 days ago",
    lastTouch: "2h",
    preview: "Coffee Friday, 4pm — confirmed",
    meta: "IRL planned",
  },
  {
    id: "marco",
    name: "Marco",
    initial: "M",
    hue: "beeswax",
    state: "active",
    dayLabel: "Day 1",
    daysAgoLabel: "Connected yesterday",
    lastTouch: "yesterday",
    preview:
      "You: The honesty/comfort one — what does that look like for you?",
  },
  {
    id: "daniel",
    name: "Daniel",
    initial: "D",
    hue: "beeswax",
    state: "cool-off",
    dayLabel: "Day 6 · 2 days remaining",
    daysAgoLabel: "Connected 6 days ago",
    lastTouch: "3d",
    preview: "then closes naturally",
    cooloffNote:
      "You both got busy. No need to push. We'll archive the thread quietly unless one of you reopens.",
  },
];

export function getConnection(id: string): ConnectionSummary | undefined {
  return CONNECTIONS.find((c) => c.id === id);
}

// ----------------------------- Thread fixtures -----------------------------

export type ThreadMessage =
  | {
      kind: "msg";
      from: "them" | "me";
      text: string;
      time?: string;
      read?: boolean;
    }
  | {
      kind: "photo";
      from: "them" | "me";
      src: string;
      caption?: string;
      time?: string;
      read?: boolean;
    }
  | {
      kind: "voice";
      from: "them" | "me";
      durationSeconds: number;
      time?: string;
      read?: boolean;
    }
  | {
      kind: "time";
      label: string; // "TUESDAY, 9:14AM"
    }
  | {
      kind: "coach";
      title: string;
      body: string;
    }
  | {
      kind: "plan_invite";
      id: string;
      from: "them" | "me";
      when: string; // human-readable date+time, e.g. "Saturday 16 May, 7pm"
      where: string;
      notes?: string;
      status: "proposed" | "accepted" | "declined" | "countered";
      planSourceId?: string;
      replacesInviteId?: string;
    };

export const THREADS: Record<string, ThreadMessage[]> = {
  ava: [
    { kind: "time", label: "SUNDAY, 11:02AM" },
    {
      kind: "coach",
      title: "Coach · Acknowledge",
      body:
        "A change in rhythm has been noticed. Nothing you need to fix.",
    },
    {
      kind: "msg",
      from: "them",
      text: "Hey. The pottery photo — was that your studio?",
    },
    {
      kind: "msg",
      from: "me",
      text: "Yeah, my friend's. I go on Sundays.",
    },
    {
      kind: "msg",
      from: "them",
      text: "That's a really lovely Sunday.",
    },
  ],
  maya: [
    { kind: "time", label: "TODAY, 10:01AM" },
    { kind: "msg", from: "them", text: "Loved that book rec.", time: "10:01" },
    { kind: "msg", from: "me", text: "Yeah? Which bit landed?", time: "10:04", read: true },
  ],
  jade: [
    { kind: "time", label: "FIVE DAYS AGO", },
    { kind: "msg", from: "them", text: "How's your week?", time: "08:12" },
  ],
  avery: [
    { kind: "msg", from: "them", text: "Saved here for backwards-compat. See ava for the demo.", time: "00:00" },
  ],
  asha: [
    { kind: "time", label: "TUESDAY, 9:14AM" },
    {
      kind: "msg",
      from: "them",
      text:
        "The yellow paper detail is the part that got me. There's a used bookshop on Atlantic that smells exactly like that. I can show you, slowly.",
    },
    {
      kind: "msg",
      from: "me",
      text:
        "Okay this is the best opener I've had on here. The 'slowly' part especially.",
    },
    {
      kind: "msg",
      from: "me",
      text: "What were you reading when you noticed the smell?",
    },
    {
      kind: "msg",
      from: "them",
      text:
        "I was 14 and looking for a copy of A Wrinkle in Time my mom kept telling me about. Found it. Still have it. The pages are basically butter at this point.",
    },
    {
      kind: "coach",
      title: "Coach Prompt — only you can see this",
      body:
        "She just shared a story from when she was 14. That's a small offering. Don't rush past it — ask one question that takes her back there.",
    },
  ],
  yuki: [
    { kind: "time", label: "WEDNESDAY, 7:02PM" },
    {
      kind: "msg",
      from: "them",
      text: "Friday, 4pm, the place near the canal? I'll grab a table outside.",
    },
    {
      kind: "msg",
      from: "me",
      text: "Confirmed. I'll be the one looking nervous on purpose.",
    },
  ],
  marco: [
    { kind: "time", label: "YESTERDAY, 8:41PM" },
    {
      kind: "photo",
      from: "them",
      src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
      caption: "Beach we walked past on Sunday.",
      time: "20:42",
    },
    {
      kind: "voice",
      from: "me",
      durationSeconds: 27,
      time: "20:48",
      read: true,
    },
    {
      kind: "plan_invite",
      id: "pi-avery-1",
      from: "them",
      when: "Saturday 16 May, 7pm",
      where: "Sessions Arts Club, Clerkenwell",
      notes: "Drinks first, dinner if it feels right.",
      status: "proposed",
    },
    {
      kind: "msg",
      from: "me",
      text:
        "The honesty/comfort one — what does that look like for you, day to day?",
    },
  ],
  daniel: [
    { kind: "time", label: "FRIDAY, 11:00AM" },
    {
      kind: "msg",
      from: "them",
      text: "Slammed week. Circle back next week?",
    },
    { kind: "msg", from: "me", text: "Of course. Take care." },
  ],
};

// ----------------------------- Draft intercept ----------------------------

export type DraftPattern = {
  title: string;
  body: string;
};

export const SAMPLE_DRAFT = {
  to: "asha",
  text:
    "Hey haven't heard from you in a couple days, just wondering if everything is okay or if I did something? I get if you're not feeling it lol but it would be cool to know.",
  patterns: [
    {
      title: "Two questions, no statement",
      body:
        "When we ask twice, the other person feels tested. Try one clear thing you want.",
    },
    {
      title: "Hedging language",
      body:
        "“Just wondering,” “lol,” and “it would be cool” are softeners. Asha can handle directness.",
    },
    {
      title: "It's been 38 hours",
      body:
        "That's not a long silence. People have lives. Capacity ebbs.",
    },
  ] as DraftPattern[],
};

// ----------------------------- Ending templates ---------------------------

export type EndingTemplate = {
  id: string;
  title: string;
  blurb: string;
  template: string;
};

export const ENDING_TEMPLATES: EndingTemplate[] = [
  {
    id: "lost-chemistry",
    title: "Lost chemistry",
    blurb: "It was good. The spark didn't land.",
    template:
      "Hi {name} — I really enjoyed meeting you. The spark wasn't quite there for me, and I want to be honest rather than fade. Wishing you well.",
  },
  {
    id: "life-change",
    title: "Life change",
    blurb: "My life shifted. I can't show up properly.",
    template:
      "Hi {name} — life has shifted in a way that means I can't show up the way you deserve right now. This is about me, not you. Take care.",
  },
  {
    id: "role-mismatch",
    title: "Role mismatch",
    blurb: "We want different shapes of relationship.",
    template:
      "Hi {name} — I think we're looking for different shapes of relationship, and I want to be honest about that early. I appreciated our conversations.",
  },
];

// ----------------------------- Cool-off ----------------------------------

export type CoolOffOption = {
  id: string;
  title: string;
  sub: string;
};

export const COOL_OFF_OPTIONS: CoolOffOption[] = [
  { id: "wait", title: "Wait it out", sub: "Re-decide tomorrow" },
  { id: "one-message", title: "Send one clean message", sub: "A separate, single send" },
  { id: "block", title: "Block fully", sub: "Permanent. No notification to them." },
  { id: "release", title: "Release", sub: "Reinstate connection. No fanfare." },
];

export const SAMPLE_COOL_OFF = {
  targetId: "avery",
  hoursLeft: 23,
  minutesLeft: 14,
  toldThem: false,
};

/* ---------- R3-28 Boundaries Alignment (DR-087, paired-reveal) ---------- */

export type BoundariesQuestionId =
  | "pace"
  | "physical-contact"
  | "substances"
  | "comms-when-off"
  | "leaving-early";

export type BoundariesQuestion = {
  id: BoundariesQuestionId;
  prompt: string;
  options: string[]; // empty for free-text-only questions (e.g. leaving-early)
  optional: boolean;
};

export const BOUNDARIES_QUESTIONS: BoundariesQuestion[] = [
  {
    id: "pace",
    prompt:
      "When a new connection feels promising, how soon do you usually like to meet in person?",
    options: [
      "Within a few days",
      "After a week or two",
      "After we've had a longer chat",
      "It depends",
    ],
    optional: false,
  },
  {
    id: "physical-contact",
    prompt:
      "On a first or second date, what kind of physical contact, if any, tends to feel comfortable for you?",
    options: [
      "None — I prefer no touch at all",
      "A hello/goodbye hug can feel fine",
      "It depends on how it feels in the moment",
    ],
    optional: false,
  },
  {
    id: "substances",
    prompt:
      "What feels right for you around alcohol or other substances on early dates?",
    options: [
      "I prefer no alcohol or substances",
      "One drink is my limit",
      "I'm comfortable if we talk about it first",
      "I don't use substances, but I'm relaxed if you have one drink",
    ],
    optional: false,
  },
  {
    id: "comms-when-off",
    prompt:
      "If something doesn't feel right for you on a date, what usually helps you say so?",
    options: [
      "I prefer to step away and text later",
      "I'll say something gently in the moment",
      "I might go quiet and need time before talking",
    ],
    optional: false,
  },
  {
    id: "leaving-early",
    prompt:
      "If you needed to leave a date early, what would you want the other person to understand?",
    options: [],
    optional: true,
  },
];

export type BoundariesAnswer = {
  questionId: BoundariesQuestionId;
  choice?: string;
  freeText?: string;
};

export type BoundariesPartnerState =
  | "not-started"
  | "in-progress"
  | "finished"
  | "stalled";

// Phase 1 fixture per-connection. Phase 4 reads from
// boundariesAnswers (per user) + boundariesInsights (post paired-reveal).
export const SAMPLE_BOUNDARIES_PARTNER_STATE: Record<string, BoundariesPartnerState> = {
  ava: "in-progress",
  maya: "finished",
  jade: "not-started",
};

export type BoundariesInsight = {
  pacedShared: string;
  paceDifferent: string;
  observations: string[];
};

export const SAMPLE_BOUNDARIES_INSIGHT: Record<string, BoundariesInsight> = {
  maya: {
    pacedShared:
      "You both prefer a longer chat before meeting in person. Worth noticing.",
    paceDifferent:
      "You approach substances differently — worth a careful conversation when it feels right.",
    observations: [
      "You're close on pace.",
      "You differ on substances.",
      "You're aligned on how you'd communicate if something felt off.",
    ],
  },
};

/* ---------- R3-31 Values Alignment (DR-094, conversation cards) ---------- */

export type ValuesAreaId =
  | "pace"
  | "physical-contact"
  | "substances"
  | "comms-when-off"
  | "leaving-early";

export type ValuesCardState = "close" | "different" | "not-yet";

export type ValuesCard = {
  area: ValuesAreaId;
  label: string;
  state: ValuesCardState;
  copy: string;
  prompt: string;
};

export type ValuesAlignment = {
  summary: string;
  cards: ValuesCard[];
};

export const SAMPLE_VALUES_ALIGNMENT: Record<string, ValuesAlignment> = {
  ava: {
    summary:
      "You're close on pace; different on substances. Polaris noticed — worth a quiet conversation when it feels right.",
    cards: [
      {
        area: "pace",
        label: "Pace of meeting up",
        state: "close",
        copy: "You both prefer a longer chat before meeting in person. Worth noticing.",
        prompt:
          "What part of getting to know each other before a first meet matters most to you?",
      },
      {
        area: "physical-contact",
        label: "Physical contact on early dates",
        state: "close",
        copy: "You both said a hello/goodbye hug can feel fine, depending on the moment. Aligned.",
        prompt: "Is there anything you'd want to flag about touch at the start?",
      },
      {
        area: "substances",
        label: "Substances on dates",
        state: "different",
        copy:
          "You differ here. You prefer no alcohol; they're comfortable with one drink if you talk about it first. This isn't a problem unless it becomes one.",
        prompt: "How would you want to bring this up if it felt relevant?",
      },
      {
        area: "comms-when-off",
        label: "Communication when something feels off",
        state: "close",
        copy:
          "You both said you'd say something gently in the moment. The same instinct.",
        prompt: "What helps you actually do this in the moment?",
      },
      {
        area: "leaving-early",
        label: "Leaving a date early",
        state: "not-yet",
        copy: "We don't have this from them yet.",
        prompt: "If it came up, what would you want them to understand?",
      },
    ],
  },
};

