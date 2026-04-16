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

// ─── Tree Root ───

function Tree({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="tree"
      role="tree"
      className={cn("flex flex-col", className)}
      {...props}
    />
  )
}

// ─── TreeSection — collapsible group header (Data Tree variant) ───
// Figma: h-7, chevron + 12px Regular muted-foreground label.

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
// Self-manages expand state internally. Can also be controlled via expanded/onToggle.
// Trail lines: a vertical border-left on the children container shows indent guides.

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
  /** Alternate icon shown when expanded (e.g., FolderOpen for File Tree) */
  iconExpanded?: React.ReactNode
  label: string
  trailing?: React.ReactNode
  selected?: boolean
  defaultExpanded?: boolean
  /** Controlled expanded state — overrides internal state */
  expanded?: boolean
  expandable?: boolean
  depth?: number
  /** Show vertical trail line connecting children to parent (default: true) */
  showTrailLine?: boolean
  onToggle?: (expanded: boolean) => void
  onSelect?: () => void
}) {
  const [internalExpanded, setInternalExpanded] = React.useState(defaultExpanded)
  const isExpanded = controlledExpanded ?? internalExpanded
  const hasChildren = expandable || React.Children.count(children) > 0
  const isExpandable = hasChildren

  const handleClick = () => {
    if (isExpandable) {
      const next = !isExpanded
      setInternalExpanded(next)
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
        style={{ paddingLeft: `${4 + depth * 16}px` }}
        onClick={handleClick}
        {...props}
      >
        {/* Chevron — collapsed: text-input (muted), expanded: text-muted-foreground (bolder) */}
        {isExpandable ? (
          <span className={cn(
            "flex size-4 shrink-0 items-center justify-center",
            isExpanded ? "text-muted-foreground" : "text-input"
          )}>
            {isExpanded
              ? <ChevronDown className="size-3" />
              : <ChevronRight className="size-3" />
            }
          </span>
        ) : (
          <span className="w-4 shrink-0" />
        )}

        {/* Icon */}
        {activeIcon && (
          <span className={cn(
            "flex shrink-0 items-center [&_svg]:size-4",
            selected || isExpanded ? "text-primary" : "text-muted-foreground"
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

      {/* Children with trail line — show empty state if no children */}
      {isExpanded && (
        <div
          data-slot="tree-item-children"
          className={cn(showTrailLine && "relative")}
        >
          {/* Vertical trail line */}
          {showTrailLine && (
            <div
              className="absolute top-0 bottom-2 border-l border-border"
              style={{ left: `${12 + depth * 16}px` }}
            />
          )}
          {children || (
            <div
              className="flex h-7 items-center text-[12px] text-muted-foreground italic"
              style={{ paddingLeft: `${20 + (depth + 1) * 16}px` }}
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
