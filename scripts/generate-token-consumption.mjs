#!/usr/bin/env node
/**
 * Emits the consumption half of the Tokens page: for every shipped family, who
 * actually reads it, and for every Tailwind theme namespace the system leans on,
 * where its value comes from.
 *
 * `generate-token-data.mjs` answers "what ships". This answers "what is wired".
 * They are separate because a token can ship and be read by nothing, and that
 * gap is the single most useful thing the page can state — but only if it is
 * measured on every run rather than written down once.
 *
 * Two distinct ways a token reaches code, and the page has to tell them apart:
 *   DIRECT   a `var(--db-x)` in authored source.
 *   BRIDGED  an `@theme` mapping turns it into a utility, so `bg-surface-base`
 *            or `rounded-md` resolves to it without naming it.
 * A family with neither is a dial wired to nothing.
 *
 * Scalars need a third pass. `--db-type-scalar` is referenced only inside the
 * generated CSS, which looks dead by a direct count, but the tokens it multiplies
 * are read through `type.css` — so it is live. `--db-spacing-scalar` has the same
 * shape and is not, because the space tokens it multiplies are read by nobody.
 * Liveness is therefore resolved through what a scalar drives, not by counting
 * its own references.
 *
 * A family with neither can still be one of two very different things, and the
 * page cannot say "nothing reads this" without saying which:
 *   UNREAD      nothing renders the property at all.
 *   SUPERSEDED  the property renders constantly, from a Tailwind namespace
 *               rather than from our token. Shadows are the case that alarms
 *               people: 83 shadow utilities ship and not one resolves to
 *               `--db-elevation-*`.
 * The namespace that took the job is declared per family and its uses are
 * measured, so the claim disappears on its own if the utilities stop being used.
 *
 *   node scripts/generate-token-consumption.mjs
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const rel = (p) => path.relative(ROOT, p).split(path.sep).join("/")

/**
 * The bridge, read from the config rather than restated here. A dimensional
 * family is only bridged for the stops it declares — `p-3` resolves to a token
 * and `p-1.5` does not — so the utilities that count as consumption have to be
 * derived from the same list the CSS is generated from, or this scan starts
 * crediting the family with uses it does not own.
 */
const { bridge: BRIDGE } = await import("../packages/dbui/src/tokens/theme.config.mjs")

/**
 * Which utility prefixes read which Tailwind namespace.
 *
 * `min-h` and `max-h` sit under height because they inherit `--height-*`, while
 * `min-w` and `max-w` sit under spacing because `--width-*` does NOT reach them.
 * That asymmetry is Tailwind's, measured in verify-spacing-scale (F7, F11), and
 * getting it backwards would attribute a `min-w-3` to the wrong family.
 */
