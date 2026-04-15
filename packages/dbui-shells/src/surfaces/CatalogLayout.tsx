import React, { useState } from "react"
import { Input } from "dbui/components/ui/input"
import { Button } from "dbui/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "dbui/components/ui/tabs"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCellTitle, TableCellIcon, TableCellTitleContent, TableCellMeta } from "dbui/components/ui/table"
import { Separator } from "dbui/components/ui/separator"
import { Search } from "dbui/components/icons/Search"
import { ChevronRight } from "dbui/components/icons/ChevronRight"
import { ChevronDown } from "dbui/components/icons/ChevronDown"
import { Data } from "dbui/components/icons/Data"
import { Folder } from "dbui/components/icons/Folder"
import { Table as TableIcon } from "dbui/components/icons/Table"
import { Gear } from "dbui/components/icons/Gear"

// ─── Types ───

export type TreeNode = {
  id: string
  label: string
  icon?: React.ComponentType<any>
  type?: string
  children?: TreeNode[]
}

export type CatalogItem = {
  name: string
  subtitle?: string
  icon?: React.ComponentType<any>
  reason?: string
  type?: string
}

export type CatalogSection = {
  label: string
  nodes: TreeNode[]
}

// ─── Tree Components ───

function TreeItem({
  node,
  depth = 0,
  selectedId,
  onSelect,
}: {
  node: TreeNode
  depth?: number
  selectedId?: string
  onSelect?: (id: string) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const hasChildren = node.children && node.children.length > 0
  const isSelected = selectedId === node.id
  const Icon = node.icon || Folder

  return (
    <div>
      <button
        className={`flex w-full items-center gap-1 rounded-sm px-2 py-1 text-[13px] leading-[20px] text-left transition-colors
          ${isSelected ? "bg-accent text-accent-foreground font-semibold" : "text-foreground hover:bg-hover"}
        `}
        style={{ paddingLeft: `${8 + depth * 16}px` }}
        onClick={() => {
          if (hasChildren) setExpanded(!expanded)
          onSelect?.(node.id)
        }}
      >
        {hasChildren ? (
          expanded ? <ChevronDown className="size-3 shrink-0 text-muted-foreground" /> : <ChevronRight className="size-3 shrink-0 text-muted-foreground" />
        ) : (
          <span className="w-3 shrink-0" />
        )}
        <Icon className="size-4 shrink-0 text-muted-foreground" />
        <span className="truncate">{node.label}</span>
      </button>
      {expanded && hasChildren && (
        <div>
          {node.children!.map((child) => (
            <TreeItem key={child.id} node={child} depth={depth + 1} selectedId={selectedId} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  )
}

function TreeSection({
  section,
  selectedId,
  onSelect,
}: {
  section: CatalogSection
  selectedId?: string
  onSelect?: (id: string) => void
}) {
  const [expanded, setExpanded] = useState(true)

  return (
    <div className="mt-3">
      <button
        className="flex w-full items-center gap-1 px-2 py-1 text-[12px] leading-[16px] text-muted-foreground hover:text-foreground"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? <ChevronDown className="size-3 shrink-0" /> : <ChevronRight className="size-3 shrink-0" />}
        <span className="truncate font-normal">{section.label}</span>
      </button>
      {expanded && section.nodes.map((node) => (
        <TreeItem key={node.id} node={node} selectedId={selectedId} onSelect={onSelect} />
      ))}
    </div>
  )
}

// ─── Catalog Tree Panel ───

function CatalogTree({
  sections,
  selectedId,
  onSelect,
}: {
  sections: CatalogSection[]
  selectedId?: string
  onSelect?: (id: string) => void
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
          <Button variant="ghost" size="icon-sm" aria-label="Add">
            <span className="text-[16px] leading-none">+</span>
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Settings">
            <Gear className="size-4" />
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="px-3 pb-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input placeholder="Search" className="pl-8 h-8" />
        </div>
      </div>

      {/* Tree */}
      <div className="flex-1 overflow-y-auto px-1 pb-4">
        {sections.map((section, i) => (
          <TreeSection key={i} section={section} selectedId={selectedId} onSelect={onSelect} />
        ))}
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
            {items.map((item, i) => {
              const Icon = item.icon || Data
              return (
                <TableRow key={i} className="cursor-pointer">
                  <TableCell>
                    <TableCellTitle>
                      <TableCellIcon><Icon className="size-4 text-muted-foreground" /></TableCellIcon>
                      <TableCellTitleContent>
                        <span className="font-semibold text-foreground">{item.name}</span>
                        {item.subtitle && <TableCellMeta>{item.subtitle}</TableCellMeta>}
                      </TableCellTitleContent>
                    </TableCellTitle>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{item.reason}</TableCell>
                  <TableCell className="text-muted-foreground">{item.type}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

        {/* Load more */}
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

// ─── Catalog Layout (exported surface) ───

/**
 * CatalogLayout — catalog explorer surface with tree nav + landing page.
 *
 * Usage inside Shell:
 * ```tsx
 * import { Shell } from "dbui-shells/shell"
 * import { CatalogLayout } from "dbui-shells/catalog"
 *
 * <Shell defaultActive="catalog">
 *   <CatalogLayout sections={treeSections} items={catalogItems} />
 * </Shell>
 * ```
 */
export function CatalogLayout({
  sections,
  items = [],
  title = "Catalog",
  tabs,
  actions,
  onTreeSelect,
  selectedTreeId,
  children,
}: {
  sections: CatalogSection[]
  items?: CatalogItem[]
  title?: string
  tabs?: string[]
  actions?: React.ReactNode
  onTreeSelect?: (id: string) => void
  selectedTreeId?: string
  /** Pass children to replace the default landing page with custom content */
  children?: React.ReactNode
}) {
  const [internalSelected, setInternalSelected] = useState(selectedTreeId)
  const selected = selectedTreeId ?? internalSelected

  const handleSelect = (id: string) => {
    setInternalSelected(id)
    onTreeSelect?.(id)
  }

  return (
    <div className="flex h-full">
      <CatalogTree sections={sections} selectedId={selected} onSelect={handleSelect} />
      {children ?? (
        <CatalogLanding title={title} items={items} tabs={tabs} actions={actions} />
      )}
    </div>
  )
}

// Re-export types and sub-components for customization
export { CatalogTree, CatalogLanding, TreeItem, TreeSection }
