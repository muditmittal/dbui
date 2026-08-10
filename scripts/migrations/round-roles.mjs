#!/usr/bin/env node
/**
 * Repoint components from the radius MEASUREMENT onto the round ROLE.
 *
 * Every mapping below is value-identical: the role aliases the exact stop it
 * replaces, so this pass moves no pixels. That is the point. The roles have to
 * land as a verified no-op before any theme changes one of them, or the
 * indirection and the visual change arrive in one diff and neither can be
 * reviewed on its own.
 *
 * WHY THESE THREE AND NOT THE REST
 *   full -> pill        All 31 sites are round by nature — an avatar, a status
 *                       dot, a switch track, a scroll thumb, a count chip,
 *                       Toggle's pill variant. A theme does not un-circle an
 *                       avatar, so the mapping is unambiguous.
 *   2 -> container      What floats above the page: dialog, popover, menu,
 *                       select, combobox, hover card, the table wrapper.
 *   4 -> surface        What IS the page: card, drawer, empty, AssistantPanel.
 *
 * `rounded-1` and `rounded-3` are deliberately NOT here.
 *   `rounded-1` is 39 components and two decisions wearing one number: a control
 *   corner, which a theme reassigns, and a small container, which it does not.
 *   Telling them apart needs the element, not the class.
 *   `rounded-3` is not a tier at all — it is a card's inner corners, derived from
 *   the 16px outer one, plus button-group and split-button, which are control
 *   corners. Both stay on the measurement on purpose.
 *
 *   node scripts/migrations/round-roles.mjs --dry
 *   node scripts/migrations/round-roles.mjs
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const DRY = process.argv.includes("--dry")

/** The shipped system only. The portal is a consumer and its classes still resolve. */
const ROOTS = [
  "packages/dbui/src",
  "packages/dbui-shells/src",
  "packages/dbui-chat/src",
  "packages/dbui-viz/src",
]

/**
 * Data and docs files whose string literals are token names rather than class
 * lists. Rewriting a rule's own text would change what the docs claim without
 * changing any rendered corner.
 */
const NOT_COMPONENT_SOURCE = [/layout-rules/, /-data\.ts$/, /token-/]

/**
 * `stop` is matched with an optional side so `rounded-t-4` and `rounded-br-2`
 * move too, and the side is preserved in the replacement.
 */
const MAP = [
  { from: "full", to: "pill" },
  { from: "2", to: "container" },
  // `container-lg`, not `surface`. The role was named `surface` when this
  // mapping was written and renamed before it ever ran, because `shape-surface`
  // sat one word from `surface-base` and the rest of the color family. Left
  // stale, this emitted a class no stylesheet carries.
  { from: "4", to: "container-lg" },
]

/**
 * Comments are protected, and the two cases that forced it are worth naming.
 * `tabs.tsx` documents "rounded-1, not rounded-2. A 4px corner on a 28px chip
 * reads as a soft rectangle" — rewriting that turns a rationale into nonsense.
 * `utils.ts` lists the class vocabulary tailwind-merge cannot see. Both discuss
 * the names rather than sit beside a class, so both must survive untouched.
 *
 * Line comments are matched only at the start of a line, so a `https://` inside
 * a string or a JSDoc `@figma` link is not mistaken for one.
 */
const COMMENT = /\/\*[\s\S]*?\*\/|^[ \t]*\/\/.*$/gm

function transformOutsideComments(src, apply) {
  let out = ""
  let last = 0
  for (const m of src.matchAll(COMMENT)) {
    out += apply(src.slice(last, m.index))
    out += m[0]
    last = m.index + m[0].length
  }
  return out + apply(src.slice(last))
}

function walk(dir, out = []) {
  const abs = path.join(ROOT, dir)
  if (!fs.existsSync(abs)) return out
  for (const e of fs.readdirSync(abs, { withFileTypes: true })) {
    const rel = path.join(dir, e.name)
    if (e.isDirectory()) walk(rel, out)
    else if (/\.tsx?$/.test(e.name)) out.push(rel)
  }
  return out
}

