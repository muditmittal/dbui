#!/usr/bin/env node
/**
 * Variant parity, per family — do Figma's variants and React's props still agree?
 *
 * `audit-figma-parity` answers "does this component exist on both sides and do they
 * point at each other". It stops short of the thing that actually breaks: the two
 * sides use different words for the same variant, and `variant-mappings.json` is the
 * table that translates them. Figma says `Variant=Primary`, React says
 * `variant="default"`. Nothing checked that table against either side, so it could
 * describe a Figma axis that had been renamed or a React prop that no longer exists,
 * and every other audit would still pass.
 *
 * Two directions, and both are silent failures today:
 *
 *   1. **Figma drift.** The mapping's `figma` list vs the axis options actually in
 *      the file. Rename or add a variant in Figma and the mapping goes stale.
 *   2. **React drift.** The mapping's `code` list vs the props actually in the
 *      component's source. Rename a `cva` variant and the mapping points at nothing.
 *
 * Scoped by family so it can be read one section at a time:
 *
 *   node scripts/audit-variant-parity.mjs actions
 *   node scripts/audit-variant-parity.mjs            # every family
 *
 * ## What counts as a `code` entry worth checking
 *
 * The `code` arrays are written for a human, so they hold prose as well as props —
 * "default (CSS)", "hover (CSS)", "no axis — the drag state is behaviour". Only bare
 * prop-shaped tokens are resolvable, so anything with a space, a bracket or a dash
 * into prose is recorded as unverifiable rather than reported as missing. That
 * distinction is the difference between a finding and noise.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const read = (p) => {
  try {
    return fs.readFileSync(path.join(ROOT, p), "utf8")
  } catch {
    return null
  }
}

// ── Families, by the Figma section they live in ───────────────────────────────
const FAMILIES = {
  actions: ["Actions"],
  controls: ["Controls"],
  content: ["Content"],
  overlays: ["Overlays"],
  feedback: ["Feedback"],
  chat: ["Chat Components"],
  viz: ["Viz Components — Medium", "Viz Components — Large", ".Inner Viz"],
  compositions: ["Compositions", "Chrome & Shells"],
}

/**
 * The mapping file is keyed by a slug that mostly follows the Figma layer name, but
 * not always — `Tree` is filed under `datatree`, `Toggle Button` under `toggle`.
 * Same seam `audit-figma-parity` handles, and the same table.
 */
const MAPPING_ALIASES = {
  tree: "datatree",
  "data-tree": "datatree",
  "toggle-button": "toggle",
  "progress-bar": "progress",
  radio: "radio-group",
  "radio-tile": "radio-tile",
  suggestions: "suggestions",
  "viz-medium-bar": "bar-chart",
  "viz-medium-stacked-bar": "bar-chart",
  "viz-medium-line": "line-series",
  "viz-medium-donut": "donut-chart",
  "viz-medium-treemap": "treemap",
  "viz-medium-segmented-bar": "segmented-bar",
  "viz-medium-leaderboard": "leaderboard",
  "viz-inner-legend": "legend",
}

