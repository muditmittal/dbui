"use client"

import * as React from "react"
import { Popover } from "@base-ui/react/popover"
import { DataTreeView, type TreeSectionData, type TreeNodeData } from "dbui/components/ui/data-tree"
import { Button, ButtonChevron } from "dbui/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItemIcon,
  DropdownMenuItemDescription,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "dbui/components/ui/dropdown-menu"
import { Input } from "dbui/components/ui/input"
import { Badge } from "dbui/components/ui/badge"
import { ChevronLeft } from "dbui/components/icons/ChevronLeft"
import { Check } from "dbui/components/icons/Check"
import { Plus } from "dbui/components/icons/Plus"
import { Overflow } from "dbui/components/icons/Overflow"
import { PlusSquare } from "dbui/components/icons/PlusSquare"
import { Catalog } from "dbui/components/icons/Catalog"
import { Database } from "dbui/components/icons/Database"
import { Table as TableIcon } from "dbui/components/icons/Table"
import { TableView } from "dbui/components/icons/TableView"
import { FolderCloud } from "dbui/components/icons/FolderCloud"
import { Models } from "dbui/components/icons/Models"
import { Function } from "dbui/components/icons/Function"
import { Key } from "dbui/components/icons/Key"
import { Globe } from "dbui/components/icons/Globe"
import { Ingestion } from "dbui/components/icons/Ingestion"
import { CloudUpload } from "dbui/components/icons/CloudUpload"
import { Search } from "dbui/components/icons/Search"
import { Data } from "dbui/components/icons/Data"
import { FacetedFilter, type FacetData } from "../components/FacetedFilter"
import { cn } from "dbui/lib/utils"

/**
 * @standard DataTreeExplorer
 * @composition true
 * @category browser
 * @useFor Browse hierarchical DATA with grouped sections — catalogs, schemas, models, ML registry. Used in catalog shells, asset picker modals, query editors, anywhere users need to browse a data tree.
 * @avoidFor Flat file/folder structures → use FileTreeExplorer.
 * @synonyms data tree pane, catalog explorer pane, schema browser, registry pane
 * @figma Data Tree Explorer
 * @requiresShell BrowserShell or Base
 * @guideline Default width 280px. Header: root switcher chip + spacer + action cluster (compute / add / overflow). FacetedFilter row below header. Tree fills remaining height.
 * @guideline Header actions are configurable via props (`warehouses`, `addMenuItems`, `overflowMenuItems`) so the same composition serves catalog browsers, asset pickers, query editor sidebars, etc.
 */

// ─── Public types ───

export type BreadcrumbEntry = { id: string; label: string; icon?: React.ReactNode }

export type WarehouseEntry = {
  id: string
  name: string
  serverless?: boolean
  size?: string
  /** Whether it's currently selected. Caller is responsible for state. */
  selected?: boolean
  /** Status: green dot if running, etc. Default running. */
  status?: "running" | "stopped" | "starting" | "error"
}

/** Add-menu item shape. Supports separators and one-level submenus. */
export type AddMenuItem =
  | { type: "separator" }
  | { type: "item"; id: string; label: string; icon?: React.ReactNode; onSelect?: () => void }
  | { type: "submenu"; id: string; label: string; icon?: React.ReactNode; items: AddMenuItem[] }

export type OverflowMenuItem =
  | { type: "separator" }
  | { type: "item"; id: string; label: string; description?: string; onSelect?: () => void }

// ─── Filter helpers ───

