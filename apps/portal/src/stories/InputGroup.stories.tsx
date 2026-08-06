import type { Meta, StoryObj } from "@storybook/react"
import { Sliders } from "@/components/icons/Sliders"
import { ComponentMeta } from "./components/ComponentMeta"
import componentSource from "dbui/components/ui/input-group?raw"
import { ProductionMap } from "./components/ProductionMap"

const meta: Meta = {
  title: "Components/Controls/InputGroup",
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
 * - Wrapper: flex, no border by default. On focus-within: border-border-strong rounded-1 shadow-xs wraps both.
 * - Input: 3-sided border (left/top/bottom), rounded-left only. On parent focus: drops own border.
 * - Button: full border (or border-l only when parent focused), rounded-right only, 32×32.
 */
function SearchFilter() {
  return (
    <div className="group/ig flex w-[240px] items-center rounded-1 outline outline-1 outline-transparent focus-within:outline-focus-ring">
      <input
        placeholder="Search"
        className="h-8 flex-1 min-w-0 rounded-l-1 border-y border-l border-input-border-base bg-surface-base px-3 text-[13px] leading-[20px] shadow-xs outline-none placeholder:text-text-subtle group-focus-within/ig:border-transparent group-focus-within/ig:shadow-none"
      />
      <button
        aria-label="Filter"
        className="flex size-8 shrink-0 items-center justify-center rounded-r-1 border border-input-border-base bg-surface-base shadow-xs text-text-subtle transition-colors hover:bg-action-default-hover hover:text-text-base active:bg-action-selected-press focus-visible:border-focus-ring focus-visible:bg-surface-accent group-focus-within/ig:border-l group-focus-within/ig:border-y-0 group-focus-within/ig:border-r-0 group-focus-within/ig:shadow-none group-focus-within/ig:border-input-border-base [&_svg]:size-4"
      >
        <Sliders />
      </button>
    </div>
  )
}

function SearchBrowse() {
  return (
    <div className="group/ig flex w-[240px] items-center rounded-1 outline outline-1 outline-transparent focus-within:outline-focus-ring">
      <input
        placeholder="Search"
        className="h-8 flex-1 min-w-0 rounded-l-1 border-y border-l border-input-border-base bg-surface-base px-3 text-[13px] leading-[20px] shadow-xs outline-none placeholder:text-text-subtle group-focus-within/ig:border-transparent group-focus-within/ig:shadow-none"
      />
      <button
        className="flex h-8 shrink-0 items-center justify-center rounded-r-1 border border-input-border-base bg-surface-base px-3 shadow-xs text-[13px] text-text-base transition-colors hover:bg-action-default-hover active:bg-action-selected-press focus-visible:border-focus-ring focus-visible:bg-surface-accent group-focus-within/ig:border-l group-focus-within/ig:border-y-0 group-focus-within/ig:border-r-0 group-focus-within/ig:shadow-none group-focus-within/ig:border-input-border-base"
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


      <ComponentMeta source={componentSource} componentKey="input-group" />

      <ProductionMap componentKey="input-group" />
    </div>
  ),
}
