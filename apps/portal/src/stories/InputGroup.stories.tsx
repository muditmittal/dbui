import type { Meta, StoryObj } from "@storybook/react"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupButton } from "dbui/components/ui/input-group"
import { Button } from "dbui/components/ui/button"
import { Search } from "@/components/icons/Search"
import { Sliders } from "@/components/icons/Sliders"
import { CloseSmall } from "@/components/icons/CloseSmall"
import { DangerSmall } from "@/components/icons/DangerSmall"

const meta: Meta = {
  title: "Controls/InputGroup",
  argTypes: {
    type: { control: "radio", options: ["filter", "browse", "custom"], name: "Type (Figma)" },
    showLeftIcon: { control: "boolean", name: "Show Left Icon", if: { arg: "type", eq: "custom" } },
    showRightIndicator: { control: "boolean", name: "Show Right Indicator", if: { arg: "type", eq: "custom" } },
    showRightAction: { control: "boolean", name: "Show Right Action", if: { arg: "type", eq: "custom" } },
    disabled: { control: "boolean" },
  },
  args: {
    type: "filter",
    showLeftIcon: true,
    showRightIndicator: false,
    showRightAction: false,
    disabled: false,
  },
}

export default meta

export const Playground: StoryObj = {
  render: (args: any) => (
    <div className="w-[300px]">
      {args.type === "filter" && (
        <div className="flex">
          <InputGroup className="flex-1 rounded-r-none border-r-0">
            <InputGroupAddon align="inline-start"><Search /></InputGroupAddon>
            <InputGroupInput placeholder="Search..." disabled={args.disabled} />
          </InputGroup>
          <button
            className="flex size-8 shrink-0 items-center justify-center rounded-r-sm border border-input bg-background shadow-xs text-muted-foreground hover:text-foreground hover:border-primary"
            disabled={args.disabled}
          >
            <Sliders />
          </button>
        </div>
      )}
      {args.type === "browse" && (
        <div className="flex">
          <InputGroup className="flex-1 rounded-r-none border-r-0">
            <InputGroupInput placeholder="Select file..." disabled={args.disabled} />
          </InputGroup>
          <Button variant="outline" className="rounded-l-none border-l-0" disabled={args.disabled}>
            Browse
          </Button>
        </div>
      )}
      {args.type === "custom" && (
        <InputGroup>
          {args.showLeftIcon && (
            <InputGroupAddon align="inline-start"><Search /></InputGroupAddon>
          )}
          <InputGroupInput placeholder="Search..." disabled={args.disabled} />
          {args.showRightIndicator && (
            <InputGroupAddon align="inline-end"><DangerSmall /></InputGroupAddon>
          )}
          {args.showRightAction && (
            <InputGroupAddon align="inline-end">
              <InputGroupButton size="icon-xs" variant="ghost"><CloseSmall /></InputGroupButton>
            </InputGroupAddon>
          )}
        </InputGroup>
      )}
    </div>
  ),
}

export const AllTypes: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-6 w-[300px]">
      <div className="flex flex-col gap-1">
        <p className="text-[12px] text-muted-foreground">Filter (Input + Sliders icon)</p>
        <div className="flex">
          <InputGroup className="flex-1 rounded-r-none border-r-0">
            <InputGroupAddon align="inline-start"><Search /></InputGroupAddon>
            <InputGroupInput placeholder="Search..." />
          </InputGroup>
          <button className="flex size-8 shrink-0 items-center justify-center rounded-r-sm border border-input bg-background shadow-xs text-muted-foreground hover:text-foreground hover:border-primary [&_svg:not([class*='size-'])]:size-4">
            <Sliders />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[12px] text-muted-foreground">Browse (Input + Browse button)</p>
        <div className="flex">
          <InputGroup className="flex-1 rounded-r-none border-r-0">
            <InputGroupInput placeholder="Select file..." />
          </InputGroup>
          <Button variant="outline" className="rounded-l-none border-l-0">Browse</Button>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[12px] text-muted-foreground">Custom (icon + action)</p>
        <InputGroup>
          <InputGroupAddon align="inline-start"><Search /></InputGroupAddon>
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon align="inline-end">
            <InputGroupButton size="icon-xs" variant="ghost"><CloseSmall /></InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  ),
}
