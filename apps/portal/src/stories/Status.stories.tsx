import type { Meta, StoryObj } from "@storybook/react"
import { Status } from "dbui/components/ui/status"
import { ComponentMeta } from "./components/ComponentMeta"
import manifest from "../../../../specs/components/status.manifest.json"

const allStatuses = ["online", "ready", "offline", "pending", "running", "syncing", "canceled", "stopped", "info", "success", "warning", "error"] as const

const meta: Meta = {
  title: "Content/Status",
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
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Status</h2>

      <table style={{ borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0", width: 120 }}>Status</th>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0" }}>MD</th>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0" }}>SM</th>
          </tr>
        </thead>
        <tbody>
          {allStatuses.map((s) => (
            <tr key={s}>
              <td style={{ padding: "14px 24px 14px 0", verticalAlign: "middle", ...rowLabel, textTransform: "capitalize" }}>{s}</td>
              <td style={{ padding: "14px 24px 14px 0" }}>
                <div className="flex items-center gap-2">
                  <Status status={s} size="md" />
                  <span className="text-[13px] capitalize">{s}</span>
                </div>
              </td>
              <td style={{ padding: "14px 24px 14px 0" }}>
                <div className="flex items-center gap-2">
                  <Status status={s} size="sm" />
                  <span className="text-[12px] text-muted-foreground capitalize">{s}</span>
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
