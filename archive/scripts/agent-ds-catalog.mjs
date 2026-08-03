#!/usr/bin/env node
/**
 * Agent-Design-Standards — Source Catalog builder.
 *
 * Purpose: build a DURABLE, provenance-tracked catalog of every DESIGN.md-style
 * source we study, across multiple upstream repos. Repos come and go; this
 * catalog records exactly which file we read, from which repo, at which commit,
 * on which date, and how authentic it is — so the analysis is reproducible and
 * auditable regardless of which repo is popular this quarter.
 *
 * Sources (edit SOURCES to add/replace repos over time):
 *   - voltagent/awesome-design-md  (getdesign.md "site analysis" packs)
 *   - nexu-io/open-design          (bundled/reprocessed packs + generated stubs)
 *
 * Usage:  node scripts/agent-ds-catalog.mjs
 * Output: research/agent-design-standards/data/{catalog.json,catalog.tsv}
 */
import fs from "node:fs"
import path from "node:path"
import { execSync } from "node:child_process"

const ROOT = path.resolve(import.meta.dirname, "..")
const OUT_DIR = path.join(ROOT, "research/agent-design-standards/data")
const HOME = process.env.HOME || ""

const SOURCES = [
  {
    id: "voltagent",
    label: "voltagent/awesome-design-md",
    url: "https://github.com/voltagent/awesome-design-md",
    repoDir: path.join(HOME, "awesome-design-md"),
    systemsDir: path.join(HOME, "awesome-design-md", "design-md"),
    kind: "site-analysis", // getdesign.md analyses of real rendered sites
  },
  {
    id: "open-design",
    label: "nexu-io/open-design",
    url: "https://github.com/nexu-io/open-design",
    repoDir: path.join(HOME, "open-design"),
    systemsDir: path.join(HOME, "open-design", "design-systems"),
    kind: "bundle", // reprocessed "inspired-by" packs + generated stubs
  },
]

// ---- helpers ---------------------------------------------------------------

function gitInfo(repoDir) {
  try {
    const sha = execSync("git rev-parse HEAD", { cwd: repoDir }).toString().trim()
    const date = execSync("git log -1 --format=%ci", { cwd: repoDir }).toString().trim()
    return { sha, commit_date: date }
  } catch {
    return { sha: null, commit_date: null }
  }
}

/** Canonical join key so linear.app / linear-app / Linear all collapse. */
function normKey(slug) {
  return slug
    .toLowerCase()
    .replace(/[-_.](app|ai|com|io|dev)$/i, "") // drop trailing tld-ish suffix
    .replace(/[-_.\s]/g, "") // remove remaining separators
}

/** Pretty display name from a slug. */
function displayName(slug) {
  return slug
    .replace(/[-_.]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim()
}

function parseFrontMatter(md) {
  if (!md.startsWith("---\n")) return null
  const end = md.indexOf("\n---", 4)
  if (end === -1) return null
  const block = md.slice(4, end)
  const keys = [...block.matchAll(/^([a-zA-Z_][\w-]*):/gm)].map((m) => m[1])
  const name = (block.match(/^name:\s*(.+)$/m) || [])[1]?.trim() || null
  return { keys, name, raw: block }
}

function extractH2s(md) {
  return [...md.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1].trim())
}

