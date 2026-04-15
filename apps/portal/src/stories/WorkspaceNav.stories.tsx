import type { Meta, StoryObj } from "@storybook/react"
import { WorkspaceNav } from "./components/WorkspaceNav"

const meta: Meta = {
  title: "Compositions/Workspace Nav",
  parameters: { layout: "padded" },
}

export default meta

export const Playground: StoryObj = {
  render: () => (
    <div>
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Workspace Nav</h2>
      <WorkspaceNav />
    </div>
  ),
}
