"use client"

import * as React from "react"
import { VegaEmbed } from "react-vega"
import type { VisualizationSpec } from "vega-embed"

import { cn } from "../lib/utils"
import { useMeasure } from "../lib/use-measure"
import {
  useVizTheme,
  VEGA_EMBED_OPTIONS,
  VIZ_SERIES_ORDER,
  vizVegaConfig,
  type VizPaletteName,
} from "../lib/theme"

/**
 * @standard Segmented Bar
 * @guideline Use for a part-to-whole breakdown in a single row — asset types, cost split, health mix
 * @guideline Keep to 5 segments or fewer; group the tail into an "Others" segment
 * @guideline Assign `palette` per segment when a segment means something — positive, negative or neutral for empty
 * @constraint Segments use solid palette fills, not gradients — at 12px tall a gradient reads as flat, and Vega cannot bind a gradient per datum
 * @constraint Always pass a meaningful `label` so the chart is announced to screen readers
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=4839-18429
 */

export interface Segment {
  label: string
  value: number
  /** Segment color. Falls back to the standard series order. */
  palette?: VizPaletteName
}

export interface SegmentedBarProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  segments: Segment[]
  label?: string
  /** Thickness of the bar in pixels. */
  barHeight?: number
  showLegend?: boolean
  /** Round the bar ends. */
  cornerRadius?: number
}

function SegmentedBar({
  segments,
  label = "Segmented bar",
  barHeight = 12,
  showLegend = true,
  cornerRadius = 2,
  className,
  ...props
}: SegmentedBarProps) {
  const theme = useVizTheme()
  const [ref, { width }] = useMeasure<HTMLDivElement>()

  const spec = React.useMemo<VisualizationSpec>(() => {
    const domain = segments.map((segment) => segment.label)
    const range = segments.map((segment, index) => {
      const name: VizPaletteName =
        segment.palette ?? VIZ_SERIES_ORDER[index % VIZ_SERIES_ORDER.length]
      return theme.palettes[name].solid
    })

    return {
      $schema: "https://vega.github.io/schema/vega-lite/v6.json",
      config: vizVegaConfig(theme),
      width: Math.max(width, 0),
      height: barHeight,
      autosize: { type: "fit", contains: "padding" },
      data: { values: segments },
      mark: {
        type: "bar",
        cornerRadius,
        // A hairline in the canvas color separates adjacent segments.
        stroke: theme.background,
        strokeWidth: 1,
        height: barHeight,
      },
      encoding: {
        x: {
          field: "value",
          type: "quantitative",
          stack: "normalize",
          axis: null,
          title: null,
        },
        color: {
          field: "label",
          type: "nominal",
          scale: { domain, range },
          legend: showLegend
            ? { orient: "bottom", title: null, direction: "horizontal" }
            : null,
        },
        order: { field: "value", type: "quantitative", sort: "descending" },
      },
    } as VisualizationSpec
  }, [barHeight, cornerRadius, segments, showLegend, theme, width])

  return (
    <div
      ref={ref}
      data-slot="segmented-bar"
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

export { SegmentedBar }
