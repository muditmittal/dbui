import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupButton } from "dbui/components/ui/input-group"
import { Popover } from "@base-ui/react/popover"
import { Checkbox } from "dbui/components/ui/checkbox"
import { Switch } from "dbui/components/ui/switch"
import { Button } from "dbui/components/ui/button"
import { Sliders } from "@/components/icons/Sliders"
import { Search } from "@/components/icons/Search"
import { ChevronLeft } from "@/components/icons/ChevronLeft"
import { ChevronRight } from "@/components/icons/ChevronRight"
import { Close } from "@/components/icons/Close"
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

/* ── Faceted Filter Data ── */

const facets: Record<string, { values: string[]; nested?: Record<string, string[]> }> = {
  "Type": { values: ["Table", "View", "Materialized View", "Streaming Table"] },
  "Tag": {
    values: ["billing", "production", "cost_center", "class", "marketing", "finance", "env"],
    nested: {
      "class": ["email", "phone_number", "us_passport", "ip_address", "location", "name"],
      "env": ["dev", "staging", "production", "sandbox"],
    },
  },
  "Column": { values: ["id", "name", "email", "created_at", "updated_at", "status"] },
  "Location": { values: ["us-east-1", "us-west-2", "eu-west-1", "ap-southeast-1"] },
}

/* ── Faceted Filter Component ── */

