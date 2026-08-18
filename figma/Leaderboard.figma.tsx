import figma from "@figma/code-connect"
import { Leaderboard } from "../packages/dbui-viz/src/components/leaderboard"

// `Viz/Medium/Leaderboard` — 400x168, the card tile.
//
// Only `Type=Overlay` is mapped. React draws the label on the bar and has no
// `layout` prop, so `Type=Column` is a Figma-only variant today — see the gaps
// table in `docs/figma-mapping.md`. Connecting the set as a whole would claim the
// component renders a layout it cannot.
figma.connect(
  Leaderboard,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=5020-9417",
  {
    variant: { Type: "Overlay" },
    example: () => (
      <Leaderboard
        columns={{ label: "Principal", value: "Queries" }}
        items={[
          { id: "1", label: "prod_etl_agent", value: "11.7K", weight: 11700 },
          { id: "2", label: "genie_lookup", value: "7.6K", weight: 7600 },
          { id: "3", label: "dbt_runner", value: "6.1K", weight: 6100 },
        ]}
      />
    ),
  }
)
