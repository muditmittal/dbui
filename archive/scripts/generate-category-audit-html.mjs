#!/usr/bin/env node
/**
 * Generate readable HTML report from category-audit.json
 * Run: node scripts/generate-category-audit-html.mjs
 */
import fs from "node:fs"
import path from "node:path"

const ROOT = path.resolve(import.meta.dirname, "..")
const DATA = path.join(ROOT, "research/design-md-corpus/data/category-audit.json")
const OUT = path.join(ROOT, "research/design-md-corpus/CATEGORY-AUDIT.html")

const audit = JSON.parse(fs.readFileSync(DATA, "utf8"))

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")

function bar(pct, tone = "primary") {
  const w = Math.min(100, Math.max(0, pct))
  return `<div class="bar-track"><div class="bar-fill bar-${tone}" style="width:${w}%"></div><span class="bar-label">${pct}%</span></div>`
}

const topicRows = Object.entries(audit.topic_coverage)
  .map(([id, t]) => ({ id, ...t }))
  .sort((a, b) => b.dev_analyst.pct - a.dev_analyst.pct)

const metaRows = Object.entries(audit.meta_category_matrix)
  .map(([name, d]) => ({ name, ...d }))
  .sort((a, b) => b.count - a.count)

const dbGuidelines = [
  {
    n: 1,
    cat: "Visual theme",
    peers: "Narrative cold open + 5–8 key characteristics",
    dbui: "Two-layer shell story; signature move: 13px · DuBois blue · shell-first · sentence case",
    pri: "High",
  },
  {
    n: 2,
    cat: "Color",
    peers: "Role tables with hex; agentic adds light/dark columns",
    dbui: "4-col table (role · Tailwind · var · hex); one chromatic accent; ai-gradient for Genie only",
    pri: "High",
  },
  {
    n: 3,
    cat: "Typography",
    peers: "Hierarchy table; 2–3 weights with fixed roles",
    dbui: "Display / Text / Mono; 400+600 only; 13px base; sentence case",
    pri: "High",
  },
  {
    n: 4,
    cat: "Components",
    peers: "Prose + variant names",
    dbui: "Pointer to component-index.md; no raw HTML; CVA + Base UI render prop",
    pri: "Medium",
  },
  {
    n: 5,
    cat: "Layout",
    peers: "8px grid; sidebar + content patterns",
    dbui: "Always Base shell; compositions A–E; four spacing tiers",
    pri: "High",
  },
  {
    n: 6,
    cat: "Depth",
    peers: "Shadow tier table stated as non-negotiable",
    dbui: "xs on controls · md on popovers · lg on dialogs · focus rules per variant",
    pri: "High",
  },
  {
    n: 7,
    cat: "Motion",
    peers: "Low priority in dev/analyst cohort (25%)",
    dbui: "Minimal; hover/press tokens only; 150–200ms on overlays",
    pri: "Low",
  },
  {
    n: 8,
    cat: "Responsive",
    peers: "Breakpoint tables for nav/rail collapse",
    dbui: "Base shell breakpoint table; tables scroll; tree → drawer",
    pri: "Medium",
  },
  {
    n: 9,
    cat: "Voice",
    peers: "Rare in dev tools (8%)",
    dbui: "Pointer to brandvoice.md; restate bans in §9",
    pri: "Low",
  },
  {
    n: 10,
    cat: "Do's / Don'ts",
    peers: "Paired bullets + wrong-fit clusters",
    dbui: "anti-slop.md; wrong-cohort redirect (no automotive/fintech marketing)",
    pri: "High",
  },
  {
    n: 11,
    cat: "Accessibility",
    peers: "Corpus gap (~0% dedicated sections)",
    dbui: "Focus rings, contrast pairs, border-only validation — DBUI differentiator",
    pri: "High",
  },
  {
    n: 12,
    cat: "Iconography",
    peers: "Corpus gap (0%)",
    dbui: "icon-index.csv mandatory; 451 monoline icons — DBUI differentiator",
    pri: "High",
  },
  {
    n: 13,
    cat: "Data viz",
    peers: "Corpus gap (0%)",
    dbui: "chart tokens; dense tables; Status/Badge — Databricks differentiator",
    pri: "High",
  },
  {
    n: 14,
    cat: "Agent prompt guide",
    peers: "83% dev/analyst; hex ref + prompts + checklist",
    dbui: "§9 centerpiece: color table, 8 non-negotiables, 5–8 example prompts",
    pri: "Critical",
  },
]

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>DESIGN.md Category Audit — Databricks / DBUI</title>
<style>
:root {
  --bg: #f6f6f6; --surface: #fff; --fg: #161616; --muted: #6f6f6f;
  --border: #ebebeb; --primary: #2272b4; --primary-soft: #ebf5ff;
  --success: #277c43; --success-soft: #dff5e6; --warning: #be501e;
  --radius: 8px; --font: -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif;
  --display: "SF Pro Display", -apple-system, sans-serif;
}
* { box-sizing: border-box; }
body { margin: 0; font: 13px/20px var(--font); color: var(--fg); background: var(--bg); }
.layout { display: grid; grid-template-columns: 220px 1fr; max-width: 1280px; margin: 0 auto; min-height: 100vh; }
nav { position: sticky; top: 0; height: 100vh; overflow-y: auto; padding: 20px 14px; background: var(--bg); border-right: 1px solid var(--border); }
nav h2 { font: 600 11px/16px var(--display); text-transform: uppercase; letter-spacing: .04em; color: var(--muted); margin: 0 0 10px; }
nav a { display: block; padding: 6px 8px; color: var(--fg); text-decoration: none; border-radius: 4px; font-size: 12px; }
nav a:hover { background: rgba(34,114,180,.08); }
main { padding: 32px 40px 64px; background: var(--surface); }
h1 { font: 600 28px/36px var(--display); margin: 0 0 8px; }
.subtitle { color: var(--muted); margin: 0 0 24px; max-width: 62ch; }
.badges { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 28px; }
.badge { font-size: 11px; padding: 2px 8px; border-radius: 999px; border: 1px solid var(--border); background: var(--bg); }
.badge.primary { background: var(--primary-soft); border-color: #b8d9f5; color: #1a5a8a; }
.cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 24px 0 32px; }
.card { border: 1px solid var(--border); border-radius: var(--radius); padding: 16px; background: var(--bg); }
.card .num { font: 600 32px/1 var(--display); color: var(--primary); }
.card .label { font-size: 12px; color: var(--muted); margin-top: 4px; }
section { margin: 40px 0; scroll-margin-top: 24px; }
h2 { font: 600 20px/28px var(--display); margin: 0 0 12px; padding-bottom: 8px; border-bottom: 1px solid var(--border); }
h3 { font: 600 15px/22px var(--display); margin: 24px 0 8px; }
p { margin: 0 0 12px; max-width: 72ch; }
.callout { background: var(--primary-soft); border: 1px solid #b8d9f5; border-radius: var(--radius); padding: 16px 18px; margin: 16px 0; }
.callout strong { display: block; margin-bottom: 4px; }
table { width: 100%; border-collapse: collapse; font-size: 12px; margin: 12px 0 20px; }
th, td { border: 1px solid var(--border); padding: 8px 10px; text-align: left; vertical-align: top; }
th { background: var(--bg); font-weight: 600; }
td.num { text-align: right; font-variant-numeric: tabular-nums; }
.tag-dev { background: var(--success-soft); color: var(--success); padding: 1px 6px; border-radius: 4px; font-size: 11px; }
.tag-other { background: var(--bg); color: var(--muted); padding: 1px 6px; border-radius: 4px; font-size: 11px; }
.tag-crit { background: #fde4e9; color: #9b1c3a; padding: 1px 6px; border-radius: 4px; font-size: 11px; font-weight: 600; }
.tag-high { background: var(--primary-soft); color: #1a5a8a; padding: 1px 6px; border-radius: 4px; font-size: 11px; }
.bar-track { position: relative; background: var(--bg); border-radius: 4px; height: 22px; min-width: 120px; }
.bar-fill { height: 100%; border-radius: 4px; }
.bar-primary { background: var(--primary); opacity: .85; }
.bar-muted { background: #c4c4c4; }
.bar-label { position: absolute; right: 6px; top: 2px; font-size: 11px; font-weight: 600; color: var(--fg); }
.chips { display: flex; flex-wrap: wrap; gap: 6px; margin: 8px 0 16px; }
.chip { font-size: 11px; padding: 3px 8px; background: var(--bg); border: 1px solid var(--border); border-radius: 4px; }
ul.clean { margin: 8px 0 16px; padding-left: 18px; max-width: 72ch; }
ul.clean li { margin-bottom: 6px; }
@media (max-width: 900px) {
  .layout { grid-template-columns: 1fr; }
  nav { position: static; height: auto; border-right: none; border-bottom: 1px solid var(--border); }
  .cards { grid-template-columns: 1fr; }
}
@media print { nav { display: none; } .layout { grid-template-columns: 1fr; } main { padding: 20px; } }
</style>
</head>
<body>
<div class="layout">
<nav>
  <h2>Contents</h2>
  <a href="#summary">Summary</a>
  <a href="#lenses">Three lenses</a>
  <a href="#metadata">Metadata categories</a>
  <a href="#topics">Content topics</a>
  <a href="#dev">Dev / analyst</a>
  <a href="#agentic">Agentic-first</a>
  <a href="#databricks">Databricks guidelines</a>
  <a href="#files">File plan</a>
</nav>
<main>
  <h1>DESIGN.md category audit</h1>
  <p class="subtitle">What 151 peer design systems document — and what Databricks (DBUI) should adopt. Generated ${esc(audit.generated_at.slice(0, 10))}.</p>
  <div class="badges">
    <span class="badge primary">n=${audit.package_count} packages</span>
    <span class="badge">52 dev / analyst</span>
    <span class="badge">20 agentic-first</span>
    <span class="badge">14 content topics</span>
  </div>

  <section id="summary">
    <h2>At a glance</h2>
    <div class="cards">
      <div class="card"><div class="num">83%</div><div class="label">Dev/analyst systems with Agent Prompt Guide</div></div>
      <div class="card"><div class="num">0%</div><div class="label">Corpus with data-viz or iconography sections</div></div>
      <div class="card"><div class="num">14</div><div class="label">Content categories to codify in DBUI_DESIGN.md</div></div>
    </div>
    <div class="callout">
      <strong>Proposed Databricks metadata category</strong>
      Enterprise B2B · Data &amp; AI Platform · Light-first workbench UI
    </div>
    <p><strong>Two category layers matter.</strong> <em>Metadata categories</em> tag the product (AI &amp; LLM, Developer Tools…). <em>Content topics</em> are the sections inside each DESIGN.md (Color, Typography, Agent Prompt Guide…). DBUI needs both.</p>
  </section>

  <section id="lenses">
    <h2>Three lenses</h2>
    <table>
      <thead><tr><th>Lens</th><th class="num">n</th><th>Use for DBUI</th></tr></thead>
      <tbody>
        <tr><td><strong>All systems</strong></td><td class="num">151</td><td>Full taxonomy — know what to ignore (automotive, style presets)</td></tr>
        <tr><td><strong>Dev / analyst</strong></td><td class="num">52</td><td>Primary reference — Vercel, Linear, ClickHouse, Notion, Supabase</td></tr>
        <tr><td><strong>Agentic-first</strong></td><td class="num">20</td><td>Genie / agent surfaces — Cursor, Lovable, Claude, VoltAgent</td></tr>
      </tbody>
    </table>
    <p><em>Vercel &amp; Linear → dev/analyst only. Cursor &amp; Lovable → both dev/analyst and agentic.</em></p>
  </section>

  <section id="metadata">
    <h2>Metadata categories (product domain)</h2>
    <p>How Open Design groups products. Compare DBUI to rows marked <span class="tag-dev">dev</span>.</p>
    <table>
      <thead><tr><th>Category</th><th class="num">n</th><th>Type</th><th class="num">§9 Agent</th><th class="num">Don'ts</th></tr></thead>
      <tbody>
        ${metaRows
          .slice(0, 14)
          .map(
            (r) => `<tr>
          <td>${esc(r.name)}</td>
          <td class="num">${r.count}</td>
          <td><span class="tag-${r.cohort === "dev_analyst" ? "dev" : "other"}">${r.cohort === "dev_analyst" ? "dev" : "other"}</span></td>
          <td class="num">${r.topics.agent_guide?.pct ?? 0}%</td>
          <td class="num">${r.topics.donts?.pct ?? 0}%</td>
        </tr>`
          )
          .join("")}
      </tbody>
    </table>
    <h3>Ignore as DBUI comparables</h3>
    <div class="chips">
      <span class="chip">Automotive</span><span class="chip">Fintech consumer</span><span class="chip">E-Commerce</span>
      <span class="chip">Media &amp; Consumer</span><span class="chip">Bold &amp; Expressive</span><span class="chip">Style presets</span>
    </div>
  </section>

  <section id="topics">
    <h2>Content topics (doc sections)</h2>
    <p>What agents actually read inside each DESIGN.md. Bars show <strong>dev/analyst</strong> coverage.</p>
    <table>
      <thead><tr><th>Topic</th><th class="num">All</th><th>Dev/analyst</th><th class="num">Agentic</th><th>Notes</th></tr></thead>
      <tbody>
        ${topicRows
          .map((t) => {
            const note =
              t.id === "agent_guide"
                ? "Must-have for agents"
                : t.id === "data_viz" || t.id === "iconography"
                  ? "DBUI differentiator"
                  : t.id === "motion" || t.id === "voice"
                    ? "Deprioritize"
                    : t.dev_analyst.pct >= 90
                      ? "Table stakes"
                      : ""
            const tone = t.dev_analyst.pct >= 75 ? "primary" : "muted"
            return `<tr>
          <td>${esc(t.label)}</td>
          <td class="num">${t.all.pct}%</td>
          <td>${bar(t.dev_analyst.pct, tone)}</td>
          <td class="num">${t.agentic_first.pct}%</td>
          <td>${esc(note)}</td>
        </tr>`
          })
          .join("")}
      </tbody>
    </table>
  </section>

  <section id="dev">
    <h2>Dev / analyst cohort</h2>
    <p><strong>52 systems</strong> across AI &amp; LLM · Developer Tools · Productivity &amp; SaaS · Backend &amp; Data · Design &amp; Creative.</p>
    <table>
      <thead><tr><th>Sub-cohort</th><th class="num">n</th><th>Exemplars</th></tr></thead>
      <tbody>
        <tr><td>AI &amp; LLM</td><td class="num">15</td><td>claude, cohere, perplexity</td></tr>
        <tr><td>Developer Tools</td><td class="num">9</td><td><strong>cursor</strong>, <strong>vercel</strong>, lovable, raycast</td></tr>
        <tr><td>Productivity &amp; SaaS</td><td class="num">12</td><td><strong>linear-app</strong>, notion, cal, resend</td></tr>
        <tr><td>Backend &amp; Data</td><td class="num">9</td><td><strong>clickhouse</strong>, supabase, sentry, hashicorp</td></tr>
        <tr><td>Design &amp; Creative</td><td class="num">7</td><td>figma, framer, airtable</td></tr>
      </tbody>
    </table>
    <h3>Recurring patterns</h3>
    <ul class="clean">
      <li>One chromatic accent for primary actions only</li>
      <li>Typography hierarchy table (role → size → weight → line-height)</li>
      <li>Explicit depth mechanism (borders or shadows — pick one, state it)</li>
      <li>Sidebar + content two-layer layout</li>
      <li>13–16px body text for workbench UI</li>
    </ul>
  </section>

  <section id="agentic">
    <h2>Agentic-first cohort</h2>
    <p><strong>20 systems</strong> where the AI agent is the product.</p>
    <div class="chips">${audit.cohorts.agentic_first.slugs.map((s) => `<span class="chip">${esc(s)}</span>`).join("")}</div>
    <h3>What agentic systems add</h3>
    <ul class="clean">
      <li>§9 opens with <strong>literal hex</strong> quick-reference (not Tailwind alone)</li>
      <li>5–8 <strong>copy-paste prompts</strong> for page archetypes</li>
      <li><strong>8–10 non-negotiables</strong> + iteration checklist</li>
      <li>"Focus on one component at a time" — avoid whole-page drift</li>
      <li>Forbid off-palette colors when a token exists</li>
    </ul>
  </section>

  <section id="databricks">
    <h2>Databricks guidelines by category</h2>
    <p>One row per content topic — what to codify in <code>packages/dbui/DBUI_DESIGN.md</code>.</p>
    <table>
      <thead><tr><th class="num">#</th><th>Category</th><th>What peers do</th><th>What DBUI should do</th><th>Priority</th></tr></thead>
      <tbody>
        ${dbGuidelines
          .map((g) => {
            const priClass = g.pri === "Critical" ? "tag-crit" : g.pri === "High" ? "tag-high" : "tag-other"
            return `<tr>
          <td class="num">${g.n}</td>
          <td><strong>${esc(g.cat)}</strong></td>
          <td>${esc(g.peers)}</td>
          <td>${esc(g.dbui)}</td>
          <td><span class="${priClass}">${g.pri}</span></td>
        </tr>`
          })
          .join("")}
      </tbody>
    </table>
  </section>

  <section id="files">
    <h2>Recommended file plan</h2>
    <table>
      <thead><tr><th>File</th><th>Role</th></tr></thead>
      <tbody>
        <tr><td><code>DBUI_DESIGN.md</code></td><td>Visual language — all 14 topics (~350 lines)</td></tr>
        <tr><td><code>CLAUDE.md</code></td><td>Operational rules, Figma MCP, lint</td></tr>
        <tr><td><code>component-index.md</code></td><td>§4 component catalog pointer</td></tr>
        <tr><td><code>icon-index.csv</code></td><td>§12 icon lookup pointer</td></tr>
        <tr><td><code>composition.md</code></td><td>§5 shell patterns pointer</td></tr>
        <tr><td><code>brandvoice.md</code></td><td>§9 copy rules pointer</td></tr>
      </tbody>
    </table>
    <p style="color:var(--muted);font-size:11px;margin-top:32px">Data: category-audit.json · Regenerate: node scripts/design-md-category-audit.mjs && node scripts/generate-category-audit-html.mjs</p>
  </section>
</main>
</div>
</body>
</html>`

fs.writeFileSync(OUT, html)
console.log(`Wrote ${OUT}`)
