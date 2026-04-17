import figma from "@figma/code-connect"
import { Tag, TagLabel, TagValue, TagRemove } from "../components/ui/tag"

figma.connect(Tag, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3154-4442", {
  props: {
    hasValue: figma.enum("Value", {
      True: true,
      False: false,
    }),
    closable: figma.boolean("Closable"),
    showIcon: figma.boolean("Icon"),
  },
  example: ({ hasValue, closable, showIcon }) => (
    <Tag>
      {showIcon && <>{/* icon */}</>}
      <TagLabel>Key</TagLabel>
      {hasValue && <TagValue>Value</TagValue>}
      {closable && <TagRemove />}
    </Tag>
  ),
})
