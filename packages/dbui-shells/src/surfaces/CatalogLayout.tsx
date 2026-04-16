import React, { useState } from "react"
import { Button } from "dbui/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "dbui/components/ui/tabs"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCellTitle, TableCellIcon, TableCellTitleContent, TableCellMeta } from "dbui/components/ui/table"
import { DataTreeView, type TreeSectionData } from "dbui/components/ui/data-tree"
import { ChevronDown } from "dbui/components/icons/ChevronDown"
import { Data } from "dbui/components/icons/Data"
import { Plus } from "dbui/components/icons/Plus"
import { Overflow } from "dbui/components/icons/Overflow"

// ─── Types ───

export type CatalogItem = {
  name: string
  subtitle?: string
  icon?: React.ReactNode
  reason?: string
  type?: string
}

// ─── Catalog Tree Panel ───

function CatalogTree({
  sections,
  onSelect,
  filter,
}: {
  sections: TreeSectionData[]
  onSelect?: (id: string) => void
  /** Slot for search/filter component above the tree (e.g., FacetedFilter) */
  filter?: React.ReactNode
}) {
  return (
    <aside className="flex w-[280px] shrink-0 flex-col border-r border-border">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-semibold text-foreground">Catalog</span>
          <span className="inline-block size-2 rounded-full bg-success" />
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon-sm" aria-label="Add"><Plus /></Button>
          <Button variant="ghost" size="icon-sm" aria-label="More"><Overflow /></Button>
        </div>
      </div>

      {/* Filter slot */}
      {filter && <div className="px-3 pb-2">{filter}</div>}

      {/* Tree */}
      <div className="flex-1 overflow-y-auto px-1 pb-4">
        <DataTreeView sections={sections} onSelect={onSelect} />
      </div>
    </aside>
  )
}

// ─── Catalog Landing ───

function CatalogLanding({
  title = "Catalog",
  items = [],
  tabs = ["Suggested", "Recents", "Favorites"],
  actions,
}: {
  title?: string
  items?: CatalogItem[]
  tabs?: string[]
  actions?: React.ReactNode
}) {
  return (
    <div className="flex-1 min-w-0 overflow-y-auto">
      {/* Title row */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <Data className="size-5 text-muted-foreground" />
          <h1 className="text-[22px] font-semibold leading-[28px] text-foreground" style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif" }}>
            {title}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {actions ?? (
            <>
              <Button variant="outline">Govern</Button>
              <Button variant="outline">Connect</Button>
              <Button variant="outline">Share</Button>
              <Button>Create</Button>
            </>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6">
        <Tabs defaultValue={tabs[0]?.toLowerCase()}>
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab} value={tab.toLowerCase()}>{tab}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Results table */}
      <div className="px-6 pt-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[45%]">Name</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead className="w-[100px]">Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, i) => (
              <TableRow key={i} className="cursor-pointer">
                <TableCell>
                  <TableCellTitle>
                    <TableCellIcon>{item.icon ?? <Data />}</TableCellIcon>
                    <TableCellTitleContent>
                      <span className="font-semibold text-foreground">{item.name}</span>
                      {item.subtitle && <TableCellMeta>{item.subtitle}</TableCellMeta>}
                    </TableCellTitleContent>
                  </TableCellTitle>
                </TableCell>
                <TableCell className="text-muted-foreground">{item.reason}</TableCell>
                <TableCell className="text-muted-foreground">{item.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {items.length > 0 && (
          <div className="flex justify-center py-4">
            <button className="flex items-center gap-1 text-[13px] text-primary hover:text-primary-hover">
              Load more <ChevronDown className="size-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Catalog Layout ───

/**
 * CatalogLayout — catalog explorer surface with tree nav + landing page.
 * Uses DBUI Tree component with all behaviors (expand, collapse, trail lines, selection, keyboard nav).
 */
export function CatalogLayout({
  sections,
  items = [],
  title = "Catalog",
  tabs,
  actions,
  filter,
  onTreeSelect,
  children,
}: {
  sections: TreeSectionData[]
  items?: CatalogItem[]
  title?: string
  tabs?: string[]
  actions?: React.ReactNode
  /** Search/filter component above the tree */
  filter?: React.ReactNode
  onTreeSelect?: (id: string) => void
  children?: React.ReactNode
}) {
  return (
    <div className="flex h-full">
      <CatalogTree sections={sections} onSelect={onTreeSelect} filter={filter} />
      {children ?? (
        <CatalogLanding title={title} items={items} tabs={tabs} actions={actions} />
      )}
    </div>
  )
}

export { CatalogTree, CatalogLanding }
export type { TreeSectionData as CatalogSection }
