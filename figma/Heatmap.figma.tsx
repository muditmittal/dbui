import figma from "@figma/code-connect"
import { Heatmap } from "../packages/dbui-viz/src/components/heatmap"

// `Viz/Large/Heatmap` — 1160x208. Thirty day columns against six four-hour rows,
// which puts the grid at 1112x168 and every cell on the system's 28px row.
//
// There is no medium heatmap and no variant to map. A heatmap needs enough columns
// to read as a field rather than a row of chips, and 376px cannot hold thirty of
// them — so this is a large-only component, and `height` is the one dial.
//
// The Figma cells and this example share a generator, so the mock and the render
// bucket the same values into the same seven sequential steps.
const WINDOWS = ["00–04", "04–08", "08–12", "12–16", "16–20", "20–24"]
const MONTHS = ["Jul"]

const activity = Array.from({ length: 30 }, (_, day) =>
  WINDOWS.map((window, row) => {
    const weekend = (day + 2) % 7 < 2
    // A day and a half of collector downtime — absent, not zero.
    if (day === 17 || (day === 18 && row < 4)) {
      return { x: `${MONTHS[0]} ${day + 1}`, y: window, value: null }
    }
    const peak = row === 3 ? 1 : row === 2 || row === 4 ? 0.7 : 1
    return {
      x: `${MONTHS[0]} ${day + 1}`,
      y: window,
      value: Math.round(1400 * peak * (weekend ? 0.22 : 1) * (row < 2 ? 0.3 : 1)),
    }
  })
).flat()

figma.connect(
  Heatmap,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=5038-9628",
  {
    example: () => (
      <Heatmap
        data={activity}
        rowOrder={WINDOWS}
        label="Query activity by day and four-hour window"
      />
    ),
  }
)
