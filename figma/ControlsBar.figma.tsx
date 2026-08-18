import figma from "@figma/code-connect"
import {
  ControlsBar,
  ControlsBarFilters,
  ControlsBarActions,
} from "../components/ui/controls-bar"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { ToggleButton } from "../components/ui/toggle"

// `Controls Bar` — the filter/search/sort row below `PageHeader`. Another one that
// pointed at Figma and had nothing pointing back.
//
// `Actions` is a boolean on the Figma component and a slot in React: passing
// `ControlsBarActions` is what turns it on, so it maps to the presence of a child
// rather than to a prop.
//
// The boolean carries the whole subtree as a value rather than gating it with a
// ternary inside `example`. Code Connect serializes a value map and not a
// conditional — a ternary here is what broke StatCard and SegmentedBar (B15), and
// it fails the same way every time.
figma.connect(
  ControlsBar,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3861-1658",
  {
    props: {
      actions: figma.boolean("Actions", {
        true: (
          <ControlsBarActions>
            <Button variant="outline">Export</Button>
          </ControlsBarActions>
        ),
        false: undefined,
      }),
    },
    example: ({ actions }) => (
      <ControlsBar>
        <ControlsBarFilters>
          <Input placeholder="Search tables" />
          <ToggleButton variant="filter">Owner</ToggleButton>
          <ToggleButton variant="filter">Tags</ToggleButton>
        </ControlsBarFilters>
        {actions}
      </ControlsBar>
    ),
  }
)
