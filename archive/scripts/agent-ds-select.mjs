#!/usr/bin/env node
/**
 * Agent-Design-Standards — select the 20 systems closest to Databricks.
 *
 * Combines curated Databricks-fit attributes (data/fit-attributes.json) with
 * objective file-quality metrics from the catalog, computes a weighted score,
 * and picks 20 with a per-category floor so the cohort keeps a mix of
 * AI / dev-tools / backend-data / productivity / design-creative.
 *
 * Usage:  node scripts/agent-ds-select.mjs
 * Output: research/agent-design-standards/data/cohort-scores.json + .tsv
 */
import fs from "node:fs"
import path from "node:path"

const ROOT = path.resolve(import.meta.dirname, "..")
const DATA = path.join(ROOT, "research/agent-design-standards/data")

const catalog = JSON.parse(fs.readFileSync(path.join(DATA, "catalog.json"), "utf8"))
const fit = JSON.parse(fs.readFileSync(path.join(DATA, "fit-attributes.json"), "utf8"))
const W = fit.weights

const byKey = Object.fromEntries(catalog.systems.map((s) => [s.key, s]))

// file-quality axis (0-3): front matter + length + rule discipline + tables
function qualityScore(best) {
  const fm = best.has_front_matter ? 1 : 0
  const len = Math.min(best.lines / 800, 1)
  const rules = Math.min((best.never_count + best.non_negotiable_count) / 12, 1)
  const tables = Math.min(best.table_rows / 45, 1)
  return +(((fm + len + rules + tables) / 4) * 3).toFixed(2)
}

const scored = []
for (const [key, a] of Object.entries(fit.systems)) {
  const s = byKey[key]
  if (!s) {
    console.warn(`no catalog entry for ${key}`)
    continue
  }
  const q = qualityScore(s.best)
  const total =
    a.domain * W.domain +
    a.audience * W.audience +
    a.light * W.light +
    a.density * W.density +
    a.accent * W.accent +
    q * W.quality
  scored.push({
    key,
    display: s.display,
    category: s.category,
    descriptor: s.descriptor,
    lines: s.best.lines,
    ...a,
    quality: q,
    total: +total.toFixed(2),
  })
}

scored.sort((x, y) => y.total - x.total)

// selection: per-category quotas so the cohort keeps the intended MIX
// (AI / dev-tools / backend-data / productivity / design-creative), then
// wildcards fill remaining slots by global score. Backend-data is allowed the
// wildcard weight because Databricks is itself a data platform.
const TARGET = 20
const QUOTA = {
  "AI & LLM Platforms": 4,
  "Developer Tools & IDEs": 4,
  "Backend, Database & DevOps": 4,
  "Productivity & SaaS": 4,
  "Design & Creative Tools": 3,
}
const chosen = []
const byCat = {}
for (const r of scored) (byCat[r.category] = byCat[r.category] || []).push(r)

// 1) take top-QUOTA from each category (by score)
for (const [cat, q] of Object.entries(QUOTA)) {
  for (const r of (byCat[cat] || []).slice(0, q)) chosen.push(r)
}
// 2) fill remaining slots by global score (wildcards)
const chosenKeys = new Set(chosen.map((r) => r.key))
for (const r of scored) {
  if (chosen.length >= TARGET) break
  if (!chosenKeys.has(r.key)) {
    chosen.push(r)
    chosenKeys.add(r.key)
  }
}
chosen.sort((x, y) => y.total - x.total)

const maxTotal =
  3 * W.domain + 3 * W.audience + 3 * W.light + 3 * W.density + 3 * W.accent + 3 * W.quality

const out = {
  generated_at: new Date().toISOString(),
  max_total: maxTotal,
  weights: W,
  quotas: QUOTA,
  chosen: chosen.map((r) => r.key),
  cohort_by_category: chosen.reduce((m, r) => {
    ;(m[r.category] = m[r.category] || []).push(r.display)
    return m
  }, {}),
  all_scores: scored,
}
fs.writeFileSync(path.join(DATA, "cohort-scores.json"), JSON.stringify(out, null, 2))

const cols = ["rank", "key", "display", "category", "total", "domain", "audience", "light", "density", "accent", "quality", "lines", "chosen"]
const tsv = [cols.join("\t")]
scored.forEach((r, i) => {
  tsv.push([i + 1, r.key, r.display, r.category, r.total, r.domain, r.audience, r.light, r.density, r.accent, r.quality, r.lines, chosenKeys.has(r.key) ? "YES" : ""].join("\t"))
})
fs.writeFileSync(path.join(DATA, "cohort-scores.tsv"), tsv.join("\n"))

console.log(`Max possible score: ${maxTotal}`)
console.log(`\nChosen 20 (by score):`)
chosen.forEach((r, i) => console.log(`  ${String(i + 1).padStart(2)}. ${r.display.padEnd(13)} ${String(r.total).padStart(5)}  ${r.category}`))
console.log(`\nCohort by category:`)
for (const [c, list] of Object.entries(out.cohort_by_category)) console.log(`  ${c}: ${list.join(", ")}`)
console.log(`\nNOT chosen:`, scored.filter((r) => !chosenKeys.has(r.key)).map((r) => r.display).join(", "))
