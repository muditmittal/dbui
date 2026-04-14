"use client"

import * as React from "react"

import { cn } from "../../lib/utils"

/**
 * DataTree — file/folder tree view.
 * Maps to Figma .DataTreeNode (Type: Header/Open folder/File/Focused folder × Selected × Hover).
 *
 * Usage:
 *   <DataTree>
 *     <DataTreeNode type="header">Root Switcher</DataTreeNode>
 *     <DataTreeNode type="folder" expanded>
 *       <DataTreeNodeIcon><FolderOpen /></DataTreeNodeIcon>
 *       my_schema
 *     </DataTreeNode>
 *     <DataTreeNode type="file" depth={1} selected>
 *       <DataTreeNodeIcon><Table /></DataTreeNodeIcon>
 *       my_table
 *     </DataTreeNode>
 *   </DataTree>
 */
function DataTree({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="data-tree"
      role="tree"
      className={cn("flex flex-col gap-0", className)}
      {...props}
    />
  )
}

/**
 * DataTreeNode — single node in a file/folder tree.
 * Maps to Figma .DataTreeNode variants.
 */
function DataTreeNode({
  className,
  type = "file",
  selected = false,
  expanded,
  depth = 0,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  type?: "header" | "folder" | "file"
  selected?: boolean
  expanded?: boolean
  depth?: number
}) {
  return (
    <div
      data-slot="data-tree-node"
      data-type={type}
      data-selected={selected || undefined}
      data-expanded={expanded || undefined}
      role="treeitem"
      aria-selected={selected}
      aria-expanded={type === "folder" ? expanded : undefined}
      className={cn(
        "group/data-tree-node flex h-7 items-center gap-2 rounded-sm px-2 py-1 text-[13px] leading-[20px]",
        "hover:bg-hover",
        selected && "bg-active text-accent-foreground",
        !selected && "text-foreground",
        type === "header" && "font-semibold",
        "[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      style={{ paddingLeft: depth > 0 ? `${8 + depth * 16}px` : undefined }}
      {...props}
    >
      {type === "folder" && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn("size-4 shrink-0 text-muted-foreground transition-transform", expanded && "rotate-90")}
        >
          <path
            d="M6 4L10 8L6 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {children}
    </div>
  )
}

/**
 * DataTreeNodeIcon — file/folder type icon.
 * Maps to Figma .DataTreeNode icon instances.
 */
function DataTreeNodeIcon({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="data-tree-node-icon"
      className={cn(
        "pointer-events-none shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

/**
 * DataTreeNodeActions — hover action buttons (right side).
 * Maps to Figma .HoverActions (visible on hover).
 */
function DataTreeNodeActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="data-tree-node-actions"
      className={cn(
        "ml-auto hidden items-center gap-0 group-hover/data-tree-node:flex",
        "[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

export { DataTree, DataTreeNode, DataTreeNodeIcon, DataTreeNodeActions }
