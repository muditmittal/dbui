import figma from "@figma/code-connect"
import { Checkbox } from "../components/ui/checkbox"

// Checkbox — 3 checked states × 5 interaction states
// Figma node: https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=713-650
figma.connect(Checkbox, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=713-650", {
  props: {
    defaultChecked: figma.enum("Checked", {
      Unchecked: false,
      Checked: true,
      Indeterminate: false,
    }),
    indeterminate: figma.enum("Checked", {
      Unchecked: false,
      Checked: false,
      Indeterminate: true,
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
  example: ({ defaultChecked, indeterminate, disabled, ariaInvalid }) => (
    <Checkbox
      defaultChecked={defaultChecked}
      indeterminate={indeterminate}
      disabled={disabled}
      aria-invalid={ariaInvalid}
    />
  ),
})
