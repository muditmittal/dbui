#!/usr/bin/env node
/**
 * verify-token-sync — proves the color-token system is in sync across the three
 * surfaces that must never drift:
 *
 *   theme.config.mjs   (the ONE authored source — primitives + semantics)
 *        │  generate-tokens.mjs resolves + emits
 *        ▼
 *   tokens.css         (shipped: --db-* semantics in :root/.dark, @theme utils)
 *        │
 *        ▼
 *   Figma "Color: Primitive" + "Color: Semantic"   (design source of truth)
 *
 * Only color is checked. The dimensional side has the same two-layer shape —
 * Figma's "Dimensions" collection holds the ladder of multiples that space, size
 * and radius are authored against — but that scale is an authoring artifact and
 * never becomes a custom property, so there is no CSS surface to compare it to.
 * What could be checked is the family stops against their Figma aliases, and
 * that is not built yet.
 *
 * It reads:
 *   - packages/dbui/src/tokens/theme.config.mjs     (imported)
 *   - packages/dbui/src/tokens/tokens.css           (parsed live)
 *   - scripts/design-lint/.figma-token-dump.json    (a Figma snapshot)
 *
 * The Figma snapshot is refreshed by running this use_figma dump and pasting the
 * result into .figma-token-dump.json:
 *
 *   const cols=await figma.variables.getLocalVariableCollectionsAsync();
 *   const prim=cols.find(c=>c.name==='Color: Primitive');
 *   const sem=cols.find(c=>c.name==='Color: Semantic');
 *   const all=await figma.variables.getLocalVariablesAsync();
 *   const P=[],S=[]; for(const v of all){const h=v.name.replace(/\//g,'-');
 *     if(v.variableCollectionId===prim.id)P.push(h);
 *     else if(v.variableCollectionId===sem.id)S.push(h);}
 *   return {primitive:P.sort(), semantic:S.sort()};
 *
 * Checks (exit 1 if any fail):
 *   1. Primitive parity   — config primitives === Figma primitives
 *   2. Semantic parity    — config semantics === Figma semantics
 *   3. Semantic in tokens.css — every semantic has --db-<name> in :root AND .dark
 *   4. Tailwind coverage  — every semantic has a --color-<name> utility in @theme
 *   5. No primitive shipped — tokens.css exposes NO primitive var and NO primitive
 *                             utility (primitives are generator input only)
 *   6. Value round-trip   — tokens.css light/dark values === generator resolution
 *                             of the config (config → CSS is faithful)
 *
 * Usage:  node scripts/design-lint/verify-token-sync.mjs
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import cfg from "../../packages/dbui/src/tokens/theme.config.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "../../")
const TOKENS_CSS = path.join(ROOT, "packages/dbui/src/tokens/tokens.css")
const DUMP = path.join(__dirname, ".figma-token-dump.json")

const { meta, primitives, semantics } = cfg
const PREFIX = `--${meta.prefix}-`
const css = fs.readFileSync(TOKENS_CSS, "utf-8")
const figma = JSON.parse(fs.readFileSync(DUMP, "utf-8"))

// ── ref resolution (mirrors generate-tokens.mjs) ──────────────────────────────
function resolvePrimitive(dotted) {
  return dotted.split(".").reduce((o, k) => (o == null ? o : o[k]), primitives).toUpperCase()
}
function rgbaOf(hex, a) {
  const h = hex.replace("#", "")
  return `rgba(${parseInt(h.slice(0, 2), 16)}, ${parseInt(h.slice(2, 4), 16)}, ${parseInt(h.slice(4, 6), 16)}, ${a})`
}
const isAlphaRef = (v) => v && typeof v === "object" && "ref" in v
const resolve = (v) => (isAlphaRef(v) ? rgbaOf(resolvePrimitive(v.ref), v.a) : resolvePrimitive(v))

// ── config-side name sets ─────────────────────────────────────────────────────
const cfgPrimitives = new Set()
for (const [famName, fam] of Object.entries(primitives)) {
  if (famName === "base") {
    for (const k of Object.keys(fam)) cfgPrimitives.add(`base-${k}`)
    continue
  }
  for (const [rampName, ramp] of Object.entries(fam)) {
    for (const step of Object.keys(ramp)) cfgPrimitives.add(`${famName}-${rampName}-${step}`)
  }
}
const cfgSemantics = new Set(Object.keys(semantics))

// ── parse tokens.css into its three regions ───────────────────────────────────
const iTheme = css.indexOf("@theme inline {")
const iRoot = css.indexOf(":root {")
const iDark = css.indexOf(".dark {")
if (iTheme < 0 || iRoot < 0 || iDark < 0) {
  console.error("tokens.css is missing an expected region (@theme / :root / .dark). Run `yarn design:tokens`.")
  process.exit(1)
}
const themeStr = css.slice(iTheme, iRoot)
const rootStr = css.slice(iRoot, iDark)
const darkStr = css.slice(iDark)

const themeUtils = new Set()
for (const m of themeStr.matchAll(/--color-([a-z0-9-]+)\s*:/gi)) themeUtils.add(m[1])

// all --db-* declarations in a region → { name(without db-) : value }
const dbDecls = (str) => {
  const out = {}
  const re = new RegExp(`${PREFIX}([a-z0-9-]+)\\s*:\\s*([^;]+);`, "gi")
  let m
  while ((m = re.exec(str))) out[m[1]] = m[2].trim()
  return out
}
const rootDb = dbDecls(rootStr)
const darkDb = dbDecls(darkStr)

// A shipped var is a "primitive" if its de-prefixed name is a ramp step or base.
const RAMP_STEP = new Set(["050", "100", "200", "300", "400", "500", "600", "700", "800", "900"])
const isPrimitiveName = (n) => {
  const m = n.match(/^(?:interface|status|viz)-[a-z]+-(\d{2,3})$/)
  if (m) return RAMP_STEP.has(m[1])
  return /^base-(white|black)$/.test(n)
}

// ── diff helpers ──
const diff = (a, b) => [...a].filter((x) => !b.has(x)).sort()
const fmt = (arr) => (arr.length ? arr.join(", ") : "—")
const problems = []
const note = (label, extra) => { if (extra.length) problems.push(`${label}: ${fmt(extra)}`) }

const figPrim = new Set(figma.primitive)
const figSem = new Set(figma.semantic)

// 1. Primitive parity (config ↔ Figma)
note("Figma primitives missing from config", diff(figPrim, cfgPrimitives))
note("config primitives missing from Figma", diff(cfgPrimitives, figPrim))

// 2. Semantic parity (config ↔ Figma)
note("Figma semantics missing from config", diff(figSem, cfgSemantics))
note("config semantics missing from Figma", diff(cfgSemantics, figSem))

// 3. Every semantic shipped as --db-<name> in both modes
const shippedLight = new Set(Object.keys(rootDb).filter((n) => cfgSemantics.has(n)))
const shippedDark = new Set(Object.keys(darkDb).filter((n) => cfgSemantics.has(n)))
note("semantics missing from tokens.css :root", diff(cfgSemantics, shippedLight))
note("semantics missing from tokens.css .dark", diff(cfgSemantics, shippedDark))

// 4. Tailwind coverage
note("semantics with no @theme utility", diff(cfgSemantics, themeUtils))

// 5. No primitive shipped (var or utility)
note("primitives leaked into tokens.css :root", Object.keys(rootDb).filter(isPrimitiveName).sort())
note("primitives leaked into tokens.css .dark", Object.keys(darkDb).filter(isPrimitiveName).sort())
note("primitives wrongly exposed in @theme", [...themeUtils].filter(isPrimitiveName).sort())

// 6. Value round-trip — config resolution === shipped CSS value
const mismatch = []
for (const name of cfgSemantics) {
  const wantL = resolve(semantics[name].light)
  const wantD = resolve(semantics[name].dark)
  if (rootDb[name] && rootDb[name] !== wantL) mismatch.push(`${name} light: css=${rootDb[name]} config=${wantL}`)
  if (darkDb[name] && darkDb[name] !== wantD) mismatch.push(`${name} dark: css=${darkDb[name]} config=${wantD}`)
}
note("value drift (regenerate with `yarn design:tokens`)", mismatch)

// ── report ──
const pass = problems.length === 0
console.log("# Token sync — theme.config.mjs ↔ tokens.css ↔ Figma\n")
console.log(`config:    ${cfgPrimitives.size} primitive · ${cfgSemantics.size} semantic`)
console.log(`tokens.css: ${Object.keys(rootDb).filter(isPrimitiveName).length} primitive vars · ${shippedLight.size} semantic (light) · ${shippedDark.size} (dark)`)
console.log(`@theme:    ${themeUtils.size} Tailwind color utilities\n`)

if (pass) {
  console.log("✅ In sync. Config primitive + semantic sets match Figma, every semantic")
  console.log("   ships in both modes with exactly one Tailwind utility, no primitive")
  console.log("   leaks into code, and every shipped value round-trips from the config.")
  console.log("   (Figma codeSyntax.WEB = var(--db-<name>) for semantics.)")
  process.exit(0)
}

console.log("⚠️ Drift detected:\n")
for (const p of problems) console.log(`- ${p}`)
process.exit(1)
