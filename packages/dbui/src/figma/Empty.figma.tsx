import figma from "@figma/code-connect"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "../components/ui/empty"

figma.connect(Empty, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3130-1793", {
  example: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          {/* icon */}
        </EmptyMedia>
        <EmptyTitle>No items found</EmptyTitle>
        <EmptyDescription>Get started by creating your first item.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
})
