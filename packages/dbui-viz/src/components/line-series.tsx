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
 * @standard Line Series
 * @guideline Use for any metric over time — usage, spend, failures, query counts
 * @guideline Omit axes (showAxis={false}) for an inline sparkline inside a card or table cell
 * @guideline Leave `palette` alone. `sequential-5` is the single-series accent every chart in the system draws in, and the Figma components are bound to it — override only when the series carries a state, and then reach for a `level-*` step
 * @guideline Pass `xType="ordinal"` for pre-bucketed labels like "Jul 16". Column order is the order of `data`
 * @constraint The end dot marks "latest value" — it is hidden automatically for multi-series charts
 * @constraint Multi-series colours come from `VIZ_SERIES_ORDER` and are not yours to set — `palette` styles one series, and a chart with several is naming them by position
 * @constraint Always pass a meaningful `label` so the chart is announced to screen readers
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=4839-17735
 */

export interface LinePoint {
  /** Time or category value. ISO date strings work with the default temporal scale. */
  x: string | number
  /** Numeric value. */
  y: number
  /** Optional series name — supply to render multiple lines. */
  series?: string
}

export interface LineSeriesProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  data: LinePoint[]
  /** Accessible description of the chart. */
  label?: string
  /** Series color. `sequential-5` is the single-series accent the system draws in. */
  palette?: VizPaletteName
  /** Fill the area under the line. */
  area?: boolean
  height?: number
  showAxis?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  /** Mark the latest point with a dot. Ignored for multi-series data. */
  showEndDot?: boolean
  xType?: "temporal" | "ordinal" | "quantitative"
  yTickCount?: number
  interpolate?: "linear" | "monotone" | "step"
}

function LineSeries({
  data,
  label = "Line chart",
  palette = "sequential-5",
  area = true,
  height = 172,
  showAxis = true,
  showXAxis,
  showYAxis,
  showEndDot = true,
  xType = "temporal",
  yTickCount = 3,
  interpolate = "linear",
  className,
  ...props
}: LineSeriesProps) {
  const theme = useVizTheme()
  const [ref, { width }] = useMeasure<HTMLDivElement>()

  const withXAxis = showXAxis ?? showAxis
  const withYAxis = showYAxis ?? showAxis

  const seriesNames = React.useMemo(
    () =>
      Array.from(
        new Set(data.map((point) => point.series).filter(Boolean) as string[])
      ),
    [data]
  )
  const isMultiSeries = seriesNames.length > 1

  const spec = React.useMemo<VisualizationSpec>(() => {
    const accent = theme.palettes[palette].solid
    const seriesColors = seriesNames.map(
      (_, index) =>
        theme.palettes[VIZ_SERIES_ORDER[index % VIZ_SERIES_ORDER.length]].solid
    )

    const xEncoding = {
      field: "x",
      type: xType,
      axis: withXAxis
        ? { labelAngle: 0, tickCount: 5, title: null, grid: false }
        : null,
      scale: { nice: false },
      // An ordinal axis sorts alphabetically unless told otherwise, which put
      // "Jul 16" before "Jul 2" and reversed a chronological run. `null` keeps
      // the caller's order, which is the only order a time series can have.
      ...(xType === "ordinal" ? { sort: null } : {}),
    }
    const yEncoding = {
      field: "y",
      type: "quantitative" as const,
      axis: withYAxis ? { tickCount: yTickCount, title: null } : null,
    }
    const colorEncoding = isMultiSeries
      ? {
          field: "series",
          type: "nominal" as const,
          scale: { domain: seriesNames, range: seriesColors },
          legend: { orient: "bottom" as const, title: null },
        }
      : undefined

    const layers: Record<string, unknown>[] = []

    if (area) {
      layers.push({
        mark: {
          type: "area",
          line: false,
          fill: accent,
          fillOpacity: isMultiSeries ? 0.1 : 0.08,
        },
        encoding: colorEncoding
          ? { x: xEncoding, y: yEncoding, color: colorEncoding }
          : { x: xEncoding, y: yEncoding },
      })
    }

    layers.push({
      mark: {
        type: "line",
        strokeWidth: 1.5,
        strokeCap: "round",
        strokeJoin: "round",
        interpolate,
        ...(colorEncoding ? {} : { stroke: accent }),
      },
      encoding: colorEncoding
        ? { x: xEncoding, y: yEncoding, color: colorEncoding }
        : { x: xEncoding, y: yEncoding },
    })

    if (showEndDot && !isMultiSeries && data.length > 0) {
      // The dot shares the layers' encodings rather than overriding the axis to
      // null. Vega-Lite resolves axes across the whole view, so one layer
      // asking for no axis takes the axis off every layer — which is why a
      // chart with showAxis on still drew none.
      layers.push({
        data: { values: [data[data.length - 1]] },
        mark: { type: "point", filled: true, size: 40, fill: accent },
        encoding: { x: xEncoding, y: yEncoding },
      })
    }

    return {
      $schema: "https://vega.github.io/schema/vega-lite/v6.json",
      config: vizVegaConfig(theme),
      width: Math.max(width, 0),
      height,
      autosize: { type: "fit", contains: "padding" },
      data: { values: data },
      layer: layers,
    } as unknown as VisualizationSpec
  }, [
    area,
    data,
    height,
    interpolate,
    isMultiSeries,
    palette,
    seriesNames,
    showEndDot,
    theme,
    width,
    withXAxis,
    withYAxis,
    xType,
    yTickCount,
  ])

  return (
    <div
      ref={ref}
      data-slot="line-series"
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

export { LineSeries }
