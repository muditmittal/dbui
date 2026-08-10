#!/usr/bin/env node
/**
 * verify-spelling — asserts the repo writes one spelling of English.
 *
 * `packages/dbui/docs/brandvoice.md` states it as a rule and extends it past UI
 * copy: "American spelling throughout - color, behavior, optimize, canceled.
 * This applies to code comments and token names as well as UI copy." Nothing
 * enforced it, so the other spelling accumulated in comments, docs and
 * generated output - including in the token layer, next to the very tokens the
 * rule is most about.
 *
 * A spelling rule is the kind that cannot be held by intention. It is invisible
 * in review, it costs nothing to get wrong, and every instance reads as fine to
 * whoever wrote it. So it is checked rather than remembered.
 *
 * ## The locale is a setting, and en-US is the default
 *
 * The rule is "one spelling", not "American". A team shipping to a British
 * audience has the same need in the other direction, and hard-coding the
 * direction would make this unusable for them rather than merely wrong. So the
 * pairs are held once, direction-free, and a locale picks which side is right.
 *
 * en-US is the default because this system's audience is US-based and
 * `brandvoice.md` says so. That file remains where the decision lives; this one
 * only enforces whatever it says.
 *
 * Resolution order, first wins:
 *   1. --locale=en-GB on the command line
 *   2. DBUI_LOCALE in the environment
 *   3. "locale" in .dbuirc.json at the repo root
 *   4. en-US
 *
 * ## Scope
 *
 * Anything the repo authors. Vendored dependencies, lockfiles, build output and
 * `archive/` are excluded - they are other people's words, or a record of what
 * was once written, and rewriting either would be a lie about the source.
 *
 * This file checks itself. An earlier version skipped its own source so that
 * its examples would survive, and the result was a spelling checker containing
 * the spelling it forbids. The pairs below are built from fragments at runtime
 * for that reason: the data can hold both sides without either appearing in the
 * file as a word.
 *
 * Usage:
 *   node scripts/verify-spelling.mjs                  # report, exit 1 on any hit
 *   node scripts/verify-spelling.mjs --fix            # rewrite, preserving case
 *   node scripts/verify-spelling.mjs --locale=en-GB   # check the other way
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const ARGS = process.argv.slice(2)
const FIX = ARGS.includes("--fix")

/* ── locale ──────────────────────────────────────────────────────────────── */

const SUPPORTED = new Set(["en-US", "en-GB"])

function resolveLocale() {
  const flag = ARGS.find((a) => a.startsWith("--locale="))
  if (flag) return flag.slice("--locale=".length)
  if (process.env.DBUI_LOCALE) return process.env.DBUI_LOCALE
  try {
    const rc = JSON.parse(fs.readFileSync(path.join(ROOT, ".dbuirc.json"), "utf8"))
    if (rc.locale) return rc.locale
  } catch {
    /* no rc file, or not JSON - the default is the answer either way */
  }
  return "en-US"
}

const LOCALE = resolveLocale()
if (!SUPPORTED.has(LOCALE)) {
  console.error(`Unknown locale "${LOCALE}". Supported: ${[...SUPPORTED].join(", ")}.`)
  process.exit(2)
}

/* ── the pairs ───────────────────────────────────────────────────────────── */

/**
 * Held as [British, American], direction-free, so one table serves both
 * locales. Assembled from fragments so this file can check itself without
 * containing either spelling as a literal word - see the header.
 *
 * `-ise` verbs are listed by stem rather than matched as a suffix, because a
 * suffix rule rewrites `wise`, `precise`, `concise`, `promise` and `surprise`,
 * and a checker that corrupts correct words is worse than none.
 *
 * `grey`/`gray` is deliberately absent. It is a color name in the token layer,
 * and a blanket rewrite would rename tokens - a public shape change hiding
 * inside a spelling pass. If the ramps should change, that is a token decision
 * made on purpose.
 */
