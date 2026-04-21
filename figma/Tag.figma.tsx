import figma from "@figma/code-connect"
import { Tag, TagLabel, TagValue, TagRemove } from "../components/ui/tag"

figma.connect(Tag, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3154-4442", {
  props: {
    value: figma.enum("Value", {
      True: <TagValue>Value</TagValue>,
      False: <></>,
    }),
    closeButton: figma.boolean("Closable", { true: <TagRemove />, false: <></> }),
    icon: figma.boolean("Icon", { true: <>{/* icon */}</>, false: <></> }),
  },
  example: ({ value, closeButton, icon }) => (
    <Tag>
      {icon}
      <TagLabel>Key</TagLabel>
      {value}
      {closeButton}
    </Tag>
  ),
})
