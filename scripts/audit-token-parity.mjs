#!/usr/bin/env node
/**
 * Token parity — which design tokens each component uses in Figma, which it uses
 * in React, and where the two disagree.
 *
 * `generate-token-consumption.mjs` answers "is this family read at all" for the
 * system as a whole. This answers the per-component question, on both sides, so
 * a component that renders from `text/accent` in Figma and `link-base` in code
 * shows up instead of averaging out.
 *
 * Inputs, both produced separately because only one side can be read from disk:
 *   .tmp-token-audit/react.json   — scripts/audit-component-tokens.mjs
 *   .tmp-token-audit/figma-*.psv  — the Figma Plugin API, via the MCP snapshot
 *                                   emitted by scripts/design-lint/figma-token-audit.js
 *
 * WHAT IS AND IS NOT COMPARABLE
 * Counts are not. Figma stores a binding per variant, so Button's 77 variants
 * carry 770 space bindings where the React CVA table declares four. Comparing
 * those numbers produces a 190x "discrepancy" that means nothing. The DISTINCT
 * SET of tokens is comparable, and it is what this script diffs.
 *
 *   node scripts/audit-token-parity.mjs           # human summary
 *   node scripts/audit-token-parity.mjs --md      # markdown report
 *   node scripts/audit-token-parity.mjs --json    # raw
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const DIR = path.join(ROOT, ".tmp-token-audit")
const FAMILIES = ["color", "type", "elevation", "space", "size", "radius", "border", "motion"]

/**
 * Figma keeps the variant container as a real node, and its dashed stroke is
 * editor chrome that renders in no variant. It happens to be bound to a token,
 * so a naive sweep credits 21 form controls with consuming a categorical chart
 * color. Dropped by name because the container is the only thing that binds it.
 */
const FIGMA_CHROME_TOKENS = new Set(["viz-categorical-4"])

/**
 * Figma component -> React component, from the Code Connect files in `figma/`,
 * which are authoritative: they are what `figma.connect()` actually maps.
 *
 * The mapping is deliberately many-to-one. `Icon Button` is not its own React
 * component, it is `<Button size="icon">`, so its tokens are UNIONED into Button
 * rather than diffed separately — otherwise every icon-only token reads as a
 * Figma-only divergence. Same for the four `.Table*` parts and Table.
 *
 * A null value means the Figma component has no React counterpart on purpose:
 * Du Bois-owned chrome, or a design-only scaffold.
 */
