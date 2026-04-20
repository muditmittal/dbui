"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { ChevronRight } from "../icons/ChevronRight"
import { ChevronDown } from "../icons/ChevronDown"
import { Target } from "../icons/Target"
import { Overflow } from "../icons/Overflow"

/**
 * @standard Tree
 * @guideline Use for hierarchical data browsing (catalogs, files, schemas)
 * @guideline Each node must have an icon — tree is icon-first
 * @constraint Don't nest beyond 6 levels — flatten with "set as root" instead
 * @constraint Section headers use Hint style (12px Regular muted-foreground)
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=3211-5106
 */

// ─── Context for tracking last-expanded node ───

type TreeContextValue = {
  highlightedId: string | null
  setHighlighted: (id: string | null) => void
  selectedId: string | null
  setSelected: (id: string | null) => void
  onFocusNode?: (id: string, label: string, icon?: React.ReactNode) => void
  onNodeMenu?: (id: string, label: string) => void
}

const TreeContext = React.createContext<TreeContextValue>({
  highlightedId: null,
  setHighlighted: () => {},
  selectedId: null,
  setSelected: () => {},
})

// Parent ID context — each TreeItem tells its children "I am your parent"
const TreeParentContext = React.createContext<string | null>(null)

// ─── Tree Root ───

function Tree({
  className,
  defaultSelectedId,
  onSelect: onSelectProp,
  onFocusNode,
  onNodeMenu,
  ...props
}: Omit<React.ComponentProps<"div">, "onSelect"> & {
  defaultSelectedId?: string
  onSelect?: (id: string) => void
  /** Called when user clicks "Focus" on a node — sets it as tree root */
  onFocusNode?: (id: string, label: string, icon?: React.ReactNode) => void
  /** Called when user clicks the overflow menu on a node */
  onNodeMenu?: (id: string, label: string) => void
}) {
  const [highlightedId, setHighlighted] = React.useState<string | null>(null)
  const [selectedId, setSelectedInternal] = React.useState<string | null>(defaultSelectedId ?? null)

  const setSelected = React.useCallback((id: string | null) => {
    setSelectedInternal(id)
    if (id) onSelectProp?.(id)
  }, [onSelectProp])

  return (
    <TreeContext.Provider value={{ highlightedId, setHighlighted, selectedId, setSelected, onFocusNode, onNodeMenu }}>
      <div
        data-slot="tree"
        role="tree"
        className={cn("flex flex-col", className)}
        {...props}
      />
    </TreeContext.Provider>
  )
}

// ─── TreeSection — collapsible group header (Data Tree variant) ───

function TreeSection({
  className,
  label,
  defaultExpanded = true,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  label: string
  defaultExpanded?: boolean
}) {
  const [expanded, setExpanded] = React.useState(defaultExpanded)

  return (
    <div
      data-slot="tree-section"
      className={cn("flex flex-col", className)}
      {...props}
    >
      <button
        data-slot="tree-item"
        data-section
        onClick={() => setExpanded(!expanded)}
        onKeyDown={(e) => {
          const tree = e.currentTarget.closest('[data-slot="tree"]')
          if (!tree) return
          const items = Array.from(tree.querySelectorAll<HTMLElement>('[data-slot="tree-item"]'))
          const index = items.indexOf(e.currentTarget)
          switch (e.key) {
            case "ArrowDown": { e.preventDefault(); items[index + 1]?.focus(); break }
            case "ArrowUp": { e.preventDefault(); items[index - 1]?.focus(); break }
            case "ArrowRight": { e.preventDefault(); if (!expanded) setExpanded(true); break }
            case "ArrowLeft": { e.preventDefault(); if (expanded) setExpanded(false); break }
          }
        }}
        className="flex h-7 items-center gap-1 px-1 text-[12px] leading-[16px] text-muted-foreground hover:text-foreground"
        aria-expanded={expanded}
      >
        {expanded
          ? <ChevronDown className="size-3 shrink-0" />
          : <ChevronRight className="size-3 shrink-0" />
        }
        <span className="truncate">{label}</span>
      </button>
      {expanded && children}
    </div>
  )
}

// ─── TreeItem — folder or file node ───

let treeItemCounter = 0

