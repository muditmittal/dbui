#!/usr/bin/env node
/**
 * Orphan and gap analysis across the three places a token can exist.
 *
 * The per-component parity report answers "do Figma and code agree about THIS
 * component". This answers the prior question: for every token that exists at
 * all, is it wired on both sides, on one, or on neither. It exists because the
 * per-component diff kept reporting "React uses action-selected-base, Figma does
 * not" and the useful fact was not the diff — it was that `action/selected/*`
 * exists in Figma and NO component binds it. A missing variable and an unbound
 * variable need completely different fixes, and only one of them is a real gap.
 *
 * Three sources, one row per token:
 *   SHIPPED   a --db-* in the generated tokens.css, or a type-* utility
 *   FIGMA     a variable or style that exists in the Figma library
 *   BOUND     at least one Figma component actually binds it
 *   USED      at least one React component actually reads it
 *
 * The four interesting states, in descending order of how much they cost:
 *   USED but not BOUND    code renders it, no Figma component shows it. The
 *                         design file understates what the system does.
 *   BOUND but not SHIPPED a designer can pick it and no code token exists.
 *   FIGMA but neither     dead weight in the picker.
 *   SHIPPED but not FIGMA code renders it and a designer cannot pick it.
 *
 *   node scripts/audit-token-orphans.mjs [--md|--json]
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const DIR = path.join(ROOT, ".tmp-token-audit")
const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8")

/** Figma `space/space-2` -> `space-2`, `surface/base` -> `surface-base`. The
 *  dimensional families repeat the group inside the leaf and color does not,
 *  so the rule keys off whether the leaf already carries the group. */
function tokenName(n) {
  const parts = n.split("/")
  if (parts.length === 1) return parts[0]
  const g = parts[0]
  const leaf = parts.slice(1).join("-")
  return leaf === g || leaf.startsWith(g + "-") ? leaf : parts.join("-")
}

/* ── what exists in Figma ─────────────────────────────────────────────────── */

const inv = JSON.parse(fs.readFileSync(path.join(DIR, "figma-inventory.json"), "utf8"))
const figmaExists = new Map() // token -> origin
for (const [coll, names] of Object.entries(inv.collections)) {
  for (const n of names) figmaExists.set(tokenName(n), `variable:${coll}`)
}
for (const n of inv.effectStyles) figmaExists.set("elevation-" + n.split("/").pop(), "effectStyle")
for (const n of inv.textStyles) figmaExists.set("type-" + n.split("/").pop(), "textStyle")
for (const n of inv.paintStyles) figmaExists.set(tokenName(n), "paintStyle")

/* ── what Figma components actually bind ──────────────────────────────────── */

const bound = new Map() // token -> Set(component)
for (const f of fs.readdirSync(DIR).filter((n) => n.startsWith("figma-") && n.endsWith(".psv"))) {
  for (const line of fs.readFileSync(path.join(DIR, f), "utf8").split("\n")) {
    if (!line.trim() || line.startsWith("#") || line.startsWith("name|")) continue
    const c = line.split("|")
    if (c.length < 10) continue
    const component = c[0]
    for (let i = 2; i <= 8; i++) {
      for (const t of (c[i] || "").trim().split(/\s+/).filter(Boolean)) {
        if (!bound.has(t)) bound.set(t, new Set())
        bound.get(t).add(component)
      }
    }
  }
}
/**
 * The variant container is a real node and its dashed stroke is editor chrome,
 * bound on 21 component sets. Counting it would make a categorical chart color
 * look like the most widely adopted token in the library.
 */
const CONTAINER_CHROME = new Set(["viz-categorical-4"])

/* ── what ships in code, and what React reads ─────────────────────────────── */

const tokensCss = read("packages/dbui/src/tokens/tokens.css")
const shipped = new Set([...tokensCss.matchAll(/^\s*(--db-[a-z0-9-]+):/gm)].map((m) => m[1].replace(/^--db-/, "")))
for (const m of read("packages/dbui/src/tokens/type.css").matchAll(/@utility (type-[a-z0-9-]+)/g)) shipped.add(m[1])

const react = JSON.parse(fs.readFileSync(path.join(DIR, "react.json"), "utf8"))
const used = new Map() // token -> Set(component)
for (const c of react.components) {
  for (const fam of Object.values(c.families)) {
    for (const t of fam.distinct || []) {
      if (!used.has(t)) used.set(t, new Set())
      used.get(t).add(c.name)
    }
  }
}

/**
 * Tokens the generated CSS consumes on a component's behalf. Without this the
 * report claims the entire type ramp is read by nothing, which is false and the
 * most alarming-looking wrong number the script could print: `--db-font-size-sm`
 * is never written in a component because `type-label` is, and `type.css`
 * resolves one to the other. Same shape for the scalars, which are multiplied
 * inside the generated sheets and appear in no component by design.
 */
