// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=1060-3832
// source=apps/portal/src/components/ui/popover.tsx
// component=Popover
const figma = require('figma')
const instance = figma.selectedInstance

// ─── Content ───
const title = instance.findText('Popover Title')
const titleText = title ? title.textContent : 'Popover Title'

// ─── Build output ───
export default {
  example: figma.tsx`<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open Popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>${titleText}</PopoverTitle>
      <PopoverDescription>Popover content goes here.</PopoverDescription>
    </PopoverHeader>
  </PopoverContent>
</Popover>`,
  imports: [
    'import { Popover, PopoverContent, PopoverHeader, PopoverTitle, PopoverDescription, PopoverTrigger } from "@/components/ui/popover"',
    'import { Button } from "@/components/ui/button"',
  ],
  id: 'popover',
  metadata: {
    nestable: false,
  }
}
