import figma from "@figma/code-connect"
import { StatCard } from "dbui/components/ui/stat-card"

// `Viz/Card/Metric` — the local DBUI component. This used to point at `Metric tile`,
// which is `remote: true`: a component from a different library that the Data
// vertical mock happens to instance, so nothing in this repo owned it and a publish
// would have written into someone else's file.
//
// No prop mappings, because the component carries no Figma properties. It used to
// map `figma.boolean("Show link")`, which does not exist on this node — and the
// ternary it fed could not serialize either, so the file failed to parse and
// published nothing. A static example is the honest version: `action` is a prop the
// Figma component has no axis for.
figma.connect(
  StatCard,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=4839-17659",
  {
    example: () => (
      <StatCard
        label="Total Catalogs"
        value="177"
        hint="What this total counts"
        delta="+2.7%"
        deltaWindow="vs past 30d"
        deltaTone="positive"
      />
    ),
  }
)
