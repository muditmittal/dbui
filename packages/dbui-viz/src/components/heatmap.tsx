"use client"

import * as React from "react"
import { VegaEmbed } from "react-vega"
import type { VisualizationSpec } from "vega-embed"

import { cn } from "../lib/utils"
import { useMeasure } from "../lib/use-measure"
import {
  useVizTheme,
  VEGA_EMBED_OPTIONS,
  vizVegaConfig,
} from "../lib/theme"

/**
 * @standard Heatmap
 * @guideline Use for one measure across two ordered axes — activity by day and hour, failures by day and pipeline
 * @guideline The default grid is a month of days against six four-hour windows, which is the shape a usage page asks for: 30 columns, 6 rows, one cell per four hours
 * @guideline Give it the full width of the region. A cell narrower than about 8px stops being a target and starts being noise
 * @guideline `height` is the cell band, not the whole chart — the axis adds below it. 168 over six rows is the 28px cell the rest of the system is built on, and lands the ~208 total the usage pages already draw
 * @constraint Colour carries the magnitude, so the scale is sequential and never categorical — a hue per cell would say these cells are different kinds of thing rather than different amounts
 * @constraint A cell with no data takes `neutral-subtle` and is never the pale end of the ramp. Absent and lowest are different readings, and a reader cannot tell them apart if they share a colour
 * @constraint Both axes are band scales, so `x` is a bucket and never a time scale. A cell needs a width, a time scale has none, and Vega throws rather than degrading
 * @constraint Column order is the order of `data` — pass rows already sorted. Ordinal axes would otherwise sort alphabetically and scramble a chronological run
 * @constraint Don't label cells. At 30 columns there is no room, and the axes plus a tooltip carry it
 * @constraint Always pass a meaningful `label` so the chart is announced to screen readers
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=5038-9628
 */

export interface HeatmapCell {
  /** Column bucket. Keep short — this is an axis label, so "Jul 1", not an ISO string. */
  x: string | number
  /** Row within the column — a time band, a pipeline, a region. */
  y: string | number
  /** The magnitude this cell encodes. `null` reads as no data, not as zero. */
  value: number | null
}

export interface HeatmapProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  data: HeatmapCell[]
  label?: string
  /** The cell band, axis excluded. 168 over six rows gives the 28px cell. */
  height?: number
  showAxis?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  /** Row order, top to bottom. Defaults to first-seen order in `data`. */
  rowOrder?: (string | number)[]
  cornerRadius?: number
  /** Hairline between cells, drawn in the canvas colour. */
  cellGap?: number
}

/**
 * The steps a cell's magnitude runs through.
 *
 * Trimmed at both ends on purpose. Step 1 is near enough to the canvas that a
 * low cell would read as an empty one, and step 10 is dark enough that the
 * axis labels beside it stop being the darkest thing on the chart. The empty
 * cell takes `neutral-subtle` instead, which is the one value that means absent.
 */
const RAMP = [
  "sequential-2",
  "sequential-3",
  "sequential-4",
  "sequential-5",
  "sequential-6",
  "sequential-7",
  "sequential-8",
] as const

function Heatmap({
  data,
  label = "Heatmap",
  height = 168,
  showAxis = true,
  showXAxis,
  showYAxis,
  rowOrder,
  cornerRadius = 2,
  cellGap = 1,
  className,
  ...props
}: HeatmapProps) {
  const theme = useVizTheme()
  const [ref, { width }] = useMeasure<HTMLDivElement>()

  const withXAxis = showXAxis ?? showAxis
  const withYAxis = showYAxis ?? showAxis

  const rows = React.useMemo(
    () => rowOrder ?? Array.from(new Set(data.map((cell) => cell.y))),
    [data, rowOrder]
  )

  const spec = React.useMemo<VisualizationSpec>(() => {
    const range = RAMP.map((step) => theme.palettes[step].solid)

    return {
      $schema: "https://vega.github.io/schema/vega-lite/v6.json",
      config: vizVegaConfig(theme),
      width: Math.max(width, 0),
      height,
      // fit-x, where the other charts use fit: with `fit` the x axis eats into
      // the height, so a 6-row grid lands on 30px cells instead of 28 and the
      // one thing a heatmap has to get right is the cell. Here `height` is the
      // band and the axis adds below it.
      autosize: { type: "fit-x", contains: "padding" },
      data: { values: data },
      mark: {
        type: "rect",
        cornerRadius,
        // The gap is the canvas showing through rather than a drawn line, which
        // is how SegmentedBar separates its segments too.
        stroke: theme.background,
        strokeWidth: cellGap,
        // Vega-Lite drops rows whose encoded field is null before the mark
        // runs, so a no-data cell would go missing rather than render grey.
        // null means keep them and let the colour condition paint them.
        invalid: null,
      },
      encoding: {
        x: {
          field: "x",
          type: "ordinal",
          // `null` keeps the caller's order. An ordinal axis sorts
          // alphabetically by default, which reverses a chronological run the
          // moment the labels stop being zero-padded.
          sort: null,
          axis: withXAxis
            ? {
                labelAngle: 0,
                title: null,
                grid: false,
                // Thirty columns will not all fit. Vega drops the ones that
                // collide, which beats a fixed "every Nth" that is wrong at
                // every width but one.
                labelOverlap: true,
              }
            : null,
          scale: { paddingInner: 0, paddingOuter: 0 },
        },
        y: {
          field: "y",
          type: "ordinal",
          sort: rows as string[],
          axis: withYAxis ? { title: null, grid: false } : null,
          scale: { paddingInner: 0, paddingOuter: 0 },
        },
        color: {
          // Absent is a different reading from lowest, so it is a condition on
          // the encoding rather than a step at the pale end of the ramp.
          // `isValid` and not a `=== undefined` comparison: the Vega expression
          // language has no `undefined` literal and reads the word as a signal
          // name, which throws at parse time rather than falling back.
          condition: {
            test: "!isValid(datum.value)",
            value: theme.palettes["neutral-subtle"].solid,
          },
          field: "value",
          type: "quantitative",
          // Quantize, not the default continuous interpolation. A linear range
          // blends between the stops and paints cells in colours that are not
          // tokens; quantize buckets every cell onto one of the seven steps, so
          // every pixel is a palette value and a legend can name the buckets.
          scale: { type: "quantize", range },
          legend: null,
        },
      },
    } as VisualizationSpec
  }, [cellGap, cornerRadius, data, height, rows, theme, width, withXAxis, withYAxis])

  return (
    <div
      ref={ref}
      data-slot="heatmap"
      role="img"
      aria-label={label}
      className={cn("w-full", className)}
      {...props}
    >
      {width > 0 ? (
        <VegaEmbed spec={spec} options={VEGA_EMBED_OPTIONS} />
      ) : null}
    </div>
  )
}

export { Heatmap }
