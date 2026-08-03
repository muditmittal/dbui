#!/usr/bin/env node
/*
 * Emit Google Sheets API payloads (per-sheet values + formatting) from the shared
 * sheet model, targeting an EXISTING native spreadsheet's tabs.
 *
 * Colors (swatch fills + pass/fail shading) are emitted as compact `updateCells`
 * runs (one request per contiguous colored run) so payloads stay small enough to
 * feed to the user-google MCP (sheets_values_update + sheets_spreadsheet_batch_update).
 *
 * Config file (JSON) maps each model index → { title, sheetId } of the real tab:
 *   { "sheets": [ {"title":"Product UI Colors","sheetId":163006911}, ... ],
 *     "semantic": {"title":"Semantic Tokens","sheetId":100} }
 *
 * Usage: node scripts/color-to-gsheets.mjs <config.json> [outdir]
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { buildSheets, buildSemanticSheet } from "./lib/color-sheets.mjs";

const CONFIG = JSON.parse(readFileSync(process.argv[2], "utf8"));
const DIR = process.argv[3] || "/tmp/gs";
mkdirSync(DIR, { recursive: true });
const data = JSON.parse(readFileSync(new URL("../research/agent-design-standards/data/color-primitives.json", import.meta.url).pathname, "utf8"));

const models = buildSheets(data);
if (CONFIG.semantic) {
  const sem = JSON.parse(readFileSync("/tmp/semantic-tokens.json", "utf8"));
  models.push(buildSemanticSheet(sem.tokens, { source: `Figma DBUI — ${sem.collection} collection` }));
}
const targets = [...CONFIG.sheets, ...(CONFIG.semantic ? [CONFIG.semantic] : [])];

const norm = (c) => (c === null || c === undefined) ? { v: "" } : (typeof c === "object" ? c : { v: c });
const colorOf = (hex) => { const n = parseInt(hex, 16); return { red: Math.round(((n >> 16) & 255) / 255 * 1000) / 1000, green: Math.round(((n >> 8) & 255) / 255 * 1000) / 1000, blue: Math.round((n & 255) / 255 * 1000) / 1000 }; };
const ALIGN = { left: "LEFT", center: "CENTER", right: "RIGHT" };
const COND = new Set(["D6F5D6", "FBD5D5", "FCE9C6"]);
const isSwatch = (n) => n.fill && /^[0-9A-F]{6}$/i.test(n.fill) && n.align === "center" && (n.color === "000000" || n.color === "FFFFFF" || n.v === "");
const isCond = (n) => n.fill && COND.has(n.fill.toUpperCase());

const fmtOf = (n) => {
  const fmt = {};
  if (n.fill) fmt.backgroundColor = colorOf(n.fill);
  const tf = {};
  if (n.bold) tf.bold = true;
  if (n.color) tf.foregroundColor = colorOf(n.color);
  if (Object.keys(tf).length) fmt.textFormat = tf;
  if (n.align) fmt.horizontalAlignment = ALIGN[n.align];
  fmt.verticalAlignment = "MIDDLE";
  return fmt;
};

models.forEach((s, mi) => {
  const tgt = targets[mi];
  const sheetId = tgt.sheetId;
  const width = Math.max(1, ...s.rows.map((r) => r.length));

  // values (USER_ENTERED input): protect leading-zero step codes as text; pad blank
  // rows to fully overwrite any stale content left from the converted file.
  const cellVal = (v) => (typeof v === "string" && /^0\d/.test(v)) ? "'" + v : v;
  const PAD = [48, 210, 210, 48, 48, 74][mi] || s.rows.length;
  const values = s.rows.map((row) => { const o = row.map((c) => cellVal(norm(c).v)); while (o.length < width) o.push(""); return o; });
  while (values.length < PAD) values.push(new Array(width).fill(""));
  writeFileSync(`${DIR}/values_${mi}.json`, JSON.stringify({ range: tgt.title, values }));

  // structural (bold/text-color/align + non-color fills) via run-length repeatCell
  const req = (r0, r1, c0, c1, fmt) => ({ repeatCell: { range: { sheetId, startRowIndex: r0, endRowIndex: r1, startColumnIndex: c0, endColumnIndex: c1 }, cell: { userEnteredFormat: fmt }, fields: "userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment)" } });
  // clear any stale background from the converted file, then reapply (order matters:
  // later requests win within a batchUpdate, so clear-white goes first).
  const structural = [{
    repeatCell: {
      range: { sheetId, startRowIndex: 0, endRowIndex: s.rows.length + 2, startColumnIndex: 0, endColumnIndex: Math.max(width, (s.cols || []).length) },
      cell: { userEnteredFormat: { backgroundColor: { red: 1, green: 1, blue: 1 } } },
      fields: "userEnteredFormat.backgroundColor",
    },
  }];
  // color runs (swatch + cond) via updateCells (background only) → compact, safe
  const colorRuns = [];
  const flushRun = (r, c0, cells) => colorRuns.push({ updateCells: { start: { sheetId, rowIndex: r, columnIndex: c0 }, rows: [{ values: cells.map((f) => ({ userEnteredFormat: { backgroundColor: colorOf(f) } })) }], fields: "userEnteredFormat.backgroundColor" } });

  s.rows.forEach((row, r) => {
    let c = 0;
    while (c < row.length) {
      const n = norm(row[c]);
      if (isSwatch(n) || isCond(n)) {
        const c0 = c; const run = [];
        while (c < row.length) { const m = norm(row[c]); if (!(isSwatch(m) || isCond(m))) break; run.push(m.fill); c++; }
        flushRun(r, c0, run);
        continue;
      }
      if (!(n.bold || n.fill || n.color || n.align)) { c++; continue; }
      const sig = JSON.stringify(fmtOf(n));
      let end = c + 1;
      while (end < row.length) { const m = norm(row[end]); if (isSwatch(m) || isCond(m) || JSON.stringify(fmtOf(m)) !== sig) break; end++; }
      structural.push(req(r, r + 1, c, end, fmtOf(n)));
      c = end;
    }
  });
  (s.cols || []).forEach((w, col) => structural.push({ updateDimensionProperties: { range: { sheetId, dimension: "COLUMNS", startIndex: col, endIndex: col + 1 }, properties: { pixelSize: Math.round(w * 7) + 12 }, fields: "pixelSize" } }));
  if (s.autofilter) structural.push({ setBasicFilter: { filter: { range: { sheetId, startRowIndex: s.headerRow || 0, startColumnIndex: 0, endColumnIndex: width } } } });

  writeFileSync(`${DIR}/format_${mi}.json`, JSON.stringify({ requests: structural }));
  writeFileSync(`${DIR}/color_${mi}.json`, JSON.stringify({ requests: colorRuns }));
});

writeFileSync(`${DIR}/manifest.json`, JSON.stringify({ tabs: targets.map((t, i) => ({ i, ...t, rows: models[i].rows.length })) }, null, 2));
console.log("wrote payloads for", models.length, "tabs to", DIR);
