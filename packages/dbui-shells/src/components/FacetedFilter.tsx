import React, { useState, useRef } from "react"
import { Popover } from "@base-ui/react/popover"
import { Input } from "dbui/components/ui/input"
import { Checkbox } from "dbui/components/ui/checkbox"
import { Switch } from "dbui/components/ui/switch"
import { Button } from "dbui/components/ui/button"
import { Tag, TagLabel, TagValue, TagRemove } from "dbui/components/ui/tag"
import { Sliders } from "dbui/components/icons/Sliders"
import { ChevronLeft } from "dbui/components/icons/ChevronLeft"
import { ChevronRight } from "dbui/components/icons/ChevronRight"
import { Close } from "dbui/components/icons/Close"

export type FacetData = Record<string, {
  values: string[]
  nested?: Record<string, string[]>
}>

export function FacetedFilter({
  facets,
  className,
  onSearch,
}: {
  facets: FacetData
  className?: string
  /** Called when the search input value changes */
  onSearch?: (query: string) => void
}) {
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
    <div className={className}>
      {/* Search + Filter button row */}
      <div className="group/ig flex items-center rounded-sm border border-transparent focus-within:border-primary focus-within:shadow-xs">
        <Input
          placeholder="Search"
          className="h-8 flex-1 min-w-0 rounded-l-sm rounded-r-none shadow-xs focus-visible:border-transparent focus-visible:shadow-none"
          onChange={(e) => onSearch?.(e.target.value)}
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
            render={
              <Button
                aria-label="Filter"
                variant="ghost"
                size="icon-md"
                className="rounded-l-none rounded-r-sm border border-input bg-background shadow-xs text-muted-foreground hover:bg-hover hover:text-foreground active:bg-press focus-visible:border-ring focus-visible:bg-accent group-focus-within/ig:border-l group-focus-within/ig:border-y-0 group-focus-within/ig:border-r-0 group-focus-within/ig:shadow-none group-focus-within/ig:border-input [&_svg]:size-4"
              >
                <Sliders />
              </Button>
            }
          />
          <Popover.Portal>
            <Popover.Positioner side="bottom" sideOffset={4} align="start" className="z-50">
              <Popover.Popup className="w-[240px] rounded-md bg-popover shadow-md ring-1 ring-foreground/10 overflow-hidden">

                {/* Root: facet categories */}
                {!activeFacet && (
                  <div className="p-1">
                    {Object.keys(facets).map((facet) => {
                      const count = selected[facet]?.size || 0
                      return (
                        <Button
                          key={facet}
                          variant="ghost"
                          className="h-7 w-full justify-start gap-2 px-1.5 py-1 text-foreground"
                          onClick={() => { setActiveFacet(facet); setSearch("") }}
                        >
                          <span className="flex-1 text-left">{facet}:</span>
                          {count > 0 && <span className="text-[12px] text-primary">{count}</span>}
                          <span className="text-muted-foreground [&_svg]:size-4"><ChevronRight /></span>
                        </Button>
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
                    <Button
                      variant="ghost"
                      className="h-auto w-full justify-start gap-1 px-1.5 py-1.5"
                      onClick={() => {
                        if (activeNested) { setActiveNested(null); setSearch("") }
                        else { setActiveFacet(null); setSearch("") }
                      }}
                    >
                      <span className="text-muted-foreground [&_svg]:size-4"><ChevronLeft /></span>
                      {activeFacet}:
                    </Button>
                    <div className="h-px bg-border" />
                    <div className="p-1">
                      <Input
                        placeholder="Search"
                        value={search}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                        autoFocus
                      />
                    </div>
                    <div className="max-h-56 overflow-y-auto p-1 pt-0" role="group">
                      {filteredValues.map((value) => {
                        const hasNested = !activeNested && facets[activeFacet]?.nested?.[value]
                        const fullValue = activeNested ? `${activeNested}/${value}` : value
                        const checked = isChecked(activeFacet, fullValue)

                        if (hasNested) {
                          return (
                            <div key={value} className="flex w-full min-h-7 items-center gap-2 rounded-sm px-1.5 py-1 text-[13px] text-foreground hover:bg-hover cursor-default">
                              <Checkbox
                                checked={checked}
                                onCheckedChange={() => toggleValue(activeFacet, value)}
                              />
                              <span className="flex-1 text-left">{value}</span>
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                aria-label={`Open ${value}`}
                                onClick={() => setActiveNested(value)}
                              >
                                <ChevronRight />
                              </Button>
                            </div>
                          )
                        }

                        return (
                          <label
                            key={value}
                            className="group/field flex w-full min-h-7 cursor-pointer items-center gap-2 rounded-sm px-1.5 py-1 text-[13px] text-foreground hover:bg-hover"
                          >
                            <Checkbox
                              checked={checked}
                              onCheckedChange={() => toggleValue(activeFacet, fullValue)}
                            />
                            {value}
                          </label>
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

      {/* Filter chips row — one chip per facet, click text to edit */}
      {Object.keys(selected).length > 0 && (
        <div className="flex flex-wrap items-center gap-1 pt-2">
          {Object.entries(selected).map(([facet, values]) => {
            const arr = Array.from(values)
            const first = arr[0]
            const extra = arr.length - 1
            const facetValues = facets[facet]?.values || []
            return (
              <Popover.Root key={facet}>
                <Tag className="max-w-[240px] bg-active text-[12px]">
                  <Popover.Trigger
                    render={
                      <Button variant="ghost" className="h-auto min-w-0 px-0 py-0 hover:underline">
                        <TagLabel className="text-muted-foreground">{facet}</TagLabel>
                        <TagValue className="truncate text-foreground">{first}</TagValue>
                        {extra > 0 && <TagValue className="text-muted-foreground">+{extra}</TagValue>}
                      </Button>
                    }
                  />
                  <TagRemove
                    onClick={() => {
                      setSelected((prev) => {
                        const next = { ...prev }
                        delete next[facet]
                        return next
                      })
                    }}
                  >
                    <Close />
                  </TagRemove>
                </Tag>
                <Popover.Portal>
                  <Popover.Positioner side="bottom" sideOffset={4} align="start" className="z-50">
                    <Popover.Popup className="w-[240px] rounded-md bg-popover shadow-md ring-1 ring-foreground/10 overflow-hidden">
                      <div className="p-1">
                        <div className="px-1.5 py-1 text-[12px] text-muted-foreground">{facet}</div>
                      </div>
                      <div className="max-h-56 overflow-y-auto p-1 pt-0" role="group">
                        {facetValues.map((value) => {
                          const checked = isChecked(facet, value)
                          return (
                            <label
                              key={value}
                              className="group/field flex w-full min-h-7 cursor-pointer items-center gap-2 rounded-sm px-1.5 py-1 text-[13px] text-foreground hover:bg-hover"
                            >
                              <Checkbox
                                checked={checked}
                                onCheckedChange={() => toggleValue(facet, value)}
                              />
                              {value}
                            </label>
                          )
                        })}
                      </div>
                    </Popover.Popup>
                  </Popover.Positioner>
                </Popover.Portal>
              </Popover.Root>
            )
          })}
          <Button variant="link" size="sm" className="h-auto p-0 text-[12px] whitespace-nowrap" onClick={resetAll}>
            Reset
          </Button>
        </div>
      )}
    </div>
  )
}
