import React, { useState } from "react"
import { Button } from "dbui/components/ui/button"
import { Input } from "dbui/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "dbui/components/ui/tabs"
import { Search } from "dbui/components/icons/Search"
import { Home } from "dbui/components/icons/Home"
import { Share } from "dbui/components/icons/Share"
import { Folder } from "dbui/components/icons/Folder"
import { Star } from "dbui/components/icons/Star"
import { Trash } from "dbui/components/icons/Trash"
import { Notebook } from "dbui/components/icons/Notebook"
import { Table } from "dbui/components/icons/Table"
import { Dashboard } from "dbui/components/icons/Dashboard"
import { CloseSmall } from "dbui/components/icons/CloseSmall"

const workspaceNav = [
  { icon: Home, label: "Home" },
  { icon: Share, label: "Shared with me" },
  { icon: Folder, label: "Workspace" },
  { icon: Star, label: "Favorites" },
  { icon: Trash, label: "Trash" },
]

const recentItems = [
  { name: "access_policies", path: "home_mudit_mittal/bricksearch_governance", time: "4 days ago" },
  { name: "governance_revenue", path: "home_mudit_mittal/bricksearch_governance", time: "4 days ago" },
  { name: "Bricksearch: AI Governance", path: "Users/mudit.mittal@databricks.com", time: "5 days ago" },
  { name: "Bricksearch: Performance", path: "Users/mudit.mittal@databricks.com", time: "5 days ago" },
  { name: "Bricksearch: Compute", path: "Users/mudit.mittal@databricks.com", time: "5 days ago" },
]

/**
 * SearchPopup — the command palette / quick search overlay.
 *
 * Opens when user clicks the search bar in Platform Header.
 * Left panel: workspace navigation tree. Right panel: tabbed recent items.
 */
export function SearchPopup({ onClose }: { onClose?: () => void }) {
  const [query, setQuery] = useState("")
  const [activeNav, setActiveNav] = useState("Home")

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-overlay" />

      {/* Popup */}
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 mt-1 w-full bg-background border border-border rounded-md shadow-lg overflow-hidden"
        style={{ maxWidth: 720, maxHeight: "80vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-2 px-4 h-12 border-b border-border">
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

        <div className="flex" style={{ minHeight: 320, maxHeight: "calc(80vh - 48px)" }}>
          {/* Left — workspace nav */}
          <div className="w-[200px] shrink-0 border-r border-border py-2 overflow-y-auto">
            <div className="px-3 py-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Workspace
            </div>
            {workspaceNav.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.label}
                  className={`flex items-center gap-2 w-full px-3 py-1.5 text-[13px] text-left transition-colors ${
                    activeNav === item.label
                      ? "bg-accent text-accent-foreground font-semibold"
                      : "text-foreground hover:bg-hover"
                  }`}
                  onClick={() => setActiveNav(item.label)}
                >
                  <Icon className="size-4 text-muted-foreground" />
                  {item.label}
                </button>
              )
            })}
          </div>

          {/* Right — tabbed results */}
          <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
            {/* Tabs */}
            <div className="px-4 pt-2">
              <Tabs defaultValue="notebooks">
                <TabsList>
                  <TabsTrigger value="notebooks">Notebooks</TabsTrigger>
                  <TabsTrigger value="tables">Tables</TabsTrigger>
                  <TabsTrigger value="jobs">Jobs</TabsTrigger>
                  <TabsTrigger value="dashboards">Dashboards</TabsTrigger>
                  <TabsTrigger value="assets">My assets</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Recent items */}
            <div className="flex-1 overflow-y-auto px-2 py-2">
              <div className="px-2 py-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Recents
              </div>
              {recentItems.map((item) => (
                <button
                  key={item.name}
                  className="flex items-start gap-3 w-full px-2 py-2 rounded-sm text-left hover:bg-hover transition-colors"
                >
                  <Notebook className="size-4 shrink-0 text-muted-foreground mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] text-foreground truncate">{item.name}</div>
                    <div className="text-[12px] text-muted-foreground truncate">{item.path}</div>
                  </div>
                  <span className="shrink-0 text-[12px] text-muted-foreground">{item.time}</span>
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-border">
              <button className="text-[13px] text-primary hover:underline">
                Open search in a full page
              </button>
              <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
                <kbd className="px-1.5 py-0.5 rounded border border-border text-[11px]">⌘</kbd>
                <span>+</span>
                <kbd className="px-1.5 py-0.5 rounded border border-border text-[11px]">Enter</kbd>
                <span className="ml-1">Open in a new tab</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
