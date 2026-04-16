"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { ChevronRight } from "../icons/ChevronRight"
import { ChevronDown } from "../icons/ChevronDown"

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
  lastExpandedId: string | null
  setLastExpanded: (id: string) => void
}

const TreeContext = React.createContext<TreeContextValue>({
  lastExpandedId: null,
  setLastExpanded: () => {},
})

// ─── Tree Root ───

function Tree({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [lastExpandedId, setLastExpanded] = React.useState<string | null>(null)

  return (
    <TreeContext.Provider value={{ lastExpandedId, setLastExpanded }}>
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
        onClick={() => setExpanded(!expanded)}
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
  icon,
  iconExpanded,
  label,
  trailing,
  selected = false,
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
  icon?: React.ReactNode
  iconExpanded?: React.ReactNode
  label: string
  trailing?: React.ReactNode
  selected?: boolean
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
  const hasChildren = expandable || React.Children.count(children) > 0
  const isExpandable = hasChildren

  // Stable ID for tracking last-expanded
  const idRef = React.useRef(`tree-item-${++treeItemCounter}`)
  const { lastExpandedId, setLastExpanded } = React.useContext(TreeContext)
  const isLastExpanded = lastExpandedId === idRef.current

  // Register as last-expanded on mount if defaultExpanded, or on user expand
  React.useEffect(() => {
    if (defaultExpanded && isExpandable) {
      setLastExpanded(idRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClick = () => {
    if (isExpandable) {
      const next = !isExpanded
      setInternalExpanded(next)
      if (next) setLastExpanded(idRef.current)
      onToggle?.(next)
    }
    onSelect?.()
  }

  const activeIcon = isExpanded && iconExpanded ? iconExpanded : icon

  return (
    <>
      <button
        data-slot="tree-item"
        data-selected={selected || undefined}
        data-expanded={isExpanded || undefined}
        role="treeitem"
        aria-selected={selected}
        aria-expanded={isExpandable ? isExpanded : undefined}
        className={cn(
          "group/tree-item flex h-7 w-full items-center gap-1 rounded-sm px-1 text-[13px] leading-[20px] text-left transition-colors",
          "hover:bg-hover",
          selected && "bg-accent",
          "text-foreground",
          className
        )}
        onClick={handleClick}
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
            selected || isExpanded ? "text-foreground" : "text-muted-foreground"
          )}>
            {activeIcon}
          </span>
        )}

        {/* Label */}
        <span className="flex-1 truncate">{label}</span>

        {/* Trailing content — visible on hover */}
        {trailing && (
          <span className="flex shrink-0 items-center gap-1 text-muted-foreground opacity-0 group-hover/tree-item:opacity-100 transition-opacity">
            {trailing}
          </span>
        )}
      </button>

      {/* Children with trail line */}
      {isExpanded && (
        <div
          data-slot="tree-item-children"
          className="relative overflow-visible"
        >
          {/* Trail line — darker for last-expanded, lighter for others */}
          {showTrailLine && (
            <div
              className={cn(
                "absolute border-l pointer-events-none z-10 transition-colors",
                isLastExpanded ? "border-input" : "border-border"
              )}
              style={{
                left: `${12 + depth * 8}px`,
                top: -10,
                bottom: 14,
              }}
            />
          )}
          {children || (
            <div
              className="flex h-7 items-center text-[12px] text-muted-foreground italic"
              style={{ paddingLeft: `${24 + (depth + 1) * 8}px` }}
            >
              No items
            </div>
          )}
        </div>
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

export {
  Tree,
  TreeSection,
  TreeItem,
  TreeItemTag,
}
