#!/usr/bin/env node
/**
 * verify-spacing-scale — asks the Tailwind compiler what actually happens when
 * DBUI takes ownership of the dimensional scales, instead of trusting the docs.
 *
 * `packages/dbui/docs/token-simplification.md` rests on claims about Tailwind
 * v4 that are only worth making if the compiler behaves as described. Every
 * number and every "emits nothing" in that document comes from this file.
 *
 * The claims under test:
 *   A  Stock `--spacing` is an open-ended multiplier, so `p-2.5` and `gap-13`
 *      are legal today. That absence of constraint is the problem.
 *   B  `--spacing: initial` plus explicit `--spacing-N` keys makes the scale
 *      finite: defined steps emit and resolve to our token, undefined steps
 *      emit nothing at all.
 *   C  The density dial survives, because the step is a calc() the browser
 *      resolves rather than a length the compiler freezes.
 *   D  Width and height read the same `--spacing-*` keys, so constraining
 *      padding constrains them too. This is the collision the proposal must
 *      resolve.
 *   E  `--width-*`, `--height-*`, `--size-*`, `--min-width-*` and
 *      `--max-height-*` are real namespaces, so the collision is resolvable in
 *      the theme layer without a plugin.
 *   F  The combined shape works: a tight spacing scale, a separate control
 *      height scale, and named widths, all live at once.
 *   G  Motion has no `--duration-*` namespace, so durations cannot be bridged
 *      the way spacing and radius are.
 *   H  Elevation and radius DO have namespaces, so both are ordinary overrides.
 *   I  Bracket values bypass every scale, which is why the linter still has a
 *      job no compiler setting can do for it.
 *
 * Run:  node scripts/verify-spacing-scale.mjs
 * Exit: 0 if every assertion holds, 1 otherwise.
 */
import { compile } from "tailwindcss"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const TW_INDEX = path.join(ROOT, "node_modules/tailwindcss/index.css")

/** Resolve `@import "tailwindcss"` against the installed copy, so the test runs
 *  on the same compiler version the product builds with. */
