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
 * @standard Donut Chart
 * @guideline Use for a small part-to-whole split where the total matters — pass `centerValue` to show it
 * @guideline Prefer SegmentedBar when the breakdown sits inline in a row or table cell
 * @guideline Keep to 6 slices or fewer; group the tail into "Others"
 * @constraint Never use a full pie — the centre hole is where the total lives
 * @constraint Always pass a meaningful `label` so the chart is announced to screen readers
 */

export interface DonutSlice {
  label: string
  value: number
  /** Semantic colour. Falls back to the standard series order. */
  palette?: VizPaletteName
}

export interface DonutChartProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  slices: DonutSlice[]
  label?: string
  size?: number
  /** Ring thickness as a fraction of the radius (0-1). */
  thickness?: number
  showLegend?: boolean
  /** Large value rendered in the middle of the ring. */
  centerValue?: string
  /** Caption under the centre value. */
  centerLabel?: string
}

function DonutChart({
  slices,
  label = "Donut chart",
  size = 172,
  thickness = 0.38,
  showLegend = true,
  centerValue,
  centerLabel,
  className,
  ...props
}: DonutChartProps) {
  const theme = useVizTheme()
  const [ref, { width }] = useMeasure<HTMLDivElement>()

  const spec = React.useMemo<VisualizationSpec>(() => {
    const domain = slices.map((slice) => slice.label)
    const range = slices.map((slice, index) => {
      const name: VizPaletteName =
        slice.palette ?? VIZ_SERIES_ORDER[index % VIZ_SERIES_ORDER.length]
      return theme.palettes[name].solid
    })

    const outerRadius = size / 2
    const innerRadius = outerRadius * (1 - thickness)

    const layers: Record<string, unknown>[] = [
      {
        mark: {
          type: "arc",
          innerRadius,
          outerRadius,
          padAngle: 0.01,
          stroke: theme.background,
          strokeWidth: 1,
        },
        encoding: {
          theta: { field: "value", type: "quantitative", stack: true },
          color: {
            field: "label",
            type: "nominal",
            scale: { domain, range },
            legend: showLegend
              ? { orient: "right", title: null }
              : null,
          },
          order: { field: "value", type: "quantitative", sort: "descending" },
        },
      },
    ]

    if (centerValue) {
      layers.push({
        data: { values: [{ text: centerValue }] },
        mark: {
          type: "text",
          fontSize: 22,
          fontWeight: 600,
          font: theme.fontSans,
          color: theme.foreground,
          dy: centerLabel ? -8 : 0,
        },
        encoding: { text: { field: "text", type: "nominal" } },
      })
    }

    if (centerLabel) {
      layers.push({
        data: { values: [{ text: centerLabel }] },
        mark: {
          type: "text",
          fontSize: 12,
          font: theme.fontSans,
          color: theme.mutedForeground,
          dy: centerValue ? 12 : 0,
        },
        encoding: { text: { field: "text", type: "nominal" } },
      })
    }

    return {
      $schema: "https://vega.github.io/schema/vega-lite/v6.json",
      config: vizVegaConfig(theme),
      width: Math.max(Math.min(width, size), 0),
      height: size,
      autosize: { type: "fit", contains: "padding" },
      data: { values: slices },
      layer: layers,
      view: { stroke: null },
    } as unknown as VisualizationSpec
  }, [
    centerLabel,
    centerValue,
    showLegend,
    size,
    slices,
    theme,
    thickness,
    width,
  ])

  return (
    <div
      ref={ref}
      data-slot="donut-chart"
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

export { DonutChart }
