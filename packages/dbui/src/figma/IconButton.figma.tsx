import figma from "@figma/code-connect"
import { Button } from "../components/ui/button"

// IconButton — 6 variants × 2 sizes × 6 states
// Figma node: https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=566-534
figma.connect(Button, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=566-534", {
  props: {
    variant: figma.enum("Variant", {
      Primary: "default",
      Outline: "outline",
      Secondary: "secondary",
      Ghost: "ghost",
      Destructive: "destructive",
      Danger: "danger",
    }),
    size: figma.enum("Size", {
      Default: "icon-md",
      Small: "icon-sm",
    }),
    disabled: figma.enum("State", {
      Default: false,
      Hover: false,
      Press: false,
      Focus: false,
      Disabled: true,
    }),
  },
  example: ({ variant, size, disabled }) => (
    <Button variant={variant} size={size} disabled={disabled}>
      {/* Insert icon here, e.g. <PlusIcon /> */}
    </Button>
  ),
})
