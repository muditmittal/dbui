import figma from "@figma/code-connect"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip"

figma.connect(
  Tooltip,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=1060-3708",
  {
    props: {
      content: figma.string("Tooltip text"),
    },
    example: ({ content }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>{content}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  }
)
