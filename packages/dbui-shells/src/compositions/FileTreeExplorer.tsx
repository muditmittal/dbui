"use client"

import * as React from "react"
import { FileTree, type FileTreeNode } from "dbui/components/ui/data-tree"
import { Input } from "dbui/components/ui/input"
import { Search } from "dbui/components/icons/Search"
import { cn } from "dbui/lib/utils"

/**
 * @standard FileTreeExplorer
 * @composition true
 * @category browser
 * @useFor Browse FILE/FOLDER hierarchies — workspace files, drafts, query files. Sits in the left pane of a Browser shell.
 * @avoidFor Catalog/schema browsing → use DataTreeExplorer (it groups by sections). Inline content menus → use DropdownMenu with Tree inside.
 * @synonyms file tree pane, workspace explorer, file browser
 * @figma File Tree Explorer
 * @requiresShell BrowserShell or Base
 * @guideline Default width 240px (slightly narrower than DataTreeExplorer because file paths are usually longer than catalog names — wider pane wastes horizontal real estate).
 * @guideline Header is one row (title + actions). Search is one row below header. Tree fills remaining height with its own scroll.
 * @constraint Pass `nodes` (flat node array, no sections). For grouped trees (catalogs / schemas) use DataTreeExplorer.
 * @constraint Use `iconExpanded` (e.g. FolderOpen) on folder nodes for the open-state icon swap. Without it, the folder icon stays the same when expanded.
 */

// ─── Filter helpers ───
// Recursive case-insensitive label match. Same shape as DataTreeExplorer but
// operates on a flat node array (no sections wrapper).

function filterTreeNodes(nodes: FileTreeNode[], query: string): FileTreeNode[] {
  if (!query) return nodes
  const q = query.toLowerCase()
  return nodes.reduce<FileTreeNode[]>((acc, node) => {
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

// ─── Component ───

export type FileTreeExplorerProps = {
  /** Title shown in the header (e.g. "Workspace", "SQL Editor"). Optional. */
  title?: string
  /** Icon shown next to the title. */
  titleIcon?: React.ReactNode
  /** Right-aligned header actions (icon Buttons typically). */
  headerActions?: React.ReactNode
  /** Optional fully-custom header. Overrides title/titleIcon/headerActions when provided. */
  header?: React.ReactNode
  /** Search placeholder. Default "Search". */
  searchPlaceholder?: string
  /** Hide the search row entirely. Default true. */
  searchEnabled?: boolean
  /** Controlled search value. If provided, the consumer owns filtering — pass `nodes` already-filtered. */
  searchValue?: string
  /** Controlled search onChange. */
  onSearchChange?: (value: string) => void
  /** Tree data — flat array of kind-driven file nodes (folders may have children). */
  nodes: FileTreeNode[]
  /** Tree event callbacks — passed straight through to FileTree. */
  onSelect?: (id: string) => void
  onFocusNode?: (id: string, label: string, icon?: React.ReactNode) => void
  onNodeMenu?: (id: string, label: string) => void
  /** Pane width. Default 240. */
  width?: number | string
  className?: string
  /** Additional classes for the inner tree scroll area. */
  treeClassName?: string
}

/**
 * FileTreeExplorer — pane composition that wraps `<FileTree>` (L2) with a
 * header (title + actions) and a search input. Drop in the left side of any
 * Browser shell to give users a navigable file/folder tree.
 *
 * Modes:
 * - **Uncontrolled search** (default): the composition holds search state and
 *   filters `nodes` internally via case-insensitive label match.
 * - **Controlled search**: pass `searchValue` + `onSearchChange`. The
 *   consumer filters `nodes` before passing them in.
 */
export function FileTreeExplorer({
  title,
  titleIcon,
  headerActions,
  header,
  searchPlaceholder = "Search",
  searchEnabled = true,
  searchValue: searchValueProp,
  onSearchChange,
  nodes,
  onSelect,
  onFocusNode,
  onNodeMenu,
  width = 240,
  className,
  treeClassName,
}: FileTreeExplorerProps) {
  const isControlled = searchValueProp !== undefined
  const [internalQuery, setInternalQuery] = React.useState("")
  const query = isControlled ? searchValueProp! : internalQuery

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isControlled) {
      onSearchChange?.(e.target.value)
    } else {
      setInternalQuery(e.target.value)
      onSearchChange?.(e.target.value)
    }
  }

  const displayNodes = isControlled ? nodes : filterTreeNodes(nodes, query)

  return (
    <aside
      data-slot="file-tree-explorer"
      className={cn("flex shrink-0 flex-col border-r border-border-base bg-surface-base", className)}
      style={{ width }}
    >
      {/* Header — h-10, px-2, gap-2 */}
      {header ?? (
        (title || titleIcon || headerActions) && (
          <div className="flex h-10 items-center gap-2 px-2">
            {(title || titleIcon) && (
              <div className="flex min-w-0 items-center gap-1.5 text-[13px] font-semibold text-text-base">
                {titleIcon && (
                  <span className="flex shrink-0 items-center text-text-subtle [&_svg]:size-4">
                    {titleIcon}
                  </span>
                )}
                {title && <span className="truncate">{title}</span>}
              </div>
            )}
            <span className="flex-1" />
            {headerActions && <div className="flex items-center gap-1 shrink-0">{headerActions}</div>}
          </div>
        )
      )}

      {/* Search */}
      {searchEnabled && (
        <div className="px-2 pb-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-text-subtle" />
            <Input
              size="default"
              placeholder={searchPlaceholder}
              className="pl-8"
              value={query}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      )}

      {/* Tree */}
      <div className={cn("flex-1 overflow-y-auto px-1 pb-4", treeClassName)}>
        <FileTree
          nodes={displayNodes}
          onSelect={onSelect}
          onFocusNode={onFocusNode}
          onNodeMenu={onNodeMenu}
        />
      </div>
    </aside>
  )
}
 
