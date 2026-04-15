// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=1060-3937
// source=packages/dbui/src/components/ui/drawer.tsx
// component=Drawer
const figma = require('figma')
const instance = figma.selectedInstance

// ─── Content ───
const title = instance.findText('Drawer Title')
const titleText = title ? title.textContent : 'Drawer Title'

// ─── Build output ───
export default {
  example: figma.tsx`<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">Open Drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>${titleText}</DrawerTitle>
      <DrawerDescription>Optional description for the drawer.</DrawerDescription>
    </DrawerHeader>
    <div className="p-4">{/* content */}</div>
    <DrawerFooter>
      <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
      <Button>Save</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`,
  imports: [
    'import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"',
    'import { Button } from "@/components/ui/button"',
  ],
  id: 'drawer',
  metadata: {
    nestable: false,
  }
}
