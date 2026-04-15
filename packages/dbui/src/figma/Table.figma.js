// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3157-2794
// source=packages/dbui/src/components/ui/table.tsx
// component=Table
const figma = require('figma')
const instance = figma.selectedInstance

export default {
  example: figma.tsx`<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Role</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Alice Johnson</TableCell>
      <TableCell>Active</TableCell>
      <TableCell>Admin</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
  imports: ['import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"'],
  id: 'table',
  metadata: {
    nestable: false,
  }
}
