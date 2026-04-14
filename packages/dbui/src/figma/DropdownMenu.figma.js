// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=787-706
// source=apps/portal/src/components/ui/dropdown-menu.tsx
// component=DropdownMenu (composition)
const figma = require('figma')
const instance = figma.selectedInstance

export default {
  example: figma.tsx`<DropdownMenu>
  <DropdownMenuTrigger>
    <Button variant="outline">Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Option 1</DropdownMenuItem>
    <DropdownMenuItem>Option 2</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Option 3</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
  imports: [
    'import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"',
    'import { Button } from "@/components/ui/button"',
  ],
  id: 'dropdown-menu',
  metadata: {
    nestable: false,
  }
}
