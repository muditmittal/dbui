#!/usr/bin/env node
/**
 * Rewrites the radius class names from t-shirt sizes to their multiple of the
 * grid unit: `rounded-md` becomes `rounded-2`, because the value is 8px and the
 * unit is 4px.
 *
 *   node scripts/codemod-radius.mjs            # report only
 *   node scripts/codemod-radius.mjs --write    # apply
 *
 * Two rewrites, not one. The obvious one is the class name. The other is
 * `var(--radius-md)` inside an arbitrary value, on four sites: those read the
 * TAILWIND theme key, which this change closes with `initial`, so leaving them
 * alone would resolve them to nothing and flatten the corner to 0. They are
 * repointed at `--db-radius-2`, which is the same 0.5rem and is the token
 * rather than the bridge — a call site should never have needed the bridge key.
 *
 * What is deliberately NOT rewritten, because a blind pass would corrupt it:
 *
 *   - `verify-spacing-scale.mjs` compiles `rounded-sm` on purpose, to assert
 *     what Tailwind does with its OWN key. Rewriting the fixture would make the
 *     harness assert the thing it is supposed to be checking.
 *   - `token-simplification.md` is the proposal. It records the before state.
 *   - Generated files. They are regenerated from source, and editing them by
 *     hand is how the generated layer starts disagreeing with its generator.
 *   - `rounded-xs` and `rounded-4xl`. Those keys were never DBUI's — they render
 *     Tailwind's values today and will keep rendering them, exactly as `p-1.5`
 *     keeps rendering off the spacing multiplier. Closing them is part of the
 *     same "make the scale finite" decision that spacing is also waiting on.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const WRITE = process.argv.includes("--write")

/** DBUI step → its multiple of the 4px grid unit. */
const STEPS = { sm: 1, md: 2, lg: 3, xl: 4, "2xl": 6 }

/** Longest first, so `2xl` is never matched as `xl`. */
const ORDER = ["2xl", "xl", "lg", "md", "sm"]

/**
 * The corner suffixes Tailwind allows between `rounded` and the step, including
 * the logical ones. Missing one would leave a `rounded-tl-lg` behind, which
 * would then compile to nothing once the old key is closed.
 */
const CORNERS = "t|r|b|l|s|e|tl|tr|br|bl|ss|se|es|ee"

/**
 * A class name, anywhere a variant prefix can put it — `hover:`, `md:`,
 * `group-data-[x]:`, `[&>kbd]:`. The step must end at a boundary so `rounded-md`
 * inside `rounded-medium` could never match.
 *
 * Deliberately not anchored to a `className` attribute: these strings live in
 * cva variant maps, plain `.ts` rule files and markdown as well as JSX.
 */
const CLASS_RE = new RegExp(`\\brounded(-(?:${CORNERS}))?-(${ORDER.join("|")})\\b`, "g")

/** The bridge key read from inside an arbitrary value. */
const VAR_RE = new RegExp(`var\\(--radius-(${ORDER.join("|")})\\)`, "g")

const SKIP_DIRS = new Set(["node_modules", ".next", "dist", ".git", "archive", ".fingerprints", "storybook-static"])

const SKIP_FILES = new Set([
  // Fixtures that must keep compiling Tailwind's own named steps.
  "scripts/verify-spacing-scale.mjs",
  // The proposal, which records the before state.
  "packages/dbui/docs/token-simplification.md",
  // Prose about this codemod.
  "scripts/codemod-radius.mjs",
  "scripts/fingerprint.mjs",
  "scripts/generate-token-consumption.mjs",
  // Generated. Regenerated after this runs.
  "apps/portal/src/components/layout-data.ts",
  "apps/portal/src/stories/components/gallery-data.ts",
  "apps/portal/src/stories/tokens/token-consumption.ts",
  "apps/portal/src/stories/tokens/token-data.ts",
])

const EXT = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".css", ".md", ".mdx"])

const files = []
;(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") && entry.name !== ".storybook") continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) walk(full)
    } else if (EXT.has(path.extname(entry.name))) {
      const rel = path.relative(ROOT, full)
      if (!SKIP_FILES.has(rel)) files.push(rel)
    }
  }
})(ROOT)

const classHits = []
const varHits = []
/** Post-rewrite text, so the leftover check means something in a dry run too. */
const result = new Map()
let changedFiles = 0

for (const rel of files) {
  const full = path.join(ROOT, rel)
  const before = fs.readFileSync(full, "utf8")
  result.set(rel, before)
  if (!before.includes("rounded-") && !before.includes("--radius-")) continue

  let after = before.replace(CLASS_RE, (whole, corner, step) => {
    const next = `rounded${corner ?? ""}-${STEPS[step]}`
    classHits.push({ rel, from: whole, to: next })
    return next
  })

  after = after.replace(VAR_RE, (whole, step) => {
    const next = `var(--db-radius-${STEPS[step]})`
    varHits.push({ rel, from: whole, to: next })
    return next
  })

  result.set(rel, after)
  if (after !== before) {
    changedFiles++
    if (WRITE) fs.writeFileSync(full, after)
  }
}

const tally = (hits, key) =>
  Object.entries(
    hits.reduce((acc, h) => ((acc[h[key]] = (acc[h[key]] ?? 0) + 1), acc), {})
  ).sort((a, b) => b[1] - a[1])

console.log(WRITE ? "APPLIED\n" : "DRY RUN — pass --write to apply\n")
console.log(`${classHits.length} class rewrites and ${varHits.length} var() rewrites across ${changedFiles} files\n`)

console.log("by step:")
for (const [from, n] of tally(classHits, "from")) {
  console.log(`  ${from.padEnd(20)} -> ${classHits.find((h) => h.from === from).to.padEnd(14)} ${n}`)
}

if (varHits.length) {
  console.log("\nbridge keys read from an arbitrary value (would break when the key is closed):")
  for (const h of varHits) console.log(`  ${h.rel}\n    ${h.from} -> ${h.to}`)
}

console.log("\nfiles touched:")
for (const [rel, n] of tally([...classHits, ...varHits], "rel")) console.log(`  ${String(n).padStart(3)}  ${rel}`)

/**
 * Anything left holding a name the change is closing. This is the check that
 * matters: after `--radius-md: initial`, a missed site emits no radius at all,
 * so a silent miss is a flattened corner rather than a build error.
 */
const LEFTOVER = new RegExp(`\\brounded(-(?:${CORNERS}))?-(${ORDER.join("|")})\\b|var\\(--radius-(${ORDER.join("|")})\\)`)
const missed = files.filter((rel) => LEFTOVER.test(result.get(rel) ?? ""))
console.log(`\nstill holding a closed name after this pass: ${missed.length}`)
for (const rel of missed) console.log(`  ${rel}`)
