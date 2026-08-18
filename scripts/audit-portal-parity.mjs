#!/usr/bin/env node
/**
 * Portal parity — does every component a builder can browse to actually show up?
 *
 * The portal is the only running UI surface, so it is the only place a change to
 * a component can be looked at. That makes it the easiest thing to forget and the
 * most expensive thing to have wrong: a component can be exported, documented,
 * linted, connected to Figma and completely invisible.
 *
 * Three ways that happens, and this checks all three:
 *
 *   1. **No gallery row.** The component is in `component-index.md` under a
 *      browsable category but `gallery-data.ts` has no entry, so it is not on the
 *      page at all.
 *   2. **No story link.** The row exists and the name is not a link, so clicking
 *      the component leads nowhere and it renders a "No story yet" badge.
 *   3. **No demo tile.** `demos` is keyed by the gallery's *display* name, so a
 *      tile keyed `AiGradientIcon` against a row named `AI Gradient Icon` silently
 *      does not render — and the row falls back to copy that claims the component
 *      has no default state. That sentence is true of exactly one component, so
 *      any other row reaching it is a bug rather than a caption.
 *
 * The third is the one no other check can see. A missing tile is not a type error,
 * not a lint error and not a broken link — the page renders, and it lies.
 *
 * `design:verify-story-ids` is the fourth axis and needs a running Storybook, so
 * it stays separate. This runs offline.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const read = (p) => {
  try {
    return fs.readFileSync(path.join(ROOT, p), "utf8")
  } catch {
    return null
  }
}

const GALLERY_DATA = "apps/portal/src/stories/components/gallery-data.ts"
const GALLERY_DEMOS = "apps/portal/src/stories/components/gallery-demos.tsx"

/**
 * Components with no on-page state to draw. `toast()` is imperative and the
 * package exports only the `Toaster` mount, so there is nothing to render that
 * would not be a picture of a toast — and a picture is what the gallery's first
 * rule forbids.
 */
const NO_DEFAULT_STATE = new Set(["Toast"])

// ── Inputs ───────────────────────────────────────────────────────────────────
const dataRaw = read(GALLERY_DATA)
if (!dataRaw) {
  console.error(`Missing ${GALLERY_DATA}. Run: node scripts/generate-gallery.mjs`)
  process.exit(1)
}
const marker = "galleryGroups: GalleryGroup[] = "
const start = dataRaw.indexOf(marker) + marker.length
const end = dataRaw.indexOf("export const galleryTotal")
const groups = JSON.parse(dataRaw.slice(start, end).trim())
const rows = groups.flatMap((g) => g.items.map((i) => ({ ...i, group: g.key })))

const demosRaw = read(GALLERY_DEMOS) ?? ""
const demosBody = demosRaw.slice(demosRaw.indexOf("export const demos"))
// Top-level keys only — two spaces of indent. Quoted for a display name with a
// space, bare for a single identifier.
const demoKeys = new Set(
  [...demosBody.matchAll(/\n {2}(?:"([^"]+)"|([A-Za-z][A-Za-z0-9 ]*)):\s/g)].map(
    (m) => m[1] ?? m[2]
  )
)

// ── Checks ───────────────────────────────────────────────────────────────────
const findings = {
  noStory: rows.filter((r) => !r.storyId),
  noTile: rows.filter((r) => !demoKeys.has(r.name) && !NO_DEFAULT_STATE.has(r.name)),
  // A tile keyed to nothing is the AiGradientIcon failure: written, never rendered.
  deadTile: [...demoKeys].filter((k) => !rows.some((r) => r.name === k)),
  // A row claiming no default state that is not the one component for which that
  // is true — the reverse of noTile, and it reads as a documented absence.
  wrongFallback: [...NO_DEFAULT_STATE].filter(
    (n) => !rows.some((r) => r.name === n) || demoKeys.has(n)
  ),
}

// ── Report ───────────────────────────────────────────────────────────────────
console.log("\nPORTAL PARITY\n")
console.log("  Every component a builder can browse to has to be visible on the page:")
console.log("  a gallery row, a link to its story, and a live tile.\n")

for (const group of groups) {
  const flagged = group.items.filter(
    (i) => !i.storyId || (!demoKeys.has(i.name) && !NO_DEFAULT_STATE.has(i.name))
  )
  const mark = flagged.length ? "!" : " "
  console.log(
    `  ${mark} ${group.label.toUpperCase().padEnd(14)} ${String(group.items.length).padStart(2)} rows` +
      (flagged.length ? `  — ${flagged.length} incomplete` : "")
  )
}

const sections = [
  ["Gallery rows with no story to open", findings.noStory.map((r) => `${r.name} (${r.group})`)],
  [
    "Gallery rows with no demo tile — these render the no-default-state fallback",
    findings.noTile.map((r) => `${r.name} (${r.group}) — add a "${r.name}" key to demos`),
  ],
  [
    "Demo tiles keyed to no gallery row — written but never rendered",
    findings.deadTile.map((k) => `"${k}" matches no row name`),
  ],
  ["No-default-state exemption no longer holds", findings.wrongFallback],
]

let total = 0
for (const [title, items] of sections) {
  if (!items.length) continue
  total += items.length
  console.log(`\n  ${title} — ${items.length}`)
  for (const i of items) console.log(`    - ${i}`)
}

console.log(
  total === 0
    ? `\n  No gaps. ${rows.length} rows, ${rows.length - NO_DEFAULT_STATE.size} with a live tile.\n`
    : `\n  ${total} finding(s).\n`
)
process.exit(total === 0 ? 0 : 1)
