#!/usr/bin/env node
/**
 * audit-component-tokens — a per-COMPONENT inventory of design-token usage,
 * bucketed into eight families, for diffing against the Figma library.
 *
 * `generate-token-consumption.mjs` answers "is this family wired at all", per
 * family, across the whole system. That is the right shape for the Tokens page
 * and the wrong shape for a Figma diff: Figma holds a component, and the
 * question there is which tokens THAT component spends. So the axis is
 * transposed — one row per component, eight families per row — and the reusable
 * parts (the BRIDGE import, comment stripping, the dimensional prefix tables)
 * come from that file and from `measure-dimensional-usage.mjs` rather than
 * being restated.
 *
 * ── Why the resolution is derived, never listed ───────────────────────────────
 *
 * A family is only bridged for the stops it declares — `p-3` resolves to a
 * token and `p-1.5` does not — so a hardcoded step list would start crediting
 * families with usage they do not own the moment the config moved. Two sources
 * are read instead, and cross-checked against each other:
 *
 *   theme.config.mjs  the declared steps per Tailwind namespace (`BRIDGE`)
 *   tokens.css        the @theme block that actually shipped, parsed into
 *                     namespace+step -> `--db-*` name
 *
 * The CSS is authoritative for what a class resolves to, because that is the
 * file the browser reads. The config is the cross-check: if a step is declared
 * and did not reach the CSS, this script says so rather than quietly counting
 * the class as off-scale.
 *
 * ── The one thing that makes or breaks the diff ───────────────────────────────
 *
 * Every token-bearing usage lands in EXACTLY ONE family. Double-counting makes
 * the diff lie in a way nobody can see, so classification is a single ordered
 * decision per class with an accounting assertion behind it: every candidate is
 * a token, off-scale, deliberately skipped, or unclassified — never two of
 * those, never none. `--check` fails the run if the books do not balance.
 *
 * ── Where the taxonomy is genuinely ambiguous ────────────────────────────────
 *
 * Three seams are decided here rather than left to the reader, because each one
 * changes a number:
 *
 *   FALL-THROUGH   `h-1` has no `--height-1`, so it lands on `--spacing-1` and
 *                  spends `--db-space-1` while sitting in the SIZE family.
 *                  K12 and F10 in verify-spacing-scale.mjs assert the
 *                  fall-through; ignoring it would report `h-1` as off-scale
 *                  when it resolves to a token perfectly well.
 *   WIDTH vs COLOR a numeric suffix is a width and a word suffix is a color,
 *                  on `border-`, `divide-`, `ring-`, `outline-`, `stroke-` and
 *                  `decoration-` alike. Tailwind gives ring and outline width
 *                  no theme namespace at all, so those can never resolve —
 *                  they are off-scale in `border` and labeled, not dropped.
 *   KEYWORDS       `w-fit`, `bg-transparent` and `rounded-none` do not resolve
 *                  to a token and never could. They are off-scale per the
 *                  taxonomy, and separated in `offScaleByReason` so a reader
 *                  can tell them from `p-[13px]`, which is a defect.
 *
 *   node scripts/audit-component-tokens.mjs          # human summary
 *   node scripts/audit-component-tokens.mjs --md     # per-component table
 *   node scripts/audit-component-tokens.mjs --check  # non-zero on a bad ledger
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const rel = (p) => path.relative(ROOT, p).split(path.sep).join("/")
const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8")
const exists = (p) => fs.existsSync(path.join(ROOT, p))

const TOKENS_CSS = "packages/dbui/src/tokens/tokens.css"
const TYPE_CSS = "packages/dbui/src/tokens/type.css"
const PKG_GLOBALS = "packages/dbui/src/tokens/globals.css"
const OUT_DIR = ".tmp-token-audit"
const OUT = path.join(OUT_DIR, "react.json")

/** The declared steps per namespace, read rather than restated. */
const { bridge: BRIDGE } = await import("../packages/dbui/src/tokens/theme.config.mjs")

/* ══ what shipped ═════════════════════════════════════════════════════════ */

const tokensCss = read(TOKENS_CSS)
/** Every `--db-*` the browser gets. Used to reject a `var(--db-…)` that names nothing. */
const SHIPPED = new Set([...tokensCss.matchAll(/^\s*(--db-[a-z0-9-]+):/gm)].map((m) => m[1].slice(5)))
/** The ramp's classes. The style name IS the identity Figma holds as a text style. */
const TYPE_UTILITIES = new Set(
  [...read(TYPE_CSS).matchAll(/@utility (type-[a-z0-9-]+)/g)].map((m) => m[1])
)

/**
 * The @theme block, as namespace -> step -> what it resolves to.
 *
 * Parsed rather than assumed because the block is where a class stops being a
 * class and becomes a value, and it holds three outcomes this audit has to tell
 * apart: a step pointing at a `--db-*` token, a step pointing at something else
 * (`--color-icon-folder` reaches `--icon-folder`, which is not in the token
 * namespace), and a step written `initial`, which deletes the class so it
 * renders nothing at all.
 */
const NAMESPACES = [
  "default-border-width", "default-transition-duration",
  "border-width", "color", "spacing", "size", "height", "width", "radius",
  "shadow", "font", "text", "leading", "tracking", "ease", "duration", "animate", "container",
].sort((a, b) => b.length - a.length)

const theme = new Map() // "namespace|step" -> { token: string|null, closed: boolean, raw: string }
function ingestTheme(src, file) {
  // Only the @theme blocks. A :root declaration is a token value, not a bridge.
  for (const block of src.matchAll(/@theme[^{]*\{([\s\S]*?)\n\}/g)) {
    for (const m of block[1].matchAll(/^\s*(--[a-zA-Z0-9\\.-]+):\s*([^;]+);/gm)) {
      const key = m[1].slice(2).replace(/\\/g, "")
      const value = m[2].trim()
      const ns = NAMESPACES.find((n) => key === n || key.startsWith(n + "-"))
      if (!ns) continue
      const step = key === ns ? "" : key.slice(ns.length + 1)
      const db = value.match(/var\(\s*--db-([a-z0-9-]+)\s*\)/)
      theme.set(`${ns}|${step}`, {
        token: db && SHIPPED.has(db[1]) ? db[1] : null,
        closed: value === "initial",
        raw: value,
        file,
      })
    }
  }
}
ingestTheme(tokensCss, TOKENS_CSS)
if (exists(PKG_GLOBALS)) ingestTheme(read(PKG_GLOBALS), PKG_GLOBALS)

const bridged = (ns, step) => theme.get(`${ns}|${step}`)

/**
 * A bare `border` resolves to `--default-border-width`, which tokens.css points
 * at `--db-border-1` (K7 in verify-spacing-scale.mjs). So the hairline every
 * component writes IS ours, and counting a bare `border` as off-scale — which
 * was true before that line landed — would now understate the border family by
 * every use of it. Read, not assumed, so it reverts on its own if the line goes.
 */
const DEFAULT_BORDER = bridged("default-border-width", "")?.token ?? null
/**
 * The mirror case, and it comes out the other way: nothing declares
 * `--default-transition-duration`, so a bare `transition` still takes
 * Tailwind's 150ms. Motion tokens ship and no Tailwind namespace stands behind
 * them, so every `duration-*`, `ease-*` and `transition*` in the tree is
 * off-scale. That is a finding about the system, not a gap in this script.
 */
const DEFAULT_DURATION = bridged("default-transition-duration", "")?.token ?? null

/** Config says a step is declared; the CSS says what it became. Disagreement is a bug. */
const bridgeGaps = []
for (const [ns, spec] of Object.entries(BRIDGE)) {
  for (const step of spec.steps ?? []) {
    const hit = bridged(ns, String(step))
    if (!hit?.token) bridgeGaps.push({ namespace: ns, step: String(step), resolved: hit?.raw ?? null })
  }
}

/* ══ files and components ═════════════════════════════════════════════════ */

const SKIP_DIR = new Set(["node_modules", ".next", "dist", "archive", ".git", "storybook-static"])
function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIR.has(e.name)) continue
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else out.push(p)
  }
  return out
}

