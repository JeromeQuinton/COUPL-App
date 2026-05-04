/**
 * Cities fixture for date-plan flows.
 *
 * Phase 1 stub — UK-first; Phase 4 sources from `cities` table with
 * geo lookup. Two-person resolution screen reads from this list to
 * resolve "where will you actually meet" when partners differ.
 *
 * Stream 26 SCREEN-R2-25.
 */

export type CitySample = {
  id: string;
  name: string;
  region: string;
};

export const CITIES: CitySample[] = [
  { id: "lon", name: "London", region: "England" },
  { id: "man", name: "Manchester", region: "England" },
  { id: "bri", name: "Bristol", region: "England" },
  { id: "lee", name: "Leeds", region: "England" },
  { id: "edi", name: "Edinburgh", region: "Scotland" },
  { id: "gla", name: "Glasgow", region: "Scotland" },
  { id: "bir", name: "Birmingham", region: "England" },
  { id: "bri2", name: "Brighton", region: "England" },
  { id: "car", name: "Cardiff", region: "Wales" },
  { id: "bel", name: "Belfast", region: "Northern Ireland" },
  { id: "liv", name: "Liverpool", region: "England" },
  { id: "new", name: "Newcastle", region: "England" },
  { id: "she", name: "Sheffield", region: "England" },
  { id: "nor", name: "Norwich", region: "England" },
  { id: "oxf", name: "Oxford", region: "England" },
  { id: "cam", name: "Cambridge", region: "England" },
];

export const findCity = (q: string): CitySample[] => {
  const needle = q.trim().toLowerCase();
  if (!needle) return CITIES.slice(0, 6);
  return CITIES.filter((c) => c.name.toLowerCase().includes(needle));
};
