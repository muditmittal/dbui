#!/usr/bin/env node
/**
 * Generates the data behind the Components gallery on /components.
 *
 * The gallery must never be a hand-maintained list — it is the public claim
 * about what the library contains, so it is derived from the same CLI API that
 * agents read. Run after adding, renaming or recategorising a component.
 *
 *   node scripts/generate-gallery.mjs [--verify] [--storybook=<url>]
 *
 * `--verify` hands the ids computed below to `verify-story-ids.mjs`, which
 * asserts them — and every id written by hand elsewhere in the portal — against
 * a running Storybook. The ids here are built by reimplementing Storybook's own
 * rule, so nothing else catches a link that is well-formed and points at
 * nothing. The same check runs on its own as `yarn design:verify-story-ids`.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { componentList } from "../packages/dbui-cli/src/api.mjs"
import { storybookUrlFrom, verifyStoryIds } from "./verify-story-ids.mjs"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const STORIES = path.join(ROOT, "apps/portal/src/stories")
const OUT = path.join(STORIES, "components/gallery-data.ts")
const INDEX_MD = path.join(ROOT, "packages/dbui/docs/component-index.md")

/**
 * The one-line descriptor shown above each category in the gallery, read from
 * the "What it does" column of the index's Categories table. The index owns
 * which component to pick, and a category descriptor is part of that, so the
 * gallery renders the index's words rather than keeping its own copy.
 */
function categoryBlurbs() {
  const md = fs.readFileSync(INDEX_MD, "utf8")
  const blurbs = {}
  for (const line of md.split("\n")) {
    const m = line.match(/^\|\s*`([a-z]+)`\s*\|([^|]+)\|/)
    if (m) blurbs[m[1]] = m[2].trim()
  }
  return blurbs
}

/** Storybook's own id algorithm, so generated links match the live index. */
const sanitize = (s) =>
  s
    .toLowerCase()
    .replace(/[ '’–—―′¿`~!@#$%^&*()_|+\-=?;:",.<>{}[\]\\/]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")

/**
 * The display name Storybook derives from an export identifier. `@storybook/csf`
 * runs `storyNameFromExport`, which is lodash `startCase` — it splits the
 * identifier into words before anything sanitizes it.
 *
 * Skipping this step is invisible rather than loud, which is why it survived:
 * `FiltersOnly` sanitizes straight to a perfectly well-formed `filtersonly`,
 * and nothing about that string says no story answers to it. Storybook reads
 * the same export as "Filters Only" and files it under `filters-only`, so the
 * two only disagree on components whose export name has a second word.
 *
 * The four substitutions are lodash's word boundaries: camel case, an acronym
 * followed by a word, and either side of a digit run. Case is then cosmetic —
 * `sanitize` lowercases everything — but `upperFirst` per word is what the real
 * function does, and a reimplementation that quietly differs is the bug again.
 */
const startCase = (key) =>
  key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .replace(/([A-Za-z])(\d)/g, "$1 $2")
    .replace(/(\d)([A-Za-z])/g, "$1 $2")
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

const storyId = (title, name) => `${sanitize(title)}--${sanitize(name)}`

/**
 * A `name` on the story object does not enter this. It relabels the row in
 * Storybook's sidebar and nothing else — `DataTreeExplorerStory` named
 * "Data Tree Explorer" is still filed under `data-tree-explorer-story`. The id
 * is the export identifier, always, which is the whole reason the transform
 * above is the only step that matters.
 */

/**
 * Collect every story in the Components root, keyed by its title's leaf name and
 * also by each of its exports.
 *
 * The leaf key is the common case — one file per component, `Components/Viz/Donut`
 * answering to "Donut". The per-export keys are for a file that holds several
 * components, where the leaf names the group rather than any one of them: the
 * charts all live under `Components/Viz/Charts`, so "Heatmap" can only be found
 * by the export that draws it. Without this, every chart sharing that file was
 * reported as having no story while its story sat right there.
 *
 * A leaf key wins over an export key, because a file named after a component is a
 * stronger claim than an export inside a group.
 */
function indexStories() {
  const found = new Map()
  const byExport = new Map()
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(p)
        continue
      }
      if (!entry.name.endsWith(".stories.tsx")) continue
      const src = fs.readFileSync(p, "utf8")
      const title = src.match(/title:\s*"([^"]+)"/)?.[1]
      if (!title || !title.startsWith("Components/")) continue
      const names = [...src.matchAll(/export const (\w+):\s*StoryObj/g)].map((m) => m[1])
      // Prefer Playground; fall back to the first exported story.
      const story = names.includes("Playground") ? "Playground" : names[0]
      if (!story) continue
      const leaf = title.split("/").pop()
      found.set(leaf.toLowerCase().replace(/[^a-z0-9]/g, ""), {
        title,
        id: storyId(title, startCase(story)),
      })

      // Each export, under both its identifier and its sidebar `name` if it has
      // one — `LeaderboardRows` named "Leaderboard" has to answer to the label a
      // reader sees, while the id stays the identifier.
      for (const exportName of names) {
        const id = storyId(title, startCase(exportName))
        const keys = [exportName]
        const labelled = src.match(
          new RegExp(`export const ${exportName}:\\s*StoryObj\\s*=\\s*\\{\\s*name:\\s*"([^"]+)"`)
        )?.[1]
        if (labelled) keys.push(labelled)
        for (const key of keys) {
          const k = key.toLowerCase().replace(/[^a-z0-9]/g, "")
          if (!byExport.has(k)) byExport.set(k, { title, id })
        }
      }
    }
  }
  walk(STORIES)
  // Leaf keys take precedence, so they are written last.
  return new Map([...byExport, ...found])
}

