import type { Meta, StoryObj } from "@storybook/react"
import { AssistantPanel } from "dbui-shells/components/AssistantPanel"

const meta: Meta = {
  title: "Compositions/Assistant Panel",
  parameters: { layout: "fullscreen" },
}

export default meta

export const Default: StoryObj = {
  render: () => (
    <div className="flex h-screen bg-muted">
      {/* Placeholder content area */}
      <div className="flex-1 flex items-center justify-center text-[13px] text-muted-foreground">
        Content area
      </div>
      <AssistantPanel onClose={() => alert("Close clicked")} />
    </div>
  ),
}