const NAMESPACE_UTILITIES = {
  spacing: ["p", "px", "py", "pt", "pr", "pb", "pl", "ps", "pe", "m", "mx", "my", "mt", "mr", "mb", "ml", "ms", "me",
    "gap", "gap-x", "gap-y", "space-x", "space-y", "inset", "inset-x", "inset-y",
    "top", "right", "bottom", "left", "start", "end", "min-w", "max-w"],
  size: ["size"],
  "z-index": ["z"],
  height: ["h", "min-h", "max-h"],
  width: ["w"],
  radius: ["rounded", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-s", "rounded-e",
    "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
  "border-width": ["border", "border-t", "border-r", "border-b", "border-l", "border-x", "border-y"],
  // Only the stepped classes. `shadow-none` is a CSS keyword with no token
  // behind it and `shadow-focus` is authored in globals.css, so neither is
  // evidence that the elevation family is read.
  shadow: ["shadow"],
}

const escape = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

/** One regex matching exactly the utilities a family's declared stops produce. */
function bridgedUtilities(namespaces) {
  const alternatives = namespaces.flatMap((ns) => {
    const steps = BRIDGE[ns]?.steps ?? []
    if (!steps.length) return []
    const stepRe = steps.map(escape).join("|")
    return [`(?:${NAMESPACE_UTILITIES[ns].map(escape).join("|")})-(?:${stepRe})`]
  })
  return new RegExp(`^(?:${alternatives.join("|")})$`)
}

const TOKENS_CSS = "packages/dbui/src/tokens/tokens.css"
const TYPE_CSS = "packages/dbui/src/tokens/type.css"
const PKG_GLOBALS = "packages/dbui/src/tokens/globals.css"
const PORTAL_GLOBALS = "apps/portal/src/app/globals.css"
const TW_THEME = "node_modules/tailwindcss/theme.css"
const OUT = path.join(ROOT, "apps/portal/src/stories/tokens/token-consumption.ts")

const readFile = (p) => fs.readFileSync(path.join(ROOT, p), "utf8")
const exists = (p) => fs.existsSync(path.join(ROOT, p))

/* ── file collection ──────────────────────────────────────────────────────── */

const SKIP_DIR = new Set(["node_modules", ".next", "dist", "archive", ".git", "storybook-static"])
/** Generated, so a reference inside one is plumbing rather than consumption. */
const GENERATED = new Set([TOKENS_CSS, TYPE_CSS, "scripts/design-lint/tokens.json"])
/**
 * The token config is not component source. Its string literals are token names,
 * and `"text-base"` sitting in the semantics map reads as a Tailwind `text-base`
 * to any scanner that treats every quoted string as a class list.
 */
const NOT_SOURCE = new Set([
  "packages/dbui/src/tokens/theme.config.mjs",
  // This file's own output and its sibling. Both hold token values as string
  // data, so scanning them counts the Tokens page's source data as a consumer
  // of the tokens it describes — and this one would accumulate against itself
  // on every run.
  "apps/portal/src/stories/tokens/token-data.ts",
  "apps/portal/src/stories/tokens/token-consumption.ts",
])

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIR.has(e.name)) continue
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else if (/\.(tsx?|css|mjs|js)$/.test(e.name)) out.push(p)
  }
  return out
}

/**
 * `system` is the shipped surface — a consumer here means the design system
 * itself depends on the token. `portal` is the docs site, where a reference is
 * usually a preview of the token rather than a use of it. Reporting them as one
 * number would let the Tokens page rendering a swatch stand in for a component
 * consuming the value.
 */
const SCOPES = {
  system: ["packages/dbui/src", "packages/dbui-shells/src", "packages/dbui-viz/src", "packages/dbui-chat/src"],
  portal: ["apps/portal/src", "figma"],
}

const files = {}
for (const [scope, roots] of Object.entries(SCOPES)) {
  files[scope] = roots
    .flatMap((r) => walk(path.join(ROOT, r)))
    .map(rel)
    .filter((f) => !GENERATED.has(f) && !NOT_SOURCE.has(f))
}
/** Authored CSS that carries the Tailwind bridges. Counted as system wiring. */
const BRIDGE_FILES = [PKG_GLOBALS, PORTAL_GLOBALS].filter(exists)

/* ── what ships ───────────────────────────────────────────────────────────── */

const tokensCss = readFile(TOKENS_CSS)
const shipped = [...tokensCss.matchAll(/^\s*(--db-[a-z0-9-]+):/gm)].map((m) => m[1])
const uniqueShipped = [...new Set(shipped)]

/**
 * Families in the order the page presents them. `match` decides which shipped
 * names belong to a family; `bridge` names the `@theme` or `@utility` layer that
 * turns them into a class, and is null when nothing does.
 *
 * `unit` is what a reader counts, and it is not always a custom property. Type
 * emits several properties per style, so a column headed with a property count
 * answered a question nobody asked and contradicted the ramp printed beside it.
 * `count` overrides the member count for exactly that case. Every other family
 * emits one property per thing, so the two agree and the page has nothing extra
 * to show.
 *
 * `supersededBy` is the Tailwind namespace that does the job the family was
 * meant to do. It is a claim about architecture, so it is declared here, but
 * its weight is measured below against the same scan the Tailwind table uses.
 */
