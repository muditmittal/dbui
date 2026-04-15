import type { Meta, StoryObj } from "@storybook/react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel, SelectSeparator } from "dbui/components/ui/select"
import { ComponentMeta } from "./components/ComponentMeta"
import manifest from "../../../../specs/components/select.manifest.json"

const meta: Meta = {
  title: "Controls/Select",
  parameters: { layout: "padded" },
}

export default meta

const sectionLabel: React.CSSProperties = {
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
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Select</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {/* Default — simple */}
        <div>
          <div style={sectionLabel}>Default</div>
          <div style={{ width: 240 }}>
            <Select defaultValue="notebook">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="notebook">Notebook</SelectItem>
                <SelectItem value="query">Query</SelectItem>
                <SelectItem value="dashboard">Dashboard</SelectItem>
                <SelectItem value="pipeline">Pipeline</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Ghost — with grouped options to show depth */}
        <div>
          <div style={sectionLabel}>Ghost</div>
          <div style={{ fontSize: 12, color: "#6F6F6F", marginBottom: 8 }}>No border by default, gains border on hover. Grouped options.</div>
          <Select defaultValue="notebook">
            <SelectTrigger variant="ghost"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Workspace</SelectLabel>
                <SelectItem value="notebook">Notebook</SelectItem>
                <SelectItem value="query">Query</SelectItem>
                <SelectItem value="dashboard">Dashboard</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Data Engineering</SelectLabel>
                <SelectItem value="pipeline">Pipeline</SelectItem>
                <SelectItem value="job">Job</SelectItem>
                <SelectItem value="workflow">Workflow</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ComponentMeta manifest={manifest} />
    </div>
  ),
}
