import type { Meta, StoryObj } from "@storybook/react"
import { Alert, AlertIcon, AlertContent, AlertTitle, AlertDescription, AlertAction, AlertClose } from "dbui/components/ui/alert"
import { Button } from "dbui/components/ui/button"
import { DangerFill } from "@/components/icons/DangerFill"
import { WarningFill } from "@/components/icons/WarningFill"
import { InfoFill } from "@/components/icons/InfoFill"
import { CheckCircleFill } from "@/components/icons/CheckCircleFill"
import { ComponentMeta } from "./components/ComponentMeta"
import manifest from "../../../../specs/components/alert.manifest.json"

const variantConfig: { variant: "danger" | "warning" | "info" | "success"; icon: React.ReactNode; label: string }[] = [
  { variant: "info", icon: <InfoFill />, label: "Info (default)" },
  { variant: "danger", icon: <DangerFill />, label: "Danger" },
  { variant: "warning", icon: <WarningFill />, label: "Warning" },
  { variant: "success", icon: <CheckCircleFill />, label: "Success" },
]

const meta: Meta = {
  title: "Overlays/Alert",
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
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Alert</h2>

      <table style={{ borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0", width: 120 }}>Variant</th>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0" }}>Preview</th>
          </tr>
        </thead>
        <tbody>
          {variantConfig.map(({ variant, icon, label: name }) => (
            <tr key={variant}>
              <td style={{ padding: "14px 24px 14px 0", verticalAlign: "top", ...rowLabel }}>{name}</td>
              <td style={{ padding: "14px 24px 14px 0" }}>
                <div className="w-[480px]">
                  <Alert variant={variant}>
                    <AlertIcon>{icon}</AlertIcon>
                    <AlertContent>
                      <AlertTitle>Alert title</AlertTitle>
                      <AlertDescription>Description to clarify what the user needs to do.</AlertDescription>
                    </AlertContent>
                    <AlertAction>
                      <Button variant="outline" size="sm">Label</Button>
                    </AlertAction>
                    <AlertClose />
                  </Alert>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ComponentMeta manifest={manifest} />
    </div>
  ),
}
