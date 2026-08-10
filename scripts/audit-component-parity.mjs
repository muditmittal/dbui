#!/usr/bin/env node
/**
 * Three-way parity audit: React source ↔ published docs ↔ Figma.
 *
 * Every surface here is parsed from its own file. Nothing is asserted from
 * prose, and nothing is carried over from a previous run — a claim that cannot
 * be derived from a file on disk is reported as unverifiable rather than
 * assumed true.
 *
 * Sources, and what each is authoritative for:
 *
 *   React     packages/dbui/src/components/ui/*.tsx   exports, CVA axes, JSDoc
 *             packages/dbui/src/lib/*-variants.ts     shared CVA axes
 *   Docs      packages/dbui/docs/component-index.md   which component to pick
 *             apps/portal/.../variant-mappings.json   the portal's spec table
 *             apps/portal/.../gallery-data.ts         the /components gallery
 *   Figma     figma/*.figma.tsx                       Code Connect mappings
 *             .tmp-token-audit/figma-components.psv   Figma library inventory
 *
 * CVA and Code Connect are read through the TypeScript AST rather than by
 * regex, because a regex over a class string cannot tell a variant key from a
 * Tailwind prefix and quietly reports the wrong axis.
 *
 * Named for components to keep it distinct from `audit-token-parity.mjs`,
 * which compares token values and is what `yarn design:audit-parity` runs.
 *
 * Usage: node scripts/audit-component-parity.mjs [--json] [--out <path>]
 */

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import ts from "typescript"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const P = {
  ui: path.join(ROOT, "packages/dbui/src/components/ui"),
  lib: path.join(ROOT, "packages/dbui/src/lib"),
  index: path.join(ROOT, "packages/dbui/docs/component-index.md"),
  mappings: path.join(ROOT, "apps/portal/src/stories/components/variant-mappings.json"),
  gallery: path.join(ROOT, "apps/portal/src/stories/components/gallery-data.ts"),
  codeConnect: path.join(ROOT, "figma"),
  figmaDump: path.join(ROOT, "scripts/design-lint/.figma-component-dump.json"),
  barrel: path.join(ROOT, "packages/dbui/src/index.ts"),
  stories: path.join(ROOT, "apps/portal/src/stories"),
  icons: path.join(ROOT, "packages/dbui/src/components/icons"),
  synced: path.join(ROOT, "scripts/design-lint/dbui-components.json"),
}

/**
 * Axes React and Figma model at different levels on purpose.
 *
 * Each entry needs a reason, and an entry that stops matching anything is
 * reported as `STALE-SUPPRESSION` — so this can hide a decision that was made,
 * but not a regression that was not.
 */
const MODELLED_DIFFERENTLY = [
  {
    subject: "tabs.width",
    reason:
      "fit/full is sizing, not treatment. Figma expresses it with hug vs fill on the strip rather than a variant.",
  },
  {
    subject: "input-group.align",
    reason:
      "Lives on inputGroupAddonVariants, a slot. Figma models the two finished compositions (Browse, Filter) instead.",
  },
  {
    subject: "input-group.size",
    reason:
      "Lives on inputGroupButtonVariants, a slot. Same slot-vs-composition split as align.",
  },
  {
    subject: "empty.variant",
    reason:
      "Lives on emptyMediaVariants, the media slot. Figma folds the media into the parent Empty component.",
  },
]

/** Files allowed to state a count, and what the count must equal. */
const COUNT_CLAIMS = [
  { file: "AGENTS.md", unit: "components" },
  { file: "AGENTS.md", unit: "icons" },
  { file: "llms.txt", unit: "components" },
  { file: "llms.txt", unit: "icons" },
  { file: "packages/dbui/README.md", unit: "components" },
  { file: "packages/dbui/README.md", unit: "icons" },
  { file: "packages/dbui/docs/component-index.md", unit: "components" },
]

const read = (p) => (fs.existsSync(p) ? fs.readFileSync(p, "utf8") : null)
const handle = (s) => String(s ?? "").toLowerCase().replace(/[^a-z0-9]/g, "")
const sourceFile = (src, name) =>
  ts.createSourceFile(name, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)

/* ------------------------------------------------------------------ react --- */

/** Object-literal keys at one level, skipping spreads and computed keys. */
function literalKeys(node) {
  if (!node || !ts.isObjectLiteralExpression(node)) return []
  return node.properties
    .map((p) => {
      if (!p.name) return null
      if (ts.isIdentifier(p.name)) return p.name.text
      if (ts.isStringLiteral(p.name)) return p.name.text
      return null
    })
    .filter(Boolean)
}

function propOf(node, key) {
  if (!node || !ts.isObjectLiteralExpression(node)) return null
  for (const p of node.properties) {
    if (!ts.isPropertyAssignment(p) || !p.name) continue
    const n = ts.isIdentifier(p.name) || ts.isStringLiteral(p.name) ? p.name.text : null
    if (n === key) return p.initializer
  }
  return null
}

