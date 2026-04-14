import type { Meta, StoryObj } from "@storybook/react"
import { toast } from "sonner"
import { Toaster } from "dbui/components/ui/sonner"
import { Button } from "dbui/components/ui/button"

const meta: Meta = {
  title: "Overlays/Toast",
  decorators: [
    (Story) => (
      <>
        <Toaster />
        <Story />
      </>
    ),
  ],
}

export default meta
type Story = StoryObj

export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => toast.success("Cluster created successfully")}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast.info("New runtime version available")}>
        Info
      </Button>
      <Button variant="outline" onClick={() => toast.warning("Cluster will auto-terminate in 10 minutes")}>
        Warning
      </Button>
      <Button variant="outline" onClick={() => toast.error("Failed to start cluster")}>
        Error
      </Button>
      <Button variant="outline" onClick={() => toast("Job submitted", { description: "Run #1234 is now queued" })}>
        With Description
      </Button>
    </div>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast("File deleted", {
          action: { label: "Undo", onClick: () => {} },
        })
      }
    >
      Toast with Action
    </Button>
  ),
}
