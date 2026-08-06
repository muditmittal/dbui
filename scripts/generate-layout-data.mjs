#!/usr/bin/env node
/**
 * Emits the measured half of the portal's Layout page.
 *
 * The Layout guide states rules. A rule that quotes a width or an inset goes
 * stale the first time someone edits the component, and the six documentation
 * failures this repo has had were all a restated value. So every number the page
 * shows is read out of the file that owns it, here, at build time — and the
 * page renders the file path beside it so a reader can go argue with the source
 * rather than with the prose.
 *
 * Each probe is named and asserted. If a class string changes shape the
 * generator fails loudly instead of quietly emitting null, because a layout
 * fact that silently disappears is worse than one that is wrong.
 *
 *   node scripts/generate-layout-data.mjs
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const OUT = path.join(ROOT, "apps/portal/src/components/layout-data.ts")

const read = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8")

const problems = []

/**
 * Pull the class string that follows a marker in a file.
 *
 * Anchored on a marker rather than on a component name because these files
 * write their classes three different ways — a `cn()` call, a template literal
 * and a plain attribute — and one regex over the whole file would match the
 * first of them regardless of which component it belonged to.
 */
function classesAfter(rel, marker, { window = 400 } = {}) {
  const source = read(rel)
  const at = source.indexOf(marker)
  if (at === -1) {
    problems.push(`${rel}: marker not found — ${marker}`)
    return []
  }
  const slice = source.slice(at, at + window)
  // Both quoting styles: these files write classes as a plain attribute and as a
  // template literal, and matching only one silently skips half the shells.
  const quoted = slice.match(
    /["`]([^"`\n]*(?:flex|grid|overflow|w-|h-|px-|py-|gap-)[^"`\n]*)["`$]/
  )
  if (!quoted) {
    problems.push(`${rel}: no class string within ${window} chars of ${marker}`)
    return []
  }
  return quoted[1].split(/\s+/).filter(Boolean)
}

/** Keep only the classes a layout rule can be stated against. */
const LAYOUT_CLASS =
  /^(flex|grid|block|h-|min-h-|max-h-|w-|min-w-|max-w-|size-|px-|py-|p-|pl-|pr-|pt-|pb-|gap-|overflow|shrink|grow|flex-1|sticky|fixed|absolute|relative|justify-|items-|border-r|border-l|border-t|border-b|rounded)/

const keep = (classes) => classes.filter((c) => LAYOUT_CLASS.test(c))

/**
 * The regions a page is assembled from, in the order they stack. `component` is
 * the export a page reaches for; `classes` is what that export actually sets, so
 * the page can show the inset without anyone typing it.
 */
const REGIONS = [
  {
    id: "platform-header",
    label: "Platform header",
    component: "PlatformHeader",
    file: "packages/dbui-shells/src/components/PlatformHeader.tsx",
    marker: "<header className=",
    scope: "frame",
  },
  {
    id: "product-nav",
    label: "Product nav",
    component: "PlatformNav",
    file: "packages/dbui-shells/src/components/PlatformNav.tsx",
    marker: "<nav className=",
    scope: "frame",
  },
  {
    id: "content-surface",
    label: "Content surface",
    component: "Base",
    file: "packages/dbui-shells/src/shells/Base.tsx",
    marker: "<main className=",
    scope: "frame",
  },
  {
    id: "page-header",
    label: "Page header",
    component: "PageHeader",
    file: "packages/dbui/src/components/ui/page-header.tsx",
    marker: 'data-slot="page-header"',
    scope: "region",
  },
  {
    id: "controls-bar",
    label: "Controls bar",
    component: "ControlsBar",
    file: "packages/dbui/src/components/ui/controls-bar.tsx",
    marker: 'data-slot="controls-bar"',
    scope: "region",
  },
]

/**
 * Panels, by the edge they dock to. The edge is the fact worth publishing: it
 * is what the guide's rules are keyed on, and a panel that moves edge breaks
 * every rule about it at once.
 */