const ALIAS = {
  // one-to-one, confirmed against figma/*.figma.tsx
  "Accordion": "Accordion", ".AccordionItem": "Accordion",
  "Alert": "Alert",
  "AlertDialog": "AlertDialog", ".AlertDialog": "AlertDialog",
  "Aspect Ratio": "AspectRatio",
  "Avatar": "Avatar",
  "Badge": "Badge",
  "Breadcrumb": "Breadcrumb", ".BreadcrumbItem": "Breadcrumb",
  "Button": "Button",
  "Card": "Card",
  "Checkbox": "Checkbox", "Checkbox Group": "Checkbox", "Checkbox Label": "Checkbox",
  "Combobox": "Combobox",
  "Dialog": "Dialog", ".DialogContent": "Dialog", ".DialogHeader": "Dialog",
  ".DialogFooter": "Dialog", ".ContentSlot": "Dialog",
  "Drawer": "Drawer",
  "Dropdown Menu": "DropdownMenu", ".DropdownMenuItem": "DropdownMenu",
  ".DropdownMenuItemContent": "DropdownMenu", ".DropdownMenuItemTrailing": "DropdownMenu",
  ".DropdownMenuRow": "DropdownMenu",
  "Editor Tabs": "EditorTabs", ".EditorTab": "EditorTabs",
  "Empty": "Empty",
  "Input": "Input",
  "Input Group": "InputGroup",
  "Key Value Pair": "KeyValuePair", ".KeyValueItem": "KeyValuePair", ".KeyValueValue": "KeyValuePair",
  "Label": "Label",
  "Page Header": "PageHeader", ".PageHeaderActions": "PageHeader", ".PageHeaderTitle": "PageHeader",
  "Pagination": "Pagination",
  "Platform Header": "PlatformHeader", ".PlatformHeaderLeft": "PlatformHeader",
  ".PlatformHeaderRight": "PlatformHeader",
  "Popover": "Popover", ".OverlayArrow": "Popover",
  "Progress Bar": "Progress", ".ProgressTrack": "Progress",
  "Segment Control": "SegmentControl", ".SegmentControlItem": "SegmentControl",
  "Select": "Select",
  "Separator": "Separator",
  "Skeleton": "Skeleton",
  "Slider": "Slider", ".SliderHandle": "Slider",
  "Spinner": "Spinner",
  "Split Button": "SplitButton",
  "Status": "Status",
  "Switch": "Switch", "Switch Label": "Switch",
  "Table": "Table", ".TableCell": "Table", ".TableCellContent": "Table",
  ".TableColumn": "Table", ".TableSortButton": "Table",
  "Tabs": "Tabs", ".TabsTrigger": "Tabs",
  "Tag": "Tag",
  "Textarea": "Textarea",
  "Tooltip": "Tooltip",
  "Data Tree": "DataTree", ".TreeNode": "DataTree",
  "Date Range": "DateRange",
  "Preview Popup": "PreviewPopup",
  "AssistantPanel": "AssistantPanel",
  "Base Shell": "Base",
  "Controls Bar": "ControlsBar", ".ControlsBarActions": "ControlsBar",
  ".ControlsBarFilters": "ControlsBar",
  "Platform Nav": "PlatformNav", ".NavbarItem": "PlatformNav", ".NavbarSection": "PlatformNav",
  ".Root switcher": "PlatformNav", ".HeaderActions": "PlatformNav", ".HoverActions": "PlatformNav",

  // many-to-one: same React component, different Figma entry point
  "Icon Button": "Button",
  "Typeahead Combobox": "Combobox",
  "Toggle Button": "Toggle",
  "Radio": "RadioGroup", "Radio Group": "RadioGroup", "Radio Label": "RadioGroup",
  "Radio tile": "RadioTile",
  "Toast": "Sonner",
  "Form Input": "Input",
  "File Tree": "FileTreeExplorer",

  // viz
  "Chart": "Chart", "Donut": "DonutChart", "Treemap": "Treemap",
  "Line series": "LineSeries", "Percentage bar": "SegmentedBar", "Bar": "BarChart",

  // deliberately unmapped
  "Header": null, "Dropzone": null, "Destination selector": null,
  ".DatabricksLogo": null, ".AppConsole": null, ".AppLakebase": null,
  ".AppLakehouse": null, ".AppOne": null, ".dbui": null, "Cursor": null,
  "Track": null, ".Track lines": null, ".Chevron": null, ".Chip": null,
  ".ActionLabel": null, ".AssetName": null, ".AssetTitle": null, ".InputContent": null,
}

/* ── read the Figma snapshot ──────────────────────────────────────────────── */

function readFigma() {
  const rows = []
  for (const f of fs.readdirSync(DIR).filter((n) => n.startsWith("figma-") && n.endsWith(".psv"))) {
    for (const line of fs.readFileSync(path.join(DIR, f), "utf8").split("\n")) {
      if (!line.trim() || line.startsWith("#") || line.startsWith("name|")) continue
      const c = line.split("|")
      if (c.length < 10) continue
      const fam = {}
      // Column order is fixed by the extractor: color type elevation space size radius border
      const order = ["color", "type", "elevation", "space", "size", "radius", "border"]
      order.forEach((k, i) => {
        const raw = (c[2 + i] || "").trim()
        const set = new Set(raw ? raw.split(/\s+/) : [])
        for (const chrome of FIGMA_CHROME_TOKENS) set.delete(chrome)
        fam[k] = set
      })
      fam.motion = new Set() // Figma has no motion collection at all
      rows.push({ name: c[0], variants: Number(c[1]) || 1, families: fam, anomalies: (c[9] || "").trim() })
    }
  }
  return rows
}

/* ── join ─────────────────────────────────────────────────────────────────── */

const figmaRows = readFigma()
const reactPath = path.join(DIR, "react.json")
if (!fs.existsSync(reactPath)) {
  console.error("Missing .tmp-token-audit/react.json — run: node scripts/audit-component-tokens.mjs")
  process.exit(1)
}
const react = JSON.parse(fs.readFileSync(reactPath, "utf8"))

