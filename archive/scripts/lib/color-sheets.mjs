/*
 * Builds the abstract 5-sheet model for the color validation workbook.
 * Consumed by both scripts/color-to-xlsx.mjs (.xlsx) and scripts/color-to-gsheets.mjs
 * (Google Sheets) so the two outputs are identical.
 *
 * Cell = string | number | {
 *   v: string|number, bold?, fill?: 'RRGGBB', color?: 'RRGGBB',
 *   align?: 'left'|'center'|'right'
 * }
 * Sheet = { name, cols?: number[] (widths), rows: Cell[][], freezeHeader?, autofilter? }
 */
import {
  STEPS, WHITE, BLACK, hexRgb, hexOklch, hexLab, ciede2000,
  wcag, apca, simLab, stats, rampsOf, CVD_TYPES,
} from "./color-math.mjs";

const r2 = (n) => Math.round(n * 100) / 100;
const r1 = (n) => Math.round(n * 10) / 10;
const H = (v) => ({ v, bold: true, fill: "1F272D", color: "FFFFFF", align: "center" });
const HL = (v) => ({ v, bold: true, fill: "1F272D", color: "FFFFFF", align: "left" });
const T = (v) => ({ v, bold: true });
const PASS = { fill: "D6F5D6" }, FAIL = { fill: "FBD5D5" }, WARN = { fill: "FCE9C6" };
const swatch = (hex) => ({ v: hex, fill: hex.replace("#", ""), color: wcag(hex, BLACK) >= wcag(hex, WHITE) ? "000000" : "FFFFFF", align: "center" });