const PANELS = [
  {
    id: "product-nav",
    label: "Product nav",
    edge: "left",
    component: "PlatformNav",
    file: "packages/dbui-shells/src/components/PlatformNav.tsx",
    marker: "<nav className=",
    holds: "Where you are in the product",
  },
  {
    id: "tree-rail",
    label: "Tree rail",
    edge: "left",
    component: "CatalogTree",
    file: "packages/dbui-shells/src/shells/CatalogExplorer.tsx",
    marker: "<aside",
    holds: "Where you are inside one hierarchy",
  },
  {
    id: "assistant",
    label: "Assistant panel",
    edge: "right",
    component: "AssistantPanel",
    file: "packages/dbui-shells/src/components/AssistantPanel.tsx",
    marker: "export function AssistantPanel",
    holds: "A conversation about what is on screen",
  },
]

/**
 * Every container in the shell package that owns a vertical scroll, found by
 * scanning rather than listed, so a second one added to a shell shows up here
 * instead of quietly breaking the one-scroll rule.
 */
function scrollOwners() {
  const dir = path.join(ROOT, "packages/dbui-shells/src")
  const found = new Map()
  const walk = (d) => {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (entry.name.endsWith(".tsx")) {
        const rel = path.relative(ROOT, full)
        for (const line of read(rel).split("\n")) {
          if (!/overflow-y-auto|overflow-auto/.test(line)) continue
          const raw = line.match(/["`]([^"`\n]*overflow-[^"`\n]*)["`$]/)?.[1] ?? line
          const classes = keep(raw.split(/\s+/)).join(" ")
          // Capped by a max height, so it can never take a column's scroll — a
          // menu or a popover. Everything else is sized by its parent and owns
          // the scroll of the one column it fills.
          const kind = /max-h-/.test(classes) ? "bounded" : "column"
          found.set(`${rel}|${classes}`, { file: rel, classes, kind })
        }
      }
    }
  }
  walk(dir)
  return [...found.values()]
}

/**
 * What the spacing rules are actually stated against. The `space` family in
 * `theme.config.mjs` generates `--db-space-*` and nothing reads it; components
 * space themselves with Tailwind's `--spacing`. The guide has to say which one
 * a rule applies to, so it reads both out of the consumption measurement rather
 * than asserting either.
 */
