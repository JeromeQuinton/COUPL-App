export type EventSummary = {
  id: string;
  title: string;
  host: string;
  hostBio: string;
  hostInitial: string;
  dateLabel: string;       // SAT · NOV 8 · 6PM
  dateShort: { mon: string; day: string };
  timeRange: string;       // 6:00pm–9:30pm
  neighborhood: string;
  venue: string;
  address: string;
  walkNote: string;
  ageRange: string;        // Ages 28-38
  price: string;           // $48 / sliding
  capacityLabel: string;   // 2 of 6 left
  seatsLeft: number;
  blurb: string;
  swatch: string;          // CSS gradient for hero strip
  format: "dinner" | "walk" | "reading" | "studio";
};

export const FEATURED_EVENT: EventSummary = {
  id: "ev-harts-nov8",
  title: "Slow dinner for six at Hart's",
  host: "Reni Achebe",
  hostInitial: "R",
  hostBio:
    "I cook simply, ask three questions, and let the night do the rest. No icebreakers. No matchmaking. Just a long table and good food.",
  dateLabel: "SAT · NOV 8 · 6PM",
  dateShort: { mon: "NOV", day: "8" },
  timeRange: "6:00pm – 9:30pm",
  neighborhood: "Brooklyn",
  venue: "Hart's",
  address: "506 Grand St, Brooklyn",
  walkNote: "12 min walk from Lorimer L",
  ageRange: "Ages 28-38",
  price: "$48 / sliding",
  capacityLabel: "2 of 6 left",
  seatsLeft: 2,
  blurb:
    "A long table, three courses, no phones. Hosted by Reni. Three prompts to start, then conversation finds itself.",
  swatch:
    "linear-gradient(135deg, #C9B58A 0%, #B89A6E 50%, #8E6B45 100%)",
  format: "dinner",
};

export const UPCOMING_EVENTS: EventSummary[] = [
  {
    id: "ev-prospect-nov12",
    title: "Walk + write — Prospect Park",
    host: "Maren Liu",
    hostInitial: "M",
    hostBio: "A 90-minute slow loop. We walk, then we write for ten minutes.",
    dateLabel: "WED · NOV 12 · 9AM",
    dateShort: { mon: "NOV", day: "12" },
    timeRange: "9:00am – 11:00am",
    neighborhood: "Brooklyn",
    venue: "Prospect Park — Grand Army entrance",
    address: "Prospect Park West, Brooklyn",
    walkNote: "5 min walk from Grand Army Plaza",
    ageRange: "Ages 26-40",
    price: "$22 / sliding",
    capacityLabel: "10 of 12 left",
    seatsLeft: 10,
    blurb: "Walk a slow loop. Then sit and write for ten minutes. Optional share-out at the end.",
    swatch: "linear-gradient(135deg, #C7D6BD 0%, #9BB58F 100%)",
    format: "walk",
  },
  {
    id: "ev-books-nov14",
    title: "Reading hour at Books Are Magic",
    host: "Theo Park",
    hostInitial: "T",
    hostBio: "We bring our own books. We read together. We talk for fifteen minutes after.",
    dateLabel: "FRI · NOV 14 · 7PM",
    dateShort: { mon: "NOV", day: "14" },
    timeRange: "7:00pm – 8:30pm",
    neighborhood: "Brooklyn",
    venue: "Books Are Magic — Cobble Hill",
    address: "225 Smith St, Brooklyn",
    walkNote: "8 min walk from Bergen St",
    ageRange: "Ages 28-42",
    price: "$18 / sliding",
    capacityLabel: "Filling — 5 of 10 left",
    seatsLeft: 5,
    blurb: "Bring a book you actually want to read. Quiet hour, then a small circle to talk.",
    swatch: "linear-gradient(135deg, #E8C8C8 0%, #C99A9A 100%)",
    format: "reading",
  },
  {
    id: "ev-ceramics-nov16",
    title: "Beginner ceramics — Sunday morning",
    host: "Kira Halvorsen",
    hostInitial: "K",
    hostBio: "First-time-friendly. We make one small bowl. Coffee on arrival.",
    dateLabel: "SUN · NOV 16 · 10AM",
    dateShort: { mon: "NOV", day: "16" },
    timeRange: "10:00am – 12:30pm",
    neighborhood: "Greenpoint",
    venue: "Halvorsen Studio",
    address: "84 Franklin St, Brooklyn",
    walkNote: "10 min walk from Greenpoint Ave",
    ageRange: "Ages 26-40",
    price: "$56 / sliding",
    capacityLabel: "8 of 10 left",
    seatsLeft: 8,
    blurb: "Make a small bowl with your hands. Coffee, music, no pressure.",
    swatch: "linear-gradient(135deg, #D6CFE8 0%, #A89BC9 100%)",
    format: "studio",
  },
];

export function getEvent(id: string): EventSummary | undefined {
  if (id === FEATURED_EVENT.id) return FEATURED_EVENT;
  return UPCOMING_EVENTS.find((e) => e.id === id);
}

export type SessionStep = { time: string; copy: string };

export const SESSION_STRUCTURE: SessionStep[] = [
  { time: "6:00", copy: "Arrive. A drink. Name on a small card." },
  { time: "6:30", copy: "First course. Three rotating questions." },
  { time: "7:30", copy: "Second course. Open conversation." },
  { time: "8:30", copy: "Dessert. One reflection prompt." },
  { time: "9:30", copy: "Soft close. No pressure to stay." },
];

export type SeatPerson = { initial: string; label: string; isYou?: boolean };

export const TONIGHT_SEATING: { topRow: SeatPerson[]; bottomRow: SeatPerson[] } = {
  topRow: [
    { initial: "A", label: "Aria" },
    { initial: "J", label: "Jules" },
    { initial: "M", label: "Mira", isYou: true },
  ],
  bottomRow: [
    { initial: "T", label: "Theo" },
    { initial: "K", label: "Kira" },
    { initial: "E", label: "Elena" },
  ],
};

export type RoundUpYes = {
  initial: string;
  name: string;
  hue: "lavender" | "blush" | "beeswax";
  note: string;
};

export const ROUNDUP_YESES: RoundUpYes[] = [
  {
    initial: "T",
    name: "Theo",
    hue: "lavender",
    note: "You both wrote about your fathers. He'd like to keep talking.",
  },
  {
    initial: "K",
    name: "Kira",
    hue: "blush",
    note: "Quieter connection. She asked if you'd ever come to her ceramics studio.",
  },
];

export const QUIETLY_NOTED =
  "Two others wrote your name. They didn't get a yes back. Nothing to do — they were told gently and have other people.";

export const REFLECTION_QUOTE =
  "I didn't perform once. The first prompt cracked something open and I just stayed there.";