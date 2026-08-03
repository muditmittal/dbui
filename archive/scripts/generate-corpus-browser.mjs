#!/usr/bin/env node
/**
 * Generate browsable local HTML: source index + patterns analysis.
 * Run: node scripts/generate-corpus-browser.mjs
 */
import fs from "node:fs"
import path from "node:path"

const ROOT = path.resolve(import.meta.dirname, "..")
const CORPUS = process.env.CORPUS_ROOT || path.resolve(process.env.HOME || "", "open-design/design-systems")
const OUT = path.join(ROOT, "research/design-md-corpus")
const AUDIT = path.join(OUT, "data/category-audit.json")

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")

function fileUrl(absPath) {
  return "file://" + absPath.split(path.sep).join("/")
}

function readJson(p) {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"))
  } catch {
    return null
  }
}

function walkPackages() {
  const pkgs = []
  for (const slug of fs.readdirSync(CORPUS)) {
    if (slug.startsWith("_")) continue
    const dir = path.join(CORPUS, slug)
    if (!fs.statSync(dir).isDirectory()) continue
    const design = path.join(dir, "DESIGN.md")
    if (!fs.existsSync(design)) continue
    const manifest = readJson(path.join(dir, "manifest.json"))
    const md = fs.readFileSync(design, "utf8")
    const files = ["DESIGN.md"]
    for (const f of ["tokens.css", "USAGE.md", "manifest.json", "components.html", "design-tokens.json"]) {
      if (fs.existsSync(path.join(dir, f))) files.push(f)
    }
    pkgs.push({
      slug,
      name: manifest?.name || slug,
      category: manifest?.category || "Uncategorized",
      description: manifest?.description || "",
      dir,
      files,
      lines: md.split("\n").length,
      md,
    })
  }
  return pkgs.sort((a, b) => a.slug.localeCompare(b.slug))
}

const packages = walkPackages()
const audit = fs.existsSync(AUDIT) ? readJson(AUDIT) : null

// Group by category
const byCategory = {}
for (const p of packages) {
  if (!byCategory[p.category]) byCategory[p.category] = []
  byCategory[p.category].push(p)
}
for (const cat of Object.keys(byCategory)) {
  byCategory[cat].sort((a, b) => a.slug.localeCompare(b.slug))
}

const DEV_CATS = new Set([
  "AI & LLM",
  "Developer Tools",
  "Productivity & SaaS",
  "Backend & Data",
  "Design & Creative",
])

const categoryOrder = [
  ...[...DEV_CATS].filter((c) => byCategory[c]),
  ...Object.keys(byCategory)
    .filter((c) => !DEV_CATS.has(c))
    .sort((a, b) => byCategory[b].length - byCategory[a].length),
]

const SHARED_CSS = `
  body { font-family: system-ui, sans-serif; font-size: 14px; line-height: 1.5; max-width: 960px; margin: 0 auto; padding: 24px 20px 48px; color: #161616; background: #fafafa; }
  h1 { font-size: 22px; margin: 0 0 4px; }
  h2 { font-size: 17px; margin: 28px 0 10px; padding-bottom: 6px; border-bottom: 1px solid #ddd; }
  h3 { font-size: 14px; margin: 20px 0 8px; color: #333; }
  p, li { max-width: 72ch; }
  a { color: #2272b4; }
  a:hover { text-decoration: underline; }
  .nav { background: #fff; border: 1px solid #ddd; border-radius: 8px; padding: 12px 16px; margin: 16px 0 24px; }
  .nav a { margin-right: 16px; font-weight: 600; }
  .muted { color: #666; font-size: 12px; }
  .badge { display: inline-block; font-size: 11px; padding: 2px 8px; border-radius: 999px; background: #ebf5ff; color: #1a5a8a; margin-left: 6px; }
  .badge.other { background: #f0f0f0; color: #555; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; margin: 10px 0 20px; background: #fff; }
  th, td { border: 1px solid #ddd; padding: 8px 10px; text-align: left; vertical-align: top; }
  th { background: #f6f6f6; font-weight: 600; }
  .pkg { margin-bottom: 10px; padding: 10px 12px; background: #fff; border: 1px solid #e8e8e8; border-radius: 6px; }
  .pkg-name { font-weight: 600; }
  .file-links a { font-size: 12px; margin-right: 12px; }
  .toc { columns: 2; font-size: 13px; margin: 8px 0 16px; }
  .toc a { display: block; margin-bottom: 4px; }
  .pattern { background: #fff; border: 1px solid #e8e8e8; border-radius: 6px; padding: 14px 16px; margin: 12px 0; }
  .pattern h3 { margin-top: 0; }
  .stat-row { display: flex; gap: 12px; flex-wrap: wrap; margin: 16px 0; }
  .stat { background: #fff; border: 1px solid #ddd; border-radius: 8px; padding: 12px 16px; min-width: 120px; }
  .stat .n { font-size: 24px; font-weight: 700; color: #2272b4; }
  .stat .l { font-size: 11px; color: #666; }
`