const FAMILIES = [
  {
    key: "color",
    label: "Color",
    unit: "colors",
    // `--db-border-1` is a width and `--db-border-base` is a color, so border is
    // split on whether the suffix is a number rather than on the prefix.
    match: (n) => !/^--db-(space|radius|size|border-\d|elevation|duration|ease|font|line-height|letter-spacing|mono-font|spacing-unit|density-scalar|type-scalar)/.test(n),
    bridge: { kind: "theme", namespace: "--color-*", file: TOKENS_CSS, utilities: /^(bg|text|border|ring|fill|stroke|outline|from|via|to|divide|placeholder|caret|accent|shadow|decoration)-/ },
  },
  {
    key: "type",
    label: "Type",
    unit: "styles",
    // The classes the ramp ships, which is the thing a reader picks from. Read
    // out of the same file the bridge points at rather than divided out of the
    // property count, so a step that stops shipping a property still counts once.
    count: () => [...readFile(TYPE_CSS).matchAll(/@utility type-[a-z0-9-]+/g)].length,
    match: (n) => /^--db-(font|line-height|letter-spacing|mono-font)/.test(n),
    bridge: { kind: "utility", namespace: "type-*", file: TYPE_CSS, utilities: /^type-/ },
  },
  {
    key: "elevation",
    label: "Elevation",
    unit: "levels",
    match: (n) => /^--db-elevation-/.test(n),
    // Bridged as of the DuBois alignment. Until then this family declared no
    // bridge and named `--shadow-*` as the namespace that had taken its job —
    // which was true, and was the whole defect: the tokens shipped and Tailwind
    // rendered. The namespace is now ours, so it is a bridge, not a usurper.
    bridge: { kind: "theme", namespace: "--shadow-*", file: TOKENS_CSS, utilities: bridgedUtilities(["shadow"]) },
  },
  {
    key: "scalars",
    label: "Scalars",
    unit: "dials",
    match: (n) => /^--db-(spacing-unit|density-scalar|type-scalar)$/.test(n),
    bridge: null,
  },
  // Bridged per stop, not wholesale. `--spacing` is still declared as an
  // open-ended multiplier, so the 818 dimensional utilities in the tree do NOT
  // all resolve to a token — only the ones whose step this scale defines. The
  // regex is built from the config's own step list, so the gap between this
  // number and the 818 in the Tailwind table is the off-scale remainder.
  {
    key: "space",
    label: "Space",
    unit: "steps",
    match: (n) => /^--db-space-/.test(n),
    bridge: { kind: "theme", namespace: "--spacing-*", file: TOKENS_CSS, utilities: bridgedUtilities(["spacing"]) },
    supersededBy: "--spacing",
  },
  {
    key: "size",
    label: "Size",
    unit: "steps",
    match: (n) => /^--db-size-/.test(n),
    bridge: { kind: "theme", namespace: "--size-*, --height-*, --width-*", file: TOKENS_CSS, utilities: bridgedUtilities(["size", "height", "width"]) },
    supersededBy: "--spacing",
  },
  {
    key: "radius",
    label: "Radius",
    unit: "steps",
    match: (n) => /^--db-radius-/.test(n),
    bridge: { kind: "theme", namespace: "--radius-*", file: TOKENS_CSS, utilities: bridgedUtilities(["radius"]) },
  },
  {
    key: "border",
    label: "Border width",
    unit: "widths",
    // A numeric suffix is a width; a word suffix is a color.
    match: (n) => /^--db-border-\d/.test(n),
    bridge: { kind: "theme", namespace: "--border-width-*", file: TOKENS_CSS, utilities: bridgedUtilities(["border-width"]) },
  },
  {
    key: "layer",
    label: "Layer",
    unit: "layers",
    match: (n) => /^--db-layer-/.test(n),
    bridge: { kind: "theme", namespace: "--z-index-*", file: TOKENS_CSS, utilities: bridgedUtilities(["z-index"]) },
  },
  {
    key: "motion",
    label: "Motion",
    unit: "values",
    match: (n) => /^--db-(duration|ease)-/.test(n),
    bridge: null,
    // The dominant path by a wide margin: a bare `transition` takes Tailwind's
    // default duration. `duration-*` is the smaller, more obvious case and the
    // Tailwind table lists it in its own right.
    supersededBy: "--default-transition-duration",
  },
]

