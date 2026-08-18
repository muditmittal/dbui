import figma from "@figma/code-connect"
import { LineSeries } from "../packages/dbui-viz/src/components/line-series"

// `LineSeries` answers to three Figma components.
//
// `Viz/Medium/Line` is the 400x168 card tile, and its `Type` variant is whether
// each datum carries a point marker. `Viz/Large/Line` is the 1160x208 full-width
// chart. `Viz/Large/Multiline` is the same component with a `series` on each datum
// — multi-line is a data shape, not a mode, and the component works it out from
// the data and hides the end dot on its own.
//
// There is no medium Multiline: three lines in a 400px tile is a thicket.

const TREND = [
  { x: "2026-01-07", y: 180 },
  { x: "2026-01-14", y: 520 },
  { x: "2026-01-21", y: 410 },
  { x: "2026-01-28", y: 880 },
  { x: "2026-02-04", y: 940 },
]

// ── Medium ───────────────────────────────────────────────────────────────────
figma.connect(
  LineSeries,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=4839-17735",
  {
    props: {
      showEndDot: figma.enum("Type", { Line: false, Dots: true }),
    },
    example: ({ showEndDot }) => (
      <LineSeries
        label="Queries per day"
        area
        showEndDot={showEndDot}
        xType="temporal"
        height={168}
        data={TREND}
      />
    ),
  }
)

// ── Large ────────────────────────────────────────────────────────────────────
figma.connect(
  LineSeries,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=5035-9602",
  {
    example: () => (
      <LineSeries
        label="Storage over time"
        area
        showEndDot
        xType="temporal"
        height={208}
        yTickCount={5}
        data={TREND}
      />
    ),
  }
)

// Series colours come from `VIZ_SERIES_ORDER`, which is `categorical-1..10` in
// order. The Figma strokes bind `viz/categorical/1`, `2` and `3` so the mock and
// the render agree on which line is which.
figma.connect(
  LineSeries,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=5035-9636",
  {
    example: () => (
      <LineSeries
        label="Requests by endpoint"
        xType="temporal"
        height={208}
        yTickCount={5}
        data={[
          { x: "2026-01-07", y: 320, series: "Serving" },
          { x: "2026-01-14", y: 610, series: "Serving" },
          { x: "2026-01-21", y: 900, series: "Serving" },
          { x: "2026-01-07", y: 580, series: "Batch" },
          { x: "2026-01-14", y: 500, series: "Batch" },
          { x: "2026-01-21", y: 330, series: "Batch" },
          { x: "2026-01-07", y: 200, series: "Interactive" },
          { x: "2026-01-14", y: 300, series: "Interactive" },
          { x: "2026-01-21", y: 440, series: "Interactive" },
        ]}
      />
    ),
  }
)
