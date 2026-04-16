import type { Meta, StoryObj } from "@storybook/react"
import { Shell } from "dbui-shells/shell"

const meta: Meta = {
  title: "Surfaces/Shell",
  parameters: { layout: "fullscreen" },
}

export default meta

export const Playground: StoryObj = {
  render: () => (
    <Shell defaultActive="catalog">
      <div className="flex items-center justify-center h-full text-[13px] text-muted-foreground">
        Content goes here
      </div>
    </Shell>
  ),
}