const generated = tokensCss + read("packages/dbui/src/tokens/type.css")
const bridged = new Set(
  [...generated.matchAll(/var\(\s*(--db-[a-z0-9-]+)/g)].map((m) => m[1].replace(/^--db-/, ""))
)

/* ── join ─────────────────────────────────────────────────────────────────── */

const all = new Set([...figmaExists.keys(), ...bound.keys(), ...shipped, ...used.keys()])
const rows = [...all].sort().map((t) => ({
  token: t,
  figma: figmaExists.has(t),
  figmaOrigin: figmaExists.get(t) ?? null,
  bound: bound.has(t) && !CONTAINER_CHROME.has(t),
  boundBy: [...(bound.get(t) ?? [])].filter(() => !CONTAINER_CHROME.has(t)).length,
  shipped: shipped.has(t),
  used: used.has(t),
  usedBy: [...(used.get(t) ?? [])],
  bridged: bridged.has(t),
}))

const buckets = {
  usedNotBound: rows.filter((r) => r.used && r.figma && !r.bound),
  boundNotShipped: rows.filter((r) => r.bound && !r.shipped),
  figmaDeadWeight: rows.filter((r) => r.figma && !r.bound && !r.used && !r.bridged),
  // A token read only through the generated bridge is wired, so it is not a gap
  // even though no component names it. Split out rather than dropped, because
  // "absent from Figma" is still true of it and still worth seeing.
  shippedNotInFigma: rows.filter((r) => r.shipped && !r.figma && !r.bridged),
  shippedNotInFigmaButBridged: rows.filter((r) => r.shipped && !r.figma && r.bridged),
  healthy: rows.filter((r) => r.figma && r.bound && r.shipped && r.used),
}

const payload = { generatedAt: new Date().toISOString(), totals: Object.fromEntries(Object.entries(buckets).map(([k, v]) => [k, v.length])), buckets, rows }

if (process.argv.includes("--json")) { console.log(JSON.stringify(payload, null, 2)); process.exit(0) }

const list = (b, cols) => b.map((r) => `  ${r.token.padEnd(28)}${cols(r)}`).join("\n")

if (process.argv.includes("--md")) {
  console.log("## Token orphans and gaps\n")
  console.log("| State | Count | What it means |")
  console.log("|---|---|---|")
  console.log(`| Wired on both sides | ${buckets.healthy.length} | exists in Figma, bound by a component, ships, read by code |`)
  console.log(`| Used in code, bound by no Figma component | ${buckets.usedNotBound.length} | the variable exists in Figma — this is a binding gap, not a token gap |`)
  console.log(`| Bound in Figma, does not ship | ${buckets.boundNotShipped.length} | a designer can pick it and there is no code token |`)
  console.log(`| In Figma, bound by nothing and read by nothing | ${buckets.figmaDeadWeight.length} | dead weight in the variable picker |`)
  console.log(`| Ships but absent from Figma | ${buckets.shippedNotInFigma.length} | code renders it, a designer cannot pick it |`)
  console.log("\n### Used in code, bound by no Figma component\n")
  console.log("| Token | Read by |")
  console.log("|---|---|")
  for (const r of buckets.usedNotBound) console.log(`| \`${r.token}\` | ${r.usedBy.slice(0, 8).join(", ")}${r.usedBy.length > 8 ? ` +${r.usedBy.length - 8}` : ""} |`)
  console.log("\n### Bound in Figma, does not ship\n")
  for (const r of buckets.boundNotShipped) console.log(`- \`${r.token}\` — ${r.figmaOrigin ?? "unknown origin"}, bound by ${r.boundBy} component(s)`)
  console.log("\n### Ships but absent from Figma\n")
  for (const r of buckets.shippedNotInFigma) console.log(`- \`${r.token}\`${r.used ? ` — read by ${r.usedBy.length} component(s)` : " — read by nothing either"}`)
  console.log("\n### In Figma, wired to nothing\n")
  for (const r of buckets.figmaDeadWeight) console.log(`- \`${r.token}\` (${r.figmaOrigin})`)
  process.exit(0)
}

console.log(`${rows.length} distinct tokens across Figma, the shipped CSS and React source\n`)
for (const [k, v] of Object.entries(buckets)) console.log(`${k.padEnd(20)} ${String(v.length).padStart(4)}`)
console.log("\n── used in code, bound by NO Figma component (binding gap) ──")
console.log(list(buckets.usedNotBound, (r) => `${r.usedBy.length} react component(s): ${r.usedBy.slice(0, 6).join(", ")}`))
console.log("\n── bound in Figma, does NOT ship in code ──")
console.log(list(buckets.boundNotShipped, (r) => `${r.figmaOrigin ?? "?"} · bound by ${r.boundBy}`))
console.log("\n── ships in code, absent from Figma ──")
console.log(list(buckets.shippedNotInFigma, (r) => (r.used ? `read by ${r.usedBy.length}` : "read by nothing")))
console.log("\n── exists in Figma, wired to nothing on either side ──")
console.log(list(buckets.figmaDeadWeight, (r) => r.figmaOrigin))
