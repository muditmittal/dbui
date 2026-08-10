#!/usr/bin/env node
/**
 * measure-dimensional-usage — what the product actually asks of the
 * dimensional scales, so a proposed scale can be sized against reality rather
 * than against taste.
 *
 * `packages/dbui/docs/token-simplification.md` proposes constraining Tailwind's
 * `--spacing` key to a finite set of steps. That key feeds padding, margin,
 * gap, inset, translate, width, height, min/max, scroll offset, basis and
 * indent from one pool — verified in `verify-spacing-scale.mjs` — so the
 * question "how big must the scale be" cannot be answered per property. This
 * file answers it by counting.
 *
 * Three axes are reported separately, because they are the three the proposal
 * wants to split apart:
 *   SPACING  padding, margin, gap and friends — the tight set
 *   HEIGHT   h-*, min-h-*, max-h-* — control heights plus a few containers
 *   WIDTH    w-*, min-w-*, max-w-* — rails, panels and measures
 *
 * Also emits the token inventory (every shipped --db-* with its resolved px at
 * a 16px root), the shadow and transition call sites behind the elevation and
 * motion proposals, and the control-height scan behind the lint rule.
 *
 *   node scripts/measure-dimensional-usage.mjs           # human summary
 *   node scripts/measure-dimensional-usage.mjs --md      # markdown tables
 *   node scripts/measure-dimensional-usage.mjs --json    # raw
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const rel = (p) => path.relative(ROOT, p).split(path.sep).join("/")
const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8")

const SKIP = new Set(["node_modules", ".next", "dist", "archive", ".git", "storybook-static"])
/** Generated or data-bearing files. A token name inside one is plumbing, not use. */
const NOT_SOURCE = new Set([
  "packages/dbui/src/tokens/tokens.css",
  "packages/dbui/src/tokens/type.css",
  "packages/dbui/src/tokens/theme.config.mjs",
  "apps/portal/src/stories/tokens/token-data.ts",
  "apps/portal/src/stories/tokens/token-consumption.ts",
  "apps/portal/src/components/layout-data.ts",
])

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(e.name)) continue
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else if (/\.(tsx?|css|mjs|js)$/.test(e.name)) out.push(p)
  }
  return out
}

/** The shipped design system. Portal is docs, and a swatch is not a consumer. */
const SYSTEM = ["packages/dbui/src", "packages/dbui-shells/src", "packages/dbui-viz/src", "packages/dbui-chat/src"]
const files = SYSTEM.flatMap((r) => walk(path.join(ROOT, r))).map(rel).filter((f) => !NOT_SOURCE.has(f))

