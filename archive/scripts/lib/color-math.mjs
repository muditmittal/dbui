/*
 * Shared, dependency-free color math for DBUI color tooling.
 * Used by scripts/color-audit.mjs (Markdown report) and scripts/color-to-xlsx.mjs (spreadsheet)
 * so both surfaces report identical numbers.
 *
 * Methods: sRGB->linear->XYZ->Lab, CIEDE2000, OKLab/OKLCH (Ottosson 2020),
 * WCAG 2.2 luminance ratio, APCA-W3 0.1.9, Machado/Oliveira/Fernandes (2009) CVD matrices.
 */

export const STEPS = ["050", "100", "200", "300", "400", "500", "600", "700", "800", "900"];
export const WHITE = "#FFFFFF";
export const BLACK = "#000000";

/* ------------ conversions ------------ */
export const hexRgb = (h) => { const s = h.replace("#", ""); return [0, 2, 4].map(i => parseInt(s.slice(i, i + 2), 16)); };
export const sLin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
export const linS = (c) => c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
export const clamp01 = (x) => Math.min(1, Math.max(0, x));
export const linRGB = (rgb) => rgb.map(sLin);
export function linXYZ([r, g, b]) { return [r * 0.4124564 + g * 0.3575761 + b * 0.1804375, r * 0.2126729 + g * 0.7151522 + b * 0.072175, r * 0.0193339 + g * 0.119192 + b * 0.9503041]; }
const Xn = 0.95047, Yn = 1, Zn = 1.08883;
const fLab = (t) => t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116;
export function xyzLab([x, y, z]) { const fx = fLab(x / Xn), fy = fLab(y / Yn), fz = fLab(z / Zn); return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)]; }
export const rgbLab = (rgb) => xyzLab(linXYZ(linRGB(rgb)));
export const hexLab = (h) => rgbLab(hexRgb(h));
export function rgbOklch([r, g, b]) {
  const R = sLin(r), G = sLin(g), B = sLin(b);
  const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
  const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
  const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  let H = Math.atan2(bb, a) * 180 / Math.PI; if (H < 0) H += 360;
  return { L, C: Math.hypot(a, bb), H };
}
export const hexOklch = (h) => rgbOklch(hexRgb(h));

export function ciede2000([L1, a1, b1], [L2, a2, b2]) {
  const C1 = Math.hypot(a1, b1), C2 = Math.hypot(a2, b2), Cb = (C1 + C2) / 2;
  const G = 0.5 * (1 - Math.sqrt(Math.pow(Cb, 7) / (Math.pow(Cb, 7) + Math.pow(25, 7))));
  const a1p = (1 + G) * a1, a2p = (1 + G) * a2, C1p = Math.hypot(a1p, b1), C2p = Math.hypot(a2p, b2), rad = Math.PI / 180, deg = 180 / Math.PI;
  let h1p = Math.atan2(b1, a1p) * deg; if (h1p < 0) h1p += 360; let h2p = Math.atan2(b2, a2p) * deg; if (h2p < 0) h2p += 360;
  const dLp = L2 - L1, dCp = C2p - C1p; let dhp; if (C1p * C2p === 0) dhp = 0; else if (Math.abs(h2p - h1p) <= 180) dhp = h2p - h1p; else dhp = h2p - h1p > 180 ? h2p - h1p - 360 : h2p - h1p + 360;
  const dHp = 2 * Math.sqrt(C1p * C2p) * Math.sin(dhp * rad / 2); const Lbp = (L1 + L2) / 2, Cbp = (C1p + C2p) / 2;
  let hbp; if (C1p * C2p === 0) hbp = h1p + h2p; else if (Math.abs(h1p - h2p) <= 180) hbp = (h1p + h2p) / 2; else hbp = h1p + h2p < 360 ? (h1p + h2p + 360) / 2 : (h1p + h2p - 360) / 2;
  const T = 1 - 0.17 * Math.cos((hbp - 30) * rad) + 0.24 * Math.cos(2 * hbp * rad) + 0.32 * Math.cos((3 * hbp + 6) * rad) - 0.2 * Math.cos((4 * hbp - 63) * rad);
  const Rc = 2 * Math.sqrt(Math.pow(Cbp, 7) / (Math.pow(Cbp, 7) + Math.pow(25, 7)));
  const Sl = 1 + (0.015 * Math.pow(Lbp - 50, 2)) / Math.sqrt(20 + Math.pow(Lbp - 50, 2)), Sc = 1 + 0.045 * Cbp, Sh = 1 + 0.015 * Cbp * T;
  const Rt = -Math.sin(2 * 30 * Math.exp(-Math.pow((hbp - 275) / 25, 2)) * rad) * Rc;
  return Math.sqrt((dLp / Sl) ** 2 + (dCp / Sc) ** 2 + (dHp / Sh) ** 2 + Rt * (dCp / Sc) * (dHp / Sh));
}

