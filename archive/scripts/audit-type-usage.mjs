#!/usr/bin/env node
/**
 * One-off audit: typography-related Tailwind usage in dbui, dbui-shells, portal.
 * Run: node scripts/audit-type-usage.mjs
 */
import fs from "node:fs"
import path from "node:path"

const ROOT = path.resolve(import.meta.dirname, "..")
const roots = [
  path.join(ROOT, "packages/dbui/src"),
  path.join(ROOT, "packages/dbui-shells/src"),
  path.join(ROOT, "apps/portal/src"),
]

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc
  for (const e of fs.readdirSync(dir)) {
    if (e === "node_modules" || e === ".next") continue
    const p = path.join(dir, e)
    const st = fs.statSync(p)
    if (st.isDirectory()) walk(p, acc)
    else if (/\.(tsx|jsx|css)$/.test(p)) acc.push(p)
  }
  return acc
}

const files = roots.flatMap((r) => walk(r))

/** @type {Record<string, string>} */
const fileRoot = Object.fromEntries(
  files.map((f) => {
    if (f.includes(`${path.sep}packages${path.sep}dbui-shells${path.sep}`)) return [f, "dbui-shells"]
    if (f.includes(`${path.sep}packages${path.sep}dbui${path.sep}`)) return [f, "dbui"]
    if (f.includes(`${path.sep}apps${path.sep}portal${path.sep}`)) return [f, "portal"]
    return [f, "other"]
  })
)

const textColorPatterns = [
  "text-foreground",
  "text-muted-foreground",
  "text-primary",
  "text-primary-foreground",
  "text-secondary-foreground",
  "text-destructive",
  "text-destructive-foreground",
  "text-warning",
  "text-warning-foreground",
  "text-success",
  "text-success-foreground",
  "text-accent-foreground",
  "text-card-foreground",
  "text-popover-foreground",
  "text-sidebar-foreground",
  "text-disabled-foreground",
  "text-border",
  "text-input",
  "text-ring",
]

const fontPatterns = ["font-semibold", "font-normal", "font-medium", "font-mono", "font-display"]

/** Tailwind preset size aliases (often overridden in theme) */
const textSizeAliasPatterns = ["text-xs", "text-sm", "text-base", "text-lg", "text-xl", "text-2xl", "text-3xl"]

const counts = Object.fromEntries(textColorPatterns.map((t) => [t, 0]))
const countsByPkg = { dbui: structuredClone(counts), "dbui-shells": structuredClone(counts), portal: structuredClone(counts) }
const sizeCounts = {}
const leadingCounts = {}
const fontCounts = Object.fromEntries(fontPatterns.map((f) => [f, 0]))
const textSizeAliasCounts = Object.fromEntries(textSizeAliasPatterns.map((t) => [t, 0]))
/** var(--token) where token is a known semantic name from globals */
const cssVarRefCounts = {}

// placeholder: text-* (shadcn)
const placeholderCounts = { "placeholder:text-muted-foreground": 0 }

for (const f of files) {
  const s = fs.readFileSync(f, "utf8")
  const pkg = fileRoot[f]
  const pkgCounts = pkg === "dbui" || pkg === "dbui-shells" || pkg === "portal" ? countsByPkg[pkg] : null
  for (const t of textColorPatterns) {
    const re = new RegExp(`\\b${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "g")
    const m = s.match(re)
    if (m) {
      counts[t] += m.length
      if (pkgCounts) pkgCounts[t] += m.length
    }
  }
  const ph = s.match(/\bplaceholder:text-muted-foreground\b/g)
  if (ph) placeholderCounts["placeholder:text-muted-foreground"] += ph.length

  for (const m of s.matchAll(/text-\[(\d+)px\]/g)) {
    sizeCounts[m[1]] = (sizeCounts[m[1]] || 0) + 1
  }
  for (const m of s.matchAll(/leading-\[(\d+)px\]/g)) {
    leadingCounts[m[1]] = (leadingCounts[m[1]] || 0) + 1
  }
  for (const fp of fontPatterns) {
    const re = new RegExp(`\\b${fp}\\b`, "g")
    const m = s.match(re)
    if (m) fontCounts[fp] += m.length
  }
  for (const tp of textSizeAliasPatterns) {
    const re = new RegExp(`\\b${tp.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "g")
    const m = s.match(re)
    if (m) textSizeAliasCounts[tp] += m.length
  }
  for (const m of s.matchAll(/var\(\s*--([a-z0-9-]+)\s*\)/gi)) {
    const name = m[1]
    cssVarRefCounts[name] = (cssVarRefCounts[name] || 0) + 1
  }
}

function sortObj(o) {
  return Object.entries(o).sort((a, b) => b[1] - a[1])
}

console.log("=== TEXT COLOR UTILITIES (class frequency, all scanned roots) ===")
for (const [k, v] of sortObj(counts)) console.log(`${v}\t${k}`)

console.log("\n=== TEXT COLOR by package (dbui / dbui-shells / portal) ===")
for (const pkg of ["dbui", "dbui-shells", "portal"]) {
  console.log(`\n-- ${pkg} --`)
  for (const [k, v] of sortObj(countsByPkg[pkg]).filter(([, n]) => n > 0)) console.log(`${v}\t${k}`)
}

console.log("\n=== placeholder:text-muted-foreground ===")
console.log(placeholderCounts["placeholder:text-muted-foreground"])

console.log("\n=== text-[Npx] frequency ===")
for (const [k, v] of sortObj(sizeCounts)) console.log(`${v}\t${k}px`)

console.log("\n=== leading-[Npx] frequency ===")
for (const [k, v] of sortObj(leadingCounts)) console.log(`${v}\t${k}px`)

console.log("\n=== font-* utility frequency ===")
for (const [k, v] of sortObj(fontCounts)) console.log(`${v}\t${k}`)

console.log("\n=== text-xs | text-sm | … (Tailwind size aliases) ===")
for (const [k, v] of sortObj(textSizeAliasCounts).filter(([, n]) => n > 0)) console.log(`${v}\t${k}`)

console.log("\nFiles scanned:", files.length)

// CSS variables in globals that map to text (semantic)
const globalsPath = path.join(ROOT, "packages/dbui/src/tokens/globals.css")
const g = fs.readFileSync(globalsPath, "utf8")
const rootVars = [...g.matchAll(/--([a-z0-9-]+):/gi)].map((m) => m[1])
const uniqueVars = [...new Set(rootVars)].sort()
console.log("\n=== :root / .dark custom properties (names only, from globals.css) ===")
console.log("Count:", uniqueVars.length)
console.log(uniqueVars.join(", "))

const varRefsSorted = sortObj(cssVarRefCounts)
console.log("\n=== var(--*) references in scanned TSX/CSS (frequency) ===")
for (const [k, v] of varRefsSorted) console.log(`${v}\t--${k}`)

const definedNotReferenced = uniqueVars.filter((n) => !cssVarRefCounts[n])
console.log("\n=== globals.css names never referenced as var(--name) in scanned files ===")
console.log("(Most layout/color uses Tailwind shorthands; this only counts explicit var().)")
console.log("Count:", definedNotReferenced.length)
console.log(definedNotReferenced.join(", "))
