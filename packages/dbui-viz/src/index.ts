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
export {
  Heatmap,
  type HeatmapCell,
  type HeatmapProps,
} from "./components/heatmap"

// DOM marks. Same palette vocabulary, no Vega — a page that only needs these
// pulls no chart runtime through the per-component paths.
export {
  Leaderboard,
  type LeaderboardItem,
  type LeaderboardPalette,
  type LeaderboardProps,
} from "./components/leaderboard"
export { type VizTint } from "./lib/theme"
export { Legend, type LegendItem, type LegendProps } from "./components/legend"

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

export { PALETTE_FILL, TINT_FILL } from "./lib/palette-fill"

// Utilities
export { cn } from "./lib/utils"
export { useMeasure, type Size } from "./lib/use-measure"