/* ------------ WCAG + APCA ------------ */
export const relLum = (rgb) => { const [r, g, b] = linRGB(rgb); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
export const wcag = (h1, h2) => { const a = relLum(hexRgb(h1)) + 0.05, b = relLum(hexRgb(h2)) + 0.05; return a > b ? a / b : b / a; };
export function apcaY(rgb) { const lin = v => Math.pow(v / 255, 2.4); const [r, g, b] = rgb; return 0.2126729 * lin(r) + 0.7151522 * lin(g) + 0.072175 * lin(b); }
export function apca(txtHex, bgHex) {
  let txtY = apcaY(hexRgb(txtHex)), bgY = apcaY(hexRgb(bgHex));
  const blk = 0.022, clmp = 1.414; txtY = txtY > blk ? txtY : txtY + Math.pow(blk - txtY, clmp); bgY = bgY > blk ? bgY : bgY + Math.pow(blk - bgY, clmp);
  if (Math.abs(bgY - txtY) < 0.0005) return 0; let out;
  if (bgY > txtY) { const S = (Math.pow(bgY, 0.56) - Math.pow(txtY, 0.57)) * 1.14; out = S < 0.1 ? 0 : S - 0.027; }
  else { const S = (Math.pow(bgY, 0.65) - Math.pow(txtY, 0.62)) * 1.14; out = S > -0.1 ? 0 : S + 0.027; }
  return out * 100;
}

/* ------------ CVD (Machado 2009, severity 1.0, linear RGB) ------------ */
export const CVD = {
  protan: [[0.152286, 1.052583, -0.204868], [0.114503, 0.786281, 0.099216], [-0.003882, -0.048116, 1.051998]],
  deutan: [[0.367322, 0.860646, -0.227968], [0.280085, 0.672501, 0.047413], [-0.01182, 0.04294, 0.96861]],
  tritan: [[1.255528, -0.076749, -0.178779], [-0.078411, 0.930809, 0.147602], [0.004733, 0.691367, 0.3039]]
};
export function simLab(hex, type) {
  if (type === "normal") return hexLab(hex);
  const [r, g, b] = linRGB(hexRgb(hex));
  if (type === "achroma") { const y = 0.2126 * r + 0.7152 * g + 0.0722 * b; const o = [y, y, y].map(c => clamp01(linS(clamp01(c))) * 255); return rgbLab(o); }
  const m = CVD[type]; const o = [m[0][0] * r + m[0][1] * g + m[0][2] * b, m[1][0] * r + m[1][1] * g + m[1][2] * b, m[2][0] * r + m[2][1] * g + m[2][2] * b].map(c => clamp01(linS(clamp01(c))) * 255); return rgbLab(o);
}
export const CVD_TYPES = ["normal", "deutan", "protan", "tritan", "achroma"];

/* ------------ helpers ------------ */
export const f = (n, d = 1) => Number(n).toFixed(d);
export const stats = (a) => { const m = a.reduce((s, v) => s + v, 0) / a.length; const sd = Math.sqrt(a.reduce((s, v) => s + (v - m) ** 2, 0) / a.length); return { mean: m, sd, cv: m ? sd / m * 100 : 0 }; };

/** Flatten palette JSON into ramp list: [ ["surface/neutral", {050:.., ...}], ... ] */
export function rampsOf(data) {
  const ramps = [];
  for (const cat of ["surface", "status", "viz"]) for (const [hue, r] of Object.entries(data[cat] || {})) ramps.push([`${cat}/${hue}`, r]);
  return ramps;
}
