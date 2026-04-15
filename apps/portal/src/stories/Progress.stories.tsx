import type { Meta, StoryObj } from "@storybook/react"
import { Progress } from "dbui/components/ui/progress"
import { ComponentMeta } from "./components/ComponentMeta"
import manifest from "../../../../specs/components/progress-bar.manifest.json"

const meta: Meta = {
  title: "Content/Progress",
  parameters: { layout: "padded" },
}

export default meta

export const Playground: StoryObj = {
  render: () => (
    <div>
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Progress</h2>

      <div className="flex flex-col gap-8 w-[400px]">
        {/* Full composition matching Figma: Title + % + bar + status */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-foreground">Uploading data</span>
            <span className="text-[13px] text-foreground">50%</span>
          </div>
          <Progress value={50} />
          <span className="text-[12px] leading-[16px] text-muted-foreground">Processing...</span>
        </div>

        {/* Completed */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-foreground">Import complete</span>
            <span className="text-[13px] text-foreground">100%</span>
          </div>
          <Progress value={100} />
          <span className="text-[12px] leading-[16px] text-muted-foreground">Done</span>
        </div>

        {/* Just started */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-foreground">Indexing tables</span>
            <span className="text-[13px] text-foreground">12%</span>
          </div>
          <Progress value={12} />
          <span className="text-[12px] leading-[16px] text-muted-foreground">Scanning catalog...</span>
        </div>
      </div>

      <ComponentMeta manifest={manifest} />
    </div>
  ),
}