function spacingBasis() {
  const source = read("apps/portal/src/stories/tokens/token-consumption.ts")

  const family = source.match(
    /\{\s*"key":\s*"space",[\s\S]*?"tokens":\s*(\d+),[\s\S]*?"live":\s*(true|false)\s*\}/
  )
  const namespace = source.match(
    /\{\s*"namespace":\s*"--spacing",[\s\S]*?"tailwindValue":\s*("[^"]*"|null),[\s\S]*?"origin":\s*"([^"]+)",\s*"uses":\s*(\d+),\s*"files":\s*(\d+)\s*\}/
  )

  if (!family) problems.push("token-consumption.ts: no space family entry")
  if (!namespace) problems.push("token-consumption.ts: no --spacing namespace entry")

  return {
    tokenFamily: {
      name: "--db-space-*",
      tokens: family ? Number(family[1]) : 0,
      live: family ? family[2] === "true" : false,
    },
    utility: {
      name: "--spacing",
      value: namespace ? JSON.parse(namespace[1]) : null,
      origin: namespace ? namespace[2] : "unknown",
      uses: namespace ? Number(namespace[3]) : 0,
      files: namespace ? Number(namespace[4]) : 0,
    },
  }
}

/**
 * Whether the app frame can scroll at all. Probed rather than asserted because
 * it is the one fact every scroll rule below depends on: if `Base` ever loses
 * `overflow-hidden`, every column gains a second scrollbar and no rule on the
 * page is true any more.
 */
function frameScroll() {
  const classes = keep(classesAfter("packages/dbui-shells/src/shells/Base.tsx", "<div className="))
  return {
    file: "packages/dbui-shells/src/shells/Base.tsx",
    classes,
    scrolls: !classes.includes("overflow-hidden"),
  }
}

/** Which shells `composition.md` defines against which ones ship a module. */
function shellCoverage() {
  const index = read("packages/dbui-shells/src/index.ts")
  const exported = [...index.matchAll(/export \{([^}]+)\} from "\.\/(?:shells|compositions)\//g)]
    .flatMap((m) => m[1].split(",").map((s) => s.trim()))
    .filter(Boolean)
  return { modules: exported.sort() }
}

const regions = REGIONS.map((r) => ({
  id: r.id,
  label: r.label,
  component: r.component,
  file: r.file,
  scope: r.scope,
  classes: keep(classesAfter(r.file, r.marker)),
}))

const panels = PANELS.map((p) => {
  const classes = keep(classesAfter(p.file, p.marker))
  return {
    id: p.id,
    label: p.label,
    edge: p.edge,
    component: p.component,
    file: p.file,
    holds: p.holds,
    width: classes.find((c) => /^w-/.test(c)) ?? null,
    classes,
  }
})

const data = {
  regions,
  panels,
  scrollOwners: scrollOwners(),
  frame: frameScroll(),
  spacing: spacingBasis(),
  shells: shellCoverage(),
}

for (const region of regions) {
  if (region.classes.length === 0) problems.push(`${region.id}: no layout classes`)
}
for (const panel of panels) {
  if (!panel.width) problems.push(`${panel.id}: no width class`)
}

if (problems.length) {
  console.error("generate-layout-data: probes failed\n" + problems.map((p) => `  ${p}`).join("\n"))
  process.exit(1)
}

fs.writeFileSync(
  OUT,
  `// Generated by scripts/generate-layout-data.mjs — do not edit by hand.
// Every value is read out of the file named beside it, so the Layout page
// cannot quote an inset, a width or a scroll owner the source does not have.

export type Region = {
  id: string
  label: string
  component: string
  file: string
  /** frame = present on every page · region = stacked inside the content surface */
  scope: "frame" | "region"
  classes: string[]
}

export type Panel = {
  id: string
  label: string
  edge: "left" | "right" | "bottom"
  component: string
  file: string
  holds: string
  width: string | null
  classes: string[]
}

export type ScrollOwner = {
  file: string
  classes: string
  /** bounded = capped by max-h, a menu · column = sized by its parent, owns one column */
  kind: "bounded" | "column"
}

export type Spacing = {
  tokenFamily: { name: string; tokens: number; live: boolean }
  utility: { name: string; value: string | null; origin: string; uses: number; files: number }
}

export const regions: Region[] = ${JSON.stringify(data.regions, null, 2)}

export const panels: Panel[] = ${JSON.stringify(data.panels, null, 2)}

export const scrollOwners: ScrollOwner[] = ${JSON.stringify(data.scrollOwners, null, 2)}

/** The app frame. \`scrolls: false\` is what makes every rule below hold. */
export const frame: { file: string; classes: string[]; scrolls: boolean } = ${JSON.stringify(data.frame, null, 2)}

export const spacing: Spacing = ${JSON.stringify(data.spacing, null, 2)}

/** What \`dbui-shells\` exports today, against the shells composition.md defines. */
export const shellModules: string[] = ${JSON.stringify(data.shells.modules, null, 2)}
`
)

console.log(`wrote ${path.relative(ROOT, OUT)}`)
console.log(`  ${regions.length} regions · ${panels.length} panels · ${data.scrollOwners.length} scroll owners`)
console.log(`  spacing: ${data.spacing.tokenFamily.name} live=${data.spacing.tokenFamily.live} · ${data.spacing.utility.name}=${data.spacing.utility.value} (${data.spacing.utility.uses} uses)`)
