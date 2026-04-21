import figma from "@figma/code-connect"
import { Toggle, FilterToggle } from "../components/ui/toggle"

// ToggleButton — 4 variants × 2 sizes × 5 states
// Figma node: https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=478-613
figma.connect(Toggle, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=478-613", {
  props: {
    variant: figma.enum("Variant", {
      Default: "default",
      Filter: "filter",
      Icon: "icon",
      Pill: "pill",
    }),
    size: figma.enum("Size", {
      Default: "md",
      Small: "sm",
    }),
    disabled: figma.enum("State", {
      Default: false,
      Hover: false,
      Press: false,
      Selected: false,
      Disabled: true,
    }),
    defaultPressed: figma.enum("State", {
      Default: false,
      Hover: false,
      Press: false,
      Selected: true,
      Disabled: false,
    }),
  },
  example: ({ variant, size, disabled, defaultPressed }) => (
    variant === "filter" ? (
      <FilterToggle size={size} disabled={disabled} defaultPressed={defaultPressed}>
        Label
      </FilterToggle>
    ) : (
      <Toggle
        variant={variant}
        size={size}
        disabled={disabled}
        defaultPressed={defaultPressed}
      >
        Label
      </Toggle>
    )
  ),
})
