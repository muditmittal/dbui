import type { Meta, StoryObj } from "@storybook/react"
import { PlatformHeader } from "dbui-shells/components/PlatformHeader"

const meta: Meta = {
  title: "Compositions/Platform Header",
  parameters: { layout: "fullscreen" },
}

export default meta

export const Default: StoryObj = {
  render: () => (
    <PlatformHeader />
  ),
}

export const CustomLabels: StoryObj = {
  render: () => (
    <PlatformHeader
      cloudLabel="AWS"
      warehouseLabel="prod-warehouse-01"
      avatarInitial="D"
    />
  ),
}
