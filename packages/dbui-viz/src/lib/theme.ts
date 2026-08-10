"use client"

import * as React from "react"
import type { EmbedOptions } from "vega-embed"

/**
 * Shared vega-embed options. Hoisted to module scope so the object identity is
 * stable — passing a fresh object would re-embed the view on every render.
 * SVG keeps text crisp and lets charts inherit font smoothing from the page.
 */
export const VEGA_EMBED_OPTIONS: EmbedOptions = {
  actions: false,
  renderer: "svg",
}

/**
 * Vega theming bridge for DBUI.
 *
 * Vega specs cannot read CSS custom properties, so this module resolves the
 * shipped `--db-*` semantics into concrete values at runtime, and re-resolves
 * them when light/dark flips.
 *
 * No color is written here. This file used to carry its own palette behind a
 * parallel `--viz-*` layer, which is why the charts rendered the same series
 * colors in both modes: a value spelled out in a `.ts` file has no light and
 * dark, and no linter rule reaches it either. Everything a chart draws now
 * names a token and lets the browser resolve it.
 */

/**
 * The palettes a chart may draw from.
 *
 * A numbered step is an identity — which series this is — and carries no order
 * and no magnitude. Reach for one whenever the series are peers.
 *
 * The three named ones say something about the datum rather than separating it
 * from its neighbors, so they hold still while the numbered steps shift with
 * the series count.
 */
export type VizPaletteName =
  | "categorical-1"
  | "categorical-2"
  | "categorical-3"
  | "categorical-4"
  | "categorical-5"
  | "categorical-6"
  | "categorical-7"
  | "categorical-8"
  | "categorical-9"
  | "categorical-10"
  | "positive"
  | "negative"
  | "neutral"

export interface VizPalette {
  /** Flat mark fill, mark stroke and legend swatch. */
  solid: string
  /** Gradient start — the full-strength end. */
  from: string
  /** Gradient end — the same color faded into the canvas. */
  to: string
}

export interface VizTreemapTheme {
  groupSurface: string
  groupSurfaceStrong: string
  groupSurfaceHover: string
  groupBorder: string
  groupBorderHover: string
  leafSurface: string
  leafSurfaceHover: string
  leafBorderHover: string
  otherSurface: string
  otherBorder: string
}

/** One step of the type ramp, resolved to the numbers Vega takes. */
export interface VizTypeStep {
  size: number
  weight: number
}

/**
 * The steps of the type ramp a chart may draw from.
 *
 * Keyed by ramp step rather than by role, so a chart names a step and never a
 * number — which is what makes it impossible for a chart to render at a size the
 * ramp does not define. Add a key here before a chart can use a new step.
 */
export interface VizType {
  /** Axis labels and titles, legend labels and titles, chart captions. */
  hint: VizTypeStep
  /** The one large number a chart displays, such as a donut's center total. */
  title3: VizTypeStep
}

export interface VizTheme {
  palettes: Record<VizPaletteName, VizPalette>
  treemap: VizTreemapTheme
  foreground: string
  mutedForeground: string
  border: string
  background: string
  fontSans: string
  fontMono: string
  type: VizType
  isDark: boolean
}

/**
 * VizType key → the size stop its ramp step reads, and the weight that step is.
 *
 * The ramp stopped emitting a property per style: 14 styles share 9 sizes, so
 * what ships is the stops, and `--db-font-size-hint` no longer exists. Reading
 * the stop keeps the part that mattered — a chart still follows the active type
 * context and `--db-type-scalar`, because the stop is what a context swaps.
 *
 * Weight is a literal because weight does not vary by context; it is what the
 * style *is*. Stated once here, with `FALLBACK.type` derived from it, so the two
 * cannot disagree the way they did when both carried their own copy.
 *
 * `px` is the value to use when the token layer has not loaded at all, which is
 * the only case where a number has to be restated. It is the stop's default-
 * context value.
 */
const TYPE_STEPS: Record<keyof VizType, { stop: string; weight: number; px: number }> = {
  hint: { stop: "xs", weight: 400, px: 12 },
  title3: { stop: "2xl", weight: 600, px: 20 },
}

const TYPE_KEYS = Object.keys(TYPE_STEPS) as (keyof VizType)[]

