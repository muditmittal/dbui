import type { Meta, StoryObj } from "@storybook/react"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupButton } from "dbui/components/ui/input-group"
import { Button } from "dbui/components/ui/button"
import { Search } from "@/components/icons/Search"
import { Sliders } from "@/components/icons/Sliders"
import { CloseSmall } from "@/components/icons/CloseSmall"
import { ComponentMeta } from "./components/ComponentMeta"
import manifest from "../../../../specs/components/input-group.manifest.json"

const meta: Meta = {
  title: "Controls/InputGroup",
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
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Input Group</h2>

      <table style={{ borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0", width: 140 }}>Type</th>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0" }}>Preview</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: "14px 24px 14px 0", verticalAlign: "top", ...rowLabel }}>Icon addon</td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <div className="w-[300px]">
                <InputGroup>
                  <InputGroupAddon align="inline-start"><Search /></InputGroupAddon>
                  <InputGroupInput placeholder="Search..." />
                </InputGroup>
              </div>
            </td>
          </tr>
          <tr>
            <td style={{ padding: "14px 24px 14px 0", verticalAlign: "top", ...rowLabel }}>Button addon</td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <div className="w-[300px] flex">
                <InputGroup className="flex-1 rounded-r-none border-r-0">
                  <InputGroupInput placeholder="Select file..." />
                </InputGroup>
                <Button variant="outline" className="rounded-l-none border-l-0">Browse</Button>
              </div>
            </td>
          </tr>
          <tr>
            <td style={{ padding: "14px 24px 14px 0", verticalAlign: "top", ...rowLabel }}>Icon + action</td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <div className="w-[300px]">
                <InputGroup>
                  <InputGroupAddon align="inline-start"><Search /></InputGroupAddon>
                  <InputGroupInput placeholder="Search..." />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton size="icon-xs" variant="ghost"><CloseSmall /></InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <ComponentMeta manifest={manifest} />
    </div>
  ),
}
