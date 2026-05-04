#!/usr/bin/env node
/**
 * scripts/gen-dev-routes.mjs
 *
 * Scans src/routes/*.tsx and emits src/data/dev-routes.generated.ts —
 * a typed array of { title, rows[] } sections that the dev-routes screen
 * renders. Runs as a prebuild step so the dev surface stays in sync with
 * the route tree on every build. Commit the generated file.
 *
 * Per-route conventions:
 *   // @dev-label: My Label   — override the auto-derived label
 *   // @dev-skip               — exclude this route from dev-routes
 *
 * Sample params for $param segments live in PARAM_DEFAULTS below; add new
 * ones as new dynamic surfaces ship.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ROUTES_DIR = path.join(ROOT, "src", "routes");
const OUTPUT = path.join(ROOT, "src", "data", "dev-routes.generated.ts");

// First non-layout segment → section title. `null` = skip the route entirely.
// Anything not listed lands in "Marketing" (about, press, terms, etc).
const SECTIONS = {
  auth: "Auth",
  signin: "Auth", // _auth.signin
  onboarding: "Onboarding",
  system: "System",
  connections: "Connections",
  discover: "Discover",
  profile: "Profile",
  events: "Events",
  growth: "Growth",
  host: "Host",
  video: "Video",
  membership: "Membership",
  "date-plans": "Date plans",
  coach: "Coach",
  home: "Home",
  calendar: "Calendar",
  notifications: "Notifications",
  polaris: "Polaris",
  "welcome-back": "Misc",
  "dev-routes": null, // don't list ourselves
};

// Sample values for $param segments. Contextual key wins:
//   "connections/$id" beats "$id".
const PARAM_DEFAULTS = {
  "connections/$id": "ava",
  "discover/$id": "maya",
  "events/$id": "demo",
  "growth/$id": "demo",
  "date-plans/$id": "london-hampstead-heath",
  $connectionId: "ava",
  $workshopId: "demo",
  $articleId: "presence",
  $lensId: "quiet-presence",
  $topicId: "safety",
  $category: "matches",
};

const LAYOUT_ONLY = new Set(["_main.tsx", "_auth.tsx", "__root.tsx"]);

// `_main.profile.data.export.tsx` → ['_main', 'profile', 'data', 'export']
function segmentsOf(filename) {
  return filename.replace(/\.tsx$/, "").split(".");
}

// Strip TanStack takeover marker: `$id_` → `$id`, `new_` → `new`.
function normalizeSegment(seg) {
  return seg.replace(/_$/, "");
}

// Drop layout markers (`_main`, `_auth`) and `index` from segments.
function meaningfulSegments(segments) {
  return segments
    .filter((s) => !s.startsWith("_"))
    .map(normalizeSegment)
    .filter((s) => s !== "index");
}

function urlOf(segments) {
  const meaningful = meaningfulSegments(segments);
  return meaningful.length === 0 ? "/" : "/" + meaningful.join("/");
}

function sectionOf(segments) {
  // Pick the first segment that names a section. `_auth.signin` → "signin" → Auth.
  const candidates = segments.filter((s) => !s.startsWith("_") || s === "_auth");
  for (const seg of candidates) {
    const key = normalizeSegment(seg).replace(/^_/, "");
    if (key in SECTIONS) return SECTIONS[key];
  }
  // Top-level marketing pages (about, press, founder, terms, privacy, community-guidelines, index).
  return "Marketing";
}

function titleCase(slug) {
  const spaced = slug.replace(/-/g, " ").replace(/^\$/, "");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

// Label rule: last segment of the URL, prettied. When the last segment is a
// `$param`, fall back to `${parent} detail` so `/discover/$id` reads
// "Discover detail" rather than colliding with the section heading.
function labelOf(segments) {
  const meaningful = meaningfulSegments(segments);
  if (meaningful.length === 0) return "Home";
  const last = meaningful[meaningful.length - 1];
  if (last.startsWith("$") && meaningful.length >= 2) {
    return titleCase(meaningful[meaningful.length - 2]) + " detail";
  }
  return titleCase(last);
}

function paramsOf(segments) {
  const meaningful = meaningfulSegments(segments);
  const params = {};
  for (let i = 0; i < meaningful.length; i++) {
    const seg = meaningful[i];
    if (!seg.startsWith("$")) continue;
    const paramName = seg.slice(1);
    const parent = i > 0 ? meaningful[i - 1] : null;
    const ctxKey = parent ? `${parent}/${seg}` : null;
    const value =
      (ctxKey && PARAM_DEFAULTS[ctxKey]) || PARAM_DEFAULTS[seg] || "demo";
    params[paramName] = value;
  }
  return Object.keys(params).length ? params : undefined;
}

function readMeta(filepath) {
  const src = fs.readFileSync(filepath, "utf8");
  if (/\/\/\s*@dev-skip\b/.test(src)) return { skip: true };
  const m = src.match(/\/\/\s*@dev-label:\s*(.+)/);
  return { label: m?.[1]?.trim() };
}

const files = fs
  .readdirSync(ROUTES_DIR)
  .filter((f) => f.endsWith(".tsx"))
  .filter((f) => !LAYOUT_ONLY.has(f))
  .sort();

// A `_main.foo.tsx` paired with `_main.foo.index.tsx` is layout-only —
// its index sibling is the leaf surface. Drop the parent.
const indexedParents = new Set(
  files
    .filter((f) => f.endsWith(".index.tsx"))
    .map((f) => f.slice(0, -".index.tsx".length) + ".tsx"),
);
const visibleFiles = files.filter((f) => !indexedParents.has(f));

const entries = [];
for (const file of visibleFiles) {
  const filepath = path.join(ROUTES_DIR, file);
  const segments = segmentsOf(file);

  const section = sectionOf(segments);
  if (section === null) continue;

  const meta = readMeta(filepath);
  if (meta.skip) continue;

  entries.push({
    section,
    label: meta.label || labelOf(segments),
    to: urlOf(segments),
    params: paramsOf(segments),
  });
}

const sectionOrder = [
  "Home",
  "Discover",
  "Connections",
  "Date plans",
  "Events",
  "Growth",
  "Calendar",
  "Notifications",
  "Polaris",
  "Coach",
  "Membership",
  "Profile",
  "Host",
  "Video",
  "Onboarding",
  "Auth",
  "System",
  "Marketing",
  "Misc",
];
const seen = new Set(entries.map((e) => e.section));
const orderedSections = [
  ...sectionOrder.filter((s) => seen.has(s)),
  ...[...seen].filter((s) => !sectionOrder.includes(s)).sort(),
];

const grouped = orderedSections.map((title) => ({
  title,
  rows: entries
    .filter((e) => e.section === title)
    .sort((a, b) => a.to.localeCompare(b.to))
    .map((e) => {
      const out = { label: e.label, to: e.to };
      if (e.params) out.params = e.params;
      return out;
    }),
}));

const banner = `// THIS FILE IS GENERATED — DO NOT EDIT BY HAND.
// Source: scripts/gen-dev-routes.mjs (runs as prebuild).
// Override a label: add \`// @dev-label: Custom Label\` to the route file.
// Exclude a route from the dev surface: add \`// @dev-skip\`.

export type DevRouteRow = {
  label: string;
  to: string;
  params?: Record<string, string>;
};

export type DevRouteSection = {
  title: string;
  rows: DevRouteRow[];
};

export const DEV_ROUTE_SECTIONS: DevRouteSection[] = ${JSON.stringify(
  grouped,
  null,
  2,
)};
`;

fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
fs.writeFileSync(OUTPUT, banner);
console.log(
  `✓ dev-routes: ${entries.length} routes across ${grouped.length} sections → ${path.relative(ROOT, OUTPUT)}`,
);
