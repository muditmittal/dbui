import figma from "@figma/code-connect"
import { Toggle, FilterToggle } from "dbui/components/ui/toggle"
import { ThumbsUp } from "dbui/components/icons/ThumbsUp"

// ToggleButton — 4 variants × 2 sizes × 5 states
// Figma node: https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=478-613
//
// Three connects rather than one, because Figma's `Variant` axis carries three
// different decisions at once: which React component (Toggle or FilterToggle),
// which variant it takes, and whether it is icon-only — which changes `size` to
// `icon-sm` / `icon-md` rather than `sm` / `md`.
//
// That last one is why a single connect cannot work: `size` is a function of both
// `Variant` and `Size`, and a prop maps from one Figma property. The previous
// version reached for a nested ternary in `example` instead, which Code Connect
// cannot serialize — so this file published nothing at all (B16). Scoping a connect
// with `variant` is the supported way to branch, and it puts the branch where a
// reader can see it.

const STATE = {
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
}

// ── Icon-only ────────────────────────────────────────────────────────────────
// The glyph is 16px either way; the box is what changes.
figma.connect(Toggle, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=478-613", {
  variant: { Variant: "Icon" },
  props: {
    ...STATE,
    size: figma.enum("Size", { Default: "icon-md", Small: "icon-sm" }),
  },
  example: ({ size, disabled, defaultPressed }) => (
    <Toggle
      variant="icon"
      size={size}
      disabled={disabled}
      defaultPressed={defaultPressed}
      aria-label="Label"
    >
      <ThumbsUp />
    </Toggle>
  ),
})

// ── Filter ───────────────────────────────────────────────────────────────────
// Figma's Filter is the bordered toggle that also carries a checkbox. In React
// that is a different component, not a different variant.
figma.connect(FilterToggle, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=478-613", {
  variant: { Variant: "Filter" },
  props: {
    ...STATE,
    size: figma.enum("Size", { Default: "md", Small: "sm" }),
  },
  example: ({ size, disabled, defaultPressed }) => (
    <FilterToggle size={size} disabled={disabled} defaultPressed={defaultPressed}>
      Label
    </FilterToggle>
  ),
})

// ── Default and Pill ─────────────────────────────────────────────────────────
// Pill is bordered without the checkbox, so it is `filter` in React. The name is
// Figma-side only and describes a shape the size now decides: Pill/Small renders a
// 4px corner, so the name already lies there.
figma.connect(Toggle, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=478-613", {
  props: {
    ...STATE,
    variant: figma.enum("Variant", { Default: "default", Pill: "filter" }),
    size: figma.enum("Size", { Default: "md", Small: "sm" }),
  },
  example: ({ variant, size, disabled, defaultPressed }) => (
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