function TreeItem({
  className,
  nodeId: nodeIdProp,
  icon,
  iconExpanded,
  label,
  trailing,
  selected = false,
  selectable = true,
  defaultExpanded = false,
  expanded: controlledExpanded,
  expandable = false,
  depth = 0,
  showTrailLine = true,
  onToggle,
  onSelect,
  children,
  ...props
}: Omit<React.ComponentProps<"button">, "onSelect"> & {
  /** Stable ID for callbacks (onFocusNode, onSelect). Falls back to internal counter. */
  nodeId?: string
  icon?: React.ReactNode
  iconExpanded?: React.ReactNode
  label: string
  trailing?: React.ReactNode
  selected?: boolean
  selectable?: boolean
  defaultExpanded?: boolean
  expanded?: boolean
  expandable?: boolean
  depth?: number
  showTrailLine?: boolean
  onToggle?: (expanded: boolean) => void
  onSelect?: () => void
}) {
  const [internalExpanded, setInternalExpanded] = React.useState(defaultExpanded)
  const isExpanded = controlledExpanded ?? internalExpanded
  const childCount = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child)
  ).length
  const isExpandable = expandable || childCount > 0

  const idRef = React.useRef(nodeIdProp ?? `tree-item-${++treeItemCounter}`)
  const { highlightedId, setHighlighted, selectedId, setSelected: setTreeSelected, onFocusNode, onNodeMenu } = React.useContext(TreeContext)
  const parentId = React.useContext(TreeParentContext)
  const isHighlighted = highlightedId === idRef.current
  // Use context selection if available, fall back to prop
  const isSelected = selected !== undefined ? selected : selectedId === idRef.current

  const handleClick = () => {
    if (isExpandable) {
      const next = !isExpanded
      setInternalExpanded(next)
      setHighlighted(next ? idRef.current : parentId)
      onToggle?.(next)
    }
    if (selectable) {
      setTreeSelected(idRef.current)
      onSelect?.()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const target = e.currentTarget as HTMLElement
    const tree = target.closest('[data-slot="tree"]')
    if (!tree) return

    const items = Array.from(tree.querySelectorAll<HTMLElement>('[data-slot="tree-item"]'))
    const index = items.indexOf(target)

    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault()
        const next = items[index + 1]
        if (next) next.focus()
        break
      }
      case "ArrowUp": {
        e.preventDefault()
        const prev = items[index - 1]
        if (prev) prev.focus()
        break
      }
      case "ArrowRight": {
        e.preventDefault()
        if (isExpandable && !isExpanded) {
          setInternalExpanded(true)
          setHighlighted(idRef.current)
          onToggle?.(true)
        }
        break
      }
      case "ArrowLeft": {
        e.preventDefault()
        if (isExpandable && isExpanded) {
          setInternalExpanded(false)
          setHighlighted(parentId)
          onToggle?.(false)
        }
        break
      }
    }
  }

  const activeIcon = isExpanded && iconExpanded ? iconExpanded : icon

  return (
    <>
      <button
        data-slot="tree-item"
        data-selected={selected || undefined}
        data-expanded={isExpanded || undefined}
        role="treeitem"
        aria-selected={isSelected}
        aria-expanded={isExpandable ? isExpanded : undefined}
        className={cn(
          "group/tree-item flex h-7 w-full items-center gap-1 rounded-sm px-1 text-[13px] leading-[20px] text-left transition-colors",
          selectable ? "hover:bg-hover" : "hover:bg-muted",
          isSelected && selectable && "bg-active",
          "text-foreground",
          className
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {/* Chevron area — grows by 8px per depth level */}
        <span
          className="flex shrink-0 items-center justify-end"
          style={{ width: `${16 + depth * 8}px` }}
        >
          {isExpandable ? (
            <span className={cn(
              "flex size-4 items-center justify-center",
              isExpanded ? "text-muted-foreground" : "text-input"
            )}>
              {isExpanded
                ? <ChevronDown className="size-3" />
                : <ChevronRight className="size-3" />
              }
            </span>
          ) : (
            <span className="w-4" />
          )}
        </span>

        {/* Icon — foreground when selected/expanded, muted otherwise */}
        {activeIcon && (
          <span className={cn(
            "flex shrink-0 items-center [&_svg]:size-4",
            isSelected || isExpanded ? "text-foreground" : "text-muted-foreground"
          )}>
            {activeIcon}
          </span>
        )}

        {/* Label */}
        <span className="flex-1 truncate">{label}</span>

        {/* Hover actions — Focus + Overflow, visible on hover */}
        {trailing ? (
          <span className="flex shrink-0 items-center gap-1 text-muted-foreground opacity-0 group-hover/tree-item:opacity-100 transition-opacity">
            {trailing}
          </span>
        ) : selectable && (
          <span className="flex shrink-0 items-center gap-0 opacity-0 group-hover/tree-item:opacity-100 transition-opacity">
            {isExpandable && onFocusNode && (
              <button
                className="flex size-6 items-center justify-center rounded-sm text-muted-foreground hover:bg-hover hover:text-foreground active:bg-press [&_svg]:size-4"
                aria-label="Focus here"
                title="Focus here"
                onClick={(e) => {
                  e.stopPropagation()
                  onFocusNode(idRef.current, label, activeIcon)
                }}
              >
                <Target />
              </button>
            )}
            {onNodeMenu && (
              <button
                className="flex size-6 items-center justify-center rounded-sm text-muted-foreground hover:bg-hover hover:text-foreground active:bg-press [&_svg]:size-4"
                aria-label="More options"
                onClick={(e) => {
                  e.stopPropagation()
                  onNodeMenu(idRef.current, label)
                }}
              >
                <Overflow />
              </button>
            )}
          </span>
        )}
      </button>

      {/* Children with trail line */}
      {isExpanded && (
        <TreeParentContext.Provider value={idRef.current}>
          <div
            data-slot="tree-item-children"
            className="relative overflow-visible"
          >
            {/* Trail line — dark for highlighted node, light for others */}
            {showTrailLine && (
              <div
                className={cn(
                  "absolute border-l pointer-events-none z-10 transition-colors",
                  isHighlighted ? "border-foreground" : "border-border"
                )}
                style={{
                  left: `${12 + depth * 8}px`,
                  top: -10,
                  bottom: 14,
                }}
              />
            )}
            {childCount > 0 ? children : (
              <div
                className="flex h-7 items-center text-[13px] text-muted-foreground"
                style={{ paddingLeft: `${44 + (depth + 1) * 8}px` }}
              >
                No items
              </div>
            )}
          </div>
        </TreeParentContext.Provider>
      )}
    </>
  )
}

// ─── TreeItemTag — optional trailing tag/pill ───

function TreeItemTag({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="tree-item-tag"
      className={cn(
        "inline-flex items-center gap-1 rounded bg-muted px-1.5 text-[12px] leading-[16px] text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

// ─── Data-driven API ───

/**
 * TreeNode — a node in a tree data structure.
 * The tree renderer auto-computes depth, expandable, selectable from this shape.
 */
type TreeNode = {
  id: string
  label: string
  icon?: React.ReactNode
  /** Alternate icon when expanded (File Tree: FolderOpen) */
  iconExpanded?: React.ReactNode
  /** Whether this node can be selected. Default: true. Consumer decides. */
  selectable?: boolean
  /** Whether this is a leaf node (no expand chevron). E.g., columns, files. */
  leaf?: boolean
  /** Child nodes */
  children?: TreeNode[]
  /** Trailing content */
  trailing?: React.ReactNode
  /** Start expanded */
  defaultExpanded?: boolean
}

/**
 * TreeSection data for grouped trees (Data Tree "My organization", "Delta shared", etc.)
 */
type TreeSectionData = {
  label: string
  defaultExpanded?: boolean
  nodes: TreeNode[]
}

/**
 * Recursively renders TreeNode data as TreeItem components.
 * Auto-computes: depth, expandable (has children), selectable (not leaf), icons.
 */
function TreeNodeRenderer({
  node,
  depth,
}: {
  node: TreeNode
  depth: number
}) {
  const hasChildren = node.children && node.children.length > 0
  const isLeaf = node.leaf ?? false
  const isSelectable = node.selectable ?? true
  const isExpandable = !isLeaf

  return (
    <TreeItem
      nodeId={node.id}
      icon={node.icon}
      iconExpanded={node.iconExpanded}
      label={node.label}
      depth={depth}
      selectable={isSelectable}
      expandable={isExpandable}
      defaultExpanded={node.defaultExpanded}
      trailing={node.trailing}
    >
      {hasChildren && node.children!.map((child) => (
        <TreeNodeRenderer key={child.id} node={child} depth={depth + 1} />
      ))}
    </TreeItem>
  )
}

/**
 * DataTreeView — renders a complete Data Tree from structured data.
 * Handles sections, auto depth, and node type behavior.
 *
 * Usage:
 * ```tsx
 * <DataTreeView sections={[
 *   { label: "My organization", nodes: [
 *     { id: "cat1", label: "my_catalog", icon: <Catalog />, children: [...] }
 *   ]}
 * ]} />
 * ```
 */
function DataTreeView({
  sections,
  className,
  onSelect,
  onFocusNode,
  onNodeMenu,
}: {
  sections: TreeSectionData[]
  className?: string
  onSelect?: (id: string) => void
  onFocusNode?: (id: string, label: string, icon?: React.ReactNode) => void
  onNodeMenu?: (id: string, label: string) => void
}) {
  return (
    <Tree className={className} onSelect={onSelect} onFocusNode={onFocusNode} onNodeMenu={onNodeMenu}>
      {sections.map((section, i) => (
        <TreeSection key={i} label={section.label} defaultExpanded={section.defaultExpanded ?? true}>
          {section.nodes.map((node) => (
            <TreeNodeRenderer key={node.id} node={node} depth={1} />
          ))}
        </TreeSection>
      ))}
    </Tree>
  )
}

/**
 * FileTreeView — renders a complete File Tree from structured data.
 * No sections, starts at depth 0.
 */
function FileTreeView({
  nodes,
  className,
  onSelect,
  onFocusNode,
  onNodeMenu,
}: {
  nodes: TreeNode[]
  className?: string
  onSelect?: (id: string) => void
  onFocusNode?: (id: string, label: string, icon?: React.ReactNode) => void
  onNodeMenu?: (id: string, label: string) => void
}) {
  return (
    <Tree className={className} onSelect={onSelect} onFocusNode={onFocusNode} onNodeMenu={onNodeMenu}>
      {nodes.map((node) => (
        <TreeNodeRenderer key={node.id} node={node} depth={0} />
      ))}
    </Tree>
  )
}

export {
  // Primitives (manual composition)
  Tree,
  TreeSection,
  TreeItem,
  TreeItemTag,
  // Data-driven renderers
  DataTreeView,
  FileTreeView,
  TreeNodeRenderer,
}

export type { TreeNode, TreeSectionData }