/** Every `cva(...)` call in a file, as { varName, axes, defaults }. */
function cvaCalls(src, filename) {
  const sf = sourceFile(src, filename)
  const out = []
  const walk = (node) => {
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === "cva"
    ) {
      const config = node.arguments[1]
      const variants = propOf(config, "variants")
      const defaults = propOf(config, "defaultVariants")
      const axes = {}
      if (variants && ts.isObjectLiteralExpression(variants)) {
        for (const p of variants.properties) {
          if (!ts.isPropertyAssignment(p) || !p.name) continue
          const axis = ts.isIdentifier(p.name) || ts.isStringLiteral(p.name) ? p.name.text : null
          if (!axis) continue
          axes[axis] = literalKeys(p.initializer)
        }
      }
      let varName = null
      let cur = node.parent
      while (cur && !varName) {
        if (ts.isVariableDeclaration(cur) && ts.isIdentifier(cur.name)) varName = cur.name.text
        cur = cur.parent
      }
      const defaultsObj = {}
      if (defaults && ts.isObjectLiteralExpression(defaults)) {
        for (const p of defaults.properties) {
          if (!ts.isPropertyAssignment(p) || !p.name) continue
          const k = ts.isIdentifier(p.name) || ts.isStringLiteral(p.name) ? p.name.text : null
          const v = ts.isStringLiteral(p.initializer) ? p.initializer.text : null
          if (k) defaultsObj[k] = v
        }
      }
      out.push({ varName, axes, defaults: defaultsObj })
    }
    ts.forEachChild(node, walk)
  }
  walk(sf)
  return out
}

/** Exported value names (types excluded), via the AST. */
function exportedNames(src, filename) {
  const sf = sourceFile(src, filename)
  const names = new Set()
  const walk = (node) => {
    if (ts.isExportDeclaration(node) && node.exportClause && ts.isNamedExports(node.exportClause)) {
      for (const el of node.exportClause.elements) {
        if (node.isTypeOnly || el.isTypeOnly) continue
        names.add(el.name.text)
      }
    }
    const mods = ts.canHaveModifiers(node) ? ts.getModifiers(node) ?? [] : []
    const isExported = mods.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
    if (isExported && ts.isFunctionDeclaration(node) && node.name) names.add(node.name.text)
    if (isExported && ts.isVariableStatement(node)) {
      for (const d of node.declarationList.declarations)
        if (ts.isIdentifier(d.name)) names.add(d.name.text)
    }
    ts.forEachChild(node, walk)
  }
  walk(sf)
  return [...names].filter((n) => /^[A-Z]/.test(n)).sort()
}

function parseJsdocTags(src) {
  const out = { standard: null, guidelines: [], constraints: [], figma: null, deprecated: [] }
  for (const block of src.match(/\/\*\*[\s\S]*?\*\//g) ?? []) {
    const body = block
      .replace(/^\/\*\*/, "")
      .replace(/\*\/$/, "")
      .replace(/^\s*\*\s?/gm, "")
    let open = null
    for (const line of body.split("\n")) {
      const t = line.trim()
      if (t.startsWith("@standard ")) (out.standard ??= t.slice(10).trim()), (open = null)
      else if (t.startsWith("@guideline ")) open = (out.guidelines.push(t.slice(11).trim()), out.guidelines)
      else if (t.startsWith("@constraint ")) open = (out.constraints.push(t.slice(12).trim()), out.constraints)
      else if (t === "@constraints") open = out.constraints
      else if (t.startsWith("@deprecated")) (out.deprecated.push(t.slice(11).trim()), (open = null))
      else if (t.startsWith("@figma ")) (out.figma ??= t.slice(7).trim()), (open = null)
      else if (t.startsWith("@")) open = null
      else if (open && t.startsWith("- ")) open.push(t.slice(2).trim())
    }
  }
  return out
}

const nodeIdOf = (url) => {
  const m = String(url ?? "").match(/node-id=([0-9]+[-:][0-9]+)/)
  return m ? m[1].replace(":", "-") : null
}

function reactInventory() {
  const out = {}
  const libCva = {}
  for (const f of fs.readdirSync(P.lib).filter((f) => f.endsWith(".ts"))) {
    const src = read(path.join(P.lib, f))
    if (!src || !src.includes("cva(")) continue
    for (const c of cvaCalls(src, f)) if (c.varName) libCva[c.varName] = c
  }

  for (const file of fs.readdirSync(P.ui).filter((f) => f.endsWith(".tsx")).sort()) {
    const slug = file.replace(/\.tsx$/, "")
    const src = read(path.join(P.ui, file))
    const doc = parseJsdocTags(src)
    const local = cvaCalls(src, file)
    const imported = [...src.matchAll(/import\s*\{([^}]*)\}\s*from\s*"\.\.\/\.\.\/lib\/([a-z-]+)"/g)]
      .flatMap((m) => m[1].split(",").map((s) => s.trim()))
      .filter((n) => libCva[n])
      .map((n) => libCva[n])

    const axes = {}
    for (const c of [...local, ...imported]) {
      const key = c.varName ?? "(anonymous)"
      axes[key] = c.axes
    }

    out[slug] = {
      slug,
      file: `packages/dbui/src/components/ui/${file}`,
      exports: exportedNames(src, file),
      standard: doc.standard,
      guidelines: doc.guidelines.length,
      constraints: doc.constraints.length,
      deprecated: doc.deprecated,
      figmaUrl: doc.figma,
      figmaNode: nodeIdOf(doc.figma),
      cva: axes,
      // Flattened: axis name → union of values across every CVA in the file.
      // Two CVAs in one file (root + item) genuinely share a prop namespace
      // from the caller's point of view, which is what the docs describe.
      axes: Object.values(axes).reduce((acc, a) => {
        for (const [k, v] of Object.entries(a)) acc[k] = [...new Set([...(acc[k] ?? []), ...v])]
        return acc
      }, {}),
    }
  }
  return out
}

