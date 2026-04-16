import figma from "@figma/code-connect"
import { Input } from "../components/ui/input"

// Input — 2 sizes × 8 states
// Figma node: https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=722-658
figma.connect(Input, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=722-658", {
  props: {
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
      Warning: false,
      Success: false,
    }),
    ariaInvalid: figma.enum("State", {
      Default: false,
      Hover: false,
      Press: false,
      Focus: false,
      Disabled: false,
      Danger: true,
      Warning: false,
      Success: false,
    }),
  },
  example: ({ size, disabled, ariaInvalid }) => (
    <Input
      size={size}
      placeholder="Placeholder"
      disabled={disabled}
      aria-invalid={ariaInvalid || undefined}
    />
  ),
})
