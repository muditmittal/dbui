import figma from "@figma/code-connect"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"

figma.connect(
  Table,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3157-2794",
  {
    example: () => (
      <Table>
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
      </Table>
    ),
  }
)
