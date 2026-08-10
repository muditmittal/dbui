#!/usr/bin/env node
/**
 * Exports the shipped token set as a flat spec, in the Token / Category shape
 * engineering already uses, with the values added.
 *
 * Parsed from the generated tokens.css and type.css, so it is always exactly
 * what ships — there is no hand-maintained copy to go stale.
 *
 *   node scripts/export-token-spec.mjs            # TSV to stdout
 *   node scripts/export-token-spec.mjs --md       # markdown table
 *   node scripts/export-token-spec.mjs --out FILE # write to a file
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { declarations, asPx } from "./token-values.mjs"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const css = fs.readFileSync(path.join(ROOT, "packages/dbui/src/tokens/tokens.css"), "utf8")
const typeCss = fs.readFileSync(path.join(ROOT, "packages/dbui/src/tokens/type.css"), "utf8")

const light = declarations(css, ":root")
const dark = declarations(css, ".dark")

/**
 * Category, in the order engineering's sheet uses, extended with what we added.
 *
 * The four dimensional families are one category, `Dimensions`, because that is
 * the name of the collection they form — the token's own name already says which
 * family it is, so splitting `Radius`, `Size` and `Border` into three columns
 * restated the prefix and hid the fact that they are one group.
 *
 * `Scalars` holds the two multipliers and nothing else. The word belongs to
 * `--db-density-scalar` and `--db-type-scalar`; using it for the group as well
 * would make "scalar" mean both the dial and the thing the dial moves.
 */
function categorize(name) {
  const n = name.replace("--db-", "")
  if (/^(surface|text|action|border-(base|subtle|strong|accent|inverse|disabled)|input-border|status|link|focus|viz|utility)/.test(n)) return "Color"
  if (/scalar$/.test(n)) return "Scalars"
  if (/^(spacing-unit|space-|size-|radius-|border-\d)/.test(n)) return "Dimensions"
  if (/^(font-|mono-font-|line-height-|letter-spacing-)/.test(n)) return "Typography"
  if (/^elevation-/.test(n)) return "Elevation"
  if (/^(duration-|ease-)/.test(n)) return "Motion"
  return "Other"
}

const ORDER = ["Color", "Scalars", "Dimensions", "Typography", "Elevation", "Motion", "Other"]

/** What the value renders at, at a 16px root with every scalar at 1. */
const resolve = (value) => asPx(value, light)

const rows = Object.keys(light)
  .map((name) => ({
    token: name,
    category: categorize(name),
    light: light[name],
    dark: dark[name] && dark[name] !== light[name] ? dark[name] : "",
    computed: resolve(light[name]),
  }))
  .sort((a, b) => {
    const c = ORDER.indexOf(a.category) - ORDER.indexOf(b.category)
    return c !== 0 ? c : a.token.localeCompare(b.token)
  })

/**
 * The type CONTEXTS, each as a full override of the stop values in :root.
 *
 * A style reads a stop, so listing the stops once and the styles once would make
 * a reviewer do the join. The contexts are collected here so each style can be
 * printed at every context it resolves to.
 */
const contextBlocks = [...css.matchAll(/\[(data-[a-z-]+)="([a-z0-9-]+)"\]/g)].map(([, attr, name]) => ({
  attr,
  name,
  stops: declarations(css, `[${attr}="${name}"]`),
}))
// The context whose values are simply the ones in :root needs no second column.
const defaultContext = contextBlocks.find((c) =>
  Object.entries(c.stops).every(([k, v]) => light[k] === v),
)
const otherContexts = contextBlocks.filter((c) => c !== defaultContext)

/* There is no query to recover. A context activates only when something sets the
 * attribute — see the reasoning in theme.config.mjs — so the attribute block IS
 * the whole activation story, and the default is what a document that sets
 * nothing renders at every viewport. */

