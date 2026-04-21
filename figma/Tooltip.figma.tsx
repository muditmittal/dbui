import figma from "@figma/code-connect"
import { Tooltip, TooltipContent, TooltipTrigger } from "../components/ui/tooltip"

figma.connect(
  Tooltip,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=1060-3708",
  {
    props: {
      side: figma.enum("Arrow", {
        Bottom: "top",
        Left: "right",
        Right: "left",
        Top: "bottom",
      }),
    },
    example: ({ side }) => (
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent side={side}>Tooltip text</TooltipContent>
      </Tooltip>
    ),
  }
)
