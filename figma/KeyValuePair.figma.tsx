import figma from "@figma/code-connect"
import {
  KeyValuePair,
  KeyValueTitle,
  KeyValueItem,
  KeyValueKey,
  KeyValueValue,
} from "dbui/components/ui/key-value-pair"

// Layout has no Flexible variant on this node because the container's layout only sets width,
// and flexible is full width like horizontal. The three-way arrangement lives on the row, not
// here — .KeyValueItem (node-id=3178-3688) carries Type: Horizontal/Vertical/Flexible, which
// maps to KeyValueItem and KeyValueKey together.
figma.connect(KeyValuePair, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3178-3901", {
  props: {
    layout: figma.enum("Layout", {
      "Horizontal": "horizontal",
      "Vertical": "vertical",
    }),
  },
  example: ({ layout }) => (
    <KeyValuePair layout={layout}>
      <KeyValueTitle>Details</KeyValueTitle>
      <KeyValueItem>
        <KeyValueKey>Owner</KeyValueKey>
        <KeyValueValue>mudit@databricks.com</KeyValueValue>
      </KeyValueItem>
      <KeyValueItem>
        <KeyValueKey>Created</KeyValueKey>
        <KeyValueValue>2026-04-14</KeyValueValue>
      </KeyValueItem>
    </KeyValuePair>
  ),
})
