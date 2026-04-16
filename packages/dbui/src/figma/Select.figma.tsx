import figma from "@figma/code-connect"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select"

// Select — 2 types × 2 sizes × 6 states
// Figma node: https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=732-601
figma.connect(Select, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=732-601", {
  props: {
    variant: figma.enum("Type", {
      Default: "default",
      Ghost: "ghost",
    }),
    size: figma.enum("Size", {
      Default: "default",
      Small: "sm",
    }),
    disabled: figma.enum("State", {
      Default: false,
      Hover: false,
      Press: false,
      Focus: false,
      Disabled: true,
      Danger: false,
    }),
    ariaInvalid: figma.enum("State", {
      Default: false,
      Hover: false,
      Press: false,
      Focus: false,
      Disabled: false,
      Danger: true,
    }),
  },
  example: ({ variant, size, disabled, ariaInvalid }) => (
    <Select>
      <SelectTrigger
        variant={variant}
        size={size}
        disabled={disabled}
        aria-invalid={ariaInvalid}
      >
        <SelectValue placeholder="Select..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option-1">Option 1</SelectItem>
        <SelectItem value="option-2">Option 2</SelectItem>
        <SelectItem value="option-3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  ),
})