/**
 * Component-index names whose story lives under a different label.
 *
 * The viz entries point a component name at the export that draws it inside
 * `Components/Viz/Charts`: the story section is called "Bars", the component is
 * `BarChart`, and neither normalizes to the other.
 */
const ALIASES = {
  tree: "datatree",
  progressbar: "progress",
  radio: "radiogroup",
  togglebutton: "toggle",
  chart: "charts",
  barchart: "bars",
  lineseries: "line",
  donutchart: "donut",
  segmentedbar: "segmented",
  // Legend is an inner part with no entry of its own — it is only ever placed
  // beside something, so its demo lives in the Donut story where the pairing is.
  legend: "donut",

  // The chat stories are named for scenarios rather than components, because a
  // turn is only legible next to the turns around it — `Messages` shows Message,
  // `Answering` shows the pair a reader chooses between. So each component points
  // at the scenario that demonstrates it.
  conversation: "fullthread",
  message: "messages",
  messageactions: "sourcesinactionrow",
  messagethumbnail: "mediainaturn",
  promptinput: "composer",
  reasoning: "reasoningstates",
  response: "responsemarkdown",
  task: "tasks",
  plan: "plans",
  sources: "sourcesinactionrow",
  confirmation: "answering",
  suggestions: "answering",
  suggestion: "answering",
  artifact: "outputs",
  checkpoint: "outputs",
}

const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "")

/**
 * Category display order.
 *
 * The first four are Figma's own component groups, in Figma's order, so the
 * gallery and the design file index the set the same way. Feedback and
 * Compositions follow: Figma has neither as a group of its own — it scatters the
 * feedback components across Content and Overlays, and files page chrome under
 * Compositions — so they sit after the four rather than interleaved with them.
 *
 * A category the index gains but this list does not name still renders, at the
 * end, with its key title-cased. That is the fallback that carried the six new
 * groups on the first run of this generator and put Content ahead of Action.
 */
const ORDER = [
  ["action", "Action"],
  ["controls", "Controls"],
  ["content", "Content"],
  // Chat reads with Content rather than after Compositions: it is a category a
  // reader browses, not an afterthought. It used to be spliced into this position
  // by the Components page, because the index was scoped to `packages/dbui` and
  // could not generate it. The index covers `dbui-chat` now, so naming it here is
  // what keeps it from falling through to the end — and what removed the
  // hand-written second Chat group the splice had started duplicating.
  ["chat", "Chat"],
  ["feedback", "Feedback"],
  ["overlays", "Overlays"],
  ["compositions", "Compositions"],
  ["viz", "Viz"],
]

const stories = indexStories()
const { categories } = componentList().data
const blurbs = categoryBlurbs()

const groups = []
let linked = 0
let unlinked = 0
const undescribed = []

const seen = new Set()
const emit = (key, label) => {
  const items = categories[key]
  if (!items?.length) return
  seen.add(key)
  const entries = items
    // Internal primitives and deliberately-excluded aliases are real parts of
    // the codebase, but they are not things a builder browses for.
    .filter((c) => !/utility|internal|excluded|deprioriti/i.test(c.name))
    .map((c) => {
      // The index annotates names in parentheses; the gallery shows the name only.
      const name = c.name.replace(/\s*\(.*\)\s*$/, "").trim()
      const key = normalize(name)
      const match = stories.get(ALIASES[key] ?? key) ?? stories.get(key)
      if (match) linked++
      else unlinked++
      return {
        name,
        slug: c.slug,
        // The index is markdown; the gallery renders as plain text.
        useFor: (c.useFor || "").replace(/`/g, "").trim(),
        storyId: match?.id ?? null,
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name))
  if (!entries.length) return
  if (!blurbs[key]) undescribed.push(key)
  groups.push({ key, label, blurb: blurbs[key] ?? "", items: entries })
}

for (const [key, label] of ORDER) emit(key, label)
for (const key of Object.keys(categories)) {
  if (!seen.has(key)) emit(key, key.charAt(0).toUpperCase() + key.slice(1))
}

const total = groups.reduce((n, g) => n + g.items.length, 0)

const file = `// Generated by scripts/generate-gallery.mjs — do not edit by hand.
// Source of truth: packages/dbui-cli/src/api.mjs (listComponents).

export type GalleryItem = {
  name: string
  slug: string
  useFor: string
  storyId: string | null
}

export type GalleryGroup = {
  key: string
  label: string
  blurb: string
  items: GalleryItem[]
}

export const galleryGroups: GalleryGroup[] = ${JSON.stringify(groups, null, 2)}

export const galleryTotal = ${total}
`

fs.mkdirSync(path.dirname(OUT), { recursive: true })
fs.writeFileSync(OUT, file)

console.log(`wrote ${path.relative(ROOT, OUT)}`)
console.log(`  ${groups.length} categories, ${total} components`)
console.log(`  ${linked} linked to a story, ${unlinked} without one`)
if (unlinked) {
  const missing = groups.flatMap((g) => g.items.filter((i) => !i.storyId).map((i) => i.name))
  console.log(`  missing stories: ${missing.join(", ")}`)
}
if (undescribed.length) {
  console.log(`  no Categories row in component-index.md: ${undescribed.join(", ")}`)
}

// Opt-in, so the generator still runs with no server. Verifying here rather
// than only in the standalone command is worth the flag: this is the moment the
// ids change, and the file it writes is on disk by now for the scan to read.
if (process.argv.includes("--verify")) {
  await verifyStoryIds({
    extra: [...stories.values()],
    url: storybookUrlFrom(process.argv),
  })
}