/* ------------------------------------------------------------------- docs --- */

function indexRows() {
  const md = read(P.index) ?? ""
  const rows = {}
  let category = null
  for (const line of md.split("\n")) {
    // Any `###` closes the current category. The file ends with a "### Removed"
    // table of retired names, and treating those rows as live entries reports
    // two deliberate deletions as drift and inflates the last category's count.
    if (line.startsWith("###")) {
      category = line.match(/^###\s+`([a-z]+)`/)?.[1] ?? null
      continue
    }
    const cells = line.match(/^\|(.+)\|$/)
    if (!cells || !category) continue
    const parts = cells[1].split("|").map((c) => c.trim())
    const name = parts[0]?.match(/`([A-Za-z0-9]+)`/)?.[1]
    if (!name) continue
    rows[name] = { name, category, figmaLayer: parts[4] ?? "", useFor: parts[1] ?? "" }
  }
  return rows
}

/** Declared "### `category` — N items" counts, so a stale count is visible. */
function indexDeclaredCounts() {
  const md = read(P.index) ?? ""
  const out = {}
  for (const m of md.matchAll(/^###\s+`([a-z]+)`\s+—\s+(\d+)\s+items?/gm)) out[m[1]] = Number(m[2])
  return out
}

function galleryItems() {
  const src = read(P.gallery) ?? ""
  // `GalleryGroup[]` puts an empty pair of brackets between the name and the
  // literal, so anchor on the assignment rather than the first `[`.
  const assign = src.indexOf("=", src.indexOf("galleryGroups"))
  const start = src.indexOf("[", assign)
  if (assign === -1 || start === -1) return []
  let depth = 0
  let end = start
  for (let i = start; i < src.length; i++) {
    if (src[i] === "[") depth++
    else if (src[i] === "]") {
      depth--
      if (depth === 0) {
        end = i + 1
        break
      }
    }
  }
  try {
    return JSON.parse(src.slice(start, end)).flatMap((g) =>
      g.items.map((i) => ({ ...i, group: g.key }))
    )
  } catch {
    return []
  }
}

/* ------------------------------------------------------------------ figma --- */

/** figma.connect(Component, url, { props, variant, example }) per Code Connect file. */
function codeConnect() {
  const out = []
  for (const file of fs.readdirSync(P.codeConnect).filter((f) => f.endsWith(".figma.tsx")).sort()) {
    const src = read(path.join(P.codeConnect, file))
    const sf = sourceFile(src, file)
    const imports = new Map()
    const walkImports = (node) => {
      if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
        const from = node.moduleSpecifier.text
        const clause = node.importClause
        if (clause?.namedBindings && ts.isNamedImports(clause.namedBindings))
          for (const el of clause.namedBindings.elements) imports.set(el.name.text, from)
        if (clause?.name) imports.set(clause.name.text, from)
      }
      ts.forEachChild(node, walkImports)
    }
    walkImports(sf)

    const walk = (node) => {
      if (
        ts.isCallExpression(node) &&
        ts.isPropertyAccessExpression(node.expression) &&
        ts.isIdentifier(node.expression.expression) &&
        node.expression.expression.text === "figma" &&
        node.expression.name.text === "connect"
      ) {
        const args = node.arguments
        const compArg = args[0]
        const comp = compArg && ts.isIdentifier(compArg) ? compArg.text : null
        const urlArg = args.find((a) => ts.isStringLiteral(a))
        const url = urlArg ? urlArg.text : null
        const config = args.find((a) => ts.isObjectLiteralExpression(a))
        const props = propOf(config, "props")
        const variantRestrict = propOf(config, "variant")

        const enums = {}
        const booleans = {}
        const others = {}
        if (props && ts.isObjectLiteralExpression(props)) {
          for (const p of props.properties) {
            if (!ts.isPropertyAssignment(p) || !p.name) continue
            const key = ts.isIdentifier(p.name) || ts.isStringLiteral(p.name) ? p.name.text : null
            const init = p.initializer
            if (!key) continue
            if (
              ts.isCallExpression(init) &&
              ts.isPropertyAccessExpression(init.expression) &&
              ts.isIdentifier(init.expression.expression) &&
              init.expression.expression.text === "figma"
            ) {
              const kind = init.expression.name.text
              const figmaProp = init.arguments[0] && ts.isStringLiteral(init.arguments[0])
                ? init.arguments[0].text
                : null
              if (kind === "enum") {
                const map = init.arguments[1]
                const pairs = {}
                if (map && ts.isObjectLiteralExpression(map)) {
                  for (const q of map.properties) {
                    if (!ts.isPropertyAssignment(q) || !q.name) continue
                    const fk =
                      ts.isIdentifier(q.name) || ts.isStringLiteral(q.name) ? q.name.text : null
                    const cv = ts.isStringLiteral(q.initializer)
                      ? q.initializer.text
                      : q.initializer.getText()
                    if (fk) pairs[fk] = cv
                  }
                }
                enums[key] = { figmaProp, map: pairs }
              } else if (kind === "boolean") {
                booleans[key] = { figmaProp }
              } else {
                others[key] = { kind, figmaProp }
              }
            }
          }
        }

        const restrict = {}
        if (variantRestrict && ts.isObjectLiteralExpression(variantRestrict)) {
          for (const p of variantRestrict.properties) {
            if (!ts.isPropertyAssignment(p) || !p.name) continue
            const k = ts.isIdentifier(p.name) || ts.isStringLiteral(p.name) ? p.name.text : null
            const v = ts.isStringLiteral(p.initializer)
              ? p.initializer.text
              : p.initializer.getText()
            if (k) restrict[k] = v
          }
        }

        // Not every mapping is a `figma.enum`. Where Figma and React factor an
        // axis differently — Toggle keeps "icon-only" on `Variant` while React
        // folds it into `size` — the example derives the value instead. Collect
        // every string literal in the file so a derived value still counts as
        // reachable rather than reporting as a missing variant.
        const literals = new Set(
          [...src.matchAll(/"([a-z][a-z0-9-]*)"|'([a-z][a-z0-9-]*)'/g)].map((m) => m[1] ?? m[2])
        )

        out.push({
          file: `figma/${file}`,
          component: comp,
          importedFrom: comp ? imports.get(comp) ?? null : null,
          url,
          node: nodeIdOf(url),
          enums,
          booleans,
          others,
          literals: [...literals],
          variantRestrict: restrict,
          hasExample: Boolean(propOf(config, "example")),
        })
      }
      ts.forEachChild(node, walk)
    }
    walk(sf)
  }
  return out
}

/**
 * The Figma library as the Plugin API reports it — every top-level component
 * and component set, with the variant properties it actually publishes. This
 * is the only source that can settle whether a variant exists in Figma; Code
 * Connect and the portal table both merely *describe* it.
 */
function figmaLibrary() {
  const raw = read(P.figmaDump)
  if (!raw) return null
  const j = JSON.parse(raw)
  const byId = new Map()
  const byName = new Map()
  for (const c of j.components ?? []) {
    byId.set(c.id.replace(":", "-"), c)
    const h = handle(c.name)
    if (!byName.has(h)) byName.set(h, [])
    byName.get(h).push(c)
  }
  return { capturedAt: j.$capturedAt, components: j.components ?? [], byId, byName }
}

/* ---------------------------------------------------------------- compare --- */

function main() {
  const react = reactInventory()
  const docs = indexRows()
  const declared = indexDeclaredCounts()
  const mappings = JSON.parse(read(P.mappings) ?? "{}")
  const gallery = galleryItems()
  const cc = codeConnect()
  const figma = figmaLibrary()

  const findings = []
  const accepted = new Map(MODELLED_DIFFERENTLY.map((m) => [m.subject, { ...m, hit: 0 }]))
  const GAP_IDS = new Set(["FIGMA-VALUE-ABSENT", "FIGMA-NOT-A-SET", "CC-AXIS-UNMAPPED", "CC-VALUE-MISSING"])
  const add = (surface, severity, id, subject, detail) => {
    const known = accepted.get(subject)
    if (known && GAP_IDS.has(id)) {
      known.hit++
      return
    }
    findings.push({ surface, severity, id, subject, detail })
  }

  const ccBySlug = new Map()
  for (const c of cc) {
    const slug = c.importedFrom?.match(/\/ui\/([a-z0-9-]+)$/)?.[1] ?? null
    if (slug) {
      if (!ccBySlug.has(slug)) ccBySlug.set(slug, [])
      ccBySlug.get(slug).push(c)
    }
  }

  /* --- React ↔ Code Connect: does Figma's mapping cover the real API? ------ */
  for (const [slug, r] of Object.entries(react)) {
    const connects = ccBySlug.get(slug) ?? []
    if (!connects.length) {
      add("react↔figma", "gap", "CC-MISSING", slug, "No Code Connect file imports this component")
      continue
    }
    // One React component legitimately backs several Figma components (Button
    // backs both Button and Icon Button), so the check is whether *any* Code
    // Connect file reaches the node the JSDoc names — not whether all of them do.
    const ccNodes = connects.map((c) => c.node).filter(Boolean)
    if (r.figmaNode && ccNodes.length && !ccNodes.includes(r.figmaNode))
      add(
        "react↔figma",
        "conflict",
        "NODE-MISMATCH",
        slug,
        `JSDoc @figma points at ${r.figmaNode}; Code Connect only reaches [${ccNodes.join(", ")}]`
      )
    if (!r.figmaNode && ccNodes.length)
      add("react↔figma", "gap", "NO-JSDOC-FIGMA", slug, `Code Connect reaches [${ccNodes.join(", ")}]; component JSDoc has no @figma`)

    // A CVA axis the Code Connect files never mention is a variant Figma
    // cannot select, and a value it maps that React does not declare is a
    // variant that will not compile.
    const mappedAxes = new Set()
    const mappedValues = new Map()
    for (const c of connects) {
      for (const [prop, e] of Object.entries(c.enums)) {
        mappedAxes.add(prop)
        const set = mappedValues.get(prop) ?? new Set()
        for (const v of Object.values(e.map)) set.add(v)
        mappedValues.set(prop, set)
      }
      for (const prop of Object.keys(c.booleans)) mappedAxes.add(prop)
      for (const prop of Object.keys(c.others)) mappedAxes.add(prop)
    }
    for (const [axis, values] of Object.entries(r.axes)) {
      if (!mappedAxes.has(axis)) {
        add(
          "react↔figma",
          "gap",
          "CC-AXIS-UNMAPPED",
          `${slug}.${axis}`,
          `React declares ${values.length} value(s) [${values.join(", ")}]; Code Connect maps none`
        )
        continue
      }
      const mapped = mappedValues.get(axis) ?? new Set()
      const derived = new Set(connects.flatMap((c) => c.literals ?? []))
      const missing = values.filter((v) => !mapped.has(v) && !derived.has(v))
      const extra = [...mapped].filter((v) => !values.includes(v))
      if (missing.length)
        add(
          "react↔figma",
          "gap",
          "CC-VALUE-MISSING",
          `${slug}.${axis}`,
          `React has [${missing.join(", ")}] with no Figma variant mapped to them`
        )
      if (extra.length)
        add(
          "react↔figma",
          "conflict",
          "CC-VALUE-UNKNOWN",
          `${slug}.${axis}`,
          `Code Connect maps to [${extra.join(", ")}] which React does not declare`
        )
    }
  }

  for (const c of cc) {
    if (!c.component) continue
    const slug = c.importedFrom?.match(/\/ui\/([a-z0-9-]+)$/)?.[1] ?? null
    if (!slug && c.importedFrom?.includes("/ui/"))
      add("react↔figma", "conflict", "CC-BAD-IMPORT", c.file, `Unresolvable import ${c.importedFrom}`)
    if (slug && !react[slug])
      add("react↔figma", "conflict", "CC-ORPHAN", c.file, `Imports ${slug} which has no source file`)
  }

  // Every name a Code Connect file imports must be a real export. `tsc` cannot
  // catch this — Code Connect resolves `../components/ui/*` through its own
  // config and TypeScript never applies `paths` to a relative specifier — so
  // a renamed export goes unnoticed until publish. `Tree.figma.tsx` imported
  // `Section` for months; the export has always been `TreeSection`.
  for (const file of fs.readdirSync(P.codeConnect).filter((f) => f.endsWith(".figma.tsx"))) {
    const src = read(path.join(P.codeConnect, file)) ?? ""
    for (const m of src.matchAll(/import\s*\{([^}]+)\}\s*from\s*"\.\.\/components\/ui\/([a-z0-9-]+)"/g)) {
      const slug = m[2]
      if (!react[slug]) continue
      for (const raw of m[1].split(",")) {
        const name = raw.split(/\s+as\s+/)[0].trim()
        if (!name || name.startsWith("type ")) continue
        if (!react[slug].exports.includes(name))
          add(
            "react↔figma",
            "conflict",
            "CC-IMPORT-UNRESOLVED",
            `figma/${file}`,
            `Imports { ${name} } from ui/${slug}, which does not export it`
          )
      }
    }
  }

  /* --- React ↔ portal spec table (variant-mappings.json) ------------------ */
  for (const [slug, m] of Object.entries(mappings)) {
    const r = react[slug]
    if (!r) {
      add("react↔docs", "conflict", "MAP-ORPHAN", slug, "variant-mappings.json describes a slug with no component file")
      continue
    }
    for (const [prop, pair] of Object.entries(m.figmaCode ?? {})) {
      const axis = prop.toLowerCase()
      const rValues = r.axes[axis]
      if (!rValues) continue // Prop names like "State"/"Structure" describe CSS, not a CVA axis.
      // The table writes a value as a bare token ("outline"), as an assignment
      // ("variant='ghost'") or as prose ("default (CSS)"). Reduce all three to
      // the token before comparing, or every row reads as a mismatch.
      const tokens = (s) => {
        const t = String(s).trim()
        const quoted = [...t.matchAll(/['"]([a-z][a-z0-9-]*)['"]/g)].map((m) => m[1])
        if (quoted.length) return quoted
        const bare = t.match(/^([a-z][a-z0-9-]*)\b/)
        return bare ? [bare[1]] : []
      }
      const listed = (pair.code ?? []).flatMap(tokens)
      const missing = rValues.filter((v) => !listed.includes(v))
      const extra = listed.filter((v) => !rValues.includes(v))
      if (missing.length)
        add(
          "react↔docs",
          "conflict",
          "PORTAL-VALUE-MISSING",
          `${slug}.${axis}`,
          `React declares [${missing.join(", ")}]; the portal's mapping table omits them`
        )
      if (extra.length)
        add(
          "react↔docs",
          "conflict",
          "PORTAL-VALUE-UNKNOWN",
          `${slug}.${axis}`,
          `Portal lists [${extra.join(", ")}]; React does not declare them`
        )
    }
  }

  /* --- Portal table ↔ Code Connect: two descriptions of the same Figma --- */
  for (const [slug, m] of Object.entries(mappings)) {
    const connects = ccBySlug.get(slug) ?? []
    if (!connects.length) continue
    for (const [prop, pair] of Object.entries(m.figmaCode ?? {})) {
      const ccEnum = connects
        .map((c) => Object.values(c.enums).find((e) => e.figmaProp === prop))
        .find(Boolean)
      if (!ccEnum) continue
      const portalFigma = (pair.figma ?? []).map(String)
      const ccFigma = Object.keys(ccEnum.map)
      const onlyPortal = portalFigma.filter((v) => !ccFigma.includes(v))
      const onlyCc = ccFigma.filter((v) => !portalFigma.includes(v))
      if (onlyPortal.length || onlyCc.length)
        add(
          "docs↔figma",
          "conflict",
          "FIGMA-VARIANT-DISAGREE",
          `${slug}.${prop}`,
          `Portal says Figma has [${portalFigma.join(", ")}]; Code Connect maps [${ccFigma.join(", ")}]`
        )
    }
  }

  /* --- React ↔ component-index.md ---------------------------------------- */
  const docHandles = new Map(Object.values(docs).map((d) => [handle(d.name), d]))
  for (const [slug, r] of Object.entries(react)) {
    const hit =
      docHandles.get(handle(r.standard)) ??
      docHandles.get(handle(slug)) ??
      r.exports.map((e) => docHandles.get(handle(e))).find(Boolean)
    if (!hit)
      add("react↔docs", "gap", "INDEX-MISSING", slug, "No row in component-index.md")
  }
  const reactHandles = new Set(
    Object.values(react).flatMap((r) => [handle(r.slug), handle(r.standard), ...r.exports.map(handle)])
  )
  for (const d of Object.values(docs))
    if (!reactHandles.has(handle(d.name)))
      add("react↔docs", "conflict", "INDEX-ORPHAN", d.name, `component-index.md lists it under \`${d.category}\`; no React export matches`)

  const actualCounts = {}
  for (const d of Object.values(docs)) actualCounts[d.category] = (actualCounts[d.category] ?? 0) + 1
  for (const [cat, n] of Object.entries(declared))
    if (actualCounts[cat] !== n)
      add("docs", "conflict", "INDEX-COUNT-STALE", cat, `Heading says ${n} items; the table has ${actualCounts[cat] ?? 0}`)

  /* --- JSDoc completeness ------------------------------------------------- */
  for (const [slug, r] of Object.entries(react)) {
    if (!r.standard) add("react", "gap", "NO-STANDARD", slug, "No @standard tag — the CLI falls back to a guessed name")
    if (!r.guidelines) add("react", "gap", "NO-GUIDELINE", slug, "No @guideline tag")
    if (!r.constraints) add("react", "gap", "NO-CONSTRAINT", slug, "No @constraint tag")
    if (!r.figmaUrl) add("react", "gap", "NO-FIGMA-TAG", slug, "No @figma tag")
  }

  /* --- Gallery ------------------------------------------------------------ */
  const galleryHandles = new Set(gallery.map((g) => handle(g.slug)))
  for (const slug of Object.keys(react))
    if (!galleryHandles.has(handle(slug)))
      add("react↔docs", "gap", "GALLERY-MISSING", slug, "Not present in the /components gallery")
  for (const g of gallery)
    if (!g.storyId) add("docs", "gap", "GALLERY-NO-STORY", g.slug, `"${g.name}" has no story id`)

  /* --- The Figma library itself ------------------------------------------ */
  if (!figma) {
    add("figma", "unverifiable", "NO-FIGMA-DUMP", "-", "No Figma component dump on disk; nothing about the library can be verified")
  } else {
    // Every claim below is measured against what Figma publishes, not against
    // what Code Connect or the portal says Figma publishes.
    for (const [slug, r] of Object.entries(react)) {
      const connects = ccBySlug.get(slug) ?? []
      const nodes = [...new Set([r.figmaNode, ...connects.map((c) => c.node)].filter(Boolean))]
      const targets = nodes.map((n) => figma.byId.get(n)).filter(Boolean)

      for (const n of nodes)
        if (!figma.byId.get(n))
          add("react↔figma", "conflict", "FIGMA-NODE-GONE", `${slug} → ${n}`, "Node is referenced in code but is not a top-level component in the library")

      if (!targets.length) {
        const named = figma.byName.get(handle(r.standard)) ?? figma.byName.get(handle(slug))
        if (!named)
          add("react↔figma", "gap", "FIGMA-NO-COMPONENT", slug, "Nothing in the Figma library carries this name and no reachable node maps to it")
        continue
      }

      // A CVA axis with more than one value is a decision the designer has to
      // be able to make in Figma. If the target is a plain COMPONENT, or its
      // variant property has fewer values, the two surfaces cannot agree.
      const figmaValues = new Set()
      let anySet = false
      for (const t of targets) {
        if (t.type === "COMPONENT_SET") anySet = true
        for (const def of Object.values(t.variantProps ?? {}))
          for (const v of def.values ?? []) figmaValues.add(handle(v))
        for (const p of t.otherProps ?? []) figmaValues.add(handle(p.split(":")[0]))
      }

      // Name the CVA that owns the axis. `empty.variant` lives on
      // `emptyMediaVariants` — an inner slot Figma models as part of the
      // parent — while `badge.variant` is the component's own API. The tool
      // cannot judge which of those matters; naming the owner lets a reader.
      const ownerOf = (axis) =>
        Object.entries(r.cva).find(([, axes]) => axis in axes)?.[0] ?? "(unknown)"

      for (const [axis, values] of Object.entries(r.axes)) {
        if (values.length < 2) continue
        if (!anySet) {
          add(
            "react↔figma",
            "conflict",
            "FIGMA-NOT-A-SET",
            `${slug}.${axis}`,
            `${ownerOf(axis)} declares [${values.join(", ")}]; Figma's ${targets.map((t) => t.name).join("/")} is a plain component with no variant property`
          )
          continue
        }
        // Map React value → Figma variant value through Code Connect where a
        // mapping exists, and by name where it does not.
        const mapped = new Map()
        for (const c of connects)
          for (const e of Object.values(c.enums))
            for (const [fk, cv] of Object.entries(e.map)) mapped.set(cv, fk)
        const derived = new Set(connects.flatMap((c) => c.literals ?? []))
        const unreachable = values.filter((v) => {
          const fk = mapped.get(v)
          if (fk) return !figmaValues.has(handle(fk))
          if (derived.has(v)) return false // reached through a derived mapping
          return !figmaValues.has(handle(v))
        })
        if (unreachable.length)
          add(
            "react↔figma",
            "gap",
            "FIGMA-VALUE-ABSENT",
            `${slug}.${axis}`,
            `${ownerOf(axis)} values [${unreachable.join(", ")}] have no matching variant in Figma's ${targets.map((t) => t.name).join("/")}`
          )
      }
    }

    // Figma components with no React counterpart, ignoring the dot-prefixed
    // inner parts, which are a Figma construction detail by convention.
    const reactNames = new Set(
      Object.values(react).flatMap((r) => [handle(r.slug), handle(r.standard), ...r.exports.map(handle)])
    )
    const ccNodes = new Set(cc.map((c) => c.node).filter(Boolean))
    for (const c of figma.components) {
      if (c.name.startsWith(".")) continue
      if (c.page) continue // Viz and Shells live in other packages
      if (reactNames.has(handle(c.name))) continue
      if (ccNodes.has(c.id.replace(":", "-"))) continue
      add("react↔figma", "gap", "FIGMA-ONLY", c.name, `Published in Figma (${c.id}); nothing in packages/dbui exports it`)
    }

    const dupes = [...figma.byName.entries()].filter(([, v]) => v.filter((c) => !c.page).length > 1)
    for (const [, list] of dupes) {
      const same = list.filter((c) => !c.page)
      if (same.length > 1)
        add("figma", "conflict", "FIGMA-DUPLICATE-NAME", same[0].name, `${same.length} components share this name: ${same.map((c) => `${c.id} (${c.type})`).join(", ")}`)
    }
  }

  /* --- Counts written into prose ----------------------------------------- */
  // CONTRIBUTING forbids a value in prose precisely because it goes stale
  // silently. These are the ones already written, checked against the source.
  const iconFiles = fs.existsSync(P.icons)
    ? fs.readdirSync(P.icons).filter((f) => /^[A-Z].*\.tsx$/.test(f)).map((f) => f.replace(/\.tsx$/, ""))
    : []
  // Match the map's *keys*, not the file text. Icon names recur inside other
  // icons' description strings ("Databricks Assistant | AI | …"), so a plain
  // word-boundary search reports a missing entry as present.
  const mapKeys = (file) => {
    const src = read(path.join(P.icons, file)) ?? ""
    return new Set([...src.matchAll(/^\s*"([A-Za-z0-9]+)"\s*:/gm)].map((m) => m[1]))
  }
  const classified = mapKeys("classifications.ts")
  const described = mapKeys("descriptions.ts")
  const unclassified = iconFiles.filter((n) => !classified.has(n))
  const undescribed = iconFiles.filter((n) => !described.has(n))
  const truth = {
    components: Object.keys(react).length,
    icons: iconFiles.length - unclassified.length, // what the CLI can actually surface
    iconFiles: iconFiles.length,
  }

  for (const { file, unit } of COUNT_CLAIMS) {
    const src = read(path.join(ROOT, file))
    if (!src) continue
    for (const m of src.matchAll(new RegExp(`(\\d{2,4})\\s+(?:[a-z-]+\\s+)?${unit}\\b`, "g"))) {
      const claimed = Number(m[1])
      const ok =
        unit === "icons"
          ? claimed === truth.icons || claimed === truth.iconFiles
          : claimed === truth.components
      if (!ok) {
        const line = src.slice(0, m.index).split("\n").length
        add(
          "docs",
          "conflict",
          "PROSE-COUNT-STALE",
          `${file}:${line}`,
          `Says "${m[0]}"; the repo has ${unit === "icons" ? `${truth.iconFiles} icon files / ${truth.icons} indexed` : truth.components}`
        )
      }
    }
  }

  if (unclassified.length !== undescribed.length)
    add(
      "docs",
      "conflict",
      "ICON-METADATA-SKEW",
      "classifications.ts vs descriptions.ts",
      `${unclassified.length} icon(s) lack a classification and ${undescribed.length} lack a description — the surfaces are meant to have the same key count. Only in classifications: ${unclassified.filter((n) => !undescribed.includes(n)).join(", ") || "none"}`
    )

  /* --- Packages the discovery layer cannot reach -------------------------- */
  // The linter is generated from every package barrel; the CLI walks only
  // packages/dbui/src/components/ui. Anything in the gap exists, lints and
  // ships — and no agent surface can find it.
  const synced = JSON.parse(read(P.synced) ?? "{}")
  for (const pkg of ["shells", "chat", "viz"]) {
    const names = synced[pkg] ?? []
    if (!names.length) continue
    const reachable = names.filter((n) =>
      Object.values(react).some((r) => r.exports.includes(n))
    )
    if (reachable.length === 0)
      add(
        "react↔docs",
        "gap",
        "UNDISCOVERABLE-PACKAGE",
        `dbui-${pkg}`,
        `${names.length} export(s) the linter knows; \`dbui component\` and \`dbui search\` read only packages/dbui/src/components/ui, so none of them resolve`
      )
  }

  /* --- Deprecated exports still recommended ------------------------------ */
  const deprecated = new Set()
  for (const file of fs.readdirSync(P.ui).filter((f) => f.endsWith(".tsx"))) {
    const src = read(path.join(P.ui, file)) ?? ""
    for (const m of src.matchAll(/@deprecated[^\n]*\n(?:\s*\*[^\n]*\n)*?\s*\*\/\s*(?:export\s+)?(?:function|const)\s+([A-Z][A-Za-z0-9]*)/g))
      deprecated.add(m[1])
    // Aliases are often declared then exported from a trailing barrel block,
    // with the tag on the declaration above. Catch that shape too.
    for (const m of src.matchAll(/@deprecated[\s\S]{0,300}?\n\s*(?:function|const)\s+([A-Z][A-Za-z0-9]*)/g))
      deprecated.add(m[1])
  }
  const AGENT_SURFACES = [
    "packages/dbui/CLAUDE.md",
    "packages/dbui/composition.md",
    "packages/dbui/skills/dbui-build-screen.md",
    "packages/dbui/skills/dbui-pick-component.md",
    "packages/dbui/docs/component-index.md",
    "AGENTS.md",
    "llms.txt",
  ]
  for (const rel of AGENT_SURFACES) {
    const src = read(path.join(ROOT, rel))
    if (!src) continue
    for (const name of deprecated) {
      const hit = src.match(new RegExp(`^.*\\b${name}\\b.*$`, "m"))
      if (hit)
        add(
          "docs",
          "conflict",
          "RECOMMENDS-DEPRECATED",
          `${rel} → ${name}`,
          `Names a @deprecated export: ${hit[0].trim().slice(0, 110)}`
        )
    }
  }

  // A suppression that no longer suppresses anything is either a decision that
  // was implemented or one that changed shape. Either way it should be deleted,
  // and staying quiet about it is how an allowlist starts hiding regressions.
  for (const [subject, m] of accepted)
    if (m.hit === 0)
      findings.push({
        surface: "audit",
        severity: "conflict",
        id: "STALE-SUPPRESSION",
        subject,
        detail: `Recorded as modelled differently, but the audit no longer reports a gap there. Remove the entry. Reason on record: ${m.reason}`,
      })

  return {
    react,
    docs,
    mappings,
    gallery,
    cc,
    figma: figma?.components ?? null,
    findings,
    declared,
    truth,
    accepted: [...accepted.values()],
  }
}

const result = main()

if (process.argv.includes("--json")) {
  const out = process.argv[process.argv.indexOf("--out") + 1]
  const json = JSON.stringify(result, null, 2)
  if (out && out !== "--json") fs.writeFileSync(out, json)
  else console.log(json)
} else {
  const { findings, react, cc, docs } = result
  const bySurface = {}
  for (const f of findings) (bySurface[f.surface] ??= []).push(f)

  console.log(`# Parity audit\n`)
  const ccIcons = cc.filter((c) => c.file.endsWith("icons.figma.tsx")).length
  console.log(`React components (files in ui/): ${Object.keys(react).length}`)
  console.log(`component-index.md rows:         ${Object.keys(docs).length}`)
  console.log(`Code Connect (components):       ${cc.length - ccIcons}`)
  console.log(`Code Connect (icons):            ${ccIcons}`)
  console.log(`Findings:                        ${findings.length}`)
  console.log(`Modelled differently on purpose: ${result.accepted.filter((a) => a.hit).length}\n`)

  if (result.accepted.some((a) => a.hit)) {
    console.log(`## Accepted differences\n`)
    for (const a of result.accepted.filter((x) => x.hit))
      console.log(`${a.subject}\n      ${a.reason}`)
    console.log("")
  }

  const byId = {}
  for (const f of findings) (byId[f.id] ??= []).push(f)
  console.log(`## By kind\n`)
  for (const [id, list] of Object.entries(byId).sort((a, b) => b[1].length - a[1].length))
    console.log(`${String(list.length).padStart(4)}  ${id}`)

  for (const [surface, list] of Object.entries(bySurface)) {
    console.log(`\n## ${surface} — ${list.length}\n`)
    for (const f of list) console.log(`[${f.id}] ${f.subject}\n      ${f.detail}`)
  }
}
