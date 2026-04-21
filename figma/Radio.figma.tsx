import figma from "@figma/code-connect"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"

// Radio — 2 selected states × 5 interaction states
// Figma node: https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=715-650
figma.connect(RadioGroup, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=715-650", {
  props: {
    disabled: figma.enum("State", {
      Default: false,
      Hover: false,
      Press: false,
      Focus: false,
      Disabled: true,
    }),
  },
  example: ({ disabled }) => (
    <RadioGroup defaultValue="option-1">
      <RadioGroupItem value="option-1" disabled={disabled} />
    </RadioGroup>
  ),
})
