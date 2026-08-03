#!/usr/bin/env node
/**
 * Category audit across DESIGN.md corpus — three cohorts + guideline mining.
 * Run: node scripts/design-md-category-audit.mjs
 */
import fs from "node:fs"
import path from "node:path"

const ROOT = path.resolve(import.meta.dirname, "..")
const CORPUS_ROOT =
  process.env.CORPUS_ROOT ||
  path.resolve(process.env.HOME || "", "open-design/design-systems")
const OUT_DIR = path.join(ROOT, "research/design-md-corpus/data")

/** Open Design metadata categories treated as dev/analyst persona */
const DEV_ANALYST_CATEGORIES = new Set([
  "AI & LLM",
  "Developer Tools",
  "Productivity & SaaS",
  "Backend & Data",
  "Design & Creative",
])

/** Curated agentic-first products (coding agents, AI builders, agent frameworks) */
const AGENTIC_FIRST_SLUGS = new Set([
  "agentic",
  "claude",
  "cohere",
  "cursor",
  "elevenlabs",
  "huggingface",
  "lovable",
  "minimax",
  "mission-control",
  "mistral-ai",
  "ollama",
  "openai",
  "opencode-ai",
  "perplexity",
  "replicate",
  "runwayml",
  "together-ai",
  "voltagent",
  "warp",
  "x-ai",
])