// The type ramp is composed styles, not raw values, so it needs its own listing.
const styles = [...typeCss.matchAll(/@utility (type-[a-z0-9-]+) \{([^}]+)\}/g)].map(([, name, body]) => {
  const raw = (prop) => body.match(new RegExp(`(?:^|\\n)\\s*${prop}:\\s*([^;]+);`))?.[1]?.trim() ?? ""
  // A style is only reviewable as numbers, so resolve the var() indirection.
  const num = (prop, vars = light) => asPx(raw(prop), vars) || raw(prop)
  const weight = raw("font-weight").replace(/var\((--db-[a-z0-9-]+)\)/, (_, n) => light[n] ?? "")
  const family = /mono-font-family/.test(raw("font-family")) ? "mono" : "sans"
  return {
    name,
    size: num("font-size"),
    line: num("line-height"),
    weight,
    family,
    transform: raw("text-transform") || "",
    // Same style, same weight and face, resolved through each other context's
    // stops. Weight, family and case are context-independent by construction.
    contexts: otherContexts.map((c) => {
      const vars = { ...light, ...c.stops }
      return { name: c.name, size: num("font-size", vars), line: num("line-height", vars) }
    }),
  }
})

const argv = process.argv.slice(2)
const asMd = argv.includes("--md")
const outIdx = argv.indexOf("--out")

let text
const HEADER = `# Token spec

Generated from the shipped CSS by \`scripts/export-token-spec.mjs\`. Do not edit —
regenerate instead. This is exactly what \`tokens.css\` and \`type.css\` contain.

Spatial values ship in **rem**, authored in px against a 16px root, so they follow
a reader's browser font-size preference. The "At 16px root" column is what they
render at the default. Border width stays px so hairlines stay crisp.

**Dimensions** is the collection: space, size, radius and border, plus the grid
unit they are multiples of. Each family computes its own stops — none of them
reads another — and the scale they agree on is an authoring artifact that lives
in Figma and in \`theme.config.mjs\`, not a custom property. React ships
semantics only, the same way it does for color.

**Scalars** is the two multipliers, and only those. They have no single px value
by design, and neither do the two \`em\` inline steps.

`

if (asMd) {
  text = [
    HEADER,
    "| Token | Category | Value | At 16px root | Dark |",
    "| --- | --- | --- | --- | --- |",
    ...rows.map((r) => `| \`${r.token}\` | ${r.category} | ${r.light} | ${r.computed} | ${r.dark} |`),
    "",
    "## Type styles (composed)",
    "",
    `A style names a stop rather than a number, so the same 14 utilities resolve to a`,
    `different set of measurements per context. Weight, family and case are`,
    `context-independent. ${
      otherContexts.length
        ? `A context is opt-in. Set \`${defaultContext?.attr ?? "data-type-context"}="<name>"\` on the document or on any subtree to turn ${otherContexts
            .map((c) => `\`${c.name}\``)
            .join(", ")} on; nothing activates from the viewport, so a document that sets nothing renders \`${defaultContext?.name ?? "the default"}\` at every width.`
        : ""
    }`,
    "",
    `| Utility | ${["Size", "Line height"].join(" | ")}${otherContexts
      .map((c) => ` | ${c.name} size | ${c.name} line height`)
      .join("")} | Weight | Family | Case |`,
    `| --- | --- | ---${otherContexts.map(() => " | --- | ---").join("")} | --- | --- | --- |`,
    ...styles.map(
      (s) =>
        `| \`${s.name}\` | ${s.size} | ${s.line}${s.contexts
          .map((c) => ` | ${c.size} | ${c.line}`)
          .join("")} | ${s.weight} | ${s.family} | ${s.transform} |`,
    ),
  ].join("\n")
} else {
  text = [
    ["Token", "Category", "Value", "At16pxRoot", "Dark"].join("\t"),
    ...rows.map((r) => [r.token, r.category, r.light, r.computed, r.dark].join("\t")),
  ].join("\n")
}

if (outIdx !== -1 && argv[outIdx + 1]) {
  fs.writeFileSync(path.resolve(ROOT, argv[outIdx + 1]), text + "\n")
  const counts = {}
  for (const r of rows) counts[r.category] = (counts[r.category] ?? 0) + 1
  console.log(`wrote ${argv[outIdx + 1]}`)
  console.log(`  ${rows.length} tokens + ${styles.length} composed type styles`)
  for (const c of ORDER) if (counts[c]) console.log(`    ${c.padEnd(12)}${counts[c]}`)
} else {
  process.stdout.write(text + "\n")
}
