#!/usr/bin/env node
/**
 * Strips the dead `<defs><clipPath>` block, and the attribute that points at
 * it, out of the icon set.
 *
 *   node scripts/codemod-icon-color.mjs            # report only
 *   node scripts/codemod-icon-color.mjs --write    # apply
 *
 * SVGR emitted a clip path for these icons and dropped the `id` off the
 * `<clipPath>` on the way out, so `clipPath="url(#GearIcon_svg__a)"` names an
 * element that does not exist. A reference that resolves to nothing is ignored
 * and the shape paints unclipped, which is why the set looks correct today and
 * why removing the pair is a no-op the renderer cannot tell apart.
 *
 * It matters because the orphaned block is where the icon set's `#fff` lives.
 * A `fill` on a `clipPath` child is never painted — only the geometry is read —
 * so the hex is not a color the eye can reach, but it is still a color literal
 * sitting in a component, and the next reader has no way to know it is inert.
 *
 * What is deliberately NOT rewritten:
 *
 *   - `Token.tsx`. Its `#fff` is on a `<mask>` that carries a real id and is
 *     referenced. A luminance mask reads white as "show this pixel", so the
 *     value is an alpha channel wearing a color's syntax. `currentColor` there
 *     would tie visibility to the text color and blank the icon on a dark
 *     glyph.
 *   - `DatabricksLogo.tsx`'s `#FF4949`. A brand mark is a constant, not a theme
 *     value, and the lockup already lets its wordmark inherit — which is what
 *     makes it read correctly in both modes. Tokenizing it needs a `brand/*`
 *     semantic that does not exist yet.
 *
 * The block is matched only where the `<clipPath>` has no `id` and the `<defs>`
 * holds nothing else, so an icon with a real clip path is left alone.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const ICONS = path.join(ROOT, "packages/dbui/src/components/icons")
const WRITE = process.argv.includes("--write")

/** A `<defs>` whose only child is an id-less `<clipPath>` wrapping one path. */
const DEAD_DEFS = /\n\s*<defs>\s*\n\s*<clipPath>\s*\n\s*<path fill="#fff"[^/]*\/>\s*\n\s*<\/clipPath>\s*\n\s*<\/defs>/
const CLIP_ATTR = /\s+clipPath="url\(#([^)]+)\)"/

const changed = []
const skipped = []

for (const file of fs.readdirSync(ICONS).filter((f) => f.endsWith(".tsx"))) {
  const full = path.join(ICONS, file)
  const before = fs.readFileSync(full, "utf8")
  if (!DEAD_DEFS.test(before)) continue

  // The block is only dead if nothing else in the file defines that id. An
  // icon that grew a real clip path must survive this pass untouched.
  const ref = before.match(CLIP_ATTR)
  if (ref && before.includes(`<clipPath id="${ref[1]}"`)) {
    skipped.push(`${file}: ${ref[1]} is defined, left alone`)
    continue
  }

  const after = before.replace(DEAD_DEFS, "").replace(CLIP_ATTR, "")
  if (after === before) {
    skipped.push(`${file}: matched but rewrote to itself`)
    continue
  }
  if (after.includes("#fff")) {
    skipped.push(`${file}: still carries a hex after the rewrite`)
    continue
  }
  changed.push(file)
  if (WRITE) fs.writeFileSync(full, after)
}

console.log(`${WRITE ? "rewrote" : "would rewrite"} ${changed.length} icons`)
for (const s of skipped) console.log(`  skipped ${s}`)
if (!WRITE) console.log("re-run with --write to apply")
