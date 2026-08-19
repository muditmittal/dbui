import figma from "@figma/code-connect"
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "dbui/components/ui/hover-card"

// `Hover Card` — the read-only preview popup. It was the library's one real
// existence gap: React had it, Figma did not, and the index named a `Hover Card`
// layer that resolved to nothing.
//
// `Arrow` maps to `side`. They are one decision, not two: the arrow points back at
// the trigger, so a card on the bottom has a top-pointing arrow and there is no
// combination where the two disagree.
//
// Nothing maps to an action, and that is the point — `@constraint Don't use for
// actions`. `Preview Popup` is the asset-shaped composition built on top of this.
figma.connect(
  HoverCard,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=5053-8796",
  {
    props: {
      side: figma.enum("Arrow", {
        Top: "bottom",
        Bottom: "top",
        Left: "right",
        Right: "left",
      }),
    },
    example: ({ side }) => (
      <HoverCard>
        <HoverCardTrigger>netflix_titles</HoverCardTrigger>
        <HoverCardContent side={side}>
          Daily mappings between customers and their metadata.
        </HoverCardContent>
      </HoverCard>
    ),
  }
)
