import figma from "@figma/code-connect"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer"
import { Button } from "../components/ui/button"

figma.connect(
  Drawer,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=1060-3937",
  {
    example: () => (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">Open Drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Drawer Title</DrawerTitle>
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
      </Drawer>
    ),
  }
)