const slug = (name) =>
  name
    .replace(/^Viz\//, "viz-")
    .replace(/[/\s]+/g, "-")
    .replace(/[^A-Za-z0-9-]/g, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replace(/-+/g, "-")

const mappingKey = (figmaName) => {
  const s = slug(figmaName)
  return MAPPING_ALIASES[s] ?? s
}

// ── Inputs ───────────────────────────────────────────────────────────────────
const dump = JSON.parse(read("scripts/design-lint/.figma-component-dump.json") ?? "null")
if (!dump) {
  console.error("No Figma component dump. Run the dump documented in audit-figma-parity.mjs.")
  process.exit(1)
}
const mappings = JSON.parse(read("apps/portal/src/stories/components/variant-mappings.json") ?? "{}")

/** Every React component source, so a `code` token can be looked for where it lives. */
const SOURCE_DIRS = [
  "packages/dbui/src/components/ui",
  "packages/dbui/src/lib",
  "packages/dbui-viz/src/components",
  "packages/dbui-viz/src/lib",
  "packages/dbui-chat/src/components",
  "packages/dbui-shells/src/components",
  "packages/dbui-shells/src/compositions",
]
const sources = []
for (const dir of SOURCE_DIRS) {
  if (!fs.existsSync(path.join(ROOT, dir))) continue
  for (const f of fs.readdirSync(path.join(ROOT, dir))) {
    if (!/\.(tsx?|ts)$/.test(f)) continue
    sources.push({ file: `${dir}/${f}`, body: read(`${dir}/${f}`) ?? "" })
  }
}
const allSource = sources.map((s) => s.body).join("\n")

/** A bare prop value — `outline`, `icon-sm`, `sequential-5`. Prose is not. */
const PROP_TOKEN = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/

/**
 * Is this prop value present in the source at all? Deliberately a repo-wide search
 * rather than per-file: `buttonVariants` lives in `lib/`, not beside the component,
 * and `Status`'s twelve values are shared.
 *
 * Four shapes count, because a variant is not always a string union:
 *   - a `cva` key or union member — `outline:` / `"outline"`
 *   - a boolean prop declaration — `indeterminate?: boolean`
 *   - the attribute a boolean state renders as — `data-indeterminate`
 *   - a destructured prop — `{ checked, indeterminate }`
 *
 * Without the last three, every boolean-state axis reads as missing: `Checkbox`
 * has no string `"checked"` anywhere, it has `data-checked` in a class list.
 */
function propExists(token) {
  if (!PROP_TOKEN.test(token)) return null // unverifiable, not missing
  const q = token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  return (
    new RegExp(`["']${q}["']`).test(allSource) ||
    new RegExp(`(^|[\\s{])${q}\\??:`, "m").test(allSource) ||
    new RegExp(`data-${q}\\b`).test(allSource) ||
    new RegExp(`[{,]\\s*${q}\\s*[,}=]`).test(allSource)
  )
}

// ── Audit ────────────────────────────────────────────────────────────────────
const requested = process.argv[2]?.toLowerCase()
const families = requested ? { [requested]: FAMILIES[requested] } : FAMILIES
if (requested && !FAMILIES[requested]) {
  console.error(`Unknown family "${requested}". One of: ${Object.keys(FAMILIES).join(", ")}`)
  process.exit(1)
}

let grandTotal = 0
const summary = []

for (const [family, sections] of Object.entries(families)) {
  const comps = dump.components
    .filter((c) => sections.includes(c.s))
    // Dot-prefixed layers are nested parts drawn so a designer can see the pieces.
    .filter((c) => !c.n.startsWith("."))
    // `Viz/Inner/*` is the same kind of thing under a different naming convention:
    // Header, Metric and Axis Label are rendered *for* you by `MetricCard`'s props,
    // so there is no component to reach for and nothing for the portal to show.
    // Their axes are real and are documented — in `docs/figma-mapping.md`, which
    // spells out that `Prop=Toggle` means `action={<SegmentControl …>}`. That is the
    // right home for a part, and `audit-figma-parity` skips the same prefix.
    .filter((c) => !c.n.startsWith("Viz/Inner/"))
    .sort((a, b) => a.n.localeCompare(b.n))

  const findings = { noMapping: [], figmaDrift: [], reactMissing: [], unverifiable: 0, axes: 0 }

  for (const c of comps) {
    const axes = Object.entries(c.p ?? {}).filter(([, v]) => Array.isArray(v))
    if (!axes.length) continue
    const key = mappingKey(c.n)
    const entry = mappings[key]?.figmaCode
    if (!entry) {
      findings.noMapping.push(`${c.n} (${axes.map(([a]) => a).join(", ")}) — no "${key}" entry`)
      continue
    }

    for (const [axis, options] of axes) {
      findings.axes++
      const mapped = entry[axis]
      if (!mapped) {
        findings.figmaDrift.push(`${c.n} · ${axis} — axis not in the mapping at all`)
        continue
      }
      // Direction 1 — does the mapping still describe Figma?
      const declared = new Set((mapped.figma ?? []).map((s) => String(s).trim()))
      const missing = options.filter((o) => !declared.has(o))
      if (missing.length) {
        findings.figmaDrift.push(
          `${c.n} · ${axis} — in Figma, not in the mapping: ${missing.join(", ")}`
        )
      }
      const stale = [...declared].filter(
        (d) => !options.includes(d) && !/[\s—(]/.test(d)
      )
      if (stale.length) {
        findings.figmaDrift.push(
          `${c.n} · ${axis} — in the mapping, not in Figma: ${stale.join(", ")}`
        )
      }

      // Direction 2 — do the props it names still exist?
      for (const raw of mapped.code ?? []) {
        // A cell can name a prop inline: `status="complete"` or `defaultOpen`.
        const inline = [...String(raw).matchAll(/=["']([a-z][a-z0-9-]*)["']/g)].map((m) => m[1])
        const candidates = inline.length ? inline : [String(raw).trim()]
        for (const token of candidates) {
          const ok = propExists(token)
          if (ok === null) findings.unverifiable++
          else if (!ok) findings.reactMissing.push(`${c.n} · ${axis} — "${token}" is not in any source`)
        }
      }
    }
  }

  const total =
    findings.noMapping.length + findings.figmaDrift.length + findings.reactMissing.length
  grandTotal += total
  summary.push({ family, comps: comps.length, axes: findings.axes, total })

  console.log(`\n${family.toUpperCase()} — ${comps.length} components, ${findings.axes} variant axes`)
  const sections2 = [
    ["No mapping entry", findings.noMapping],
    ["Figma and the mapping disagree", findings.figmaDrift],
    ["Mapping names a prop no source has", findings.reactMissing],
  ]
  for (const [title, items] of sections2) {
    if (!items.length) continue
    console.log(`\n  ${title} — ${items.length}`)
    for (const i of items) console.log(`    - ${i}`)
  }
  console.log(
    total === 0
      ? `  Aligned. ${findings.unverifiable} cell(s) are prose and cannot be machine-checked.`
      : `\n  ${total} finding(s). ${findings.unverifiable} cell(s) are prose.`
  )
}

console.log("\n" + "─".repeat(64))
for (const s of summary) {
  console.log(
    `  ${s.family.padEnd(14)} ${String(s.comps).padStart(2)} components  ${String(s.axes).padStart(2)} axes  ${
      s.total === 0 ? "aligned" : s.total + " finding(s)"
    }`
  )
}
console.log(grandTotal === 0 ? "\n  No gaps.\n" : `\n  ${grandTotal} finding(s) total.\n`)
process.exit(grandTotal === 0 ? 0 : 1)