const pascal = (base) =>
  base.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("")

/**
 * One row per component, from the four package roots.
 *
 * `button-variants.ts` is the reason this is not just a directory listing.
 * Button's variant table — its largest single body of token usage — lives in
 * `lib/`, outside the component file, so a scan of `components/ui/` alone
 * reports Button as nearly tokenless. Any `*-variants.ts` beside it is merged
 * into the component its name points at, and the merge is recorded on the row
 * so a reader can see why Button has two files.
 */
/**
 * `.tsx` only, which is the scope as specified — and it has one measurable hole,
 * reported in `scope.omitted` rather than left for someone to trip over.
 *
 * `dbui-viz/src/lib/theme.ts` carries 33 `--db-*` references across 28 tokens,
 * including the whole `viz-categorical-*` and `viz-sequential-*` ramp, because a
 * Vega-Lite chart is configured from a theme object rather than styled with
 * classes. So all five charts report zero tokens: true of their `.tsx`, false of
 * the components as they ship, and the `viz` color family is invisible.
 *
 * The default stays narrow on purpose — the Figma side of this diff will be
 * built to the stated scope, and widening it silently would move numbers for a
 * reason neither half records. `--include-shared-ts` widens it in one flag.
 */
const INCLUDE_TS = process.argv.includes("--include-shared-ts")
const EXT = INCLUDE_TS ? /\.tsx?$/ : /\.tsx$/
const ROOTS = [
  { pkg: "dbui", dir: "packages/dbui/src/components/ui", ext: EXT },
  { pkg: "dbui-shells", dir: "packages/dbui-shells/src", ext: EXT },
  { pkg: "dbui-chat", dir: "packages/dbui-chat/src", ext: EXT },
  { pkg: "dbui-viz", dir: "packages/dbui-viz/src", ext: EXT },
]

const components = new Map() // name -> { name, package, files[], mergedFrom[] }
function addComponent(name, pkg, file, mergedFrom) {
  if (!components.has(name)) components.set(name, { name, package: pkg, files: [], mergedFrom: [] })
  const c = components.get(name)
  if (!c.files.includes(file)) c.files.push(file)
  if (mergedFrom) c.mergedFrom.push(mergedFrom)
}

for (const r of ROOTS) {
  for (const abs of walk(path.join(ROOT, r.dir))) {
    const f = rel(abs)
    const base = path.basename(f)
    if (!r.ext.test(base) || base.endsWith(".d.ts") || base === "index.ts") continue
    addComponent(pascal(base.replace(/\.tsx?$/, "")), r.pkg, f)
  }
}

/**
 * What the `.tsx` scope leaves out, measured rather than described. A `.ts` file
 * under a scanned root that names a `--db-*` token is token usage this audit does
 * not attribute to any component.
 */
const omitted = []
if (!INCLUDE_TS) {
  for (const r of ROOTS) {
    for (const abs of walk(path.join(ROOT, r.dir))) {
      const f = rel(abs)
      const base = path.basename(f)
      if (!/\.ts$/.test(base) || base.endsWith(".d.ts") || base === "index.ts") continue
      if (/-variants\.ts$/.test(base)) continue // merged into its component below
      const refs = [...read(f).matchAll(/--db-([a-z0-9-]+)/g)].map((m) => m[1])
      if (!refs.length) continue
      omitted.push({
        file: f,
        package: r.pkg,
        dbRefs: refs.length,
        distinct: [...new Set(refs)].sort(),
        why: "a .ts file under a scanned root — outside the *.tsx scope, so its tokens reach no component row. Run with --include-shared-ts to fold it in.",
      })
    }
  }
}

/** The CVA tables that live outside their component file. */
const VARIANT_FILES = walk(path.join(ROOT, "packages/dbui/src/lib"))
  .map(rel)
  .filter((f) => /-variants\.ts$/.test(path.basename(f)))
for (const f of VARIANT_FILES) {
  const owner = pascal(path.basename(f).replace(/-variants\.ts$/, ""))
  addComponent(owner, "dbui", f, {
    file: f,
    into: owner,
    why: "CVA variant table authored outside the component file",
  })
}

/* ══ reading source ═══════════════════════════════════════════════════════ */

const codeCache = new Map()
/**
 * Comments stripped. A JSDoc block showing `p-4` is documentation, and these
 * components carry heavy `@guideline` / `@constraint` blocks that name classes
 * on purpose — counting them would make the docs look like call sites.
 * Line comments only when they start the line, so a `https://` survives.
 */
function code(f) {
  if (!codeCache.has(f)) {
    codeCache.set(f, read(f).replace(/\/\*[\s\S]*?\*\//g, "").replace(/^[ \t]*\/\/.*$/gm, ""))
  }
  return codeCache.get(f)
}

/**
 * Class-ish strings out of every quoted literal.
 *
 * The quote is matched against ITSELF rather than against "any quote", which is
 * the one place this diverges from the extractor in
 * `measure-dimensional-usage.mjs` — and it has to. The shadcn icon guard
 * `[&_svg:not([class*='size-'])]:size-4` puts single quotes inside a
 * double-quoted string, and an extractor that stops at either quote reads the
 * inner `'size-'` as its own literal: 56 phantom `size-` usages, and the real
 * `size-4` beside them lost. Same shape breaks any template literal holding a
 * nested string.
 */
function* classesIn(f) {
  const src = code(f)
  const re = /"([^"\n]*)"|'([^'\n]*)'|`([^`]*)`/g
  for (const m of src.matchAll(re)) {
    const body = m[1] ?? m[2] ?? m[3] ?? ""
    const parts = body.split(/\s+/).filter(Boolean)
    for (const raw of parts) {
      // `data-[size=sm]:h-6` and `group-hover/x:p-2` both carry a real utility.
      // Variants are stripped for matching and the raw string kept for samples.
      const cls = raw.replace(/^(?:[^:\s]+:)+/, "").replace(/^!+|!+$/g, "")
      if (cls) yield { cls, raw, sole: parts.length === 1 }
    }
  }
}

/* ══ the vocabulary ══════════════════════════════════════════════════════ */

/** The spacing axis, as `measure-dimensional-usage.mjs` defines it. */
const SPACE_PREFIXES = [
  "p", "px", "py", "pt", "pr", "pb", "pl", "ps", "pe",
  "m", "mx", "my", "mt", "mr", "mb", "ml", "ms", "me",
  "gap", "gap-x", "gap-y", "space-x", "space-y",
  "inset", "inset-x", "inset-y", "top", "right", "bottom", "left", "start", "end",
  "translate-x", "translate-y", "translate", "scroll-m", "scroll-p", "indent", "basis",
]

/**
 * Which namespaces a size utility tries, in order.
 *
 * `min-w` and `max-w` read `--spacing-*` and NOT `--width-*` (F11), while
 * `min-h` and `max-h` do inherit `--height-*` (F7, K5). That asymmetry is
 * Tailwind's; getting it backwards reports `min-w-5` as a token when 5 is a
 * size step and not a spacing one, so the class actually renders off the
 * multiplier.
 */