// ── SOURCE INDEX ──────────────────────────────────────────────
let indexBody = ""
indexBody += `<div class="nav"><a href="source-index.html">Source index</a><a href="patterns.html">Patterns analysis</a></div>`
indexBody += `<h1>DESIGN.md source index</h1>`
indexBody += `<p class="muted">${packages.length} packages · local files on disk · corpus: <code>${esc(CORPUS)}</code></p>`
indexBody += `<p>Click a link to open the file in your editor or browser. All links are <code>file://</code> — no network, no login.</p>`

indexBody += `<h2>Jump to category</h2><div class="toc">`
for (const cat of categoryOrder) {
  const id = cat.replace(/[^a-z0-9]+/gi, "-").toLowerCase()
  indexBody += `<a href="#${id}">${esc(cat)} (${byCategory[cat].length})</a>`
}
indexBody += `</div>`

for (const cat of categoryOrder) {
  const id = cat.replace(/[^a-z0-9]+/gi, "-").toLowerCase()
  const isDev = DEV_CATS.has(cat)
  indexBody += `<h2 id="${id}">${esc(cat)} <span class="badge${isDev ? "" : " other"}">${isDev ? "dev / analyst" : "other"}</span></h2>`
  indexBody += `<table><thead><tr><th>System</th><th>Files to open</th><th>Lines</th></tr></thead><tbody>`
  for (const p of byCategory[cat]) {
    const links = p.files
      .map((f) => `<a href="${fileUrl(path.join(p.dir, f))}">${esc(f)}</a>`)
      .join(" · ")
    indexBody += `<tr>
      <td><span class="pkg-name">${esc(p.name)}</span><br><span class="muted">${esc(p.slug)}</span></td>
      <td class="file-links">${links}</td>
      <td>${p.lines}</td>
    </tr>`
  }
  indexBody += `</tbody></table>`
}

indexBody += `<h2>Folder shortcuts</h2><ul>`
indexBody += `<li><a href="${fileUrl(CORPUS)}">Open entire corpus folder</a></li>`
indexBody += `<li>Clone/update: <code>git clone https://github.com/nexu-io/open-design.git ~/open-design</code></li>`
indexBody += `</ul>`

const indexHtml = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>DESIGN.md Source Index</title><style>${SHARED_CSS}</style></head><body>${indexBody}</body></html>`
fs.writeFileSync(path.join(OUT, "source-index.html"), indexHtml)

// ── PATTERNS ANALYSIS ───────────────────────────────────────
const topicCoverage = audit?.topic_coverage || {}
const topicRows = Object.entries(topicCoverage).map(([id, t]) => ({ id, ...t }))

const avgLines = Math.round(packages.reduce((s, p) => s + p.lines, 0) / packages.length)
const medianLines = packages.map((p) => p.lines).sort((a, b) => a - b)[Math.floor(packages.length / 2)]
const withAgentGuide = packages.filter((p) => /agent prompt guide/i.test(p.md)).length
const withNumbered = packages.filter((p) => (p.md.match(/^##\s+\d+\./gm) || []).length >= 7).length
const withNever = packages.filter((p) => /\bnever\b/i.test(p.md)).length

let patBody = ""
patBody += `<div class="nav"><a href="source-index.html">Source index</a><a href="patterns.html">Patterns analysis</a></div>`
patBody += `<h1>Common patterns across DESIGN.md files</h1>`
patBody += `<p class="muted">Analysis of ${packages.length} systems · ${new Date().toISOString().slice(0, 10)}</p>`

patBody += `<div class="stat-row">
  <div class="stat"><div class="n">${packages.length}</div><div class="l">packages</div></div>
  <div class="stat"><div class="n">${medianLines}</div><div class="l">median lines</div></div>
  <div class="stat"><div class="n">${Math.round((withAgentGuide / packages.length) * 100)}%</div><div class="l">have agent guide</div></div>
  <div class="stat"><div class="n">${Math.round((withNumbered / packages.length) * 100)}%</div><div class="l">numbered §1–9 shape</div></div>
