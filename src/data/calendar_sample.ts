// Phase 1: hand-shaped sample data. Phase 4: derive from
// connections + workshops + events + bookings tables.

export type CalendarItemType = "date-plan" | "workshop" | "event";

export type CalendarItem = {
  id: string;
  type: CalendarItemType;
  start: string;
  end?: string;
  title: string;
  whereLabel: string;
  withWhom: string;
  href:
    | { route: "/connections/$id/date-plan"; id: string }
    | { route: "/growth/$id"; id: string }
    | { route: "/events/$id"; id: string };
};

function thisSunday(): Date {
  const now = new Date();
  const d = new Date(now);
  d.setDate(d.getDate() - d.getDay());
  d.setHours(0, 0, 0, 0);
  return d;
}

function iso(daysFromSunday: number, hours: number, minutes = 0): string {
  const d = thisSunday();
  d.setDate(d.getDate() + daysFromSunday);
  d.setHours(hours, minutes, 0, 0);
  return d.toISOString();
}

export const CALENDAR_ITEMS: CalendarItem[] = [
  {
    id: "c1",
    type: "date-plan",
    start: iso(1, 18, 30),
    end: iso(1, 20, 0),
    title: "Slow walk + dinner",
    whereLabel: "Hampstead Heath",
    withWhom: "with Ava",
    href: { route: "/connections/$id/date-plan", id: "ava" },
  },
  {
    id: "c2",
    type: "workshop",
    start: iso(2, 19, 0),
    end: iso(2, 20, 15),
    title: "The repair conversation · Session 2",
    whereLabel: "Online · 75 min",
    withWhom: "with Lena",
    href: { route: "/growth/$id", id: "demo" },
  },
  {
    id: "c3",
    type: "date-plan",
    start: iso(4, 11, 0),
    end: iso(4, 12, 30),
    title: "Slow coffee",
    whereLabel: "Sessions Arts Club",
    withWhom: "with Maya",
    href: { route: "/connections/$id/date-plan", id: "maya" },
  },
  {
    id: "c4",
    type: "event",
    start: iso(5, 19, 30),
    title: "Quiet dinner — small table",
    whereLabel: "Soho · hosted",
    withWhom: "8 attendees",
    href: { route: "/events/$id", id: "demo" },
  },
  {
    id: "c5",
    type: "date-plan",
    start: iso(6, 10, 30),
    end: iso(6, 12, 0),
    title: "Gallery hour",
    whereLabel: "Whitechapel",
    withWhom: "with Jade",
    href: { route: "/connections/$id/date-plan", id: "jade" },
  },
  {
    id: "c6",
    type: "workshop",
    start: iso(9, 19, 0),
    end: iso(9, 20, 15),
    title: "The repair conversation · Session 3",
    whereLabel: "Online · 75 min",
    withWhom: "with Lena",
    href: { route: "/growth/$id", id: "demo" },
  },
  {
    id: "c7",
    type: "event",
    start: iso(12, 18, 0),
    title: "Reading + tea",
    whereLabel: "Bloomsbury · hosted",
    withWhom: "12 attendees",
    href: { route: "/events/$id", id: "demo-2" },
  },
];
