import figma from "@figma/code-connect"
import { Tag, TagIcon, TagLabel, TagValue, TagRemove } from "../components/ui/tag"

figma.connect(Tag, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3154-4442", {
  props: {
    hasIcon: figma.boolean("Icon"),
    hasValue: figma.boolean("Value"),
    closable: figma.boolean("Closable"),
    label: figma.string("TagLabel"),
    value: figma.string("TagValue"),
  },
  example: ({ hasIcon, hasValue, closable, label, value }) => (
    <Tag>
      {hasIcon && <TagIcon>{/* icon */}</TagIcon>}
      <TagLabel>{label ?? "Key"}</TagLabel>
      {hasValue && <TagValue>{value ?? "Value"}</TagValue>}
      {closable && <TagRemove />}
    </Tag>
  ),
})
