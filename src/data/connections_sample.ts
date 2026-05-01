/**
 * Phase 1 Connections fixtures (DR-023, DR-030, DR-034).
 *
 * Stub data only — Phase 4 sources from `connections`, `messages`, and
 * `coach_prompts` tables. Vocabulary is canonical: Connection, Attune,
 * Day N of 7, Cool-off, Closed. No "match", no "swipe".
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
    }
  | {
      kind: "time";
      label: string; // "TUESDAY, 9:14AM"
    }
  | {
      kind: "coach";
      title: string;
      body: string;
    };

export const THREADS: Record<string, ThreadMessage[]> = {
  avery: [
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