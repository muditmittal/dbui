import figma from "@figma/code-connect"
import {
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "../components/ui/dropdown-menu"

const FIGMA_URL =
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=766-671"

// Action item
figma.connect(DropdownMenuItem, FIGMA_URL, {
  variant: { Type: "Action" },
  example: () => (
    <DropdownMenuItem>
      Action item
      <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
    </DropdownMenuItem>
  ),
})

// Destructive item
figma.connect(DropdownMenuItem, FIGMA_URL, {
  variant: { Type: "Destructive" },
  example: () => (
    <DropdownMenuItem variant="destructive">
      Delete
    </DropdownMenuItem>
  ),
})

// Checkbox item
figma.connect(DropdownMenuCheckboxItem, FIGMA_URL, {
  variant: { Type: "MultiSelect" },
  example: () => (
    <DropdownMenuCheckboxItem checked>
      Option
    </DropdownMenuCheckboxItem>
  ),
})

// Radio item
figma.connect(DropdownMenuRadioItem, FIGMA_URL, {
  variant: { Type: "SingleSelect" },
  example: () => (
    <DropdownMenuRadioItem value="option">
      Option
    </DropdownMenuRadioItem>
  ),
})

// Submenu
figma.connect(DropdownMenuSub, FIGMA_URL, {
  variant: { Type: "Submenu" },
  example: () => (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>More options</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem>Sub Item 1</DropdownMenuItem>
        <DropdownMenuItem>Sub Item 2</DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  ),
})
