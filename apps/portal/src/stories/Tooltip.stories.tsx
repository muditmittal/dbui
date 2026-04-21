import type { Meta, StoryObj } from "@storybook/react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "dbui/components/ui/tooltip"
import { Button } from "dbui/components/ui/button"
import { ComponentMeta } from "./components/ComponentMeta"
import componentSource from "dbui/components/ui/tooltip?raw"
import { ProductionMap } from "./components/ProductionMap"

const meta: Meta = {
  title: "Overlays/Tooltip",
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

const rowLabel: React.CSSProperties = {
  fontSize: 12,
  color: "#6F6F6F",
}

export const Playground: StoryObj = {
  render: () => (
    <div>
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Tooltip</h2>

      <table style={{ borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0", width: 100 }}>Position</th>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0" }}>Preview</th>
          </tr>
        </thead>
        <tbody>
          {(["top", "right", "bottom", "left"] as const).map((side) => (
            <tr key={side}>
              <td style={{ padding: "14px 24px 14px 0", verticalAlign: "middle", ...rowLabel }}>{side}</td>
              <td style={{ padding: "14px 24px 14px 0" }}>
                <div className="flex items-center justify-center" style={{ padding: 32 }}>
                  <TooltipProvider>
                    <Tooltip defaultOpen>
                      <TooltipTrigger render={<Button variant="outline" />}>
                        Hover me
                      </TooltipTrigger>
                      <TooltipContent side={side}>
                        Helpful tip text
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <ComponentMeta source={componentSource} componentKey="tooltip" />

      <ProductionMap componentKey="tooltip" />
    </div>
  ),
}