export function buildSheets(data) {
  const ramps = rampsOf(data);

  const allSwatches = [];
  for (const [name, r] of ramps) { const [group, hue] = name.split("/"); for (const s of STEPS) if (r[s]) allSwatches.push({ group, name: hue, step: s, hex: r[s] }); }
  for (const [set, obj] of Object.entries(data.categorical || {})) for (const [slot, v] of Object.entries(obj)) for (const mode of ["light", "dark"]) allSwatches.push({ group: "categorical", name: `${set}/${slot}`, step: mode, hex: v[mode] });

  /* ---- Palette (colored matrix) ---- */
  const palette = () => {
    const rows = [];
    rows.push([HL("DBUI color primitives — palette matrix"), ...STEPS.map(() => "")]);
    rows.push([{ v: `Source: ${data.$meta?.source || ""}` }]);
    rows.push([]);
    for (const cat of ["surface", "status", "viz"]) {
      rows.push([T(cat.toUpperCase())]);
      rows.push([H("Ramp"), ...STEPS.map(H)]);
      for (const [hue, r] of Object.entries(data[cat])) rows.push([{ v: hue, bold: true }, ...STEPS.map((s) => (r[s] ? swatch(r[s]) : ""))]);
      rows.push([]);
    }
    rows.push([T("CATEGORICAL (fixed qualitative sets)")]);
    rows.push([H("Set"), H("Slot"), H("Light"), H("Dark")]);
    for (const [set, obj] of Object.entries(data.categorical || {}))
      for (const [slot, v] of Object.entries(obj)) rows.push([{ v: set }, { v: slot, bold: true }, swatch(v.light), swatch(v.dark)]);
    return { name: "Palette", cols: [16, ...STEPS.map(() => 10)], rows };
  };

  /* ---- Values (tidy) ---- */
  const values = () => {
    const rows = [[H("Group"), H("Name"), H("Step / Mode"), H("Hex"), H("Swatch"), H("R"), H("G"), H("B"), H("OKLCH L"), H("OKLCH C"), H("OKLCH H°")]];
    for (const sw of allSwatches) {
      const [R, G, B] = hexRgb(sw.hex); const o = hexOklch(sw.hex);
      rows.push([sw.group, sw.name, sw.step, sw.hex, swatch(sw.hex), R, G, B, r2(o.L), r2(o.C), r1(o.H)]);
    }
    return { name: "Values", cols: [12, 16, 11, 10, 10, 6, 6, 6, 9, 9, 9], rows, freezeHeader: true, autofilter: true };
  };

  /* ---- Contrast ---- */
  const contrast = () => {
    const rows = [[H("Group"), H("Name"), H("Step"), H("Hex"), H("Swatch"), H("WCAG vs White"), H("WCAG vs Black"), H("Body AA (≥4.5)"), H("Large/UI (≥3)"), H("APCA Lc /White"), H("APCA Lc /Black")]];
    for (const sw of allSwatches) {
      const cw = wcag(sw.hex, WHITE), cb = wcag(sw.hex, BLACK);
      const body = cw >= 4.5 && cb >= 4.5 ? "both" : cw >= 4.5 ? "on white" : cb >= 4.5 ? "on black" : "none";
      const non = cw >= 3 && cb >= 3 ? "both" : cw >= 3 ? "on white" : cb >= 3 ? "on black" : "none";
      rows.push([
        sw.group, sw.name, sw.step, sw.hex, swatch(sw.hex), r2(cw), r2(cb),
        { v: body, ...(body === "none" ? FAIL : body === "both" ? PASS : WARN) },
        { v: non, ...(non === "none" ? FAIL : non === "both" ? PASS : WARN) },
        Math.round(Math.abs(apca(sw.hex, WHITE))), Math.round(Math.abs(apca(sw.hex, BLACK))),
      ]);
    }
    return { name: "Contrast", cols: [12, 16, 8, 10, 10, 13, 13, 13, 13, 13, 13], rows, freezeHeader: true, autofilter: true };
  };

  /* ---- OKLCH smoothness ---- */
  const oklch = () => {
    const rows = [];
    rows.push([T("4a. Per-ramp smoothness & drift")]);
    rows.push([H("Ramp"), H("L min"), H("L max"), H("ΔL mean"), H("ΔL CV%"), H("ΔE00 mean"), H("ΔE00 CV%"), H("Monotonic L"), H("Hue drift°"), H("Chroma peak"), H("Verdict")]);
    for (const [hue, r] of ramps) {
      const oks = STEPS.map((s) => hexOklch(r[s])), labs = STEPS.map((s) => hexLab(r[s]));
      const dL = [], dE = [];
      for (let i = 1; i < oks.length; i++) { dL.push((oks[i - 1].L - oks[i].L) * 100); dE.push(ciede2000(labs[i - 1], labs[i])); }
      const sL = stats(dL), sE = stats(dE), mono = dL.every((d) => d > 0);
      const chromatic = oks.filter((o) => o.C > 0.02).map((o) => o.H).sort((a, b) => a - b);
      let drift = 0; if (chromatic.length > 1) { let gap = 0; for (let i = 1; i < chromatic.length; i++) gap = Math.max(gap, chromatic[i] - chromatic[i - 1]); gap = Math.max(gap, 360 - (chromatic[chromatic.length - 1] - chromatic[0])); drift = 360 - gap; }
      let peak = STEPS[0], pc = 0; oks.forEach((o, i) => { if (o.C > pc) { pc = o.C; peak = STEPS[i]; } });
      const issues = [sL.cv > 40 ? "uneven ΔL" : "", !mono ? "non-mono L" : "", sE.cv > 45 ? "uneven ΔE" : "", drift > 40 ? "hue drift" : ""].filter(Boolean);
      rows.push([hue, r1(oks[oks.length - 1].L * 100), r1(oks[0].L * 100), r1(sL.mean), r1(sL.cv), r1(sE.mean), r1(sE.cv), { v: mono ? "yes" : "NO", ...(mono ? PASS : FAIL) }, Math.round(drift), peak, { v: issues.length ? issues.join(", ") : "ok", ...(issues.length ? WARN : PASS) }]);
    }
    rows.push([]); rows.push([T("4b. Lightness scale (OKLCH L×100) — should hold constant down each column")]);
    rows.push([H("Ramp"), ...STEPS.map(H)]);
    for (const [hue, r] of ramps) rows.push([{ v: hue, bold: true }, ...STEPS.map((s) => (r[s] ? Math.round(hexOklch(r[s]).L * 100) : ""))]);
    const colStats = STEPS.map((s) => stats(ramps.filter(([, r]) => r[s]).map(([, r]) => hexOklch(r[s]).L * 100)));
    rows.push([{ v: "mean", bold: true }, ...colStats.map((c) => Math.round(c.mean))]);
    rows.push([{ v: "stdev", bold: true }, ...colStats.map((c) => r1(c.sd))]);
    return { name: "OKLCH Smoothness", cols: [16, 9, 9, 9, 9, 10, 10, 11, 10, 11, 20], rows };
  };

  /* ---- CVD ---- */
  const cvd = () => {
    const rows = [];
    rows.push([T("5a. Ramps — min consecutive ΔE00 after CVD simulation (<2.3 = steps merge)")]);
    rows.push([H("Ramp"), H("normal"), H("deutan"), H("protan"), H("tritan"), H("achroma"), H("Deutan mono")]);
    for (const [hue, r] of ramps) {
      const cells = [{ v: hue, bold: true }]; let mono = true;
      for (const t of CVD_TYPES) {
        const labs = STEPS.map((s) => simLab(r[s], t)); let mn = Infinity;
        for (let i = 1; i < labs.length; i++) { const de = ciede2000(labs[i - 1], labs[i]); if (de < mn) mn = de; }
        cells.push(t !== "normal" && mn < 2.3 ? { v: r1(mn), ...FAIL } : r1(mn));
        if (t === "deutan") mono = labs.every((l, i) => i === 0 || labs[i - 1][0] > l[0]);
      }
      cells.push({ v: mono ? "yes" : "NO", ...(mono ? PASS : FAIL) });
      rows.push(cells);
    }
    rows.push([]); rows.push([T("5b. Qualitative sets — min pairwise ΔE00 after CVD (target ≥15; <10 confusable)")]);
    rows.push([H("Set"), H("normal"), H("deutan"), H("protan"), H("tritan"), H("achroma"), H("Worst pair (deutan)")]);
    const setRow = (label, entries) => {
      const cells = [{ v: label, bold: true }]; let worst = "";
      for (const t of CVD_TYPES) {
        let mn = Infinity, pair = "";
        for (let i = 0; i < entries.length; i++) for (let j = i + 1; j < entries.length; j++) { const de = ciede2000(simLab(entries[i][1], t), simLab(entries[j][1], t)); if (de < mn) { mn = de; pair = `${entries[i][0]}↔${entries[j][0]}`; } }
        cells.push(mn < 10 ? { v: r1(mn), ...FAIL } : mn < 15 ? { v: r1(mn), ...WARN } : r1(mn));
        if (t === "deutan") worst = pair;
      }
      cells.push(worst); rows.push(cells);
    };
    for (const [set, obj] of Object.entries(data.categorical || {}))
      for (const mode of ["light", "dark"]) setRow(`${set} — ${mode}`, Object.entries(obj).map(([n, v]) => [n, v[mode]]));
    for (const step of ["400", "600"]) setRow(`viz qualitative @ ${step}`, Object.entries(data.viz).map(([n, r]) => [n, r[step]]));
    setRow("status @ 600", Object.entries(data.status).map(([n, r]) => [n, r["600"]]));
    return { name: "CVD", cols: [22, 9, 9, 9, 9, 9, 22], rows };
  };

  return [palette(), values(), contrast(), oklch(), cvd()];
}

