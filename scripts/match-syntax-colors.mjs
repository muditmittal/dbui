#!/usr/bin/env node
/**
 * match-syntax-colors — derive the docs syntax palette from DBUI primitives.
 *
 * The docs code blocks use GitHub Light Default / GitHub Dark Default, restated
 * in DBUI primitives. This script is how that restatement was produced, and how
 * to reproduce it after a palette change. It prints the table that
 * `apps/portal/src/components/docs/syntax.ts` encodes; it does not write files,
 * because the choice of role names is a design decision, not an output.
 *
 * Method
 *   For each syntax role we know GitHub's light and dark hex. We search the
 *   primitive palette for the ramp and per-mode step that minimize CIEDE2000
 *   distance in CIELAB — a perceptual metric, so "nearest" means nearest to the
 *   eye rather than nearest in RGB — subject to three constraints:
 *
 *     1. ONE RAMP PER ROLE. A keyword may not change hue between light and dark;
 *        only the step moves. A token that changes hue is not one token.
 *     2. AA ON THE BLOCK. Every step clears 4.5:1 against `surface-subtle` in its
 *        own mode. That is the fill the blocks actually use.
 *     3. MUTUAL DISTINCTNESS. No two roles land within MIN_SEP CIEDE2000 of each
 *        other in either mode. Color that cannot be told apart is decoration.
 *        The default 10 is checked against GitHub's own floor, printed first.
 *
 *   Ramps may be SHARED between roles — GitHub itself puts string and number on
 *   one blue family — as long as constraint 3 holds.
 *
 * Usage:  node scripts/match-syntax-colors.mjs [minSeparation]
 */
import cfg from "../packages/dbui/src/tokens/theme.config.mjs"

const { primitives, semantics } = cfg

// ── color math ───────────────────────────────────────────────────────────────
const rgb = (h) => { const s = h.replace("#", ""); return [0, 2, 4].map((i) => parseInt(s.slice(i, i + 2), 16)) }
const lin = (v) => { const s = v / 255; return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4 }

/** sRGB → CIELAB (D65). */
function lab([r, g, b]) {
  const [R, G, B] = [lin(r), lin(g), lin(b)]
  let X = (R * 0.4124564 + G * 0.3575761 + B * 0.1804375) / 0.95047
  let Y = R * 0.2126729 + G * 0.7151522 + B * 0.0721750
  let Z = (R * 0.0193339 + G * 0.1191920 + B * 0.9503041) / 1.08883
  const f = (t) => (t > 216 / 24389 ? Math.cbrt(t) : (841 / 108) * t + 4 / 29)
  ;[X, Y, Z] = [f(X), f(Y), f(Z)]
  return [116 * Y - 16, 500 * (X - Y), 200 * (Y - Z)]
}

