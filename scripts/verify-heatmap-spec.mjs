/**
 * Compiles the Heatmap's Vega-Lite spec headlessly and asserts what it draws.
 *
 * A browser screenshot is the usual check, but Chrome's headless mode never goes
 * idle against Storybook's HMR socket. Compiling through the same vega-lite the
 * component uses proves more than a screenshot would anyway: it fails on an
 * invalid spec, and it lets the cell geometry and every fill be asserted rather
 * than eyeballed. Three real bugs were caught here that a screenshot would only
 * have shown as "the chart is blank":
 *
 *   1. a temporal x scale has no bandwidth, so cells had no width
 *   2. the Vega expression language has no `undefined` literal, so the no-data
 *      test threw at parse time
 *   3. Vega-Lite filters null rows before the mark, so no-data cells vanished
 *
 * Token values are read from the generated tokens.css rather than pasted, so the
 * check follows the palette instead of drifting from it.
 *
 * Run: node scripts/verify-heatmap-spec.mjs [--svg]
 */
import { compile } from "vega-lite"
import { parse, View, loader } from "vega"
import { readFileSync, writeFileSync } from "node:fs"

const TOKENS = new URL("../packages/dbui/src/tokens/tokens.css", import.meta.url)
const css = readFileSync(TOKENS, "utf8")

/** The steps a cell's magnitude runs through — must match RAMP in heatmap.tsx. */
const RAMP = [2, 3, 4, 5, 6, 7, 8].map((n) => `--db-viz-sequential-${n}`)
const EMPTY = "--db-viz-neutral-subtle"
const CANVAS_TOKEN = "--db-surface-base"

/**
 * Splits tokens.css into its light and dark scopes. Dark begins at whichever
 * dark selector the generator emitted; everything before it is light.
 */
function scopes() {
  const darkAt = [".dark", '[data-mode="dark"]', "prefers-color-scheme"]
    .map((s) => css.indexOf(s))
    .filter((i) => i >= 0)
    .sort((a, b) => a - b)[0]
  return {
    light: css.slice(0, darkAt ?? css.length),
    dark: css.slice(darkAt ?? 0),
  }
}

function readToken(scope, name) {
  const m = scope.match(new RegExp(`${name.replace(/-/g, "\\-")}\\s*:\\s*([^;]+);`))
  if (!m) throw new Error(`token ${name} not found — has it been renamed?`)
  return m[1].trim()
}

