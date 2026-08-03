// Converts product-ui-voice-and-tone.md into a .docx (Word/Google Docs) file.
// No external dependencies — emits OOXML and zips it with the system `zip`.
// Usage: node scripts/md-to-docx.mjs
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { execFileSync } from "node:child_process"

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..")
const SRC = path.join(ROOT, "research/agent-design-standards/product-ui-voice-and-tone.md")
const OUT = path.join(ROOT, "research/agent-design-standards/product-ui-voice-and-tone.docx")

const md = fs.readFileSync(SRC, "utf8").replace(/\r/g, "")

// ---- inline handling -------------------------------------------------------
const xml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
// decode HTML entities to literal chars; convert literal <br> to a sentinel
const decode = (s) =>
  s.replace(/<br\s*\/?>/g, "\u0001").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")

function runs(text, forceBold) {
  const s = decode(text)
  const parts = s.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/)
  let out = ""
  for (const p of parts) {
    if (!p) continue
    let b = !!forceBold, it = false, code = false, inner = p
    if (/^\*\*[^*]+\*\*$/.test(p)) { b = true; inner = p.slice(2, -2) }
    else if (/^`[^`]+`$/.test(p)) { code = true; inner = p.slice(1, -1) }
    else if (/^\*[^*]+\*$/.test(p)) { it = true; inner = p.slice(1, -1) }
    const segs = inner.split("\u0001")
    segs.forEach((seg, idx) => {
      if (idx > 0) out += "<w:r><w:br/></w:r>"
      if (seg === "") return
      let rpr = ""
      if (b) rpr += "<w:b/>"
      if (it) rpr += "<w:i/>"
      if (code) rpr += '<w:rFonts w:ascii="Consolas" w:hAnsi="Consolas"/><w:shd w:val="clear" w:color="auto" w:fill="F2F4F6"/>'
      out += `<w:r>${rpr ? `<w:rPr>${rpr}</w:rPr>` : ""}<w:t xml:space="preserve">${xml(seg)}</w:t></w:r>`
    })
  }
  return out || '<w:r><w:t xml:space="preserve"></w:t></w:r>'
}

const para = (rxml, ppr = "") => `<w:p>${ppr ? `<w:pPr>${ppr}</w:pPr>` : ""}${rxml}</w:p>`
const cellsOf = (s) => s.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim())

function table(head, rows) {
  const n = head.length
  const w = Math.floor(9360 / n)
  const borders =
    "<w:tblBorders>" +
    ["top", "left", "bottom", "right", "insideH", "insideV"]
      .map((s) => `<w:${s} w:val="single" w:sz="4" w:space="0" w:color="D9D9D9"/>`)
      .join("") +
    "</w:tblBorders>"
  const grid = "<w:tblGrid>" + Array.from({ length: n }, () => `<w:gridCol w:w="${w}"/>`).join("") + "</w:tblGrid>"
  const cell = (txt, isHead) => {
    const shd = isHead ? '<w:shd w:val="clear" w:color="auto" w:fill="F2F4F6"/>' : ""
    const pr = `<w:tcW w:w="${w}" w:type="dxa"/>${shd}`
    const p = `<w:p><w:pPr><w:spacing w:before="20" w:after="20"/></w:pPr>${runs(txt, isHead)}</w:p>`
    return `<w:tc><w:tcPr>${pr}</w:tcPr>${p}</w:tc>`
  }
  let t = `<w:tbl><w:tblPr><w:tblW w:w="0" w:type="auto"/>${borders}</w:tblPr>${grid}`
  t += "<w:tr>" + head.map((h) => cell(h, true)).join("") + "</w:tr>"
  rows.forEach((r) => {
    const cs = r.slice(0, n)
    while (cs.length < n) cs.push("")
    t += "<w:tr>" + cs.map((c) => cell(c, false)).join("") + "</w:tr>"
  })
  t += "</w:tbl><w:p/>"
  return t
}

// ---- block loop ------------------------------------------------------------
const lines = md.split("\n")
const body = []
let i = 0
const HMAP = { 1: "Title", 2: "Heading1", 3: "Heading2", 4: "Heading3" }

while (i < lines.length) {
  const line = lines[i]

  // table
  if (/^\|/.test(line) && i + 1 < lines.length && /-/.test(lines[i + 1]) && /^\|?[\s:|-]+\|?$/.test(lines[i + 1])) {
    const head = cellsOf(line)
    i += 2
    const rows = []
    while (i < lines.length && /^\|/.test(lines[i])) { rows.push(cellsOf(lines[i])); i++ }
    body.push(table(head, rows))
    continue
  }

  // blockquote (group consecutive)
  if (/^>\s?/.test(line)) {
    const buf = []
    while (i < lines.length && /^>\s?/.test(lines[i])) { buf.push(runs(lines[i].replace(/^>\s?/, ""))); i++ }
    const rxml = buf.join("<w:r><w:br/></w:r>")
    const ppr =
      '<w:pBdr><w:left w:val="single" w:sz="18" w:space="8" w:color="2272B4"/></w:pBdr>' +
      '<w:shd w:val="clear" w:color="auto" w:fill="F0F6FC"/><w:ind w:left="180"/><w:spacing w:before="80" w:after="80"/>'
    body.push(para(rxml, ppr))
    continue
  }

  // horizontal rule
  if (/^---+\s*$/.test(line)) {
    body.push('<w:p><w:pPr><w:pBdr><w:bottom w:val="single" w:sz="6" w:space="1" w:color="CCCCCC"/></w:pBdr></w:pPr></w:p>')
    i++
    continue
  }

  // heading
  let m
  if ((m = line.match(/^(#{1,4})\s+(.*)$/))) {
    const style = HMAP[m[1].length]
    body.push(para(runs(m[2]), `<w:pStyle w:val="${style}"/>`))
    i++
    continue
  }

  // ordered list item (use the source number)
  if ((m = line.match(/^(\d+)\.\s+(.*)$/))) {
    const marker = `<w:r><w:t xml:space="preserve">${m[1]}.  </w:t></w:r>`
    body.push(para(marker + runs(m[2]), '<w:ind w:left="360" w:hanging="360"/><w:spacing w:after="40"/>'))
    i++
    continue
  }

  // unordered list item
  if ((m = line.match(/^[-*]\s+(.*)$/))) {
    const marker = '<w:r><w:t xml:space="preserve">\u2022  </w:t></w:r>'
    body.push(para(marker + runs(m[1]), '<w:ind w:left="360" w:hanging="360"/><w:spacing w:after="40"/>'))
    i++
    continue
  }

  // blank
  if (!line.trim()) { i++; continue }

  // paragraph
  body.push(para(runs(line), '<w:spacing w:after="80"/>'))
  i++
}

// ---- package ---------------------------------------------------------------
const NS = 'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"'
const documentXml =
  `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<w:document ${NS}><w:body>` +
  body.join("") +
  '<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1080" w:right="1080" w:bottom="1080" w:left="1080" w:header="720" w:footer="720" w:gutter="0"/></w:sectPr>' +
  "</w:body></w:document>"

const stylesXml =
  `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<w:styles ${NS}>` +
  '<w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/><w:sz w:val="22"/><w:szCs w:val="22"/></w:rPr></w:rPrDefault></w:docDefaults>' +
  '<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style>' +
  '<w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:spacing w:after="120"/></w:pPr><w:rPr><w:b/><w:sz w:val="56"/><w:szCs w:val="56"/></w:rPr></w:style>' +
  '<w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:spacing w:before="360" w:after="120"/><w:outlineLvl w:val="0"/></w:pPr><w:rPr><w:b/><w:sz w:val="32"/><w:szCs w:val="32"/></w:rPr></w:style>' +
  '<w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="heading 2"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:spacing w:before="240" w:after="80"/><w:outlineLvl w:val="1"/></w:pPr><w:rPr><w:b/><w:sz w:val="26"/><w:szCs w:val="26"/></w:rPr></w:style>' +
  '<w:style w:type="paragraph" w:styleId="Heading3"><w:name w:val="heading 3"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:spacing w:before="160" w:after="60"/><w:outlineLvl w:val="2"/></w:pPr><w:rPr><w:b/><w:sz w:val="24"/><w:szCs w:val="24"/></w:rPr></w:style>' +
  "</w:styles>"

const contentTypes =
  '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
  '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
  '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
  '<Default Extension="xml" ContentType="application/xml"/>' +
  '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>' +
  '<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>' +
  "</Types>"

const rootRels =
  '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
  '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
  '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>' +
  "</Relationships>"

const docRels =
  '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
  '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
  '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>' +
  "</Relationships>"

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "docx-"))
fs.mkdirSync(path.join(tmp, "_rels"))
fs.mkdirSync(path.join(tmp, "word"))
fs.mkdirSync(path.join(tmp, "word/_rels"))
fs.writeFileSync(path.join(tmp, "[Content_Types].xml"), contentTypes)
fs.writeFileSync(path.join(tmp, "_rels/.rels"), rootRels)
fs.writeFileSync(path.join(tmp, "word/document.xml"), documentXml)
fs.writeFileSync(path.join(tmp, "word/styles.xml"), stylesXml)
fs.writeFileSync(path.join(tmp, "word/_rels/document.xml.rels"), docRels)

if (fs.existsSync(OUT)) fs.rmSync(OUT)
execFileSync("zip", ["-q", "-X", "-r", OUT, "[Content_Types].xml", "_rels", "word"], { cwd: tmp })
fs.rmSync(tmp, { recursive: true, force: true })
console.log(`Wrote ${OUT} (${(fs.statSync(OUT).size / 1024).toFixed(0)} KB)`)
