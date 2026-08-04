import fs from "node:fs";
import path from "node:path";

const ROOT = "/Users/mudit.mittal/db-design-system";
const roots = [
  "packages/dbui/src",
  "packages/dbui-shells/src",
  "packages/dbui-genie/src",
  "packages/dbui-viz/src",
  "apps/portal/src/stories",
];

// Every legacy color token name declared in globals.css.
const LEGACY = [
  "background", "foreground", "card", "card-foreground", "popover", "popover-foreground",
  "primary", "primary-foreground", "primary-hover", "primary-press",
  "secondary", "secondary-foreground", "muted", "muted-foreground",
  "accent", "accent-foreground", "destructive", "destructive-foreground",
  "destructive-hover", "destructive-press", "warning", "warning-foreground",
  "success", "success-foreground", "border", "input", "ring", "border-accessible",
  "chart-1", "chart-2", "chart-3", "chart-4", "chart-5",
  "hover", "press", "active", "disabled", "disabled-foreground",
  "overlay", "code-background", "skeleton",
  "surface-info", "surface-success", "surface-warning", "surface-danger",
  "sidebar", "sidebar-foreground", "sidebar-primary", "sidebar-accent", "sidebar-border", "sidebar-ring",
];

// Every Tailwind utility prefix that can take a color.
const PREFIXES = [
  "bg", "text", "border", "ring", "outline", "fill", "stroke", "divide",
  "from", "via", "to", "shadow", "decoration", "placeholder", "caret", "accent",
  "border-t", "border-b", "border-l", "border-r", "border-x", "border-y",
];

const files = [];
const walk = (d) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) { if (e.name === "icons") continue; walk(p); }
    else if (/\.(tsx|ts)$/.test(e.name)) files.push(p);
  }
};
for (const r of roots) { const a = path.join(ROOT, r); if (fs.existsSync(a)) walk(a); }

const hits = {};
for (const f of files) {
  const src = fs.readFileSync(f, "utf8");
  for (const pre of PREFIXES) {
    for (const tok of LEGACY) {
      const cls = `${pre}-${tok}`;
      const re = new RegExp(`(?<![a-zA-Z0-9-])${cls}(?![a-zA-Z0-9-])`, "g");
      const m = src.match(re);
      if (m) {
        hits[cls] = hits[cls] || { n: 0, files: new Set() };
        hits[cls].n += m.length;
        hits[cls].files.add(path.relative(ROOT, f));
      }
    }
  }
}

const { STAGE_B_DEFERRED } = await import("./stage-b-deferred.mjs");
const deferred = new Set(STAGE_B_DEFERRED);

const entries = Object.entries(hits).sort((a, b) => b[1].n - a[1].n);
const missed = entries.filter(([cls]) => !deferred.has(cls));
const planned = entries.filter(([cls]) => deferred.has(cls));
const sum = (list) => list.reduce((a, [, v]) => a + v.n, 0);

if (entries.length === 0) {
  console.log("CLEAN — no legacy color utility of any prefix remains.");
} else {
  console.log(`${sum(entries)} legacy occurrence(s) across ${entries.length} utility name(s).\n`);
  console.log(`  Deferred to Stage B (expected): ${sum(planned)} across ${planned.length} names`);
  console.log(`  Unclassified (a gap):           ${sum(missed)} across ${missed.length} names\n`);
  if (missed.length) {
    console.log("UNCLASSIFIED — in neither the Stage A map nor the Stage B list:\n");
    for (const [cls, v] of missed) {
      console.log(`  ${String(v.n).padStart(4)}  ${cls.padEnd(28)} in ${v.files.size} file(s)`);
      [...v.files].slice(0, 4).forEach((f) => console.log(`        ${f}`));
    }
  } else {
    console.log("PASS — every remaining legacy utility is a deliberate Stage B deferral.");
  }
}

process.exit(missed.length === 0 ? 0 : 1);