/** Composites an rgba() over an opaque backdrop so fills can be compared as hex. */
function flatten(value, backdrop) {
  if (value.startsWith("#")) return value.toUpperCase()
  const [r, g, b, a = 1] = value.match(/[\d.]+/g).map(Number)
  const bg = backdrop.match(/[\da-f]{2}/gi).map((h) => parseInt(h, 16))
  return (
    "#" +
    [r, g, b]
      .map((c, i) => Math.round(c * a + bg[i] * (1 - a)).toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  )
}

const WINDOWS = ["00–04", "04–08", "08–12", "12–16", "16–20", "20–24"]
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const data = []
for (let day = 0; day < 30; day += 1) {
  const date = new Date(2026, 6, 1)
  date.setDate(date.getDate() + day)
  const column = `${MONTHS[date.getMonth()]} ${date.getDate()}`
  const weekend = date.getDay() === 0 || date.getDay() === 6
  WINDOWS.forEach((w, row) => {
    if (day === 17 || (day === 18 && row < 4)) {
      data.push({ x: column, y: w, value: null })
      return
    }
    const shoulder = row === 2 || row === 4 ? 0.7 : 1
    const peak = row === 3 ? 1 : shoulder
    const load = weekend ? 0.22 : 1
    const drift = 0.7 + (day / 30) * 0.6
    const wobble = 0.85 + ((day * 7 + row * 13) % 11) / 36
    data.push({
      x: column,
      y: w,
      value: Math.round(1400 * peak * load * drift * wobble * (row < 2 ? 0.3 : 1)),
    })
  })
}

/** Mirrors the spec built in heatmap.tsx. */
function buildSpec({ range, empty, canvas }) {
  return {
    $schema: "https://vega.github.io/schema/vega-lite/v6.json",
    width: 1112,
    height: 168,
    autosize: { type: "fit-x", contains: "padding" },
    background: canvas,
    data: { values: data },
    mark: {
      type: "rect",
      cornerRadius: 2,
      stroke: canvas,
      strokeWidth: 1,
      invalid: null,
    },
    encoding: {
      x: {
        field: "x",
        type: "ordinal",
        sort: null,
        axis: { labelAngle: 0, title: null, grid: false, labelOverlap: true },
        scale: { paddingInner: 0, paddingOuter: 0 },
      },
      y: {
        field: "y",
        type: "ordinal",
        sort: WINDOWS,
        axis: { title: null, grid: false },
        scale: { paddingInner: 0, paddingOuter: 0 },
      },
      color: {
        condition: { test: "!isValid(datum.value)", value: empty },
        field: "value",
        type: "quantitative",
        scale: { type: "quantize", range },
        legend: null,
      },
    },
  }
}

const hexOf = (rgb) =>
  "#" +
  rgb
    .match(/\d+/g)
    .slice(0, 3)
    .map((n) => Number(n).toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase()

let failures = 0
const scope = scopes()

for (const mode of ["light", "dark"]) {
  const canvas = readToken(scope[mode], CANVAS_TOKEN)
  const range = RAMP.map((t) => flatten(readToken(scope[mode], t), canvas))
  const empty = flatten(readToken(scope[mode], EMPTY), canvas)

  const spec = buildSpec({ range, empty, canvas })
  const view = new View(parse(compile(spec).spec), { renderer: "none", loader: loader() })
  await view.runAsync()
  const svg = await view.toSVG()
  if (process.argv.includes("--svg")) writeFileSync(`/tmp/heatmap-${mode}.svg`, svg)

  const cells = [
    ...svg.matchAll(/aria-roledescription="rect mark" d="([^"]+)" fill="([^"]+)"/g),
  ].map((m) => ({ d: m[1], fill: m[2].startsWith("rgb") ? hexOf(m[2]) : m[2].toUpperCase() }))

  const allowed = new Set([...range, empty])
  const offPalette = [...new Set(cells.map((c) => c.fill))].filter((f) => !allowed.has(f))
  const emptyDrawn = cells.filter((c) => c.fill === empty).length
  const expectedEmpty = data.filter((d) => d.value === null).length

  const dims = new Set()
  for (const c of cells) {
    const nums = c.d.match(/-?\d+(\.\d+)?/g).map(Number)
    const xs = nums.filter((_, i) => i % 2 === 0)
    const ys = nums.filter((_, i) => i % 2 === 1)
    dims.add(
      `${Math.round(Math.max(...xs) - Math.min(...xs))}x${Math.round(Math.max(...ys) - Math.min(...ys))}`
    )
  }
  const cellHeight = [...dims][0]?.split("x")[1]

  // An empty cell that reads as the lowest step defeats the point of the
  // condition, so the two must be visibly apart.
  const dist = (a, b) => {
    const p = (h) => h.match(/[\da-f]{2}/gi).map((x) => parseInt(x, 16))
    const [x, y] = [p(a), p(b)]
    return Math.round(Math.sqrt(x.reduce((s, c, i) => s + (c - y[i]) ** 2, 0)))
  }
  const emptyVsLowest = dist(empty, range[0])

  const checks = [
    ["cells drawn", `${cells.length} of ${data.length}`, cells.length === data.length],
    ["fills off-palette", offPalette.length ? offPalette.join(" ") : "none", offPalette.length === 0],
    ["no-data cells", `${emptyDrawn} of ${expectedEmpty}`, emptyDrawn === expectedEmpty],
    ["uniform cell size", [...dims].join(" ") || "-", dims.size === 1],
    ["cell height 28px", `${cellHeight}px`, cellHeight === "28"],
    ["empty vs lowest step", `${empty} vs ${range[0]} — ${emptyVsLowest}`, emptyVsLowest >= 30],
  ]

  console.log(`\n${mode.toUpperCase()}  canvas ${canvas}  ramp ${range[0]} → ${range.at(-1)}`)
  for (const [name, value, ok] of checks) {
    if (!ok) failures += 1
    console.log(`  ${ok ? "PASS" : "FAIL"}  ${name.padEnd(22)} ${value}`)
  }
}

console.log(failures === 0 ? "\nAll checks passed." : `\n${failures} check(s) failed.`)
process.exit(failures > 0 ? 1 : 0)
