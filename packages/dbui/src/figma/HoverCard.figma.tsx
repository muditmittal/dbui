import figma from "@figma/code-connect"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../components/ui/hover-card"

figma.connect(
  HoverCard,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=1071-1721",
  {
    example: () => (
      <HoverCard>
        <HoverCardTrigger asChild>
          <a href="#">@username</a>
        </HoverCardTrigger>
        <HoverCardContent>Preview content on hover.</HoverCardContent>
      </HoverCard>
    ),
  }
)
