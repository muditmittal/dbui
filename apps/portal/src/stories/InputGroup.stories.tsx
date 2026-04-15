import type { Meta, StoryObj } from "@storybook/react"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupButton } from "dbui/components/ui/input-group"
import { Sliders } from "@/components/icons/Sliders"
import { ComponentMeta } from "./components/ComponentMeta"
import manifest from "../../../../specs/components/input-group.manifest.json"

const meta: Meta = {
  title: "Controls/InputGroup",
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
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Input Group</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {/* Filter variant */}
        <div>
          <div style={sectionLabel}>Filter</div>
          <div style={{ fontSize: 12, color: "#6F6F6F", marginBottom: 8 }}>Search input with Sliders icon button</div>
          <div className="w-[240px]">
            <InputGroup>
              <InputGroupInput placeholder="Search" />
              <InputGroupAddon align="inline-end" className="border-l border-input pl-0 pr-0">
                <InputGroupButton size="icon-sm" variant="ghost" aria-label="Filter" className="size-[30px] rounded-none rounded-r-[3px]">
                  <Sliders />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>

        {/* Browse variant */}
        <div>
          <div style={sectionLabel}>Browse</div>
          <div style={{ fontSize: 12, color: "#6F6F6F", marginBottom: 8 }}>Search input with Browse text button</div>
          <div className="w-[240px]">
            <InputGroup>
              <InputGroupInput placeholder="Search" />
              <InputGroupAddon align="inline-end" className="border-l border-input pl-0 pr-0">
                <InputGroupButton variant="ghost" className="h-[30px] rounded-none rounded-r-[3px] px-3">Browse</InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
      </div>

      <ComponentMeta manifest={manifest} />
    </div>
  ),
}
