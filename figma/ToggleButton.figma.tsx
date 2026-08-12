import figma from "@figma/code-connect"
import { Toggle, FilterToggle } from "../components/ui/toggle"
import { ThumbsUp } from "../components/icons/ThumbsUp"

// ToggleButton — 4 variants × 2 sizes × 5 states
// Figma node: https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=478-613
//
// Figma and React factor "icon-only" differently. Figma keeps it on `Variant`
// and leaves `Size` as the height alone; React folds it into `size`, so an
// icon-only toggle is `icon-sm` / `icon-md` — a square box — rather than `sm` /
// `md`, which carry horizontal padding and a min-width for a label. Mapping
// `Size` straight through emits a padded button for the Icon variant, so the
// size is derived from both axes below. The glyph is 16px either way.
figma.connect(Toggle, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=478-613", {
  props: {
    variant: figma.enum("Variant", {
      Default: "default",
      Icon: "icon",
      // Figma's Filter and Pill are both the bordered toggle; Filter is the one
      // that also carries a checkbox, which is a different React component
      // rather than a different variant — see `checkbox` below.
      Filter: "filter",
      // Pill is bordered without the checkbox, so it is `filter` in React. The
      // name is Figma-side only and describes a shape the size now decides:
      // Pill/Small renders a 4px corner, so the name already lies there.
      Pill: "filter",
    }),
    // Which component to reach for, kept separate from which variant it takes.
    // Overloading `variant` with a component choice is what made Pill ambiguous.
    checkbox: figma.enum("Variant", {
      Default: false,
      Filter: true,
      Icon: false,
      Pill: false,
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
  example: ({ variant, size, disabled, defaultPressed, checkbox }) =>
    checkbox ? (
      <FilterToggle size={size} disabled={disabled} defaultPressed={defaultPressed}>
        Label
      </FilterToggle>
    ) : variant === "icon" ? (
      <Toggle
        variant="icon"
        size={size === "sm" ? "icon-sm" : "icon-md"}
        disabled={disabled}
        defaultPressed={defaultPressed}
        aria-label="Label"
      >
        <ThumbsUp />
      </Toggle>
    ) : (
      <Toggle
        variant={variant}
        size={size}
        disabled={disabled}
        defaultPressed={defaultPressed}
      >
        Label
      </Toggle>
    ),
})