/**
 * Palette name → the semantic carrying its color.
 *
 * The numbered steps are the shipped categorical scale, one to one. The three
 * named ones are borrowed, because the viz family has ten categorical steps and
 * ten sequential steps and nothing else: it describes no state and no absence.
 *
 * `status` gives up its `text` step rather than its `border` step because only
 * `text` moves between light and dark — `status-border-positive` is one value
 * in both modes, so a chart built on it would inherit the very defect this file
 * exists to remove.
 *
 * `neutral` takes `text-disabled` for that reason and one more. Every
 * surface-role semantic is tuned to sit behind content, so at the size of a
 * donut slice all of them wash out into the canvas — `surface-disabled` and
 * `border-strong` both leave the wedge unreadable in either mode.
 * `text-disabled` is the only semantic that means inactive and is still drawn
 * to be seen against the page, which is the whole job of a mark.
 */
const PALETTE_VARS: Record<VizPaletteName, string> = {
  "categorical-1": "--db-viz-categorical-1",
  "categorical-2": "--db-viz-categorical-2",
  "categorical-3": "--db-viz-categorical-3",
  "categorical-4": "--db-viz-categorical-4",
  "categorical-5": "--db-viz-categorical-5",
  "categorical-6": "--db-viz-categorical-6",
  "categorical-7": "--db-viz-categorical-7",
  "categorical-8": "--db-viz-categorical-8",
  "categorical-9": "--db-viz-categorical-9",
  "categorical-10": "--db-viz-categorical-10",
  positive: "--db-status-text-positive",
  negative: "--db-status-text-negative",
  neutral: "--db-text-disabled",
}

/**
 * Treemap role → the sequential step it takes.
 *
 * A treemap is one hue at varying strength, which is what the sequential family
 * is for. Reading it by step rather than by value is also what fixes dark mode
 * for free: the ramp is authored in reverse under `.dark`, so a low step is
 * near the canvas and a high step is far from it in both modes, and every
 * surface here can stay low while every border stays high.
 */
const TREEMAP_VARS: Record<keyof VizTreemapTheme, string> = {
  otherSurface: "--db-viz-sequential-1",
  groupSurface: "--db-viz-sequential-2",
  groupSurfaceStrong: "--db-viz-sequential-3",
  leafSurface: "--db-viz-sequential-3",
  groupSurfaceHover: "--db-viz-sequential-4",
  otherBorder: "--db-viz-sequential-4",
  leafSurfaceHover: "--db-viz-sequential-5",
  groupBorder: "--db-viz-sequential-6",
  leafBorderHover: "--db-viz-sequential-7",
  groupBorderHover: "--db-viz-sequential-8",
}

/**
 * What a chart draws when the token layer never loaded.
 *
 * A color here would be the palette coming back — the same value in both modes,
 * unreachable by the linter, drifting from the token it copied. `currentColor`
 * is a deferral rather than a value, so an unstyled chart renders as one
 * legible monochrome shape instead of in colors that were right once.
 */
const UNRESOLVED_MARK = "currentColor"
const UNRESOLVED_SURFACE = "transparent"

/**
 * How much of the mark survives at the far end of a gradient.
 *
 * Fading toward the canvas rather than toward a lighter hue is what lets one
 * expression be right in both modes: the mark settles into the page it sits on,
 * so the fade lightens on white and darkens on black. The old palette carried a
 * hand-picked pair of stops per hue, which could only ever suit one mode.
 *
 * The amount is set to the depth the old pairs already had, read back off them
 * as a mix toward white. A shallower fade would read as a flat bar, and a
 * deeper one drops the foot of the bar to the contrast of the page.
 */
const GRADIENT_SURVIVES = "65%"

/** Build a record over a known key set, so neither map below needs a cast. */
function overKeys<K extends string, V>(
  keys: readonly K[],
  value: (key: K) => V
): Record<K, V> {
  const out = {} as Record<K, V>
  for (const key of keys) out[key] = value(key)
  return out
}

const PALETTE_NAMES = Object.keys(PALETTE_VARS) as VizPaletteName[]
const TREEMAP_ROLES = Object.keys(TREEMAP_VARS) as (keyof VizTreemapTheme)[]

const FALLBACK: VizTheme = {
  palettes: overKeys(PALETTE_NAMES, () => ({
    solid: UNRESOLVED_MARK,
    from: UNRESOLVED_MARK,
    to: UNRESOLVED_MARK,
  })),
  treemap: overKeys(TREEMAP_ROLES, () => UNRESOLVED_SURFACE),
  foreground: UNRESOLVED_MARK,
  mutedForeground: UNRESOLVED_MARK,
  border: UNRESOLVED_SURFACE,
  background: UNRESOLVED_SURFACE,
  fontSans: "inherit",
  fontMono: "monospace",
  type: overKeys(TYPE_KEYS, (key) => ({
    size: TYPE_STEPS[key].px,
    weight: TYPE_STEPS[key].weight,
  })),
  isDark: false,
}

