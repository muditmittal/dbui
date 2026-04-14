import type { Meta, StoryObj } from "@storybook/react"
import { Skeleton } from "dbui/components/ui/skeleton"

const meta: Meta = { title: "Content/Skeleton" }
export default meta

export const Default: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-3 w-[300px]">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex items-center gap-3">
        <Skeleton className="size-8 rounded-full" />
        <div className="flex-1 flex flex-col gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      </div>
    </div>
  ),
}
