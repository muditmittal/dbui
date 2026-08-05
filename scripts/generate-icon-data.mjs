#!/usr/bin/env node
/**
 * Emits the data behind the portal's icon browser on /docs/icons.
 *
 * The browser must never parse JSDoc in a page. Two reasons: the tag shape is a
 * repo convention that would then have a second implementation living in the
 * client, and the icon components would all have to be bundled to be read. Both
 * are solved by doing the work here and shipping the result.
 *
 * Metadata comes from the `use:` tag on each component, because CONTRIBUTING.md
 * makes the tag authoritative when it and the mirrored maps disagree. The maps
 * are still read, so an icon the maps have not caught up with can be marked
 * rather than dropped — that gap is what makes an icon invisible to `dbui icon`.
 *
 * Glyphs are produced by rendering each component through React rather than by
 * pattern-matching its markup. React owns the JSX-to-HTML attribute mapping, so
 * rendering it is the only way to be sure the browser draws what the component
 * draws.
 *
 *   node scripts/generate-icon-data.mjs
 */
import fs from "node:fs"
import path from "node:path"
import { createRequire } from "node:module"
import { fileURLToPath } from "node:url"
import esbuild from "esbuild"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const ICONS = path.join(ROOT, "packages/dbui/src/components/icons")
const PORTAL = path.join(ROOT, "apps/portal")
const OUT_DIR = path.join(PORTAL, "src/components/icon-data")
/** Inside the portal so the bundle resolves React from the portal's tree. */
const WORK = path.join(PORTAL, ".icon-data-build")

const CATEGORIES = ["object", "action", "indicator", "component"]

/* ------------------------------------------------------------- metadata --- */

const names = fs
  .readdirSync(ICONS)
  .filter((f) => f.endsWith(".tsx") && !f.includes("figma"))
  .map((f) => f.replace(/\.tsx$/, ""))
  .sort()

if (!names.length) throw new Error(`no icon components under ${ICONS}`)

/**
 * `use:<category> <label> | <area> | <synonyms>`, where the area is optional.
 * Splitting on the pipe count is what `dbui-cli/src/api.mjs` does to the same
 * strings in `descriptions.ts`; the two must agree or the page and the CLI
 * would describe one icon two ways.
 */
function parseTag(raw) {
  const m = raw.match(/use:(\w+)\s+([^*]+)/)
  if (!m) return null
  const [label, ...rest] = m[2].split("|").map((s) => s.trim())
  return {
    category: m[1],
    label,
    area: rest.length > 1 ? rest[0] : null,
    synonyms: (rest.length > 1 ? rest[1] : (rest[0] ?? ""))
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  }
}

const mapText = (file) => fs.readFileSync(path.join(ICONS, file), "utf8")
const classified = new Set(
  [...mapText("classifications.ts").matchAll(/"([A-Za-z0-9]+)":\s*"(?:action|object|indicator|component)"/g)].map(
    (m) => m[1]
  )
)
const described = new Map(
  [...mapText("descriptions.ts").matchAll(/"([A-Za-z0-9]+)":\s*"([^"]*)"/g)].map((m) => [m[1], m[2]])
)

const meta = []
const untagged = []
const unmapped = []
const disagree = []

for (const name of names) {
  const src = fs.readFileSync(path.join(ICONS, `${name}.tsx`), "utf8")
  const doc = src.match(/\/\*\*[\s\S]*?\*\//)
  const parsed = doc ? parseTag(doc[0]) : null
  if (!parsed) {
    untagged.push(name)
    continue
  }
  if (!CATEGORIES.includes(parsed.category)) {
    throw new Error(`${name}: use:${parsed.category} is not one of ${CATEGORIES.join(", ")}`)
  }
  // An icon is "mapped" only when both mirrors carry it. Either one missing
  // hides it from the CLI, which reads the maps and never the tag.
  const mapped = classified.has(name) && described.has(name)
  if (!mapped) unmapped.push(name)
  else if (described.get(name) !== `${parsed.label}${parsed.area ? ` | ${parsed.area}` : ""}${parsed.synonyms.length ? ` | ${parsed.synonyms.join(", ")}` : ""}`) {
    disagree.push(name)
  }
  meta.push({ name, ...parsed, mapped })
}

/* --------------------------------------------------------------- glyphs --- */

fs.rmSync(WORK, { recursive: true, force: true })
fs.mkdirSync(WORK, { recursive: true })

const entry = path.join(WORK, "entry.tsx")
fs.writeFileSync(
  entry,
  names.map((n) => `export { ${n} } from ${JSON.stringify(path.join(ICONS, n))}`).join("\n")
)

const bundle = path.join(WORK, "icons.mjs")
await esbuild.build({
  entryPoints: [entry],
  bundle: true,
  format: "esm",
  outfile: bundle,
  jsx: "automatic",
  platform: "node",
  external: ["react", "react/jsx-runtime"],
  logLevel: "error",
})

const req = createRequire(path.join(PORTAL, "package.json"))
const React = req("react")
const { renderToStaticMarkup } = req("react-dom/server")
const components = await import(`file://${bundle}`)

/** Most icons are drawn on a 16 unit grid, so only the exceptions carry one. */
const DEFAULT_VIEW_BOX = "0 0 16 16"

/** viewBox and body, so a single <svg> wrapper can host any icon's geometry. */
function glyphOf(name) {
  const Component = components[name]
  if (!Component) throw new Error(`${name}: not exported from its module`)
  const html = renderToStaticMarkup(React.createElement(Component))
  const open = html.match(/^<svg\b([^>]*)>/)
  if (!open) throw new Error(`${name}: rendered markup does not start with <svg>`)
  const viewBox = open[1].match(/viewBox="([^"]+)"/)?.[1]
  if (!viewBox) throw new Error(`${name}: rendered <svg> has no viewBox`)
  const body = html.slice(open[0].length, html.lastIndexOf("</svg>"))
  if (!body.trim()) throw new Error(`${name}: rendered <svg> is empty`)
  return viewBox === DEFAULT_VIEW_BOX ? { body } : { viewBox, body }
}