function reader(scope?: Element | null) {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return null
  }
  const element = scope ?? document.documentElement
  return window.getComputedStyle(element)
}

function readVar(
  styles: CSSStyleDeclaration | null,
  name: string,
  fallback: string
): string {
  if (!styles) return fallback
  const value = styles.getPropertyValue(name).trim()
  return value || fallback
}

/**
 * A throwaway element the browser resolves declarations against.
 *
 * `getPropertyValue` hands back the raw token stream rather than a value, so it
 * can only read a custom property that happens to hold a literal. The ramp
 * ships as `calc(<rem> * var(--db-type-scalar))` and comes back as the calc,
 * and a gradient stop is a `color-mix()` that comes back as the mix. Setting
 * each one as a real declaration makes the browser resolve it instead, which is
 * the only reading that cannot disagree with what the page renders.
 *
 * One probe serves the whole resolve, colors and type alike, so there is a
 * single answer to "how does this package read a token".
 */
function createProbe(host: Element): HTMLSpanElement {
  const probe = document.createElement("span")
  probe.setAttribute("aria-hidden", "true")
  probe.style.position = "absolute"
  probe.style.visibility = "hidden"
  probe.style.pointerEvents = "none"
  host.appendChild(probe)
  return probe
}

/**
 * Re-emit a resolved color as rgb, whatever syntax the browser chose for it.
 *
 * A plain `var()` computes to `rgb()`, but a `color-mix()` computes to
 * `color(srgb …)`, and Vega passes both into the SVG without reading them.
 * Chrome paints either, so this is not about what renders today — it is that a
 * gradient stop would otherwise be the one value in a chart whose syntax is the
 * browser's choice rather than ours, and anything downstream that parses colors
 * only has to know one of them.
 */