const cache = new Map()
/** Comments stripped — a JSDoc example is documentation, not a call site. */
function code(f) {
  if (!cache.has(f)) cache.set(f, read(f).replace(/\/\*[\s\S]*?\*\//g, "").replace(/^[ \t]*\/\/.*$/gm, ""))
  return cache.get(f)
}

/** Class-ish tokens out of every quoted literal, variant prefixes removed. */
function* classes(f) {
  for (const m of code(f).matchAll(/(["'`])([^"'`\n]*?)\1/g)) {
    for (const raw of m[2].split(/\s+/)) {
      if (!raw) continue
      // `data-[size=sm]:h-6` and `group-hover/x:p-2` both carry a real utility.
      const cls = raw.replace(/^(?:[^:\s]+:)+/, "").replace(/^!|!$/g, "")
      if (cls) yield { cls, raw }
    }
  }
}

/* ── the three dimensional axes ───────────────────────────────────────────── */

const AXES = [
  {
    key: "spacing",
    label: "Spacing",
    // Everything that positions or insets. These want the tight set.
    prefixes: [
      "p", "px", "py", "pt", "pr", "pb", "pl", "ps", "pe",
      "m", "mx", "my", "mt", "mr", "mb", "ml", "ms", "me",
      "gap", "gap-x", "gap-y", "space-x", "space-y",
      "inset", "inset-x", "inset-y", "top", "right", "bottom", "left", "start", "end",
      "translate-x", "translate-y", "scroll-m", "scroll-p", "indent", "basis",
    ],
  },
  { key: "height", label: "Height", prefixes: ["h", "min-h", "max-h"] },
  { key: "width", label: "Width", prefixes: ["w", "min-w", "max-w"] },
  // size-* sets both, so it lands in its own bucket rather than double-counting.
  { key: "size", label: "Size (w+h)", prefixes: ["size"] },
]

const PREFIX_TO_AXIS = new Map()
for (const a of AXES) for (const p of a.prefixes) PREFIX_TO_AXIS.set(p, a.key)
// Longest prefix first, so `min-h-7` is not read as `min` + `h-7`.
const PREFIXES = [...PREFIX_TO_AXIS.keys()].sort((a, b) => b.length - a.length)

/** `-mt-3` → { prefix: "mt", step: "3", negative: true }. Null if not on the scale. */
function parseDimensional(cls) {
  const negative = cls.startsWith("-")
  const body = negative ? cls.slice(1) : cls
  for (const prefix of PREFIXES) {
    if (!body.startsWith(prefix + "-")) continue
    const step = body.slice(prefix.length + 1)
    return { prefix, step, negative, axis: PREFIX_TO_AXIS.get(prefix) }
  }
  return null
}

/** Numeric steps are the only ones the scale governs. `full`, `auto`, `px` are keywords. */
const isNumeric = (step) => /^\d+(\.\d+)?$/.test(step)
const isBracket = (step) => step.startsWith("[") || step.startsWith("(")
const pxOf = (step) => parseFloat(step) * 4
/** Steps ascend numerically, so a reader can see where the gaps fall. */
const sortNumM = (m) => [...m.entries()].sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]))
const sortNum = sortNumM

const usage = Object.fromEntries(AXES.map((a) => [a.key, { numeric: new Map(), keyword: new Map(), bracket: new Map() }]))
const sites = new Map() // "axis|prefix-step" → Set(file)

for (const f of files) {
  for (const { cls } of classes(f)) {
    const d = parseDimensional(cls)
    if (!d) continue
    const bucket = usage[d.axis]
    const kind = isNumeric(d.step) ? "numeric" : isBracket(d.step) ? "bracket" : "keyword"
    const key = isNumeric(d.step) ? d.step : cls
    bucket[kind].set(key, (bucket[kind].get(key) || 0) + 1)
    const sk = `${d.axis}|${cls}`
    if (!sites.has(sk)) sites.set(sk, new Set())
    sites.get(sk).add(f)
  }
}

/* ── the token inventory, read out of the shipped CSS ─────────────────────── */

const tokensCss = read("packages/dbui/src/tokens/tokens.css")
/** Only the :root block — the .dark block restates the same color names. */
const rootBlock = tokensCss.slice(tokensCss.indexOf(":root {"), tokensCss.indexOf(".dark {"))
const darkBlock = tokensCss.slice(tokensCss.indexOf(".dark {"))
const shipped = [...rootBlock.matchAll(/^\s*(--db-[a-z0-9-]+):\s*([^;]+);/gm)].map((m) => ({ name: m[1], value: m[2].trim() }))
const darkValues = Object.fromEntries(
  [...darkBlock.matchAll(/^\s*(--db-[a-z0-9-]+):\s*([^;]+);/gm)].map((m) => [m[1], m[2].trim()])
)

/**
 * The resolved px at a 16px root with every scalar at 1. The config authors in
 * px and the generator converts to rem, so a table that prints the calc() makes
 * the reader do that arithmetic back. Scalars are unitless and stay as-is.
 */
function resolvePx(value) {
  if (/^0$/.test(value)) return "0px"
  const rem = value.match(/^calc\((-?[\d.]+)rem \* var\(--db-(?:type|sizing)-scalar\)\)$/)
  if (rem) return `${parseFloat(rem[1]) * 16}px`
  const plain = value.match(/^(-?[\d.]+)rem$/)
  if (plain) return `${parseFloat(plain[1]) * 16}px`
  const px = value.match(/^(-?[\d.]+)px$/)
  if (px) return `${parseFloat(px[1])}px`
  // Space tokens: calc(unit * N * spacing * density) — unit is 0.25rem = 4px.
  const space = value.match(/^calc\(var\(--db-spacing-unit\) \* ([\d.]+) \*/)
  if (space) return `${parseFloat(space[1]) * 4}px`
  return null
}

const FAMILY = [
  ["scalar", /^--db-(spacing-unit|density-scalar|spacing-scalar|sizing-scalar|type-scalar)$/],
  ["space", /^--db-space-/],
  ["radius", /^--db-radius-/],
  ["type", /^--db-(font|line-height|letter-spacing|mono-font)/],
  ["size", /^--db-size-/],
  ["border-width", /^--db-border-width-/],
  ["motion", /^--db-(duration|ease)-/],
  ["elevation", /^--db-elevation-/],
]
const familyOf = (n) => FAMILY.find(([, re]) => re.test(n))?.[0] ?? "color"

const inventory = shipped.map((t) => ({
  ...t,
  family: familyOf(t.name),
  px: resolvePx(t.value),
  dark: darkValues[t.name] ?? null,
}))

const byFamily = {}
for (const t of inventory) (byFamily[t.family] ||= []).push(t)

/* ── shadow, transition and radius call sites ─────────────────────────────── */

function tally(re) {
  const counts = new Map()
  const where = new Map()
  for (const f of files) {
    for (const { cls } of classes(f)) {
      if (!re.test(cls)) continue
      counts.set(cls, (counts.get(cls) || 0) + 1)
      if (!where.has(cls)) where.set(cls, new Set())
      where.get(cls).add(f)
    }
  }
  return [...counts.entries()]
    .map(([cls, n]) => ({ cls, n, files: [...where.get(cls)] }))
    .sort((a, b) => b.n - a.n)
}

const shadows = tally(/^(shadow|inset-shadow|drop-shadow)(-|$)/)
const transitions = tally(/^transition(-|$)/)
const durations = tally(/^(duration|ease|delay)(-|$)/)
const radii = tally(/^rounded(-|$)/)
const borders = tally(/^(border|divide)(-(x|y|t|r|b|l|s|e))?(-(0|2|4|8))?$/)

/* ── control heights, for the lint rule ───────────────────────────────────── */

/**
 * The components the rule would police, and the height each currently renders.
 * Read from source rather than listed, so a component that changes size shows
 * up here instead of quietly falsifying the doc.
 *
 * A control is something a pointer targets. A badge, a separator and an icon
 * are sized but not targeted, and folding them in would make the approved set
 * meaningless.
 */
const CONTROL_FILES = [
  "packages/dbui/src/lib/button-variants.ts",
  "packages/dbui/src/components/ui/input.tsx",
  "packages/dbui/src/components/ui/select.tsx",
  "packages/dbui/src/components/ui/combobox.tsx",
  "packages/dbui/src/components/ui/checkbox.tsx",
  "packages/dbui/src/components/ui/switch.tsx",
  "packages/dbui/src/components/ui/toggle.tsx",
  "packages/dbui/src/components/ui/segment-control.tsx",
  "packages/dbui/src/components/ui/avatar.tsx",
  "packages/dbui/src/components/ui/table.tsx",
  "packages/dbui/src/components/ui/data-tree.tsx",
  "packages/dbui/src/components/ui/file-tree.tsx",
  "packages/dbui/src/components/ui/dropdown-menu.tsx",
  "packages/dbui/src/components/ui/context-menu.tsx",
  "packages/dbui/src/components/ui/menubar.tsx",
  "packages/dbui/src/components/ui/textarea.tsx",
  "packages/dbui/src/components/ui/tabs.tsx",
  "packages/dbui/src/components/ui/editor-tabs.tsx",
]

const APPROVED = new Set([24, 28, 32])

/**
 * A height inside an `[&_svg]:` or `[&>svg]:` variant sizes an icon, not the
 * control around it. Counting those made 16px look like the most common
 * control height in the system when it is really `size-4` on 26 chevrons.
 */
const ICON_SCOPED = /(svg|\[&[^\]]*svg)/i
/** `after:` and `before:` size a pseudo-element decoration, not the control. */
const PSEUDO = /^(after|before|placeholder|file|first-letter):/

/**
 * `h-*` and `min-h-*` are the only reliable control-height signal in this
 * codebase. `size-*` is not: 81 of its 141 uses are `size-4` on an icon, often
 * written bare on the icon element where no variant marks it as such. Folding
 * the two together reported 16px as the most common control height in the
 * system, which is false — it is the most common icon size. They are counted
 * apart, and the square-control cases are listed rather than inferred.
 */
const controlHeights = []
const squareElements = []
for (const f of CONTROL_FILES.filter((f) => fs.existsSync(path.join(ROOT, f)))) {
  for (const { cls, raw } of classes(f)) {
    const variant = raw.slice(0, raw.length - cls.length)
    if (ICON_SCOPED.test(variant) || PSEUDO.test(variant)) continue
    const d = parseDimensional(cls)
    if (!d) continue
    if (d.prefix === "max-h") continue // a ceiling, not a control height
    const px = isNumeric(d.step) ? pxOf(d.step) : null
    if (d.axis === "size") {
      squareElements.push({ file: f, cls: raw, px })
      continue
    }
    if (d.axis !== "height") continue
    if (px === null) {
      if (isBracket(d.step)) controlHeights.push({ file: f, cls: raw, px: null, onSet: false, kind: "bracket" })
      continue
    }
    controlHeights.push({ file: f, cls: raw, px, onSet: APPROVED.has(px), kind: d.prefix })
  }
}
const offSet = controlHeights.filter((h) => !h.onSet)
const offSetByPx = new Map()
for (const h of offSet) {
  const k = h.px === null ? "arbitrary" : `${h.px}px`
  if (!offSetByPx.has(k)) offSetByPx.set(k, [])
  offSetByPx.get(k).push(h)
}
const squareByPx = new Map()
for (const s of squareElements) {
  const k = s.px === null ? "arbitrary" : `${s.px}px`
  if (!squareByPx.has(k)) squareByPx.set(k, [])
  squareByPx.get(k).push(s)
}

/* ── what the lint rule would actually catch ──────────────────────────────── */

/**
 * The rule lives in `checkClassName`, which only ever sees a JSX attribute in a
 * `.tsx` file under the linter's default roots. It therefore polices consumers
 * applying a height to a DBUI control — not the control's own variant table,
 * which lives in `.ts` CVA config the linter never parses. Measuring the two
 * separately is the difference between "36 violations" and "8".
 */
const LINT_ROOTS = ["apps/portal/src", "packages/dbui-shells/src"]
const dbuiComponents = JSON.parse(read("scripts/design-lint/dbui-components.json"))
/** Controls only. A height on <Card> is layout, and the rule must not fire. */
const INTERACTIVE = new Set([
  "Button", "SplitButton", "ButtonGroup", "Input", "InputGroup", "Textarea", "Select", "SelectTrigger",
  "NativeSelect", "Combobox", "ComboboxInput", "Checkbox", "Switch", "Toggle", "ToggleGroup",
  "SegmentControl", "SegmentControlItem", "Avatar", "AvatarGroup", "TableRow", "TableHead", "TableCell",
  "DropdownMenuItem", "ContextMenuItem", "MenubarItem", "SelectItem", "ComboboxItem", "TabsTrigger",
  "EditorTab", "DataTreeItem", "FileTreeItem", "Slider", "RadioGroupItem",
])

let lintScope = []
try {
  const { Project, SyntaxKind } = await import("ts-morph")
  const project = new Project({ skipFileDependencyResolution: true })
  const tsxFiles = LINT_ROOTS.flatMap((r) => walk(path.join(ROOT, r)))
    .filter((f) => f.endsWith(".tsx") && !f.endsWith(".d.ts"))
  for (const f of tsxFiles) project.addSourceFileAtPath(f)

  for (const sf of project.getSourceFiles()) {
    const file = rel(sf.getFilePath())
    sf.forEachDescendant((node) => {
      const kind = node.getKind()
      if (kind !== SyntaxKind.JsxOpeningElement && kind !== SyntaxKind.JsxSelfClosingElement) return
      const el = node.asKind(kind)
      const tag = el.getTagNameNode().getText()
      if (!INTERACTIVE.has(tag)) return
      for (const attr of el.getAttributes()) {
        if (attr.getKind() !== SyntaxKind.JsxAttribute) continue
        const ja = attr.asKind(SyntaxKind.JsxAttribute)
        if (ja.getNameNode().getText() !== "className") continue
        const init = ja.getInitializer()
        if (!init) continue
        const text = init.getText()
        for (const raw of text.replace(/["'`{}]/g, " ").split(/\s+/)) {
          const c = raw.replace(/^(?:[^:\s]+:)+/, "")
          const d = parseDimensional(c)
          if (!d || (d.axis !== "height" && d.axis !== "size") || d.prefix === "max-h") continue
          const px = isNumeric(d.step) ? pxOf(d.step) : null
          const { line } = sf.getLineAndColumnAtPos(el.getStart())
          lintScope.push({ file, line, tag, cls: c, px, onSet: px !== null && APPROVED.has(px) })
        }
      }
    })
  }
} catch (e) {
  lintScope = null
}

/* ── migration cost of a candidate scale ──────────────────────────────────── */

/**
 * The proposal is only affordable if the number of call sites it breaks is
 * known. A step that is not in the scale does not render wrong — it renders
 * nothing — so every one of these is a visible regression on the day it lands.
 *
 * Steps are the multiple of the 4px unit, matching how the config already
 * thinks and how the class already reads. `--height-*` is additive: a height
 * step that is also a spacing step needs no declaration, because h-* falls
 * through to --spacing-* when --height-* does not define it.
 */
const PROPOSED = {
  spacing: [0, 0.5, 1, 2, 3, 4, 6, 8, 12],
  // Only the steps spacing refuses. 6 and 8 arrive by fall-through.
  heightExtra: [5, 7, 10, 12, 14],
  sizeExtra: [3.5, 5, 10],
}

function cost(axis, allowed) {
  const u = usage[axis].numeric
  const kept = []
  const broken = []
  for (const [step, n] of u) {
    const s = parseFloat(step)
    ;(allowed.includes(s) ? kept : broken).push({ step: s, px: s * 4, n })
  }
  kept.sort((a, b) => a.step - b.step)
  broken.sort((a, b) => b.n - a.n)
  return { kept, broken, keptUses: kept.reduce((t, k) => t + k.n, 0), brokenUses: broken.reduce((t, k) => t + k.n, 0) }
}

const migration = {
  spacing: cost("spacing", PROPOSED.spacing),
  height: cost("height", [...PROPOSED.spacing, ...PROPOSED.heightExtra]),
  size: cost("size", [...PROPOSED.spacing, ...PROPOSED.sizeExtra]),
  width: cost("width", PROPOSED.spacing),
}

/** Which prefixes write an off-scale step, so a fix can be scoped. */
function prefixesFor(axis, step) {
  const out = new Map()
  for (const f of files) {
    for (const { cls } of classes(f)) {
      const d = parseDimensional(cls)
      if (!d || d.axis !== axis || d.step !== String(step)) continue
      out.set(d.prefix, (out.get(d.prefix) || 0) + 1)
    }
  }
  return [...out.entries()].sort((a, b) => b[1] - a[1])
}

/* ── residue the cleanup does not touch ───────────────────────────────────── */

const LITERAL = /-\[[-\d.]+(px|rem)\]/
const literals = []
for (const f of files) {
  const local = new Set()
  for (const { cls } of classes(f)) if (LITERAL.test(cls)) local.add(cls)
  if (local.size) literals.push({ file: f, classes: [...local] })
}
literals.sort((a, b) => b.classes.length - a.classes.length)

/* ── the proposal, declared once so the table cannot drift from it ────────── */

/**
 * Disposition per shipped token. `to` is the name after, `note` says why.
 * Anything not listed here is unchanged, which is what lets the emitted table
 * claim to be complete: it is generated by diffing this map against the CSS,
 * so a token that starts shipping and is not accounted for shows up as a gap.
 */
const PLAN = {
  // Scalars — two of the five drive nothing and never have.
  "--db-spacing-unit": { verb: "keep", note: "the grid unit every numeric step multiplies" },
  "--db-density-scalar": { verb: "keep", note: "the dial the requirement names — 12px to 14.4px at 1.2" },
  "--db-spacing-scalar": { verb: "delete", note: "drives space only, and space is re-expressed against density alone" },
  "--db-sizing-scalar": { verb: "delete", note: "drives size only, and never reached a utility" },
  "--db-type-scalar": { verb: "keep", note: "live — the type ramp reads it" },

  // Space — named steps become numeric steps keyed to the multiple.
  "--db-space-0": { verb: "rename", to: "--db-space-0" },
  // The Tailwind key must be `--spacing-0\.5` because the key is the class
  // name. The token it points at does not have to carry the escape.
  "--db-space-3xs": { verb: "rename", to: "--db-space-0-5", note: "the `p-0.5` class, without a backslash in the portable name" },
  "--db-space-2xs": { verb: "rename", to: "--db-space-1" },
  "--db-space-xs": { verb: "rename", to: "--db-space-2" },
  "--db-space-sm": { verb: "rename", to: "--db-space-3" },
  "--db-space-md": { verb: "rename", to: "--db-space-4" },
  "--db-space-lg": { verb: "rename", to: "--db-space-6" },
  "--db-space-xl": { verb: "rename", to: "--db-space-8" },
  "--db-space-2xl": { verb: "rename", to: "--db-space-12" },
  "--db-space-inline-xs": { verb: "delete", note: "em-relative, zero consumers" },
  "--db-space-inline-sm": { verb: "delete", note: "em-relative, zero consumers" },

  // Size — splits by the axis it governs, because Tailwind reads them apart.
  "--db-size-element-sm": { verb: "rename", to: "--db-height-6", note: "24px control" },
  "--db-size-element-md": { verb: "rename", to: "--db-height-8", note: "32px control" },
  "--db-size-icon-xs": { verb: "delete", note: "12px arrives from --db-space-3 by fall-through" },
  "--db-size-icon-sm": { verb: "rename", to: "--db-size-3.5", note: "14px is not a spacing step" },
  "--db-size-icon-md": { verb: "delete", note: "16px arrives from --db-space-4 by fall-through" },
  "--db-size-icon-lg": { verb: "rename", to: "--db-size-5", note: "20px is not a spacing step" },
  "--db-size-icon-xl": { verb: "delete", note: "24px arrives from --db-space-6 by fall-through" },

  // Border width — kept, and finally bridged.
  "--db-border-width-none": { verb: "keep", note: "bridged to --border-width-none" },
  "--db-border-width-thin": { verb: "keep", note: "bridged to --default-border-width, so a bare `border` is ours" },
  "--db-border-width-thick": { verb: "keep", note: "bridged to --border-width-thick" },

  // Motion — six durations to three, and the easing finally reaches a class.
  "--db-duration-fast-min": { verb: "delete", note: "band member, zero consumers" },
  "--db-duration-fast": { verb: "revalue", to: "--db-duration-fast", after: "150ms", note: "175ms to 150ms" },
  "--db-duration-fast-max": { verb: "delete", note: "band member, zero consumers" },
  "--db-duration-medium-min": { verb: "delete", note: "band member, zero consumers" },
  "--db-duration-medium": { verb: "revalue", to: "--db-duration-default", after: "300ms", note: "410ms to 300ms, and becomes the Tailwind default" },
  "--db-duration-medium-max": { verb: "delete", note: "band member, zero consumers" },
  "--db-ease-standard": { verb: "keep", note: "bridged to --ease-standard, which mints the class" },

  // Elevation — SHIPPED, and onto DuBois's values rather than Tailwind's. This
  // entry proposed adopting whatever already rendered; the decision went the
  // other way, so the names below are the ones that shipped and the values come
  // from the production DuBois library. Kept so the measurement still resolves.
  "--db-elevation-0": { verb: "delete", note: "shadow-none is a Tailwind keyword and needs no token" },
  "--db-elevation-1": { verb: "rename", to: "--db-elevation-xl", after: "0 8px 40px 0 rgba(0, 0, 0, 0.13)", note: "the highest step keeps the highest name — DuBois xl" },
  "--db-elevation-2": { verb: "rename", to: "--db-elevation-lg", after: "0 2px 16px 0 rgba(0, 0, 0, 0.08)", note: "the menu step — DuBois lg" },
  "--db-elevation-3": { verb: "rename", to: "--db-elevation-sm", after: "0 2px 3px -1px rgba(0, 0, 0, 0.05), 0 1px 0 0 rgba(0, 0, 0, 0.02)", note: "re-valued onto DuBois sm" },
}

/** Tokens the proposal adds. Kept beside PLAN so both sides of the diff are here. */
const ADDED = [
  ["--db-height-5", "20px", "segment control, menu shortcut, table row action"],
  ["--db-height-7", "28px", "menu item, tree row, select item — 15 sites"],
  ["--db-height-10", "40px", "table header, panel header — 7 sites"],
  ["--db-height-12", "48px", "platform header — 3 sites"],
  ["--db-height-14", "56px", "textarea minimum — 1 site"],
  ["--db-size-10", "40px", "avatar lg, item media — 3 sites"],
  ["--db-width-rail", "240px", "replaces w-[240px] — 6 sites"],
  ["--db-width-panel", "280px", "replaces w-[280px] — 6 sites"],
  ["--db-elevation-xs", "0 1px 0 0 rgba(0, 0, 0, 0.05)", "DuBois carries an xs, so the shadow-xs sites keep their class"],
  ["--db-elevation-md", "0 3px 6px 0 rgba(0, 0, 0, 0.05)", "between a resting surface and a floating one"],
]

const changed = inventory.filter((t) => PLAN[t.name])
const unaccounted = inventory.filter((t) => !PLAN[t.name] && !["color", "type", "radius"].includes(t.family))

/**
 * Counts before and after, derived rather than asserted. The interesting result
 * is that the total barely moves: this proposal converts tokens from decorative
 * to load-bearing, it does not delete many. Claiming a reduction here would be
 * the easiest number in the document to get caught on.
 */
const FAMILY_AFTER = (name) =>
  /^--db-height-/.test(name) ? "height"
  : /^--db-size-/.test(name) ? "size"
  : /^--db-width-/.test(name) ? "width"
  : /^--db-space-/.test(name) ? "space"
  : /^--db-elevation-/.test(name) ? "elevation"
  : /^--db-(duration|ease)-/.test(name) ? "motion"
  : familyOf(name)

const countsBefore = {}
const countsAfter = {}
for (const t of inventory) {
  countsBefore[t.family] = (countsBefore[t.family] || 0) + 1
  const p = PLAN[t.name]
  if (p && p.verb === "delete") continue
  const after = p?.to ?? t.name
  const fam = FAMILY_AFTER(after)
  countsAfter[fam] = (countsAfter[fam] || 0) + 1
}
for (const [n] of ADDED) countsAfter[FAMILY_AFTER(n)] = (countsAfter[FAMILY_AFTER(n)] || 0) + 1
const famKeys = [...new Set([...Object.keys(countsBefore), ...Object.keys(countsAfter)])]
const totalBefore = Object.values(countsBefore).reduce((a, b) => a + b, 0)
const totalAfter = Object.values(countsAfter).reduce((a, b) => a + b, 0)

/* ── output ───────────────────────────────────────────────────────────────── */

const payload = { usage, inventory, byFamily, shadows, transitions, durations, radii, borders, controlHeights, offSet, literals, migration, PLAN, ADDED }

if (process.argv.includes("--json")) {
  console.log(JSON.stringify(payload, (k, v) => (v instanceof Map ? Object.fromEntries(v) : v), 2))
  process.exit(0)
}

if (process.argv.includes("--md")) {
  console.log("### Counts\n")
  console.log("| Family | Properties before | Properties after | Change |")
  console.log("|---|---|---|---|")
  for (const f of famKeys.sort()) {
    const b = countsBefore[f] || 0
    const a = countsAfter[f] || 0
    console.log(`| ${f} | ${b || "—"} | ${a || "—"} | ${a === b ? "unchanged" : (a > b ? "+" : "") + (a - b)} |`)
  }
  console.log(`| **total** | **${totalBefore}** | **${totalAfter}** | **${totalAfter - totalBefore}** |`)
  console.log(`\nFamilies: ${Object.keys(countsBefore).length} before, ${Object.keys(countsAfter).length} after.`)
  if (unaccounted.length) console.log(`\nUnaccounted shipped tokens: ${unaccounted.map((t) => t.name).join(", ")}`)

  console.log("\n### Every token that changes\n")
  console.log("| Before | Value now | Resolved | After | Value after | What happens |")
  console.log("|---|---|---|---|---|---|")
  for (const t of changed) {
    const p = PLAN[t.name]
    const after = p.verb === "delete" ? "—" : (p.to ?? t.name)
    const verb = { keep: "Kept", rename: "Renamed", delete: "Deleted", revalue: "Re-valued" }[p.verb]
    const valueAfter = p.verb === "delete" ? "—" : (p.after ?? t.px ?? t.value)
    console.log(
      `| \`${t.name}\` | \`${t.value}\` | ${t.px ?? "—"} | ${after === "—" ? "—" : "`" + after + "`"} | ${valueAfter} | ${verb}${p.note ? " — " + p.note : ""} |`
    )
  }
  console.log("\n### Tokens added\n")
  console.log("| Token | Value | Why |")
  console.log("|---|---|---|")
  for (const [n, v, why] of ADDED) console.log(`| \`${n}\` | ${v} | ${why} |`)

  console.log("\n### Spacing steps against real usage\n")
  console.log("| Step | px | Uses today | In proposed scale |")
  console.log("|---|---|---|---|")
  for (const [step, n] of sortNumM(usage.spacing.numeric)) {
    console.log(`| \`${step}\` | ${pxOf(step)}px | ${n} | ${PROPOSED.spacing.includes(parseFloat(step)) ? "yes" : "**no — breaks**"} |`)
  }
  console.log("\n### Height steps against real usage\n")
  console.log("| Step | px | Uses today | Source after |")
  console.log("|---|---|---|---|")
  for (const [step, n] of sortNumM(usage.height.numeric)) {
    const s = parseFloat(step)
    const src = PROPOSED.heightExtra.includes(s) ? "`--db-height-" + step + "`"
      : PROPOSED.spacing.includes(s) ? "falls through to `--db-space-" + step + "`"
      : "**refused**"
    console.log(`| \`${step}\` | ${pxOf(step)}px | ${n} | ${src} |`)
  }
  console.log("\n### Control heights off the 24/28/32 set, inside the components\n")
  console.log("| Height | Sites | Components |")
  console.log("|---|---|---|")
  for (const [px, list] of [...offSetByPx.entries()].sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]))) {
    console.log(`| ${px} | ${list.length} | ${[...new Set(list.map((h) => path.basename(h.file).replace(/\.tsx?$/, "")))].join(", ")} |`)
  }
  if (lintScope) {
    const bad = lintScope.filter((h) => !h.onSet)
    console.log("\n### What the rule would flag in linted scope\n")
    console.log("| File | Component | Class | Verdict |")
    console.log("|---|---|---|---|")
    for (const h of bad) {
      const verdict = h.cls === "h-auto" ? "allowed by the rule" : `**violation** — ${h.px}px`
      console.log(`| \`${h.file}:${h.line}\` | \`<${h.tag}>\` | \`${h.cls}\` | ${verdict} |`)
    }
  }
  process.exit(0)
}

const total = (m) => [...m.values()].reduce((a, b) => a + b, 0)

console.log(`scanned ${files.length} files in packages/*/src\n`)

for (const a of AXES) {
  const u = usage[a.key]
  console.log(`── ${a.label} ──`)
  console.log(`  numeric steps in use: ${u.numeric.size} distinct, ${total(u.numeric)} uses`)
  for (const [step, n] of sortNum(u.numeric)) {
    console.log(`    ${String(step).padStart(6)}  = ${String(pxOf(step) + "px").padEnd(7)} ${String(n).padStart(4)} uses`)
  }
  if (u.keyword.size) {
    console.log(`  keyword: ${[...u.keyword.entries()].sort((x, y) => y[1] - x[1]).map(([k, n]) => `${k}(${n})`).join(" ")}`)
  }
  if (u.bracket.size) {
    console.log(`  bracket: ${[...u.bracket.entries()].sort((x, y) => y[1] - x[1]).map(([k, n]) => `${k}(${n})`).join(" ")}`)
  }
  console.log()
}

console.log("── token inventory ──")
for (const [fam, list] of Object.entries(byFamily)) {
  console.log(`  ${fam.padEnd(14)} ${String(list.length).padStart(3)} properties`)
}
console.log(`  ${"TOTAL".padEnd(14)} ${String(inventory.length).padStart(3)} custom properties in :root\n`)

console.log("── shadows ──")
for (const s of shadows) console.log(`  ${s.cls.padEnd(22)} ${String(s.n).padStart(3)} uses  ${s.files.length} files`)
console.log("\n── transitions ──")
for (const s of transitions) console.log(`  ${s.cls.padEnd(28)} ${String(s.n).padStart(3)} uses`)
console.log(`  ${"(total)".padEnd(28)} ${String(transitions.reduce((n, s) => n + s.n, 0)).padStart(3)}`)
for (const s of durations) console.log(`  ${s.cls.padEnd(28)} ${String(s.n).padStart(3)} uses`)

console.log("\n── control heights, inside the components themselves ──")
console.log(`  ${controlHeights.length} height utilities across ${new Set(controlHeights.map((h) => h.file)).size} control files (icon and pseudo-element sizing excluded)`)
console.log(`  on the 24/28/32 set:  ${controlHeights.filter((h) => h.onSet).length}`)
console.log(`  off it:               ${offSet.length}`)
for (const [px, list] of [...offSetByPx.entries()].sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]))) {
  const where = [...new Set(list.map((h) => path.basename(h.file).replace(/\.tsx?$/, "")))].join(", ")
  console.log(`    ${px.padEnd(10)} ${String(list.length).padStart(3)} × — ${where}`)
}
console.log(`  square elements (size-*, icons and square controls mixed): ${squareElements.length}`)
for (const [px, list] of [...squareByPx.entries()].sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]))) {
  const where = [...new Set(list.map((h) => path.basename(h.file).replace(/\.tsx?$/, "")))].join(", ")
  console.log(`    ${px.padEnd(10)} ${String(list.length).padStart(3)} × — ${where}`)
}

