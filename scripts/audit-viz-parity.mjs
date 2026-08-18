/**
 * Audits the viz family against the contribution protocol in CONTRIBUTING.md.
 *
 * Figma has run ahead of React more than once here, and the protocol has nine
 * steps that each live in a different file — which is exactly the shape of thing
 * that goes half-done quietly. This reads every artifact and prints a matrix.
 *
 * Run: node scripts/audit-viz-parity.mjs
 */
import { readFileSync, existsSync, readdirSync } from "node:fs"
import { join } from "node:path"

const ROOT = new URL("..", import.meta.url).pathname

const read = (p) => (existsSync(join(ROOT, p)) ? readFileSync(join(ROOT, p), "utf8") : null)

/**
 * Every Figma viz component and the React component that backs it. `null` means
 * deliberately nothing — recorded so an absence reads as a decision.
 */
const MAP = [
  // Figma name                    React            package     source
  ["Viz/Card/Metric", "StatCard", "dbui", "packages/dbui/src/components/ui/stat-card.tsx"],
  ["Viz/Card/Bar", "MetricCard", "dbui", "packages/dbui/src/components/ui/metric-card.tsx"],
  ["Viz/Card/Line", "MetricCard", "dbui", "packages/dbui/src/components/ui/metric-card.tsx"],
  ["Viz/Card/Leaderboard", "MetricCard", "dbui", "packages/dbui/src/components/ui/metric-card.tsx"],
  ["Viz/Card/Donut", "MetricCard", "dbui", "packages/dbui/src/components/ui/metric-card.tsx"],
  ["Viz/Card/Treemap", "MetricCard", "dbui", "packages/dbui/src/components/ui/metric-card.tsx"],
  ["Viz/Card/SegmentedBar", "MetricCard", "dbui", "packages/dbui/src/components/ui/metric-card.tsx"],
  // Inners with no component of their own. Recorded so an absence reads as a
  // decision: Metric and Header are the card's own header, drawn from its props,
  // and Vega draws axes from `vizVegaConfig`.
  ["Viz/Inner/Metric", null, null, null],
  ["Viz/Inner/Axis Label", null, null, null],
  ["Viz/Inner/Header", null, null, null],
  ["Viz/Inner/Legend", "Legend", "dbui-viz", "packages/dbui-viz/src/components/legend.tsx"],
  ["Viz/Medium/Bar", "BarChart", "dbui-viz", "packages/dbui-viz/src/components/bar-chart.tsx"],
  ["Viz/Medium/Stacked Bar", "BarChart", "dbui-viz", "packages/dbui-viz/src/components/bar-chart.tsx"],
  ["Viz/Medium/Line", "LineSeries", "dbui-viz", "packages/dbui-viz/src/components/line-series.tsx"],
  ["Viz/Medium/Donut", "DonutChart", "dbui-viz", "packages/dbui-viz/src/components/donut-chart.tsx"],
  ["Viz/Medium/Treemap", "Treemap", "dbui-viz", "packages/dbui-viz/src/components/treemap.tsx"],
  ["Viz/Medium/Leaderboard", "Leaderboard", "dbui-viz", "packages/dbui-viz/src/components/leaderboard.tsx"],
  ["Viz/Medium/Segmented Bar", "SegmentedBar", "dbui-viz", "packages/dbui-viz/src/components/segmented-bar.tsx"],
  ["Viz/Large/Bar", "BarChart", "dbui-viz", "packages/dbui-viz/src/components/bar-chart.tsx"],
  ["Viz/Large/Stacked Bar", "BarChart", "dbui-viz", "packages/dbui-viz/src/components/bar-chart.tsx"],
  ["Viz/Large/Line", "LineSeries", "dbui-viz", "packages/dbui-viz/src/components/line-series.tsx"],
  ["Viz/Large/Multiline", "LineSeries", "dbui-viz", "packages/dbui-viz/src/components/line-series.tsx"],
  ["Viz/Large/Treemap", "Treemap", "dbui-viz", "packages/dbui-viz/src/components/treemap.tsx"],
  ["Viz/Large/Heatmap", "Heatmap", "dbui-viz", "packages/dbui-viz/src/components/heatmap.tsx"],
]

// Node ids each Figma component resolves to, for the Code Connect coverage check.
const NODE_IDS = {
  "Viz/Card/Metric": "4839-17659",
  "Viz/Card/Bar": "5015-27131",
  "Viz/Card/Line": "5015-27132",
  "Viz/Card/Leaderboard": "5015-27130",
  "Viz/Card/Donut": "5015-27129",
  "Viz/Card/Treemap": "5015-27128",
  "Viz/Card/SegmentedBar": "5015-27127",
  "Viz/Inner/Legend": "4968-9250",
  "Viz/Inner/Axis Label": "4998-25156",
  "Viz/Inner/Header": "5015-27346",
  "Viz/Inner/Metric": "4839-17723",
  "Viz/Medium/Bar": "5089-7826",
  "Viz/Medium/Stacked Bar": "5089-7869",
  "Viz/Medium/Line": "4839-17735",
  "Viz/Medium/Donut": "5020-16723",
  "Viz/Medium/Treemap": "5020-16745",
  "Viz/Medium/Leaderboard": "5020-9417",
  "Viz/Medium/Segmented Bar": "4839-18429",
  "Viz/Large/Bar": "5033-9578",
  "Viz/Large/Stacked Bar": "5033-9637",
  "Viz/Large/Line": "5035-9602",
  "Viz/Large/Multiline": "5035-9636",
  "Viz/Large/Treemap": "5037-9628",
  "Viz/Large/Heatmap": "5038-9628",
}

