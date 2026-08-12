#!/usr/bin/env node
/**
 * Convert the cloned sources into plain markdown under `extracts/`.
 *
 * Only bucket A and A-v are extracted. Bucket B is link-and-restate, so its
 * prose is never written to disk here — see README.md.
 *
 * Every output file carries frontmatter naming the source, the upstream URL, the
 * license and the commit it was read from, so a rule derived from it can cite
 * something specific rather than "Carbon says".
 *
 *   node extract.mjs            extract everything
 *   node extract.mjs carbon apg only those sources
 *
 * No dependencies by design — the repo is deliberately close to zero-dependency,
 * so the MDX and HTML converters below are deliberately small rather than
 * correct in every edge case. They aim for readable prose, not round-tripping.
 */

import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs"
import { homedir } from "node:os"
import { dirname, extname, join, relative } from "node:path"
import { fileURLToPath } from "node:url"

const HERE = dirname(fileURLToPath(import.meta.url))
const CACHE = join(homedir(), ".cache", "dbui-ux-corpus")
const OUT = join(HERE, "extracts")
const manifest = JSON.parse(readFileSync(join(HERE, "sources.json"), "utf8"))
const only = process.argv.slice(2).filter((a) => !a.startsWith("-"))

/* ------------------------------------------------------------------ helpers */

const decode = (s) =>
  s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(+d))
    .replace(/&nbsp;/g, " ")
    .replace(/&mdash;/g, "—")
    .replace(/&amp;/g, "&")

const tidy = (s) =>
  s
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]+$/gm, "")
    .trim()

function walk(dir, test, found = []) {
  if (!existsSync(dir)) return found
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === ".git" || entry === "img" || entry === "images") continue
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) walk(full, test, found)
    else if (test(full)) found.push(full)
  }
  return found
}

/* --------------------------------------------------------------- converters */

/** MDX to markdown: drop the module layer, keep JSX text children. */
function mdxToMarkdown(src) {
  let out = src
    .replace(/^---\n[\s\S]*?\n---\n/, "")
    .replace(/^\s*import\s+[\s\S]*?from\s+["'][^"']+["'];?\s*$/gm, "")
    .replace(/^\s*export\s+(const|default|let|var)\s+[\s\S]*?;\s*$/gm, "")
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")

  // Self-closing components carry no prose; paired ones usually wrap it.
  out = out.replace(/<[A-Z][\w.]*(\s[^>]*?)?\/>/g, "")
  for (let i = 0; i < 6; i++) {
    out = out.replace(/<([A-Z][\w.]*)(\s[^>]*?)?>([\s\S]*?)<\/\1>/g, "$3")
  }
  out = out.replace(/<\/?[A-Z][\w.]*(\s[^>]*?)?>/g, "")

  return tidy(out)
}

/** Minimal HTML to markdown. Good enough for respec-flavoured W3C pages. */
function htmlToMarkdown(src) {
  let out = src
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|nav|head|noscript)\b[\s\S]*?<\/\1>/gi, "")

  const body = out.match(/<body\b[^>]*>([\s\S]*)<\/body>/i)
  if (body) out = body[1]

  out = out
    .replace(/<(h[1-6])\b[^>]*>([\s\S]*?)<\/\1>/gi, (_, h, t) => `\n\n${"#".repeat(+h[1])} ${t.trim()}\n\n`)
    .replace(/<li\b[^>]*>([\s\S]*?)<\/li>/gi, (_, t) => `\n- ${t.trim()}`)
    // WCAG's "In brief" blocks are definition lists. Without this the term runs
    // straight into its definition and reads as one mangled word.
    .replace(/<dt\b[^>]*>([\s\S]*?)<\/dt>/gi, (_, t) => `\n\n**${t.trim()}** — `)
    .replace(/<dd\b[^>]*>([\s\S]*?)<\/dd>/gi, (_, t) => `${t.trim()}\n`)
    .replace(/<\/(ul|ol|table|dl)>/gi, "\n\n")
    .replace(/<(p|div|section|tr)\b[^>]*>/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<(code|kbd)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, t) => `\`${t.trim()}\``)
    .replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, t) => `**${t.trim()}**`)
    .replace(/<(em|i)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, t) => `_${t.trim()}_`)
    .replace(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, (_, href, t) =>
      t.trim() ? `[${t.trim()}](${href})` : ""
    )
    .replace(/<(td|th)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, t) => `${t.trim()} | `)
    .replace(/<[^>]+>/g, "")

  return tidy(decode(out).replace(/^[ \t]+/gm, ""))
}

/* ------------------------------------------------------------------ sources */

/**
 * Each entry says which files to take and what upstream URL they map to, so an
 * extract can always be traced back to a page a person can open.
 */
