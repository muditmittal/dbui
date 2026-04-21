import figma from "@figma/code-connect"
import { SplitButton, SplitButtonSeparator } from "../components/ui/split-button"
import { Button } from "../components/ui/button"
import { ChevronDown } from "../components/icons/ChevronDown"

// SplitButton — 2 variants × 2 sizes
// Figma node: https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=580-527
figma.connect(SplitButton, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=580-527", {
  props: {
    variant: figma.enum("Variant", {
      Primary: "default",
      Outline: "outline",
    }),
    size: figma.enum("Size", {
      Default: "md",
      Small: "sm",
    }),
  },
  example: ({ variant, size }) => (
    <SplitButton>
      <Button variant={variant} size={size}>Label</Button>
      <SplitButtonSeparator />
      <Button variant={variant} size="icon-md"><ChevronDown /></Button>
    </SplitButton>
  ),
})
