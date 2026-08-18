/**
 * Audits Figma ↔ React parity for the whole component library.
 *
 * Three questions, because they fail independently:
 *
 *   1. Existence  — does each side have a counterpart at all?
 *   2. Navigation — can you get from one to the other, in both directions?
 *                   React → Figma is the `@figma` JSDoc tag and the index's Figma
 *                   layer column. Figma → React is Code Connect.
 *   3. Shape      — do the Figma variant axes and the React props agree?
 *
 * A component can pass 1 and fail 2, which is the quiet failure: both sides exist,
 * nobody can find one from the other, and each team builds its own. It is also how
 * `MetricCard` ended up pointing at a node deleted weeks earlier — nothing checks
 * that a JSDoc URL still resolves.
 *
 * The Figma side is a dump rather than a live read, so this runs offline and in CI.
 * Refresh it with `--how`.
 *
 * Run: node scripts/audit-figma-parity.mjs [--category <name>] [--verbose]
 */
import { readFileSync, existsSync, readdirSync } from "node:fs"
import { join } from "node:path"

const ROOT = new URL("..", import.meta.url).pathname
const read = (p) => (existsSync(join(ROOT, p)) ? readFileSync(join(ROOT, p), "utf8") : null)

if (process.argv.includes("--how")) {
  console.log(`
Refreshing scripts/design-lint/.figma-component-dump.json

  Read the DBUI library's Components page with the Figma MCP \`use_figma\` tool and
  emit one entry per COMPONENT / COMPONENT_SET, skipping anything inside an Icons
  section. For each: name, node id, cmp|set, the enclosing SECTION's name, and
  componentPropertyDefinitions with variant axes as arrays and other properties as
  their Figma type. Strip Figma's #id suffix from non-variant property keys.

  The dump is deliberately checked in: it lets this audit run without Figma access,
  which is the only way it can run in CI.
`)
  process.exit(0)
}

// ── Inputs ───────────────────────────────────────────────────────────────────
const dumpRaw = read("scripts/design-lint/.figma-component-dump.json")
if (!dumpRaw) {
  console.error("No Figma dump. See --how.")
  process.exit(1)
}
const figma = JSON.parse(dumpRaw).components
const figmaById = new Map(figma.map((c) => [c.id.replace(":", "-"), c]))
const figmaByName = new Map()
for (const c of figma) {
  if (!figmaByName.has(c.n)) figmaByName.set(c.n, [])
  figmaByName.get(c.n).push(c)
}

/**
 * Parses component-index.md the way the CLI does, so this audit and
 * `dbui component` disagree about nothing.
 */
