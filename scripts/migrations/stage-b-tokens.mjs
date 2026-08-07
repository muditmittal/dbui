#!/usr/bin/env node
/**
 * Stage B of the token migration: the neutral redesign.
 *
 * Unlike Stage A this cannot be a name-keyed map. Several legacy utilities carry
 * two unrelated meanings that are only distinguishable from their variant
 * prefix — `hover:border-primary` is a form-control hover border, while
 * `data-checked:border-primary` is a checked-control border. Rules therefore
 * match on the full class token, prefixes included, and the first match wins.
 *
 * Selection treatment: fully neutral (owner decision, 2026-08-02).
 *   fill   action-selected-base   rgba(0,0,0,0.06)
 *   border border-strong          #D4D4D4
 *   label  text-strong            #171717
 *
 * Usage:
 *   node scripts/migrations/stage-b-tokens.mjs            # dry run, shows every decision
 *   node scripts/migrations/stage-b-tokens.mjs --apply
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const SCAN_ROOTS = [
  "packages/dbui/src",
  "packages/dbui-shells/src",
  "packages/dbui-genie/src",
  "packages/dbui-viz/src",
  "apps/portal/src/stories",
];

/** Prefix predicates, tested against everything before the base class. */
const isFormHover = (p) => /(^|:)(hover|focus-within)(\/[a-z-]+)?:|group-hover(\/[a-z-]+)?:/.test(p);
const isPress = (p) => /(^|:)active:/.test(p);
const isChecked = (p) => /data-checked|data-indeterminate|has-data-checked|group-data-checked|aria-checked/.test(p);
const isPressed = (p) => /aria-pressed|data-active|state=on|data-selected/.test(p);
const isUnchecked = (p) => /data-unchecked|group-data-unchecked/.test(p);

/**
 * Rules keyed by base class. Each entry is an ordered list of
 * [predicate, target]; the first predicate that matches the prefix wins.
 * `null` predicate is the fallback.
 */
const RULES = {
  // ── Primary action family ────────────────────────────────────────────────
  "bg-primary": [
    [isChecked, "bg-action-primary-base"], // filled checkbox / radio / switch
    [null, "bg-action-primary-base"],
  ],
  "bg-primary-hover": [[null, "bg-action-primary-hover"]],
  "bg-primary-press": [[null, "bg-action-primary-press"]],
  "bg-primary-foreground": [[null, "bg-action-label-inverse-base"]],
  "text-primary-foreground": [[null, "text-action-label-inverse-base"]],
  // Blue text becomes a link role rather than a brand role — except where it is
  // labelling a selected control, which goes neutral with the rest of selection.
  "text-primary": [
    [isPressed, "text-text-strong"],
    [isChecked, "text-text-strong"],
    [null, "text-link-base"],
  ],
  "text-primary-hover": [
    [isPressed, "text-text-strong"],
    [isChecked, "text-text-strong"],
    [null, "text-link-hover"],
  ],
  "text-primary-press": [
    [isPressed, "text-text-strong"],
    [isChecked, "text-text-strong"],
    [null, "text-link-press"],
  ],

  // ── Borders that key off primary ─────────────────────────────────────────
  "border-primary": [
    [isFormHover, "border-input-border-hover"], // form control hover
    [isChecked, "border-action-primary-base"], // matches the checked fill
    [isPressed, "border-border-strong"], // selection: fully neutral
    [null, "border-border-strong"], // bare use is segment/toggle selection
  ],
  "border-primary-hover": [
    [isChecked, "border-action-primary-hover"], // hovering an already-checked control
    [isUnchecked, "border-input-border-hover"],
    [null, "border-input-border-hover"],
  ],
  "border-primary-press": [
    [isChecked, "border-action-primary-press"],
    [null, "border-focus-ring"],
  ],
  "outline-primary": [[null, "outline-focus-ring"]],
  // The active-tab underline is an indicator line, not a container edge. At 1px
  // a #D4D4D4 rule is effectively invisible, so it takes the strong neutral.
  "border-b-primary": [[null, "border-b-action-primary-base"]],

  // ── Focus ring ───────────────────────────────────────────────────────────
  "border-ring": [[null, "border-focus-ring"]],
  "ring-ring": [[null, "ring-focus-ring"]],

  // ── Interaction states ───────────────────────────────────────────────────
  "bg-hover": [[null, "bg-action-default-hover"]],
  "border-hover": [[null, "border-action-default-hover"]],
  "bg-press": [[null, "bg-action-selected-press"]],
  "bg-active": [[null, "bg-action-selected-base"]],

  // ── Form borders and fills ───────────────────────────────────────────────
  "border-input": [[null, "border-input-border-base"]],
  // `--input` is used as a fill in three distinct ways. Only the ButtonGroup
  // separator is a divider; the rest are dark-mode surfaces and switch tracks.
  "bg-input": [
    [isUnchecked, "bg-border-strong"], // switch track when off
    [(p) => /dark:/.test(p), "bg-surface-strong"], // dark-mode field fill
    [null, "bg-border-strong"], // ButtonGroup separator
  ],
  "text-input": [[null, "text-border-strong"]],

  // ── Status and chart ─────────────────────────────────────────────────────
  "bg-warning": [[null, "bg-status-text-warning"]], // #BE501E in both systems
  "bg-chart-1": [[null, "bg-viz-categorical-1"]],
  "bg-chart-2": [[null, "bg-viz-categorical-2"]],
  "bg-chart-3": [[null, "bg-viz-categorical-3"]],
  "bg-chart-4": [[null, "bg-viz-categorical-4"]],
  "bg-chart-5": [[null, "bg-viz-categorical-5"]],

  // ── Going fully neutral means the selected label loses blue too ──────────
  // These are already semantic tokens, so the legacy audit cannot see them.
  "text-text-accent": [
    [isPressed, "text-text-strong"],
    [isChecked, "text-text-strong"],
    [null, null], // leave non-selection uses alone
  ],
};

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

function resolve(base, prefix) {
  for (const [pred, target] of RULES[base]) {
    if (pred === null || pred(prefix)) return target;
  }
  return null;
}

const apply = process.argv.includes("--apply");
const files = collectFiles();
const decisions = {};
let changed = 0;
let touched = 0;

for (const rel of files) {
  const abs = path.join(ROOT, rel);
  const src = fs.readFileSync(abs, "utf8");
  let next = src;

  for (const base of Object.keys(RULES)) {
    // Capture the variant prefix chain immediately before the base class.
    const re = new RegExp(
      `((?:[a-zA-Z0-9_@[\\]().,%#/=-]+:)*)${base}(?![a-zA-Z0-9-])`,
      "g",
    );
    next = next.replace(re, (match, prefix, offset, whole) => {
      const before = whole[offset - 1];
      if (prefix === "" && before && /[a-zA-Z0-9-]/.test(before)) return match;
      const target = resolve(base, prefix);
      if (!target) return match;
      const key = `${prefix}${base}  ->  ${prefix}${target}`;
      decisions[key] = (decisions[key] || 0) + 1;
      changed += 1;
      return `${prefix}${target}`;
    });
  }

  if (next !== src) {
    touched += 1;
    if (apply) fs.writeFileSync(abs, next, "utf8");
  }
}

const rows = Object.entries(decisions).sort((a, b) => b[1] - a[1]);
console.log(`${apply ? "APPLIED" : "DRY RUN"} — ${changed} swaps across ${touched} files.\n`);
console.log("Every decision made:\n");
for (const [k, n] of rows) console.log(`  ${String(n).padStart(3)}  ${k}`);
if (!apply) console.log("\nRe-run with --apply to write.");
