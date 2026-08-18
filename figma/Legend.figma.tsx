import figma from "@figma/code-connect"
import { Legend } from "../packages/dbui-viz/src/components/legend"

// `Viz/Inner/Legend` — an inner part, placed inside `Viz/Medium/Donut`. It carries no variant axis yet:
// the header is a row a designer hides, so `columns` maps to whether the prop is
// passed rather than to an enum.
figma.connect(
  Legend,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=4968-9250",
  {
    example: () => (
      <Legend
        columns={{ label: "Grants by levels", value: "Assign %" }}
        items={[
          { id: "asset", label: "Asset level", value: "23.4%", palette: "sequential-7" },
          { id: "schema", label: "Schema level", value: "62.1%", palette: "sequential-5" },
          { id: "catalog", label: "Catalog level", value: "6.1%", palette: "sequential-3" },
        ]}
      />
    ),
  }
)
