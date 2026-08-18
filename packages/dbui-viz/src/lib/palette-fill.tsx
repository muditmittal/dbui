import type { VizPaletteName, VizTint } from "./theme"

/**
 * Palette name → the Tailwind fill a DOM mark paints with.
 *
 * The charts resolve `--db-*` into concrete values because Vega specs cannot
 * read a custom property. A mark drawn as a real element has no such problem, so
 * it names the utility and lets the cascade resolve it — which is also what
 * keeps light and dark free: the token flips underneath and the class does not
 * move. Resolving through `useVizTheme` here would trade that for a paint after
 * hydration and a value React holds rather than CSS.
 *
 * Stated beside `PALETTE_VARS` rather than derived from it because the utility
 * name has to appear as a literal somewhere Tailwind scans — a template string
 * built at runtime generates nothing. `.tsx` for the same reason: the portal's
 * `@source` globs reach `.tsx` only, so the same map in a `.ts` file compiles
 * and then paints nothing.
 */
export const PALETTE_FILL: Record<VizPaletteName, string> = {
  "categorical-1": "bg-viz-categorical-1",
  "categorical-2": "bg-viz-categorical-2",
  "categorical-3": "bg-viz-categorical-3",
  "categorical-4": "bg-viz-categorical-4",
  "categorical-5": "bg-viz-categorical-5",
  "categorical-6": "bg-viz-categorical-6",
  "categorical-7": "bg-viz-categorical-7",
  "categorical-8": "bg-viz-categorical-8",
  "categorical-9": "bg-viz-categorical-9",
  "categorical-10": "bg-viz-categorical-10",
  "sequential-1": "bg-viz-sequential-1",
  "sequential-2": "bg-viz-sequential-2",
  "sequential-3": "bg-viz-sequential-3",
  "sequential-4": "bg-viz-sequential-4",
  "sequential-5": "bg-viz-sequential-5",
  "sequential-6": "bg-viz-sequential-6",
  "sequential-7": "bg-viz-sequential-7",
  "sequential-8": "bg-viz-sequential-8",
  "sequential-9": "bg-viz-sequential-9",
  "sequential-10": "bg-viz-sequential-10",
  "level-pass": "bg-viz-level-pass-base",
  "level-high": "bg-viz-level-high-base",
  "level-medium": "bg-viz-level-medium-base",
  "level-low": "bg-viz-level-low-base",
  "level-info": "bg-viz-level-info-base",
  positive: "bg-viz-level-pass-base",
  negative: "bg-viz-level-high-base",
  neutral: "bg-viz-neutral-base",
  "neutral-subtle": "bg-viz-neutral-subtle",
  "neutral-strong": "bg-viz-neutral-strong",
}

/**
 * Tint name → the Tailwind fill a mark carrying content paints with.
 *
 * Separate from `PALETTE_FILL` because these are the `subtle` steps rather than
 * the `base` ones, and they are the only fills a `VizTint` consumer may take.
 */
export const TINT_FILL: Record<VizTint, string> = {
  "sequential-1": "bg-viz-sequential-1",
  "sequential-2": "bg-viz-sequential-2",
  "sequential-3": "bg-viz-sequential-3",
  "sequential-4": "bg-viz-sequential-4",
  "level-pass-subtle": "bg-viz-level-pass-subtle",
  "level-high-subtle": "bg-viz-level-high-subtle",
  "level-medium-subtle": "bg-viz-level-medium-subtle",
  "level-low-subtle": "bg-viz-level-low-subtle",
  "level-info-subtle": "bg-viz-level-info-subtle",
}
