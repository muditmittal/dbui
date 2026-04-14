import type { Meta, StoryObj } from "@storybook/react"
import { Switch } from "dbui/components/ui/switch"

const meta: Meta<typeof Switch> = {
  title: "Controls/Switch",
  component: Switch,
  argTypes: {
    size: { control: "select", options: ["default", "sm"] },
    disabled: { control: "boolean" },
    defaultChecked: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {}

export const Checked: Story = {
  args: { defaultChecked: true },
}

export const Small: Story = {
  args: { size: "sm" },
}

export const SmallChecked: Story = {
  args: { size: "sm", defaultChecked: true },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true },
}

export const AllStates: Story = {
  name: "All Sizes × States",
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-[13px] font-semibold leading-[20px] mb-3">Default Size</p>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center gap-1">
            <Switch />
            <span className="text-[12px] text-muted-foreground">Off</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Switch defaultChecked />
            <span className="text-[12px] text-muted-foreground">On</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Switch disabled />
            <span className="text-[12px] text-muted-foreground">Disabled Off</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Switch disabled defaultChecked />
            <span className="text-[12px] text-muted-foreground">Disabled On</span>
          </div>
        </div>
      </div>
      <div>
        <p className="text-[13px] font-semibold leading-[20px] mb-3">Small Size</p>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center gap-1">
            <Switch size="sm" />
            <span className="text-[12px] text-muted-foreground">Off</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Switch size="sm" defaultChecked />
            <span className="text-[12px] text-muted-foreground">On</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Switch size="sm" disabled />
            <span className="text-[12px] text-muted-foreground">Disabled Off</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Switch size="sm" disabled defaultChecked />
            <span className="text-[12px] text-muted-foreground">Disabled On</span>
          </div>
        </div>
      </div>
      <div>
        <p className="text-[12px] text-muted-foreground mt-2">Hover and press states are interactive — hover/click to see fill color transitions.</p>
      </div>
    </div>
  ),
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Switch id="airplane" />
        <label htmlFor="airplane" className="text-[13px] leading-[20px]">Airplane mode</label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="notifications" size="sm" defaultChecked />
        <label htmlFor="notifications" className="text-[13px] leading-[20px]">Notifications</label>
      </div>
    </div>
  ),
}