</div>`

patBody += `<h2>1. Document structure</h2>`
patBody += `<div class="pattern"><h3>The canonical 9-section shape</h3>
<p>Most product-inspired systems use numbered sections:</p>
<ol>
  <li>Visual theme &amp; atmosphere</li>
  <li>Color palette &amp; roles</li>
  <li>Typography rules</li>
  <li>Component stylings</li>
  <li>Layout principles</li>
  <li>Depth &amp; elevation</li>
  <li>Do's and don'ts</li>
  <li>Responsive behavior</li>
  <li>Agent prompt guide</li>
</ol>
<p><strong>${withNumbered}</strong> of ${packages.length} files (${Math.round((withNumbered / packages.length) * 100)}%) use 7+ numbered <code>## N.</code> sections. Style-preset systems (neon, brutalism…) often use a shorter 7-section guardrail format instead.</p>
</div>`

patBody += `<h2>2. Section coverage (all systems)</h2>`
patBody += `<table><thead><tr><th>Topic</th><th>All</th><th>Dev/analyst</th><th>Agentic</th><th>Pattern</th></tr></thead><tbody>`
const patternNotes = {
  visual_theme: "Opens with narrative metaphor + key characteristics bullets",
  color: "Role-based tables: surface, ink, accent, semantic, border",
  typography: "Hierarchy table: role → size → weight → line-height → tracking",
  components: "Prose describing buttons, inputs, cards, nav patterns",
  layout: "8px grid, max-width, sidebar + content split",
  depth: "Shadow tier table or border-as-depth rule",
  motion: "Durations and easings — heavy in consumer, light in dev tools",
  responsive: "Breakpoint table for nav collapse",
  voice: "Copy tone — common in consumer, rare in dev tools",
  donts: "Paired do/don't bullets or usage guardrails",
  accessibility: "Rare as dedicated section (corpus gap)",
  iconography: "Almost never a dedicated section",
  data_viz: "Almost never a dedicated section",
  agent_guide: "Hex quick-ref + example prompts + non-negotiables",
}
for (const t of topicRows.sort((a, b) => b.all.pct - a.all.pct)) {
  patBody += `<tr>
    <td>${esc(t.label)}</td>
    <td>${t.all.pct}%</td>
    <td>${t.dev_analyst?.pct ?? "—"}%</td>
    <td>${t.agentic_first?.pct ?? "—"}%</td>
    <td class="muted">${esc(patternNotes[t.id] || "")}</td>
  </tr>`
}
patBody += `</tbody></table>`

patBody += `<h2>3. Twelve recurring patterns</h2>`

const patterns = [
  {
    title: "Narrative cold open (§1)",
    text: "First paragraph reads like art direction — metaphor, dominant color, principle. Not a bullet list first.",
    example: "Linear: 'darkness as the native medium' · Vercel: 'gallery-like emptiness'",
  },
  {
    title: "Quick color reference at top of §9",
    text: "Agent guides lead with literal hex mapped to roles (Primary CTA: #5e6ad2). Tailwind names come second.",
    example: "Present in ~85–90% of dev-friendly systems with §9",
  },
  {
    title: "Example component prompts",
    text: "5–6 copy-paste strings the user can feed another agent. Imperative voice.",
    example: "'Build a hero section on white background…'",
  },
  {
    title: "Non-negotiables / iteration guide",
    text: "Numbered list of 5–10 rules. Word 'never' appears ~2× per file on average; 'non-negotiable' in ~10% of agent guides.",
    example: "Linear: font-feature-settings cv01 ss03 is non-negotiable",
  },
  {
    title: "One chromatic accent",
    text: "Achromatic surfaces + single brand color for primary actions. Status colors only where meaning demands.",
    example: "DuBois blue for DBUI; Linear indigo; Vercel near-black CTA",
  },
  {
    title: "Three font weights, three roles",
    text: "Most dev systems declare exactly 2–3 weights mapped to body / label / display.",
    example: "DBUI: 400 read + 600 semibold",
  },
  {
    title: "Typography hierarchy table",
    text: "10-row table is the norm for product systems. Display sizes get negative letter-spacing formulas.",
    example: "13–16px body for dev tools",
  },
  {
    title: "Explicit depth mechanism",
    text: "State borders OR shadows as the system — forbid mixing metaphors.",
    example: "Vercel: shadow-as-border; DBUI: real borders + quiet shadows",
  },
  {
    title: "Sidebar + content two-layer layout",
    text: "Platform chrome (muted) wrapping white/near-white content surface.",
    example: "Matches DBUI Base shell pattern",
  },
  {
    title: "Do / Don't paired anti-patterns",
    text: "Explicit failure modes: 'don't use indigo', 'don't use emoji as icons', 'don't use left-border status cards'.",
    example: "Open Design craft/anti-ai-slop.md distills universal tells",
  },
  {
    title: "Table-heavy, prescriptive prose",
    text: "Dev/analyst files average ~28 table rows vs ~18 for full corpus. Agents need lookup tables, not essays.",
    example: "Mintlify, ClickHouse, HashiCorp are table-dense",
  },
  {
    title: "Package enrichment (Open Design 2.0)",
    text: "Each system now ships manifest.json + DESIGN.md + tokens.css + components.html + preview pages.",
    example: "Browse tokens.css alongside prose for machine-readable values",
  },
]

for (const p of patterns) {
  patBody += `<div class="pattern"><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p><p class="muted">${esc(p.example)}</p></div>`
}

patBody += `<h2>4. Dev/analyst vs consumer split</h2>`
patBody += `<table><thead><tr><th>Emphasis</th><th>Dev / analyst (52)</th><th>Consumer / style (99)</th></tr></thead><tbody>
<tr><td>Agent prompt guide</td><td><strong>83%</strong></td><td>39%</td></tr>
<tr><td>Do's and don'ts</td><td><strong>92%</strong></td><td>~95% (but different content)</td></tr>
<tr><td>Depth &amp; elevation</td><td><strong>79%</strong></td><td>~50%</td></tr>
<tr><td>Motion / animation</td><td>25%</td><td><strong>85%</strong></td></tr>
<tr><td>Voice &amp; tone narrative</td><td>8%</td><td><strong>88%</strong></td></tr>
</tbody></table>
<p>Dev systems tell agents <em>which hex, which weight, which radius</em>. Consumer systems tell models <em>what the brand feels like</em>.</p>`

patBody += `<h2>5. Corpus gaps (opportunities)</h2>`
patBody += `<ul>
  <li><strong>Iconography</strong> — 0% dedicated sections; DBUI has 451 icons + index</li>
  <li><strong>Data visualization</strong> — 0% dedicated sections; natural fit for Databricks</li>
  <li><strong>Accessibility</strong> — ~0% dedicated sections; DBUI has focus-ring spec</li>
  <li><strong>Shell / page compositions</strong> — rare as explicit category; DBUI has Base + A–E shells</li>
