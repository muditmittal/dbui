import type { Meta, StoryObj } from "@storybook/react"
import { Status } from "dbui/components/ui/status"

const allStatuses = ["online", "ready", "offline", "pending", "running", "syncing", "canceled", "stopped", "info", "success", "warning", "error"] as const

const meta: Meta = {
  title: "Content/Status",
  argTypes: {
    status: { control: "select", options: [...allStatuses] },
    size: { control: "radio", options: ["sm", "md"] },
  },
  args: {
    status: "online",
    size: "md",
  },
}

export default meta

export const Playground: StoryObj = {
  render: (args: any) => (
    <div className="flex items-center gap-2">
      <Status status={args.status} size={args.size} />
      <span className="text-[13px] capitalize">{args.status}</span>
    </div>
  ),
}

export const AllStatuses: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-2">
      {allStatuses.map((s) => (
        <div key={s} className="flex items-center gap-2">
          <Status status={s} size="md" />
          <span className="text-[13px] capitalize w-[80px]">{s}</span>
          <Status status={s} size="sm" />
          <span className="text-[12px] text-muted-foreground">sm</span>
        </div>
      ))}
    </div>
  ),
}
