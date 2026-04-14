import type { Meta, StoryObj } from "@storybook/react"
import { Empty, EmptyIcon, EmptyTitle, EmptyDescription } from "dbui/components/ui/empty"
import { Button } from "dbui/components/ui/button"

const meta: Meta = { title: "Content/Empty" }
export default meta

export const Default: StoryObj = {
  render: () => (
    <Empty>
      <EmptyIcon />
      <EmptyTitle>No results found</EmptyTitle>
      <EmptyDescription>Try adjusting your search or filters.</EmptyDescription>
      <Button variant="outline" className="mt-2">Clear filters</Button>
    </Empty>
  ),
}