</ul>`

patBody += `<h2>6. Anti-patterns (common warnings)</h2>`
patBody += `<table><thead><tr><th>AI tell</th><th>What corpus says</th></tr></thead><tbody>
<tr><td>Default Tailwind indigo/violet accent</td><td>Textbook AI slop — use brand primary instead</td></tr>
<tr><td>Two-stop purple→blue gradient heroes</td><td>Flat surface + intentional type beats this</td></tr>
<tr><td>Emoji as feature icons</td><td>Use monoline SVG with currentColor</td></tr>
<tr><td>Colored left-border dashboard tiles</td><td>Only sanctioned in Status/Alert components</td></tr>
<tr><td>Invented metrics (10× faster)</td><td>Use real data or labeled placeholders</td></tr>
<tr><td>text-sm / font-medium defaults</td><td>Wrong for systems with 13px semibold base</td></tr>
</tbody></table>`

const patHtml = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>DESIGN.md Patterns Analysis</title><style>${SHARED_CSS}</style></head><body>${patBody}</body></html>`
fs.writeFileSync(path.join(OUT, "patterns.html"), patHtml)

console.log(`Wrote ${path.join(OUT, "source-index.html")} (${packages.length} packages)`)
console.log(`Wrote ${path.join(OUT, "patterns.html")}`)
