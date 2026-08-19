import figma from "@figma/code-connect"
import { Leaderboard } from "dbui-viz/components/leaderboard"

// `Viz/Medium/Leaderboard` — 440x168.
//
// The whole set connects, with no variant restriction. This used to be scoped to
// `Type=Overlay` against a Figma-only `Type=Column` layout React could not render;
// the set was restructured and its axis is now `Even` / `Skewed`, which is the
// spread of `items[].weight` rather than a layout. Both are the same component fed
// different data, so there is nothing to exclude.
figma.connect(
  Leaderboard,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=5020-9417",
  {
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
