#!/usr/bin/env node
/**
 * Stage A of the token migration: rename legacy shadcn-flat Tailwind utilities
 * to the generated `--db-*` semantic utilities.
 *
 * Stage A is defined as changes with no (or imperceptibly better) visual result.
 * Value shifts — anything that makes the product look different — are Stage B and
 * are deliberately NOT in this file.
 *
 * Usage:
 *   node scripts/migrations/stage-a-tokens.mjs --batch 1          # dry run
 *   node scripts/migrations/stage-a-tokens.mjs --batch 1 --apply  # write
 *   node scripts/migrations/stage-a-tokens.mjs --all              # dry run, every batch
 *   node scripts/migrations/stage-a-tokens.mjs --verify           # assert 0 legacy left
 *
 * Matching is whole-class-token only. The left boundary rejects a preceding
 * `-`, which is what keeps CSS custom properties (`var(--muted-foreground)`)
 * and compound classes (`bg-destructive-hover` when swapping `bg-destructive`)
 * from being rewritten.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

/** Legacy utility -> semantic utility. Stage A only. */
const MAP = {
  "bg-background": "bg-surface-base",
  "bg-card": "bg-surface-base",
  "bg-popover": "bg-surface-base",
  "text-foreground": "text-text-base",
  "text-card-foreground": "text-text-base",
  "text-popover-foreground": "text-text-base",
  "bg-muted": "bg-surface-subtle",
  "bg-secondary": "bg-surface-subtle",
  "text-muted-foreground": "text-text-subtle",
  "text-secondary-foreground": "text-text-base",
  "bg-accent": "bg-surface-accent",
  "text-accent-foreground": "text-text-accent",
  "bg-destructive": "bg-action-negative-base",
  "text-destructive": "text-status-text-negative",
  "text-destructive-foreground": "text-action-label-inverse-base",
  "bg-destructive-hover": "bg-action-negative-hover",
  "bg-destructive-press": "bg-action-negative-press",
  "bg-success": "bg-action-positive-base",
  "text-success": "text-status-text-positive",
  "text-warning": "text-status-text-warning",
  "border-warning": "border-status-border-warning",
  "border-border": "border-border-base",
  "bg-disabled": "bg-surface-disabled",
  "text-disabled-foreground": "text-text-disabled",
  "bg-code-background": "bg-surface-inset",
  "bg-skeleton": "bg-utility-surface-skeleton",
  "bg-overlay": "bg-utility-scrim",
  "bg-surface-info": "bg-status-surface-info",
  "bg-surface-success": "bg-status-surface-positive",
  "bg-surface-warning": "bg-status-surface-warning",
  "bg-surface-danger": "bg-status-surface-negative",

  // Same legacy tokens reached through a color prefix the first pass missed.
  // Tailwind v4 generates every color prefix from one `--color-*` entry, so a
  // map keyed only on `bg-`/`text-`/`border-` was always going to be partial.
  "bg-border": "bg-border-base",
  "stroke-border": "stroke-border-base",
  "border-destructive": "border-action-negative-base",
  "ring-destructive": "ring-action-negative-base",
  "text-destructive-hover": "text-action-negative-hover",
  "text-destructive-press": "text-action-negative-press",
  "border-destructive-hover": "border-action-negative-hover",
  "border-destructive-press": "border-action-negative-press",
  "border-success": "border-action-positive-base",
  "bg-foreground": "bg-text-base",
  "ring-foreground": "ring-text-base",
  "fill-foreground": "fill-text-base",
  "text-background": "text-surface-base",
  "ring-background": "ring-surface-base",
  "bg-muted-foreground": "bg-text-subtle",
  "border-muted-foreground": "border-text-subtle",
  "fill-muted-foreground": "fill-text-subtle",
  "fill-muted": "fill-surface-subtle",
  "bg-accent-foreground": "bg-text-accent",
  "border-disabled": "border-border-disabled",
  "text-skeleton": "text-utility-text-skeleton",
};