const PLANS = {
  apg: {
    root: "content/patterns",
    take: (f) => f.endsWith(".html") && !f.includes("/examples/"),
    url: (rel) => `https://www.w3.org/WAI/ARIA/apg/patterns/${rel.split("/")[0]}/`,
    slug: (rel) => rel.split("/")[0],
    convert: htmlToMarkdown,
  },
  wcag22: {
    root: "understanding",
    take: (f) => f.endsWith(".html") && /\/(20|21|22)\//.test(f),
    url: (rel) => `https://www.w3.org/WAI/WCAG22/Understanding/${rel.split("/").pop().replace(/\.html$/, "")}`,
    slug: (rel) => rel.split("/").pop().replace(/\.html$/, ""),
    convert: htmlToMarkdown,
  },
  carbon: {
    root: "src/pages",
    take: (f) => f.endsWith(".mdx"),
    url: (rel) => `https://carbondesignsystem.com/${rel.replace(/\/[^/]+\.mdx$/, "")}/`,
    slug: (rel) => rel.replace(/\.mdx$/, "").replace(/\//g, "--"),
    convert: mdxToMarkdown,
  },
  patternfly: {
    // The docs are markdown under `content/`. The sibling `generated/` tree holds
    // react and html demo code, which is not guidance.
    root: "packages/documentation-site/patternfly-docs/content",
    take: (f) => f.endsWith(".md") || f.endsWith(".mdx"),
    url: (rel) => {
      const parts = rel.replace(/\.(md|mdx)$/, "").split("/")
      // A leaf named after its own folder is that folder's index page.
      if (parts.length > 1 && parts.at(-1) === parts.at(-2)) parts.pop()
      // The `AI/` folder publishes under `patternfly-ai/`, and its index is
      // `about-ai` rather than the folder name.
      if (parts[0] === "AI") {
        parts[0] = "patternfly-ai"
        if (parts.length === 2 && parts[1] === "ai") parts[1] = "about-ai"
        else if (parts.length === 1) parts.push("about-ai")
      }
      return `https://www.patternfly.org/${parts.join("/")}`
    },
    slug: (rel) => rel.replace(/\.(md|mdx)$/, "").replace(/\//g, "--"),
    convert: mdxToMarkdown,
  },
  govuk: {
    root: "src",
    take: (f) => f.endsWith(".md") && /\/(patterns|components|styles|accessibility)\//.test(f),
    url: (rel) => `https://design-system.service.gov.uk/${rel.replace(/\/[^/]+\.md$/, "")}/`,
    slug: (rel) => rel.replace(/\.md$/, "").replace(/\//g, "--"),
    convert: (s) => tidy(s.replace(/^---\n[\s\S]*?\n---\n/, "")),
  },
}

/* --------------------------------------------------------------------- main */

function extract(source) {
  const plan = PLANS[source.id]
  if (!plan) return null

  const base = join(CACHE, source.id, plan.root)
  if (!existsSync(base)) {
    console.log(`  ${source.id}: not cloned — run fetch.mjs first`)
    return null
  }

  const files = walk(base, plan.take)
  const dest = join(OUT, source.id)
  mkdirSync(dest, { recursive: true })

  let written = 0
  let skipped = 0

  for (const file of files) {
    const rel = relative(base, file)
    const body = plan.convert(readFileSync(file, "utf8"))

    // A page that reduces to a heading was a wrapper around components, not prose.
    if (body.replace(/^#.*$/gm, "").trim().length < 200) {
      skipped++
      continue
    }

    const front = [
      "---",
      `source: ${source.id}`,
      `title: ${source.name}`,
      `url: ${plan.url(rel)}`,
      `license: ${source.license}`,
      `bucket: ${source.bucket}`,
      `sha: ${source.sha ?? "unknown"}`,
      `retrieved: ${source.fetched ?? manifest.generated}`,
      "---",
      "",
    ].join("\n")

    writeFileSync(join(dest, `${plan.slug(rel).replace(/[^\w.-]/g, "-")}.md`), front + body + "\n")
    written++
  }

  return { written, skipped, scanned: files.length }
}

function main() {
  mkdirSync(OUT, { recursive: true })
  const targets = manifest.sources.filter(
    (s) => PLANS[s.id] && (only.length === 0 || only.includes(s.id))
  )

  console.log(`Extracting ${targets.length} source(s) to extracts/\n`)
  let total = 0

  for (const source of targets) {
    const result = extract(source)
    if (!result) continue
    total += result.written
    console.log(
      `  ${source.id.padEnd(12)} ${String(result.written).padStart(4)} written` +
        `  ${String(result.skipped).padStart(4)} skipped (too thin)` +
        `  of ${result.scanned}`
    )
  }

  console.log(`\n${total} documents extracted.`)
}

main()
