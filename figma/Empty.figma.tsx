import figma from "@figma/code-connect"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "../components/ui/empty"
import { Button } from "../components/ui/button"

figma.connect(Empty, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3130-1793", {
  example: () => (
    <Empty>
      <EmptyMedia>
        {/* icon */}
      </EmptyMedia>
      <EmptyHeader>
        <EmptyTitle>No items found</EmptyTitle>
        <EmptyDescription>Get started by creating your first item.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Primary action</Button>
      </EmptyContent>
    </Empty>
  ),
})
