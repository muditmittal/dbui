import figma from "@figma/code-connect"
import { Textarea } from "../components/ui/textarea"

// Textarea — 6 states
// Figma node: https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=724-658
figma.connect(Textarea, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=724-658", {
  props: {
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
  example: ({ disabled, ariaInvalid }) => (
    <Textarea
      placeholder="Placeholder"
      disabled={disabled}
      aria-invalid={ariaInvalid || undefined}
    />
  ),
})
