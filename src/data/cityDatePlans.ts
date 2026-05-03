export type CityDateCategory =
  | "walk"
  | "coffee"
  | "slow-lunch"
  | "gallery"
  | "evening-reading";

export type CityDatePlan = {
  id: string;
  city: "London";
  title: string;
  category: CityDateCategory;
  venue: string;
  area: string;
  durationMin: number;
  whyItWorks: string;
  notes?: string;
};

export const CITY_DATE_PLANS: CityDatePlan[] = [
  {
    id: "london-hampstead-heath",
    city: "London",
    title: "A long walk on Hampstead Heath",
    category: "walk",
    venue: "Hampstead Heath",
    area: "Hampstead",
    durationMin: 90,
    whyItWorks:
      "Big sky, easy quiet, room to talk without a table between you. The walk does half the work.",
  },
  {
    id: "london-sessions-arts",
    city: "London",
    title: "Slow coffee at Sessions Arts Club",
    category: "coffee",
    venue: "Sessions Arts Club",
    area: "Clerkenwell",
    durationMin: 60,
    whyItWorks:
      "Slow rooms, no rush — easy to leave or stay. The room rewards an unhurried conversation.",
  },
  {
    id: "london-whitechapel-gallery",
    city: "London",
    title: "An hour at Whitechapel Gallery",
    category: "gallery",
    venue: "Whitechapel Gallery",
    area: "Whitechapel",
    durationMin: 75,
    whyItWorks:
      "Looking at something together gives the conversation somewhere to go. Free entry, low stakes.",
  },
  {
    id: "london-borough-market",
    city: "London",
    title: "A slow lunch via Borough Market",
    category: "slow-lunch",
    venue: "Borough Market",
    area: "Southwark",
    durationMin: 100,
    whyItWorks:
      "Food picked together, eaten side-by-side. Small choices reveal more than small talk.",
  },
  {
    id: "london-daunt-marylebone",
    city: "London",
    title: "An afternoon at Daunt Books",
    category: "evening-reading",
    venue: "Daunt Books Marylebone",
    area: "Marylebone",
    durationMin: 90,
    whyItWorks:
      "Browse the travel section in opposite directions. Meet at the back. Tell each other what you would have packed.",
  },
  {
    id: "london-london-review-bookshop",
    city: "London",
    title: "Evening reading at the London Review Bookshop",
    category: "evening-reading",
    venue: "London Review Bookshop",
    area: "Bloomsbury",
    durationMin: 75,
    whyItWorks:
      "Watch a writer on a Tuesday evening. There's somewhere to put attention that isn't each other.",
    notes: "Tickets often go quickly — book ahead of time.",
  },
  {
    id: "london-regents-canal",
    city: "London",
    title: "Walk Regent's Canal, Angel to Camden",
    category: "walk",
    venue: "Regent's Canal towpath",
    area: "Angel → Camden",
    durationMin: 60,
    whyItWorks:
      "The water carries the pace. You can stop early at any of the locks if it isn't quite landing.",
  },
  {
    id: "london-tate-britain-late",
    city: "London",
    title: "Tate Britain Late",
    category: "gallery",
    venue: "Tate Britain",
    area: "Pimlico",
    durationMin: 120,
    whyItWorks:
      "First-Friday Lates: art, talks, a quiet bar. Easy to drift between rooms and rhythms.",
  },
];

export function getCityDatePlan(id: string) {
  return CITY_DATE_PLANS.find((p) => p.id === id);
}

export const CATEGORY_LABEL: Record<CityDateCategory, string> = {
  walk: "Walk",
  coffee: "Coffee",
  "slow-lunch": "Slow lunch",
  gallery: "Gallery",
  "evening-reading": "Evening reading",
};