const files = ROOTS.flatMap((r) => walk(r)).filter((f) => !NOT_COMPONENT_SOURCE.some((re) => re.test(f)))
const skipped = ROOTS.flatMap((r) => walk(r)).filter((f) => NOT_COMPONENT_SOURCE.some((re) => re.test(f)))

const touched = []
let total = 0

/**
 * The sides a role utility exists for, matching `SHAPE_SIDES` in
 * `generate-tokens.mjs`. Anything outside this set — `rounded-tl-4`,
 * `rounded-ss-2` — has no role form and keeps its measurement.
 */
const SHAPE_SIDES = new Set(["", "-t", "-r", "-b", "-l"])
const unmapped = []

for (const rel of files) {
  const abs = path.join(ROOT, rel)
  const src = fs.readFileSync(abs, "utf8")
  let next = src
  const perFile = {}

  for (const { from, to } of MAP) {
    // \b would not fire after a digit, so the tail is guarded explicitly: it must
    // not be followed by another word character or a dash, or `rounded-2` would
    // match inside a hypothetical `rounded-24`.
    const re = new RegExp(`rounded(-[tbrlse]{1,2})?-${from}(?![\\w-])`, "g")
    let hits = 0
    next = transformOutsideComments(next, (chunk) =>
      chunk.replace(re, (whole, side) => {
        // A role mints its OWN utility — `shape-container`, not
        // `rounded-container`. The radius namespace carries no role keys, so
        // emitting the `rounded-` form produced a class no stylesheet defines,
        // and an undefined corner utility does not fail: it renders square.
        // This pass was written before the generator settled that and would
        // have silently unrounded every site it touched.
        const s = side ?? ""
        if (!SHAPE_SIDES.has(s)) {
          // Corner-level and logical forms have no role utility, so the
          // measurement stays and says so rather than becoming a dead class.
          unmapped.push(`${rel}: ${whole} — shape has no ${s.slice(1)} form`)
          return whole
        }
        hits++
        return `shape${s}-${to}`
      })
    )
    if (!hits) continue
    perFile[`${from}->${to}`] = hits
    total += hits
  }

  if (next !== src) {
    touched.push({ file: rel, changes: perFile })
    if (!DRY) fs.writeFileSync(abs, next)
  }
}

console.log(`${DRY ? "DRY RUN — " : ""}radius stop -> round role`)
console.log(`${touched.length} files · ${total} call sites\n`)
for (const t of touched) {
  const summary = Object.entries(t.changes).map(([k, n]) => `${k} ×${n}`).join("  ")
  console.log(`  ${t.file.replace("packages/", "").padEnd(52)} ${summary}`)
}
if (skipped.length) console.log(`\nskipped as data/docs, not component source:\n  ${skipped.map((s) => s.replace("packages/", "")).join("\n  ")}`)
if (unmapped.length) console.log(`\nleft on the measurement — no role utility for that side:\n  ${unmapped.map((s) => s.replace("packages/", "")).join("\n  ")}`)

if (!DRY) {
  // Leftovers are counted outside comments too, or every protected rationale
  // would report as an unfinished migration for ever.
  const leftovers = []
  for (const rel of files) {
    const src = fs.readFileSync(path.join(ROOT, rel), "utf8")
    let code = ""
    transformOutsideComments(src, (chunk) => { code += chunk; return chunk })
    for (const { from } of MAP) {
      const re = new RegExp(`rounded(-[tbrlse]{1,2})?-${from}(?![\\w-])`, "g")
      if (re.test(code)) leftovers.push(`${rel} still has rounded-${from} in code`)
    }
  }
  console.log(`\n${leftovers.length === 0 ? "verified: every mapped stop is gone from the shipped packages" : leftovers.join("\n")}`)
}
