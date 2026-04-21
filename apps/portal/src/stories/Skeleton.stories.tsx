import type { Meta, StoryObj } from "@storybook/react"
import { Skeleton } from "dbui/components/ui/skeleton"
import { ComponentMeta } from "./components/ComponentMeta"
import componentSource from "dbui/components/ui/skeleton?raw"
import { ProductionMap } from "./components/ProductionMap"

const meta: Meta = {
  title: "Content/Skeleton",
  parameters: { layout: "padded" },
}

export default meta

const label: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: 0.5,
  color: "#8C8C8C",
  marginBottom: 8,
}

export const Playground: StoryObj = {
  render: () => (
    <div>
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Skeleton</h2>

      <table style={{ borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0", width: 120 }}>Shape</th>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0" }}>Preview</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: "14px 24px 14px 0", color: "#6F6F6F", fontSize: 12, verticalAlign: "top" }}>Text lines</td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <div className="flex flex-col gap-2 w-[260px]">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </td>
          </tr>
          <tr>
            <td style={{ padding: "14px 24px 14px 0", color: "#6F6F6F", fontSize: 12, verticalAlign: "top" }}>Circle (avatar)</td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <Skeleton className="size-10 rounded-full" />
            </td>
          </tr>
          <tr>
            <td style={{ padding: "14px 24px 14px 0", color: "#6F6F6F", fontSize: 12, verticalAlign: "top" }}>Rectangle (card)</td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <Skeleton className="h-[120px] w-[260px] rounded-xl" />
            </td>
          </tr>
        </tbody>
      </table>


      <ComponentMeta source={componentSource} />

      <ProductionMap componentKey="skeleton" />
    </div>
  ),
}