function FacetedFilter() {
  const [open, setOpen] = useState(false)
  const [activeFacet, setActiveFacet] = useState<string | null>(null)
  const [activeNested, setActiveNested] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<Record<string, Set<string>>>({})
  const [showCanUse, setShowCanUse] = useState(false)

  const toggleValue = (facet: string, value: string) => {
    setSelected((prev) => {
      const next = { ...prev }
      const set = new Set(next[facet] || [])
      if (set.has(value)) set.delete(value)
      else set.add(value)
      next[facet] = set
      return next
    })
  }

  const selectedChips = Object.entries(selected).flatMap(([facet, values]) =>
    Array.from(values).map((v) => ({ facet, value: v }))
  )

  const resetAll = () => {
    setSelected({})
    setActiveFacet(null)
    setActiveNested(null)
    setSearch("")
  }

  const currentValues = activeNested && activeFacet
    ? facets[activeFacet]?.nested?.[activeNested] || []
    : activeFacet
      ? facets[activeFacet]?.values || []
      : []

  const filteredValues = search
    ? currentValues.filter((v) => v.toLowerCase().includes(search.toLowerCase()))
    : currentValues

  return (
    <div className="w-[320px]">
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger
          render={
            <div>
              <InputGroup>
                {selectedChips.length > 0 && (
                  <InputGroupAddon align="inline-start" className="gap-1">
                    {selectedChips.slice(0, 2).map((chip) => (
                      <span
                        key={`${chip.facet}:${chip.value}`}
                        className="inline-flex items-center gap-0.5 rounded-sm bg-accent px-1.5 py-0.5 text-[12px] text-primary"
                      >
                        {chip.facet}: {chip.value}
                        <button
                          className="ml-0.5 text-primary/60 hover:text-primary [&_svg]:size-3"
                          onClick={(e) => { e.stopPropagation(); toggleValue(chip.facet, chip.value) }}
                        >
                          <Close />
                        </button>
                      </span>
                    ))}
                    {selectedChips.length > 2 && (
                      <span className="text-[12px] text-muted-foreground">+{selectedChips.length - 2}</span>
                    )}
                    <button className="text-[12px] text-primary hover:underline" onClick={(e) => { e.stopPropagation(); resetAll() }}>Reset</button>
                  </InputGroupAddon>
                )}
                <InputGroupInput placeholder="Search" readOnly className="cursor-pointer" />
                <InputGroupAddon align="inline-end" className="border-l border-input pl-0 pr-0">
                  <InputGroupButton
                    size="icon-sm"
                    variant="ghost"
                    aria-label="Filter"
                    className="size-[30px] rounded-none rounded-r-[3px]"
                    onClick={() => setOpen(!open)}
                  >
                    <Sliders />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </div>
          }
        />
        <Popover.Portal>
          <Popover.Positioner side="bottom" sideOffset={4} align="start" className="z-50">
            <Popover.Popup className="w-[240px] rounded-md bg-popover shadow-md ring-1 ring-foreground/10 overflow-hidden">

              {/* Facet list (root level) */}
              {!activeFacet && (
                <div className="p-1">
                  {Object.keys(facets).map((facet) => {
                    const count = selected[facet]?.size || 0
                    return (
                      <button
                        key={facet}
                        className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-[13px] text-foreground hover:bg-hover"
                        onClick={() => { setActiveFacet(facet); setSearch("") }}
                      >
                        <span className="flex-1 text-left">{facet}:</span>
                        {count > 0 && <span className="text-[12px] text-primary">{count}</span>}
                        <span className="text-muted-foreground [&_svg]:size-4"><ChevronRight /></span>
                      </button>
                    )
                  })}
                  <div className="mx-1 my-1 h-px bg-border" />
                  <label className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-[13px] text-foreground cursor-pointer hover:bg-hover">
                    <Switch checked={showCanUse} onCheckedChange={setShowCanUse} />
                    <span className="flex-1">Show can-use only</span>
                  </label>
                </div>
              )}

              {/* Facet values (drilled in) */}
              {activeFacet && !activeNested && (
                <div>
                  {/* Header */}
                  <button
                    className="flex w-full items-center gap-1.5 border-b border-border px-2 py-1.5 text-[13px] font-semibold text-foreground hover:bg-hover"
                    onClick={() => { setActiveFacet(null); setSearch("") }}
                  >
                    <span className="text-muted-foreground [&_svg]:size-4"><ChevronLeft /></span>
                    {activeFacet}:
                  </button>
                  {/* Search */}
                  <div className="p-1">
                    <div className="flex items-center gap-1.5 rounded-sm border border-input bg-background px-2 py-1">
                      <span className="text-muted-foreground [&_svg]:size-3.5"><Search /></span>
                      <input
                        className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        autoFocus
                      />
                      {search && (
                        <button className="text-muted-foreground hover:text-foreground [&_svg]:size-3.5" onClick={() => setSearch("")}>
                          <Close />
                        </button>
                      )}
                    </div>
                  </div>
                  {/* Values */}
                  <div className="max-h-[200px] overflow-y-auto p-1">
                    {filteredValues.map((value) => {
                      const hasNested = facets[activeFacet]?.nested?.[value]
                      const isChecked = selected[activeFacet]?.has(value) || false
                      return (
                        <button
                          key={value}
                          className="flex w-full items-center gap-2 rounded-sm px-2 py-1 text-[13px] text-foreground hover:bg-hover"
                          onClick={() => hasNested ? setActiveNested(value) : toggleValue(activeFacet, value)}
                        >
                          <Checkbox checked={isChecked} className="pointer-events-none" />
                          <span className="flex-1 text-left">{value}</span>
                          {hasNested && <span className="text-muted-foreground [&_svg]:size-4"><ChevronRight /></span>}
                        </button>
                      )
                    })}
                    {filteredValues.length === 0 && (
                      <div className="py-3 text-center text-[13px] text-muted-foreground">No results found.</div>
                    )}
                  </div>
                </div>
              )}

              {/* Nested values (second drill-down) */}
              {activeFacet && activeNested && (
                <div>
                  {/* Header */}
                  <button
                    className="flex w-full items-center gap-1.5 border-b border-border px-2 py-1.5 text-[13px] font-semibold text-foreground hover:bg-hover"
                    onClick={() => { setActiveNested(null); setSearch("") }}
                  >
                    <span className="text-muted-foreground [&_svg]:size-4"><ChevronLeft /></span>
                    {activeFacet}:
                  </button>
                  {/* Search */}
                  <div className="p-1">
                    <div className="flex items-center gap-1.5 rounded-sm border border-input bg-background px-2 py-1">
                      <span className="text-muted-foreground [&_svg]:size-3.5"><Search /></span>
                      <input
                        className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        autoFocus
                      />
                      {search && (
                        <button className="text-muted-foreground hover:text-foreground [&_svg]:size-3.5" onClick={() => setSearch("")}>
                          <Close />
                        </button>
                      )}
                    </div>
                  </div>
                  {/* Values */}
                  <div className="max-h-[200px] overflow-y-auto p-1">
                    {filteredValues.map((value) => {
                      const fullValue = `${activeNested}/${value}`
                      const isChecked = selected[activeFacet]?.has(fullValue) || false
                      return (
                        <button
                          key={value}
                          className="flex w-full items-center gap-2 rounded-sm px-2 py-1 text-[13px] text-foreground hover:bg-hover"
                          onClick={() => toggleValue(activeFacet, fullValue)}
                        >
                          <Checkbox checked={isChecked} className="pointer-events-none" />
                          <span className="flex-1 text-left">{value}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    </div>
  )
}

/* ── Simple variants ── */

function FilterSimple() {
  return (
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
  )
}

function BrowseSimple() {
  return (
    <div className="w-[240px]">
      <InputGroup>
        <InputGroupInput placeholder="Search" />
        <InputGroupAddon align="inline-end" className="border-l border-input pl-0 pr-0">
          <InputGroupButton variant="ghost" className="h-[30px] rounded-none rounded-r-[3px] px-3">Browse</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

export const Playground: StoryObj = {
  render: () => (
    <div>
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Input Group</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {/* Faceted Filter — interactive */}
        <div>
          <div style={sectionLabel}>Faceted Filter</div>
          <div style={{ fontSize: 12, color: "#6F6F6F", marginBottom: 8 }}>Click the Sliders icon to open drill-down filter menu</div>
          <FacetedFilter />
        </div>

        {/* Simple Filter */}
        <div>
          <div style={sectionLabel}>Filter</div>
          <div style={{ fontSize: 12, color: "#6F6F6F", marginBottom: 8 }}>Search input with Sliders icon button</div>
          <FilterSimple />
        </div>

        {/* Browse */}
        <div>
          <div style={sectionLabel}>Browse</div>
          <div style={{ fontSize: 12, color: "#6F6F6F", marginBottom: 8 }}>Search input with Browse text button</div>
          <BrowseSimple />
        </div>
      </div>

      <ComponentMeta manifest={manifest} />
    </div>
  ),
}
