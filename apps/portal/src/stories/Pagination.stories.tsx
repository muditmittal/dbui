import type { Meta, StoryObj } from "@storybook/react"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from "dbui/components/ui/pagination"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "dbui/components/ui/select"
import { ComponentMeta } from "./components/ComponentMeta"
import componentSource from "dbui/components/ui/pagination?raw"
import { ProductionMap } from "./components/ProductionMap"

const meta: Meta = {
  title: "Content/Pagination",
  parameters: { layout: "padded" },
}

export default meta

export const Playground: StoryObj = {
  render: () => (
    <div>
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Pagination</h2>

      <div className="flex items-center gap-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
            <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
            <PaginationItem><PaginationEllipsis /></PaginationItem>
            <PaginationItem><PaginationLink href="#">10</PaginationLink></PaginationItem>
            <PaginationItem><PaginationNext href="#" /></PaginationItem>
          </PaginationContent>
        </Pagination>

        <Select defaultValue="10">
          <SelectTrigger variant="ghost"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10 / page</SelectItem>
            <SelectItem value="25">25 / page</SelectItem>
            <SelectItem value="50">50 / page</SelectItem>
            <SelectItem value="100">100 / page</SelectItem>
          </SelectContent>
        </Select>
      </div>


      <ComponentMeta source={componentSource} />

      <ProductionMap componentKey="pagination" />
    </div>
  ),
}
