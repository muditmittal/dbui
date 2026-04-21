import figma from "@figma/code-connect"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover"
import { Button } from "../components/ui/button"

figma.connect(
  Popover,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=1060-3832",
  {
    props: {
      side: figma.enum("Arrow", {
        Top: "bottom",
        Right: "left",
        Bottom: "top",
        Left: "right",
      }),
    },
    example: ({ side }) => (
      <Popover>
        <PopoverTrigger render={<Button variant="outline" />}>
          Open Popover
        </PopoverTrigger>
        <PopoverContent side={side}>
          <p>Popover content goes here.</p>
        </PopoverContent>
      </Popover>
    ),
  }
)
