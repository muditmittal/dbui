import type { Meta, StoryObj } from "@storybook/react"
import { Progress } from "dbui/components/ui/progress"
import { ComponentMeta } from "./components/ComponentMeta"
import componentSource from "dbui/components/ui/progress?raw"
import { ProductionMap } from "./components/ProductionMap"

const meta: Meta = {
  title: "Components/Content/Progress",
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
            <span className="text-[13px] font-semibold text-text-base">Uploading data</span>
            <span className="text-[13px] text-text-base">50%</span>
          </div>
          <Progress value={50} />
          <span className="text-[12px] leading-[16px] text-text-subtle">Processing...</span>
        </div>

        {/* Completed */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-text-base">Import complete</span>
            <span className="text-[13px] text-text-base">100%</span>
          </div>
          <Progress value={100} />
          <span className="text-[12px] leading-[16px] text-text-subtle">Done</span>
        </div>

        {/* Just started */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-text-base">Indexing tables</span>
            <span className="text-[13px] text-text-base">12%</span>
          </div>
          <Progress value={12} />
          <span className="text-[12px] leading-[16px] text-text-subtle">Scanning catalog...</span>
        </div>
      </div>


      <ComponentMeta source={componentSource} componentKey="progress" />

      <ProductionMap componentKey="progress" />
    </div>
  ),
}
