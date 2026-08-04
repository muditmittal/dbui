#!/usr/bin/env node
/**
 * Stage C, part 2: delete the legacy shadcn-flat token layer.
 *
 * Removes the legacy `--color-*` @theme mappings and their `:root` / `.dark`
 * value declarations. Deliberately keeps everything that is not part of the
 * legacy color system: the brand/asset layer, the radius and font scales that
 * still power Tailwind utilities, and --shadow-focus, which Stage B already
 * repointed at the new focus ring.
 *
 * Usage:
 *   node scripts/migrations/stage-c-prune.mjs           # dry run
 *   node scripts/migrations/stage-c-prune.mjs --apply
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const TARGETS = [
  "packages/dbui/src/tokens/globals.css",
  "apps/portal/src/app/globals.css",
];

/** Legacy color tokens to remove, in both @theme and value blocks. */
const REMOVE = [
  "background", "foreground", "card", "card-foreground", "popover", "popover-foreground",
  "primary", "primary-foreground", "primary-hover", "primary-press",
  "secondary", "secondary-foreground", "muted", "muted-foreground",
  "accent", "accent-foreground",
  "destructive", "destructive-foreground", "destructive-hover", "destructive-press",
  "warning", "warning-foreground", "success", "success-foreground",
  "border", "input", "ring", "border-accessible",
  "chart-1", "chart-2", "chart-3", "chart-4", "chart-5",
  "hover", "press", "active", "disabled", "disabled-foreground",
  "overlay", "code-background", "skeleton",
  "surface-info", "surface-success", "surface-warning", "surface-danger",
  "sidebar", "sidebar-foreground", "sidebar-primary", "sidebar-primary-foreground",
  "sidebar-accent", "sidebar-accent-foreground", "sidebar-border", "sidebar-ring",
];

/**
 * Never removed. The brand layer is its own thing, the radius and font scales
 * still generate Tailwind utilities that tokens.css does not yet provide, and
 * --shadow-focus now resolves through --db-* already.
 */
const KEEP = new Set([
  "icon-folder",
  "ai-gradient", "ai-gradient-start", "ai-gradient-mid", "ai-gradient-end",
  "ai-gradient-hover", "ai-gradient-press",
  "shadow-focus",
  "font-sans", "font-display", "font-mono",
  "radius-sm", "radius-md", "radius-lg", "radius-xl", "radius-2xl", "radius-3xl",
]);

const apply = process.argv.includes("--apply");
const removeSet = new Set(REMOVE.filter((n) => !KEEP.has(n)));

for (const rel of TARGETS) {
  const abs = path.join(ROOT, rel);
  const lines = fs.readFileSync(abs, "utf8").split("\n");
  const kept = [];
  const dropped = [];

  for (const line of lines) {
    // `--color-<name>: …;`  (the @theme mapping)
    const themeMatch = line.match(/^\s*--color-([a-z0-9-]+)\s*:/);
    // `--<name>: …;`        (a :root or .dark value)
    const valueMatch = line.match(/^\s*--([a-z0-9-]+)\s*:/);

    let drop = false;
    if (themeMatch && removeSet.has(themeMatch[1]) && !KEEP.has(themeMatch[1])) drop = true;
    else if (valueMatch && !themeMatch && removeSet.has(valueMatch[1]) && !KEEP.has(valueMatch[1])) drop = true;

    if (drop) dropped.push(line.trim());
    else kept.push(line);
  }

  // Collapse comment headers and blank runs left behind by the removals.
  const cleaned = [];
  for (let i = 0; i < kept.length; i++) {
    const line = kept[i];
    const isComment = /^\s*\/\*.*\*\/\s*$/.test(line);
    const nextMeaningful = kept.slice(i + 1).find((l) => l.trim() !== "");
    // Drop a section comment whose entire section was removed.
    if (isComment && nextMeaningful && /^\s*[}]/.test(nextMeaningful)) continue;
    if (line.trim() === "" && cleaned.length && cleaned[cleaned.length - 1].trim() === "") continue;
    cleaned.push(line);
  }

  console.log(`\n${rel}`);
  console.log(`  ${dropped.length} declaration(s) removed, ${lines.length} -> ${cleaned.length} lines`);
  if (apply) fs.writeFileSync(abs, cleaned.join("\n"), "utf8");
}

if (!apply) console.log("\nRe-run with --apply to write.");
