import figma from "@figma/code-connect"
import { AssistantPanel } from "../packages/dbui-shells/src/components/AssistantPanel"
import { PreviewPopup } from "../packages/dbui-shells/src/compositions/PreviewPopup"

// Two compositions that had a Figma master and a React implementation but nothing
// connecting them, so opening either in Dev Mode offered no code.

// ── Assistant Panel ──────────────────────────────────────────────────────────
// A fixed 360px right panel rather than a width the caller sets: the panel sits
// beside a shell's content, and a resizable one would let the content column fall
// below the width the tables inside it need.
figma.connect(
  AssistantPanel,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3572-21789",
  {
    example: () => <AssistantPanel onClose={() => console.log("close")} />,
  }
)

// ── Preview Popup ────────────────────────────────────────────────────────────
// Layer names match the Figma master one-for-one — TypeIcon, AssetTitle,
// AssetName, VerifiedBadge, ParentPath, Properties, Description — so a reader
// inspecting either side sees the same names.
//
// Which extra rows appear is the asset's business: a table has a size in bytes,
// a schema has a count of tables. Passing only the rows that apply is why every
// properties field is optional rather than a fixed grid.
figma.connect(
  PreviewPopup,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3803-11758",
  {
    props: {
      certified: figma.boolean("Certified"),
    },
    example: ({ certified }) => (
      <PreviewPopup
        name="sales_orders"
        parentPath="main.public"
        certified={certified}
        owner="data-platform@acme.com"
        popularity="Queried 1.2k times this month"
        quality={{ status: "healthy", text: "Healthy" }}
        edited="2 hours ago"
        size="4.2 GiB, 128 files"
        description="One row per order, from the point of sale through fulfilment. Refreshed hourly."
        onMoreClick={() => console.log("more")}
      />
    ),
  }
)
