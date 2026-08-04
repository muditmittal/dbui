import type { Meta, StoryObj } from "@storybook/react"
import { Base } from "dbui-shells/shell"

const meta: Meta = {
  title: "Components/Shells/Base",
  parameters: { layout: "fullscreen" },
}

export default meta

export const Default: StoryObj = {
  render: () => (
    <Base defaultActive="catalog">
      <div className="flex items-center justify-center h-full text-[13px] text-text-subtle">
        Content goes here — every product page starts with this shell.
      </div>
    </Base>
  ),
}

export const CollapsedSidebar: StoryObj = {
  render: () => (
    <Base defaultActive="catalog" sidebarCollapsed>
      <div className="flex items-center justify-center h-full text-[13px] text-text-subtle">
        Sidebar collapsed — click the toggle in the header to expand.
      </div>
    </Base>
  ),
}
