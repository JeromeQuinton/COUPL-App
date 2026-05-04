#!/usr/bin/env node
/**
 * Persona-discipline guard.
 *
 * Polaris is the only AI persona in COUPL. Liora is a retired name and
 * must never appear in source. This script greps src/ for the banned
 * pattern and exits non-zero if any matches are found, so it can be
 * wired as a prebuild hook and fail CI before the build runs.
 *
 * Run manually: `node scripts/check-vocab.mjs`
 */

import { execSync } from "node:child_process";

const BANNED = [
  {
    pattern: "\\bLiora\\b",
    label: "Liora (retired persona — use Polaris)",
  },
];

const TARGET = "src";
const INCLUDES = ["*.tsx", "*.ts"];

let failed = 0;

for (const { pattern, label } of BANNED) {
  const includeArgs = INCLUDES.map((p) => `--include="${p}"`).join(" ");
  // Exit 1 from grep means "no matches" — coerce with `|| true`.
  const cmd = `grep -rniE ${includeArgs} "${pattern}" ${TARGET} || true`;
  const out = execSync(cmd, { encoding: "utf8", shell: "/bin/bash" }).trim();

  if (out) {
    failed++;
    console.error(`\n❌ Persona violation: ${label}`);
    console.error(out);
  }
}

if (failed > 0) {
  console.error(
    `\nReplace banned references with Polaris and re-run the build.\n`,
  );
  process.exit(1);
}

console.log("✓ Persona check passed (Polaris is the only AI persona).");
