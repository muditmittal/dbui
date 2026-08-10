#!/usr/bin/env node
/**
 * One focus treatment: a 1px offset plus a 2px ring, via
 * `focus-visible:border-focus-ring focus-visible:shadow-focus`.
 *
 * WHY THE RING ALONE CANNOT WORK
 * A focus indicator has to clear 3:1 against the page AND against whatever the
 * control is filled with (WCAG 1.4.11, AA). Those pull opposite ways and no single
 * color satisfies both:
 *
 *   light  ring #404040  vs page #FFFFFF  10.37:1 pass  ·  vs fill #171717  1.73:1 FAIL
 *   dark   ring #F6F7F9  vs page #11171C  16.84:1 pass  ·  vs fill #D1D9E1  1.33:1 FAIL
 *
 * The 1px offset splits one impossible boundary into two easy ones — 17.93:1 and
 * 10.37:1 light, 12.66:1 and 16.84:1 dark. That is why the offset is load-bearing
 * rather than decorative, and why it is not optional on filled controls.
 *
 * WHAT THIS REMOVES, AND WHY IT WAS WRONG
 * `focus-visible:ring-3 ring-focus-ring/50` is the shadcn default and it fails
 * outright, because a half-opacity indicator measures worse than the page it sits
 * on:
 *
 *   over white page    blends to #A0A0A0  2.61:1 FAIL
 *   over primary fill  blends to #2C2C2C  1.28:1 FAIL
 *
 * Tailwind's `ring-*` also has no theme namespace in v4, so those uses could never
 * resolve to a DBUI token — they were permanently off-scale as well as failing.
 *
 * HELD BACK ON PURPOSE
 * Slider, DataTree, ScrollArea and Resizable are not boxes. A handle, a full-width
 * tree row, a scrollbar thumb and a drag divider each need judgement about where an
 * outset ring can go without clipping, so they are listed rather than rewritten.
 *
 *   node scripts/migrations/focus-treatment.mjs --dry
 *   node scripts/migrations/focus-treatment.mjs
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const DRY = process.argv.includes("--dry")

/** Non-box surfaces. Reported, never rewritten. */
const HOLD = ["slider.tsx", "data-tree.tsx", "scroll-area.tsx", "resizable.tsx"]

const FILES = [
  "packages/dbui/src/components/ui/accordion.tsx",
  "packages/dbui/src/components/ui/item.tsx",
  "packages/dbui/src/components/ui/native-select.tsx",
  "packages/dbui/src/components/ui/navbar.tsx",
  "packages/dbui/src/components/ui/radio-tile.tsx",
  "packages/dbui/src/components/ui/tabs.tsx",
  "packages/dbui/src/components/ui/input.tsx",
  "packages/dbui/src/components/ui/select.tsx",
  "packages/dbui/src/components/ui/textarea.tsx",
  "packages/dbui/src/components/ui/date-range.tsx",
  "packages/dbui/src/components/ui/segment-control.tsx",
  "packages/dbui/src/components/ui/toggle.tsx",
]

/**
 * Rings to delete. `ring-0` is NOT here — it is how an inner control tells the
 * shell around it to own the indicator, which is the InputGroup pattern and
 * deliberate. Neither is `aria-invalid:ring-*`: an invalid ring is a different
 * state with its own color, and folding it in here would change error styling
 * under cover of a focus change.
 */
const DROP = [
  /\bfocus-visible:ring-focus-ring\/\d+\s*/g,
  /\bfocus-visible:ring-focus-ring\s*/g,
  /\bfocus-visible:ring-\[\d+px\]\s*/g,
  /\bfocus-visible:ring-[1-9]\d*\s*/g,
  /\bfocus-visible:ring-inset\s*/g,
  /\bfocus-visible:outline-1\s*/g,
]

const COMMENT = /\/\*[\s\S]*?\*\/|^[ \t]*\/\/.*$/gm
function outsideComments(src, apply) {
  let out = ""
  let last = 0
  for (const m of src.matchAll(COMMENT)) {
    out += apply(src.slice(last, m.index))
    out += m[0]
    last = m.index + m[0].length
  }
  return out + apply(src.slice(last))
}

const report = []
for (const rel of FILES) {
  const abs = path.join(ROOT, rel)
  if (!fs.existsSync(abs)) { report.push({ file: rel, note: "MISSING" }); continue }
  const src = fs.readFileSync(abs, "utf8")
  let removed = 0
  let added = 0

  let next = outsideComments(src, (chunk) => {
    let c = chunk
    for (const re of DROP) {
      c = c.replace(re, () => { removed++; return "" })
    }
    /**
     * The ring goes next to the border so the pair reads as one treatment, and
     * only where a border is actually set — appending to an arbitrary class list
     * would put a ring on a node that has no focus state at all.
     */
    c = c.replace(/\bfocus-visible:border-focus-ring\b(?![^"'`]*focus-visible:shadow-focus)/g, (m) => {
      added++
      return `${m} focus-visible:shadow-focus`
    })
    return c
  })

  // Collapse the double spaces the deletions leave behind, inside strings only.
  next = next.replace(/ {2,}(?=[a-z@[!*&:-])/g, " ")

  if (next !== src) {
    if (!DRY) fs.writeFileSync(abs, next)
    report.push({ file: rel, removed, added })
  } else {
    report.push({ file: rel, removed: 0, added: 0, note: "no change" })
  }
}

console.log(`${DRY ? "DRY RUN — " : ""}one focus treatment: border-focus-ring + shadow-focus\n`)
for (const r of report) {
  console.log(`  ${r.file.replace("packages/", "").padEnd(50)} -${r.removed ?? 0} ring  +${r.added ?? 0} shadow-focus${r.note ? "  (" + r.note + ")" : ""}`)
}
console.log(`\nheld back for individual judgement — not boxes:`)
for (const h of HOLD) console.log(`  ${h}`)
