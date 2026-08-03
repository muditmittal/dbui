#!/usr/bin/env node
/**
 * DESIGN.md corpus study — inventories Open Design / getdesign packages.
 *
 * Usage:
 *   node scripts/design-md-corpus-study.mjs
 *   CORPUS_ROOT=/path/to/open-design/design-systems node scripts/design-md-corpus-study.mjs
 *
 * Outputs to research/design-md-corpus/data/
 */
import fs from "node:fs"
import path from "node:path"

const ROOT = path.resolve(import.meta.dirname, "..")
const CORPUS_ROOT =
  process.env.CORPUS_ROOT ||
  path.resolve(process.env.HOME || "", "open-design/design-systems")
const OUT_DIR = path.join(ROOT, "research/design-md-corpus/data")

const DEV_FRIENDLY_CATEGORIES = new Set([
  "AI & LLM",
  "Developer Tools",
  "Productivity & SaaS",
  "Backend & Data",
  "Design & Creative",
])

const SECTION_PATTERNS = [
  { key: "visual_theme", re: /visual theme|atmosphere|overview/i },
  { key: "color", re: /color palette|colors?\b/i },
  { key: "typography", re: /typography/i },
  { key: "components", re: /component/i },
  { key: "layout", re: /layout/i },
  { key: "depth", re: /depth|elevation|shadow/i },
  { key: "donts", re: /do.?s and don/i },
  { key: "responsive", re: /responsive/i },
  { key: "agent_guide", re: /agent prompt guide/i },
  { key: "motion", re: /motion|animation/i },
  { key: "voice", re: /voice|tone/i },
  { key: "accessibility", re: /accessibility|a11y/i },
  { key: "iconography", re: /iconograph/i },
  { key: "data_viz", re: /data visual/i },
]

function readJson(p) {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"))
  } catch {
    return null
  }
}

function walkDesignMd(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc
  for (const e of fs.readdirSync(dir)) {
    if (e.startsWith("_") || e === "node_modules") continue
    const p = path.join(dir, e)
    const st = fs.statSync(p)
    if (st.isDirectory()) {
      const design = path.join(p, "DESIGN.md")
      if (fs.existsSync(design)) acc.push({ slug: e, designPath: design, dir: p })
      else walkDesignMd(p, acc)
    }
  }
  return acc
}

function extractCategory(slug, dir, md) {
  const manifest = readJson(path.join(dir, "manifest.json"))
  if (manifest?.category) return manifest.category
  const m = md.match(/^>\s*Category:\s*(.+)$/m)
  return m ? m[1].trim() : "Uncategorized"
}

function hasSection(md, re) {
  return re.test(md)
}

function extractH2s(md) {
  return [...md.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1].trim())
}

function pct(n, d) {
  return d ? Math.round((n / d) * 100) : 0
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true })
}

function tsvEscape(v) {
  const s = String(v ?? "")
  return s.includes("\t") || s.includes("\n") || s.includes('"')
    ? `"${s.replace(/"/g, '""')}"`
    : s
}

const packages = walkDesignMd(CORPUS_ROOT)
if (!packages.length) {
  console.error(`No DESIGN.md files found under ${CORPUS_ROOT}`)
  process.exit(1)
}

ensureDir(OUT_DIR)

const rows = []
const sectionTotals = Object.fromEntries(SECTION_PATTERNS.map((s) => [s.key, 0]))
const byCategory = {}

