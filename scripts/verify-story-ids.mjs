#!/usr/bin/env node
/**
 * Asserts that every Storybook story id the portal links to resolves to a story
 * in a running Storybook.
 *
 *   yarn workspace portal storybook          # must be up first
 *   yarn design:verify-story-ids
 *   yarn design:verify-story-ids --storybook=http://localhost:6007
 *
 * The failure this exists for is a string that looks completely correct and
 * points at nothing. A story id is lowercase, hyphenated and plausible whether
 * or not it is real, so nothing about `filters-only` versus `filtersonly` reads
 * as wrong — the link just lands on an empty frame, and only for the reader who
 * clicked it.
 *
 * ## Why it scans instead of reading a registry
 *
 * The tidier shape is one exported constant that every page imports and this
 * script verifies. It was rejected: a registry only ever checks the ids someone
 * remembered to register, and forgetting to register one is the same act as
 * typing one wrong. It would be silent on exactly the case it exists for.
 *
 * Scanning the portal's source finds the string wherever it sits, so an id
 * typed into a new page is covered the moment it is written, with no protocol
 * step to skip. The cost is a regex that could match prose shaped like an id;
 * that direction of error announces itself with a file and a line, whereas a
 * missed id stays quiet. Prefer the loud failure.
 *
 * The scan takes in the generated `gallery-data.ts` along with everything else,
 * so a standalone run covers the emitted ids and the hand-written ones from the
 * same pass. `generate-gallery.mjs --verify` calls in here and adds the ids it
 * just computed, which are the same set one step earlier.
 *
 * ## Why it is not in the default check set
 *
 * It needs Storybook on 6006. `verify-sync` and `verify-rules` read files and
 * run anywhere, so this one cannot join them in anything that runs
 * unconditionally. It is a named command rather than a flag because what it
 * covers is no longer the generator's business — the shell previews and the
 * compositions link live in `apps/portal/src/app/docs/`, and a check on those
 * hidden behind a generator flag is a check nobody finds.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const PORTAL = path.join(ROOT, "apps/portal/src")
const DEFAULT_STORYBOOK = "http://localhost:6006"

const SCANNED = new Set([".ts", ".tsx", ".js", ".jsx", ".mdx", ".md"])

/**
 * A Storybook id is `<sanitized title>--<sanitized export>`, both lowercase
 * alphanumerics and single hyphens. The doubled hyphen is the only part that
 * makes the shape distinctive, which is what keeps this from matching ordinary
 * class names and slugs. It deliberately does not anchor on `components-`:
 * every id in the portal happens to start there today, and an id filed under a
 * future root would then be the one thing that slips through.
 */
const STORY_ID = /\b[a-z0-9]+(?:-[a-z0-9]+)*--[a-z0-9]+(?:-[a-z0-9]+)*\b/g

/** Every story id written anywhere under the portal, mapped to where it was found. */
export function scanForStoryIds(dir = PORTAL) {
  const found = new Map()
  const walk = (current) => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const p = path.join(current, entry.name)
      if (entry.isDirectory()) {
        if (entry.name !== "node_modules") walk(p)
        continue
      }
      if (!SCANNED.has(path.extname(entry.name))) continue
      const lines = fs.readFileSync(p, "utf8").split("\n")
      lines.forEach((line, i) => {
        for (const [id] of line.matchAll(STORY_ID)) {
          if (!found.has(id)) found.set(id, new Set())
          found.get(id).add(`${path.relative(ROOT, p)}:${i + 1}`)
        }
      })
    }
  }
  walk(dir)
  return found
}

/**
 * @param {{ id: string, title?: string }[]} extra Ids computed elsewhere this run.
 */
export async function verifyStoryIds({ extra = [], url = DEFAULT_STORYBOOK } = {}) {
  const ids = scanForStoryIds()
  const scanned = ids.size
  for (const { id, title } of extra) {
    if (!ids.has(id)) ids.set(id, new Set())
    ids.get(id).add(title ? `computed (${title})` : "computed")
  }

  let index
  try {
    const res = await fetch(`${url}/index.json`)
    if (!res.ok) throw new Error(`${url}/index.json returned ${res.status}`)
    index = await res.json()
  } catch (cause) {
    // A check that cannot run has not passed. Say which of the two it is.
    console.error(`\n  cannot reach Storybook at ${url} — ${cause.message}`)
    console.error(`  start it with \`yarn workspace portal storybook\`, then re-run.\n`)
    process.exitCode = 1
    return false
  }

  const real = new Set(Object.keys(index.entries ?? {}))
  const dead = [...ids].filter(([id]) => !real.has(id))
  if (dead.length) {
    console.error(`\n  ${dead.length} story id(s) match no story in ${url}:`)
    for (const [id, origins] of dead) {
      console.error(`    ${id}`)
      for (const origin of origins) console.error(`      ${origin}`)
    }
    console.error("")
    process.exitCode = 1
    return false
  }

  console.log(`  verified ${ids.size} story ids against ${url}`)
  console.log(`  ${scanned} found in apps/portal/src, ${ids.size - scanned} computed this run`)
  return true
}

export const storybookUrlFrom = (argv) =>
  argv.find((a) => a.startsWith("--storybook="))?.slice("--storybook=".length) ?? DEFAULT_STORYBOOK

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await verifyStoryIds({ url: storybookUrlFrom(process.argv) })
}
