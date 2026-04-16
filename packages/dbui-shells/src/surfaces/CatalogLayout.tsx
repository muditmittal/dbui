import React, { useState, useMemo } from "react"
import { Popover } from "@base-ui/react/popover"
import { Button } from "dbui/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "dbui/components/ui/tabs"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCellTitle, TableCellIcon, TableCellTitleContent, TableCellMeta } from "dbui/components/ui/table"
import { DataTreeView, type TreeSectionData, type TreeNode } from "dbui/components/ui/data-tree"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuGroup, DropdownMenuItemIcon, DropdownMenuItemDescription, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent } from "dbui/components/ui/dropdown-menu"
import { Input } from "dbui/components/ui/input"
import { Badge } from "dbui/components/ui/badge"
import { ChevronDown } from "dbui/components/icons/ChevronDown"
import { ChevronLeft } from "dbui/components/icons/ChevronLeft"
import { Data } from "dbui/components/icons/Data"
import { Plus } from "dbui/components/icons/Plus"
import { Overflow } from "dbui/components/icons/Overflow"
import { Catalog } from "dbui/components/icons/Catalog"
import { Database } from "dbui/components/icons/Database"
import { Table as TableIcon } from "dbui/components/icons/Table"
import { TableView } from "dbui/components/icons/TableView"
import { Models } from "dbui/components/icons/Models"
import { Function } from "dbui/components/icons/Function"
import { FolderCloud } from "dbui/components/icons/FolderCloud"
import { Key } from "dbui/components/icons/Key"
import { Shield } from "dbui/components/icons/Shield"
import { Tag } from "dbui/components/icons/Tag"
import { Search } from "dbui/components/icons/Search"
import { PlusSquare } from "dbui/components/icons/PlusSquare"
import { Ingestion } from "dbui/components/icons/Ingestion"
import { CloudUpload } from "dbui/components/icons/CloudUpload"
import { ArrowsConnect } from "dbui/components/icons/ArrowsConnect"
import { Share } from "dbui/components/icons/Share"
import { Globe } from "dbui/components/icons/Globe"
import { Check } from "dbui/components/icons/Check"
import { UserGroup } from "dbui/components/icons/UserGroup"
import { Toggle } from "dbui/components/ui/toggle"
import { ButtonChevron } from "dbui/components/ui/button"

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
  goToItems,
  onSelect,
  onFocusNode,
  onUnfocus,
  filter,
}: {
  sections: TreeSectionData[]
  allSections: TreeSectionData[]
  focusedNodeId: string | null
  focusPath: BreadcrumbEntry[]
  goToItems?: BreadcrumbEntry[]
  onSelect?: (id: string) => void
  onFocusNode?: (id: string, label: string, icon?: React.ReactNode) => void
  onUnfocus?: () => void
  filter?: React.ReactNode
}) {
  const currentRoot = focusPath.length > 0 ? focusPath[focusPath.length - 1] : null
  const defaultIcon = <Data />

  return (
    <aside className="flex w-[280px] shrink-0 flex-col border-r border-border">
      {/* Header — h-10, px-2, gap-2 — always shows root switcher chip */}
      <div className="flex h-10 items-center gap-2 px-2">
        {/* Back button — only when focused deeper than root */}
        {currentRoot && (
          <button
            onClick={onUnfocus}
            className="flex size-6 shrink-0 items-center justify-center rounded-sm text-muted-foreground hover:bg-hover hover:text-foreground"
            aria-label="Go back"
          >
            <ChevronLeft className="size-4" />
          </button>
        )}

        {/* Root switcher chip — Figma: bg-muted, rounded-sm, py-1 px-1 pr-2, gap-1 */}
        <Popover.Root>
          <Popover.Trigger
            render={
              <button className="flex items-center gap-1 min-w-0 rounded-sm bg-muted py-1 pl-1 pr-2 text-[13px] text-foreground hover:bg-hover active:bg-press transition-colors">
                <span className="flex shrink-0 items-center gap-0.5 text-muted-foreground [&_svg]:size-4">
                  <span className="text-[11px] font-mono text-muted-foreground">./</span>
                  {currentRoot?.icon ?? defaultIcon}
                </span>
                <span className="truncate max-w-[140px]">{currentRoot?.label ?? "Catalog"}</span>
              </button>
            }
          />
          <Popover.Portal>
            <Popover.Positioner side="bottom" sideOffset={4} align="start" className="z-50">
              <Popover.Popup className="w-[240px] rounded-md bg-popover shadow-md ring-1 ring-foreground/10 overflow-hidden p-1">
                {/* Path — default shows "Catalog" as root; when focused shows indented breadcrumb */}
                {focusPath.length > 0 ? (
                  focusPath.map((entry, i) => {
                    const isCurrent = i === focusPath.length - 1
                    return (
                      <button
                        key={entry.id}
                        className={`flex w-full min-h-7 items-center gap-2 rounded-sm py-1 text-[13px] hover:bg-hover text-foreground ${isCurrent ? "bg-active" : ""}`}
                        style={{ paddingLeft: `${6 + i * 12}px` }}
                        onClick={() => {
                          if (i === 0 && focusPath.length === 1 && onUnfocus) onUnfocus()
                          else if (onFocusNode) onFocusNode(entry.id, entry.label, entry.icon)
                        }}
                      >
                        <span className="flex shrink-0 items-center text-muted-foreground [&_svg]:size-4">{entry.icon}</span>
                        <span className="truncate">{entry.label}</span>
                      </button>
                    )
                  })
                ) : (
                  <button
                    className="flex w-full min-h-7 items-center gap-2 rounded-sm px-1.5 py-1 text-[13px] bg-active text-foreground hover:bg-hover"
                  >
                    <span className="flex shrink-0 items-center text-muted-foreground [&_svg]:size-4">{defaultIcon}</span>
                    Catalog
                  </button>
                )}

                {/* Go to section */}
                <div className="my-1 h-px bg-border" />
                <div className="px-1.5 py-1 text-[12px] text-muted-foreground">Go to</div>
                {(goToItems ?? []).map((item) => (
                  <button
                    key={item.id}
                    className="flex w-full min-h-7 items-center gap-2 rounded-sm px-1.5 py-1 text-[13px] text-foreground hover:bg-hover"
                    onClick={() => {
                      if (onFocusNode) onFocusNode(item.id, item.label, item.icon)
                    }}
                  >
                    <span className="flex shrink-0 items-center text-muted-foreground [&_svg]:size-4">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>

        {/* Spacer */}
        <span className="flex-1" />

        {/* Header actions — 4px gap between buttons */}
        <div className="flex items-center gap-1 shrink-0">

        {/* ── Warehouse picker (status dot) ── */}
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <Button variant="ghost" size="icon-md" aria-label="Warehouse">
              <span className="inline-block size-2 rounded-full bg-success" />
            </Button>
          } />
          <DropdownMenuContent align="start" className="w-[280px]">
            <div className="p-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input placeholder="Search" className="pl-8 h-8" />
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Check className="size-4" />
                <span className="inline-block size-2 rounded-full bg-success" />
                <span className="flex-1">Shared SQL Warehouse</span>
                <Badge variant="outline">Serverless</Badge>
                <span className="text-[12px] text-muted-foreground">M</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span className="size-4" />
                <span className="inline-block size-2 rounded-full bg-success" />
                <span className="flex-1">ML Data</span>
                <Badge variant="outline">Serverless</Badge>
                <span className="text-[12px] text-muted-foreground">S</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <span className="size-4" />
                <span className="inline-block size-2 rounded-full bg-success" />
                <span className="flex-1">Pro warehouse 1</span>
                <span className="text-[12px] text-muted-foreground">M</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span className="size-4" />
                <span className="inline-block size-2 rounded-full bg-success" />
                <span className="flex-1">Pro warehouse 2</span>
                <span className="text-[12px] text-muted-foreground">S</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* ── Create/Add menu (plus) ── */}
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <Button variant="ghost" size="icon-md" aria-label="Add"><Plus /></Button>
          } />
          <DropdownMenuContent align="start" className="w-[240px] max-h-none">
            <DropdownMenuItem>
              <DropdownMenuItemIcon><Plus /></DropdownMenuItemIcon>
              Add data
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DropdownMenuItemIcon><PlusSquare /></DropdownMenuItemIcon>
              Create table here
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <DropdownMenuItemIcon><Catalog /></DropdownMenuItemIcon>
              Catalog
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DropdownMenuItemIcon><Database /></DropdownMenuItemIcon>
              Schema
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <DropdownMenuItemIcon><TableIcon /></DropdownMenuItemIcon>
                Table
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Managed table</DropdownMenuItem>
                <DropdownMenuItem>External table</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <DropdownMenuItemIcon><TableView /></DropdownMenuItemIcon>
                View
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>View</DropdownMenuItem>
                <DropdownMenuItem>Materialized view</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <DropdownMenuItemIcon><FolderCloud /></DropdownMenuItemIcon>
              Volume
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DropdownMenuItemIcon><Models /></DropdownMenuItemIcon>
              Model
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DropdownMenuItemIcon><Function /></DropdownMenuItemIcon>
              Function
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <DropdownMenuItemIcon><Key /></DropdownMenuItemIcon>
              Credential
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DropdownMenuItemIcon><Globe /></DropdownMenuItemIcon>
              External location
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <DropdownMenuItemIcon><Ingestion /></DropdownMenuItemIcon>
              Ingest via partner
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DropdownMenuItemIcon><CloudUpload /></DropdownMenuItemIcon>
              Upload to volume
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* ── Overflow menu (governance) ── */}
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <Button variant="ghost" size="icon-md" aria-label="More"><Overflow /></Button>
          } />
          <DropdownMenuContent align="start" className="w-[220px]">
            <DropdownMenuItem>
              <div>
                Governance hub
                <DropdownMenuItemDescription>Tags, Policies, Rules</DropdownMenuItemDescription>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delta sharing</DropdownMenuItem>
            <DropdownMenuItem>Clean rooms</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>External locations</DropdownMenuItem>
            <DropdownMenuItem>Credentials</DropdownMenuItem>
            <DropdownMenuItem>Connections</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Browse DBFS</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        </div>{/* end header actions */}
      </div>

      {/* Filter slot — px-2 aligns with root switcher */}
      {filter && <div className="px-2 pb-2">{filter}</div>}

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
  filters = ["Suggested", "Recents", "Favorites"],
  actions,
}: {
  title?: string
  items?: CatalogItem[]
  filters?: string[]
  actions?: React.ReactNode
}) {
  const [activeFilter, setActiveFilter] = useState(filters[0])

  return (
    <div className="flex-1 min-w-0 overflow-y-auto">
      {/* Title row */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="flex shrink-0 items-center text-muted-foreground [&_svg]:size-5"><Data /></span>
          <h1 className="text-[22px] font-semibold leading-[28px] text-foreground" style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif" }}>
            {title}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {actions ?? (
            <>
              <Button variant="outline">Govern</Button>
              <Button variant="outline">Connect<ButtonChevron /></Button>
              <Button variant="outline"><span className="flex items-center text-muted-foreground [&_svg]:size-4"><UserGroup /></span>Share<ButtonChevron /></Button>
              <Button>Create<ButtonChevron /></Button>
            </>
          )}
        </div>
      </div>

      {/* Filter toggles */}
      <div className="flex items-center gap-1 px-6 pb-4">
        {filters.map((filter) => (
          <Toggle
            key={filter}
            variant="pill"
            size="sm"
            pressed={activeFilter === filter}
            onPressedChange={() => setActiveFilter(filter)}
          >
            {filter}
          </Toggle>
        ))}
      </div>

      {/* Results table */}
      <div className="px-6">
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
                  <div className="flex items-start gap-2">
                    <span className="flex shrink-0 items-center text-muted-foreground mt-0.5 [&_svg]:size-4">
                      {item.icon ?? <Data />}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[13px] leading-[20px] text-foreground">{item.name}</span>
                      {item.subtitle && <span className="text-[12px] leading-[16px] text-muted-foreground">{item.subtitle}</span>}
                    </div>
                  </div>
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
  goToItems,
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
  /** Quick-jump items shown in root switcher dropdown under "Go to" */
  goToItems?: { id: string; label: string; icon?: React.ReactNode }[]
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
        goToItems={goToItems}
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
