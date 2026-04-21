import figma from "@figma/code-connect"
import { Switch } from "../components/ui/switch"

// Switch — 2 sizes × 2 on states × 5 interaction states
// Figma node: https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=717-650
figma.connect(Switch, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=717-650", {
  props: {
    size: figma.enum("Size", {
      Default: "default",
      Small: "sm",
    }),
    defaultChecked: figma.enum("On", {
      false: false,
      true: true,
    }),
    disabled: figma.enum("State", {
      Default: false,
      Hover: false,
      Press: false,
      Focus: false,
      Disabled: true,
    }),
  },
  example: ({ size, defaultChecked, disabled }) => (
    <Switch size={size} defaultChecked={defaultChecked} disabled={disabled} />
  ),
})
