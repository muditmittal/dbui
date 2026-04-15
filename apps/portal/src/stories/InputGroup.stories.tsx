import type { Meta, StoryObj } from "@storybook/react"
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

/**
 * Matches Figma InputGroup exactly:
 * - Wrapper: flex, no border by default. On focus-within: border-primary rounded-sm shadow-xs wraps both.
 * - Input: 3-sided border (left/top/bottom), rounded-left only. On parent focus: drops own border.
 * - Button: full border (or border-l only when parent focused), rounded-right only, 32×32.
 */
function SearchFilter() {
  return (
    <div className="group/ig flex w-[240px] items-center rounded-sm border border-transparent focus-within:border-primary focus-within:shadow-xs">
      <input
        placeholder="Search"
        className="h-8 flex-1 min-w-0 rounded-l-sm border-y border-l border-input bg-background px-3 text-[13px] leading-[20px] shadow-xs outline-none placeholder:text-muted-foreground group-focus-within/ig:border-transparent group-focus-within/ig:shadow-none"
      />
      <button
        aria-label="Filter"
        className="flex size-8 shrink-0 items-center justify-center rounded-r-sm border border-input bg-background shadow-xs text-muted-foreground transition-colors hover:bg-hover hover:text-foreground active:bg-press focus-visible:border-ring focus-visible:bg-accent group-focus-within/ig:border-l group-focus-within/ig:border-y-0 group-focus-within/ig:border-r-0 group-focus-within/ig:shadow-none group-focus-within/ig:border-input [&_svg]:size-4"
      >
        <Sliders />
      </button>
    </div>
  )
}

function SearchBrowse() {
  return (
    <div className="group/ig flex w-[240px] items-center rounded-sm border border-transparent focus-within:border-primary focus-within:shadow-xs">
      <input
        placeholder="Search"
        className="h-8 flex-1 min-w-0 rounded-l-sm border-y border-l border-input bg-background px-3 text-[13px] leading-[20px] shadow-xs outline-none placeholder:text-muted-foreground group-focus-within/ig:border-transparent group-focus-within/ig:shadow-none"
      />
      <button
        className="flex h-8 shrink-0 items-center justify-center rounded-r-sm border border-input bg-background px-3 shadow-xs text-[13px] text-foreground transition-colors hover:bg-hover active:bg-press focus-visible:border-ring focus-visible:bg-accent group-focus-within/ig:border-l group-focus-within/ig:border-y-0 group-focus-within/ig:border-r-0 group-focus-within/ig:shadow-none group-focus-within/ig:border-input"
      >
        Browse
      </button>
    </div>
  )
}

export const Playground: StoryObj = {
  render: () => (
    <div>
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Input Group</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <div>
          <div style={sectionLabel}>Filter</div>
          <div style={{ fontSize: 12, color: "#6F6F6F", marginBottom: 8 }}>Search input with Sliders icon button</div>
          <SearchFilter />
        </div>

        <div>
          <div style={sectionLabel}>Browse</div>
          <div style={{ fontSize: 12, color: "#6F6F6F", marginBottom: 8 }}>Search input with Browse text button</div>
          <SearchBrowse />
        </div>
      </div>

      <ComponentMeta manifest={manifest} />
    </div>
  ),
}
