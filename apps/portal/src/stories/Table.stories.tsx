import type { Meta, StoryObj } from "@storybook/react"
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
  TableSortButton,
} from "dbui/components/ui/table"
import { ComponentMeta } from "./components/ComponentMeta"
import { ProductionMap } from "./components/ProductionMap"
import componentSource from "dbui/components/ui/table?raw"

const meta: Meta = {
  title: "Content/Table",
  parameters: { layout: "padded" },
}

export default meta

export const Playground: StoryObj = {
  render: () => (
    <div>
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Table</h2>

      <div className="w-[600px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className="flex items-center gap-1">
                  Name
                  <TableSortButton sorted direction="asc" />
                </div>
              </TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Size</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>customers</TableCell>
              <TableCell>Table</TableCell>
              <TableCell className="text-right">2.4 GB</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>orders_2024</TableCell>
              <TableCell>Table</TableCell>
              <TableCell className="text-right">1.1 GB</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>analysis_pipeline</TableCell>
              <TableCell>Notebook</TableCell>
              <TableCell className="text-right">340 KB</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>user_sessions</TableCell>
              <TableCell>View</TableCell>
              <TableCell className="text-right">--</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <ComponentMeta source={componentSource} componentKey="table" />
      <ProductionMap componentKey="table" />
    </div>
  ),
}
