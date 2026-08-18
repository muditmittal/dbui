import { defineConfig } from "tsup"

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "components/line-series": "src/components/line-series.tsx",
    "components/bar-chart": "src/components/bar-chart.tsx",
    "components/segmented-bar": "src/components/segmented-bar.tsx",
    "components/donut-chart": "src/components/donut-chart.tsx",
    "components/treemap": "src/components/treemap.tsx",
    "components/heatmap": "src/components/heatmap.tsx",
    // The two DOM marks. These need their own entries precisely because they are
    // the ones with no Vega in them — without a per-component path a consumer has
    // to reach through the barrel and pulls the whole chart runtime with it.
    "components/leaderboard": "src/components/leaderboard.tsx",
    "components/legend": "src/components/legend.tsx",
    "lib/theme": "src/lib/theme.ts",
    "lib/utils": "src/lib/utils.ts",
    "lib/use-measure": "src/lib/use-measure.ts",
  },
  format: ["esm"],
  dts: false,
  sourcemap: true,
  splitting: true,
  treeshake: true,
  // Vega is large and only needed by this package's charts, so it stays
  // external (same rationale dbui uses for recharts). Small utilities are
  // inlined so consumers don't need to install them.
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    "vega",
    "vega-lite",
    "react-vega",
  ],
  noExternal: ["clsx", "tailwind-merge"],
  outDir: "dist",
  clean: true,
  jsx: "automatic",
  banner: { js: '"use client";' },
})