console.log("\n── control heights, in code the linter actually reads ──")
if (!lintScope) {
  console.log("  ts-morph unavailable — skipped")
} else {
  const bad = lintScope.filter((h) => !h.onSet)
  console.log(`  ${lintScope.length} height utilities on interactive DBUI components in ${LINT_ROOTS.join(" + ")}`)
  console.log(`  on the set: ${lintScope.length - bad.length}   would be flagged: ${bad.length}`)
  for (const h of bad) console.log(`    ${(h.file + ":" + h.line).padEnd(62)} <${h.tag}> ${h.cls}${h.px ? ` = ${h.px}px` : ""}`)
}

console.log("\n── migration cost of the proposed scale ──")
console.log(`  spacing steps proposed: ${PROPOSED.spacing.join(" ")}  (= ${PROPOSED.spacing.map((s) => s * 4 + "px").join(" ")})`)
console.log(`  height steps added:     ${PROPOSED.heightExtra.join(" ")}  (= ${PROPOSED.heightExtra.map((s) => s * 4 + "px").join(" ")})`)
console.log(`  size steps added:       ${PROPOSED.sizeExtra.join(" ")}  (= ${PROPOSED.sizeExtra.map((s) => s * 4 + "px").join(" ")})`)
for (const [axis, m] of Object.entries(migration)) {
  console.log(`\n  ${axis}: ${m.keptUses} uses survive, ${m.brokenUses} break`)
  for (const b of m.broken) {
    console.log(`    BREAKS  ${String(b.step).padStart(5)} = ${String(b.px + "px").padEnd(7)} ${String(b.n).padStart(3)} uses  ${prefixesFor(axis, b.step).map(([p, n]) => `${p}(${n})`).join(" ")}`)
  }
}

console.log(`\n── residue ──`)
console.log(`  px/rem bracket literals: ${literals.reduce((n, l) => n + l.classes.length, 0)} distinct in ${literals.length} files`)