function filterTreeNodes(nodes: TreeNodeData[], query: string): TreeNodeData[] {
  if (!query) return nodes
  const q = query.toLowerCase()
  return nodes.reduce<TreeNodeData[]>((acc, node) => {
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
  return sections
    .map((section) => ({
      ...section,
      nodes: filterTreeNodes(section.nodes, query),
    }))
    .filter((section) => section.nodes.length > 0)
}

// ─── Default action-menu content ───
// Catalog-flavored defaults. Override via `addMenuItems`, `overflowMenuItems`,
// or `warehouses` props. Pass `null` to hide a menu entirely.

const DEFAULT_WAREHOUSES: WarehouseEntry[] = [
  { id: "shared-sql", name: "Shared SQL Warehouse", serverless: true, size: "M", selected: true },
  { id: "ml-data", name: "ML Data", serverless: true, size: "S" },
  { id: "pro-1", name: "Pro warehouse 1", size: "M" },
  { id: "pro-2", name: "Pro warehouse 2", size: "S" },
]

const DEFAULT_ADD_MENU_ITEMS: AddMenuItem[] = [
  { type: "item", id: "add-data", label: "Add data", icon: <Plus /> },
  { type: "item", id: "create-table-here", label: "Create table here", icon: <PlusSquare /> },
  { type: "separator" },
  { type: "item", id: "catalog", label: "Catalog", icon: <Catalog /> },
  { type: "item", id: "schema", label: "Schema", icon: <Database /> },
  {
    type: "submenu",
    id: "table",
    label: "Table",
    icon: <TableIcon />,
    items: [
      { type: "item", id: "managed", label: "Managed table" },
      { type: "item", id: "external", label: "External table" },
    ],
  },
  {
    type: "submenu",
    id: "view",
    label: "View",
    icon: <TableView />,
    items: [
      { type: "item", id: "view", label: "View" },
      { type: "item", id: "mat-view", label: "Materialized view" },
    ],
  },
  { type: "separator" },
  { type: "item", id: "volume", label: "Volume", icon: <FolderCloud /> },
  { type: "item", id: "model", label: "Model", icon: <Models /> },
  { type: "item", id: "function", label: "Function", icon: <Function /> },
  { type: "separator" },
  { type: "item", id: "credential", label: "Credential", icon: <Key /> },
  { type: "item", id: "external-location", label: "External location", icon: <Globe /> },
  { type: "separator" },
  { type: "item", id: "ingest-partner", label: "Ingest via partner", icon: <Ingestion /> },
  { type: "item", id: "upload-volume", label: "Upload to volume", icon: <CloudUpload /> },
]

const DEFAULT_OVERFLOW_MENU_ITEMS: OverflowMenuItem[] = [
  { type: "item", id: "governance-hub", label: "Governance hub", description: "Tags, Policies, Rules" },
  { type: "separator" },
  { type: "item", id: "delta-sharing", label: "Delta sharing" },
  { type: "item", id: "clean-rooms", label: "Clean rooms" },
  { type: "separator" },
  { type: "item", id: "external-locations", label: "External locations" },
  { type: "item", id: "credentials", label: "Credentials" },
  { type: "item", id: "connections", label: "Connections" },
  { type: "separator" },
  { type: "item", id: "browse-dbfs", label: "Browse DBFS" },
]

// ─── Internal: render a list of AddMenuItem (with optional submenus) ───

function renderAddMenuItems(items: AddMenuItem[]) {
  return items.map((item, i) => {
    if (item.type === "separator") return <DropdownMenuSeparator key={`sep-${i}`} />
    if (item.type === "submenu") {
      return (
        <DropdownMenuSub key={item.id}>
          <DropdownMenuSubTrigger>
            <DropdownMenuItemIcon>{item.icon}</DropdownMenuItemIcon>
            {item.label}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>{renderAddMenuItems(item.items)}</DropdownMenuSubContent>
        </DropdownMenuSub>
      )
    }
    return (
      <DropdownMenuItem key={item.id} onSelect={item.onSelect}>
        {item.icon && <DropdownMenuItemIcon>{item.icon}</DropdownMenuItemIcon>}
        {item.label}
      </DropdownMenuItem>
    )
  })
}

function renderOverflowMenuItems(items: OverflowMenuItem[]) {
  return items.map((item, i) => {
    if (item.type === "separator") return <DropdownMenuSeparator key={`sep-${i}`} />
    return (
      <DropdownMenuItem key={item.id} onSelect={item.onSelect}>
        {item.description ? (
          <div>
            {item.label}
            <DropdownMenuItemDescription>{item.description}</DropdownMenuItemDescription>
          </div>
        ) : (
          item.label
        )}
      </DropdownMenuItem>
    )
  })
}

// ─── Component ───

export type DataTreeExplorerProps = {
  /** Title shown in the root switcher chip (e.g. "Catalog", "Models"). */
  title?: string
  titleIcon?: React.ReactNode

  /** Focus state for the root switcher. Empty path = at root, showing `title`. */
  focusPath?: BreadcrumbEntry[]
  /** "Go to" quick-jump items shown in the root switcher popover. */
  goToItems?: BreadcrumbEntry[]
  /** Called when user navigates into a focus level. */
  onFocusNode?: (id: string, label: string, icon?: React.ReactNode) => void
  /** Called when user clicks the back button. Required for back button to render. */
  onUnfocus?: () => void

  /** Compute warehouse entries shown in the warehouse picker. Pass `null` to hide. Defaults to a sample list. */
  warehouses?: WarehouseEntry[] | null
  /** Called when a warehouse is selected. */
  onWarehouseSelect?: (id: string) => void

  /** Add-menu items. Pass `null` to hide. Defaults to catalog-flavored entries. */
  addMenuItems?: AddMenuItem[] | null
  /** Overflow-menu items. Pass `null` to hide. Defaults to catalog governance entries. */
  overflowMenuItems?: OverflowMenuItem[] | null

  /** Replace the entire right-side action cluster. When provided, all individual menu props are ignored. */
  headerActions?: React.ReactNode
  /** Replace the entire header (overrides title + root switcher + actions). */
  header?: React.ReactNode

  /** FacetedFilter facets. Pass `null` to disable filter and use a plain search input. */
  facets?: FacetData | null
  /** Search placeholder for the plain search fallback. */
  searchPlaceholder?: string
  /** Hide search/filter row entirely. */
  searchEnabled?: boolean
  /** Controlled search value. */
  searchValue?: string
  onSearchChange?: (value: string) => void

  /** Tree data. */
  sections: TreeSectionData[]
  onSelect?: (id: string) => void
  /** Called when user clicks the overflow menu on a tree node. */
  onNodeMenu?: (id: string, label: string) => void

  width?: number | string
  className?: string
  treeClassName?: string
}

/**
 * DataTreeExplorer — pane composition for browsing grouped hierarchical data.
 *
 * Header: [Back? + Root-switcher chip] [spacer] [Compute picker] [Add menu] [Overflow menu]
 * Filter: FacetedFilter (default) or plain search Input
 * Body:   DataTreeView with the provided sections
 *
 * Pass `headerActions` to fully replace the right-cluster, or override individual menus
 * (`warehouses`, `addMenuItems`, `overflowMenuItems`). Pass `null` to a menu prop to hide it.
 */
export function DataTreeExplorer({
  title = "Catalog",
  titleIcon,
  focusPath = [],
  goToItems,
  onFocusNode,
  onUnfocus,
  warehouses = DEFAULT_WAREHOUSES,
  onWarehouseSelect,
  addMenuItems = DEFAULT_ADD_MENU_ITEMS,
  overflowMenuItems = DEFAULT_OVERFLOW_MENU_ITEMS,
  headerActions,
  header,
  facets,
  searchPlaceholder = "Type to search",
  searchEnabled = true,
  searchValue: searchValueProp,
  onSearchChange,
  sections,
  onSelect,
  onNodeMenu,
  width = 280,
  className,
  treeClassName,
}: DataTreeExplorerProps) {
  const isControlled = searchValueProp !== undefined
  const [internalQuery, setInternalQuery] = React.useState("")
  const query = isControlled ? searchValueProp! : internalQuery

  const handleSearchChange = (val: string) => {
    if (isControlled) onSearchChange?.(val)
    else {
      setInternalQuery(val)
      onSearchChange?.(val)
    }
  }

  const displaySections = isControlled ? sections : filterSections(sections, query)
  const currentRoot = focusPath.length > 0 ? focusPath[focusPath.length - 1] : null
  const defaultIcon = titleIcon ?? <Data />

  // Build the right-action cluster.
  const renderedActions =
    headerActions !== undefined
      ? headerActions
      : (
        <div className="flex items-center gap-1 shrink-0">
          {/* Warehouse picker (compute selector) */}
          {warehouses && (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="ghost" size="icon-md" aria-label="Warehouse">
                    <span
                      className={cn(
                        "inline-block size-2 rounded-full",
                        warehouses.find((w) => w.selected)?.status === "stopped"
                          ? "bg-muted-foreground"
                          : "bg-success"
                      )}
                    />
                  </Button>
                }
              />
              <DropdownMenuContent align="start" className="w-[280px]">
                <div className="p-1">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input placeholder="Search" className="pl-8 h-8" />
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {warehouses.map((w) => (
                    <DropdownMenuItem key={w.id} onSelect={() => onWarehouseSelect?.(w.id)}>
                      {w.selected ? <Check className="size-4" /> : <span className="size-4" />}
                      <span
                        className={cn(
                          "inline-block size-2 rounded-full",
                          w.status === "stopped" ? "bg-muted-foreground" : "bg-success"
                        )}
                      />
                      <span className="flex-1">{w.name}</span>
                      {w.serverless && <Badge variant="outline">Serverless</Badge>}
                      {w.size && <span className="text-[12px] text-muted-foreground">{w.size}</span>}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Add menu */}
          {addMenuItems && (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="ghost" size="icon-md" aria-label="Add">
                    <Plus />
                  </Button>
                }
              />
              <DropdownMenuContent align="start" className="w-[240px] max-h-none">
                {renderAddMenuItems(addMenuItems)}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Overflow menu */}
          {overflowMenuItems && (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="ghost" size="icon-md" aria-label="More">
                    <Overflow />
                  </Button>
                }
              />
              <DropdownMenuContent align="start" className="w-[220px]">
                {renderOverflowMenuItems(overflowMenuItems)}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      )

  return (
    <aside
      data-slot="data-tree-explorer"
      className={cn("flex shrink-0 flex-col border-r border-border bg-background", className)}
      style={{ width }}
    >
      {/* Header — h-10, px-2, gap-2 — root switcher chip + actions */}
      {header ?? (
        <div className="flex h-10 items-center gap-2 px-2">
          {/* Back button — only when focused deeper than root */}
          {currentRoot && onUnfocus && (
            <button
              onClick={onUnfocus}
              className="flex size-6 shrink-0 items-center justify-center rounded-sm text-muted-foreground hover:bg-hover hover:text-foreground"
              aria-label="Go back"
            >
              <ChevronLeft className="size-4" />
            </button>
          )}

          {/* Root switcher chip */}
          <Popover.Root>
            <Popover.Trigger
              render={
                <button className="flex items-center gap-1 min-w-0 rounded-sm bg-muted py-1 pl-1 pr-2 text-[13px] text-foreground hover:bg-hover active:bg-press transition-colors">
                  <span className="flex shrink-0 items-center gap-0.5 text-muted-foreground [&_svg]:size-4">
                    <span className="text-[11px] font-mono text-muted-foreground">./</span>
                    {currentRoot?.icon ?? defaultIcon}
                  </span>
                  <span className="truncate max-w-[140px]">{currentRoot?.label ?? title}</span>
                </button>
              }
            />
            <Popover.Portal>
              <Popover.Positioner side="bottom" sideOffset={4} align="start" className="z-50">
                <Popover.Popup className="w-[240px] rounded-md bg-popover shadow-md ring-1 ring-foreground/10 overflow-hidden p-1">
                  {/* Path */}
                  {focusPath.length > 0 ? (
                    focusPath.map((entry, i) => {
                      const isCurrent = i === focusPath.length - 1
                      return (
                        <button
                          key={entry.id}
                          className={cn(
                            "flex w-full min-h-7 items-center gap-2 rounded-sm py-1 text-[13px] hover:bg-hover text-foreground",
                            isCurrent && "bg-active"
                          )}
                          style={{ paddingLeft: `${6 + i * 12}px` }}
                          onClick={() => {
                            if (i === 0 && focusPath.length === 1 && onUnfocus) onUnfocus()
                            else if (onFocusNode) onFocusNode(entry.id, entry.label, entry.icon)
                          }}
                        >
                          <span className="flex shrink-0 items-center text-muted-foreground [&_svg]:size-4">
                            {entry.icon}
                          </span>
                          <span className="truncate">{entry.label}</span>
                        </button>
                      )
                    })
                  ) : (
                    <button className="flex w-full min-h-7 items-center gap-2 rounded-sm px-1.5 py-1 text-[13px] bg-active text-foreground hover:bg-hover">
                      <span className="flex shrink-0 items-center text-muted-foreground [&_svg]:size-4">
                        {defaultIcon}
                      </span>
                      {title}
                    </button>
                  )}

                  {/* Go to section */}
                  {goToItems && goToItems.length > 0 && (
                    <>
                      <div className="my-1 h-px bg-border" />
                      <div className="px-1.5 py-1 text-[12px] text-muted-foreground">Go to</div>
                      {goToItems.map((item) => (
                        <button
                          key={item.id}
                          className="flex w-full min-h-7 items-center gap-2 rounded-sm px-1.5 py-1 text-[13px] text-foreground hover:bg-hover"
                          onClick={() => onFocusNode?.(item.id, item.label, item.icon)}
                        >
                          <span className="flex shrink-0 items-center text-muted-foreground [&_svg]:size-4">
                            {item.icon}
                          </span>
                          {item.label}
                        </button>
                      ))}
                    </>
                  )}
                </Popover.Popup>
              </Popover.Positioner>
            </Popover.Portal>
          </Popover.Root>

          <span className="flex-1" />
          {renderedActions}
        </div>
      )}

      {/* Filter row — FacetedFilter by default, plain Input fallback if facets is null */}
      {searchEnabled && (
        <div className="px-2 pb-2">
          {facets !== null ? (
            <FacetedFilter facets={facets ?? {}} onSearch={handleSearchChange} />
          ) : (
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                size="default"
                placeholder={searchPlaceholder}
                className="pl-8"
                value={query}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
          )}
        </div>
      )}

      {/* Tree */}
      <div className={cn("flex-1 overflow-y-auto px-1 pb-4", treeClassName)}>
        <DataTreeView
          sections={displaySections}
          onSelect={onSelect}
          onFocusNode={onFocusNode}
          onNodeMenu={onNodeMenu}
        />
      </div>
    </aside>
  )
}
