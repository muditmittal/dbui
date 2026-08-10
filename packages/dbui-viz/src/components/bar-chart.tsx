"use client"

import * as React from "react"
import { VegaEmbed } from "react-vega"
import type { VisualizationSpec } from "vega-embed"

import { cn } from "../lib/utils"
import { useMeasure } from "../lib/use-measure"
import {
  useVizTheme,
  verticalGradient,
  horizontalGradient,
  VEGA_EMBED_OPTIONS,
  VIZ_SERIES_ORDER,
  vizVegaConfig,
  type VizPaletteName,
} from "../lib/theme"

/**
 * @standard Bar Chart
 * @guideline Use for counts or amounts compared across categories or time buckets
 * @guideline Set orientation="horizontal" when category labels are long
 * @guideline Pass `series` on each datum to produce a stacked bar chart
 * @constraint Bars use a gradient fill plus a 1px border — this is the GovernanceHub bar treatment, do not flatten it
 * @constraint Always pass a meaningful `label` so the chart is announced to screen readers
 */

export interface BarDatum {
  /** Category or time bucket. */
  x: string | number
  /** Numeric value. */
  y: number
  /** Optional series name — supply to stack bars. */
  series?: string
}

export interface BarChartProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  data: BarDatum[]
  label?: string
  palette?: VizPaletteName
  orientation?: "vertical" | "horizontal"
  height?: number
  showAxis?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  /** Normalize stacked bars to 100%. */
  normalize?: boolean
  xType?: "temporal" | "ordinal" | "quantitative"
  yTickCount?: number
  cornerRadius?: number
}

function BarChart({
  data,
  label = "Bar chart",
  palette = "categorical-1",
  orientation = "vertical",
  height = 172,
  showAxis = true,
  showXAxis,
  showYAxis,
  normalize = false,
  xType = "ordinal",
  yTickCount = 3,
  cornerRadius = 2,
  className,
  ...props
}: BarChartProps) {
  const theme = useVizTheme()
  const [ref, { width }] = useMeasure<HTMLDivElement>()

  const withXAxis = showXAxis ?? showAxis
  const withYAxis = showYAxis ?? showAxis
  const isHorizontal = orientation === "horizontal"

  const seriesNames = React.useMemo(
    () =>
      Array.from(
        new Set(data.map((datum) => datum.series).filter(Boolean) as string[])
      ),
    [data]
  )
  const isStacked = seriesNames.length > 1

  const spec = React.useMemo<VisualizationSpec>(() => {
    const activePalette = theme.palettes[palette]
    const gradient = isHorizontal
      ? horizontalGradient(activePalette)
      : verticalGradient(activePalette)

    const categoryEncoding = {
      field: "x",
      type: xType,
      axis: (isHorizontal ? withYAxis : withXAxis)
        ? { labelAngle: 0, title: null, grid: false }
        : null,
      scale: { paddingInner: 0.25, paddingOuter: 0.1 },
    }
    const valueEncoding = {
      field: "y",
      type: "quantitative" as const,
      stack: isStacked ? (normalize ? "normalize" : "zero") : null,
      axis: (isHorizontal ? withXAxis : withYAxis)
        ? { tickCount: yTickCount, title: null }
        : null,
    }

    const colorEncoding = isStacked
      ? {
          field: "series",
          type: "nominal" as const,
          scale: {
            domain: seriesNames,
            range: seriesNames.map(
              (_, index) =>
                theme.palettes[VIZ_SERIES_ORDER[index % VIZ_SERIES_ORDER.length]]
                  .solid
            ),
          },
          legend: { orient: "bottom" as const, title: null },
        }
      : undefined

    return {
      $schema: "https://vega.github.io/schema/vega-lite/v6.json",
      config: vizVegaConfig(theme),
      width: Math.max(width, 0),
      height,
      autosize: { type: "fit", contains: "padding" },
      data: { values: data },
      mark: {
        type: "bar",
        cornerRadiusEnd: cornerRadius,
        stroke: activePalette.solid,
        strokeWidth: 1,
        ...(colorEncoding ? {} : { fill: gradient }),
      },
      encoding: {
        ...(isHorizontal
          ? { y: categoryEncoding, x: valueEncoding }
          : { x: categoryEncoding, y: valueEncoding }),
        ...(colorEncoding ? { color: colorEncoding } : {}),
      },
    } as VisualizationSpec
  }, [
    cornerRadius,
    data,
    height,
    isHorizontal,
    isStacked,
    normalize,
    palette,
    seriesNames,
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
      data-slot="bar-chart"
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

export { BarChart }
