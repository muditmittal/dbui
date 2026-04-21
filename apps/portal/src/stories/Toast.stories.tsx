import type { Meta, StoryObj } from "@storybook/react"
import { CheckCircleFill } from "@/components/icons/CheckCircleFill"
import { DangerFill } from "@/components/icons/DangerFill"
import { WarningFill } from "@/components/icons/WarningFill"
import { InfoFill } from "@/components/icons/InfoFill"
import { ComponentMeta } from "./components/ComponentMeta"
import componentSource from "dbui/components/ui/sonner?raw"
import { ProductionMap } from "./components/ProductionMap"

const meta: Meta = {
  title: "Overlays/Toast",
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

const toastVariants: { type: string; icon: React.ReactNode; message: string; color: string }[] = [
  { type: "Success", icon: <CheckCircleFill />, message: "Cluster created successfully", color: "#277C43" },
  { type: "Error", icon: <DangerFill />, message: "Failed to start cluster", color: "#C82D4C" },
  { type: "Warning", icon: <WarningFill />, message: "Cluster will auto-terminate in 10 min", color: "#BE501E" },
  { type: "Info", icon: <InfoFill />, message: "New runtime version available", color: "#2272B4" },
]

export const Playground: StoryObj = {
  render: () => (
    <div>
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Toast</h2>

      <table style={{ borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0", width: 100 }}>Type</th>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0" }}>Preview</th>
          </tr>
        </thead>
        <tbody>
          {toastVariants.map(({ type, icon, message, color }) => (
            <tr key={type}>
              <td style={{ padding: "14px 24px 14px 0", color: "#6F6F6F", fontSize: 12 }}>{type}</td>
              <td style={{ padding: "14px 24px 14px 0" }}>
                <div className="flex w-[360px] items-center gap-3 rounded-md border border-border bg-background px-4 py-3 shadow-md">
                  <span style={{ color, flexShrink: 0 }}>{icon}</span>
                  <span className="text-[13px] leading-[20px]">{message}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <ComponentMeta source={componentSource} componentKey="sonner" />

      <ProductionMap componentKey="sonner" />
    </div>
  ),
}
