import figma from "@figma/code-connect"
import { Tooltip, TooltipContent, TooltipTrigger } from "../components/ui/tooltip"

figma.connect(
  Tooltip,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=1060-3708",
  {
    example: () => (
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip text</TooltipContent>
      </Tooltip>
    ),
  }
)
