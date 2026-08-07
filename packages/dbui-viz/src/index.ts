// DBUI Viz — Vega data visualizations for Databricks UI
//
// Requires the dbui token layer to be loaded:
//   @import "dbui/tokens/tokens.css";
//
// Charts read the shipped --db-* semantics at runtime. There is no viz-only
// token layer any more, and nothing here needs viz.css.

export { LineSeries, type LinePoint, type LineSeriesProps } from "./components/line-series"
export { BarChart, type BarDatum, type BarChartProps } from "./components/bar-chart"
export {
  SegmentedBar,
  type Segment,
  type SegmentedBarProps,
} from "./components/segmented-bar"
export {
  DonutChart,
  type DonutSlice,
  type DonutChartProps,
} from "./components/donut-chart"
export {
  Treemap,
  type TreemapGroup,
  type TreemapLeaf,
  type TreemapProps,
  type TreemapSelection,
} from "./components/treemap"

// Theming
export {
  resolveVizTheme,
  useVizTheme,
  verticalGradient,
  horizontalGradient,
  vizVegaConfig,
  VIZ_SERIES_ORDER,
  type VizPalette,
  type VizPaletteName,
  type VizTheme,
  type VizTreemapTheme,
  type VizType,
  type VizTypeStep,
} from "./lib/theme"

// Utilities
export { cn } from "./lib/utils"
export { useMeasure, type Size } from "./lib/use-measure"
