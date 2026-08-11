"use client"

import * as React from "react"

import { SegmentControl, SegmentControlItem } from "dbui/components/ui/segment-control"

import type { Token } from "@/stories/tokens/token-data"

/**
 * Previews the dimension scales at another density, for one section.
 *
 * The Scalars panel claims that a stop is its number times the grid unit times the
 * density dial, and that turning the dial moves every scale without a stop being
 * rewritten. This is that claim, made checkable — the tables above redraw and a
 * reader can see which families move and which do not.
 *
 * Density rather than the root font size, which the footer already offers. Density
 * is the dimension-specific dial: it reaches space, size and radius and deliberately
 * does not reach type, so it is the one that isolates what this section is about.
 */
export const DENSITY_STOPS = ["1", "1.2"] as const
export type Density = (typeof DENSITY_STOPS)[number]

/**
 * Redeclares the scales so the dial actually reaches them.
 *
 * Setting `--db-density-scalar` alone moves nothing here, and the reason is worth
 * knowing: every stop is authored as `calc(unit * n * scalar)` on `:root`, so it is
 * computed there against `:root`'s own scalar and descendants inherit the finished
 * pixel value. A subtree that lowers the dial inherits 12px and stays at 12px.
 *
 * Re-setting each stop on the scope re-runs the same calc where the new dial is in
 * scope. The calc is not rewritten — it is the string the generator emitted, handed
 * back verbatim — so this cannot drift from the formula it is demonstrating.
 *
 * Border is absent on purpose, and its absence is the interesting part: it ships as
 * literal px rather than a calc, so it has nothing to re-resolve and stays 1px at
 * every density. The panel says so, and this makes it visible.
 */
export function densityStyle(density: Density, families: Token[][]): React.CSSProperties {
  const style: Record<string, string> = { "--db-density-scalar": density }
  for (const family of families) {
    for (const token of family) {
      if (token.value.startsWith("calc(")) style[`--db-${token.name}`] = token.value
    }
  }
  return style as React.CSSProperties
}

export function useDensity(): [Density, (next: Density) => void] {
  return React.useState<Density>("1")
}

/** The same control, size and slot as the color and type-context switches. */
export function DensityControl({
  value,
  onValueChange,
  label,
}: {
  value: Density
  onValueChange: (next: Density) => void
  label: string
}) {
  return (
    <SegmentControl
      size="md"
      value={[value]}
      onValueChange={(next) => onValueChange(typeof next[0] === "string" ? (next[0] as Density) : value)}
      aria-label={label}
    >
      {DENSITY_STOPS.map((stop) => (
        <SegmentControlItem key={stop} value={stop}>
          {stop}x
        </SegmentControlItem>
      ))}
    </SegmentControl>
  )
}
