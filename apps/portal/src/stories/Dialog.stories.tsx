import type { Meta, StoryObj } from "@storybook/react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "dbui/components/ui/dialog"
import { Button } from "dbui/components/ui/button"
import { Input } from "dbui/components/ui/input"

const meta: Meta<typeof Dialog> = {
  title: "Feedback/Dialog",
  component: Dialog,
}

export default meta
type Story = StoryObj<typeof Dialog>

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Make changes to your profile here.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 py-4">
          <Input placeholder="Name" defaultValue="Mudit Mittal" />
          <Input placeholder="Email" defaultValue="mudit@databricks.com" />
        </div>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}
