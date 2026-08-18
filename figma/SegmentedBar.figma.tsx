import figma from "@figma/code-connect"
import { SegmentedBar } from "../packages/dbui-viz/src/components/segmented-bar"

// `Viz/Medium/Segmented Bar`, renamed from `Percentage bar`. The one variant axis is
// `Colors` — the number of segments — which is data rather than a prop, so it maps to
// the `segments` array.
//
// This previously mapped `figma.enum("Type", …)`, a property the component does not
// have, and fed it a ternary over two array literals. Code Connect can serialize a
// value map but not a conditional, so the file failed to parse and published nothing.
// `figma.enum` with one array per option says the same thing and does serialize.
figma.connect(
  SegmentedBar,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=4839-18429",
  {
    props: {
      segments: figma.enum("Colors", {
        "1": [{ label: "Healthy", value: 100, palette: "level-pass" as const }],
        "2": [
          { label: "Healthy", value: 94.1, palette: "level-pass" as const },
          { label: "Failing", value: 5.9, palette: "level-high" as const },
        ],
        "3": [
          { label: "Healthy", value: 82, palette: "level-pass" as const },
          { label: "Warning", value: 12, palette: "level-medium" as const },
          { label: "Failing", value: 6, palette: "level-high" as const },
        ],
        "4": [
          { label: "Healthy", value: 74, palette: "level-pass" as const },
          { label: "Warning", value: 12, palette: "level-medium" as const },
          { label: "Failing", value: 6, palette: "level-high" as const },
          { label: "Unknown", value: 8, palette: "level-info" as const },
        ],
      }),
    },
    example: ({ segments }) => (
      <SegmentedBar label="Table health" showLegend={false} segments={segments} />
    ),
  }
)