for (const pkg of packages) {
  const md = fs.readFileSync(pkg.designPath, "utf8")
  const lines = md.split("\n").length
  const category = extractCategory(pkg.slug, pkg.dir, md)
  const h1 = (md.match(/^#\s+(.+)$/m) || [])[1]?.trim() || ""
  const h2s = extractH2s(md)
  const numberedSections = (md.match(/^##\s+\d+\./gm) || []).length
  const tableRows = (md.match(/^\|/gm) || []).length
  const codeBlocks = Math.floor((md.match(/^```/gm) || []).length / 2)
  const hexCount = (md.match(/#[0-9a-fA-F]{3,8}\b/g) || []).length
  const oklchCount = (md.match(/oklch\(/gi) || []).length
  const neverCount = (md.match(/\bnever\b/gi) || []).length
  const alwaysCount = (md.match(/\balways\b/gi) || []).length
  const nonNegotiable = (md.match(/non-negotiable/gi) || []).length
  const hasYamlFrontMatter = md.startsWith("---\n")
  const hasManifest = fs.existsSync(path.join(pkg.dir, "manifest.json"))
  const hasTokensCss = fs.existsSync(path.join(pkg.dir, "tokens.css"))
  const hasUsageMd = fs.existsSync(path.join(pkg.dir, "USAGE.md"))
  const hasComponentsHtml = fs.existsSync(path.join(pkg.dir, "components.html"))
  const hasPreview = fs.existsSync(path.join(pkg.dir, "preview"))

  const sections = {}
  for (const sp of SECTION_PATTERNS) {
    const hit = hasSection(md, sp.re)
    sections[sp.key] = hit
    if (hit) sectionTotals[sp.key]++
  }

  const cohort = DEV_FRIENDLY_CATEGORIES.has(category) ? "dev-friendly" : "other"
  if (!byCategory[category]) byCategory[category] = { count: 0, slugs: [] }
  byCategory[category].count++
  byCategory[category].slugs.push(pkg.slug)

  rows.push({
    slug: pkg.slug,
    category,
    cohort,
    lines,
    h1,
    h2_count: h2s.length,
    numbered_sections: numberedSections,
    table_rows: tableRows,
    code_blocks: codeBlocks,
    hex_count: hexCount,
    oklch_count: oklchCount,
    never_count: neverCount,
    always_count: alwaysCount,
    non_negotiable_count: nonNegotiable,
    has_yaml_front_matter: hasYamlFrontMatter,
    has_manifest: hasManifest,
    has_tokens_css: hasTokensCss,
    has_usage_md: hasUsageMd,
    has_components_html: hasComponentsHtml,
    has_preview: hasPreview,
    ...sections,
    h2_headings: h2s.join(" | "),
  })
}

rows.sort((a, b) => a.slug.localeCompare(b.slug))

const n = rows.length
const devRows = rows.filter((r) => r.cohort === "dev-friendly")
const otherRows = rows.filter((r) => r.cohort === "other")

function cohortSectionRate(cohortRows, key) {
  const hits = cohortRows.filter((r) => r[key]).length
  return { hits, total: cohortRows.length, pct: pct(hits, cohortRows.length) }
}

const cohortComparison = {}
for (const sp of SECTION_PATTERNS) {
  cohortComparison[sp.key] = {
    dev_friendly: cohortSectionRate(devRows, sp.key),
    other: cohortSectionRate(otherRows, sp.key),
  }
}

const summary = {
  generated_at: new Date().toISOString(),
  corpus_root: CORPUS_ROOT,
  package_count: n,
  dev_friendly_count: devRows.length,
  other_count: otherRows.length,
  dev_friendly_categories: [...DEV_FRIENDLY_CATEGORIES],
  dev_friendly_slugs: devRows.map((r) => r.slug).sort(),
  median_lines: rows.map((r) => r.lines).sort((a, b) => a - b)[Math.floor(n / 2)],
  mean_lines: Math.round(rows.reduce((s, r) => s + r.lines, 0) / n),
  numbered_section_files: rows.filter((r) => r.numbered_sections >= 7).length,
  agent_guide_pct: pct(sectionTotals.agent_guide, n),
  section_coverage: Object.fromEntries(
    SECTION_PATTERNS.map((sp) => [
      sp.key,
      { hits: sectionTotals[sp.key], pct: pct(sectionTotals[sp.key], n) },
    ])
  ),
  package_enrichment: {
    manifest: rows.filter((r) => r.has_manifest).length,
    tokens_css: rows.filter((r) => r.has_tokens_css).length,
    usage_md: rows.filter((r) => r.has_usage_md).length,
    components_html: rows.filter((r) => r.has_components_html).length,
    preview: rows.filter((r) => r.has_preview).length,
    yaml_front_matter: rows.filter((r) => r.has_yaml_front_matter).length,
  },
  cohort_comparison: cohortComparison,
  categories: Object.fromEntries(
    Object.entries(byCategory)
      .sort((a, b) => b[1].count - a[1].count)
      .map(([cat, v]) => [cat, { count: v.count, slugs: v.slugs.sort() }])
  ),
}

// TSV
const cols = Object.keys(rows[0])
const tsv = [cols.join("\t"), ...rows.map((r) => cols.map((c) => tsvEscape(r[c])).join("\t"))].join("\n")

fs.writeFileSync(path.join(OUT_DIR, "inventory.tsv"), tsv)
fs.writeFileSync(path.join(OUT_DIR, "summary.json"), JSON.stringify(summary, null, 2))

// Markdown index for leadership appendix
const indexMd = `# DESIGN.md corpus index

Generated: ${summary.generated_at}
Corpus: \`${CORPUS_ROOT}\`
Packages: **${n}** (${devRows.length} dev-friendly · ${otherRows.length} other)

## Categories

| Category | Count | Cohort |
|----------|------:|--------|
${Object.entries(summary.categories)
  .map(([cat, v]) => `| ${cat} | ${v.count} | ${DEV_FRIENDLY_CATEGORIES.has(cat) ? "dev-friendly" : "other"} |`)
  .join("\n")}

## Section coverage (all packages)

| Section | Present | % |
|---------|--------:|--:|
${SECTION_PATTERNS.map((sp) => {
  const s = summary.section_coverage[sp.key]
  return `| ${sp.key} | ${s.hits} / ${n} | ${s.pct}% |`
}).join("\n")}

## Dev-friendly vs other — Agent Prompt Guide

| Cohort | Has §9-style agent guide | % |
|--------|-------------------------:|--:|
| Dev-friendly (n=${devRows.length}) | ${cohortComparison.agent_guide.dev_friendly.hits} | ${cohortComparison.agent_guide.dev_friendly.pct}% |
| Other (n=${otherRows.length}) | ${cohortComparison.agent_guide.other.hits} | ${cohortComparison.agent_guide.other.pct}% |

## Package enrichment (since Open Design 2.0)

| Artifact | Packages |
|----------|--------:|
| manifest.json | ${summary.package_enrichment.manifest} |
| tokens.css | ${summary.package_enrichment.tokens_css} |
| USAGE.md | ${summary.package_enrichment.usage_md} |
| components.html | ${summary.package_enrichment.components_html} |
| preview/ | ${summary.package_enrichment.preview} |
| YAML front matter in DESIGN.md | ${summary.package_enrichment.yaml_front_matter} |

## Full inventory

See \`inventory.tsv\` (${n} rows × ${cols.length} columns).
`

fs.writeFileSync(path.join(OUT_DIR, "index.md"), indexMd)

console.log(`Wrote ${n} packages to ${OUT_DIR}`)
console.log(`  inventory.tsv, summary.json, index.md`)
console.log(`Dev-friendly: ${devRows.length} | Agent guide: ${sectionTotals.agent_guide}/${n} (${summary.agent_guide_pct}%)`)
console.log(`Median lines: ${summary.median_lines} | Mean: ${summary.mean_lines}`)
