import type { Meta, StoryObj } from "@storybook/react"
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "dbui/components/ui/hover-card"

const meta: Meta<typeof HoverCard> = {
  title: "Feedback/HoverCard",
  component: HoverCard,
}

export default meta
type Story = StoryObj<typeof HoverCard>

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger className="cursor-pointer text-[13px] text-primary underline underline-offset-3">
        @mudit.mittal
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
              MM
            </div>
            <div>
              <p className="text-[13px] font-semibold">Mudit Mittal</p>
              <p className="text-[12px] text-muted-foreground">Product Designer</p>
            </div>
          </div>
          <p className="text-[12px] text-muted-foreground">
            Working on DBUI Design System — bridging Figma and code for Databricks.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
}