const SIZE_CHAIN = {
  size: ["size", "spacing"],
  h: ["height", "spacing"],
  "min-h": ["height", "spacing"],
  "max-h": ["height", "spacing"],
  w: ["width", "spacing"],
  "min-w": ["spacing"],
  "max-w": ["spacing"],
}
const SIZE_PREFIXES = Object.keys(SIZE_CHAIN)

const RADIUS_PREFIXES = ["rounded", "rounded-t", "rounded-r", "rounded-b", "rounded-l",
  "rounded-s", "rounded-e", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl",
  "rounded-ss", "rounded-se", "rounded-ee", "rounded-es"]
/** Divide width rides the same `--border-width-*` keys as border (K11). */
const BORDER_PREFIXES = ["border", "border-t", "border-r", "border-b", "border-l",
  "border-x", "border-y", "border-s", "border-e",
  "divide", "divide-x", "divide-y"]
/** No Tailwind theme namespace exists for these widths, so none can resolve. */
const UNOWNED_WIDTH_PREFIXES = ["ring", "inset-ring", "outline"]

/**
 * The side-qualified border prefixes have to be listed here as well as under
 * width, because `border-b-action-primary-base` is a COLOR on one edge. Listing
 * only bare `border` made that class match `border` with the value
 * `b-action-primary-base`, which resolves to nothing — so the active tab
 * indicator, the scroll-area edges and every other per-side color landed in
 * `unclassified` instead of the color family.
 */
const COLOR_PREFIXES = ["bg", "text", "ring", "inset-ring", "fill", "stroke", "outline",
  "divide", "placeholder", "caret", "accent", "decoration", "from", "via", "to", "shadow",
  "border", "border-t", "border-r", "border-b", "border-l", "border-x", "border-y",
  "border-s", "border-e"]

/** Alignment, wrapping and overflow. `text-center` is not a color and not type. */
const TEXT_NOT_COLOR = new Set(["left", "center", "right", "justify", "start", "end",
  "wrap", "nowrap", "balance", "pretty", "ellipsis", "clip"])
/** Tailwind's own type sizes — the ramp is bypassed, so these are type off-scale. */
const TW_TEXT_SIZES = new Set(["xs", "sm", "base", "lg", "xl",
  "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl", "9xl"])
const TW_WEIGHTS = new Set(["thin", "extralight", "light", "normal", "medium",
  "semibold", "bold", "extrabold", "black"])
/** Background geometry and blend mode. Sized and positioned, but not colored. */
const BG_NOT_COLOR = /^(clip|blend|origin|repeat|position|size|attachment|image|gradient|linear|radial|conic|cover|contain|fixed|local|scroll|top|bottom|left|right|center|auto|none)(-|$)/
/** `border-style`, `box-sizing` and `border-collapse` all wear a `border-` prefix. */
const BORDER_NOT_WIDTH = new Set(["solid", "dashed", "dotted", "double", "hidden", "none",
  "collapse", "separate", "box", "content"])