/** CIEDE2000 color difference (Sharma et al.). */
function ciede2000(l1, l2) {
  const [L1, a1, b1] = l1, [L2, a2, b2] = l2
  const rad = Math.PI / 180, deg = 180 / Math.PI
  const C1 = Math.hypot(a1, b1), C2 = Math.hypot(a2, b2), Cb = (C1 + C2) / 2
  const G = 0.5 * (1 - Math.sqrt(Cb ** 7 / (Cb ** 7 + 25 ** 7)))
  const ap1 = a1 * (1 + G), ap2 = a2 * (1 + G)
  const Cp1 = Math.hypot(ap1, b1), Cp2 = Math.hypot(ap2, b2)
  const hpf = (ap, b) => { if (ap === 0 && b === 0) return 0; const h = Math.atan2(b, ap) * deg; return h < 0 ? h + 360 : h }
  const hp1 = hpf(ap1, b1), hp2 = hpf(ap2, b2)
  const dLp = L2 - L1, dCp = Cp2 - Cp1
  let dhp = 0
  if (Cp1 * Cp2 !== 0) { dhp = hp2 - hp1; if (dhp > 180) dhp -= 360; else if (dhp < -180) dhp += 360 }
  const dHp = 2 * Math.sqrt(Cp1 * Cp2) * Math.sin((dhp * rad) / 2)
  const Lbp = (L1 + L2) / 2, Cbp = (Cp1 + Cp2) / 2
  let Hbp
  if (Cp1 * Cp2 === 0) Hbp = hp1 + hp2
  else { const s = Math.abs(hp1 - hp2); Hbp = s > 180 ? (hp1 + hp2 + (hp1 + hp2 < 360 ? 360 : -360)) / 2 : (hp1 + hp2) / 2 }
  const T = 1 - 0.17 * Math.cos((Hbp - 30) * rad) + 0.24 * Math.cos(2 * Hbp * rad)
    + 0.32 * Math.cos((3 * Hbp + 6) * rad) - 0.20 * Math.cos((4 * Hbp - 63) * rad)
  const dTh = 30 * Math.exp(-(((Hbp - 275) / 25) ** 2))
  const Rc = 2 * Math.sqrt(Cbp ** 7 / (Cbp ** 7 + 25 ** 7))
  const Sl = 1 + (0.015 * (Lbp - 50) ** 2) / Math.sqrt(20 + (Lbp - 50) ** 2)
  const Sc = 1 + 0.045 * Cbp, Sh = 1 + 0.015 * Cbp * T
  const Rt = -Math.sin(2 * dTh * rad) * Rc
  return Math.sqrt((dLp / Sl) ** 2 + (dCp / Sc) ** 2 + (dHp / Sh) ** 2 + Rt * (dCp / Sc) * (dHp / Sh))
}
const relLum = (c) => { const [r, g, b] = c.map(lin); return 0.2126 * r + 0.7152 * g + 0.0722 * b }
const contrast = (a, b) => { const [x, y] = [relLum(a), relLum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05) }

// ── the roles, with GitHub's values ──────────────────────────────────────────
const ROLES = [
  ["plain", "#1f2328", "#e6edf3"],
  ["comment", "#6e7781", "#8b949e"],
  ["keyword", "#cf222e", "#ff7b72"],
  ["string", "#0a3069", "#a5d6ff"],
  ["number", "#0550ae", "#79c0ff"],
  ["property", "#116329", "#7ee787"],
  ["variable", "#953800", "#ffa657"],
  ["function", "#8250df", "#d2a8ff"],
]
/** plain and comment must read as chrome, so they are held to the neutral ramp. */
const NEUTRAL_ONLY = new Set(["plain", "comment"])

// ── the palette, and the background the blocks actually use ──────────────────
const RAMPS = new Map()
for (const [fam, famVal] of Object.entries(primitives)) {
  if (fam === "base") continue
  for (const [ramp, steps] of Object.entries(famVal)) RAMPS.set(`${fam}.${ramp}`, Object.entries(steps))
}
const LABOF = new Map(), HEXOF = new Map()
for (const [ramp, steps] of RAMPS) for (const [s, h] of steps) {
  LABOF.set(`${ramp}.${s}`, lab(rgb(h))); HEXOF.set(`${ramp}.${s}`, h)
}
const dotted = (p) => p.split(".").reduce((o, k) => o[k], primitives)
const BG = {
  light: rgb(dotted(semantics["surface-subtle"].light)),
  dark: rgb(dotted(semantics["surface-subtle"].dark)),
}
const AA = 4.5
const MIN_SEP = Number(process.argv[2] ?? 10)

console.log(`Code block fill is surface-subtle: light ${dotted(semantics["surface-subtle"].light)}, dark ${dotted(semantics["surface-subtle"].dark)}\n`)
for (const [mode, idx] of [["light", 1], ["dark", 2]]) {
  let min = Infinity, which = ""
  for (let i = 0; i < ROLES.length; i++) for (let j = i + 1; j < ROLES.length; j++) {
    const d = ciede2000(lab(rgb(ROLES[i][idx])), lab(rgb(ROLES[j][idx])))
    if (d < min) { min = d; which = `${ROLES[i][0]}/${ROLES[j][0]}` }
  }
  console.log(`GitHub ${mode.padEnd(5)} own minimum pairwise separation: ΔE00 ${min.toFixed(1)}  (${which})`)
}