/**
 * Rows that are not components but shared token sources, and the components that
 * read them. `dbui-viz/src/lib/theme.ts` holds the entire viz color ramp — 10
 * categorical stops and 8 sequential — because a Vega-Lite chart is configured
 * from a theme object rather than styled with classes. Left unmerged, all five
 * charts report zero color tokens, which is true of their `.tsx` and false of
 * the shipped component, and the Figma diff then blames React for a gap that is
 * actually Figma's.
 */
const SHARED_SOURCES = {
  Theme: ["Chart", "DonutChart", "Treemap", "LineSeries", "SegmentedBar", "BarChart"],
}
/** Library plumbing that `--include-shared-ts` surfaces as rows. Not components. */
const NOT_A_COMPONENT = new Set(["Types", "UseMeasure", "Utils", "Theme"])

const rawByName = new Map(react.components.map((c) => [c.name, c]))
for (const [source, targets] of Object.entries(SHARED_SOURCES)) {
  const src = rawByName.get(source)
  if (!src) continue
  for (const t of targets) {
    const dest = rawByName.get(t)
    if (!dest) continue
    for (const k of FAMILIES) {
      if (!dest.families[k] || !src.families[k]) continue
      const merged = new Set([...(dest.families[k].distinct || []), ...(src.families[k].distinct || [])])
      dest.families[k].distinct = [...merged].sort()
      dest.families[k].tokens += src.families[k].tokens
      dest.families[k].sharedFrom = source
    }
  }
}
react.components = react.components.filter((c) => !NOT_A_COMPONENT.has(c.name))
const reactByName = new Map(react.components.map((c) => [c.name, c]))

const norm = (s) => s.replace(/^\./, "").replace(/[^a-z0-9]/gi, "").toLowerCase()
const reactByNorm = new Map(react.components.map((c) => [norm(c.name), c]))

/** Figma rows grouped onto their React counterpart, sets unioned. */
const grouped = new Map()
const unmappedFigma = []
for (const row of figmaRows) {
  let target = ALIAS[row.name]
  if (target === undefined) {
    const guess = reactByNorm.get(norm(row.name))
    target = guess ? guess.name : undefined
  }
  if (target === null) continue // deliberately unmapped
  if (target === undefined || !reactByName.has(target)) {
    unmappedFigma.push({ figma: row.name, variants: row.variants, resolvedTo: target ?? null })
    continue
  }
  if (!grouped.has(target)) grouped.set(target, { react: reactByName.get(target), figma: [], families: {} })
  const g = grouped.get(target)
  g.figma.push(row.name)
  for (const k of FAMILIES) {
    g.families[k] = g.families[k] || new Set()
    for (const t of row.families[k] || []) g.families[k].add(t)
  }
}

const diffs = []
for (const [name, g] of grouped) {
  const per = {}
  let divergent = 0
  for (const k of FAMILIES) {
    const fset = g.families[k] || new Set()
    const rset = new Set((g.react.families[k]?.distinct) || [])
    const figmaOnly = [...fset].filter((t) => !rset.has(t)).sort()
    const reactOnly = [...rset].filter((t) => !fset.has(t)).sort()
    const shared = [...fset].filter((t) => rset.has(t)).sort()
    per[k] = {
      figmaOnly, reactOnly, shared,
      figmaCount: fset.size, reactCount: rset.size,
      reactOffScale: g.react.families[k]?.offScale || 0,
      // A family present on one side and entirely absent on the other is the
      // loudest signal: it means one implementation renders the property from a
      // token and the other renders it from nothing.
      oneSided: (fset.size === 0) !== (rset.size === 0),
    }
    if (figmaOnly.length || reactOnly.length) divergent++
  }
  diffs.push({ name, figmaComponents: g.figma, families: per, divergentFamilies: divergent, figmaAnomalies: figmaRows.filter((r) => g.figma.includes(r.name)).map((r) => r.anomalies).filter(Boolean) })
}
diffs.sort((a, b) => b.divergentFamilies - a.divergentFamilies || a.name.localeCompare(b.name))

const unmappedReact = react.components
  .filter((c) => !grouped.has(c.name))
  .map((c) => ({ react: c.name, package: c.package, tokenTotal: FAMILIES.reduce((n, k) => n + (c.families[k]?.tokens || 0), 0) }))

