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

// ─── DataTree Root ───

function DataTree({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="data-tree"
      role="tree"
      className={cn("flex flex-col", className)}
      {...props}
    />
  )
}

// ─── DataTreeHeader — "Focused folder" type ───
// The top bar showing current context: back button + root switcher + actions.
// Figma: h-10, px-2, gap-2. Contains back chevron, icon+label chip, spacer, action icons.

function DataTreeHeader({
  className,
  children,
  icon,
  onBack,
  actions,
  status,
  ...props
}: React.ComponentProps<"div"> & {
  icon?: React.ReactNode
  onBack?: () => void
  actions?: React.ReactNode
  status?: React.ReactNode
}) {
  return (
    <div
      data-slot="data-tree-header"
      className={cn("flex h-10 items-center gap-2 px-2", className)}
      {...props}
    >
      {onBack && (
        <button
          onClick={onBack}
          className="flex size-6 shrink-0 items-center justify-center rounded-sm text-muted-foreground hover:bg-hover hover:text-foreground"
          aria-label="Go back"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
      <div className="flex items-center gap-1 rounded-sm bg-muted px-2 py-1">
        {icon && <span className="flex shrink-0 items-center text-muted-foreground [&_svg]:size-4">{icon}</span>}
        <span className="truncate text-[13px] leading-[20px] text-foreground">{children}</span>
      </div>
      {status}
      <span className="flex-1" />
      {actions && <div className="flex items-center gap-1 shrink-0">{actions}</div>}
    </div>
  )
}

// ─── DataTreeSection — "Header" type ───
// Collapsible group with a section title label.
// Figma: h-7, px-1, gap-1. Chevron + 12px Regular muted-foreground label.

function DataTreeSection({
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
      data-slot="data-tree-section"
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

// ─── DataTreeItem — "Open folder" and "File" types ───
// A single tree node: chevron (if expandable) + icon + label + optional trailing.
// Figma: h-7, px-1, gap-1. Depth via paddingLeft (4 + depth * 16).
// States: default (transparent), hover (bg-hover 8%), selected (bg-accent).

function DataTreeItem({
  className,
  icon,
  label,
  trailing,
  selected = false,
  expanded,
  expandable = false,
  depth = 0,
  onToggle,
  onClick,
  children,
  ...props
}: Omit<React.ComponentProps<"button">, "onClick"> & {
  icon?: React.ReactNode
  label: string
  trailing?: React.ReactNode
  selected?: boolean
  expanded?: boolean
  expandable?: boolean
  depth?: number
  onToggle?: () => void
  onClick?: () => void
}) {
  return (
    <>
      <button
        data-slot="data-tree-item"
        data-selected={selected || undefined}
        data-expanded={expanded || undefined}
        role="treeitem"
        aria-selected={selected}
        aria-expanded={expandable ? expanded : undefined}
        className={cn(
          "group/tree-item flex h-7 w-full items-center gap-1 rounded-sm px-1 text-[13px] leading-[20px] text-left transition-colors",
          "hover:bg-hover",
          selected && "bg-accent text-accent-foreground",
          !selected && "text-foreground",
          className
        )}
        style={{ paddingLeft: `${4 + depth * 16}px` }}
        onClick={(e) => {
          if (expandable && onToggle) onToggle()
          onClick?.()
        }}
        {...props}
      >
        {/* Chevron */}
        {expandable ? (
          <span className="flex size-4 shrink-0 items-center justify-center text-muted-foreground">
            {expanded
              ? <ChevronDown className="size-3" />
              : <ChevronRight className="size-3" />
            }
          </span>
        ) : (
          <span className="w-4 shrink-0" />
        )}

        {/* Icon */}
        {icon && (
          <span className={cn(
            "flex shrink-0 items-center [&_svg]:size-4",
            selected ? "text-accent-foreground" : "text-muted-foreground"
          )}>
            {icon}
          </span>
        )}

        {/* Label */}
        <span className="flex-1 truncate">{label}</span>

        {/* Trailing content (tag, badges, action icons) — visible on hover or always */}
        {trailing && (
          <span className="flex shrink-0 items-center gap-1 text-muted-foreground opacity-0 group-hover/tree-item:opacity-100 transition-opacity">
            {trailing}
          </span>
        )}
      </button>

      {/* Nested children rendered at next depth level */}
      {expanded && children}
    </>
  )
}

// ─── DataTreeItemTag — trailing tag (branch name, type indicator) ───

function DataTreeItemTag({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="data-tree-item-tag"
      className={cn(
        "inline-flex items-center gap-1 rounded bg-muted px-1.5 text-[12px] leading-[16px] text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  DataTree,
  DataTreeHeader,
  DataTreeSection,
  DataTreeItem,
  DataTreeItemTag,
}