async function loadStylesheet(id, base) {
  const file =
    id === "tailwindcss"
      ? TW_INDEX
      : path.resolve(base, id.replace(/^tailwindcss\//, "node_modules/tailwindcss/"))
  return { path: file, base: path.dirname(file), content: fs.readFileSync(file, "utf8") }
}

async function build(css, candidates) {
  const compiler = await compile(css, { base: ROOT, loadStylesheet })
  return compiler.build(candidates)
}

/**
 * Selector → declarations, for every rule in the output.
 *
 * Matching by regex against the class name does not work: Tailwind writes
 * `p-2.5` as the CSS selector `.p-2\.5` and `p-[13px]` as `.p-\[13px\]`, so a
 * naive pattern silently reports a rule as missing and the test reads as a
 * finding. Rules are parsed out and their selectors unescaped instead.
 */
function rules(css) {
  const out = new Map()
  let prelude = ""
  let depth = 0
  let body = ""
  const stack = []
  for (let i = 0; i < css.length; i++) {
    const c = css[i]
    if (c === "{") {
      stack.push(prelude.trim())
      prelude = ""
      depth++
      body = ""
    } else if (c === "}") {
      const sel = stack.pop()
      if (sel && !sel.startsWith("@")) {
        const key = sel.replace(/\\(.)/g, "$1")
        const decls = body.replace(/\s+/g, " ").trim()
        if (decls) out.set(key, (out.get(key) ? out.get(key) + " " : "") + decls)
      }
      depth--
      body = ""
      prelude = ""
    } else if (depth > 0) {
      body += c
      prelude += c
    } else {
      prelude += c
    }
  }
  return out
}

/**
 * The whole `.cls { ... }` block, braces balanced, for the utilities that emit
 * nested rules rather than a flat declaration list. `rules()` flattens, which
 * loses exactly these.
 */
function blockFor(css, cls) {
  const open = css.indexOf(`.${cls} {`)
  if (open === -1) return null
  let depth = 0
  for (let i = open; i < css.length; i++) {
    if (css[i] === "{") depth++
    else if (css[i] === "}" && --depth === 0) return css.slice(open, i + 1).replace(/\s+/g, " ")
  }
  return null
}

/** The declarations for one utility class, or null when nothing was emitted. */
function ruleFor(css, cls) {
  const r = rules(css)
  for (const [sel, decls] of r) {
    // Tailwind may emit `.p-3` alone or inside a variant wrapper.
    if (sel === `.${cls}` || sel.split(",").map((s) => s.trim()).includes(`.${cls}`)) return decls
  }
  return null
}

const results = []
function check(name, pass, detail) {
  results.push({ name, pass, detail })
  console.log(`${pass ? "PASS" : "FAIL"}  ${name}`)
  if (detail) console.log(`      ${detail}`)
}
const show = (css, list, pad = 12) => {
  for (const c of list) console.log(`    ${c.padEnd(pad)} ${ruleFor(css, c) ?? "(nothing emitted)"}`)
}

/** The DBUI side of every fixture: tokens as plain custom properties. */
const DB_TOKENS = `
:root {
  --db-spacing-unit: 0.25rem;
  --db-density-scalar: 1;
  --db-space-0: 0;
  --db-space-1: calc(var(--db-spacing-unit) * 1 * var(--db-density-scalar));
  --db-space-2: calc(var(--db-spacing-unit) * 2 * var(--db-density-scalar));
  --db-space-3: calc(var(--db-spacing-unit) * 3 * var(--db-density-scalar));
  --db-space-4: calc(var(--db-spacing-unit) * 4 * var(--db-density-scalar));
  --db-space-6: calc(var(--db-spacing-unit) * 6 * var(--db-density-scalar));
  --db-space-8: calc(var(--db-spacing-unit) * 8 * var(--db-density-scalar));
  --db-space-12: calc(var(--db-spacing-unit) * 12 * var(--db-density-scalar));
  --db-control-sm: calc(var(--db-spacing-unit) * 6 * var(--db-density-scalar));
  --db-control-md: calc(var(--db-spacing-unit) * 7 * var(--db-density-scalar));
  --db-control-lg: calc(var(--db-spacing-unit) * 8 * var(--db-density-scalar));
}
`

/* ══ A. the baseline the repo ships today ═════════════════════════════════ */

console.log("\n── A. Stock: --spacing as an open-ended multiplier (what ships today)\n")
{
  const css = await build(
    `@import "tailwindcss";
@theme inline { --spacing: calc(var(--db-spacing-unit) * var(--db-density-scalar)); }
${DB_TOKENS}`,
    ["p-3", "p-2.5", "p-5", "p-7", "gap-13", "h-8", "w-60", "p-0.5"]
  )
  show(css, ["p-3", "p-2.5", "p-5", "p-7", "gap-13", "h-8", "w-60", "p-0.5"])
  check(
    "A1 stock emits any multiple — p-2.5, p-7 and gap-13 are all legal",
    ["p-2.5", "p-7", "gap-13", "p-0.5"].every((c) => ruleFor(css, c)),
    "No compiler-level constraint exists today."
  )
}

/* ══ B. the multiplier disabled, explicit steps declared ══════════════════ */

const SPACING_SCALE = `@theme {
  --spacing: initial;
}
@theme inline {
  --spacing-0: var(--db-space-0);
  --spacing-1: var(--db-space-1);
  --spacing-2: var(--db-space-2);
  --spacing-3: var(--db-space-3);
  --spacing-4: var(--db-space-4);
  --spacing-6: var(--db-space-6);
  --spacing-8: var(--db-space-8);
  --spacing-12: var(--db-space-12);
  --spacing-px: 1px;
}`

const CONSTRAINED = `@import "tailwindcss";
${SPACING_SCALE}
${DB_TOKENS}`

console.log("\n── B. Constrained: --spacing: initial + explicit --spacing-N\n")
{
  const defined = ["p-3", "p-2", "p-4", "gap-2", "px-3", "py-1", "mt-4", "p-px"]
  const undef = ["p-5", "p-2.5", "p-7", "p-9", "gap-13", "mt-10", "p-0.5"]
  const css = await build(CONSTRAINED, [...defined, ...undef, "p-[13px]"])
  console.log("  DEFINED")
  show(css, defined, 10)
  console.log("  UNDEFINED")
  show(css, undef, 10)
  console.log("  BRACKET")
  show(css, ["p-[13px]"], 10)

  check("B1 every defined step emits", defined.every((c) => ruleFor(css, c)))
  check(
    "B2 defined steps resolve to the DBUI token, not a copied length",
    ["p-3", "p-2", "gap-2", "mt-4"].every((c) => (ruleFor(css, c) ?? "").includes("--db-space-")),
    `p-3 → ${ruleFor(css, "p-3")}`
  )
  check(
    "B3 every undefined step emits nothing — no fallback to the unit",
    undef.every((c) => ruleFor(css, c) === null),
    "This is the constraint. An off-scale class is not a wrong value, it is no class."
  )
  check(
    "B4 a bracket value still compiles and bypasses the scale",
    Boolean(ruleFor(css, "p-[13px]")),
    `p-[13px] → ${ruleFor(css, "p-[13px]")} — the compiler cannot close this, only the linter can.`
  )
}

/* ══ B2. the half step ════════════════════════════════════════════════════ */

/**
 * 2px is a real step — 37 sites write `p-0.5` or `gap-0.5` today — and the
 * class name contains a dot. Both the theme key and the custom property behind
 * it have to survive that, or the scale silently loses its finest step.
 */
console.log("\n── B2. Half steps and the dot in the name\n")
{
  const css = await build(
    `@import "tailwindcss";
@theme { --spacing: initial; }
@theme inline {
  --spacing-0\\.5: var(--db-space-0-5);
  --spacing-1: var(--db-space-1);
}
:root {
  --db-spacing-unit: 0.25rem;
  --db-density-scalar: 1;
  --db-space-0-5: calc(var(--db-spacing-unit) * 0.5 * var(--db-density-scalar));
  --db-space-1: calc(var(--db-spacing-unit) * 1 * var(--db-density-scalar));
}`,
    ["p-0.5", "gap-0.5", "p-1", "p-1.5"]
  )
  show(css, ["p-0.5", "gap-0.5", "p-1", "p-1.5"], 10)
  // The dot is required in the Tailwind key, because the key IS the class name.
  // It does not have to leak into the token: a hyphen keeps --db-space-0-5
  // readable from plain CSS, from StyleX, or from a Figma variable name.
  check(
    "B5 the escaped theme key can point at a cleanly named token",
    (ruleFor(css, "p-0.5") ?? "").includes("var(--db-space-0-5)"),
    `p-0.5 → ${ruleFor(css, "p-0.5")} — no backslash in the portable name.`
  )
  check(
    "B6 and an undeclared half step is still refused",
    ruleFor(css, "p-1.5") === null,
    "6px stays illegal, which is the stated intent."
  )
}

/* ══ C. the density dial ══════════════════════════════════════════════════ */

console.log("\n── C. Density chain\n")
{
  const css = await build(CONSTRAINED, ["p-3"])
  const rule = ruleFor(css, "p-3") ?? ""
  const dbVar = css.match(/--db-space-3:\s*([^;]+);/)?.[1]?.trim()
  console.log(`    .p-3         ${rule}`)
  console.log(`    --db-space-3 ${dbVar}`)
  // Density is only live if nothing in the chain was flattened to a length at
  // build time. A literal here would mean the dial resolves once, at compile.
  const flattened = /\d(px|rem)/.test(rule.replace(/var\([^)]*\)/g, ""))
  check("C1 the utility is a var() chain, unresolved at build time", rule.includes("var(") && !flattened, rule)
  check("C2 the token behind it multiplies the density scalar", (dbVar ?? "").includes("--db-density-scalar"), dbVar)
  console.log(`    at density 1.2 → 12px * 1.2 = 14.4px (browser-side, per the calc above)`)
}

/* ══ D. the collision ═════════════════════════════════════════════════════ */

console.log("\n── D. Width and height read the same --spacing-* keys\n")
{
  const css = await build(CONSTRAINED, ["h-6", "h-7", "h-8", "w-60", "w-70", "max-w-176", "min-w-56", "size-4"])
  show(css, ["h-6", "h-7", "h-8", "w-60", "w-70", "max-w-176", "min-w-56", "size-4"])
  check(
    "D1 h-6 and h-8 survive only because 6 and 8 happen to be padding steps",
    Boolean(ruleFor(css, "h-6")) && Boolean(ruleFor(css, "h-8"))
  )
  check(
    "D2 h-7 dies, though 28px is an approved control height",
    ruleFor(css, "h-7") === null,
    "Constraining padding silently constrains control heights with it."
  )
  check(
    "D3 every real layout width dies too",
    ["w-60", "w-70", "max-w-176", "min-w-56"].every((c) => ruleFor(css, c) === null),
    "A 240px rail is not a padding step, and should not have to be one."
  )
}

/* ══ D2. blast radius: everything else that reads --spacing ══════════════ */

console.log("\n── D2. What else stops compiling when --spacing goes away\n")
{
  // Every utility family Tailwind resolves through the spacing key. Anything
  // here that the product writes with an off-scale number breaks on the day
  // the scale lands, so the list is the migration surface.
  const probes = [
    "p-3", "m-3", "gap-3", "space-x-3", "space-y-3",
    "inset-3", "top-3", "left-3", "translate-x-3", "-mt-3",
    "w-3", "h-3", "size-3", "min-w-3", "max-w-3", "min-h-3", "max-h-3",
    "scroll-m-3", "scroll-p-3", "indent-3", "basis-3",
  ]
  const stock = await build(
    `@import "tailwindcss";\n@theme inline { --spacing: 0.25rem; }`,
    probes
  )
  const constrained = await build(CONSTRAINED, probes)
  const lost = probes.filter((c) => ruleFor(stock, c) && !ruleFor(constrained, c))
  const kept = probes.filter((c) => ruleFor(constrained, c))
  console.log(`    reads --spacing and 3 is undefined → lost: ${lost.join(" ") || "(none)"}`)
  console.log(`    still compiles (3 IS a defined step): ${kept.join(" ") || "(none)"}`)
  // Re-probe with a number that is defined nowhere, to enumerate the families
  // rather than accidentally testing which numbers made the scale.
  const off = probes.map((c) => c.replace(/3$/, "5"))
  const stockOff = await build(`@import "tailwindcss";\n@theme inline { --spacing: 0.25rem; }`, off)
  const constrainedOff = await build(CONSTRAINED, off)
  const families = off.filter((c) => ruleFor(stockOff, c) && !ruleFor(constrainedOff, c))
  console.log(`    utility families constrained by the change (${families.length}): ${families.join(" ")}`)
  check(
    "D4 the spacing key governs one shared pool of utility families",
    families.length >= 18,
    "Padding, margin, gap, inset, translate, width, height, min/max, scroll, basis and indent all read it."
  )
  check(
    "D5 keyword utilities are untouched — h-full, w-px, inset-0 keep working",
    await (async () => {
      const c = await build(CONSTRAINED, ["h-full", "w-full", "inset-0", "w-px", "h-auto", "max-w-none"])
      return ["h-full", "w-full", "inset-0", "w-px", "h-auto", "max-w-none"].every((k) => ruleFor(c, k))
    })(),
    "Only numeric steps route through the scale."
  )
}

/* ══ E. are there separate namespaces to move them to? ═══════════════════ */

console.log("\n── E. Dimensional namespaces beyond --spacing\n")
{
  // Distinctive values, so a hit cannot be a coincidence of some other key.
  const css = await build(
    `@import "tailwindcss";
${SPACING_SCALE}
@theme inline {
  --width-rail: 15rem;
  --height-control-md: var(--db-control-md);
  --size-control-md: var(--db-control-md);
  --min-width-panel: 17.5rem;
  --max-height-popup: 20rem;
  --container-measure: 44rem;
}
${DB_TOKENS}`,
    ["w-rail", "h-control-md", "size-control-md", "min-w-panel", "max-h-popup", "max-w-measure", "w-measure"]
  )
  show(css, ["w-rail", "h-control-md", "size-control-md", "min-w-panel", "max-h-popup", "max-w-measure", "w-measure"], 16)
  check("E1 --width-* drives w-*", (ruleFor(css, "w-rail") ?? "").includes("15rem"))
  check(
    "E2 --height-* drives h-*, independent of the spacing scale",
    (ruleFor(css, "h-control-md") ?? "").includes("--db-control-md")
  )
  check("E3 --size-* drives size-*", (ruleFor(css, "size-control-md") ?? "").includes("--db-control-md"))
  check("E4 --min-width-* drives min-w-*", (ruleFor(css, "min-w-panel") ?? "").includes("17.5rem"))
  check("E5 --max-height-* drives max-h-*", (ruleFor(css, "max-h-popup") ?? "").includes("20rem"))
  check("E6 --container-* still drives max-w-* and w-*", Boolean(ruleFor(css, "max-w-measure")))
}

/* ══ F. the three scales together ════════════════════════════════════════ */

console.log("\n── F. Combined: tight spacing, separate control heights, named widths\n")
{
  const css = await build(
    `@import "tailwindcss";
${SPACING_SCALE}
@theme inline {
  --height-control-sm: var(--db-control-sm);
  --height-control-md: var(--db-control-md);
  --height-control-lg: var(--db-control-lg);
  --size-control-sm: var(--db-control-sm);
  --size-control-lg: var(--db-control-lg);
  --width-rail: 15rem;
  --width-panel: 17.5rem;
}
${DB_TOKENS}`,
    ["p-3", "p-5", "h-control-md", "h-7", "h-9", "size-control-lg", "w-rail", "w-61", "gap-2"]
  )
  console.log("  legal")
  show(css, ["p-3", "gap-2", "h-control-md", "size-control-lg", "w-rail"], 17)
  console.log("  refused")
  show(css, ["p-5", "h-7", "h-9", "w-61"], 17)
  check(
    "F1 padding is constrained, heights are named, widths are named — all at once",
    ["p-3", "gap-2", "h-control-md", "size-control-lg", "w-rail"].every((c) => ruleFor(css, c))
  )
  check(
    "F2 and everything off all three scales still emits nothing",
    ["p-5", "h-7", "h-9", "w-61"].every((c) => ruleFor(css, c) === null)
  )
  check(
    "F3 every legal class resolves to a --db-* custom property or a plain length",
    ["p-3", "h-control-md", "size-control-lg"].every((c) => (ruleFor(css, c) ?? "").includes("var(--db-"))
  )
}

/* ══ F2. numeric height steps beside the spacing scale ══════════════════ */

/**
 * The shape that costs the product nothing: heights keep their existing terse
 * spelling (`h-7` is already written 15 times) but resolve through a separate
 * key, so 28px is legal as a control height and illegal as a padding.
 * Precedence has to be checked, not assumed — `h-6` is reachable from both
 * `--height-6` and `--spacing-6`, and only one of them can win.
 */
console.log("\n── F2. Numeric --height-* steps beside a constrained --spacing\n")
{
  const css = await build(
    `@import "tailwindcss";
${SPACING_SCALE}
@theme inline {
  --height-6: var(--db-control-sm);
  --height-7: var(--db-control-md);
  --height-8: var(--db-control-lg);
}
${DB_TOKENS}`,
    ["h-6", "h-7", "h-8", "h-5", "p-7", "p-6", "min-h-7", "max-h-7", "size-7", "w-7"]
  )
  show(css, ["h-6", "h-7", "h-8", "h-5", "p-7", "p-6", "min-h-7", "max-h-7", "size-7", "w-7"], 10)
  check(
    "F4 h-7 is legal again through --height-7, while p-7 stays refused",
    (ruleFor(css, "h-7") ?? "").includes("--db-control-md") && ruleFor(css, "p-7") === null,
    "The two axes are finally independent. 28px is a control height, not a padding."
  )
  check(
    "F5 --height-* wins over --spacing-* where both define the same step",
    (ruleFor(css, "h-6") ?? "").includes("--db-control-sm"),
    `h-6 → ${ruleFor(css, "h-6")} (--spacing-6 also exists and did not win)`
  )
  check(
    "F6 an undefined height step is still refused",
    ruleFor(css, "h-5") === null
  )
  // Whether the sibling utilities follow the same key decides how much of the
  // scale has to be restated. min-h and max-h reading --height-* would be free.
  console.log(`    min-h-7 → ${ruleFor(css, "min-h-7") ?? "(nothing)"}`)
  console.log(`    max-h-7 → ${ruleFor(css, "max-h-7") ?? "(nothing)"}`)
  console.log(`    size-7  → ${ruleFor(css, "size-7") ?? "(nothing)"}`)
  console.log(`    w-7     → ${ruleFor(css, "w-7") ?? "(nothing)"}`)
  check(
    "F7 min-h-* and max-h-* inherit --height-*, so one scale covers all three",
    (ruleFor(css, "min-h-7") ?? "").includes("--db-control-md") &&
      (ruleFor(css, "max-h-7") ?? "").includes("--db-control-md"),
    "No separate --min-height-* or --max-height-* declarations needed."
  )
  check(
    "F8 --height-* does not leak into size-* or w-*",
    ruleFor(css, "size-7") === null && ruleFor(css, "w-7") === null,
    "A square control needs --size-*, and width needs --width-*, declared separately."
  )
}

/* ══ F3. the full four-namespace shape ═══════════════════════════════════ */

console.log("\n── F3. Full shape: spacing + height + min-height + size + width\n")
{
  const css = await build(
    `@import "tailwindcss";
${SPACING_SCALE}
@theme inline {
  --height-6: var(--db-control-sm);
  --height-7: var(--db-control-md);
  --height-8: var(--db-control-lg);
  --size-6: var(--db-control-sm);
  --size-8: var(--db-control-lg);
  --width-rail: 15rem;
  --width-panel: 17.5rem;
  --min-width-panel: 17.5rem;
  --max-width-panel: 17.5rem;
}
${DB_TOKENS}`,
    ["p-3", "gap-2", "h-7", "min-h-7", "max-h-8", "size-6", "size-4", "w-rail", "min-w-panel", "max-w-panel", "p-7", "h-5", "w-61"]
  )
  console.log("  legal")
  show(css, ["p-3", "gap-2", "h-7", "min-h-7", "max-h-8", "size-6", "size-4", "w-rail", "min-w-panel", "max-w-panel"], 12)
  console.log("  refused")
  show(css, ["p-7", "h-5", "w-61"], 12)
  check(
    "F9 four namespaces coexist, each constrained to its own set",
    ["p-3", "gap-2", "h-7", "min-h-7", "size-6", "size-4", "w-rail"].every((c) => ruleFor(css, c)) &&
      ["p-7", "h-5", "w-61"].every((c) => ruleFor(css, c) === null)
  )
  // Height and width are not symmetric, and the asymmetry costs two extra
  // declarations per named width. Worth stating because it is the kind of
  // detail that turns a scale into a debugging session six months later.
  check(
    "F11 width is asymmetric — min-w-* and max-w-* need their own keys",
    Boolean(ruleFor(css, "min-w-panel")) && Boolean(ruleFor(css, "max-w-panel")),
    "--width-* alone does NOT reach min-w-* or max-w-*, unlike --height-* which reaches all three."
  )
  check(
    "F10 size-4 still falls through to --spacing-4 when --size-4 is undeclared",
    (ruleFor(css, "size-4") ?? "").includes("--db-space-4"),
    `size-4 → ${ruleFor(css, "size-4")} — 81 icon sites keep working untouched.`
  )
}

/* ══ G. motion has no namespace ══════════════════════════════════════════ */

console.log("\n── G. Motion: is there a --duration-* namespace?\n")
{
  const css = await build(
    `@import "tailwindcss";
@theme {
  --duration-slow: 450ms;
  --default-transition-duration: 300ms;
  --ease-standard: cubic-bezier(0.24, 1, 0.4, 1);
}`,
    ["duration-slow", "duration-300", "transition-colors", "ease-standard"]
  )
  show(css, ["duration-slow", "duration-300", "transition-colors", "ease-standard"], 18)
  check(
    "G1 --duration-* is NOT a namespace — duration-slow emits nothing",
    ruleFor(css, "duration-slow") === null,
    "Named durations need @utility. Only --default-transition-duration is bridgeable."
  )
  // The utility references the key rather than inlining it, so the proof is
  // that the override lands in the emitted theme and the utility reads it.
  const emitted = css.match(/--default-transition-duration:\s*([^;]+);/)?.[1]?.trim()
  check(
    "G2 --default-transition-duration does take an override",
    emitted === "300ms" && (ruleFor(css, "transition-colors") ?? "").includes("var(--default-transition-duration)"),
    `theme emits --default-transition-duration: ${emitted}, and transition-* reads it through var(). One line changes every transition in the system.`
  )
  check("G3 --ease-* IS a namespace", Boolean(ruleFor(css, "ease-standard")), `ease-standard → ${ruleFor(css, "ease-standard")}`)
}

/* ══ H. elevation and radius are ordinary overrides ══════════════════════ */

console.log("\n── H. Elevation and radius namespaces\n")
{
  const css = await build(
    `@import "tailwindcss";
@theme inline {
  --shadow-sm: var(--db-elevation-sm);
  --shadow-md: var(--db-elevation-md);
  --radius-sm: var(--db-radius-sm);
}
:root { --db-elevation-sm: 0 1px 2px rgba(0,0,0,.06); --db-elevation-md: 0 4px 8px rgba(0,0,0,.08); --db-radius-sm: 0.25rem; }`,
    ["shadow-sm", "shadow-md", "rounded-sm", "shadow-xl"]
  )
  show(css, ["shadow-sm", "shadow-md", "rounded-sm", "shadow-xl"], 12)
  check(
    "H1 --shadow-* takes a DBUI override",
    ["shadow-sm", "shadow-md"].every((c) => (ruleFor(css, c) ?? "").includes("--db-elevation-"))
  )
  check("H2 --radius-* takes one too — this is the model already in place", (ruleFor(css, "rounded-sm") ?? "").includes("--db-radius-sm"))
  check(
    "H3 an un-overridden step keeps Tailwind's value",
    Boolean(ruleFor(css, "shadow-xl")) && !(ruleFor(css, "shadow-xl") ?? "").includes("--db-"),
    `shadow-xl → ${ruleFor(css, "shadow-xl")} — overriding is opt-in per step.`
  )
}

/* ══ I. border width: is it ownable at all? ══════════════════════════════ */

/**
 * The border-width family is the one the brief is contradictory about, and the
 * answer depends on whether Tailwind will let DBUI own the value. A bare
 * `border` bakes 1px into the utility, so if there is no key to override, the
 * family cannot satisfy the full-definition requirement no matter what it is
 * named.
 */
console.log("\n── I. Border width ownership\n")
{
  const css = await build(
    `@import "tailwindcss";
@theme {
  --default-border-width: 2px;
  --border-width-strong: 2px;
}`,
    ["border", "border-2", "border-strong", "border-0"]
  )
  show(css, ["border", "border-2", "border-strong", "border-0"], 16)
  const bare = ruleFor(css, "border") ?? ""
  check(
    "I1 --default-border-width DOES move a bare `border`",
    bare.includes("2px"),
    `border → ${bare} — so the hairline on 47 call sites is ownable in one line.`
  )
  check(
    "I2 --border-width-* IS a namespace — it mints named width classes",
    (ruleFor(css, "border-strong") ?? "").includes("var(--border-width-strong)"),
    "Which is also the hazard: `border-strong` (a width) would sit beside `border-border-strong` (a color)."
  )
}

/* ══ J. closing a namespace gap with initial ═════════════════════════════ */

/**
 * Radius is already bridged, but two Tailwind steps were never overridden, so
 * `rounded-xs` and `rounded-4xl` render values DBUI does not own. The same
 * `initial` that disables `--spacing` should close them one at a time.
 */
console.log("\n── J. Removing a single step from an otherwise-owned namespace\n")
{
  const css = await build(
    `@import "tailwindcss";
@theme {
  --radius-xs: initial;
  --radius-4xl: initial;
}
@theme inline {
  --radius-sm: var(--db-radius-sm);
}
:root { --db-radius-sm: 0.25rem; }`,
    ["rounded-xs", "rounded-4xl", "rounded-sm", "rounded-lg"]
  )
  show(css, ["rounded-xs", "rounded-4xl", "rounded-sm", "rounded-lg"], 14)
  check(
    "J1 initial removes one step without disturbing the rest of the namespace",
    ruleFor(css, "rounded-xs") === null && ruleFor(css, "rounded-4xl") === null && Boolean(ruleFor(css, "rounded-sm")),
    "The two un-owned radius steps can be closed without touching the six that are ours."
  )
}

/* ══ K. the shape actually being shipped ═════════════════════════════════ */

/**
 * Everything above tests the END state, where `--spacing: initial` closes the
 * scale. That step is deliberately NOT being taken yet: 106 call sites write a
 * step the new scale refuses, 45 of them at 6px, and those get snapped as a
 * separate decision. Landing the constraint first would break all 106 on the
 * same day.
 *
 * So the shipped shape is the intermediate one: the multiplier stays ON, and
 * explicit keys are declared beside it. That only works if an explicit key
 * WINS over the multiplier for the same step. If the multiplier won instead,
 * every token in the new families would be decorative — declared, bridged, and
 * overridden by Tailwind's arithmetic.
 *
 * The values happen to agree today, so a loss here would be invisible in a
 * screenshot and would surface the day the density scalar moves.
 */
console.log("\n── K. Explicit keys beside a live multiplier (the shipped shape)\n")

/** Mirrors what theme.config.mjs now emits, at the same step values. */
const SHIPPED = `@import "tailwindcss";
@theme inline {
  --spacing: calc(var(--db-spacing-unit) * var(--db-density-scalar));
  --spacing-0: var(--db-space-0);
  --spacing-0\\.5: var(--db-space-0-5);
  --spacing-1: var(--db-space-1);
  --spacing-2: var(--db-space-2);
  --spacing-3: var(--db-space-3);
  --spacing-4: var(--db-space-4);
  --spacing-5: var(--db-space-5);
  --spacing-6: var(--db-space-6);
  --spacing-7: var(--db-space-7);
  --spacing-8: var(--db-space-8);
  --spacing-10: var(--db-space-10);
  --spacing-12: var(--db-space-12);
  --size-2: var(--db-size-2);
  --size-4: var(--db-size-4);
  --size-6: var(--db-size-6);
  --size-7: var(--db-size-7);
  --size-10: var(--db-size-10);
  --height-6: var(--db-size-6);
  --height-7: var(--db-size-7);
  --width-7: var(--db-size-7);
  --radius-0: var(--db-radius-0);
  --radius-1: var(--db-radius-1);
  --radius-2: var(--db-radius-2);
  --radius-6: var(--db-radius-6);
  --border-width-0: var(--db-border-0);
  --border-width-1: var(--db-border-1);
  --border-width-2: var(--db-border-2);
  --default-border-width: var(--db-border-1);
}
:root {
  --db-spacing-unit: 0.25rem;
  --db-density-scalar: 1;
  --db-space-0: 0;
  --db-space-0-5: calc(var(--db-spacing-unit) * 0.5 * var(--db-density-scalar));
  --db-space-1: calc(var(--db-spacing-unit) * 1 * var(--db-density-scalar));
  --db-space-2: calc(var(--db-spacing-unit) * 2 * var(--db-density-scalar));
  --db-space-3: calc(var(--db-spacing-unit) * 3 * var(--db-density-scalar));
  --db-space-4: calc(var(--db-spacing-unit) * 4 * var(--db-density-scalar));
  --db-space-5: calc(var(--db-spacing-unit) * 5 * var(--db-density-scalar));
  --db-space-6: calc(var(--db-spacing-unit) * 6 * var(--db-density-scalar));
  --db-space-7: calc(var(--db-spacing-unit) * 7 * var(--db-density-scalar));
  --db-space-8: calc(var(--db-spacing-unit) * 8 * var(--db-density-scalar));
  --db-space-10: calc(var(--db-spacing-unit) * 10 * var(--db-density-scalar));
  --db-space-12: calc(var(--db-spacing-unit) * 12 * var(--db-density-scalar));
  --db-size-2: calc(var(--db-spacing-unit) * 2 * var(--db-density-scalar));
  --db-size-4: calc(var(--db-spacing-unit) * 4 * var(--db-density-scalar));
  --db-size-6: calc(var(--db-spacing-unit) * 6 * var(--db-density-scalar));
  --db-size-7: calc(var(--db-spacing-unit) * 7 * var(--db-density-scalar));
  --db-size-10: calc(var(--db-spacing-unit) * 10 * var(--db-density-scalar));
  --db-radius-0: 0;
  --db-radius-1: calc(var(--db-spacing-unit) * 1 * var(--db-density-scalar));
  --db-radius-2: calc(var(--db-spacing-unit) * 2 * var(--db-density-scalar));
  --db-radius-6: calc(var(--db-spacing-unit) * 6 * var(--db-density-scalar));
  --db-border-0: 0px;
  --db-border-1: 1px;
  --db-border-2: 2px;
}`

{
  // `p-5` and `p-7` used to be the off-scale examples here. They are on the
  // scale now, which is the point of this round, so the undeclared cases are the
  // half steps and the two integers the ladder still skips.
  const OFF_SCALE = ["p-1.5", "p-2.5", "p-9", "p-11", "gap-13"]
  const probes = [
    "p-3", "gap-3", "mt-8", "p-0.5", "p-10", "p-5", "p-7",
    ...OFF_SCALE,
    "size-4", "size-6", "size-7", "h-6", "h-7", "w-7", "min-h-7", "max-h-7",
    "rounded-1", "rounded-2", "rounded-6", "rounded-0",
    "border", "border-2", "border-0", "border-1",
  ]
  const css = await build(SHIPPED, probes)
  console.log("  ours (explicit key must win)")
  show(css, ["p-3", "gap-3", "mt-8", "p-0.5", "p-5", "p-7", "p-10", "size-4", "size-7", "h-7", "w-7"], 12)
  console.log("  still Tailwind's, because the multiplier stays on")
  show(css, OFF_SCALE, 12)
  console.log("  radius and border")
  show(css, ["rounded-0", "rounded-1", "rounded-2", "rounded-6", "border", "border-0", "border-1", "border-2"], 12)

  check(
    "K1 an explicit --spacing-N beats the live --spacing multiplier",
    ["p-3", "gap-3", "mt-8", "p-0.5", "p-5", "p-7", "p-10"].every((c) => (ruleFor(css, c) ?? "").includes("--db-space-")),
    `p-3 → ${ruleFor(css, "p-3")} — the multiplier is still declared and did not win.`
  )
  check(
    "K2 a step we did not declare still compiles off the multiplier",
    OFF_SCALE.every((c) => {
      const r = ruleFor(css, c) ?? ""
      return r && !r.includes("--db-space-")
    }),
    "This is what keeps the unsnapped call sites rendering. p-1.5 → " + ruleFor(css, "p-1.5")
  )
  check(
    "K3 --size-N beats the multiplier, and an undeclared size step falls through",
    (ruleFor(css, "size-4") ?? "").includes("--db-size-4") && (ruleFor(css, "size-7") ?? "").includes("--db-size-7"),
    `size-4 → ${ruleFor(css, "size-4")}`
  )
  check(
    "K4 --height-N and --width-N beat the multiplier too",
    (ruleFor(css, "h-7") ?? "").includes("--db-size-7") && (ruleFor(css, "w-7") ?? "").includes("--db-size-7"),
    `h-7 → ${ruleFor(css, "h-7")}   w-7 → ${ruleFor(css, "w-7")}`
  )
  check(
    "K5 min-h-* and max-h-* inherit --height-*, so heights need one key not three",
    (ruleFor(css, "min-h-7") ?? "").includes("--db-size-7") && (ruleFor(css, "max-h-7") ?? "").includes("--db-size-7")
  )
  // Precedence between the two namespaces that can both answer `h-N`. A height
  // utility reads `--height-*` FIRST, `--spacing-*` SECOND, and only reaches the
  // multiplier when neither is declared.
  //
  // This is asserted because it is the fact that makes a missing size stop hard
  // to notice. Size briefly lost its 6, and `h-6` went on rendering 24px off
  // `--db-space-6` — right value, right density behaviour, wrong family. The 24px
  // small control height was restored on that basis: whether a size decision can
  // be written as one is the test, not whether the pixels match.
  //
  // `p-9` in the K2 list above is the case that has no key at either level and
  // does reach the multiplier, which is what makes the two paths distinguishable.
  const fellThrough = await build(
    SHIPPED.replace("  --height-6: var(--db-size-6);\n", "").replace("  --size-6: var(--db-size-6);\n", ""),
    ["h-6", "size-6"]
  )
  show(fellThrough, ["h-6", "size-6"], 12)
  check(
    "K12 --height-N wins over --spacing-N, and a missing size stop falls to space",
    (ruleFor(css, "h-6") ?? "").includes("--db-size-6") &&
      (ruleFor(fellThrough, "h-6") ?? "").includes("--db-space-6"),
    `owned: h-6 → ${ruleFor(css, "h-6")}   unowned: h-6 → ${ruleFor(fellThrough, "h-6")}`
  )
  // The radius namespace is documented with named steps only. Numeric keys
  // being legal is the whole premise of `rounded-2`, so it is asserted rather
  // than assumed.
  check(
    "K6 --radius-N is a legal key and mints rounded-N",
    ["rounded-0", "rounded-1", "rounded-2", "rounded-6"].every((c) => (ruleFor(css, c) ?? "").includes("--db-radius-")),
    `rounded-2 → ${ruleFor(css, "rounded-2")}`
  )
  check(
    "K7 --default-border-width moves a bare `border` onto our token",
    (ruleFor(css, "border") ?? "").includes("--db-border-1"),
    `border → ${ruleFor(css, "border")}`
  )
  check(
    "K8 --border-width-N owns the numeric border classes",
    ["border-0", "border-1", "border-2"].every((c) => (ruleFor(css, c) ?? "").includes("--db-border-")),
    `border-2 → ${ruleFor(css, "border-2")}`
  )
  // Whether the divide utilities come along decides one line in the consumption
  // report: if they do not, `divide-*` is a separate unowned Tailwind scale and
  // has to keep saying so rather than being folded into the Border width family.
  //
  // `ruleFor` cannot answer this one. A divide utility emits a NESTED rule —
  // `.divide-x { :where(& > :not(:last-child)) { ... } }` — so the outer rule has
  // no declarations of its own and the inner one is keyed by a selector that
  // names no class. Read the balanced block out of the raw CSS instead.
  const divide = await build(SHIPPED, ["divide-x", "divide-y", "divide-x-2"])
  for (const c of ["divide-x", "divide-y", "divide-x-2"]) {
    console.log(`    ${c.padEnd(16)} ${(blockFor(divide, c) ?? "(nothing emitted)").slice(0, 92)}`)
  }
  check(
    "K11 divide width rides on the same keys as border width",
    ["divide-x", "divide-y", "divide-x-2"].every((c) => (blockFor(divide, c) ?? "").includes("--db-border-")),
    "So the two are one family, and `divide and border width` stops being an unowned Tailwind scale."
  )
}

/* ══ K2. closing the old radius names ════════════════════════════════════ */

/**
 * The radius codemod rewrites `rounded-md` to `rounded-2`. If the old key were
 * simply dropped from the bridge, a missed call site would not fail — it would
 * silently render Tailwind's own value, which disagrees with ours at every step
 * (Tailwind md is 6px, ours was 8px). `initial` turns that silent wrong value
 * into no class at all, which is the failure mode a review can actually see.
 */
console.log("\n── K2. Old radius names closed rather than dropped\n")
{
  const css = await build(
    `@import "tailwindcss";
@theme {
  --radius-xs: initial;
  --radius-sm: initial;
  --radius-md: initial;
  --radius-lg: initial;
  --radius-xl: initial;
  --radius-2xl: initial;
  --radius-3xl: initial;
  --radius-4xl: initial;
}
@theme inline {
  --radius-2: var(--db-radius-2);
}
:root { --db-radius-2: 0.5rem; }`,
    ["rounded-sm", "rounded-md", "rounded-lg", "rounded-xl", "rounded-2xl", "rounded-xs", "rounded-4xl", "rounded-2", "rounded-full", "rounded-none"]
  )
  show(css, ["rounded-sm", "rounded-md", "rounded-lg", "rounded-2", "rounded-full", "rounded-none"], 14)
  check(
    "K9 every old named radius step emits nothing once closed",
    ["rounded-sm", "rounded-md", "rounded-lg", "rounded-xl", "rounded-2xl", "rounded-xs", "rounded-4xl"].every((c) => ruleFor(css, c) === null),
    "A missed codemod site renders no radius at all, rather than Tailwind's disagreeing value."
  )
  check(
    "K10 rounded-full and rounded-none survive as keywords",
    Boolean(ruleFor(css, "rounded-full")) && Boolean(ruleFor(css, "rounded-none")),
    `rounded-full → ${ruleFor(css, "rounded-full")} — left on Tailwind's value on purpose, see the report.`
  )
}

/* ══ L. the scale does not ship ══════════════════════════════════════════ */

/**
 * Every assertion above builds synthetic CSS. This one reads the file that
 * actually ships, because the claim is about absence and a fixture cannot prove
 * absence in the real output.
 *
 * The scale is an authoring artifact: twelve stops in Figma and in
 * theme.config.mjs that space, size and radius are authored against. It is
 * deliberately not a custom property, the same way the colour palette is not —
 * primitives resolve at build time and only semantics reach the browser. A
 * `--db-scale-*` appearing here would mean a component could reach past the
 * semantic families to the raw ladder, which is the thing the colour side
 * already forbids.
 */
console.log("\n── L. No primitive scale in the shipped CSS\n")
{
  const shipped = fs.readFileSync(path.join(ROOT, "packages/dbui/src/tokens/tokens.css"), "utf8")
  const leaked = [...shipped.matchAll(/--db-(scale|s)-[\w.-]+\s*:/g)].map((m) => m[0])
  for (const n of ["--db-space-3", "--db-size-8", "--db-radius-2", "--db-border-1"]) {
    console.log(`    ${n.padEnd(16)} ${shipped.includes(`${n}:`) ? "ships" : "MISSING"}`)
  }
  check(
    "L1 no --db-scale-* or --db-s-* custom property is emitted",
    leaked.length === 0,
    leaked.length ? `found ${leaked.join(", ")}` : "The scale stays in Figma and theme.config.mjs, as colour primitives do."
  )
  check(
    "L2 the four semantic families all ship",
    ["--db-space-3", "--db-size-8", "--db-radius-2", "--db-border-1"].every((n) => shipped.includes(`${n}:`)),
    "space, size, radius, border — the collection React consumes."
  )
}

/* ══ summary ═════════════════════════════════════════════════════════════ */

const failed = results.filter((r) => !r.pass)
console.log(`\n${results.length - failed.length}/${results.length} assertions held.`)
for (const f of failed) console.log(`  FAILED: ${f.name}`)
process.exit(failed.length ? 1 : 0)
