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
  props: {
    disabled: figma.enum("State", { Disabled: true }),
    label: figma.string("Label"),
    shortcut: figma.string("⌘K"),
  },
  example: ({ disabled, label, shortcut }) => (
    <DropdownMenuItem disabled={disabled}>
      {label}
      {shortcut && <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>}
    </DropdownMenuItem>
  ),
})

// Destructive item
figma.connect(DropdownMenuItem, FIGMA_URL, {
  variant: { Type: "Destructive" },
  props: {
    disabled: figma.enum("State", { Disabled: true }),
    label: figma.string("Label"),
  },
  example: ({ disabled, label }) => (
    <DropdownMenuItem variant="destructive" disabled={disabled}>
      {label}
    </DropdownMenuItem>
  ),
})

// Checkbox item
figma.connect(DropdownMenuCheckboxItem, FIGMA_URL, {
  variant: { Type: "MultiSelect" },
  props: {
    checked: figma.enum("State", { Selected: true }),
    disabled: figma.enum("State", { Disabled: true }),
    label: figma.string("Label"),
  },
  example: ({ checked, disabled, label }) => (
    <DropdownMenuCheckboxItem checked={checked} disabled={disabled}>
      {label}
    </DropdownMenuCheckboxItem>
  ),
})

// Radio item
figma.connect(DropdownMenuRadioItem, FIGMA_URL, {
  variant: { Type: "SingleSelect" },
  props: {
    disabled: figma.enum("State", { Disabled: true }),
    label: figma.string("Label"),
  },
  example: ({ disabled, label }) => (
    <DropdownMenuRadioItem value="option" disabled={disabled}>
      {label}
    </DropdownMenuRadioItem>
  ),
})

// Submenu
figma.connect(DropdownMenuSub, FIGMA_URL, {
  variant: { Type: "Submenu" },
  props: {
    disabled: figma.enum("State", { Disabled: true }),
    label: figma.string("Label"),
  },
  example: ({ disabled, label }) => (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger disabled={disabled}>{label}</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem>Sub Item 1</DropdownMenuItem>
        <DropdownMenuItem>Sub Item 2</DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  ),
})