/** Authenticity tier — how close is this file to a brand's real design system? */
function classifyTier(md, fm, sourceKind) {
  const isStub =
    /Token from style foundations/i.test(md) &&
    /Keep outputs recognizable to this style family/i.test(md)
  if (isStub) return "stub" // generated filler, lowest value
  if (sourceKind === "site-analysis" || fm) return "site-analysis" // read from real site
  if (/^#\s+Design System Inspired by/im.test(md)) return "inspired-by" // reconstruction
  return "other"
}

function pct(n, d) {
  return d ? Math.round((n / d) * 100) : 0
}

function tsvCell(v) {
  const s = Array.isArray(v) ? v.join("; ") : String(v ?? "")
  return /[\t\n"]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

// ---- voltagent README category + descriptor map ---------------------------

function parseVoltagentCategories(repoDir) {
  const readme = path.join(repoDir, "README.md")
  if (!fs.existsSync(readme)) return {}
  const txt = fs.readFileSync(readme, "utf8")
  const collection = txt.slice(
    txt.indexOf("## Collection"),
    txt.indexOf("## What", txt.indexOf("## Collection") + 10)
  )
  const map = {}
  let cat = null
  for (const line of collection.split("\n")) {
    const h = line.match(/^###\s+(.+)$/)
    if (h) {
      cat = h[1].trim()
      continue
    }
    const item = line.match(/^\-\s+\[\*\*(.+?)\*\*\]\((.+?)\)\s*-\s*(.+)$/)
    if (item && cat) {
      const url = item[2]
      const slugMatch = url.match(/getdesign\.md\/([^/]+)\//)
      const slug = slugMatch ? slugMatch[1] : item[1].toLowerCase()
      map[normKey(slug)] = { category: cat, descriptor: item[3].trim(), display: item[1].trim() }
    }
  }
  return map
}

// ---- scan ------------------------------------------------------------------

const catByKey = parseVoltagentCategories(SOURCES[0].repoDir)
const provenance = {}
const systems = {} // normKey -> { key, display, category, descriptor, sources: [] }

for (const src of SOURCES) {
  provenance[src.id] = { ...gitInfo(src.repoDir), url: src.url, label: src.label, kind: src.kind }
  if (!fs.existsSync(src.systemsDir)) {
    console.warn(`skip: ${src.systemsDir} not found`)
    continue
  }
  for (const entry of fs.readdirSync(src.systemsDir)) {
    if (entry.startsWith("_") || entry.startsWith(".")) continue
    const designPath = path.join(src.systemsDir, entry, "DESIGN.md")
    if (!fs.existsSync(designPath)) continue
    const md = fs.readFileSync(designPath, "utf8")
    const fm = parseFrontMatter(md)
    const key = normKey(entry)
    const h2s = extractH2s(md)

    const rec = {
      source_id: src.id,
      slug: entry,
      rel_path: path.relative(HOME, designPath),
      lines: md.split("\n").length,
      tier: classifyTier(md, fm, src.kind),
      has_front_matter: !!fm,
      front_matter_keys: fm ? fm.keys : [],
      h2_count: h2s.length,
      numbered_sections: (md.match(/^##\s+\d+\./gm) || []).length,
      table_rows: (md.match(/^\s*\|/gm) || []).length,
      code_blocks: Math.floor((md.match(/^```/gm) || []).length / 2),
      hex_count: (md.match(/#[0-9a-fA-F]{3,8}\b/g) || []).length,
      never_count: (md.match(/\bnever\b/gi) || []).length,
      always_count: (md.match(/\balways\b/gi) || []).length,
      non_negotiable_count: (md.match(/non-negotiable/gi) || []).length,
      has_readme: fs.existsSync(path.join(src.systemsDir, entry, "README.md")),
      has_tokens_css: fs.existsSync(path.join(src.systemsDir, entry, "tokens.css")),
      has_manifest: fs.existsSync(path.join(src.systemsDir, entry, "manifest.json")),
      h2_headings: h2s,
    }

    if (!systems[key]) {
      const meta = catByKey[key] || {}
      systems[key] = {
        key,
        display: meta.display || displayName(entry),
        category: meta.category || null,
        descriptor: meta.descriptor || null,
        sources: [],
      }
    }
    systems[key].sources.push(rec)
  }
}

// pick "best" record per system (prefer site-analysis > inspired-by > other > stub, then longest)
const TIER_RANK = { "site-analysis": 3, "inspired-by": 2, other: 1, stub: 0 }
for (const s of Object.values(systems)) {
  s.sources.sort(
    (a, b) => TIER_RANK[b.tier] - TIER_RANK[a.tier] || b.lines - a.lines
  )
  s.best = s.sources[0]
  s.in_sources = s.sources.map((r) => r.source_id)
  s.best_tier = s.best.tier
}

const all = Object.values(systems).sort((a, b) => a.key.localeCompare(b.key))

// ---- summary ---------------------------------------------------------------

const tierCounts = {}
const catCounts = {}
for (const s of all) {
  tierCounts[s.best_tier] = (tierCounts[s.best_tier] || 0) + 1
  const c = s.category || "Uncategorized"
  catCounts[c] = (catCounts[c] || 0) + 1
}

const summary = {
  generated_at: new Date().toISOString(),
  provenance,
  system_count: all.length,
  in_both_sources: all.filter((s) => s.in_sources.length > 1).length,
  voltagent_only: all.filter((s) => s.in_sources.length === 1 && s.in_sources[0] === "voltagent").length,
  open_design_only: all.filter((s) => s.in_sources.length === 1 && s.in_sources[0] === "open-design").length,
  tier_counts: tierCounts,
  category_counts: Object.fromEntries(Object.entries(catCounts).sort((a, b) => b[1] - a[1])),
}

// ---- write -----------------------------------------------------------------

fs.mkdirSync(OUT_DIR, { recursive: true })

const flat = all.map((s) => ({
  key: s.key,
  display: s.display,
  category: s.category || "",
  descriptor: s.descriptor || "",
  best_tier: s.best_tier,
  in_sources: s.in_sources,
  best_source: s.best.source_id,
  best_path: s.best.rel_path,
  lines: s.best.lines,
  has_front_matter: s.best.has_front_matter,
  front_matter_keys: s.best.front_matter_keys,
  h2_count: s.best.h2_count,
  table_rows: s.best.table_rows,
  code_blocks: s.best.code_blocks,
  hex_count: s.best.hex_count,
  never_count: s.best.never_count,
  always_count: s.best.always_count,
  non_negotiable_count: s.best.non_negotiable_count,
}))

fs.writeFileSync(
  path.join(OUT_DIR, "catalog.json"),
  JSON.stringify({ summary, systems: all }, null, 2)
)

const cols = Object.keys(flat[0])
const tsv = [cols.join("\t"), ...flat.map((r) => cols.map((c) => tsvCell(r[c])).join("\t"))].join("\n")
fs.writeFileSync(path.join(OUT_DIR, "catalog.tsv"), tsv)

console.log(`Catalog: ${all.length} unique systems`)
console.log(`  in both: ${summary.in_both_sources} | voltagent-only: ${summary.voltagent_only} | open-design-only: ${summary.open_design_only}`)
console.log(`  tiers:`, tierCounts)
console.log(`  wrote data/catalog.json, data/catalog.tsv`)
