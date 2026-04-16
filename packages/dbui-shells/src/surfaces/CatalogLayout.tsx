import React, { useState, useMemo } from "react"
import { Popover } from "@base-ui/react/popover"
import { Button } from "dbui/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "dbui/components/ui/tabs"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCellTitle, TableCellIcon, TableCellTitleContent, TableCellMeta } from "dbui/components/ui/table"
import { DataTreeView, type TreeSectionData, type TreeNode } from "dbui/components/ui/data-tree"
import { ChevronDown } from "dbui/components/icons/ChevronDown"
import { ChevronLeft } from "dbui/components/icons/ChevronLeft"
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

// ─── Helpers ───

type BreadcrumbEntry = { id: string; label: string; icon?: React.ReactNode }

/** Find a node by ID and return the path to it */
function findNodePath(sections: TreeSectionData[], targetId: string): BreadcrumbEntry[] | null {
  for (const section of sections) {
    for (const node of section.nodes) {
      const path = findInNode(node, targetId)
      if (path) return path
    }
  }
  return null
}

function findInNode(node: TreeNode, targetId: string, path: BreadcrumbEntry[] = []): BreadcrumbEntry[] | null {
  const current = [...path, { id: node.id, label: node.label, icon: node.icon }]
  if (node.id === targetId) return current
  if (node.children) {
    for (const child of node.children) {
      const found = findInNode(child, targetId, current)
      if (found) return found
    }
  }
  return null
}

/** Find a node by ID and return it */
function findNode(sections: TreeSectionData[], targetId: string): TreeNode | null {
  for (const section of sections) {
    for (const node of section.nodes) {
      const found = findNodeById(node, targetId)
      if (found) return found
    }
  }
  return null
}

function findNodeById(node: TreeNode, targetId: string): TreeNode | null {
  if (node.id === targetId) return node
  if (node.children) {
    for (const child of node.children) {
      const found = findNodeById(child, targetId)
      if (found) return found
    }
  }
  return null
}

// ─── Tree filtering ───

function filterTreeNodes(nodes: TreeNode[], query: string): TreeNode[] {
  if (!query) return nodes
  const q = query.toLowerCase()
  return nodes.reduce<TreeNode[]>((acc, node) => {
    const labelMatch = node.label.toLowerCase().includes(q)
    const filteredChildren = node.children ? filterTreeNodes(node.children, query) : undefined
    const hasMatchingChildren = filteredChildren && filteredChildren.length > 0
    if (labelMatch || hasMatchingChildren) {
      acc.push({
        ...node,
        children: hasMatchingChildren ? filteredChildren : node.children,
        defaultExpanded: hasMatchingChildren ? true : node.defaultExpanded,
      })
    }
    return acc
  }, [])
}

function filterSections(sections: TreeSectionData[], query: string): TreeSectionData[] {
  if (!query) return sections
  return sections.map((section) => ({
    ...section,
    nodes: filterTreeNodes(section.nodes, query),
  })).filter((section) => section.nodes.length > 0)
}

// ─── Catalog Tree Panel ───

