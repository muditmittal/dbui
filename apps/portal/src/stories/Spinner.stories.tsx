import type { Meta, StoryObj } from "@storybook/react"
import { Spinner } from "dbui/components/ui/spinner"

const meta: Meta = { title: "Content/Spinner" }
export default meta

export const Default: StoryObj = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner className="size-4" />
      <Spinner className="size-6" />
      <Spinner className="size-8" />
    </div>
  ),
}
