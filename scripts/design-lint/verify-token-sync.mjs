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
 * ## What it does and does not compare, stated because it used to imply more
 *
 * This printed "✅ In sync" while comparing Figma by NAME ONLY. Check 6 is a
 * config↔CSS round-trip; nothing read a Figma value, so four alphas could sit
 * at their old values in Figma and the check that `CONTRIBUTING.md` makes
 * mandatory before landing a token change reported agreement. A verifier that
 * overstates its coverage is worse than one that has none, because the second
 * sends you to look.
 *
 * Two things changed. The dump can now carry values, and when it does they are
 * compared (check 7). When it does not, the headline says so rather than saying
 * "in sync" — and `--strict` turns that into a failure for a gate that must not
 * pass on an unverifiable dump.
 *
 * Coverage today:
 *   color names    config ↔ Figma      compared
 *   color values   config ↔ CSS        compared
 *   color values   config ↔ Figma      compared IF the dump carries values
 *   dimensions      config ↔ Figma      NOT compared — the dump holds the two
 *                                       color collections and nothing else, so
 *                                       space, size, radius, border and the
 *                                       shape roles have no Figma side here
 *
 * It reads:
 *   - packages/dbui/src/tokens/theme.config.mjs     (imported)
 *   - packages/dbui/src/tokens/tokens.css           (parsed live)
 *   - scripts/design-lint/.figma-token-dump.json    (a Figma snapshot)
 *
 * The Figma snapshot is refreshed by running this use_figma dump and pasting the
 * result into .figma-token-dump.json. It emits values as well as names, in the
 * same spelling the config resolves to — uppercase hex, or `rgba(r, g, b, a)`
 * when alpha is below 1 — so the two are comparable without normalizing rules
 * that could hide a real difference:
 *
 *   const cols=await figma.variables.getLocalVariableCollectionsAsync();
 *   const prim=cols.find(c=>c.name==='Color: Primitive');
 *   const sem=cols.find(c=>c.name==='Color: Semantic');
 *   const all=await figma.variables.getLocalVariablesAsync();
 *   const n=x=>Math.round(x*255);
 *   const val=c=>c.a!=null&&c.a<1
 *     ?`rgba(${n(c.r)}, ${n(c.g)}, ${n(c.b)}, ${c.a})`
 *     :'#'+[c.r,c.g,c.b].map(x=>n(x).toString(16).padStart(2,'0')).join('').toUpperCase();
 *   const P=[],S=[],V={};
 *   for(const v of all){
 *     const h=v.name.replace(/\//g,'-');
 *     const coll=v.variableCollectionId===prim.id?prim:(v.variableCollectionId===sem.id?sem:null);
 *     if(!coll) continue;
 *     (coll===prim?P:S).push(h);
 *     const byMode={};
 *     for(const [id,raw] of Object.entries(v.valuesByMode)){
 *       if(raw&&typeof raw==='object'&&'r' in raw){
 *         const m=(coll.modes.find(x=>x.modeId===id)||{}).name||id;
 *         byMode[m.toLowerCase()]=val(raw);
 *       }
 *     }
 *     V[h]=byMode;
 *   }
 *   return {primitive:P.sort(), semantic:S.sort(), values:V};
 *
 * A variable that ALIASES another has no literal `{r,g,b}` and is skipped, so a
 * fully aliased semantic layer yields no comparable values and reports as such
 * rather than as agreement.
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
 *   7. Figma value parity — Figma's light/dark values === the same resolution,
 *                             when the dump carries values
 *
 * Usage:  node scripts/design-lint/verify-token-sync.mjs [--strict]
 *         --strict also fails when Figma values cannot be compared at all.
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

/* 7. Figma value parity.
 *
 * The check this file was named for and did not perform. Names matching proves
 * both sides have a token called `action-selected-base`; only the value proves
 * they mean the same color by it, and a token change alters nothing else.
 *
 * Compared per mode rather than per token, because a semantic drifting in dark
 * alone is the common case and a token-level comparison would report it as one
 * failure with no side named. */
const STRICT = process.argv.includes("--strict")
const figValues = figma.values && typeof figma.values === "object" ? figma.values : null
const figDrift = []
let figCompared = 0

if (figValues) {
  for (const name of cfgSemantics) {
    const got = figValues[name]
    if (!got || typeof got !== "object") continue
    for (const [mode, want] of [["light", semantics[name].light], ["dark", semantics[name].dark]]) {
      const have = got[mode]
      if (have == null) continue
      figCompared++
      const resolved = resolve(want)
      // Case is the only spelling difference worth absorbing — the dump emits
      // uppercase hex and so does the config, but a hand-edited dump may not.
      // Anything beyond that is a real difference and stays one.
      if (String(have).toUpperCase() !== String(resolved).toUpperCase()) {
        figDrift.push(`${name} ${mode}: figma=${have} config=${resolved}`)
      }
    }
  }
  note("Figma value drift (Figma and the config disagree)", figDrift)
  if (figCompared === 0) {
    problems.push(
      "the dump carries a `values` block and nothing in it is comparable — every variable is an alias, or the modes are not named light/dark"
    )
  }
} else if (STRICT) {
  problems.push(
    "the Figma dump carries names only, so no value could be compared. Refresh it with the dump in this file's header."
  )
}

// ── report ──
const pass = problems.length === 0
const figValueLine = figValues
  ? `${figCompared} value${figCompared === 1 ? "" : "s"} compared`
  : "NOT COMPARED — dump carries names only"

console.log("# Token sync — theme.config.mjs ↔ tokens.css ↔ Figma\n")
console.log(`config:    ${cfgPrimitives.size} primitive · ${cfgSemantics.size} semantic`)
console.log(`tokens.css: ${Object.keys(rootDb).filter(isPrimitiveName).length} primitive vars · ${shippedLight.size} semantic (light) · ${shippedDark.size} (dark)`)
console.log(`@theme:    ${themeUtils.size} Tailwind color utilities`)
console.log(`figma:     ${figPrim.size} primitive · ${figSem.size} semantic names · ${figValueLine}\n`)

if (pass) {
  console.log("Names match across config, tokens.css and Figma. Every semantic ships in")
  console.log("both modes with exactly one Tailwind utility, no primitive leaks into code,")
  console.log("and every shipped value round-trips from the config.\n")
  if (figValues) {
    console.log(`✅ In sync, values included — ${figCompared} Figma values agree with the config.`)
  } else {
    /* Deliberately not "in sync". The dump holds no values, so the one thing a
     * token change actually alters is the one thing that was not checked. */
    console.log("⚠️  Figma VALUES were not compared. The dump carries names only, so a")
    console.log("   token whose value moved in code and not in Figma passes this check.")
    console.log("   Refresh the dump with the snippet in this file's header, or run")
    console.log("   `--strict` to make an unverifiable dump a failure.")
  }
  console.log("\nNot covered either way: space, size, radius, border and the shape roles.")
  console.log("The dump holds the two color collections and nothing else.")
  process.exit(0)
}

console.log("⚠️ Drift detected:\n")
for (const p of problems) console.log(`- ${p}`)
process.exit(1)
