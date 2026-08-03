#!/usr/bin/env node
/*
 * Convert raw Figma swatch data → canonical color-primitives.json.
 *
 * Input JSON (from the Figma plugin read) must contain:
 *   sw:         [{hex, x, y}]  every filled swatch rectangle
 *   rowLabels:  [{t, x, y}]    "Category / Hue" labels (e.g. "Viz / Pink")
 *   nameLabels: [{t, x, y}]    categorical chip names (e.g. "Purple", "Teal")
 *
 * Coordinate-robust: derives step columns from sorted unique x, and maps rows
 * by nearest label — so it keeps working when the board is moved around Figma.
 *
 * Usage: node scripts/figma-swatches-to-json.mjs /tmp/figma-raw.json [out.json]
 */
import { readFileSync, writeFileSync } from "node:fs";

const IN = process.argv[2];
const OUT = process.argv[3] || new URL("../research/agent-design-standards/data/color-primitives.json", import.meta.url).pathname;
if (!IN) { console.error("usage: figma-swatches-to-json.mjs <raw.json> [out.json]"); process.exit(1); }
const R = JSON.parse(readFileSync(IN, "utf8"));
const STEP_ORDER = ["050", "100", "200", "300", "400", "500", "600", "700", "800", "900"];
const nearest = (arr, key, target) => arr.reduce((b, o) => Math.abs(o[key] - target) < Math.abs(b[key] - target) ? o : b);

// Two categorical rows sit at the largest y values (the nameLabels' y groups)
const catYs = [...new Set(R.nameLabels.map(n => n.y))].sort((a, b) => a - b); // [first5Y, next5Y]
const catBandMin = Math.min(...catYs) - 80;               // swatches at/below → categorical
const rampSw = R.sw.filter(s => s.y < catBandMin);
const catSw = R.sw.filter(s => s.y >= catBandMin);

// Step columns from sorted unique x of ramp swatches
const rampXs = [...new Set(rampSw.map(s => s.x))].sort((a, b) => a - b);
if (rampXs.length !== 10) console.error(`WARN: found ${rampXs.length} step columns (expected 10)`);
const STEP = Object.fromEntries(rampXs.map((x, i) => [x, STEP_ORDER[i]]));
const midX = (rampXs[4] + rampXs[5]) / 2; // divides light (050-400) from dark (500-900)

const out = {
  $meta: {
    source: "Figma: DBUI Design System, node 4274-5096 ('Product UI Colors')",
    fetched: new Date().toISOString().slice(0, 10),
    note: "Exact values read from Figma swatch FILLS via plugin API. Steps: " + STEP_ORDER.join(","),
  },
  surface: {}, status: {}, viz: {}, categorical: { "first-5": {}, "next-5": {} },
};

for (const s of rampSw) {
  const step = STEP[s.x];
  const [cat, hue] = nearest(R.rowLabels, "y", s.y).t.split(" / ").map(t => t.trim());
  ((out[cat.toLowerCase()])[hue.toLowerCase()] ||= {})[step] = s.hex;
}
for (const s of catSw) {
  const band = Math.abs(s.y - catYs[0]) < Math.abs(s.y - catYs[1]) ? "first-5" : "next-5";
  const bandY = band === "first-5" ? catYs[0] : catYs[1];
  const lbl = R.nameLabels.filter(n => Math.abs(n.y - bandY) < 40).reduce((b, n) => Math.abs(n.x - s.x) < Math.abs(b.x - s.x) ? n : b);
  const mode = s.x < midX ? "light" : "dark";
  (out.categorical[band][lbl.t.toLowerCase()] ||= {})[mode] = s.hex;
}
// order steps within each ramp
for (const cat of ["surface", "status", "viz"]) for (const hue of Object.keys(out[cat])) {
  const o = {}; for (const st of STEP_ORDER) if (out[cat][hue][st]) o[st] = out[cat][hue][st]; out[cat][hue] = o;
}

writeFileSync(OUT, JSON.stringify(out, null, 2));
const nRamp = Object.values(out).filter(v => v && !v.source).reduce((n, g) => n + (g.light || g.dark ? 0 : Object.keys(g).length), 0);
console.log("wrote", OUT);
console.log("ramps:", ["surface", "status", "viz"].map(c => `${c}=${Object.keys(out[c]).length}`).join(" "));
for (const set of ["first-5", "next-5"]) console.log(set, JSON.stringify(out.categorical[set]));
