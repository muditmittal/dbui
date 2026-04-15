import type { Meta, StoryObj } from "@storybook/react"
import React, { useState, useRef } from "react"
import { Popover } from "@base-ui/react/popover"
import {
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "dbui/components/ui/dropdown-menu"
import { Input } from "dbui/components/ui/input"
import { Switch } from "dbui/components/ui/switch"
import { Sliders } from "@/components/icons/Sliders"
import { Search } from "@/components/icons/Search"
import { ChevronLeft } from "@/components/icons/ChevronLeft"
import { ChevronRight } from "@/components/icons/ChevronRight"
import { Close } from "@/components/icons/Close"

const meta: Meta = {
  title: "Compositions/Faceted Filter",
  parameters: { layout: "padded" },
}

export default meta

/* ── Data ── */

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

function FacetedFilter() {
  const [open, setOpen] = useState(false)
  const [activeFacet, setActiveFacet] = useState<string | null>(null)
  const [activeNested, setActiveNested] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<Record<string, Set<string>>>({})
  const [showCanUse, setShowCanUse] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const toggleValue = (facet: string, value: string) => {
    setSelected((prev) => {
      const next = { ...prev }
      const set = new Set(next[facet] || [])
      if (set.has(value)) set.delete(value)
      else set.add(value)
      if (set.size === 0) delete next[facet]
      else next[facet] = set
      return next
    })
  }

  const isChecked = (facet: string, value: string) => selected[facet]?.has(value) || false

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
    <div className="w-[360px]">
      <div className="group/ig flex items-center rounded-sm border border-transparent focus-within:border-primary focus-within:shadow-xs">
        {/* Chips */}
        {selectedChips.length > 0 && (
          <div className="flex items-center gap-1 pl-2">
            {selectedChips.slice(0, 2).map((chip) => (
              <span
                key={`${chip.facet}:${chip.value}`}
                className="inline-flex items-center gap-0.5 rounded-sm bg-accent px-1.5 py-0.5 text-[12px] text-primary whitespace-nowrap"
              >
                {chip.facet}: {chip.value}
                <button
                  className="ml-0.5 text-primary/60 hover:text-primary [&_svg]:size-3"
                  onClick={() => toggleValue(chip.facet, chip.value)}
                >
                  <Close />
                </button>
              </span>
            ))}
            {selectedChips.length > 2 && (
              <span className="text-[12px] text-muted-foreground whitespace-nowrap">+{selectedChips.length - 2}</span>
            )}
            <button className="text-[12px] text-primary hover:underline whitespace-nowrap" onClick={resetAll}>Reset</button>
          </div>
        )}
        {/* Input */}
        <input
          placeholder="Search"
          className="h-8 flex-1 min-w-0 rounded-l-sm border-y border-l border-input bg-background px-3 text-[13px] leading-[20px] shadow-xs outline-none placeholder:text-muted-foreground group-focus-within/ig:border-transparent group-focus-within/ig:shadow-none"
        />
        {/* Filter button */}
        <Popover.Root
          open={open}
          onOpenChange={(o) => {
            setOpen(o)
            if (!o) { setActiveFacet(null); setActiveNested(null); setSearch("") }
          }}
        >
          <Popover.Trigger
            ref={buttonRef}
            render={
              <button
                aria-label="Filter"
                className="flex size-8 shrink-0 items-center justify-center rounded-r-sm border border-input bg-background shadow-xs text-muted-foreground transition-colors hover:bg-hover hover:text-foreground active:bg-press focus-visible:border-ring focus-visible:bg-accent group-focus-within/ig:border-l group-focus-within/ig:border-y-0 group-focus-within/ig:border-r-0 group-focus-within/ig:shadow-none group-focus-within/ig:border-input [&_svg]:size-4"
              >
                <Sliders />
              </button>
            }
          />
          <Popover.Portal>
            <Popover.Positioner side="bottom" sideOffset={4} align="end" className="z-50">
              <Popover.Popup className="w-[240px] rounded-md bg-popover shadow-md ring-1 ring-foreground/10 overflow-hidden">

                {/* Root: facet categories */}
                {!activeFacet && (
                  <div className="p-1">
                    {Object.keys(facets).map((facet) => {
                      const count = selected[facet]?.size || 0
                      return (
                        <button
                          key={facet}
                          className="flex w-full min-h-7 items-center gap-2 rounded-sm px-1.5 py-1 text-[13px] text-foreground hover:bg-hover cursor-default"
                          onClick={() => { setActiveFacet(facet); setSearch("") }}
                        >
                          <span className="flex-1 text-left">{facet}:</span>
                          {count > 0 && <span className="text-[12px] text-primary">{count}</span>}
                          <span className="text-muted-foreground [&_svg]:size-4"><ChevronRight /></span>
                        </button>
                      )
                    })}
                    <div className="-mx-1 my-1 h-px bg-border" />
                    <label className="flex w-full min-h-7 cursor-pointer items-center gap-2 rounded-sm px-1.5 py-1 text-[13px] text-foreground hover:bg-hover">
                      <Switch checked={showCanUse} onCheckedChange={setShowCanUse} />
                      <span className="flex-1">Show can-use only</span>
                    </label>
                  </div>
                )}

                {/* Drilled in: facet values */}
                {activeFacet && (
                  <div>
                    {/* Back header */}
                    <button
                      className="flex w-full items-center gap-1 px-1.5 py-1.5 text-[13px] text-foreground hover:bg-hover"
                      onClick={() => {
                        if (activeNested) { setActiveNested(null); setSearch("") }
                        else { setActiveFacet(null); setSearch("") }
                      }}
                    >
                      <span className="text-muted-foreground [&_svg]:size-4"><ChevronLeft /></span>
                      {activeFacet}:
                    </button>
                    <div className="h-px bg-border" />

                    {/* Search — uses actual Input component matching .MenuRow/Search */}
                    <div className="p-1">
                      <Input
                        placeholder="Search"
                        value={search}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                        autoFocus
                      />
                    </div>

                    {/* Values — using DropdownMenuCheckboxItem for proper DuBois styling */}
                    <div className="max-h-[220px] overflow-y-auto p-1 pt-0" role="group">
                      {filteredValues.map((value) => {
                        const hasNested = !activeNested && facets[activeFacet]?.nested?.[value]
                        const fullValue = activeNested ? `${activeNested}/${value}` : value
                        const checked = isChecked(activeFacet, fullValue)

                        if (hasNested) {
                          return (
                            <button
                              key={value}
                              className="flex w-full min-h-7 items-center gap-2 rounded-sm px-1.5 py-1 text-[13px] text-foreground hover:bg-hover cursor-default"
                              onClick={() => setActiveNested(value)}
                            >
                              <span className="flex-1 text-left">{value}</span>
                              <span className="text-muted-foreground [&_svg]:size-4"><ChevronRight /></span>
                            </button>
                          )
                        }

                        return (
                          <DropdownMenuCheckboxItem
                            key={value}
                            checked={checked}
                            closeOnClick={false}
                            onCheckedChange={() => toggleValue(activeFacet, fullValue)}
                          >
                            {value}
                          </DropdownMenuCheckboxItem>
                        )
                      })}
                      {filteredValues.length === 0 && (
                        <div className="py-4 text-center text-[13px] text-muted-foreground">No results found.</div>
                      )}
                    </div>
                  </div>
                )}

              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      </div>
    </div>
  )
}

export const Playground: StoryObj = {
  render: () => (
    <div>
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Faceted Filter</h2>

      <div style={{ fontSize: 12, color: "#6F6F6F", marginBottom: 12 }}>Click the Sliders icon to open the drill-down filter menu. Select values, drill into nested facets, and see chips in the search bar.</div>

      <FacetedFilter />
    </div>
  ),
}