function indexRows() {
  const md = read("packages/dbui/docs/component-index.md") ?? ""
  const rows = {}
  let category = null
  for (const line of md.split("\n")) {
    // A `##` heading ends the categorized region. Without this, the "Removed"
    // section's two-column "Use instead" table reads as rows of whatever category
    // came last, and ButtonGroup and ToggleGroup — deleted components — get
    // reported as missing a Figma layer.
    if (/^##\s/.test(line) && !/^###\s/.test(line)) {
      category = null
      continue
    }
    const h = line.match(/^###\s+`([a-z]+)`/)
    if (h) {
      category = h[1]
      continue
    }
    // A `###` heading that is not a category also ends one.
    if (/^###\s/.test(line)) {
      category = null
      continue
    }
    const cells = line.match(/^\|(.+)\|$/)
    if (!cells || !category) continue
    const parts = cells[1].split("|").map((c) => c.trim())
    const name = parts[0]?.match(/`([A-Za-z0-9]+)`/)?.[1]
    if (!name) continue
    rows[name] = { category, figmaLayer: parts[4] ?? "" }
  }
  return rows
}

/** Every React component source, by exported symbol name. */
function reactSources() {
  const dirs = [
    "packages/dbui/src/components/ui",
    "packages/dbui-viz/src/components",
    "packages/dbui-shells/src/shells",
    "packages/dbui-shells/src/compositions",
    "packages/dbui-chat/src/components",
  ]
  const byFile = []
  for (const dir of dirs) {
    if (!existsSync(join(ROOT, dir))) continue
    for (const f of readdirSync(join(ROOT, dir))) {
      if (!f.endsWith(".tsx") && !f.endsWith(".ts")) continue
      byFile.push({ file: `${dir}/${f}`, body: read(`${dir}/${f}`) ?? "" })
    }
  }
  return byFile
}

const rows = indexRows()
const sources = reactSources()

/** Code Connect: which Figma node ids does the repo claim, and for what. */
function codeConnect() {
  const claims = new Map()
  const dir = "figma"
  for (const f of readdirSync(join(ROOT, dir))) {
    if (!f.endsWith(".figma.tsx")) continue
    const body = read(`${dir}/${f}`) ?? ""
    for (const m of body.matchAll(/node-id=([\d-]+)/g)) {
      const id = m[1]
      if (!claims.has(id)) claims.set(id, [])
      claims.get(id).push(f.replace(".figma.tsx", ""))
    }
  }
  return claims
}
const claimed = codeConnect()

/** The `@figma` node id a component's own JSDoc points at. */
function figmaTagFor(name) {
  for (const s of sources) {
    // The tag has to be in the same file as the component's own declaration.
    if (!new RegExp(`(function|const)\\s+${name}\\b`).test(s.body)) continue
    const m = s.body.match(/@figma\s+\S*node-id=([\d-]+)/)
    if (m) return { id: m[1], file: s.file }
    if (new RegExp(`@standard\\s`).test(s.body)) return { id: null, file: s.file }
  }
  return null
}

// ── The audit ────────────────────────────────────────────────────────────────
const CATEGORIES = process.argv.includes("--category")
  ? [process.argv[process.argv.indexOf("--category") + 1]]
  : ["action", "controls", "content", "overlays", "feedback", "viz", "compositions", "chat"]

const findings = { noTag: [], deadTag: [], noLayer: [], layerMissing: [], layerPartial: [], codeOnly: [], noConnect: [] }
const table = []

for (const [name, row] of Object.entries(rows)) {
  if (!CATEGORIES.includes(row.category)) continue

  const tag = figmaTagFor(name)
  const isCodeOnly = /code-only/.test(row.figmaLayer)

  // React -> Figma, via the JSDoc tag. A component the index marks `*code-only*`
  // is supposed to have no tag, so an absence there is the documented answer
  // rather than a hole.
  let tagState = "—"
  if (!tag) tagState = "no source"
  else if (!tag.id && isCodeOnly) tagState = "code-only"
  else if (!tag.id) {
    tagState = "GAP no @figma"
    findings.noTag.push(name)
  } else if (!figmaById.has(tag.id)) {
    tagState = "GAP dead node"
    findings.deadTag.push(`${name} -> ${tag.id}`)
  } else {
    tagState = "ok"
  }

  // React -> Figma, via the index's layer column.
  //
  // The cell's own conventions: layer names are backticked, `*code-only*` marks a
  // component that deliberately has no Figma counterpart, and a parenthetical after
  // a name is a qualifier rather than part of it — "`Button` (label)".
  let layerState = "ok"
  const codeOnly = /code-only/.test(row.figmaLayer)
  const named = [...row.figmaLayer.matchAll(/`([^`]+)`/g)].map((m) => m[1].trim())

  if (codeOnly) {
    layerState = "code-only"
    findings.codeOnly.push(name)
  } else if (!named.length) {
    layerState = "GAP no layer"
    findings.noLayer.push(name)
  } else {
    const unknown = named.filter((n) => !figmaByName.has(n))
    if (unknown.length === named.length) {
      layerState = "GAP name mismatch"
      // Offer the closest Figma name, since these are nearly all spacing or case.
      const guess = (n) =>
        [...figmaByName.keys()].find(
          (k) => k.toLowerCase().replace(/\s/g, "") === n.toLowerCase().replace(/\s/g, "")
        )
      findings.layerMissing.push(
        unknown.map((n) => `${name} names \`${n}\` — Figma has ${guess(n) ? `\`${guess(n)}\`` : "no such component"}`).join("; ")
      )
    } else if (unknown.length) {
      layerState = `partial (${unknown.length})`
      findings.layerPartial.push(`${name} -> ${unknown.join(", ")} (its other layers resolve)`)
    }
  }

  // Figma -> React, via Code Connect on the node the tag names.
  let ccState = "ok"
  if (tag?.id && !claimed.has(tag.id)) {
    ccState = "GAP no Code Connect"
    findings.noConnect.push(`${name} (${tag.id})`)
  } else if (!tag?.id) {
    ccState = "—"
  }

  table.push({ category: row.category, name, tagState, layerState, ccState })
}

/**
 * Question three: do the two sides agree on variants?
 *
 * Not by comparing names — they deliberately differ. Button's own JSDoc records
 * "Primary → default", and a check that demanded equality would flag every
 * intentional rename while missing the thing that actually breaks: an axis or an
 * option that exists in Figma and is not written down anywhere.
 *
 * `variant-mappings.json` is the artifact whose whole job is that translation, so
 * the real question is whether it covers what Figma has. An unmapped axis is a
 * variant a developer cannot look up and a designer assumes is implemented.
 */
const mappings = JSON.parse(read("apps/portal/src/stories/components/variant-mappings.json") ?? "{}")

/**
 * Figma component name -> variant-mappings key.
 *
 * The aliases are the cases where the Figma name and the React component are
 * deliberately different words: Figma's "Toast" is React's `Sonner`, Figma's
 * "Toggle Button" is `Toggle`, and every viz chart is named for its shape in Figma
 * and its component in code.
 *
 * `null` means the component maps to no entry on purpose — an inner part whose
 * variants belong to the thing that contains it.
 */
const MAPPING_ALIASES = {
  "toggle-button": "toggle",
  radio: "radio-group",
  toast: "sonner",
  "progress-bar": "progress",
  donut: "donut-chart",
  line: "line-series",
  multiline: "line-series",
  bar: "bar-chart",
  "stacked-bar": "bar-chart",
  "platform-nav": "navbar",
  "data-tree": "data-tree",
  // Inner parts: their variants are props on the card that contains them.
  metric: "stat-card",
  header: "metric-card",
  "axis-label": null,
}

const mappingKey = (figmaName) => {
  const raw = figmaName
    .replace(/^Viz\/(Medium|Large|Card|Inner)\//, "")
    .replace(/^\./, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
  return raw in MAPPING_ALIASES ? MAPPING_ALIASES[raw] : raw
}

const variantGaps = { noEntry: [], missingAxis: [], missingOptions: [] }

for (const c of figma) {
  const axes = Object.entries(c.p).filter(([, v]) => Array.isArray(v))
  if (!axes.length) continue
  // Inner parts and the unsorted section are not published surfaces.
  if (/^\.|Inner |Section 1|no section/.test(c.n + c.s)) continue

  const key = mappingKey(c.n)
  if (key === null) continue // maps to nothing by design
  const entry = mappings[key]
  if (!entry?.figmaCode) {
    variantGaps.noEntry.push(`${c.n} (${axes.map(([a]) => a).join(", ")}) — no "${key}" in variant-mappings`)
    continue
  }
  const mapped = entry.figmaCode
  const mappedKeys = Object.keys(mapped)
  for (const [axis, options] of axes) {
    // An axis is covered if a mapping key names it, exactly or as a prefix —
    // "Variant" covers a key written "Variant (tone)".
    const hit = mappedKeys.find((k) => k === axis || k.toLowerCase().startsWith(axis.toLowerCase()))
    if (!hit) {
      variantGaps.missingAxis.push(`${c.n} · ${axis} — ${options.length} option(s), unmapped`)
      continue
    }
    const listed = (mapped[hit].figma ?? []).map((s) => String(s).toLowerCase())
    const missing = options.filter(
      (o) => !listed.some((l) => l.includes(String(o).toLowerCase()))
    )
    if (missing.length) {
      variantGaps.missingOptions.push(`${c.n} · ${axis} — not in the mapping: ${missing.join(", ")}`)
    }
  }
}

// Figma components with no Code Connect claim at all — the other direction.
/**
 * Things that are supposed to have no Code Connect.
 *
 * Anything dot-prefixed or under an `Inner` section is a nested part, drawn so a
 * designer can see the pieces rather than placed on its own. `Recipe/` and the
 * `Recipes` section are the tier above components: an arrangement you assemble
 * yourself, so there is no single component to point at — that is what makes it a
 * recipe rather than a composition.
 */
const SKIP_UNCLAIMED = /^\.|^Recipe\/|^Viz\/Inner\/|Section 1|no section|Inner |Recipes/
const unclaimed = figma
  .filter((c) => !claimed.has(c.id.replace(":", "-")))
  .filter((c) => !SKIP_UNCLAIMED.test(c.n) && !SKIP_UNCLAIMED.test(c.s))

// Duplicate Figma names: a lookup by name cannot resolve these.
const dupes = [...figmaByName.entries()].filter(([, list]) => list.length > 1)

// ── Report ───────────────────────────────────────────────────────────────────
const byCategory = {}
for (const r of table) (byCategory[r.category] ??= []).push(r)

console.log("\nFIGMA <-> REACT PARITY\n")
console.log("  react->figma  @fig = the JSDoc tag resolves to a live node")
console.log("                layer = component-index names a layer that exists")
console.log("  figma->react  CC = Code Connect claims that node\n")

for (const cat of CATEGORIES) {
  const items = byCategory[cat]
  if (!items?.length) continue
  console.log(`  ${cat.toUpperCase()} — ${items.length}`)
  for (const r of items.sort((a, b) => a.name.localeCompare(b.name))) {
    const flag = [r.tagState, r.layerState, r.ccState].some((s) => s.startsWith("GAP"))
    console.log(
      `    ${flag ? "!" : " "} ${r.name.padEnd(20)} @fig ${r.tagState.padEnd(18)} layer ${r.layerState.padEnd(22)} CC ${r.ccState}`
    )
  }
  console.log("")
}

const sections = [
  ["React components with no @figma tag", findings.noTag],
  ["@figma tags pointing at a node that does not exist", findings.deadTag],
  ["No Figma layer named in component-index", findings.noLayer],
  ["Named a Figma layer whose name does not match Figma", findings.layerMissing],
  ["Named several layers, some of which do not resolve", findings.layerPartial],
  ["No Code Connect, so Figma cannot find the code", findings.noConnect],
  [
    "Figma components no Code Connect file claims",
    unclaimed.map((c) => `${c.n} (${c.s})`),
  ],
  [
    "Duplicate Figma names — a by-name lookup is ambiguous",
    dupes.map(([n, list]) => `${n} x${list.length}: ${list.map((c) => `${c.id} in ${c.s}`).join(" | ")}`),
  ],
  ["Has Figma variants but no variant-mappings entry", variantGaps.noEntry],
  ["Figma variant axis nothing maps", variantGaps.missingAxis],
  ["Figma variant options the mapping does not list", variantGaps.missingOptions],
]

let total = 0
for (const [title, items] of sections) {
  if (!items.length) continue
  total += items.length
  console.log(`  ${title} — ${items.length}`)
  for (const i of items) console.log(`    - ${i}`)
  console.log("")
}

console.log(total === 0 ? "  No gaps.\n" : `  ${total} finding(s).\n`)
process.exit(total === 0 ? 0 : 1)
