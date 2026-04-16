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
    example: () => (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <p>Popover content goes here.</p>
        </PopoverContent>
      </Popover>
    ),
  }
)
