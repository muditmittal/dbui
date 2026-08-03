/*
 * Minimal, dependency-free .xlsx (OOXML SpreadsheetML) writer.
 * Supports multiple worksheets, inline strings, numbers, bold/colored fonts,
 * solid cell fills, frozen header row, column widths, and autofilter.
 *
 * Cell = string | number | {
 *   v: string|number, t?: 's'|'n' (auto), bold?, fill?: 'RRGGBB', color?: 'RRGGBB',
 *   align?: 'left'|'center'|'right'
 * }
 * Sheet = { name, cols?: number[] (widths), rows: Cell[][], freezeHeader?: bool, autofilter?: bool }
 *
 * Requires the `zip` CLI (present on macOS/Linux) to package the archive.
 */
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const colLetter = (i) => { let s = ""; i++; while (i > 0) { const m = (i - 1) % 26; s = String.fromCharCode(65 + m) + s; i = Math.floor((i - 1) / 26); } return s; };

function normCell(c) {
  if (c === null || c === undefined) return { v: "", t: "s" };
  if (typeof c === "number") return { v: c, t: "n" };
  if (typeof c === "string") return { v: c, t: "s" };
  return { t: typeof c.v === "number" ? "n" : "s", ...c };
}

class Styles {
  constructor() {
    this.fonts = new Map(); this.fills = new Map(); this.xfs = new Map();
    this.fontKey("0", false); // default black, index 0
    this.fills.set("__none", 0); this.fills.set("__gray", 1);
    this.xfKey(0, 0, "");        // base xf index 0
  }
  fontKey(color, bold) {
    const k = `${color}|${bold}`;
    if (!this.fonts.has(k)) this.fonts.set(k, this.fonts.size);
    return this.fonts.get(k);
  }
  fillKey(hex) {
    if (!hex) return 0;
    const k = hex.toUpperCase();
    if (!this.fills.has(k)) this.fills.set(k, this.fills.size);
    return this.fills.get(k);
  }
  xfKey(fontId, fillId, align) {
    const k = `${fontId}|${fillId}|${align}`;
    if (!this.xfs.has(k)) this.xfs.set(k, this.xfs.size);
    return this.xfs.get(k);
  }
  styleFor(cell) {
    const fontId = this.fontKey((cell.color || "0").toUpperCase(), !!cell.bold);
    const fillId = this.fillKey(cell.fill);
    return this.xfKey(fontId, fillId, cell.align || "");
  }
  xml() {
    const fonts = [...this.fonts.keys()].map((k) => {
      const [color, bold] = k.split("|");
      const b = bold === "true" ? "<b/>" : "";
      const col = color === "0" ? "" : `<color rgb="FF${color}"/>`;
      return `<font>${b}<sz val="11"/>${col}<name val="Calibri"/></font>`;
    }).join("");
    const fillArr = [...this.fills.keys()].map((k) => {
      if (k === "__none") return `<fill><patternFill patternType="none"/></fill>`;
      if (k === "__gray") return `<fill><patternFill patternType="gray125"/></fill>`;
      return `<fill><patternFill patternType="solid"><fgColor rgb="FF${k}"/></patternFill></fill>`;
    }).join("");
    const xfs = [...this.xfs.keys()].map((k) => {
      const [fontId, fillId, align] = k.split("|");
      const applyFill = fillId !== "0" ? ` applyFill="1"` : "";
      const applyFont = fontId !== "0" ? ` applyFont="1"` : "";
      const al = align ? `<alignment horizontal="${align}" vertical="center" wrapText="1"/>` : "";
      const applyAl = align ? ` applyAlignment="1"` : "";
      return `<xf numFmtId="0" fontId="${fontId}" fillId="${fillId}" borderId="0" xfId="0"${applyFont}${applyFill}${applyAl}>${al}</xf>`;
    }).join("");
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
<fonts count="${this.fonts.size}">${fonts}</fonts>
<fills count="${this.fills.size}">${fillArr}</fills>
<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>
<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
<cellXfs count="${this.xfs.size}">${xfs}</cellXfs>
<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
</styleSheet>`;
  }
}

function sheetXml(sheet, styles) {
  const rowsXml = sheet.rows.map((row, r) => {
    const cells = row.map((raw, c) => {
      const cell = normCell(raw);
      const ref = `${colLetter(c)}${r + 1}`;
      const s = styles.styleFor(cell);
      const sAttr = s ? ` s="${s}"` : "";
      if (cell.v === "" && cell.t === "s" && !cell.fill && !cell.bold) return `<c r="${ref}"${sAttr}/>`;
      if (cell.t === "n") return `<c r="${ref}"${sAttr}><v>${cell.v}</v></c>`;
      return `<c r="${ref}"${sAttr} t="inlineStr"><is><t xml:space="preserve">${esc(cell.v)}</t></is></c>`;
    }).join("");
    return `<row r="${r + 1}">${cells}</row>`;
  }).join("");
  const nRows = sheet.rows.length;
  const nCols = Math.max(1, ...sheet.rows.map((r) => r.length));
  const dim = `A1:${colLetter(nCols - 1)}${nRows}`;
  const cols = sheet.cols?.length
    ? `<cols>${sheet.cols.map((w, i) => `<col min="${i + 1}" max="${i + 1}" width="${w}" customWidth="1"/>`).join("")}</cols>`
    : "";
  const freeze = sheet.freezeHeader
    ? `<sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>`
    : "";
  const af = sheet.autofilter ? `<autoFilter ref="${dim}"/>` : "";
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
${freeze}<dimension ref="${dim}"/>${cols}<sheetData>${rowsXml}</sheetData>${af}</worksheet>`;
}

export function writeXlsx(sheets, outPath) {
  const styles = new Styles();
  const sheetFiles = sheets.map((s) => sheetXml(s, styles)); // populates styles

  const tmp = `/tmp/xlsxbuild-${Date.now()}`;
  mkdirSync(`${tmp}/_rels`, { recursive: true });
  mkdirSync(`${tmp}/xl/_rels`, { recursive: true });
  mkdirSync(`${tmp}/xl/worksheets`, { recursive: true });

  const ct = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
${sheets.map((_, i) => `<Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join("\n")}
</Types>`;
  writeFileSync(`${tmp}/[Content_Types].xml`, ct);

  writeFileSync(`${tmp}/_rels/.rels`, `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`);

  const sheetsTag = sheets.map((s, i) => `<sheet name="${esc(s.name)}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`).join("");
  writeFileSync(`${tmp}/xl/workbook.xml`, `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
<sheets>${sheetsTag}</sheets></workbook>`);

  const wbRels = sheets.map((_, i) => `<Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`).join("");
  writeFileSync(`${tmp}/xl/_rels/workbook.xml.rels`, `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
${wbRels}
<Relationship Id="rId${sheets.length + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`);

  writeFileSync(`${tmp}/xl/styles.xml`, styles.xml());
  sheetFiles.forEach((xml, i) => writeFileSync(`${tmp}/xl/worksheets/sheet${i + 1}.xml`, xml));

  rmSync(outPath, { force: true });
  execFileSync("zip", ["-r", "-X", "-q", outPath, "."], { cwd: tmp });
  rmSync(tmp, { recursive: true, force: true });
  return outPath;
}
