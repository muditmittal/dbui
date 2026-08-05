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
 *   node scripts/generate-token-consumption.mjs
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const rel = (p) => path.relative(ROOT, p).split(path.sep).join("/")

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
  system: ["packages/dbui/src", "packages/dbui-shells/src", "packages/dbui-viz/src", "packages/dbui-genie/src"],
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
 */
const FAMILIES = [
  {
    key: "color",
    label: "Color",
    match: (n) => !/^--db-(space|radius|size|border-width|elevation|duration|ease|font|line-height|letter-spacing|mono-font|spacing-unit|density-scalar|spacing-scalar|sizing-scalar|type-scalar)/.test(n),
    bridge: { kind: "theme", namespace: "--color-*", file: TOKENS_CSS, utilities: /^(bg|text|border|ring|fill|stroke|outline|from|via|to|divide|placeholder|caret|accent|shadow|decoration)-/ },
  },
  {
    key: "type",
    label: "Type",
    match: (n) => /^--db-(font|line-height|letter-spacing|mono-font)/.test(n),
    bridge: { kind: "utility", namespace: "type-*", file: TYPE_CSS, utilities: /^type-/ },
  },
  { key: "space", label: "Space", match: (n) => /^--db-space-/.test(n), bridge: null },
  {
    key: "radius",
    label: "Radius",
    match: (n) => /^--db-radius-/.test(n),
    bridge: { kind: "theme", namespace: "--radius-*", file: PORTAL_GLOBALS, utilities: /^rounded(-|$)/ },
  },
  { key: "size", label: "Size", match: (n) => /^--db-size-/.test(n), bridge: null },
  { key: "border", label: "Border width", match: (n) => /^--db-border-width-/.test(n), bridge: null },
  { key: "elevation", label: "Elevation", match: (n) => /^--db-elevation-/.test(n), bridge: null },
  { key: "motion", label: "Motion", match: (n) => /^--db-(duration|ease)-/.test(n), bridge: null },
  {
    key: "scalars",
    label: "Scalars",
    match: (n) => /^--db-(spacing-unit|density-scalar|spacing-scalar|sizing-scalar|type-scalar)$/.test(n),
    bridge: null,
  },
]

/** Longest-prefix wins, so `--db-border-width-thin` lands on Border width. */
function familyOf(name) {
  const specific = FAMILIES.find((f) => f.key !== "color" && f.match(name))
  return specific ?? FAMILIES.find((f) => f.key === "color")
}

const members = Object.fromEntries(FAMILIES.map((f) => [f.key, []]))
for (const name of uniqueShipped) members[familyOf(name).key].push(name)

/* ── who reads it ─────────────────────────────────────────────────────────── */

/** Class-ish strings out of every quoted literal, variants stripped. */
function classesIn(src) {
  const out = []
  for (const m of src.matchAll(/(["'`])([^"'`\n]*?)\1/g)) {
    for (const cls of m[2].split(/\s+/)) {
      if (cls) out.push(cls.replace(/^(?:[a-z0-9@-]+:)+/, "").replace(/^!|!$/g, ""))
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
    tokens: names.length,
    bridge,
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

/* ── scalars, resolved through what they drive ────────────────────────────── */

const liveByKey = Object.fromEntries(families.map((f) => [f.key, f.live]))

/**
 * A scalar's own reference count says nothing — it is multiplied inside the
 * generated CSS, never written by hand. What decides whether the dial does
 * anything is whether the family it multiplies is read.
 */
const scalars = members.scalars.map((name) => {
  // Which families' values contain this scalar inside their calc().
  const drives = FAMILIES.filter((f) => f.key !== "scalars").filter((f) =>
    members[f.key].some((token) => {
      const m = tokensCss.match(new RegExp(`^\\s*${token}:\\s*([^;]+);`, "m"))
      return m ? m[1].includes(`var(${name})`) : false
    })
  ).map((f) => f.key)
  return { name, drives, live: drives.some((k) => liveByKey[k]) }
})

// The family row inherits from its members, or the Scalars section would report
// dead while one of its dials demonstrably turns the type ramp.
const scalarFamily = families.find((f) => f.key === "scalars")
if (scalarFamily) scalarFamily.live = scalars.some((s) => s.live)

/* ── Tailwind namespaces the system leans on ──────────────────────────────── */

const twTheme = exists(TW_THEME) ? readFile(TW_THEME) : ""
const twDefault = (key) => {
  const m = twTheme.match(new RegExp(`^\\s*${key.replace(/[-*]/g, (c) => (c === "*" ? "[a-z0-9-]+" : "\\-"))}:\\s*([^;]+);`, "m"))
  return m ? m[1].trim() : null
}

/** Where a Tailwind namespace is overridden, if it is, and to what. */
function override(key) {
  for (const f of BRIDGE_FILES) {
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
  { namespace: "z-index scale", probe: null, utilities: /^-?z-\d+$/ },
  { namespace: "ring and outline width", probe: null, utilities: /^(ring|outline|inset-ring)(-\d+)?$/ },
]

const tailwind = TAILWIND.map((t) => {
  const re = t.utilities ?? t.variants
  let uses = 0
  const seen = new Set()
  for (const f of files.system) {
    let n = 0
    for (const m of codeOf(f).matchAll(/(["'`])([^"'`\n]*?)\1/g)) {
      for (const raw of m[2].split(/\s+/)) {
        if (!raw) continue
        const cls = t.variants ? raw : raw.replace(/^(?:[a-z0-9@-]+:)+/, "").replace(/^!|!$/g, "")
        if (re.test(cls)) n++
      }
    }
    if (n) { uses += n; seen.add(f) }
  }
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
    files: seen.size,
  }
}).sort((a, b) => b.uses - a.uses)

/**
 * Every place a Tailwind namespace is set outside the generated layer, so a
 * reader can see that radius is defined twice from two different sources.
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
export type Family = {
  key: string
  label: string
  tokens: number
  bridge: Bridge | null
  systemRefs: number
  systemConsumers: Consumer[]
  portalRefs: number
  portalConsumers: Consumer[]
  live: boolean
}
export type Scalar = { name: string; drives: string[]; live: boolean }
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
console.log(`\nfamily          tokens  system  bridge uses  live`)
for (const f of families) {
  console.log(
    `${f.key.padEnd(15)} ${String(f.tokens).padStart(5)} ${String(f.systemRefs).padStart(7)} ${String(f.bridge?.uses ?? 0).padStart(11)}  ${f.live ? "yes" : "NO"}`
  )
}
console.log(`\nscalars`)
for (const s of scalars) console.log(`  ${s.name.padEnd(24)} drives ${s.drives.join(", ") || "(nothing)"} — ${s.live ? "live" : "DEAD"}`)
console.log(`\ntailwind namespaces in use: ${tailwind.filter((t) => t.uses).length}`)
for (const t of tailwind) console.log(`  ${t.namespace.padEnd(38)} ${String(t.uses).padStart(5)} uses  ${t.overriddenIn ? "overridden in " + t.overriddenIn : ""}`)
console.log(`\npx/rem literals: ${hardcoded.uses} in ${hardcoded.files.length} files`)
