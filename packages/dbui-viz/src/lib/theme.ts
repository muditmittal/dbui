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
 * `--viz-*` tokens (plus the existing dbui semantic tokens for axes and text)
 * into concrete values at runtime, and re-resolves them when light/dark flips.
 *
 * Requires `dbui/tokens/viz.css` to be loaded. Fallbacks mirror the light-mode
 * token values so SSR and tests render sensibly without a stylesheet.
 */

export type VizPaletteName =
  | "blue"
  | "blueMedium"
  | "blueLight"
  | "orange"
  | "orangeMedium"
  | "orangeLight"
  | "green"
  | "red"
  | "neutral"

export interface VizPalette {
  /** Flat mark fill and legend swatch. */
  solid: string
  /** 1px mark stroke. */
  border: string
  /** Gradient start — top of a vertical gradient. */
  from: string
  /** Gradient end — bottom of a vertical gradient. */
  to: string
}

export interface VizTreemapTheme {
  blueScale: string[]
  orangeScale: string[]
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

export interface VizTheme {
  palettes: Record<VizPaletteName, VizPalette>
  treemap: VizTreemapTheme
  foreground: string
  mutedForeground: string
  border: string
  background: string
  fontSans: string
  fontMono: string
  isDark: boolean
}

const PALETTE_VARS: Record<VizPaletteName, string> = {
  blue: "--viz-blue",
  blueMedium: "--viz-blue-medium",
  blueLight: "--viz-blue-light",
  orange: "--viz-orange",
  orangeMedium: "--viz-orange-medium",
  orangeLight: "--viz-orange-light",
  green: "--viz-green",
  red: "--viz-red",
  neutral: "--viz-neutral",
}

const FALLBACK: VizTheme = {
  palettes: {
    blue: { solid: "#2f7fd3", border: "#2f7fd3", from: "#1f6fd1", to: "#4f9fe5" },
    blueMedium: { solid: "#5aafea", border: "#5aafea", from: "#7cc5f3", to: "#3f9de6" },
    blueLight: { solid: "#a7dcf9", border: "#a7dcf9", from: "#cfeaff", to: "#8fd0f5" },
    orange: { solid: "#d86a1e", border: "#d86a1e", from: "#c45a10", to: "#e88a40" },
    orangeMedium: { solid: "#f4a24a", border: "#f4a24a", from: "#e89840", to: "#f4b060" },
    orangeLight: { solid: "#f9cc8e", border: "#f9cc8e", from: "#f5c070", to: "#fbdca0" },
    green: {
      solid: "#2faf67",
      border: "#2faf67",
      from: "rgba(47, 175, 103, 0.8)",
      to: "rgba(91, 207, 142, 0.8)",
    },
    red: { solid: "#d94a3a", border: "#d94a3a", from: "#f08a7a", to: "#d94a3a" },
    neutral: { solid: "#d1d9e1", border: "#d1d9e1", from: "#eff1f5", to: "#dde3e8" },
  },
  treemap: {
    blueScale: ["#cfeaff", "#a7dcf9", "#7cc5f3", "#5aafea", "#3f9de6", "#2f7fd3", "#1f6fd1"],
    orangeScale: [
      "#fbdca0",
      "#f9cc8e",
      "#f5c070",
      "#f4b060",
      "#f4a24a",
      "#e88a40",
      "#d86a1e",
      "#c45a10",
    ],
    groupSurface: "#e8f4fc",
    groupSurfaceStrong: "#d7edfe",
    groupSurfaceHover: "#c5e3f6",
    groupBorder: "#4299e0",
    groupBorderHover: "#0e538b",
    leafSurface: "#d7edfe",
    leafSurfaceHover: "#b8dcf8",
    leafBorderHover: "#4299e0",
    otherSurface: "#e6f4ff",
    otherBorder: "#7ec4f0",
  },
  foreground: "#161616",
  mutedForeground: "#6f6f6f",
  border: "#ebebeb",
  background: "#ffffff",
  fontSans: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
  fontMono: '"SF Mono", SFMono-Regular, ui-monospace, monospace',
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

/** Resolve the current viz theme from CSS custom properties. */
export function resolveVizTheme(scope?: Element | null): VizTheme {
  const styles = reader(scope)
  if (!styles) return FALLBACK

  const palettes = {} as Record<VizPaletteName, VizPalette>
  for (const name of Object.keys(PALETTE_VARS) as VizPaletteName[]) {
    const prefix = PALETTE_VARS[name]
    const base = FALLBACK.palettes[name]
    palettes[name] = {
      solid: readVar(styles, `${prefix}-solid`, base.solid),
      border: readVar(styles, `${prefix}-border`, base.border),
      from: readVar(styles, `${prefix}-from`, base.from),
      to: readVar(styles, `${prefix}-to`, base.to),
    }
  }

  const blueScale = FALLBACK.treemap.blueScale.map((fallbackColor, index) =>
    readVar(styles, `--viz-treemap-blue-${index + 1}`, fallbackColor)
  )
  const orangeScale = FALLBACK.treemap.orangeScale.map((fallbackColor, index) =>
    readVar(styles, `--viz-treemap-orange-${index + 1}`, fallbackColor)
  )

  return {
    palettes,
    treemap: {
      blueScale,
      orangeScale,
      groupSurface: readVar(styles, "--viz-treemap-group-surface", FALLBACK.treemap.groupSurface),
      groupSurfaceStrong: readVar(
        styles,
        "--viz-treemap-group-surface-strong",
        FALLBACK.treemap.groupSurfaceStrong
      ),
      groupSurfaceHover: readVar(
        styles,
        "--viz-treemap-group-surface-hover",
        FALLBACK.treemap.groupSurfaceHover
      ),
      groupBorder: readVar(styles, "--viz-treemap-group-border", FALLBACK.treemap.groupBorder),
      groupBorderHover: readVar(
        styles,
        "--viz-treemap-group-border-hover",
        FALLBACK.treemap.groupBorderHover
      ),
      leafSurface: readVar(styles, "--viz-treemap-leaf-surface", FALLBACK.treemap.leafSurface),
      leafSurfaceHover: readVar(
        styles,
        "--viz-treemap-leaf-surface-hover",
        FALLBACK.treemap.leafSurfaceHover
      ),
      leafBorderHover: readVar(
        styles,
        "--viz-treemap-leaf-border-hover",
        FALLBACK.treemap.leafBorderHover
      ),
      otherSurface: readVar(styles, "--viz-treemap-other-surface", FALLBACK.treemap.otherSurface),
      otherBorder: readVar(styles, "--viz-treemap-other-border", FALLBACK.treemap.otherBorder),
    },
    foreground: readVar(styles, "--foreground", FALLBACK.foreground),
    mutedForeground: readVar(styles, "--muted-foreground", FALLBACK.mutedForeground),
    border: readVar(styles, "--border", FALLBACK.border),
    background: readVar(styles, "--background", FALLBACK.background),
    fontSans: readVar(styles, "--font-sans", FALLBACK.fontSans),
    fontMono: readVar(styles, "--font-mono", FALLBACK.fontMono),
    isDark:
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark"),
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

/** Ordered palette used when a series has no explicit palette assignment. */
export const VIZ_SERIES_ORDER: VizPaletteName[] = [
  "blue",
  "blueMedium",
  "blueLight",
  "orange",
  "orangeMedium",
  "orangeLight",
  "green",
  "red",
  "neutral",
]

/**
 * Shared Vega/Vega-Lite config: axis, legend and text styling pulled from dbui
 * tokens so every chart inherits Databricks typography (12px labels) and the
 * current colour mode.
 */
export function vizVegaConfig(theme: VizTheme) {
  return {
    background: "transparent",
    font: theme.fontSans,
    axis: {
      labelFont: theme.fontSans,
      labelFontSize: 12,
      labelColor: theme.mutedForeground,
      labelPadding: 6,
      titleFont: theme.fontSans,
      titleFontSize: 12,
      titleColor: theme.mutedForeground,
      titleFontWeight: 400,
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
      labelFontSize: 12,
      labelColor: theme.mutedForeground,
      titleFont: theme.fontSans,
      titleFontSize: 12,
      titleColor: theme.mutedForeground,
      symbolType: "circle",
      symbolSize: 64,
    },
    view: { stroke: null },
  }
}