/**
 * The palette each chart must draw in, and the Figma variable it is bound to.
 *
 * The rule, so a new chart has an answer without a debate:
 *   one series          -> sequential-5   (a magnitude)
 *   peer series         -> categorical-N  (identity, via VIZ_SERIES_ORDER)
 *   a state or severity -> level-*
 *   tracks and tails    -> viz-neutral-*
 *
 * This drifted once already: Bar defaulted to `categorical-1` while Figma drew
 * `level/info/base`, and Line defaulted to ink while Figma drew `sequential/5` —
 * so the same chart was three different colours depending on where you looked.
 */
const PALETTE_RULE = [
  // React source          default palette expected   Figma variable
  ["bar-chart.tsx", "sequential-5", "viz/sequential/5"],
  ["line-series.tsx", "sequential-5", "viz/sequential/5"],
  ["leaderboard.tsx", "sequential-2", "viz/sequential/2"],
]

// ── The artifacts ────────────────────────────────────────────────────────────
const index = read("packages/dbui/docs/component-index.md") ?? ""
const manifest = JSON.parse(read("scripts/design-lint/dbui-components.json") ?? "{}")
const mappings = JSON.parse(read("apps/portal/src/stories/components/variant-mappings.json") ?? "{}")
const galleryDemos = read("apps/portal/src/stories/components/gallery-demos.tsx") ?? ""
const galleryData = read("apps/portal/src/stories/components/gallery-data.ts") ?? ""
const vizBarrel = read("packages/dbui-viz/src/index.ts") ?? ""
const dbuiBarrel = read("packages/dbui/src/index.ts") ?? ""
const vizTsup = read("packages/dbui-viz/tsup.config.ts") ?? ""
const dbuiTsup = read("packages/dbui/tsup.config.ts") ?? ""

const connectFiles = readdirSync(join(ROOT, "figma"))
  .filter((f) => f.endsWith(".figma.tsx"))
  .map((f) => ({ file: f, body: read(`figma/${f}`) ?? "" }))
const allConnect = connectFiles.map((c) => c.body).join("\n")

const storyFiles = []
for (const dir of ["apps/portal/src/stories", "apps/portal/src/stories/viz"]) {
  if (!existsSync(join(ROOT, dir))) continue
  for (const f of readdirSync(join(ROOT, dir))) {
    if (f.endsWith(".stories.tsx")) storyFiles.push({ file: `${dir}/${f}`, body: read(`${dir}/${f}`) ?? "" })
  }
}

const manifestNames = new Set(
  Object.values(manifest)
    .flatMap((v) => (Array.isArray(v) ? v : typeof v === "object" && v ? Object.keys(v) : []))
    .concat(Object.keys(manifest))
)
const manifestFlat = JSON.stringify(manifest)

// ── Checks ───────────────────────────────────────────────────────────────────
function auditReact(react, pkg, src) {
  const body = src ? read(src) : null
  const barrel = pkg === "dbui-viz" ? vizBarrel : dbuiBarrel
  const tsup = pkg === "dbui-viz" ? vizTsup : dbuiTsup
  const base = src ? src.split("/").pop().replace(".tsx", "") : null

  return {
    source: body ? "yes" : "MISSING",
    standard: body && /@standard\s+\S/.test(body) ? "yes" : "MISSING",
    guideline: body && /@guideline\s+\S/.test(body) ? "yes" : "MISSING",
    constraint: body && /@constraint\s+\S/.test(body) ? "yes" : "MISSING",
    figmaTag: body && /@figma\s+http/.test(body) ? "yes" : "MISSING",
    indexRow: react && new RegExp("`" + react + "`").test(index) ? "yes" : "MISSING",
    manifest: react && manifestFlat.includes(`"${react}"`) ? "yes" : "MISSING",
    // The dbui barrel re-exports by path (`export * from "./components/ui/x"`),
    // so the symbol never appears — match the module, not the name.
    barrel: react && (barrel.includes(react) || (base && barrel.includes(base))) ? "yes" : "MISSING",
    tsup: base && tsup.includes(`/${base}"`) ? "yes" : "MISSING",
    story: react && storyFiles.some((s) => new RegExp(`\\b${react}\\b`).test(s.body)) ? "yes" : "MISSING",
    gallery: react && new RegExp(`<${react}\\b`).test(galleryDemos) ? "yes" : "MISSING",
  }
}

