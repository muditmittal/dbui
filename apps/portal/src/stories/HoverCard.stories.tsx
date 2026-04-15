import type { Meta, StoryObj } from "@storybook/react"
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "dbui/components/ui/hover-card"

const meta: Meta = {
  title: "Overlays/HoverCard",
  parameters: { layout: "padded" },
}

export default meta

export const Playground: StoryObj = {
  render: () => (
    <div>
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>HoverCard</h2>

      <div style={{ paddingTop: 8 }}>
        <HoverCard defaultOpen>
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
      </div>
    </div>
  ),
}
