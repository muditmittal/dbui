#!/usr/bin/env node
/*
 * Build a multi-sheet .xlsx workbook from the DBUI color primitives.
 * Sheet model comes from scripts/lib/color-sheets.mjs (shared with the Google Sheets
 * exporter) so the .xlsx and the Google Sheet are identical.
 *
 * Usage: node scripts/color-to-xlsx.mjs [palette.json] [out.xlsx]
 */
import { readFileSync } from "node:fs";
import { buildSheets } from "./lib/color-sheets.mjs";
import { writeXlsx } from "./lib/xlsx.mjs";

const IN = process.argv[2] || new URL("../research/agent-design-standards/data/color-primitives.json", import.meta.url).pathname;
const OUT = process.argv[3] || new URL("../research/agent-design-standards/color-primitives-validation.xlsx", import.meta.url).pathname;
const data = JSON.parse(readFileSync(IN, "utf8"));

writeXlsx(buildSheets(data), OUT);
console.log("Wrote " + OUT + " (5 sheets)");
