// Renders product-ui-voice-and-tone.md into a clean, standalone, readable HTML page.
// Usage: node scripts/render-voice-doc.mjs
import fs from "node:fs"
import path from "node:path"

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..")
const SRC = path.join(ROOT, "research/agent-design-standards/product-ui-voice-and-tone.md")
const OUT = path.join(ROOT, "research/agent-design-standards/product-ui-voice-and-tone.html")

const src = fs.readFileSync(SRC, "utf8")

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
const inline = (s) =>
  esc(s)
    .replace(/&lt;br\s*\/?&gt;/g, "<br>") // honor literal <br> in cells
    .replace(/&amp;lt;/g, "&lt;").replace(/&amp;gt;/g, "&gt;") // keep intended <element> text
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")

const cells = (s) => s.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim())

function md(text) {
  const lines = text.replace(/\r/g, "").split("\n")
  const out = []
  let i = 0
  let listType = null // 'ul' | 'ol' | null
  const closeList = () => { if (listType) { out.push(`</${listType}>`); listType = null } }

  while (i < lines.length) {
    const line = lines[i]

    // GFM table
    if (/^\|/.test(line) && i + 1 < lines.length && /^\|?[\s:|-]+\|/.test(lines[i + 1]) && lines[i + 1].includes("-")) {
      closeList()
      const head = cells(line)
      i += 2
      const rows = []
      while (i < lines.length && /^\|/.test(lines[i])) { rows.push(cells(lines[i])); i++ }
      let t = '<table><thead><tr>' + head.map((h) => "<th>" + inline(h) + "</th>").join("") + "</tr></thead><tbody>"
      rows.forEach((r) => { t += "<tr>" + r.map((c) => "<td>" + inline(c) + "</td>").join("") + "</tr>" })
      t += "</tbody></table>"
      out.push(t)
      continue
    }

    // Blockquote (group consecutive > lines)
    if (/^>\s?/.test(line)) {
      closeList()
      const buf = []
      while (i < lines.length && /^>\s?/.test(lines[i])) { buf.push(inline(lines[i].replace(/^>\s?/, ""))); i++ }
      out.push('<blockquote>' + buf.join("<br>") + "</blockquote>")
      continue
    }

    // Horizontal rule
    if (/^---+\s*$/.test(line)) { closeList(); out.push("<hr>"); i++; continue }

    // Headings
    let m
    if ((m = line.match(/^(#{1,4})\s+(.*)$/))) {
      closeList()
      const lvl = m[1].length
      out.push(`<h${lvl}>${inline(m[2])}</h${lvl}>`)
      i++
      continue
    }

    // Ordered list
    if ((m = line.match(/^\d+\.\s+(.*)$/))) {
      if (listType !== "ol") { closeList(); out.push("<ol>"); listType = "ol" }
      out.push("<li>" + inline(m[1]) + "</li>")
      i++
      continue
    }

    // Unordered list
    if ((m = line.match(/^[-*]\s+(.*)$/))) {
      if (listType !== "ul") { closeList(); out.push("<ul>"); listType = "ul" }
      out.push("<li>" + inline(m[1]) + "</li>")
      i++
      continue
    }

    // Blank
    if (!line.trim()) { closeList(); i++; continue }

    // Paragraph
    closeList()
    out.push("<p>" + inline(line) + "</p>")
    i++
  }
  closeList()
  return out.join("\n")
}

const body = md(src)

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Product UI voice and tone — Databricks</title>
<style>
  :root {
    --fg: #161616; --muted: #5a5a5a; --bg: #ffffff; --page: #f6f7f8;
    --border: #e6e6e6; --rule: #ebebeb; --primary: #2272b4;
    --code-bg: #f2f4f6; --quote-bg: #f0f6fc; --quote-bar: #2272b4;
    --th-bg: #f6f7f8; --zebra: #fbfcfd;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0; background: var(--page); color: var(--fg);
    font: 15px/1.6 -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  .wrap { max-width: 860px; margin: 0 auto; padding: 56px 28px 120px; }
  .sheet {
    background: var(--bg); border: 1px solid var(--border); border-radius: 14px;
    padding: 44px 52px 56px; box-shadow: 0 1px 2px rgba(0,0,0,.04), 0 12px 32px rgba(0,0,0,.05);
  }
  h1 { font-size: 30px; line-height: 1.2; letter-spacing: -.01em; margin: 0 0 8px; font-weight: 700; }
  h2 {
    font-size: 20px; margin: 40px 0 12px; padding-top: 20px; font-weight: 700;
    border-top: 1px solid var(--rule); letter-spacing: -.005em;
  }
  h2:first-of-type { border-top: 0; padding-top: 0; }
  h3 { font-size: 15px; margin: 22px 0 8px; font-weight: 700; color: #2b2b2b; }
  p { margin: 10px 0; }
  a { color: var(--primary); }
  strong { font-weight: 650; }
  code {
    font: 12.5px/1.5 "SF Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    background: var(--code-bg); padding: 1.5px 5px; border-radius: 5px;
  }
  hr { border: 0; border-top: 1px solid var(--rule); margin: 34px 0; }
  blockquote {
    margin: 14px 0; padding: 12px 16px; background: var(--quote-bg);
    border-left: 3px solid var(--quote-bar); border-radius: 0 8px 8px 0;
    color: #253340; font-size: 14px;
  }
  ul, ol { margin: 10px 0; padding-left: 22px; }
  li { margin: 6px 0; }
  table {
    border-collapse: collapse; width: 100%; margin: 14px 0 18px; font-size: 13.5px;
    border: 1px solid var(--border); border-radius: 10px; overflow: hidden;
  }
  thead th {
    background: var(--th-bg); text-align: left; font-weight: 650; color: #2b2b2b;
    padding: 9px 12px; border-bottom: 1px solid var(--border); white-space: nowrap;
  }
  tbody td { padding: 9px 12px; border-bottom: 1px solid var(--rule); vertical-align: top; }
  tbody tr:nth-child(even) { background: var(--zebra); }
  tbody tr:last-child td { border-bottom: 0; }
  td code { white-space: nowrap; }
  @media (max-width: 640px) {
    .sheet { padding: 28px 20px 40px; } .wrap { padding: 24px 12px 80px; }
    table, thead, tbody, th, td, tr { font-size: 12.5px; }
  }
</style>
</head>
<body>
  <div class="wrap">
    <div class="sheet">
${body}
    </div>
  </div>
</body>
</html>`

fs.writeFileSync(OUT, html)
console.log(`Wrote ${OUT} (${(Buffer.byteLength(html) / 1024).toFixed(0)} KB)`)
