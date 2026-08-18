import figma from "@figma/code-connect"
import { DonutChart } from "../packages/dbui-viz/src/components/donut-chart"
import { Legend } from "../packages/dbui-viz/src/components/legend"

// `Viz/Medium/Donut` — 400x168. `Centred` is the ring alone; `Legend` pairs it with
// `Viz/Inner/Legend`, because Vega draws a legend but cannot put a figure beside
// each label. So `Type` is a composition and not a prop: `showLegend` stays false
// either way and the difference is whether a second component sits beside the ring.
const slices = [
  { label: "Asset level", value: 23.4, palette: "sequential-7" as const },
  { label: "Schema level", value: 62.1, palette: "sequential-5" as const },
  { label: "Catalog level", value: 6.1, palette: "sequential-3" as const },
  { label: "Metastore level", value: 1.1, palette: "sequential-1" as const },
]

figma.connect(
  DonutChart,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=5020-16723",
  {
    props: {
      withLegend: figma.enum("Type", { Legend: true, Centred: false }),
    },
    example: ({ withLegend }) =>
      withLegend ? (
        <div className="flex items-center gap-4">
          <DonutChart
            slices={slices}
            showLegend={false}
            size={168}
            centerValue="7.8K"
            centerLabel="grants"
            label="Grants by level"
          />
          <Legend
            className="flex-1"
            columns={{ label: "Grants by levels", value: "Assign %" }}
            items={slices.map((s) => ({
              id: s.label,
              label: s.label,
              value: `${s.value}%`,
              palette: s.palette,
            }))}
          />
        </div>
      ) : (
        <DonutChart
          slices={slices}
          showLegend={false}
          size={168}
          centerValue="7.8K"
          centerLabel="grants"
          label="Grants by level"
        />
      ),
  }
)
