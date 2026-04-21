import figma from "@figma/code-connect"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose, DialogTrigger } from "../components/ui/dialog"
import { Button } from "../components/ui/button"

figma.connect(
  Dialog,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=882-2798",
  {
    example: () => (
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>
          Open Dialog
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog title</DialogTitle>
            <DialogDescription>Optional description.</DialogDescription>
          </DialogHeader>
          {/* content */}
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
            <Button>Apply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
  }
)