/** Canonical content-topic categories inside DESIGN.md files */
const TOPIC_CATEGORIES = [
  { id: "visual_theme", label: "Visual theme & atmosphere", re: /visual theme|atmosphere|^##\s+.*overview/i },
  { id: "color", label: "Color palette & roles", re: /color palette|^##\s+.*\bcolors?\b/i },
  { id: "typography", label: "Typography", re: /typography/i },
  { id: "components", label: "Component stylings", re: /component/i },
  { id: "layout", label: "Layout & spacing", re: /layout|spacing/i },
  { id: "depth", label: "Depth & elevation", re: /depth|elevation|shadow/i },
  { id: "motion", label: "Motion & interaction", re: /motion|animation|interaction/i },
  { id: "responsive", label: "Responsive behavior", re: /responsive/i },
  { id: "voice", label: "Voice & tone", re: /voice|tone|copy/i },
  { id: "donts", label: "Do's and don'ts", re: /do.?s and don|anti-?pattern|guardrail|usage guardrail/i },
  { id: "accessibility", label: "Accessibility", re: /accessibility|a11y|wcag/i },
  { id: "iconography", label: "Iconography", re: /iconograph/i },
  { id: "data_viz", label: "Data visualization", re: /data visual|chart/i },
  { id: "agent_guide", label: "Agent prompt guide", re: /agent prompt guide/i },
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
    if (e.startsWith("_")) continue
    const p = path.join(dir, e)
    if (!fs.statSync(p).isDirectory()) continue
    const design = path.join(p, "DESIGN.md")
    if (fs.existsSync(design)) acc.push({ slug: e, designPath: design, dir: p })
  }
  return acc
}

function extractMeta(pkg, md) {
  const manifest = readJson(path.join(pkg.dir, "manifest.json"))
  const category = manifest?.category || (md.match(/^>\s*Category:\s*(.+)$/m)?.[1]?.trim() ?? "Uncategorized")
  const tagline = manifest?.description || (md.match(/^>\s*(?!Category:)(.+)$/m)?.[1]?.trim() ?? "")
  return { category, tagline, name: manifest?.name || pkg.slug }
}

function extractSection(md, topicRe) {
  const h2s = [...md.matchAll(/^##\s+(.+)$/gm)]
  for (let i = 0; i < h2s.length; i++) {
    const title = h2s[i][1]
    if (!topicRe.test(title)) continue
    const start = h2s[i].index + h2s[i][0].length
    const end = i + 1 < h2s.length ? h2s[i + 1].index : md.length
    return { title, body: md.slice(start, end).trim() }
  }
  return null
}

function extractGuidelines(text) {
  if (!text) return []
  const lines = text.split("\n")
  const out = []
  for (const line of lines) {
    const t = line.trim()
    if (!t) continue
    let m
    if ((m = t.match(/^[-*]\s+\*\*(.+?)\*\*[:\s]*(.*)$/))) {
      out.push({ type: "bullet-bold", text: `${m[1]}${m[2] ? `: ${m[2]}` : ""}` })
    } else if ((m = t.match(/^[-*]\s+(.+)$/))) {
      if (m[1].length > 12 && !m[1].startsWith("|")) out.push({ type: "bullet", text: m[1] })
    } else if ((m = t.match(/^\d+\.\s+\*\*(.+?)\*\*[:\s]*(.*)$/))) {
      out.push({ type: "numbered-bold", text: `${m[1]}${m[2] ? `: ${m[2]}` : ""}` })
    } else if ((m = t.match(/^\d+\.\s+(.+)$/))) {
      if (m[1].length > 15) out.push({ type: "numbered", text: m[1] })
    } else if (/^(never|always|don't|do not)\b/i.test(t) && t.length > 20) {
      out.push({ type: "rule", text: t.replace(/^#+\s*/, "") })
    }
  }
  return out
}

function pct(n, d) {
  return d ? Math.round((n / d) * 100) : 0
}

function cohortStats(rows, topicId) {
  const hits = rows.filter((r) => r.topics[topicId]).length
  return { hits, total: rows.length, pct: pct(hits, rows.length) }
}

function matrixByMetaCategory(rows) {
  const map = {}
  for (const r of rows) {
    if (!map[r.meta_category]) map[r.meta_category] = { slugs: [], rows: [] }
    map[r.meta_category].slugs.push(r.slug)
    map[r.meta_category].rows.push(r)
  }
  const result = {}
  for (const [cat, { slugs, rows: catRows }] of Object.entries(map)) {
    result[cat] = {
      count: catRows.length,
      slugs: slugs.sort(),
      cohort: DEV_ANALYST_CATEGORIES.has(cat) ? "dev_analyst" : "other",
      agentic_count: catRows.filter((r) => r.cohorts.agentic_first).length,
      topics: Object.fromEntries(
        TOPIC_CATEGORIES.map((t) => [t.id, cohortStats(catRows, t.id)])
      ),
      avg_never: Math.round(catRows.reduce((s, r) => s + r.never_count, 0) / catRows.length),
      avg_always: Math.round(catRows.reduce((s, r) => s + r.always_count, 0) / catRows.length),
      avg_tables: Math.round(catRows.reduce((s, r) => s + r.table_rows, 0) / catRows.length),
    }
  }
  return result
}

function topGuidelines(rows, topicId, limit = 25) {
  const freq = new Map()
  for (const r of rows) {
    if (!r.topics[topicId]) continue
    for (const g of r.guidelines[topicId] || []) {
      const key = g.text.slice(0, 120)
      const prev = freq.get(key) || { text: g.text, count: 0, slugs: new Set() }
      prev.count++
      prev.slugs.add(r.slug)
      freq.set(key, prev)
    }
  }
  return [...freq.values()]
    .sort((a, b) => b.count - a.count || b.slugs.size - a.slugs.size)
    .slice(0, limit)
    .map((x) => ({ text: x.text, frequency: x.count, systems: [...x.slugs].sort().slice(0, 8) }))
}

const packages = walkDesignMd(CORPUS_ROOT)
fs.mkdirSync(OUT_DIR, { recursive: true })

const records = []

for (const pkg of packages) {
  const md = fs.readFileSync(pkg.designPath, "utf8")
  const meta = extractMeta(pkg, md)
  const topics = {}
  const guidelines = {}
  const sectionTitles = {}

  for (const t of TOPIC_CATEGORIES) {
    const sec = extractSection(md, t.re)
    topics[t.id] = Boolean(sec)
    sectionTitles[t.id] = sec?.title || null
    guidelines[t.id] = sec ? extractGuidelines(sec.body) : []
  }

  const agenticKeyword =
    /\b(agent|agentic|coding agent|AI builder|generative|copilot|LLM)\b/i.test(
      `${meta.tagline} ${md.slice(0, 2500)}`
    )

  const isDevAnalyst = DEV_ANALYST_CATEGORIES.has(meta.category)
  const isAgenticFirst =
    AGENTIC_FIRST_SLUGS.has(pkg.slug) ||
    (topics.agent_guide && meta.category === "AI & LLM") ||
    (topics.agent_guide && agenticKeyword && ["AI & LLM", "Developer Tools"].includes(meta.category))

  records.push({
    slug: pkg.slug,
    name: meta.name,
    meta_category: meta.category,
    tagline: meta.tagline,
    lines: md.split("\n").length,
    topics,
    sectionTitles,
    guidelines,
    never_count: (md.match(/\bnever\b/gi) || []).length,
    always_count: (md.match(/\balways\b/gi) || []).length,
    non_negotiable_count: (md.match(/non-negotiable/gi) || []).length,
    table_rows: (md.match(/^\|/gm) || []).length,
    cohorts: {
      all: true,
      dev_analyst: isDevAnalyst,
      agentic_first: isAgenticFirst,
    },
  })
}

records.sort((a, b) => a.slug.localeCompare(b.slug))

const allRows = records
const devRows = records.filter((r) => r.cohorts.dev_analyst)
const agentRows = records.filter((r) => r.cohorts.agentic_first)

const cohorts = {
  all: { label: "All design systems", count: allRows.length, slugs: allRows.map((r) => r.slug) },
  dev_analyst: {
    label: "Developer / analyst persona",
    count: devRows.length,
    slugs: devRows.map((r) => r.slug),
    meta_categories: [...DEV_ANALYST_CATEGORIES],
  },
  agentic_first: {
    label: "Agentic-first UX",
    count: agentRows.length,
    slugs: agentRows.map((r) => r.slug),
    definition:
      "Curated AI builders, coding agents, and agent frameworks with Agent Prompt Guide or explicit agentic positioning",
  },
}

const topicCoverage = Object.fromEntries(
  TOPIC_CATEGORIES.map((t) => [
    t.id,
    {
      label: t.label,
      all: cohortStats(allRows, t.id),
      dev_analyst: cohortStats(devRows, t.id),
      agentic_first: cohortStats(agentRows, t.id),
    },
  ])
)

const metaMatrix = matrixByMetaCategory(allRows)

const guidelineCorpus = Object.fromEntries(
  TOPIC_CATEGORIES.map((t) => [
    t.id,
    {
      label: t.label,
      top_all: topGuidelines(allRows, t.id, 15),
      top_dev_analyst: topGuidelines(devRows, t.id, 15),
      top_agentic_first: topGuidelines(agentRows, t.id, 12),
    },
  ])
)

const audit = {
  generated_at: new Date().toISOString(),
  corpus_root: CORPUS_ROOT,
  package_count: allRows.length,
  cohorts,
  topic_categories: TOPIC_CATEGORIES.map((t) => ({ id: t.id, label: t.label })),
  topic_coverage: topicCoverage,
  meta_category_matrix: metaMatrix,
  guideline_corpus: guidelineCorpus,
}

fs.writeFileSync(path.join(OUT_DIR, "category-audit.json"), JSON.stringify(audit, null, 2))

// TSV: meta category × key topics
const topicKeys = TOPIC_CATEGORIES.map((t) => t.id)
const matrixLines = [
  ["meta_category", "cohort", "n", "agentic_n", ...topicKeys, "avg_never", "avg_always", "avg_tables"].join("\t"),
]
for (const [cat, data] of Object.entries(metaMatrix).sort((a, b) => b[1].count - a[1].count)) {
  matrixLines.push(
    [
      cat,
      data.cohort,
      data.count,
      data.agentic_count,
      ...topicKeys.map((k) => data.topics[k].pct),
      data.avg_never,
      data.avg_always,
      data.avg_tables,
    ].join("\t")
  )
}
fs.writeFileSync(path.join(OUT_DIR, "meta-category-matrix.tsv"), matrixLines.join("\n"))

console.log(`Category audit: ${allRows.length} packages`)
console.log(`  dev_analyst: ${devRows.length}`)
console.log(`  agentic_first: ${agentRows.length}`)
console.log(`Wrote category-audit.json, meta-category-matrix.tsv`)
