import React, { useState } from "react"
import { Button } from "dbui/components/ui/button"
import { Input } from "dbui/components/ui/input"
import { FilterToggle } from "dbui/components/ui/toggle"
import { Search } from "dbui/components/icons/Search"
import { Notebook } from "dbui/components/icons/Notebook"
import { Table } from "dbui/components/icons/Table"
import { Workflows } from "dbui/components/icons/Workflows"
import { Dashboard } from "dbui/components/icons/Dashboard"
import { Layer } from "dbui/components/icons/Layer"
import { CloseSmall } from "dbui/components/icons/CloseSmall"

const filters = [
  { icon: Notebook, label: "Notebooks" },
  { icon: Table, label: "Tables" },
  { icon: Workflows, label: "Jobs" },
  { icon: Dashboard, label: "Dashboards" },
  { icon: Layer, label: "My assets" },
]

const recentItems = [
  { name: "access_policies", path: "home_mudit_mittal/bricksearch_governance", time: "viewed 4 days ago" },
  { name: "Bricksearch: Governance", path: "Users/mudit.mittal@databricks.com", time: "viewed 4 days ago" },
  { name: "governance_revenue", path: "home_mudit_mittal/bricksearch_governance", time: "viewed 4 days ago" },
  { name: "Bricksearch: AI Governance", path: "Users/mudit.mittal@databricks.com", time: "viewed 5 days ago" },
  { name: "Bricksearch: Performance", path: "Users/mudit.mittal@databricks.com", time: "viewed 5 days ago" },
  { name: "Bricksearch: Compute", path: "Users/mudit.mittal@databricks.com", time: "viewed 5 days ago" },
]

/**
 * SearchPopup — dropdown command palette anchored to the search bar.
 *
 * Simple vertical list with toggle filter buttons at the top.
 * No backdrop dimming, no left panel. Width matches search input.
 */
export function SearchPopup({ onClose }: { onClose?: () => void }) {
  const [query, setQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  return (
    <>
      {/* Transparent overlay to catch outside clicks */}
      <div className="fixed inset-0 z-40" onClick={onClose} />
      {/* Popup anchored to search input width */}
      <div
        className="absolute left-0 right-0 top-0 z-50 bg-surface-base border border-border-base rounded-2 shadow-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-2 px-3 h-10 border-b border-border-base">
          <Search className="size-4 shrink-0 text-text-subtle" />
          <Input
            autoFocus
            className="flex-1 min-w-0 border-0 bg-transparent shadow-none focus-visible:border-0 focus-visible:shadow-none"
            placeholder="Search data, notebooks, recents, and more..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button variant="ghost" size="icon-md" aria-label="Close" onClick={onClose}>
            <CloseSmall />
          </Button>
        </div>

        {/* Filter toggles */}
        <div className="flex items-center gap-2 px-3 py-2">
          {filters.map((f) => {
            const Icon = f.icon
            const isActive = activeFilter === f.label
            return (
              <FilterToggle
                key={f.label}
                size="sm"
                pressed={isActive}
                onPressedChange={() => setActiveFilter(isActive ? null : f.label)}
              >
                <Icon className="size-3.5" />
                {f.label}
              </FilterToggle>
            )
          })}
        </div>

        {/* Recents */}
        <div className="px-3 pt-1 pb-0.5">
          <span className="type-eyebrow text-text-subtle">Recents</span>
        </div>
        <div className="max-h-[320px] overflow-y-auto">
          {recentItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className="h-auto w-full justify-start px-3 py-2"
            >
              <Notebook className="size-4 shrink-0 text-text-subtle mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="type-label text-text-base truncate">{item.name}</div>
                <div className="type-hint text-text-subtle truncate">{item.path}</div>
              </div>
              <span className="shrink-0 type-hint text-text-subtle whitespace-nowrap">{item.time}</span>
            </Button>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-3 py-2 border-t border-border-base">
          <Button variant="ghost" className="h-auto px-0 text-text-subtle hover:text-text-base">
            <Search className="size-4" />
            Open search in a full page
          </Button>
          <div className="flex items-center gap-1 type-hint text-text-subtle">
            <kbd className="px-1 py-0.5 rounded border border-border-base type-hint">⌘</kbd>
            <span>+</span>
            <kbd className="px-1 py-0.5 rounded border border-border-base type-hint">Enter</kbd>
            <span className="ml-1">Open in a new tab</span>
          </div>
        </div>
      </div>
    </>
  )
}
