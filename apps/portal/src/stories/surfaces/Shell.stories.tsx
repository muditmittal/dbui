import type { Meta, StoryObj } from "@storybook/react"
import { Shell } from "dbui-shells/shell"

const meta: Meta = {
  title: "Shells/Base",
  parameters: { layout: "fullscreen" },
}

export default meta

export const Default: StoryObj = {
  render: () => (
    <Shell defaultActive="catalog">
      <div className="flex items-center justify-center h-full text-[13px] text-muted-foreground">
        Content goes here — every product page starts with this shell.
      </div>
    </Shell>
  ),
}

export const CollapsedSidebar: StoryObj = {
  render: () => (
    <Shell defaultActive="catalog" sidebarCollapsed>
      <div className="flex items-center justify-center h-full text-[13px] text-muted-foreground">
        Sidebar collapsed — click the toggle in the header to expand.
      </div>
    </Shell>
  ),
}
