import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "dbui/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupButton } from "dbui/components/ui/input-group"
import { Search } from "@/components/icons/Search"
import { DangerSmall } from "@/components/icons/DangerSmall"
import { CloseSmall } from "@/components/icons/CloseSmall"

const meta: Meta = {
  title: "Controls/Input",
  argTypes: {
    size: { control: "radio", options: ["default", "sm"], name: "Size" },
    state: {
      control: "select",
      options: ["default", "disabled", "invalid", "warning", "success"],
      name: "State",
    },
    placeholder: { control: "text" },
    value: { control: "text", name: "Value text" },
  },
  args: {
    size: "default",
    state: "default",
    placeholder: "Placeholder",
    value: "",
  },
}

export default meta

export const Playground: StoryObj = {
  render: (args: any) => (
    <div className="w-[240px]">
      <Input
        size={args.size}
        placeholder={args.placeholder}
        defaultValue={args.value}
        disabled={args.state === "disabled"}
        aria-invalid={args.state === "invalid" || undefined}
        validation={args.state === "warning" ? "warning" : args.state === "success" ? "success" : undefined}
      />
    </div>
  ),
}

export const AllStates: StoryObj = {
  name: "All States ",
  render: () => (
    <div className="flex flex-col gap-3 w-[240px]">
      <div className="flex flex-col gap-1">
        <p className="text-[12px] text-muted-foreground">Default</p>
        <Input placeholder="Placeholder" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[12px] text-muted-foreground">With value</p>
        <Input defaultValue="Input text" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[12px] text-muted-foreground">Disabled</p>
        <Input placeholder="Disabled" disabled />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[12px] text-muted-foreground">Danger (invalid)</p>
        <Input defaultValue="Bad input" aria-invalid />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[12px] text-muted-foreground">Warning</p>
        <Input defaultValue="Needs attention" validation="warning" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[12px] text-muted-foreground">Success</p>
        <Input defaultValue="Looks good" validation="success" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[12px] text-muted-foreground">Small</p>
        <Input size="sm" placeholder="Small" />
      </div>
      <p className="text-[11px] text-muted-foreground mt-2">Hover and Focus states are interactive — hover/click to see.</p>
    </div>
  ),
}

/**
 * InputContent playground — maps to Figma .InputContent inner component.
 * Exposes all Figma boolean props: Show Icon, Show Indicator, Show Action.
 */
export const InputContentPlayground: StoryObj = {
  name: "InputContent (.InputContent)",
  argTypes: {
    showLeftIcon: { control: "boolean", name: "Show Icon (left Search)" },
    showRightIndicator: { control: "boolean", name: "Show Indicator (right DangerSmall)" },
    showRightAction: { control: "boolean", name: "Show Action (right CloseSmall)" },
    size: { control: "radio", options: ["default", "sm"] },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: {
    showLeftIcon: false,
    showRightIndicator: false,
    showRightAction: false,
    size: "default",
    disabled: false,
    placeholder: "Placeholder",
  },
  render: (args: any) => (
    <div className="w-[240px]">
      <InputGroup className={args.size === "sm" ? "h-6" : ""}>
        {args.showLeftIcon && (
          <InputGroupAddon align="inline-start"><Search /></InputGroupAddon>
        )}
        <InputGroupInput placeholder={args.placeholder} disabled={args.disabled} />
        {args.showRightIndicator && (
          <InputGroupAddon align="inline-end"><DangerSmall /></InputGroupAddon>
        )}
        {args.showRightAction && (
          <InputGroupAddon align="inline-end">
            <InputGroupButton size="icon-xs" variant="ghost"><CloseSmall /></InputGroupButton>
          </InputGroupAddon>
        )}
      </InputGroup>
    </div>
  ),
}
