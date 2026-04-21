import React, { useState } from "react"
import { Button } from "dbui/components/ui/button"
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
        className="absolute left-0 right-0 top-0 z-50 bg-background border border-border rounded-md shadow-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-2 px-3 h-10 border-b border-border">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            autoFocus
            className="flex-1 min-w-0 bg-transparent text-[13px] text-foreground placeholder:text-muted-foreground outline-none"
            placeholder="Search data, notebooks, recents, and more..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button variant="ghost" size="icon-md" aria-label="Close" onClick={onClose}>
            <CloseSmall />
          </Button>
        </div>

        {/* Filter toggles */}
        <div className="flex items-center gap-1.5 px-3 py-2">
          {filters.map((f) => {
            const Icon = f.icon
            const isActive = activeFilter === f.label
            return (
              <button
                key={f.label}
                className={`flex items-center gap-1.5 rounded-sm border px-2 h-7 text-[12px] transition-colors ${
                  isActive
                    ? "border-primary bg-accent text-foreground"
                    : "border-border text-foreground hover:bg-hover"
                }`}
                onClick={() => setActiveFilter(isActive ? null : f.label)}
              >
                <Icon className="size-3.5" />
                {f.label}
              </button>
            )
          })}
        </div>

        {/* Recents */}
        <div className="px-3 pt-1 pb-0.5">
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Recents</span>
        </div>
        <div className="max-h-[320px] overflow-y-auto">
          {recentItems.map((item) => (
            <button
              key={item.name}
              className="flex items-start gap-3 w-full px-3 py-2 text-left hover:bg-hover transition-colors"
            >
              <Notebook className="size-4 shrink-0 text-muted-foreground mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="text-[13px] text-foreground truncate">{item.name}</div>
                <div className="text-[12px] text-muted-foreground truncate">{item.path}</div>
              </div>
              <span className="shrink-0 text-[12px] text-muted-foreground whitespace-nowrap">{item.time}</span>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-3 py-2 border-t border-border">
          <button className="flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors">
            <Search className="size-4" />
            Open search in a full page
          </button>
          <div className="flex items-center gap-1 text-[12px] text-muted-foreground">
            <kbd className="px-1 py-0.5 rounded border border-border text-[11px]">⌘</kbd>
            <span>+</span>
            <kbd className="px-1 py-0.5 rounded border border-border text-[11px]">Enter</kbd>
            <span className="ml-1">Open in a new tab</span>
          </div>
        </div>
      </div>
    </>
  )
}