const rows = []
for (const [figmaName, react, pkg, src] of MAP) {
  const nodeId = NODE_IDS[figmaName]
  const connected = nodeId ? allConnect.includes(`node-id=${nodeId}`) : false
  if (!react) {
    rows.push({ figmaName, react: "— none by design", connect: connected ? "yes" : "n/a" })
    continue
  }
  if (react === "?") {
    rows.push({ figmaName, react: "UNKNOWN — no mapping recorded", connect: connected ? "yes" : "MISSING" })
    continue
  }
  rows.push({ figmaName, react, connect: connected ? "yes" : "MISSING", ...auditReact(react, pkg, src) })
}

// Which React components have a variant-mappings entry, keyed by kebab source name
const kebab = (n) => n.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()
const uniqueReact = [...new Set(MAP.map((m) => m[1]).filter((r) => r && r !== "?"))]

// ── Report ───────────────────────────────────────────────────────────────────
const COLS = ["source", "standard", "guideline", "constraint", "figmaTag", "indexRow", "manifest", "barrel", "tsup", "story", "gallery", "connect"]
const LABEL = { source: "src", standard: "@std", guideline: "@gd", constraint: "@con", figmaTag: "@fig", indexRow: "index", manifest: "manif", barrel: "barrel", tsup: "tsup", story: "story", gallery: "gallr", connect: "CC" }

console.log("\nFIGMA → REACT PARITY  (24 Figma components)\n")
console.log(
  "  " + "Figma component".padEnd(26) + "React".padEnd(14) + COLS.map((c) => LABEL[c].padEnd(7)).join("")
)
console.log("  " + "-".repeat(26 + 14 + COLS.length * 7))

const gaps = []
for (const r of rows) {
  if (!r.source && !COLS.some((c) => r[c])) {
    console.log("  " + r.figmaName.padEnd(26) + r.react)
    continue
  }
  const cells = COLS.map((c) => {
    const v = r[c]
    if (v === undefined) return "-".padEnd(7)
    if (v !== "yes" && v !== "n/a") gaps.push(`${r.figmaName} (${r.react}): ${LABEL[c]} ${v}`)
    return (v === "yes" ? "ok" : v === "n/a" ? "n/a" : "GAP").padEnd(7)
  })
  console.log("  " + r.figmaName.padEnd(26) + String(r.react).padEnd(14) + cells.join(""))
}

console.log("\nDEFAULT PALETTES (React default must equal the Figma binding)\n")
for (const [file, expected, figmaVar] of PALETTE_RULE) {
  const body = read(`packages/dbui-viz/src/components/${file}`) ?? ""
  const m = body.match(/palette\s*=\s*"([^"]+)"/)
  const actual = m ? m[1] : "none — falls back to something else"
  const ok = actual === expected
  if (!ok) gaps.push(`${file}: default palette is ${actual}, Figma binds ${figmaVar}`)
  console.log(`  ${ok ? "ok " : "GAP"}  ${file.padEnd(20)} ${actual.padEnd(16)} <-> ${figmaVar}`)
}

// A fallback to the ink foreground is how Line diverged from every mock.
const lineBody = read("packages/dbui-viz/src/components/line-series.tsx") ?? ""
const inkFallback = /palette\s*\?\s*theme\.palettes\[palette\]\.solid\s*:\s*theme\.foreground/.test(
  lineBody
)
if (inkFallback) gaps.push("line-series.tsx: still falls back to theme.foreground when palette is unset")
console.log(`  ${inkFallback ? "GAP" : "ok "}  no ink fallback`)

console.log("\nVARIANT MAPPINGS (variant-mappings.json)\n")
for (const react of uniqueReact.sort()) {
  const key = kebab(react)
  const has = key in mappings
  if (!has) gaps.push(`${react}: no variant-mappings.json entry ("${key}")`)
  console.log(`  ${has ? "ok " : "GAP"}  ${react.padEnd(14)} key "${key}"`)
}

console.log("\nGALLERY LINKS (gallery-data.ts storyId)\n")
for (const react of uniqueReact.sort()) {
  // The gallery keys off the display name in component-index.md, not the symbol.
  const spaced = react.replace(/([a-z0-9])([A-Z])/g, "$1 $2")
  const inData = galleryData.includes(`"${spaced}"`) || galleryData.includes(`"${react}"`)
  const hasStoryId = new RegExp(`"${spaced}"[\\s\\S]{0,400}?storyId`).test(galleryData)
  if (!hasStoryId) gaps.push(`${react}: gallery tile has no storyId link`)
  console.log(`  ${hasStoryId ? "ok " : "GAP"}  ${react.padEnd(14)} present=${inData} storyId=${hasStoryId}`)
}

console.log(`\n${gaps.length} gap(s)\n`)
for (const g of gaps) console.log("  - " + g)
process.exit(gaps.length ? 1 : 0)