const OUR = "our"
const OR = "or"
const ISE = "ise"
const IZE = "ize"

const RE_ = "re"
const ER_ = "er"
const CE = "ce"
const SE = "se"
const UE = "ue"
const L = "l"

/** [british, american] for a word that differs only by -our / -or. */
const ourOr = (stem) => [stem + OUR, stem + OR]
/** Every inflection of an -ise / -ize verb. */
const iseIze = (stem) => [
  [stem + ISE, stem + IZE],
  [stem + ISE + "d", stem + IZE + "d"],
  [stem + ISE + "s", stem + IZE + "s"],
  [stem + ISE.slice(0, 2) + "ing", stem + IZE.slice(0, 2) + "ing"],
]
/** Swaps a trailing -re for -er, with an optional inflection after it. */
const reEr = (stem, tail = "") => [[stem + RE_ + tail, stem + ER_ + tail]]
/** Swaps a trailing -ce for -se. */
const ceSe = (stem) => [stem + CE, stem + SE]
/** Drops a trailing -ue that the American form does not carry. */
const ueDrop = (stem, tail = "") => [stem + UE + tail, stem + tail]
/** Swaps -yse for -yze, with inflections. */
const yseYze = (stem) => [
  [stem + "se", stem + "ze"],
  [stem + "sed", stem + "zed"],
  [stem + "ses", stem + "zes"],
  [stem + "sing", stem + "zing"],
]
/** Halves a doubled final consonant before an inflection. */
const llL = (stem) => [
  [stem + L + "ed", stem + "ed"],
  [stem + L + "ing", stem + "ing"],
]

const PAIRS = [
  ourOr("col"), ["col" + OUR + "s", "col" + OR + "s"], ["col" + OUR + "ed", "col" + OR + "ed"],
  ["col" + OUR + "ing", "col" + OR + "ing"],
  ourOr("behavi"), ["behavi" + OUR + "s", "behavi" + OR + "s"], ["behavi" + OUR + "al", "behavi" + OR + "al"],
  ourOr("flav"), ["flav" + OUR + "s", "flav" + OR + "s"],
  ourOr("hon"), ["hon" + OUR + "s", "hon" + OR + "s"], ["hon" + OUR + "ed", "hon" + OR + "ed"],
  ourOr("lab"), ourOr("neighb"), ["neighb" + OUR + "s", "neighb" + OR + "s"],
  ourOr("fav"), ["fav" + OUR + "s", "fav" + OR + "s"], ["fav" + OUR + "ite", "fav" + OR + "ite"],
  // Irregulars, also assembled from fragments. The first version wrote these as
  // whole words and `--fix` rewrote its own table into ["center", "center"] on
  // the first run - the checker was strong enough to attack itself. Nothing
  // below may appear as a complete word anywhere in this file.
  ...reEr("cent"), ...reEr("cent", "s"), ...reEr("cent", "ed"),
  ceSe("licen"), ceSe("defen"), ceSe("offen"),
  ueDrop("catalog"), ueDrop("catalog", "s"),
  ...yseYze("analy"),
  ...iseIze("optim"), ...iseIze("organ"), ...iseIze("initial"), ...iseIze("normal"),
  ...iseIze("serial"), ...iseIze("visual"), ...iseIze("custom"), ...iseIze("minim"),
  ...iseIze("maxim"), ...iseIze("summar"), ...iseIze("recogn"), ...iseIze("emphas"),
  ...iseIze("priorit"), ...iseIze("standard"),
  ...llL("cancel"), ...llL("model"), ...llL("travel"), ...llL("label"),
  [`fulfi${L}`, `fulfi${L + L}`], [`enro${L}`, `enro${L + L}`],
]

const FROM_IDX = LOCALE === "en-US" ? 0 : 1
const TO_IDX = 1 - FROM_IDX
const MAP = new Map(PAIRS.map((p) => [p[FROM_IDX], p[TO_IDX]]))
const RE = new RegExp(`\\b(${[...MAP.keys()].join("|")})\\b`, "gi")