function toRgb(value: string): string {
  const parsed = value.match(
    /^color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\s*\)$/
  )
  if (!parsed) return value
  const [r, g, b] = parsed.slice(1, 4).map((n) => Math.round(Number(n) * 255))
  const alpha = parsed[4] === undefined ? 1 : Number(parsed[4])
  return alpha === 1
    ? `rgb(${r}, ${g}, ${b})`
    : `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/**
 * Resolve one color expression through the probe.
 *
 * `token` is both what the expression reads and what proves the layer loaded.
 * An absent token has to short-circuit: `color` would then fall back to the ink
 * the probe inherited, which is a plausible color and not the token.
 */
function readColor(
  probe: HTMLSpanElement | null,
  styles: CSSStyleDeclaration | null,
  token: string,
  fallback: string,
  expression = `var(${token})`
): string {
  if (!probe || !styles) return fallback
  if (!readVar(styles, token, "")) return fallback
  probe.style.color = ""
  probe.style.color = expression
  return toRgb(window.getComputedStyle(probe).color) || fallback
}

/**
 * Resolve the ramp steps in `TYPE_STEPS` to px.
 *
 * Read once per theme resolve. A chart does not follow the root font size
 * afterwards — SVG text that reflowed under the reader would be worse than text
 * that holds still, and the point of sourcing from the ramp is consistency of
 * the value, not live scaling.
 */
function resolveType(
  probe: HTMLSpanElement | null,
  styles: CSSStyleDeclaration | null
): VizType {
  if (!probe || !styles) return FALLBACK.type

  const type = {} as VizType
  for (const key of TYPE_KEYS) {
    const { stop, weight } = TYPE_STEPS[key]
    const fallback = FALLBACK.type[key]
    const token = `--db-font-size-${stop}`
    if (!readVar(styles, token, "")) {
      type[key] = fallback
      continue
    }
    // The scalar is applied here rather than read off the stop, because the ramp
    // applies it in the utility body — a stop carries its plain value so a
    // context can swap it. Mirroring the utility is what keeps a chart the same
    // size as the label beside it.
    probe.style.fontSize = `calc(var(${token}) * var(--db-type-scalar, 1))`
    const size = Number.parseFloat(window.getComputedStyle(probe).fontSize)
    type[key] = { size: Number.isFinite(size) && size > 0 ? size : fallback.size, weight }
  }
  return type
}

/** Resolve the current viz theme from the shipped semantics. */
export function resolveVizTheme(scope?: Element | null): VizTheme {
  const styles = reader(scope)
  const host = scope ?? (typeof document === "undefined" ? null : document.body)
  if (!styles || !host) return FALLBACK

  const probe = createProbe(host)
  try {
    return {
      palettes: overKeys(PALETTE_NAMES, (name) => {
        const token = PALETTE_VARS[name]
        const solid = readColor(probe, styles, token, UNRESOLVED_MARK)
        return {
          solid,
          from: solid,
          to: readColor(
            probe,
            styles,
            token,
            solid,
            `color-mix(in srgb, var(${token}) ${GRADIENT_SURVIVES}, var(--db-surface-base))`
          ),
        }
      }),
      treemap: overKeys(TREEMAP_ROLES, (role) =>
        readColor(probe, styles, TREEMAP_VARS[role], UNRESOLVED_SURFACE)
      ),
      foreground: readColor(probe, styles, "--db-text-base", UNRESOLVED_MARK),
      mutedForeground: readColor(
        probe,
        styles,
        "--db-text-subtle",
        UNRESOLVED_MARK
      ),
      border: readColor(probe, styles, "--db-border-base", UNRESOLVED_SURFACE),
      background: readColor(
        probe,
        styles,
        "--db-surface-base",
        UNRESOLVED_SURFACE
      ),
      fontSans: readVar(styles, "--font-sans", FALLBACK.fontSans),
      fontMono: readVar(styles, "--font-mono", FALLBACK.fontMono),
      type: resolveType(probe, styles),
      isDark:
        typeof document !== "undefined" &&
        document.documentElement.classList.contains("dark"),
    }
  } finally {
    probe.remove()
  }
}

/**
 * useVizTheme — resolved viz theme that follows light/dark changes.
 *
 * Re-resolves whenever the `class` attribute on <html> changes, which is how
 * dbui toggles dark mode (`@custom-variant dark (&:is(.dark *))`).
 */
export function useVizTheme(scope?: Element | null): VizTheme {
  const [theme, setTheme] = React.useState<VizTheme>(FALLBACK)

  React.useEffect(() => {
    const sync = () => setTheme(resolveVizTheme(scope))
    sync()

    if (typeof MutationObserver === "undefined") return
    const observer = new MutationObserver(sync)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style", "data-theme"],
    })
    return () => observer.disconnect()
  }, [scope])

  return theme
}

/** A Vega vertical linear gradient built from a palette's from/to stops. */
export function verticalGradient(palette: VizPalette) {
  return {
    gradient: "linear" as const,
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 1,
    stops: [
      { offset: 0, color: palette.from },
      { offset: 1, color: palette.to },
    ],
  }
}

/** A Vega horizontal linear gradient built from a palette's from/to stops. */
export function horizontalGradient(palette: VizPalette) {
  return {
    gradient: "linear" as const,
    x1: 0,
    y1: 0,
    x2: 1,
    y2: 0,
    stops: [
      { offset: 0, color: palette.from },
      { offset: 1, color: palette.to },
    ],
  }
}

/**
 * The order a chart assigns colors in when a series carries none of its own.
 *
 * Numbered rather than named, so a chart cannot express a preference for a hue.
 * The scale is an identity, and the first series being one color rather than
 * another is a fact about its position and not about the data.
 */
export const VIZ_SERIES_ORDER: VizPaletteName[] = [
  "categorical-1",
  "categorical-2",
  "categorical-3",
  "categorical-4",
  "categorical-5",
  "categorical-6",
  "categorical-7",
  "categorical-8",
  "categorical-9",
  "categorical-10",
]

/**
 * Shared Vega/Vega-Lite config: axis, legend and text styling pulled from dbui
 * tokens so every chart inherits Databricks typography and the current color
 * mode.
 *
 * Axis and legend text is chrome around the data — the same role the ramp calls
 * `hint`, and the same step the captions beside a chart already take.
 */
export function vizVegaConfig(theme: VizTheme) {
  return {
    background: "transparent",
    font: theme.fontSans,
    axis: {
      labelFont: theme.fontSans,
      labelFontSize: theme.type.hint.size,
      labelColor: theme.mutedForeground,
      labelPadding: 6,
      titleFont: theme.fontSans,
      titleFontSize: theme.type.hint.size,
      titleColor: theme.mutedForeground,
      titleFontWeight: theme.type.hint.weight,
      domain: false,
      ticks: false,
      grid: false,
    },
    axisY: {
      grid: true,
      gridColor: theme.border,
      gridDash: [],
      gridWidth: 1,
    },
    legend: {
      labelFont: theme.fontSans,
      labelFontSize: theme.type.hint.size,
      labelColor: theme.mutedForeground,
      titleFont: theme.fontSans,
      titleFontSize: theme.type.hint.size,
      titleColor: theme.mutedForeground,
      symbolType: "circle",
      symbolSize: 64,
    },
    view: { stroke: null },
  }
}
