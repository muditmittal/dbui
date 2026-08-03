#!/usr/bin/env node
/**
 * Stage C, part 1: convert the remaining `var(--legacy)` references in component
 * source to their `--db-*` semantic equivalents.
 *
 * Stages A and B rewrote Tailwind utilities. A handful of components reach for
 * the CSS custom property directly instead — inline styles, and the sonner theme
 * object which takes CSS variables as strings. Those are invisible to the
 * utility audit and would silently resolve to nothing once the legacy layer is
 * deleted, so they have to move first.
 *
 * Usage:
 *   node scripts/migrations/stage-c-vars.mjs           # dry run
 *   node scripts/migrations/stage-c-vars.mjs --apply
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const MAP = {
  background: "db-surface-base",
  foreground: "db-text-base",
  card: "db-surface-base",
  popover: "db-surface-base",
  muted: "db-surface-subtle",
  "muted-foreground": "db-text-subtle",
  secondary: "db-surface-subtle",
  accent: "db-surface-accent",
  "accent-foreground": "db-text-accent",
  border: "db-border-base",
  destructive: "db-action-negative-base",
  success: "db-action-positive-base",
  warning: "db-status-text-warning",
  overlay: "db-utility-scrim",
  skeleton: "db-utility-surface-skeleton",
  "code-background": "db-surface-inset",
  "surface-info": "db-status-surface-info",
  "surface-success": "db-status-surface-positive",
  "surface-warning": "db-status-surface-warning",
  "surface-danger": "db-status-surface-negative",
  disabled: "db-surface-disabled",
  "disabled-foreground": "db-text-disabled",
};

const SCAN_ROOTS = [
  "packages/dbui/src",
  "packages/dbui-shells/src",
  "packages/dbui-genie/src",
  "packages/dbui-viz/src",
  "apps/portal/src",
];

// The token definitions themselves are handled by part 2, not here.
const SKIP = /tokens\/(globals|tokens|viz)\.css$|app\/globals\.css$/;

const files = [];
const walk = (d) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) { if (e.name === "icons") continue; walk(p); }
    else if (/\.(tsx|ts|css)$/.test(e.name)) files.push(path.relative(ROOT, p));
  }
};
for (const r of SCAN_ROOTS) { const a = path.join(ROOT, r); if (fs.existsSync(a)) walk(a); }

const apply = process.argv.includes("--apply");
const decisions = {};
let changed = 0;
let touched = 0;

for (const rel of files) {
  if (SKIP.test(rel)) continue;
  const abs = path.join(ROOT, rel);
  const src = fs.readFileSync(abs, "utf8");
  let next = src;

  for (const [from, to] of Object.entries(MAP)) {
    // Only inside var(...) — a bare --foo elsewhere is a declaration, not a use.
    const re = new RegExp(`var\\(--${from}(?=[,)])`, "g");
    next = next.replace(re, () => {
      const key = `var(--${from})  ->  var(--${to})`;
      decisions[key] = (decisions[key] || 0) + 1;
      changed += 1;
      return `var(--${to}`;
    });
  }

  if (next !== src) {
    touched += 1;
    if (apply) fs.writeFileSync(abs, next, "utf8");
  }
}

console.log(`${apply ? "APPLIED" : "DRY RUN"} — ${changed} references across ${touched} files.\n`);
for (const [k, n] of Object.entries(decisions).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(n).padStart(3)}  ${k}`);
}
if (!apply) console.log("\nRe-run with --apply to write.");