/* ── files ───────────────────────────────────────────────────────────────── */

const SKIP_DIRS = new Set([
  ".git", "node_modules", ".next", "storybook-static", "dist", ".turbo",
  // Other people's words.
  "vendor",
  // A record of what was written, not a statement of what is true now.
  "archive",
  // Built Storybook, served from public/. Bundled third-party runtime, and the
  // reason this needs naming: it is build output living under a source tree, so
  // the usual `dist`/`.next` exclusions do not reach it. Matches the directory
  // name exactly, so the authored `.storybook/` config is still checked.
  "storybook", "sb-manager", "sb-preview", "sb-addons", "sb-common-assets",
])
const SKIP_FILES = new Set(["yarn.lock", "package-lock.json"])
const EXTS = new Set([".ts", ".tsx", ".js", ".mjs", ".cjs", ".json", ".css", ".md", ".mdx", ".txt", ".html"])

/** Preserve the case the author used, including a fully upper-case token. */
function matchCase(src, replacement) {
  if (src === src.toUpperCase() && src !== src.toLowerCase()) return replacement.toUpperCase()
  if (src[0] === src[0].toUpperCase()) return replacement[0].toUpperCase() + replacement.slice(1)
  return replacement
}

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name) || entry.name.startsWith(".tmp")) continue
      yield* walk(path.join(dir, entry.name))
    } else if (entry.isFile()) {
      if (SKIP_FILES.has(entry.name)) continue
      if (!EXTS.has(path.extname(entry.name))) continue
      yield path.join(dir, entry.name)
    }
  }
}

const hits = []
let fixedFiles = 0

for (const abs of walk(ROOT)) {
  const rel = path.relative(ROOT, abs)
  let src
  try { src = fs.readFileSync(abs, "utf8") } catch { continue }
  RE.lastIndex = 0
  if (!RE.test(src)) continue

  if (FIX) {
    const next = src.replace(RE, (m) => matchCase(m, MAP.get(m.toLowerCase())))
    if (next !== src) { fs.writeFileSync(abs, next); fixedFiles++ }
    continue
  }

  src.split("\n").forEach((line, i) => {
    RE.lastIndex = 0
    let m
    while ((m = RE.exec(line))) {
      hits.push({ file: rel, line: i + 1, found: m[1], want: matchCase(m[1], MAP.get(m[1].toLowerCase())) })
    }
  })
}

/* ── report ──────────────────────────────────────────────────────────────── */

if (FIX) {
  console.log(`Spelling (${LOCALE}) - rewrote ${fixedFiles} file${fixedFiles === 1 ? "" : "s"}.`)
  process.exit(0)
}

console.log(`# Spelling - ${LOCALE}\n`)
if (hits.length === 0) {
  console.log(`No off-locale spellings in authored files.`)
  console.log(`   ${MAP.size} pairs checked. vendor/, archive/, lockfiles and build output are excluded by design.`)
  process.exit(0)
}

const byFile = new Map()
for (const h of hits) byFile.set(h.file, [...(byFile.get(h.file) || []), h])
console.log(`${hits.length} in ${byFile.size} file${byFile.size === 1 ? "" : "s"}. \`brandvoice.md\` sets the spelling and extends it to code comments and token names.\n`)
for (const [file, list] of [...byFile].sort((a, b) => b[1].length - a[1].length)) {
  console.log(`  ${String(list.length).padStart(3)}  ${file}`)
  for (const h of list.slice(0, 3)) console.log(`       :${h.line} ${h.found} -> ${h.want}`)
  if (list.length > 3) console.log(`       ...and ${list.length - 3} more`)
}
console.log(`\nRun \`node scripts/verify-spelling.mjs --fix\` to rewrite them.`)
process.exit(1)
