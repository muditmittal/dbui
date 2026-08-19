import figma from "@figma/code-connect"
import { BarChart } from "dbui-viz/components/bar-chart"

// `BarChart` answers to four Figma components: plain and stacked, at each size.
//
// Plain and stacked used to be a `Type` variant on one set. They are separate
// components now because a designer picking from the component browser cannot see
// a variant that lives one level down — they detach and rebuild instead of
// swapping. Nothing changes in React: a stacked bar is what you get when each
// datum carries a `series`, so the split is a discovery decision, not an API one.
//
// Medium is 400x168 for a card tile. Large is 1160x208 — a 1112x168 band plus
// axes — for the full-width chart between a control bar and a table. Both are the
// same component: width is measured, height is the `height` prop.

const DAILY = [
  { x: "Jan 7", y: 290 },
  { x: "Jan 8", y: 210 },
  { x: "Jan 9", y: 265 },
  { x: "Jan 10", y: 400 },
  { x: "Jan 11", y: 330 },
  { x: "Jan 12", y: 255 },
]

const SPLIT = [
  { x: "Jan 7", y: 190, series: "Committed" },
  { x: "Jan 7", y: 100, series: "On demand" },
  { x: "Jan 8", y: 150, series: "Committed" },
  { x: "Jan 8", y: 60, series: "On demand" },
  { x: "Jan 9", y: 170, series: "Committed" },
  { x: "Jan 9", y: 95, series: "On demand" },
]

// ── Medium ───────────────────────────────────────────────────────────────────
figma.connect(
  BarChart,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=5089-7826",
  {
    example: () => <BarChart label="Queries per day" data={DAILY} height={168} />,
  }
)

figma.connect(
  BarChart,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=5089-7869",
  {
    example: () => <BarChart label="Spend per day" data={SPLIT} height={168} />,
  }
)

// ── Large ────────────────────────────────────────────────────────────────────
// yTickCount goes to 5 here. Three ticks is right for a 168px card tile and thin
// for a chart with 168px of band and five times the width.
figma.connect(
  BarChart,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=5033-9578",
  {
    example: () => (
      <BarChart label="Queries per day" data={DAILY} height={208} yTickCount={5} />
    ),
  }
)

figma.connect(
  BarChart,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=5033-9637",
  {
    example: () => (
      <BarChart label="Spend per day" data={SPLIT} height={208} yTickCount={5} />
    ),
  }
)