// Stage B deferrals live in ./stage-b-deferred.mjs, shared with the audit.

/** Batches in dependency order. Matched against the repo-relative path. */
const BATCHES = [
  { n: 1, name: "Variant definitions", match: (p) => p === "packages/dbui/src/lib/button-variants.ts" },
  {
    n: 2,
    name: "Form controls",
    match: (p) =>
      /^packages\/dbui\/src\/components\/ui\/(input|textarea|native-select|select|combobox|checkbox|radio-group|radio-tile|switch|slider|field|input-group|date-range|label)\.tsx$/.test(p),
  },
  {
    n: 3,
    name: "Actions",
    match: (p) =>
      /^packages\/dbui\/src\/components\/ui\/(button|split-button|button-group|toggle|toggle-group|segment-control|badge|tag|kbd|pagination)\.tsx$/.test(p),
  },
  {
    n: 4,
    name: "Overlays and menus",
    match: (p) =>
      /^packages\/dbui\/src\/components\/ui\/(dropdown-menu|context-menu|menubar|popover|hover-card|dialog|alert-dialog|drawer|sonner)\.tsx$/.test(p),
  },
  {
    n: 5,
    name: "Containers, nav, data",
    match: (p) => /^packages\/dbui\/src\/components\/ui\/.+\.tsx$/.test(p),
  },
  { n: 6, name: "Shells", match: (p) => p.startsWith("packages/dbui-shells/src/") },
  { n: 7, name: "Genie", match: (p) => p.startsWith("packages/dbui-genie/src/") },
  // Exported rule definitions. Not components, but they quote utility names
  // to consumers, so a stale one is a documented lie.
  { n: 8, name: "Exported rule definitions", match: (p) => p.startsWith("packages/dbui/src/rules/") },
  // Storybook demo code. Not shipped, but it is the documentation people read,
  // so a legacy utility here teaches the wrong thing.
  { n: 9, name: "Storybook stories", match: (p) => p.startsWith("apps/portal/src/stories/") },
];

const SCAN_ROOTS = [
  "packages/dbui/src",
  "packages/dbui-shells/src",
  "packages/dbui-genie/src",
  "packages/dbui-viz/src",
  "apps/portal/src/stories",
];

function collectFiles() {
  const out = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const abs = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "icons") continue;
        walk(abs);
      } else if (/\.(tsx|ts)$/.test(entry.name)) {
        out.push(path.relative(ROOT, abs));
      }
    }
  };
  for (const r of SCAN_ROOTS) {
    const abs = path.join(ROOT, r);
    if (fs.existsSync(abs)) walk(abs);
  }
  return out.sort();
}

const rx = (cls) => new RegExp(`(?<![a-zA-Z0-9-])${cls}(?![a-zA-Z0-9-])`, "g");

/** Line indices that sit inside a // or /* *\/ comment. */
function commentLines(src) {
  const lines = src.split("\n");
  const flagged = new Set();
  let inBlock = false;
  lines.forEach((line, i) => {
    const t = line.trim();
    if (inBlock) {
      flagged.add(i);
      if (t.includes("*/")) inBlock = false;
      return;
    }
    if (t.startsWith("//")) flagged.add(i);
    if (t.includes("/*")) {
      flagged.add(i);
      if (!t.includes("*/")) inBlock = true;
    }
  });
  return flagged;
}

function analyze(rel) {
  const abs = path.join(ROOT, rel);
  const src = fs.readFileSync(abs, "utf8");
  const comments = commentLines(src);
  const lines = src.split("\n");

  let total = 0;
  let inComment = 0;
  const perClass = {};
  const dynamicRisks = [];

  for (const [from] of Object.entries(MAP)) {
    lines.forEach((line, i) => {
      const hits = line.match(rx(from));
      if (!hits) return;
      total += hits.length;
      perClass[from] = (perClass[from] || 0) + hits.length;
      if (comments.has(i)) inComment += hits.length;
      if (line.includes("${") || /\b(clsx|cn)\s*\([^)]*\+/.test(line)) {
        dynamicRisks.push({ line: i + 1, text: line.trim().slice(0, 110) });
      }
    });
  }

  let next = src;
  for (const [from, to] of Object.entries(MAP)) next = next.replace(rx(from), to);

  return { rel, src, next, total, inComment, perClass, dynamicRisks, changed: next !== src };
}

