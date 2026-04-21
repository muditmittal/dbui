import type { Meta, StoryObj } from "@storybook/react"
import { PlatformNav } from "./components/PlatformNav"

const meta: Meta = {
  title: "Compositions/Platform Nav",
  parameters: { layout: "padded" },
}

export default meta

export const Playground: StoryObj = {
  render: () => (
    <div>
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Platform Nav</h2>
      <PlatformNav />
    </div>
  ),
}
