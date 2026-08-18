"use client"

import * as React from "react"

import { cn } from "../lib/utils"
import { PALETTE_FILL } from "../lib/palette-fill"
import type { VizPaletteName } from "../lib/theme"

/**
 * @standard Legend
 * @guideline Use when a chart needs a key its own legend cannot draw — the value column beside each label is the reason this exists
 * @guideline Pair with DonutChart or Treemap and turn their own legend off, so one key is drawn once
 * @guideline Give each item the palette its slice took. A key whose swatch disagrees with the chart is worse than no key
 * @guideline Order items to match the chart, largest first, so a reader can walk the ring and the list together
 * @constraint Don't encode magnitude in the swatch. A swatch is an identity — length is what BarChart and Leaderboard are for
 * @constraint The name sits beside the swatch, never over it. A 12px chip is not a container
 * @constraint Keep to six rows. Past that the chart it keys is already too fine to read, and the fix is grouping the tail into "Others"
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=4968-9250
 */

/**
 * Legend — a colour key with a value column, for a chart that cannot draw its own.
 */

export interface LegendItem {
  id: string
  label: string
  /** What the row displays, already formatted. */
  value?: React.ReactNode
  /** The swatch fill. Match the slice this row keys. */
  palette?: VizPaletteName
  /** An optional glyph between the swatch and the label — an asset type. */
  icon?: React.ReactNode
}

export interface LegendProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  items: LegendItem[]
  /** The two column headings. Omit for a key with no header. */
  columns?: { label: string; value: string }
}

function Legend({ items, columns, className, ...props }: LegendProps) {
  return (
    <div
      data-slot="legend"
      className={cn("flex w-full flex-col", className)}
      {...props}
    >
      {columns ? (
        <div
          data-slot="legend-header"
          className="flex h-7 items-center gap-2 p-1 type-hint text-text-subtle"
        >
          <span className="min-w-0 flex-1 truncate">{columns.label}</span>
          <span className="shrink-0 text-right">{columns.value}</span>
        </div>
      ) : null}
      <ul className="flex flex-col">
        {items.map((item) => (
          <li
            key={item.id}
            data-slot="legend-row"
            className="flex h-7 items-center gap-2 p-1 [&_svg:not([class*='size-'])]:size-3"
          >
            <span
              data-slot="legend-swatch"
              aria-hidden="true"
              className={cn(
                "size-3 shrink-0 shape-control",
                PALETTE_FILL[item.palette ?? "neutral"]
              )}
            />
            {item.icon}
            <span className="truncate type-body text-text-base">{item.label}</span>
            {/* Right-aligned in the space the label leaves, so figures line up on
                the same edge whatever the labels beside them run to. */}
            <span className="min-w-0 flex-1 text-right type-body-bold text-text-base tabular-nums">
              {item.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export { Legend }