/** A color word no token can express. */
const COLOR_KEYWORD = new Set(["transparent", "current", "inherit", "none", "black", "white", "auto"])
/** Tailwind's own palette, which the migration removed. Present = a regression. */
const TW_PALETTE = /^(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(\d{2,3})$/
/** Dimensional words that are CSS keywords rather than points on any scale. */
const DIM_KEYWORD = /^(auto|full|fit|min|max|screen|px|svh|lvh|dvh|svw|lvw|dvw|prose|none|reverse|initial)$/
/** Tailwind's `--container-*` scale, which `w-`, `min-w-` and `max-w-` also read. */
const CONTAINER = /^(3xs|2xs|xs|sm|md|lg|xl|[2-7]xl)$/
const FRACTION = /^\d+\/\d+$/
const NUMERIC = /^-?\d+(\.\d+)?$/
const ARBITRARY = /^[[(]/
/**
 * An arbitrary value Tailwind can read as a LENGTH.
 *
 * `border-[1.5px]` and `border-b-[3px]` are widths; `border-(--color-border)` is
 * the color Recharts injects per series. Tailwind infers the same way — a bare
 * `(--var)` on a `border-` utility resolves to `border-color`, since color is
 * that prefix's primary meaning and a var carries no type — so the audit has to
 * infer it too or the chart legend's swatch color is filed as a border width.
 */
const LENGTH_ARBITRARY = /\d\s*(px|rem|em|%|vh|vw|ch)|^\[length:|^\(length:|^\[\d|^\(\d/
/**
 * Hyphenated CSS property names that collide with a utility prefix. These reach
 * the scanner as object keys in a `style` or CSS-in-JS block — sonner.tsx writes
 * `"font-size": "13px"` — and `font-size` is otherwise indistinguishable from a
 * `font-` utility. `line-height` and `text-align` do not collide with any prefix
 * and are listed anyway, so the set reads as one idea rather than as whichever
 * members happened to bite.
 */
const CSS_PROPERTY = new Set([
  "font-family", "font-size", "font-weight", "font-style", "font-stretch",
  "line-height", "letter-spacing", "text-transform", "text-align", "text-decoration",
  "border-radius", "border-width", "border-color", "border-style",
  "background-color", "box-shadow", "transition-duration", "transition-property",
  "max-width", "max-height", "min-width", "min-height",
])

const FAMILY_KEYS = ["color", "type", "elevation", "space", "size", "radius", "border", "motion"]

/** Which family a shipped `--db-*` belongs to, for a direct `var()` reference. */
function familyOfToken(name) {
  if (/^space-/.test(name)) return "space"
  if (/^size-/.test(name)) return "size"
  if (/^radius-/.test(name)) return "radius"
  if (/^border-\d/.test(name)) return "border"
  if (/^elevation-/.test(name)) return "elevation"
  if (/^(duration|ease)-/.test(name)) return "motion"
  if (/^(font|line-height|letter-spacing|mono-font)/.test(name)) return "type"
  if (/^(spacing-unit|density-scalar|type-scalar)$/.test(name)) return "scalar"
  return "color"
}

/* ══ classification ══════════════════════════════════════════════════════ */

const T = (family, token) => ({ verdict: "token", family, token })
const OFF = (family, reason) => ({ verdict: "offScale", family, reason })
const SKIP = (why) => ({ verdict: "skip", why })
/**
 * `kind` is what makes the unclassified bucket auditable instead of a shrug.
 *
 *   interpolated  a template-literal fragment. Not a class and cannot become one.
 *   not-a-class   a quoted string that collides with a utility prefix — Base UI's
 *                 `align="start"`, a Vega `orient: "bottom"`, a CVA variant key
 *                 named `size`, an HTML tag `"p"`, a warehouse id `"ml-data"`.
 *   unresolved    class-SHAPED and still unexplained. This is the only kind that
 *                 means the taxonomy has a hole, so it is reported on its own.
 */
const UNKNOWN = (why, kind = "unresolved") => ({ verdict: "unclassified", why, kind })

/** The longest prefix wins, so `min-h-7` is never read as `min` + `h-7`. */
function splitPrefix(body, prefixes) {
  let best = null
  for (const p of prefixes) {
    if (body === p) { if (!best || p.length > best.prefix.length) best = { prefix: p, value: "" } }
    else if (body.startsWith(p + "-")) {
      if (!best || p.length > best.prefix.length) best = { prefix: p, value: body.slice(p.length + 1) }
    }
  }
  return best
}

/** A `--db-*` token named inside an arbitrary value, if it names a real one. */
function dbInside(value) {
  for (const m of value.matchAll(/--db-([a-z0-9-]+)/g)) if (SHIPPED.has(m[1])) return m[1]
  return null
}
const dbNamedButUnshipped = (value) => /--db-[a-z0-9-]+/.test(value)

/**
 * Resolve a dimensional step down a namespace chain, honouring fall-through.
 * Returns the `--db-*` name, or null when no namespace in the chain declares it
 * and the class therefore renders off Tailwind's live multiplier.
 */
function resolveChain(chain, step) {
  for (const ns of chain) {
    const hit = bridged(ns, step)
    if (hit?.token) return hit.token
  }
  return null
}

/**
 * One class in, one verdict out. The order below IS the taxonomy: each block
 * removes a class from consideration for every block after it, so no usage can
 * reach two families.
 */
function classify(cls, { raw = cls, sole = false } = {}) {
  if (/[${}]/.test(cls)) return UNKNOWN("interpolated at runtime", "interpolated")

  /**
   * A bare word that is the WHOLE quoted string is a prop value, not a utility.
   *
   * `outline` is both a Tailwind utility and Button's variant name, and the
   * measurement settles which one the tree actually contains: all 18 bare
   * `outline` strings are the sole content of their literal — every one a
   * `variant="outline"` — while all 53 bare `border` strings sit inside a
   * multi-utility class list. So the position disambiguates them perfectly here,
   * where the spelling cannot. Without this, 18 phantom outline widths land in
   * `border.offScale` and Button reads as having an outline-width defect it does
   * not have.
   *
   * Restricted to words with no hyphen and no digit, because `"size-4"` and
   * `"rounded-2"` are real single-utility class strings and must survive. A
   * variant prefix also proves intent — nothing passes `hover:` to a prop.
   */
  if (sole && raw === cls && !/[-\d]/.test(cls)) {
    return SKIP(`the bare word "${cls}" alone in a string — a prop value or identifier, not a class`)
  }
  if (CSS_PROPERTY.has(cls)) return SKIP(`"${cls}" is a CSS property name, not a utility`)

  const negative = cls.startsWith("-")
  const body = negative ? cls.slice(1) : cls

  /* ── type ─────────────────────────────────────────────────────────────
   * First, because the ramp is the family most easily stolen from: `text-sm`
   * is a type size that looks like a color, and `font-mono` is a family that
   * looks like a weight. */
  if (body.startsWith("type-")) {
    return TYPE_UTILITIES.has(body) ? T("type", body) : UNKNOWN("type-* class the ramp does not ship")
  }
  if (body.startsWith("font-")) {
    const v = body.slice(5)
    // `--font-sans` and `--font-mono` are bridged in globals.css, so the family
    // utilities do reach a token even though the weights never will.
    const hit = bridged("font", v)
    if (hit?.token) return T("type", hit.token)
    if (TW_WEIGHTS.has(v) || NUMERIC.test(v)) return OFF("type", "raw Tailwind font-weight")
    if (v.startsWith("stretch")) return SKIP("font-stretch")
    if (ARBITRARY.test(v)) return OFF("type", "arbitrary font value")
    return OFF("type", "font utility with no token behind it")
  }
  if (body.startsWith("leading-")) return OFF("type", "raw Tailwind line-height")
  if (body.startsWith("tracking-")) return OFF("type", "raw Tailwind letter-spacing")
  // The ramp declares text-transform on every style, so a case utility beside
  // one is either redundant or fighting it. Counted per class, not per class
  // list, so this does not verify the "paired with a type class" half.
  if (/^(uppercase|lowercase|capitalize|normal-case)$/.test(body)) {
    return OFF("type", "text-transform outside the ramp")
  }

  /* ── elevation ────────────────────────────────────────────────────────
   * Before color, because Tailwind lets `shadow-<color>` and
   * `shadow-<step>` share one prefix. */
  if (body === "shadow" || body.startsWith("shadow-")) {
    const v = body === "shadow" ? "" : body.slice(7)
    if (v === "focus") {
      // Authored in globals.css out of two COLOR tokens plus px widths that
      // live nowhere else, so it is a focus treatment wearing a shadow's
      // prefix — not an elevation step. Named rather than silently bucketed.
      return OFF("elevation", "shadow-focus — composed in globals.css from focus-ring + focus-ring-offset, not an elevation token")
    }
    const hit = bridged("shadow", v)
    if (hit?.token) return T("elevation", hit.token)
    if (v === "" ) return OFF("elevation", "bare shadow takes Tailwind's default")
    if (v === "none") return OFF("elevation", "shadow-none is a CSS keyword, no token behind it")
    if (ARBITRARY.test(v)) {
      const inner = dbInside(v)
      return inner ? T("elevation", inner) : OFF("elevation", "arbitrary shadow")
    }
    if (COLOR_KEYWORD.has(v) || TW_PALETTE.test(v)) return OFF("color", "raw shadow color")
    const c = bridged("color", v.replace(/\/.*$/, ""))
    if (c?.token) return T("color", c.token)
    return OFF("elevation", "shadow step Tailwind owns, not the elevation scale")
  }
  if (/^(drop-shadow|inset-shadow)(-|$)/.test(body)) {
    return OFF("elevation", "drop-shadow / inset-shadow are Tailwind's, unbridged")
  }

  /* ── radius ───────────────────────────────────────────────────────────── */
  {
    const hit = splitPrefix(body, RADIUS_PREFIXES)
    if (hit) {
      const { value } = hit
      if (ARBITRARY.test(value)) {
        const inner = dbInside(value)
        if (inner) return T("radius", inner)
        return OFF("radius", dbNamedButUnshipped(value) ? "arbitrary radius naming an unshipped --db-* var" : "arbitrary radius value")
      }
      const step = bridged("radius", value)
      if (step?.token) return T("radius", step.token)
      if (step?.closed) return OFF("radius", `rounded-${value} is closed by the bridge — renders no corner`)
      if (value === "") return OFF("radius", "bare rounded reads --radius-sm, which the bridge closed")
      if (value === "none") return OFF("radius", "rounded-none is a CSS keyword, no token behind it")
      return OFF("radius", "radius step Tailwind owns, not the DBUI scale")
    }
  }

  /* ── border and divide width ──────────────────────────────────────────
   * Split from color on whether the suffix is a NUMBER. `border-2` is a width
   * and `border-base` is a color, and the two sit one letter apart in the
   * same class list. */
  {
    const hit = splitPrefix(body, BORDER_PREFIXES)
    if (hit) {
      const { prefix, value } = hit
      const isDivideAxis = prefix === "divide-x" || prefix === "divide-y"
      if (value === "" && (prefix.startsWith("border") || isDivideAxis)) {
        // A bare `border` / `border-t` / `divide-y` takes --default-border-width.
        return DEFAULT_BORDER
          ? T("border", DEFAULT_BORDER)
          : OFF("border", "bare border takes Tailwind's 1px — no token behind it")
      }
      if (NUMERIC.test(value)) {
        const step = bridged("border-width", value)
        if (step?.token) return T("border", step.token)
        return OFF("border", "border width step the config does not declare")
      }
      // Only a length is a width. Anything else on this prefix is a color and
      // falls through to the color block below.
      if (ARBITRARY.test(value) && LENGTH_ARBITRARY.test(value)) {
        const inner = dbInside(value)
        if (inner) return T("border", inner)
        return OFF("border", "arbitrary border width")
      }
      if (BORDER_NOT_WIDTH.has(value)) return SKIP("border-style / box-sizing / border-collapse")
      if (value.startsWith("spacing")) return SKIP("border-spacing")
      // Anything else on a border/divide prefix is a color; fall through.
    }
  }

  /* ── ring, inset-ring and outline width ───────────────────────────────
   * Widths with no Tailwind theme namespace, so no token can ever back them.
   * Filed under border because border is the width family, and labeled so the
   * number stays readable — 39 ring widths inside `border.offScale` would
   * otherwise look like a border defect. */
  {
    const hit = splitPrefix(body, UNOWNED_WIDTH_PREFIXES)
    if (hit) {
      const { prefix, value } = hit
      if (value === "" || NUMERIC.test(value) || (ARBITRARY.test(value) && /px|rem|\d/.test(value))) {
        return OFF("border", `${prefix} width — Tailwind gives it no theme namespace`)
      }
      if (value === "inset" || value === "hidden" || value === "none") {
        return SKIP(`${prefix} style keyword`)
      }
      if (value === "offset") return SKIP("ring-offset")
    }
  }

  /* ── color ───────────────────────────────────────────────────────────── */
  {
    const hit = splitPrefix(body, COLOR_PREFIXES)
    if (hit) {
      const { prefix, value } = hit
      if (prefix === "text") {
        if (TEXT_NOT_COLOR.has(value)) return SKIP("text alignment / wrapping / overflow")
        if (TW_TEXT_SIZES.has(value)) return OFF("type", "raw Tailwind type size, bypassing the ramp")
        if (ARBITRARY.test(value) && /px|rem|em\b/.test(value)) return OFF("type", "type size literal")
        if (value === "shadow" || value.startsWith("shadow")) return SKIP("text-shadow")
        if (value === "transform") return SKIP("CSS property name, not a class")
      }
      if (prefix === "bg" && BG_NOT_COLOR.test(value)) return SKIP("background geometry / blend mode")
      if (prefix === "stroke" && (NUMERIC.test(value) || (ARBITRARY.test(value) && /\d/.test(value)))) {
        return OFF("border", "stroke width — Tailwind gives it no theme namespace")
      }
      if (prefix === "decoration") {
        if (NUMERIC.test(value)) return OFF("border", "text-decoration thickness — no theme namespace")
        if (/^(solid|double|dotted|dashed|wavy|from-font|auto)$/.test(value)) return SKIP("decoration style")
      }
      if (value === "") return UNKNOWN(`the bare word "${body}" — a prop value or data string, not a utility`, "not-a-class")

      // `/50` is an alpha applied to the token, not a different token. The base
      // name is recorded so the diff lines up with Figma, where the same token
      // carries an opacity on the fill rather than becoming a second variable.
      const base = value.replace(/\/.*$/, "")
      if (ARBITRARY.test(value)) {
        const inner = dbInside(value)
        if (inner) return T("color", inner)
        return OFF("color", dbNamedButUnshipped(value) ? "arbitrary color naming an unshipped --db-* var" : "arbitrary color value")
      }
      const c = bridged("color", base)
      if (c?.token) return T("color", c.token)
      // A bridged color whose value is NOT a --db-* token. `--color-icon-folder`
      // reaches `--icon-folder`, a hex authored in globals.css: a real DBUI
      // color that is not in the token namespace and has no Figma variable.
      if (c) return OFF("color", `bridged to ${c.raw} — a DBUI color outside the --db-* namespace`)
      if (COLOR_KEYWORD.has(base)) return OFF("color", "CSS color keyword, no token behind it")
      if (TW_PALETTE.test(base)) return OFF("color", "raw Tailwind palette color")
      if (/^#|^rgb|^hsl|^oklch/.test(base)) return OFF("color", "raw color literal")
      if (prefix === "from" || prefix === "via" || prefix === "to") {
        if (/^\d+%?$/.test(base)) return SKIP("gradient stop position")
      }
      return UNKNOWN(`${prefix}-* value that resolves to nothing`)
    }
  }

  /* ── motion ───────────────────────────────────────────────────────────
   * Nothing bridges `--duration-*`, `--ease-*` or
   * `--default-transition-duration`, so this family's tokens ship and no class
   * reaches them. Every branch here is off-scale until that changes, and each
   * one re-reads the bridge rather than asserting it. */
  if (body === "transition" || body.startsWith("transition-")) {
    if (DEFAULT_DURATION) return T("motion", DEFAULT_DURATION)
    return OFF("motion", "transition takes Tailwind's default duration — --default-transition-duration is unbridged")
  }
  if (body.startsWith("duration-") || body.startsWith("delay-")) {
    const ns = body.startsWith("duration-") ? "duration" : null
    const v = body.slice(body.indexOf("-") + 1)
    const hit = ns ? bridged(ns, v) : null
    if (hit?.token) return T("motion", hit.token)
    if (ARBITRARY.test(v)) {
      const inner = dbInside(v)
      if (inner) return T("motion", inner)
    }
    return OFF("motion", "duration / delay with no bridged token")
  }
  if (body === "ease" || body.startsWith("ease-")) {
    const v = body === "ease" ? "" : body.slice(5)
    const hit = bridged("ease", v)
    if (hit?.token) return T("motion", hit.token)
    if (ARBITRARY.test(v)) {
      const inner = dbInside(v)
      if (inner) return T("motion", inner)
    }
    return OFF("motion", "easing with no bridged token")
  }
  if (body.startsWith("animate-")) {
    const hit = bridged("animate", body.slice(8))
    if (hit?.token) return T("motion", hit.token)
    return OFF("motion", "animation with no duration or easing token")
  }

  /* ── space ────────────────────────────────────────────────────────────── */
  {
    const hit = splitPrefix(body, SPACE_PREFIXES)
    if (hit) {
      const v = hit.value
      if (v === "") return UNKNOWN(`the bare word "${body}" — a prop value or data string, not a utility`, "not-a-class")
      if (ARBITRARY.test(v)) {
        const inner = dbInside(v)
        if (inner) return T("space", inner)
        return OFF("space", dbNamedButUnshipped(v) ? "arbitrary space naming an unshipped --db-* var" : "arbitrary space value")
      }
      if (NUMERIC.test(v)) {
        const token = resolveChain(["spacing"], v)
        return token ? T("space", token) : OFF("space", "numeric step the spacing scale does not declare")
      }
      if (FRACTION.test(v)) return OFF("space", "fractional offset, no token")
      if (DIM_KEYWORD.test(v)) return OFF("space", `CSS keyword (${v}) — no token can express it`)
      // Tailwind takes a number, a fraction, a keyword, a declared theme key or a
      // bracketed value on these prefixes and nothing else, and every one of
      // those is already handled above. A word that reaches here would compile to
      // nothing, so it is a data string that happens to look like a class —
      // `{ id: "ml-data" }` is the only one in the tree — not a usage the audit
      // is failing to resolve.
      return UNKNOWN(`"${cls}" would not compile as a utility — a data string or identifier`, "not-a-class")
    }
  }

  /* ── size ─────────────────────────────────────────────────────────────── */
  {
    const hit = splitPrefix(body, SIZE_PREFIXES)
    if (hit) {
      const { prefix, value: v } = hit
      const chain = SIZE_CHAIN[prefix]
      if (v === "") return UNKNOWN(`the bare word "${body}" — a prop value or data string, not a utility`, "not-a-class")
      if (ARBITRARY.test(v)) {
        const inner = dbInside(v)
        if (inner) return T("size", inner)
        return OFF("size", dbNamedButUnshipped(v) ? "arbitrary size naming an unshipped --db-* var" : "arbitrary size value")
      }
      if (NUMERIC.test(v)) {
        const token = resolveChain(chain, v)
        return token
          ? T("size", token)
          : OFF("size", `${prefix}-${v} — no ${chain.join(" or ")} namespace declares this step`)
      }
      if (FRACTION.test(v)) return OFF("size", "fractional size, no token")
      if (CONTAINER.test(v) && /w$/.test(prefix)) return OFF("size", "Tailwind --container-* scale, not a DBUI size")
      if (DIM_KEYWORD.test(v)) return OFF("size", `CSS keyword (${v}) — no token can express it`)
      return UNKNOWN(`"${cls}" would not compile as a utility — a data string or identifier`, "not-a-class")
    }
  }

  return SKIP("not a token-bearing utility")
}

/* ══ the scan ════════════════════════════════════════════════════════════ */

const natCmp = (a, b) => String(a).localeCompare(String(b), "en", { numeric: true })

function emptyFamily() {
  return { tokens: 0, distinct: new Set(), offScale: 0, offScaleSamples: new Set(), reasons: new Map() }
}

const unclassified = new Map() // "cls|file" -> { class, file, count, why }
const ledger = { candidates: 0, token: 0, offScale: 0, skip: 0, unclassified: 0 }
const skipped = new Map()

/**
 * A px or rem literal in an inline `style={{ … }}`.
 *
 * Reported beside the families rather than inside them, and that is a judgement
 * call worth stating. `width: `${16 + depth * 8}px`` in data-tree.tsx is
 * genuinely a width that resolves to no token, so it belongs in `size.offScale`
 * on the strict reading. It is kept out because the eight families are defined
 * over Tailwind classes and `var(--db-*)`, and the Figma side of this diff will
 * be built to that definition — folding a second, differently-shaped signal into
 * the same counters would make the two halves disagree for a reason neither one
 * records. It is the audit's largest blind spot, so it is measured and named
 * here instead of going unmentioned.
 */
const INLINE_PROP = /\b(width|height|minWidth|minHeight|maxWidth|maxHeight|padding|paddingLeft|paddingRight|paddingTop|paddingBottom|margin|marginLeft|marginRight|marginTop|marginBottom|gap|top|right|bottom|left|inset|borderRadius|borderWidth|fontSize|lineHeight|letterSpacing|boxShadow|transitionDuration)\s*:/g

function inlineStyleLiterals(f) {
  const out = new Map()
  for (const m of code(f).matchAll(/style=\{\{([\s\S]*?)\}\}/g)) {
    const block = m[1]
    for (const p of block.matchAll(INLINE_PROP)) {
      const after = block.slice(p.index + p[0].length, p.index + p[0].length + 120)
      const value = after.match(/^\s*(`[^`]*`|"[^"]*"|'[^']*'|-?[\d.]+)/)
      if (!value) continue
      const v = value[1]
      // A bare number is a unitless React px, and a template or quoted string
      // only matters when it carries a unit or arithmetic.
      if (!/^-?[\d.]+$/.test(v) && !/px|rem|em\b|\*|\+/.test(v)) continue
      if (/var\(--db-/.test(v)) continue
      const key = `${p[1]}: ${v.replace(/\s+/g, " ")}`
      out.set(key, (out.get(key) || 0) + 1)
    }
  }
  return out
}

const rows = []
for (const c of [...components.values()].sort((a, b) => natCmp(a.name, b.name))) {
  const fam = Object.fromEntries(FAMILY_KEYS.map((k) => [k, emptyFamily()]))
  const inline = new Map()
  let classified = 0

  for (const file of c.files) {
    for (const [k, n] of inlineStyleLiterals(file)) inline.set(k, (inline.get(k) || 0) + n)
    /** Token names named inside a class, so the direct-var pass cannot re-count them. */
    const consumed = new Map()

    for (const { cls, raw, sole } of classesIn(file)) {
      ledger.candidates++
      classified++
      const v = classify(cls, { raw, sole })
      /**
       * Every `--db-*` name a class RECORDED here spells out, so the
       * direct-`var()` pass below cannot count the same characters twice.
       *
       * Both halves of this condition were wrong once, in opposite directions.
       * Marking only `token` verdicts missed
       * `top-[var(--db-sticky-offset,0px)]`, which is off-scale space: one call
       * site landed in a family AND in the unclassified bucket. Marking every
       * verdict then swallowed the other case — a bare
       * `"var(--db-surface-base)"` string is a CSS value in a `style` object,
       * skipped as a class precisely because it is not one, and it is the direct
       * reference the second pass exists to count. Skipped means "not accounted
       * for yet"; anything else means "already counted".
       */
      if (v.verdict !== "skip") {
        for (const m of cls.matchAll(/--db-([a-z0-9-]+)/g)) {
          consumed.set(m[1], (consumed.get(m[1]) || 0) + 1)
        }
      }
      if (v.verdict === "token") {
        ledger.token++
        fam[v.family].tokens++
        fam[v.family].distinct.add(v.token)
      } else if (v.verdict === "offScale") {
        ledger.offScale++
        fam[v.family].offScale++
        fam[v.family].offScaleSamples.add(raw)
        fam[v.family].reasons.set(v.reason, (fam[v.family].reasons.get(v.reason) || 0) + 1)
      } else if (v.verdict === "skip") {
        ledger.skip++
        skipped.set(v.why, (skipped.get(v.why) || 0) + 1)
      } else {
        ledger.unclassified++
        const key = `${cls}|${file}`
        if (!unclassified.has(key)) {
          unclassified.set(key, { class: cls, file, count: 0, kind: v.kind, why: v.why, component: c.name })
        }
        unclassified.get(key).count++
      }
    }

    /**
     * Literal `var(--db-x)` outside a class. A token named inside a class was
     * already counted by the class that names it — `bg-[var(--db-utility-scrim)]`
     * is one usage, not two — so those occurrences are subtracted here. This is
     * the one place double-counting was easy to introduce.
     */
    /**
     * Matched WITHOUT requiring `var(`, which is the difference between seeing
     * the viz color family and reporting it dead.
     *
     * A Vega-Lite chart cannot use a class or a `var()`: it needs a resolved hex,
     * so `dbui-viz/src/lib/theme.ts` names each token as a bare property string
     * and resolves it through `getPropertyValue("--db-viz-categorical-1")`. That
     * is a third consumption shape beside the class and the `var()`, and scanning
     * only for `var(` found exactly one of the 33 references in that file.
     * Comments are already stripped and class-borne names are already consumed
     * above, so a bare name reaching here is a real read.
     */
    const seen = new Map()
    for (const m of code(file).matchAll(/--db-([a-z0-9-]+)/g)) {
      seen.set(m[1], (seen.get(m[1]) || 0) + 1)
    }
    for (const [name, n] of seen) {
      const direct = n - (consumed.get(name) || 0)
      if (direct <= 0) continue
      if (!SHIPPED.has(name)) {
        const key = `var(--db-${name})|${file}`
        ledger.candidates += direct
        ledger.unclassified += direct
        if (!unclassified.has(key)) {
          unclassified.set(key, {
            class: `var(--db-${name})`, file, count: 0, kind: "unshipped-db-var", component: c.name,
            why: "wears the --db- prefix but tokens.css does not ship it — a locally authored custom property no token backs",
          })
        }
        unclassified.get(key).count += direct
        continue
      }
      const family = familyOfToken(name)
      ledger.candidates += direct
      if (!FAMILY_KEYS.includes(family)) { ledger.skip += direct; skipped.set("scalar dial reference", (skipped.get("scalar dial reference") || 0) + direct); continue }
      ledger.token += direct
      classified += direct
      fam[family].tokens += direct
      fam[family].distinct.add(name)
    }
  }

  /**
   * The samples a reader needs are the ones that are not obvious. A keyword is
   * a fact about CSS; `p-[13px]` is a defect, so it is shown first.
   */
  const families = Object.fromEntries(
    FAMILY_KEYS.map((k) => {
      const f = fam[k]
      const boring = (s) => /^-?(w|h|min-w|max-w|min-h|max-h|size|basis)-(full|auto|fit|min|max|screen|px)$|^(bg|border|text|ring|divide)-(transparent|current|inherit)$|^(shadow|rounded)-none$/.test(s)
      const samples = [...f.offScaleSamples].sort((a, b) => (boring(a) - boring(b)) || natCmp(a, b))
      return [k, {
        tokens: f.tokens,
        distinct: [...f.distinct].sort(natCmp),
        offScale: f.offScale,
        offScaleSamples: samples.slice(0, 6),
        offScaleByReason: Object.fromEntries([...f.reasons.entries()].sort((a, b) => b[1] - a[1])),
      }]
    })
  )

  const totalTokens = FAMILY_KEYS.reduce((n, k) => n + families[k].tokens, 0)
  const totalOff = FAMILY_KEYS.reduce((n, k) => n + families[k].offScale, 0)
  rows.push({
    name: c.name,
    package: c.package,
    files: c.files,
    ...(c.mergedFrom.length ? { mergedFrom: c.mergedFrom } : {}),
    totals: { tokens: totalTokens, offScale: totalOff, distinct: FAMILY_KEYS.reduce((n, k) => n + families[k].distinct.length, 0) },
    families,
    // Outside the eight families on purpose — see inlineStyleLiterals.
    inlineStyleLiterals: {
      uses: [...inline.values()].reduce((n, x) => n + x, 0),
      samples: [...inline.keys()].sort(natCmp).slice(0, 6),
    },
  })
}

/* ══ self-check ══════════════════════════════════════════════════════════ */

/**
 * The books have to balance or the diff is worthless: a usage counted twice
 * inflates a family, and one counted nowhere hides a call site. Asserted per
 * run rather than reasoned about once.
 */
const sumTokens = rows.reduce((n, r) => n + r.totals.tokens, 0)
const sumOff = rows.reduce((n, r) => n + r.totals.offScale, 0)
const sumUnclassified = [...unclassified.values()].reduce((n, u) => n + u.count, 0)
const selfCheck = {
  candidates: ledger.candidates,
  token: ledger.token,
  offScale: ledger.offScale,
  skipped: ledger.skip,
  unclassified: ledger.unclassified,
  perFamilyTokenSum: sumTokens,
  perFamilyOffScaleSum: sumOff,
  unclassifiedRowSum: sumUnclassified,
  balanced:
    ledger.candidates === ledger.token + ledger.offScale + ledger.skip + ledger.unclassified &&
    sumTokens === ledger.token &&
    sumOff === ledger.offScale &&
    sumUnclassified === ledger.unclassified,
}

const payload = {
  generatedAt: new Date().toISOString(),
  source: "scripts/audit-component-tokens.mjs",
  componentCount: rows.length,
  families: FAMILY_KEYS,
  scope: {
    roots: ROOTS.map((r) => `${r.dir}/**/*${INCLUDE_TS ? ".ts(x)" : ".tsx"}`),
    mergedVariantTables: VARIANT_FILES,
    includeSharedTs: INCLUDE_TS,
    excluded: ["index.ts barrels", "*.d.ts", "archive/"],
    omitted,
  },
  resolution: {
    note: "Every step below is read from the @theme block of the generated CSS, not listed here. A step the config declares and the CSS does not carry shows up in bridgeGaps.",
    defaultBorderWidth: DEFAULT_BORDER,
    defaultTransitionDuration: DEFAULT_DURATION,
    declaredSteps: Object.fromEntries(
      Object.entries(BRIDGE).map(([ns, spec]) => [ns, (spec.steps ?? []).map(String)])
    ),
    bridgeGaps,
    typeUtilities: [...TYPE_UTILITIES].sort(natCmp),
    shippedTokenCount: SHIPPED.size,
  },
  selfCheck: {
    ...selfCheck,
    unclassifiedByKind: Object.fromEntries(
      ["interpolated", "not-a-class", "unshipped-db-var", "unresolved"].map((k) => [
        k,
        [...unclassified.values()].filter((u) => u.kind === k).reduce((n, u) => n + u.count, 0),
      ])
    ),
    // The only kind that would mean the taxonomy has a hole.
    unresolvedIsEmpty: [...unclassified.values()].every((u) => u.kind !== "unresolved"),
  },
  skippedByReason: Object.fromEntries([...skipped.entries()].sort((a, b) => b[1] - a[1])),
  components: rows,
  unclassified: [...unclassified.values()].sort((a, b) => b.count - a.count || natCmp(a.class, b.class)),
}

fs.mkdirSync(path.join(ROOT, OUT_DIR), { recursive: true })
fs.writeFileSync(path.join(ROOT, OUT), JSON.stringify(payload, null, 2) + "\n")

/* ══ output ══════════════════════════════════════════════════════════════ */

const pad = (s, n) => String(s).padEnd(n)
const num = (s, n) => String(s).padStart(n)

/**
 * Every candidate in one component with the verdict it got, so a count can be
 * checked against the file rather than trusted. Hand-verifying Button, Table and
 * Badge against 40-odd classes each is the only way to know the taxonomy is
 * right, and doing it by eye is how an off-by-one survives.
 *
 *   node scripts/audit-component-tokens.mjs --explain Table
 */
const explainIdx = process.argv.indexOf("--explain")
if (explainIdx !== -1) {
  const want = process.argv[explainIdx + 1]
  const c = components.get(want)
  if (!c) {
    console.error(`no component named ${want}. Try: ${[...components.keys()].slice(0, 8).join(", ")} …`)
    process.exit(2)
  }
  for (const file of c.files) {
    console.log(`\n── ${file} ──`)
    const tally = new Map()
    for (const { cls, raw, sole } of classesIn(file)) {
      const v = classify(cls, { raw, sole })
      if (v.verdict === "skip") continue
      const label = v.verdict === "token" ? `TOKEN  ${v.family}/${v.token}`
        : v.verdict === "offScale" ? `off     ${v.family}  — ${v.reason}`
        : `?       ${v.kind} — ${v.why}`
      console.log(`  ${pad(raw, 46)} ${label}`)
      const k = v.verdict === "token" ? `${v.family} token` : v.verdict === "offScale" ? `${v.family} offScale` : "unclassified"
      tally.set(k, (tally.get(k) || 0) + 1)
    }
    for (const [k, n] of [...tally.entries()].sort(([a], [b]) => natCmp(a, b))) console.log(`     ${pad(k, 22)} ${n}`)
  }
  const inline = c.files.flatMap((f) => [...inlineStyleLiterals(f).entries()])
  if (inline.length) console.log(`\n  inline style literals: ${inline.map(([k, n]) => `${k} ×${n}`).join(", ")}`)
  process.exit(0)
}

if (process.argv.includes("--md")) {
  console.log(`### Token usage per component\n`)
  console.log(`${rows.length} components. \`t\` = usages resolving to a \`--db-*\` token, \`o\` = off-scale.\n`)
  console.log(`| Component | Pkg | ${FAMILY_KEYS.map((k) => `${k} t/o`).join(" | ")} | distinct |`)
  console.log(`|---|---|${FAMILY_KEYS.map(() => "---").join("|")}|---|`)
  for (const r of rows) {
    const cells = FAMILY_KEYS.map((k) => {
      const f = r.families[k]
      return f.tokens || f.offScale ? `${f.tokens}/${f.offScale}` : "—"
    })
    console.log(`| \`${r.name}\` | ${r.package} | ${cells.join(" | ")} | ${r.totals.distinct} |`)
  }
  console.log(`\n### Distinct tokens per component\n`)
  console.log(`| Component | Family | Tokens |`)
  console.log(`|---|---|---|`)
  for (const r of rows) {
    for (const k of FAMILY_KEYS) {
      const d = r.families[k].distinct
      if (d.length) console.log(`| \`${r.name}\` | ${k} | ${d.map((x) => `\`${x}\``).join(" ")} |`)
    }
  }
  console.log(`\n### Off-scale, by reason\n`)
  const reasons = new Map()
  for (const r of rows) {
    for (const k of FAMILY_KEYS) {
      for (const [why, n] of Object.entries(r.families[k].offScaleByReason)) {
        const key = `${k} — ${why}`
        reasons.set(key, (reasons.get(key) || 0) + n)
      }
    }
  }
  console.log(`| Family and reason | Uses |`)
  console.log(`|---|---|`)
  for (const [k, n] of [...reasons.entries()].sort((a, b) => b[1] - a[1])) console.log(`| ${k} | ${n} |`)
  process.exit(selfCheck.balanced ? 0 : 1)
}

if (process.argv.includes("--check")) {
  const bad = []
  if (!selfCheck.balanced) bad.push("the ledger does not add up — a usage was counted twice or not at all")
  if (bridgeGaps.length) bad.push(`${bridgeGaps.length} step(s) the config declares do not resolve in tokens.css`)
  const stillUnresolved = payload.unclassified.filter((u) => u.kind === "unresolved")
  for (const u of stillUnresolved) bad.push(`unresolved: ${u.class} in ${u.file} — ${u.why}`)
  console.log(`components ${rows.length} · candidates ${selfCheck.candidates} · tokens ${selfCheck.token} · offScale ${selfCheck.offScale} · unclassified ${selfCheck.unclassified}`)
  if (bad.length) {
    for (const b of bad) console.error(`FAIL  ${b}`)
    process.exit(1)
  }
  console.log("OK  ledger balances, every declared step resolves, nothing class-shaped went unclassified")
  process.exit(0)
}

console.log(`wrote ${OUT}  —  ${rows.length} components`)

console.log(`\n── resolution, read from the generated CSS ──`)
console.log(`  a bare \`border\`        ${DEFAULT_BORDER ? `→ --db-${DEFAULT_BORDER} (ours)` : "→ Tailwind's 1px (unbridged)"}`)
console.log(`  a bare \`transition\`    ${DEFAULT_DURATION ? `→ --db-${DEFAULT_DURATION} (ours)` : "→ Tailwind's default duration (unbridged)"}`)
console.log(`  shipped --db-* tokens  ${SHIPPED.size}`)
console.log(`  type-* ramp classes    ${TYPE_UTILITIES.size}`)
if (bridgeGaps.length) {
  console.log(`  CONFIG/CSS GAPS        ${bridgeGaps.length}`)
  for (const g of bridgeGaps) console.log(`    ${g.namespace}-${g.step} → ${g.resolved ?? "(absent from the @theme block)"}`)
} else {
  console.log(`  config <-> CSS         every declared step resolves to a token`)
}

console.log(`\n── system totals by family ──`)
console.log(`  family      tokens  distinct  offScale  components using`)
for (const k of FAMILY_KEYS) {
  const t = rows.reduce((n, r) => n + r.families[k].tokens, 0)
  const o = rows.reduce((n, r) => n + r.families[k].offScale, 0)
  const d = new Set(rows.flatMap((r) => r.families[k].distinct)).size
  const used = rows.filter((r) => r.families[k].tokens > 0).length
  console.log(`  ${pad(k, 11)} ${num(t, 6)} ${num(d, 9)} ${num(o, 9)} ${num(used, 17)}`)
}

console.log(`\n── the 12 components spending the most tokens ──`)
for (const r of [...rows].sort((a, b) => b.totals.tokens - a.totals.tokens).slice(0, 12)) {
  console.log(`  ${pad(r.name, 22)} ${num(r.totals.tokens, 4)} tokens  ${num(r.totals.distinct, 3)} distinct  ${num(r.totals.offScale, 4)} off-scale`)
}

console.log(`\n── the 12 highest off-scale counts ──`)
for (const r of [...rows].sort((a, b) => b.totals.offScale - a.totals.offScale).slice(0, 12)) {
  const worst = FAMILY_KEYS
    .map((k) => [k, r.families[k].offScale])
    .filter(([, n]) => n)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([k, n]) => `${k} ${n}`)
    .join(", ")
  console.log(`  ${pad(r.name, 22)} ${num(r.totals.offScale, 4)} off-scale  (${worst})`)
}

const zero = FAMILY_KEYS.map((k) => [k, rows.filter((r) => r.families[k].tokens === 0 && r.families[k].offScale > 0)])
console.log(`\n── families where a component spends zero tokens but writes the property anyway ──`)
for (const [k, list] of zero) {
  if (!list.length) continue
  console.log(`  ${pad(k, 11)} ${num(list.length, 3)} components — ${list.slice(0, 6).map((r) => r.name).join(", ")}${list.length > 6 ? " …" : ""}`)
}

console.log(`\n── ledger ──`)
console.log(`  candidates    ${num(selfCheck.candidates, 6)}`)
console.log(`  token         ${num(selfCheck.token, 6)}  (per-family sum ${sumTokens})`)
console.log(`  offScale      ${num(selfCheck.offScale, 6)}  (per-family sum ${sumOff})`)
console.log(`  skipped       ${num(selfCheck.skipped, 6)}  not token-bearing`)
console.log(`  unclassified  ${num(selfCheck.unclassified, 6)}  in ${unclassified.size} distinct class+file pairs`)
console.log(`  balanced      ${selfCheck.balanced ? "yes" : "NO — the ledger does not add up"}`)

console.log(`\n── unclassified, by kind ──`)
for (const [k, n] of Object.entries(payload.selfCheck.unclassifiedByKind)) {
  const label = {
    interpolated: "template-literal fragments — cannot be a class",
    "not-a-class": "prop values and data strings colliding with a utility prefix",
    "unshipped-db-var": "a --db-* name tokens.css does not ship",
    unresolved: "CLASS-SHAPED AND UNEXPLAINED — the taxonomy has a hole here",
  }[k]
  console.log(`  ${pad(k, 18)} ${num(n, 4)}  ${label}`)
}
const unresolved = payload.unclassified.filter((u) => u.kind === "unresolved")
if (unresolved.length) {
  for (const u of unresolved) console.log(`    ${pad(u.class, 32)} ${num(u.count, 3)} ×  ${u.file}\n      ${u.why}`)
} else {
  console.log(`  nothing class-shaped went unclassified.`)
}
for (const u of payload.unclassified.filter((u) => u.kind === "unshipped-db-var")) {
  console.log(`    ${pad(u.class, 32)} ${num(u.count, 3)} ×  ${u.file}`)
}

if (omitted.length) {
  console.log(`\n── outside the *.tsx scope: .ts files naming --db-* tokens ──`)
  for (const o of omitted) {
    console.log(`  ${o.file}`)
    console.log(`    ${o.dbRefs} refs, ${o.distinct.length} distinct — reaches no component row. --include-shared-ts folds it in.`)
  }
}

const inlineTotal = rows.reduce((n, r) => n + r.inlineStyleLiterals.uses, 0)
console.log(`\n── outside the eight families: px and rem literals in inline style={{ }} ──`)
console.log(`  ${inlineTotal} uses in ${rows.filter((r) => r.inlineStyleLiterals.uses).length} components — NOT counted in any family`)
for (const r of rows.filter((r) => r.inlineStyleLiterals.uses).sort((a, b) => b.inlineStyleLiterals.uses - a.inlineStyleLiterals.uses)) {
  console.log(`    ${pad(r.name, 20)} ${num(r.inlineStyleLiterals.uses, 3)} ×  ${r.inlineStyleLiterals.samples.slice(0, 3).join("  ")}`)
}

if (!selfCheck.balanced) process.exit(1)
