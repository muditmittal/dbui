import figma from "@figma/code-connect"
import { Tag, TagLabel, TagValue, TagRemove } from "../components/ui/tag"

figma.connect(Tag, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3154-4442", {
  example: () => (
    <Tag>
      <TagLabel>Key</TagLabel>
      <TagValue>Value</TagValue>
      <TagRemove />
    </Tag>
  ),
})
