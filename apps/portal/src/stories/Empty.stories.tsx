import type { Meta, StoryObj } from "@storybook/react"
import { Empty, EmptyTitle, EmptyDescription } from "dbui/components/ui/empty"
import { Button } from "dbui/components/ui/button"
import { Search } from "@/components/icons/Search"
import { ComponentMeta } from "./components/ComponentMeta"
import componentSource from "dbui/components/ui/empty?raw"
import { ProductionMap } from "./components/ProductionMap"

const meta: Meta = {
  title: "Content/Empty",
  parameters: { layout: "padded" },
}

export default meta

export const Playground: StoryObj = {
  render: () => (
    <div>
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Empty</h2>

      <Empty>
        <Search className="size-8 text-muted-foreground" />
        <EmptyTitle>No results found</EmptyTitle>
        <EmptyDescription>Try adjusting your search or filters to find what you're looking for.</EmptyDescription>
        <Button variant="outline" className="mt-2">Clear filters</Button>
      </Empty>


      <ComponentMeta source={componentSource} componentKey="empty" />

      <ProductionMap componentKey="empty" />
    </div>
  ),
}
