import { defineConfig } from "tsup"

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "components/line-series": "src/components/line-series.tsx",
    "components/bar-chart": "src/components/bar-chart.tsx",
    "components/segmented-bar": "src/components/segmented-bar.tsx",
    "components/donut-chart": "src/components/donut-chart.tsx",
    "components/treemap": "src/components/treemap.tsx",
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