function CatalogTree({
  sections,
  allSections,
  focusedNodeId,
  focusPath,
  onSelect,
  onFocusNode,
  onUnfocus,
  filter,
}: {
  sections: TreeSectionData[]
  allSections: TreeSectionData[]
  focusedNodeId: string | null
  focusPath: BreadcrumbEntry[]
  onSelect?: (id: string) => void
  onFocusNode?: (id: string, label: string, icon?: React.ReactNode) => void
  onUnfocus?: () => void
  filter?: React.ReactNode
}) {
  const focusedNode = focusPath.length > 0 ? focusPath[focusPath.length - 1] : null

  return (
    <aside className="flex w-[280px] shrink-0 flex-col border-r border-border">
      {/* Header — static or root switcher */}
      <div className="flex items-center justify-between px-2 py-2">
        {focusedNode ? (
          <div className="flex items-center gap-1 min-w-0 flex-1">
            {/* Back button */}
            <button
              onClick={onUnfocus}
              className="flex size-6 shrink-0 items-center justify-center rounded-sm text-muted-foreground hover:bg-hover hover:text-foreground"
              aria-label="Go back"
            >
              <ChevronLeft className="size-4" />
            </button>
            {/* Root switcher dropdown */}
            <Popover.Root>
              <Popover.Trigger
                render={
                  <button className="flex items-center gap-1 min-w-0 rounded-sm bg-muted px-2 py-1 text-[13px] text-foreground hover:bg-hover">
                    <span className="flex shrink-0 items-center text-muted-foreground [&_svg]:size-4">{focusedNode.icon}</span>
                    <span className="truncate">{focusedNode.label}</span>
                  </button>
                }
              />
              <Popover.Portal>
                <Popover.Positioner side="bottom" sideOffset={4} align="start" className="z-50">
                  <Popover.Popup className="w-[240px] rounded-md bg-popover shadow-md ring-1 ring-foreground/10 overflow-hidden p-1">
                    {/* Breadcrumb path */}
                    {focusPath.map((entry, i) => (
                      <button
                        key={entry.id}
                        className={`flex w-full min-h-7 items-center gap-2 rounded-sm px-1.5 py-1 text-[13px] hover:bg-hover ${
                          i === focusPath.length - 1 ? "bg-active text-foreground" : "text-foreground"
                        }`}
                        onClick={() => {
                          if (i === 0 && onUnfocus) onUnfocus()
                          else if (onFocusNode) onFocusNode(entry.id, entry.label, entry.icon)
                        }}
                      >
                        <span className="flex shrink-0 items-center text-muted-foreground [&_svg]:size-4">{entry.icon}</span>
                        {entry.label}
                      </button>
                    ))}
                  </Popover.Popup>
                </Popover.Positioner>
              </Popover.Portal>
            </Popover.Root>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-2">
            <span className="text-[13px] font-semibold text-foreground">Catalog</span>
            <span className="inline-block size-2 rounded-full bg-success" />
          </div>
        )}
        <div className="flex items-center gap-1 shrink-0">
          <Button variant="ghost" size="icon-sm" aria-label="Add"><Plus /></Button>
          <Button variant="ghost" size="icon-sm" aria-label="More"><Overflow /></Button>
        </div>
      </div>

      {/* Filter slot */}
      {filter && <div className="px-3 pb-2">{filter}</div>}

      {/* Tree */}
      <div className="flex-1 overflow-y-auto px-1 pb-4">
        <DataTreeView sections={sections} onSelect={onSelect} onFocusNode={onFocusNode} />
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
      <div className="px-6">
        <Tabs defaultValue={tabs[0]?.toLowerCase()}>
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab} value={tab.toLowerCase()}>{tab}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
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

export function CatalogLayout({
  sections,
  items = [],
  title = "Catalog",
  tabs,
  actions,
  filter,
  onTreeSelect,
  onTreeSearch,
  children,
}: {
  sections: TreeSectionData[]
  items?: CatalogItem[]
  title?: string
  tabs?: string[]
  actions?: React.ReactNode
  filter?: React.ReactNode
  onTreeSelect?: (id: string) => void
  onTreeSearch?: (query: string) => void
  children?: React.ReactNode
}) {
  const [searchQuery, setSearchQuery] = useState("")
  const [focusedNodeId, setFocusedNodeId] = useState<string | null>(null)

  // Compute the breadcrumb path to the focused node
  const focusPath = useMemo(() => {
    if (!focusedNodeId) return []
    return findNodePath(sections, focusedNodeId) || []
  }, [sections, focusedNodeId])

  // When focused, show only the focused node's children as the tree
  const displaySections = useMemo(() => {
    let base = sections
    if (focusedNodeId) {
      const node = findNode(sections, focusedNodeId)
      if (node?.children) {
        // Show children directly, no sections
        base = [{ label: "", nodes: node.children, defaultExpanded: true }]
      }
    }
    return filterSections(base, searchQuery)
  }, [sections, focusedNodeId, searchQuery])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    onTreeSearch?.(query)
  }

  const handleFocus = (id: string, label: string, icon?: React.ReactNode) => {
    setFocusedNodeId(id)
  }

  const handleUnfocus = () => {
    // Go up one level in the path
    if (focusPath.length > 1) {
      setFocusedNodeId(focusPath[focusPath.length - 2].id)
    } else {
      setFocusedNodeId(null)
    }
  }

  const filterWithSearch = filter && React.isValidElement(filter)
    ? React.cloneElement(filter as React.ReactElement<any>, { onSearch: handleSearch })
    : filter

  return (
    <div className="flex h-full">
      <CatalogTree
        sections={displaySections}
        allSections={sections}
        focusedNodeId={focusedNodeId}
        focusPath={focusPath}
        onSelect={onTreeSelect}
        onFocusNode={handleFocus}
        onUnfocus={handleUnfocus}
        filter={filterWithSearch}
      />
      {children ?? (
        <CatalogLanding title={title} items={items} tabs={tabs} actions={actions} />
      )}
    </div>
  )
}

export { CatalogTree, CatalogLanding }
export type { TreeSectionData as CatalogSection }
