import type { Meta, StoryObj } from "@storybook/react"
import { Checkbox } from "dbui/components/ui/checkbox"
import { ComponentMeta } from "./components/ComponentMeta"
import manifest from "../../../../specs/components/checkbox.manifest.json"

const meta: Meta = {
  title: "Controls/Checkbox",
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
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Checkbox</h2>

      <table style={{ borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0", width: 120 }}>State</th>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0" }}>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: "14px 24px 14px 0", color: "#6F6F6F", fontSize: 12 }}>Unchecked</td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <label className="group/field flex cursor-pointer items-center gap-2">
                <Checkbox id="cb-unchecked" />
                <span className="text-[13px] leading-[20px]">Accept terms</span>
              </label>
            </td>
          </tr>
          <tr>
            <td style={{ padding: "14px 24px 14px 0", color: "#6F6F6F", fontSize: 12 }}>Checked</td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <label className="group/field flex cursor-pointer items-center gap-2">
                <Checkbox id="cb-checked" defaultChecked />
                <span className="text-[13px] leading-[20px]">Accept terms</span>
              </label>
            </td>
          </tr>
          <tr>
            <td style={{ padding: "14px 24px 14px 0", color: "#6F6F6F", fontSize: 12 }}>Indeterminate</td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <label className="group/field flex cursor-pointer items-center gap-2">
                <Checkbox id="cb-indeterminate" indeterminate />
                <span className="text-[13px] leading-[20px]">Select all</span>
              </label>
            </td>
          </tr>
        </tbody>
      </table>

      <ComponentMeta manifest={manifest} />
    </div>
  ),
}
