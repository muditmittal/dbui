#!/usr/bin/env node
/**
 * Fetch the UX standards corpus and record its provenance.
 *
 * Clones live outside the repo so they never pollute `git status` and never get
 * committed by accident. Only openly licensed sources are fetched: everything in
 * bucket B is link-and-restate, so caching its prose would be the exact thing
 * `README.md` says not to do.
 *
 *   node fetch.mjs           clone missing, update existing, rewrite provenance
 *   node fetch.mjs --force   discard and re-clone everything
 *
 * Writes the resolved SHAs back into `sources.json` so a claim in the corpus can
 * always be traced to the commit it was read from.
 */

import { execFileSync } from "node:child_process"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { homedir } from "node:os"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const HERE = dirname(fileURLToPath(import.meta.url))
const CACHE = join(homedir(), ".cache", "dbui-ux-corpus")
const PDF_DIR = join(CACHE, "_pdfs")
const MANIFEST = join(HERE, "sources.json")
const FORCE = process.argv.includes("--force")

/** Bucket A and A-v only. Bucket B is never cached — see README.md. */
const REPOS = [
  ["apg", "https://github.com/w3c/aria-practices.git"],
  ["wcag22", "https://github.com/w3c/wcag.git"],
  ["carbon", "https://github.com/carbon-design-system/carbon-website.git"],
  ["patternfly", "https://github.com/patternfly/patternfly-org.git"],
  ["govuk", "https://github.com/alphagov/govuk-design-system.git"],
  ["uswds", "https://github.com/uswds/uswds.git"],
]

/** Author-hosted academic PDFs. Fetched for reading, not redistributed. */
const PDFS = [
  ["shneiderman-eyes", "http://www.cs.umd.edu/~ben/papers/Shneiderman1996eyes.pdf"],
  ["cognitive-dimensions", "https://www.cl.cam.ac.uk/~afb21/CognitiveDimensions/CDtutorial.pdf"],
  ["cognitive-dimensions", "https://www.cl.cam.ac.uk/~afb21/publications/BlackwellGreen-CDsChapter.pdf"],
]

const dirFor = (id) => join(CACHE, id)
const run = (cmd, args, cwd) =>
  execFileSync(cmd, args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim()

function syncRepo(id, url) {
  const dir = dirFor(id)

  if (FORCE && existsSync(dir)) {
    run("rm", ["-rf", dir])
  }

  if (existsSync(dir)) {
    // A shallow clone cannot fast-forward across a force-push, so fall back to
    // a fresh clone rather than leaving a half-updated tree behind.
    try {
      run("git", ["fetch", "--depth", "1", "origin", "HEAD"], dir)
      run("git", ["reset", "--hard", "FETCH_HEAD"], dir)
      console.log(`  updated  ${id}`)
    } catch {
      run("rm", ["-rf", dir])
      run("git", ["clone", "--depth", "1", "--quiet", url, dir])
      console.log(`  recloned ${id}`)
    }
  } else {
    run("git", ["clone", "--depth", "1", "--quiet", url, dir])
    console.log(`  cloned   ${id}`)
  }

  return {
    sha: run("git", ["rev-parse", "HEAD"], dir),
    committed: run("git", ["log", "-1", "--format=%cI"], dir).slice(0, 10),
  }
}

function fetchPdf(url) {
  mkdirSync(PDF_DIR, { recursive: true })
  const name = url.split("/").pop()
  const out = join(PDF_DIR, name)

  if (existsSync(out) && !FORCE) {
    console.log(`  cached   ${name}`)
    return name
  }

  run("curl", ["-sSL", "--max-time", "120", "-o", out, url])
  const type = run("file", ["-b", "--mime-type", out])
  if (type !== "application/pdf") {
    throw new Error(`${name} is ${type}, not a PDF — the source may have moved`)
  }
  console.log(`  fetched  ${name}`)
  return name
}

function main() {
  mkdirSync(CACHE, { recursive: true })
  console.log(`Corpus: ${CACHE}${FORCE ? "  (--force)" : ""}\n`)

  console.log("Repositories")
  const resolved = new Map()
  for (const [id, url] of REPOS) {
    try {
      resolved.set(id, syncRepo(id, url))
    } catch (err) {
      console.error(`  FAILED   ${id}: ${err.message.split("\n")[0]}`)
    }
  }

  console.log("\nPDFs")
  for (const [, url] of PDFS) {
    try {
      fetchPdf(url)
    } catch (err) {
      console.error(`  FAILED   ${url}: ${err.message.split("\n")[0]}`)
    }
  }

  const manifest = JSON.parse(readFileSync(MANIFEST, "utf8"))
  const today = new Date().toISOString().slice(0, 10)
  let changed = 0

  for (const source of manifest.sources) {
    const hit = resolved.get(source.id)
    if (!hit) continue
    if (source.sha !== hit.sha) changed++
    source.sha = hit.sha
    source.committed = hit.committed
    source.fetched = today
  }

  manifest.generated = today
  writeFileSync(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`)

  console.log(
    `\nProvenance written to sources.json — ${resolved.size} pinned, ${changed} moved since last run.`
  )
  console.log("Next: node extract.mjs")
}

main()
