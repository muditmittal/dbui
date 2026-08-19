import figma from "@figma/code-connect"
import { Treemap } from "dbui-viz/components/treemap"

// `Viz/Medium/Treemap` — 400x168 — and `Viz/Large/Treemap` — 1160x208 — are the same
// component at two sizes, where `height` is the only difference in code.
//
// `Type` is deliberately not mapped. React labels a tile whenever it is wide enough
// to hold the name, so `Plain` and `Labelled` are one component at two data
// densities rather than two states — there is no prop to reach for. This is also
// what large actually buys: at 1112px wide the leaves clear the width a label needs,
// which a 400px tile never does.

const CATALOGS = [
  {
    id: "sales",
    name: "sales_main",
    leaves: [
      { id: "crm", name: "crm", value: 2200 },
      { id: "orders", name: "orders", value: 1400 },
    ],
  },
  {
    id: "ml",
    name: "ml_feature_store",
    leaves: [{ id: "features", name: "features", value: 1800 }],
  },
]

figma.connect(
  Treemap,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=5020-16745",
  {
    example: () => <Treemap label="Storage by catalog" maxGroups={5} data={CATALOGS} height={168} />,
  }
)

figma.connect(
  Treemap,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=5037-9628",
  {
    example: () => <Treemap label="Storage by catalog" maxGroups={10} data={CATALOGS} height={208} />,
  }
)