/* Semantic tokens sheet — built from Figma variable data (not the primitives JSON). */
export function buildSemanticSheet(tokens, meta = {}) {
  const sw6 = (hex) => ({ v: "", fill: hex.slice(1, 7).toUpperCase(), align: "center" });
  const rows = [];
  rows.push([HL("DBUI semantic color tokens — Light & Dark"), "", "", "", "", "", ""]);
  rows.push([{ v: `Source: ${meta.source || "Figma DBUI — Semantic collection"} · ${tokens.length} tokens · alpha shown as 8-digit hex (#RRGGBBAA)` }]);
  rows.push([]);
  rows.push([H("Token"), H("Category"), H("Light"), H("Light hex"), H("Light → primitive"), H("Dark"), H("Dark hex"), H("Dark → primitive")]);
  let cat = null;
  for (const t of tokens) {
    const c = t.name.split("/")[0];
    if (c !== cat) { cat = c; rows.push([{ v: c.toUpperCase(), bold: true, fill: "EDEFF2" }, "", "", "", "", "", "", ""]); }
    rows.push([
      t.name, c,
      sw6(t.light.hex), t.light.hex, t.light.ref || "— (composited)",
      sw6(t.dark.hex), t.dark.hex, t.dark.ref || "— (composited)",
    ]);
  }
  return { name: "Semantic Tokens", cols: [30, 11, 8, 12, 20, 8, 12, 20], rows, headerRow: 3, autofilter: true };
}