/* ---------------------------------------------------------------- write --- */

const banner = (source) => `// Generated by scripts/generate-icon-data.mjs — do not edit by hand.
// Source: ${source}
`

fs.mkdirSync(OUT_DIR, { recursive: true })

const rows = meta.map((m) => ({
  name: m.name,
  category: m.category,
  label: m.label,
  ...(m.area ? { area: m.area } : {}),
  ...(m.synonyms.length ? { synonyms: m.synonyms } : {}),
  ...(m.mapped ? {} : { mapped: false }),
}))

// One record per line rather than indented: this file is read as a diff, where
// a changed icon should be one changed line, and it is shipped to the browser,
// where every space is a byte the reader pays for.
const oneLine = (items) => `[\n${items.map((r) => `  ${JSON.stringify(r)},`).join("\n")}\n]`

fs.writeFileSync(
  path.join(OUT_DIR, "index.ts"),
  `${banner("the use: tag on each component in packages/dbui/src/components/icons/")}
export type IconCategory = ${CATEGORIES.map((c) => `"${c}"`).join(" | ")}

export type IconRecord = {
  name: string
  category: IconCategory
  label: string
  /** The product area the tag names, absent on icons that belong to no one area. */
  area?: string
  synonyms?: string[]
  /** Present and false when classifications.ts or descriptions.ts has no entry. */
  mapped?: false
}

export const iconCategories: IconCategory[] = ${JSON.stringify(CATEGORIES)}

export const icons: IconRecord[] = ${oneLine(rows)}
`
)

const sizes = {}
for (const category of CATEGORIES) {
  const entries = meta
    .filter((m) => m.category === category)
    .map((m) => [m.name, glyphOf(m.name)])
  const file = path.join(OUT_DIR, `glyphs-${category}.ts`)
  fs.writeFileSync(
    file,
    `${banner(`React output of each component in packages/dbui/src/components/icons/`)}
// Imported on demand by the icon browser — one chunk per category, so opening
// the page pays for the category it shows and not for the other three.

/** viewBox is present only when it is not the ${DEFAULT_VIEW_BOX} the set draws on. */
export type Glyph = { viewBox?: string; body: string }

const glyphs: Record<string, Glyph> = {
${entries.map(([name, g]) => `  ${JSON.stringify(name)}: ${JSON.stringify(g)},`).join("\n")}
}

export default glyphs
`
  )
  sizes[category] = { count: entries.length, bytes: fs.statSync(file).size }
}

fs.rmSync(WORK, { recursive: true, force: true })

/* --------------------------------------------------------------- report --- */

const rel = (p) => path.relative(ROOT, p)
console.log(`wrote ${rel(OUT_DIR)}/`)
console.log(`  index.ts            ${meta.length} icons, ${(fs.statSync(path.join(OUT_DIR, "index.ts")).size / 1024).toFixed(1)}KB`)
for (const category of CATEGORIES) {
  const s = sizes[category]
  console.log(`  glyphs-${category.padEnd(12)}${String(s.count).padStart(3)} icons, ${(s.bytes / 1024).toFixed(1)}KB`)
}
if (untagged.length) console.log(`  no use: tag: ${untagged.join(", ")}`)
if (unmapped.length) console.log(`  tag only, absent from the maps: ${unmapped.join(", ")}`)
if (disagree.length) console.log(`  tag and descriptions.ts disagree: ${disagree.join(", ")}`)
