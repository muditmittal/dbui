import figma from "@figma/code-connect"
import { Button } from "../components/ui/button"

// Button — 7 variants × 2 sizes × 6 states
// Figma node: https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=477-773
figma.connect(Button, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=477-773", {
  props: {
    variant: figma.enum("Variant", {
      Primary: "default",
      Outline: "outline",
      Secondary: "secondary",
      Ghost: "ghost",
      Link: "link",
      Destructive: "destructive",
      Danger: "danger",
    }),
    size: figma.enum("Size", {
      Default: "md",
      Small: "sm",
    }),
    disabled: figma.enum("State", {
      Default: false,
      Hover: false,
      Press: false,
      Focus: false,
      Disabled: true,
      Loading: false,
    }),
  },
  example: ({ variant, size, disabled }) => (
    <Button
      variant={variant}
      size={size}
      disabled={disabled}
    >
      Label
    </Button>
  ),
})