/* ------------------------------------------------------------------ cli --- */

const argv = process.argv.slice(2);
const apply = argv.includes("--apply");
const all = argv.includes("--all");
const verify = argv.includes("--verify");
const listFiles = argv.includes("--files");
const batchArg = argv.indexOf("--batch");
const batchNo = batchArg !== -1 ? Number(argv[batchArg + 1]) : null;

const files = collectFiles();

if (verify) {
  let remaining = 0;
  const offenders = [];
  for (const rel of files) {
    const { total } = analyze(rel);
    if (total > 0) {
      remaining += total;
      offenders.push(`${String(total).padStart(4)}  ${rel}`);
    }
  }
  console.log(remaining === 0 ? "PASS — 0 Stage A legacy utilities remain." : `FAIL — ${remaining} remain:`);
  offenders.forEach((o) => console.log("  " + o));
  process.exit(remaining === 0 ? 0 : 1);
}

// Files already claimed by an earlier batch never fall into a later one.
const claimed = new Set();
const batchFiles = new Map();
for (const b of BATCHES) {
  const list = files.filter((f) => !claimed.has(f) && b.match(f));
  list.forEach((f) => claimed.add(f));
  batchFiles.set(b.n, list);
}
const unclaimed = files.filter((f) => !claimed.has(f));

const targets = all ? BATCHES : BATCHES.filter((b) => b.n === batchNo);
if (targets.length === 0) {
  console.error("Pass --batch <1-8>, --all, --files, or --verify.");
  process.exit(1);
}

// `--files` prints the batch's file list so it can be staged independently.
if (listFiles) {
  for (const b of targets) batchFiles.get(b.n).forEach((f) => console.log(f));
  process.exit(0);
}

let grandTotal = 0;
let grandFiles = 0;
const allRisks = [];
let commentTotal = 0;

for (const b of targets) {
  const list = batchFiles.get(b.n).map(analyze).filter((r) => r.total > 0);
  const subtotal = list.reduce((a, r) => a + r.total, 0);
  if (list.length === 0) {
    console.log(`\nBatch ${b.n} — ${b.name}: nothing to do.`);
    continue;
  }
  console.log(`\nBatch ${b.n} — ${b.name}  (${list.length} files, ${subtotal} swaps)`);
  for (const r of list) {
    console.log(`  ${String(r.total).padStart(4)}  ${r.rel}`);
    if (apply && r.changed) fs.writeFileSync(path.join(ROOT, r.rel), r.next, "utf8");
    commentTotal += r.inComment;
    r.dynamicRisks.forEach((d) => allRisks.push({ rel: r.rel, ...d }));
  }
  grandTotal += subtotal;
  grandFiles += list.length;
}

console.log(`\n${apply ? "APPLIED" : "DRY RUN"} — ${grandTotal} swaps across ${grandFiles} files.`);
if (commentTotal) console.log(`  ${commentTotal} of those occurrences are inside comments (JSDoc examples).`);
if (allRisks.length) {
  console.log(`\n  ${allRisks.length} line(s) also contain dynamic class construction — review by hand:`);
  allRisks.forEach((d) => console.log(`    ${d.rel}:${d.line}  ${d.text}`));
}
if (unclaimed.length && all) {
  console.log(`\n  ${unclaimed.length} scanned file(s) belong to no batch:`);
  unclaimed.forEach((f) => console.log("    " + f));
}
if (!apply) console.log("\nRe-run with --apply to write.");