// ── candidates, then an exact search with pruning ────────────────────────────
const cand = ROLES.map(([role, gl, gd]) => {
  const tl = lab(rgb(gl)), td = lab(rgb(gd))
  const list = []
  for (const [ramp, steps] of RAMPS) {
    if (NEUTRAL_ONLY.has(role) !== ramp.startsWith("interface.")) continue
    const okL = steps.filter(([, h]) => contrast(rgb(h), BG.light) >= AA)
    const okD = steps.filter(([, h]) => contrast(rgb(h), BG.dark) >= AA)
    for (const [ls] of okL) for (const [ds] of okD) {
      list.push({
        role, ramp, ls, ds,
        cost: ciede2000(tl, LABOF.get(`${ramp}.${ls}`)) + ciede2000(td, LABOF.get(`${ramp}.${ds}`)),
      })
    }
  }
  return list.sort((a, b) => a.cost - b.cost).slice(0, 60)
})

const sepOK = (a, b) =>
  ciede2000(LABOF.get(`${a.ramp}.${a.ls}`), LABOF.get(`${b.ramp}.${b.ls}`)) >= MIN_SEP &&
  ciede2000(LABOF.get(`${a.ramp}.${a.ds}`), LABOF.get(`${b.ramp}.${b.ds}`)) >= MIN_SEP

let best = null
const chosen = []
function search(i, cost) {
  if (best && cost >= best.cost) return
  if (i === cand.length) { best = { cost, picks: chosen.map((c) => ({ ...c })) }; return }
  for (const c of cand[i]) {
    if (best && cost + c.cost >= best.cost) break
    if (!chosen.every((p) => sepOK(c, p))) continue
    chosen.push(c); search(i + 1, cost + c.cost); chosen.pop()
  }
}
search(0, 0)

if (!best) {
  console.error(`\nNo assignment satisfies a separation floor of ${MIN_SEP}. Try a lower value.`)
  process.exit(1)
}

console.log(`\nSeparation floor ${MIN_SEP} ΔE00 · total distance from GitHub ${best.cost.toFixed(1)}\n`)
console.log("role".padEnd(10) + "ramp".padEnd(16) + "light step  hex      contrast".padEnd(32) + "dark step  hex      contrast")
console.log("-".repeat(104))
for (const p of best.picks) {
  const lk = `${p.ramp}.${p.ls}`, dk = `${p.ramp}.${p.ds}`
  const l = `${p.ls.padEnd(11)} ${HEXOF.get(lk)}  ${contrast(rgb(HEXOF.get(lk)), BG.light).toFixed(2)}:1`
  const d = `${p.ds.padEnd(10)} ${HEXOF.get(dk)}  ${contrast(rgb(HEXOF.get(dk)), BG.dark).toFixed(2)}:1`
  console.log(p.role.padEnd(10) + p.ramp.padEnd(16) + l.padEnd(32) + d)
}
for (const [label, key] of [["light", "ls"], ["dark ", "ds"]]) {
  let min = Infinity, which = ""
  for (let i = 0; i < best.picks.length; i++) for (let j = i + 1; j < best.picks.length; j++) {
    const a = best.picks[i], b = best.picks[j]
    const d = ciede2000(LABOF.get(`${a.ramp}.${a[key]}`), LABOF.get(`${b.ramp}.${b[key]}`))
    if (d < min) { min = d; which = `${a.role}/${b.role}` }
  }
  console.log(`\nDBUI ${label} minimum pairwise separation: ΔE00 ${min.toFixed(1)}  (${which})`)
}
console.log("\n── paste-ready for syntax.ts ──")
for (const p of best.picks) {
  console.log(`  ${(p.role + ":").padEnd(10)} { light: "${p.ramp}.${p.ls}", dark: "${p.ramp}.${p.ds}" },`)
}