/* ── aggregate ────────────────────────────────────────────────────────────── */

const familyTotals = {}
for (const k of FAMILIES) {
  familyTotals[k] = {
    figmaOnly: 0, reactOnly: 0, oneSided: 0,
    reactOffScale: react.components.reduce((n, c) => n + (c.families[k]?.offScale || 0), 0),
    reactTokens: react.components.reduce((n, c) => n + (c.families[k]?.tokens || 0), 0),
  }
  for (const d of diffs) {
    familyTotals[k].figmaOnly += d.families[k].figmaOnly.length
    familyTotals[k].reactOnly += d.families[k].reactOnly.length
    if (d.families[k].oneSided) familyTotals[k].oneSided++
  }
}

const payload = { generatedAt: new Date().toISOString(), matched: diffs.length, familyTotals, diffs, unmappedFigma, unmappedReact }

if (process.argv.includes("--json")) {
  console.log(JSON.stringify(payload, null, 2))
  process.exit(0)
}

if (process.argv.includes("--md")) {
  console.log("## Token parity, Figma vs React\n")
  console.log(`${diffs.length} components matched. Counts are not compared — only the distinct token set is.\n`)
  console.log("| Family | React tokens | Figma-only names | React-only names | One-sided components | React off-scale uses |")
  console.log("|---|---|---|---|---|---|")
  for (const k of FAMILIES) {
    const t = familyTotals[k]
    console.log(`| ${k} | ${t.reactTokens} | ${t.figmaOnly} | ${t.reactOnly} | ${t.oneSided} | ${t.reactOffScale} |`)
  }
  console.log("\n### Per component\n")
  for (const d of diffs) {
    if (!d.divergentFamilies) continue
    console.log(`#### ${d.name}  \nFigma: ${d.figmaComponents.join(", ")}\n`)
    console.log("| Family | Only in Figma | Only in React |")
    console.log("|---|---|---|")
    for (const k of FAMILIES) {
      const f = d.families[k]
      if (!f.figmaOnly.length && !f.reactOnly.length) continue
      console.log(`| ${k}${f.oneSided ? " **(one-sided)**" : ""} | ${f.figmaOnly.join(" ") || "—"} | ${f.reactOnly.join(" ") || "—"} |`)
    }
    if (d.figmaAnomalies.length) console.log(`\nFigma anomalies: ${d.figmaAnomalies.join(" · ")}`)
    console.log()
  }
  process.exit(0)
}

console.log(`matched ${diffs.length} components · ${unmappedFigma.length} Figma unmapped · ${unmappedReact.length} React unmapped\n`)
console.log("family      reactTokens  figmaOnly  reactOnly  oneSided  reactOffScale")
for (const k of FAMILIES) {
  const t = familyTotals[k]
  console.log(
    `${k.padEnd(11)} ${String(t.reactTokens).padStart(11)} ${String(t.figmaOnly).padStart(10)} ${String(t.reactOnly).padStart(10)} ${String(t.oneSided).padStart(9)} ${String(t.reactOffScale).padStart(14)}`
  )
}
console.log("\nmost divergent components")
for (const d of diffs.slice(0, 18)) {
  const worst = FAMILIES.filter((k) => d.families[k].figmaOnly.length || d.families[k].reactOnly.length)
  console.log(`  ${d.name.padEnd(18)} ${d.divergentFamilies} families: ${worst.join(", ")}`)
}
console.log("\none-sided families (a token family used on exactly one side)")
for (const d of diffs) {
  for (const k of FAMILIES) {
    const f = d.families[k]
    if (!f.oneSided) continue
    const side = f.figmaCount ? "Figma only" : "React only"
    console.log(`  ${d.name.padEnd(18)} ${k.padEnd(10)} ${side}`)
  }
}
if (unmappedFigma.length) {
  console.log("\nFigma components with no React match")
  for (const u of unmappedFigma) console.log(`  ${u.figma}`)
}
if (unmappedReact.length) {
  console.log("\nReact components with no Figma match")
  for (const u of unmappedReact) console.log(`  ${u.react.padEnd(22)} ${u.package} · ${u.tokenTotal} tokens`)
}