/** Anything but color is matched first, so `--db-border-1` lands on Border width. */
function familyOf(name) {
  const specific = FAMILIES.find((f) => f.key !== "color" && f.match(name))
  return specific ?? FAMILIES.find((f) => f.key === "color")
}

const members = Object.fromEntries(FAMILIES.map((f) => [f.key, []]))
for (const name of uniqueShipped) members[familyOf(name).key].push(name)

/* ── who reads it ─────────────────────────────────────────────────────────── */

/** Class-ish strings out of every quoted literal, variants stripped unless asked. */
function classesIn(src, keepVariant = false) {
  const out = []
  for (const m of src.matchAll(/(["'`])([^"'`\n]*?)\1/g)) {
    for (const cls of m[2].split(/\s+/)) {
      if (!cls) continue
      out.push(keepVariant ? cls : cls.replace(/^(?:[a-z0-9@-]+:)+/, "").replace(/^!|!$/g, ""))
    }
  }
  return out
}

const sourceCache = new Map()
const srcOf = (f) => {
  if (!sourceCache.has(f)) sourceCache.set(f, readFile(f))
  return sourceCache.get(f)
}

/**
 * Comments stripped, because a JSDoc block explaining that the ramp ships as
 * `calc(<rem> * var(--db-type-scalar))` is documentation. Counting it made two
 * files look like consumers of a scalar that neither one reads.
 *
 * Line comments only when they start the line, so a `https://` in a string
 * survives.
 */
const codeCache = new Map()
const codeOf = (f) => {
  if (!codeCache.has(f)) {
    codeCache.set(f, srcOf(f).replace(/\/\*[\s\S]*?\*\//g, "").replace(/^[ \t]*\/\/.*$/gm, ""))
  }
  return codeCache.get(f)
}

/** Literal `var(--db-x)` references, per file, for one set of token names. */
function directRefs(names, fileList) {
  const set = new Set(names)
  const hits = []
  for (const f of fileList) {
    let n = 0
    for (const m of codeOf(f).matchAll(/var\(\s*(--db-[a-z0-9-]+)/g)) if (set.has(m[1])) n++
    if (n) hits.push({ file: f, refs: n })
  }
  return hits.sort((a, b) => b.refs - a.refs)
}

/** Uses of the utilities a bridge produces, so a bridged family can prove itself. */
function bridgeUses(re, fileList) {
  let uses = 0
  const seen = new Set()
  for (const f of fileList) {
    let n = 0
    for (const cls of classesIn(codeOf(f))) if (re.test(cls)) n++
    if (n) { uses += n; seen.add(f) }
  }
  return { uses, files: seen.size }
}

/**
 * The same count for a Tailwind namespace. A variant (`md:`) is matched against
 * the raw token, since stripping the prefix is what identifies it.
 */
function utilityUses(re, isVariant = false) {
  let uses = 0
  const seen = new Set()
  for (const f of files.system) {
    let n = 0
    for (const cls of classesIn(codeOf(f), isVariant)) if (re.test(cls)) n++
    if (n) { uses += n; seen.add(f) }
  }
  return { uses, files: seen.size }
}

const families = FAMILIES.map((f) => {
  const names = members[f.key]
  const system = directRefs(names, files.system)
  const portal = directRefs(names, files.portal)
  const bridge = f.bridge
    ? {
        namespace: f.bridge.namespace,
        kind: f.bridge.kind,
        file: f.bridge.file,
        ...bridgeUses(f.bridge.utilities, files.system),
      }
    : null
  return {
    key: f.key,
    label: f.label,
    count: f.count ? f.count() : names.length,
    unit: f.unit,
    properties: names.length,
    bridge,
    // Filled from the Tailwind scan below, once the uses exist to measure.
    superseded: null,
    systemRefs: system.reduce((n, c) => n + c.refs, 0),
    systemConsumers: system,
    portalRefs: portal.reduce((n, c) => n + c.refs, 0),
    portalConsumers: portal,
  }
})

/**
 * Live = something outside the generated CSS resolves to it. A bridge only
 * counts when its utilities are actually used, otherwise a mapping nobody
 * writes a class for would make a dead family look wired.
 */
for (const f of families) {
  f.live = f.systemRefs > 0 || (f.bridge?.uses ?? 0) > 0
}

/* ── Tailwind namespaces the system leans on ──────────────────────────────── */
const twTheme = exists(TW_THEME) ? readFile(TW_THEME) : ""
const twDefault = (key) => {
  const m = twTheme.match(new RegExp(`^\\s*${key.replace(/[-*]/g, (c) => (c === "*" ? "[a-z0-9-]+" : "\\-"))}:\\s*([^;]+);`, "m"))
  return m ? m[1].trim() : null
}

/**
 * Where a Tailwind namespace is set, if it is, and to what. The generated layer
 * is checked first because that is where the bridge is authored — a hand-written
 * copy in globals.css is the drift case, not the owner.
 */
function override(key) {
  for (const f of [TOKENS_CSS, ...BRIDGE_FILES]) {
    const m = codeOf(f).match(new RegExp(`^\\s*${key.replace(/-/g, "\\-")}:\\s*([^;]+);`, "m"))
    if (m) return { file: f, value: m[1].trim() }
  }
  return null
}

/**
 * One row per Tailwind theme namespace that something in the system depends on.
 * `utilities` is the regex that finds real uses; `probe` is the single theme key
 * read to show whose value is in force. Descriptions live on the page — this
 * file carries only what can be measured.
 */
const TAILWIND = [
  { namespace: "--spacing", probe: "--spacing", utilities: /^-?(p|px|py|pt|pr|pb|pl|ps|pe|m|mx|my|mt|mr|mb|ml|ms|me|gap|gap-x|gap-y|space-x|space-y|inset|inset-x|inset-y|top|right|bottom|left|start|end|w|h|size|min-w|min-h|max-w|max-h|translate-x|translate-y)-(\d+(\.\d+)?|px)$/ },
  { namespace: "--radius-*", probe: "--radius-md", utilities: /^rounded(-[a-z]+)?(-(none|xs|sm|md|lg|xl|2xl|3xl|4xl|full))?$/ },
  { namespace: "--shadow-*", probe: "--shadow-lg", utilities: /^(shadow|inset-shadow|drop-shadow)-(2xs|xs|sm|md|lg|xl|2xl|none)$/ },
  // Not a Tailwind key at all — DBUI adds it to the shadow namespace in
  // globals.css, composing two color tokens with px widths that live nowhere
  // else. The focus treatment is therefore authored outside theme.config.mjs.
  { namespace: "--shadow-focus", probe: "--shadow-focus", utilities: /^shadow-focus$/ },
  { namespace: "--default-transition-duration", probe: "--default-transition-duration", utilities: /^transition(-(all|colors|opacity|shadow|transform|none))?$/ },
  // Explicit overrides rather than a namespace: `duration-100` is a bare number
  // and bypasses both Tailwind's default and the DBUI motion tokens, so pinning
  // it to a theme key would misreport where its value comes from.
  { namespace: "duration-* and ease-*", probe: null, utilities: /^(duration|ease)-/ },
  { namespace: "--container-*", probe: "--container-sm", utilities: /^(max-w|min-w|w)-(3xs|2xs|xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl)$/ },
  { namespace: "--breakpoint-*", probe: "--breakpoint-sm", utilities: null, variants: /^(max-)?(sm|md|lg|xl|2xl):/ },
  { namespace: "--text-*", probe: "--text-sm", utilities: /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)$/ },
  { namespace: "--font-weight-*", probe: "--font-weight-semibold", utilities: /^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/ },
  { namespace: "--leading-*", probe: "--leading-snug", utilities: /^leading-/ },
  { namespace: "--tracking-*", probe: "--tracking-tight", utilities: /^tracking-/ },
  { namespace: "--animate-*", probe: "--animate-spin", utilities: /^animate-/ },
  { namespace: "--blur-*", probe: "--blur-xs", utilities: /^(blur|backdrop-blur)-/ },
  // z-index and ring width have no theme namespace at all in Tailwind v4 — the
  // scale is baked into the utility, so there is nothing a token could override.
  // `z-index scale` used to sit here, as the ordering the system did not own: every
  // overlay wrote a bare `z-50`, which Tailwind mints from the number rather than
  // the namespace, so which one covered which was decided by portal order. The
  // `layer` family and the `--z-index-*` namespace close that (N1 to N3 in
  // verify-spacing-scale), so the row moved into the family table. A bare `z-50`
  // still compiles — there is no key to close — which is why the Layer panel says
  // not to write one.
  { namespace: "ring and outline width", probe: null, utilities: /^(ring|outline|inset-ring)(-\d+)?$/ },
  // `border and divide width` used to sit here, as the scale the Border width
  // family was named for and did not own: a bare `border` was Tailwind's 1px,
  // not our token, so every hairline in the system rendered from a value no
  // token governed. `--default-border-width` plus the `--border-width-*`
  // namespace closes that, and the divide utilities read the same keys (K7, K8
  // and K11 in verify-spacing-scale), so the row moved into the family table.
]

const tailwind = TAILWIND.map((t) => {
  const { uses, files } = utilityUses(t.utilities ?? t.variants, Boolean(t.variants))
  const ov = t.probe ? override(t.probe) : null
  const tailwindValue = t.probe ? twDefault(t.probe) : null
  return {
    namespace: t.namespace,
    probe: t.probe,
    tailwindValue,
    overriddenIn: ov?.file ?? null,
    overriddenTo: ov?.value ?? null,
    // Overriding an existing Tailwind key and adding a new one to its namespace
    // are different claims, and the page has to be able to say which.
    origin: ov ? (tailwindValue ? "override" : "addition") : t.probe ? "tailwind" : "utility",
    uses,
    files,
  }
}).sort((a, b) => b.uses - a.uses)

/* ── what took the job instead ────────────────────────────────────────────── */

/**
 * An unread family and a superseded one are both "nothing reads this", and only
 * one of them means the UI has none of the thing. Attached only where the family
 * is not live and the namespace is actually written, so the page never claims a
 * usurper that does not exist.
 */
for (const f of families) {
  const declared = FAMILIES.find((spec) => spec.key === f.key)?.supersededBy
  if (!declared || f.live) continue
  const row = tailwind.find((t) => t.namespace === declared)
  if (!row || row.uses === 0) continue
  f.superseded = { namespace: row.namespace, uses: row.uses, files: row.files }
}

/* ── scalars, resolved through what they drive ────────────────────────────── */

const liveByKey = Object.fromEntries(families.map((f) => [f.key, f.live]))

/**
 * The bridge lines in the generated @theme block. A scalar folded into one of
 * Tailwind's own namespaces reaches every utility in it without ever appearing
 * in a component, so it has to be read out of the mapping rather than counted.
 * Colors are excluded — they carry no scalar.
 */
const themeBlock = tokensCss.slice(tokensCss.indexOf("@theme inline {"), tokensCss.indexOf(":root {"))
const bridgeKeys = [...themeBlock.matchAll(/^\s*(--(?!color-)[a-z0-9-]+):\s*([^;]+);/gm)]
  .map((m) => ({ key: m[1], value: m[2] }))

/**
 * A scalar's own reference count says nothing — it is multiplied inside the
 * generated CSS, never written by hand. What decides whether the dial does
 * anything is whether something downstream is read: a family whose tokens it
 * multiplies, or a Tailwind namespace it stands behind.
 */
/**
 * Every declaration in the generated stylesheets, as property and value.
 *
 * Both sheets, because the multiplication can sit on either side of the token
 * and the two families do it differently on purpose. Space, size and radius bake
 * the density scalar into the token's own value, so the evidence is in that
 * declaration. Type does the opposite: a stop carries its plain value and the
 * utility applies the scalar, so that a context can swap the stop and so that
 * the calc resolves on the element. Looking only in tokens.css is what made the
 * type scalar report DEAD the day it started working properly.
 */
const generatedDeclarations = [tokensCss, readFile(TYPE_CSS)].flatMap((sheet) =>
  [...sheet.matchAll(/(?:^|\n)\s*(--[a-z0-9-]+|[a-z-]+):\s*([^;{}]+);/g)].map((m) => ({ prop: m[1], value: m[2] })),
)

const scalars = members.scalars.map((name) => {
  // A family is driven when a declaration multiplies by this scalar and either
  // IS one of the family's tokens or READS one.
  const drives = FAMILIES.filter((f) => f.key !== "scalars").filter((f) =>
    members[f.key].some((token) =>
      generatedDeclarations.some(
        (d) => d.value.includes(`var(${name})`) && (d.prop === token || d.value.includes(`var(${token})`)),
      ),
    )
  ).map((f) => f.key)
  // Which Tailwind namespaces resolve through it, and whether anything uses them.
  const bridges = bridgeKeys
    .filter((b) => b.value.includes(`var(${name})`))
    .map((b) => {
      const spec = TAILWIND.find((t) => t.probe === b.key || t.namespace === b.key)
      return {
        namespace: b.key,
        uses: spec ? utilityUses(spec.utilities ?? spec.variants, Boolean(spec.variants)).uses : 0,
      }
    })
  return {
    name,
    drives,
    bridges,
    live: drives.some((k) => liveByKey[k]) || bridges.some((b) => b.uses > 0),
  }
})

// The family row inherits from its members, or the Scalars section would report
// dead while one of its dials demonstrably turns the type ramp.
const scalarFamily = families.find((f) => f.key === "scalars")
if (scalarFamily) scalarFamily.live = scalars.some((s) => s.live)

/**
 * Every place a Tailwind namespace is set outside the generated layer. An entry
 * here is a mapping the generator does not own, which is how radius came to be
 * stated twice from two different sources.
 */
const themeOverrides = BRIDGE_FILES.flatMap((f) => {
  const src = codeOf(f)
  return [...src.matchAll(/^\s*(--(?:radius|shadow|font|color|spacing|text|animate)-[a-z0-9-]*|--(?:radius|spacing)):\s*([^;]+);/gm)].map((m) => ({
    file: f,
    key: m[1],
    value: m[2].trim(),
    fromToken: m[2].includes("var(--db-"),
  }))
})

/* ── px and rem literals still in component source ────────────────────────── */

const LITERAL = /\[[-\d.]+(px|rem)\]/
const hardcoded = { uses: 0, files: [], samples: [] }
for (const f of files.system) {
  let n = 0
  const local = []
  for (const cls of classesIn(codeOf(f))) {
    if (LITERAL.test(cls)) { n++; local.push(cls) }
  }
  if (n) {
    hardcoded.uses += n
    hardcoded.files.push({ file: f, refs: n, samples: [...new Set(local)].slice(0, 4) })
  }
}
hardcoded.files.sort((a, b) => b.refs - a.refs)
hardcoded.samples = [...new Set(hardcoded.files.flatMap((f) => f.samples))].slice(0, 12)

/* ── emit ─────────────────────────────────────────────────────────────────── */

const payload = { families, scalars, tailwind, themeOverrides, hardcoded, tailwindVersion: exists("node_modules/tailwindcss/package.json") ? JSON.parse(readFile("node_modules/tailwindcss/package.json")).version : null }

fs.mkdirSync(path.dirname(OUT), { recursive: true })
fs.writeFileSync(
  OUT,
  `// Generated by scripts/generate-token-consumption.mjs — do not edit by hand.
// Measured against the repo, so a family that nothing reads reports itself.

export type Consumer = { file: string; refs: number }
export type Bridge = { namespace: string; kind: string; file: string; uses: number; files: number }
/** The Tailwind namespace rendering what this family was meant to render. */
export type Superseded = { namespace: string; uses: number; files: number }
export type Family = {
  key: string
  label: string
  /** How many of the thing a reader counts — styles for type, levels for elevation. */
  count: number
  /** The noun for that thing, so a bare number cannot be read as a property count. */
  unit: string
  /** CSS custom properties emitted. Larger than \`count\` only where one thing sets several. */
  properties: number
  bridge: Bridge | null
  /** Set only when the family is not live and something else does its job. */
  superseded: Superseded | null
  systemRefs: number
  systemConsumers: Consumer[]
  portalRefs: number
  portalConsumers: Consumer[]
  live: boolean
}
/** bridges = Tailwind namespaces whose value resolves through this dial. */
export type Scalar = {
  name: string
  drives: string[]
  bridges: Array<{ namespace: string; uses: number }>
  live: boolean
}
export type TailwindNamespace = {
  namespace: string
  probe: string | null
  tailwindValue: string | null
  overriddenIn: string | null
  overriddenTo: string | null
  /** override = DBUI replaces a Tailwind key · addition = DBUI adds one to the
   *  namespace · tailwind = Tailwind's value stands · utility = no theme key. */
  origin: "override" | "addition" | "tailwind" | "utility"
  uses: number
  files: number
}
export type ThemeOverride = { file: string; key: string; value: string; fromToken: boolean }
export type Hardcoded = {
  uses: number
  files: Array<{ file: string; refs: number; samples: string[] }>
  samples: string[]
}

export const families: Family[] = ${JSON.stringify(families, null, 2)}

export const scalars: Scalar[] = ${JSON.stringify(scalars, null, 2)}

export const tailwind: TailwindNamespace[] = ${JSON.stringify(tailwind, null, 2)}

export const themeOverrides: ThemeOverride[] = ${JSON.stringify(themeOverrides, null, 2)}

export const hardcoded: Hardcoded = ${JSON.stringify(hardcoded, null, 2)}

export const tailwindVersion = ${JSON.stringify(payload.tailwindVersion)}
`
)

console.log(`wrote ${rel(OUT)}`)
console.log(`\nfamily          ships           props  system  bridge uses  state`)
for (const f of families) {
  const state = f.live ? "live" : f.superseded ? `superseded by ${f.superseded.namespace}` : "UNREAD"
  console.log(
    `${f.key.padEnd(15)} ${`${f.count} ${f.unit}`.padEnd(15)} ${String(f.properties).padStart(5)} ${String(f.systemRefs).padStart(7)} ${String(f.bridge?.uses ?? 0).padStart(11)}  ${state}`
  )
}
console.log(`\nscalars`)
for (const s of scalars) {
  const via = s.bridges.map((b) => `${b.namespace} (${b.uses} uses)`).join(", ")
  console.log(
    `  ${s.name.padEnd(24)} drives ${s.drives.join(", ") || "(nothing)"}` +
    `${via ? ` · bridges ${via}` : ""} — ${s.live ? "live" : "DEAD"}`
  )
}
console.log(`\ntailwind namespaces in use: ${tailwind.filter((t) => t.uses).length}`)
for (const t of tailwind) console.log(`  ${t.namespace.padEnd(38)} ${String(t.uses).padStart(5)} uses  ${t.overriddenIn ? "overridden in " + t.overriddenIn : ""}`)
console.log(`\npx/rem literals: ${hardcoded.uses} in ${hardcoded.files.length} files`)
