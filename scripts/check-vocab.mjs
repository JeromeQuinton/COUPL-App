#!/usr/bin/env node
/**
 * Persona-discipline guard.
 *
 * Polaris is the only AI persona in COUPL. Liora is a retired name and
 * must never appear in source. This script scans src/ for the banned
 * pattern and exits non-zero if any matches are found, so it can be
 * wired as a prebuild hook and fail CI before the build runs.
 *
 * Cross-platform: pure Node fs walk + regex (no shell dependency, no
 * grep). Brief 6 #7 — replaces the prior `execSync('grep ...', { shell:
 * '/bin/bash' })` implementation that crashed with ENOENT on Windows.
 *
 * Run manually: `node scripts/check-vocab.mjs`
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const BANNED = [
  {
    pattern: /\bLiora\b/,
    label: "Liora (retired persona — use Polaris)",
  },
];

const TARGET = "src";
const EXTENSIONS = new Set([".ts", ".tsx"]);

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      yield* walk(full);
    } else if (EXTENSIONS.has(extname(entry))) {
      yield full;
    }
  }
}

let failed = 0;

for (const { pattern, label } of BANNED) {
  const hits = [];
  for (const file of walk(TARGET)) {
    const text = readFileSync(file, "utf8");
    const lines = text.split(/\r?\n/);
    lines.forEach((line, i) => {
      if (pattern.test(line)) {
        hits.push(`${file}:${i + 1}:${line.trim()}`);
      }
    });
  }
  if (hits.length > 0) {
    failed++;
    console.error(`\n❌ Persona violation: ${label}`);
    for (const hit of hits) console.error(hit);
  }
}

if (failed > 0) {
  console.error(
    `\nReplace banned references with Polaris and re-run the build.\n`,
  );
  process.exit(1);
}

console.log("✓ Persona check passed (Polaris is the only AI persona).");
