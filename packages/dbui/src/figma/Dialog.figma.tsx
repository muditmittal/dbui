import figma from "@figma/code-connect"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../components/ui/dialog"
import { Button } from "../components/ui/button"

figma.connect(
  Dialog,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=882-2798",
  {
    props: {
      size: figma.nestedProps(".DialogBody", {
        size: figma.enum("Size", {
          "Normal · 640px": "normal",
          "Wide · 880px": "wide",
          "Extrawide · 1200px": "extrawide",
        }),
      }),
    },
    example: ({ size }) => (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent size={size?.size !== "normal" ? size?.size : undefined}>
          <DialogHeader>
            <DialogTitle>Dialog title</DialogTitle>
            <DialogDescription>Optional description.</DialogDescription>
          </DialogHeader>
          <div>{/* content */}</div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button>Apply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
  }
)
