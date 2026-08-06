"use client"

import * as React from "react"
import { Popover } from "@base-ui/react/popover"
import { cn } from "../../lib/utils"
import { ChevronRight } from "../icons/ChevronRight"
import { ChevronDown } from "../icons/ChevronDown"
import { Target } from "../icons/Target"
import { Overflow } from "../icons/Overflow"
// ─── L2 default-icon imports (only pulled when DataTree / FileTree are used) ───
import { Catalog } from "../icons/Catalog"
import { Database } from "../icons/Database"
import { Table } from "../icons/Table"
import { TableView } from "../icons/TableView"
import { FolderCloud } from "../icons/FolderCloud"
import { Models } from "../icons/Models"
import { Function as FunctionIcon } from "../icons/Function"
import { Letters } from "../icons/Letters"
import { Folder } from "../icons/Folder"
import { FolderFill } from "../icons/FolderFill"
import { FolderOpen } from "../icons/FolderOpen"
import { FolderBranch } from "../icons/FolderBranch"
import { FolderBranchFill } from "../icons/FolderBranchFill"
import { FolderOpenBranch } from "../icons/FolderOpenBranch"
import { FolderCube } from "../icons/FolderCube"
import { FolderOpenCube } from "../icons/FolderOpenCube"
import { FolderSolidPipeline } from "../icons/FolderSolidPipeline"
import { FolderOpenPipeline } from "../icons/FolderOpenPipeline"
import { File as FileIcon } from "../icons/File"
import { FileCode } from "../icons/FileCode"
import { FilePipeline } from "../icons/FilePipeline"
import { Notebook } from "../icons/Notebook"
import { Query } from "../icons/Query"

/**
 * Tree primitives — three layers in this file:
 *
 *   L1: Tree, TreeSection, TreeNode, TreeNodeTag       — generic, structural
 *   L1.5: TreeNodeData, TreeNodeRenderer               — data-driven L1
 *   L2: DataTree (catalog/schema/table)                — typed by DataAssetKind
 *   L2: FileTree (folder/file/notebook/query)          — typed by FileAssetKind
 *
 * Reach for the layer that matches your data:
 *   - Generic hierarchy with custom icons → L1 / L1.5 (TreeNodeData)
 *   - Catalogs, schemas, tables, columns  → L2 DataTree
 *   - Folders, files, notebooks, queries  → L2 FileTree
 *
 * @standard Tree
 * @guideline Use for hierarchical data browsing (catalogs, files, schemas)
 * @guideline Each node must have an icon — tree is icon-first
 * @guideline Reach for L2 wrappers (`<DataTree>` / `<FileTree>`) for typed asset trees; drop down to L1 (`<Tree>` + `<TreeNode>`) only when you need a custom hierarchy
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

// Parent ID context — each TreeNode tells its children "I am your parent"
const TreeParentContext = React.createContext<string | null>(null)

/**
 * Optional anchor element for the TreeNode hover-preview popup. When set,
 * popups render to the right of THIS element (typically the entire tree
 * pane / aside) instead of to the right of the hovered row. Keeps the
 * popup at a stable X position so the user can scan rows without the
 * preview jumping horizontally.
 */
const TreePreviewAnchorContext = React.createContext<HTMLElement | null>(null)

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
        className="flex h-7 items-center gap-1 rounded-1 px-1 type-hint text-text-subtle hover:text-text-base outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-inset"
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

// ─── TreeNode — folder or file node (matches Figma `.TreeNode`) ───

let treeNodeCounter = 0

function TreeNode({
  className,
  nodeId: nodeIdProp,
  icon,
  iconExpanded,
  label,
  trailing,
  preview,
  previewDelay = 700,
  selected,
  selectable = true,
  defaultExpanded = false,
  expanded: controlledExpanded,
  expandable = false,
  focusable,
  depth = 0,
  showTrailLine = true,
  onToggle,
  onSelect,
  children,
  ...props
}: Omit<React.ComponentProps<"button">, "onSelect"> & {
  /** Stable ID for callbacks (onFocusNode, onSelect). Falls back to internal counter. */
  nodeId?: string
  /** Asset icon. Color is owned by the consumer (or by an L2 wrapper like
   *  `<DataTree>`/`<FileTree>` which apply a kind-driven tone). The TreeNode
   *  primitive only sets a neutral fallback (`text-text-subtle`). */
  icon?: React.ReactNode
  /** Alternate icon when expanded — used by File Tree to swap closed → open
   *  folder glyphs. Defaults to `icon` if not provided. */
  iconExpanded?: React.ReactNode
  label: string
  /** Trailing slot. Replaces the default Focus + Overflow hover cluster.
   *  When unset, the cluster appears on hover for selectable nodes. */
  trailing?: React.ReactNode
  /** Hover-popup body (typically a `<PreviewPopup ... />`). Opens after
   *  `previewDelay`ms of sustained hover. */
  preview?: React.ReactNode
  /** Delay before the preview popup opens, in ms. Default 700. */
  previewDelay?: number
  /** Controlled selection state. When undefined, the row reads the selection
   *  from `<Tree>` context (set via `defaultSelectedId` / `onSelect`). */
  selected?: boolean
  /** Whether the row can be selected. Default true. Selectable=false rows
   *  use a neutral hover background (no selection highlight). */
  selectable?: boolean
  /** Initial expanded state (uncontrolled). */
  defaultExpanded?: boolean
  /** Controlled expanded state. Pairs with `onToggle` for fully external
   *  expand/collapse state. */
  expanded?: boolean
  /** Force expandable even when `children` is empty (e.g. for lazy-loaded
   *  rows that haven't fetched their content yet). Default: derived from
   *  `children`. */
  expandable?: boolean
  /** Whether the row's "Focus here" hover action is shown. Defaults to
   *  `isExpandable` (any row with children can be focused). L2 wrappers like
   *  `<DataTree>` set this to `false` for asset rows (table/view/volume/…)
   *  since "focus" only makes sense for namespace-shaped rows (catalog,
   *  schema, folder). */
  focusable?: boolean
  /** Visual indent level. The chevron-area width is `16 + depth * 8`px. */
  depth?: number
  /** Whether the trail line is drawn for this row's children. Default true. */
  showTrailLine?: boolean
  /** Called when the row is expanded or collapsed. */
  onToggle?: (expanded: boolean) => void
  /** Called when the row is selected (clicked while `selectable` is true). */
  onSelect?: () => void
}) {
  const [internalExpanded, setInternalExpanded] = React.useState(defaultExpanded)
  const isExpanded = controlledExpanded ?? internalExpanded
  const childCount = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child)
  ).length
  const isExpandable = expandable || childCount > 0

  const idRef = React.useRef(nodeIdProp ?? `tree-node-${++treeNodeCounter}`)
  const { highlightedId, setHighlighted, selectedId, setSelected: setTreeSelected, onFocusNode, onNodeMenu } = React.useContext(TreeContext)
  const parentId = React.useContext(TreeParentContext)
  // The "highlighted" row is the one the user just expanded (or the parent
  // of the row they just collapsed). Used to darken the trail line under it
  // so the user can see where their last action landed.
  const isHighlighted = highlightedId === idRef.current
  // Selection state: prop wins when explicitly passed; otherwise read from
  // <Tree> context. Default of `undefined` (rather than `false`) is what
  // makes the context fallback actually reachable.
  const isSelected = selected ?? (selectedId === idRef.current)

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

  // ─── Hover preview state machine ───
  // 700ms delay before opening (avoids accidental popups), 150ms close grace
  // (lets the user move from row → popover without dismissal).
  const [previewOpen, setPreviewOpen] = React.useState(false)
  const openTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const cancelOpen = React.useCallback(() => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current)
      openTimerRef.current = null
    }
  }, [])
  const cancelClose = React.useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }, [])
  const scheduleOpen = React.useCallback(() => {
    cancelClose()
    if (previewOpen) return
    openTimerRef.current = setTimeout(() => setPreviewOpen(true), previewDelay)
  }, [cancelClose, previewOpen, previewDelay])
  const scheduleClose = React.useCallback(() => {
    cancelOpen()
    closeTimerRef.current = setTimeout(() => setPreviewOpen(false), 150)
  }, [cancelOpen])

  React.useEffect(() => () => {
    cancelOpen()
    cancelClose()
  }, [cancelOpen, cancelClose])

  const rowButton = (
      <button
        data-slot="tree-item"
        data-selected={selected || undefined}
        data-expanded={isExpanded || undefined}
        role="treeitem"
        aria-selected={isSelected}
        aria-expanded={isExpandable ? isExpanded : undefined}
        className={cn(
          "group/tree-item flex h-7 w-full items-center gap-1 rounded-1 px-1 type-label text-left transition-colors",
          // Pointer-driven focus (mouse hover, programmatic focus from popups,
          // etc.) must not show a ring — only keyboard navigation should.
          "outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-inset",
          // Row backgrounds — match Figma `.TreeNode` variant set:
          //   default → transparent
          //   hover   → action/hover (8% blue tint)         = bg-action-default-hover
          //   selected→ action/press (16% blue tint, layers on hover) = bg-action-selected-press
          "hover:bg-action-default-hover",
          isSelected && selectable && "bg-action-selected-press",
          "text-text-base",
          className
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={preview ? scheduleOpen : undefined}
        onMouseLeave={preview ? scheduleClose : undefined}
        {...props}
      >
        {/* Chevron area — grows by 8px per depth level */}
        <span
          className="flex shrink-0 items-center justify-end"
          style={{ width: `${16 + depth * 8}px` }}
        >
          {isExpandable ? (
            <span className={cn(
              // Chevron color rules:
              //   • collapsed + idle  → text-border-strong (light)
              //   • collapsed + hover → text-text-subtle (darken on hover)
              //   • expanded          → text-text-subtle (always)
              // Direction (right vs down) follows expansion independently.
              "flex size-4 items-center justify-center",
              isExpanded
                ? "text-text-subtle"
                : "text-border-strong group-hover/tree-item:text-text-subtle"
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

        {/* Icon — color is owned by the asset (kind-driven via L2 wrappers, or
         * the consumer-supplied icon node). The TreeNode container only sets a
         * neutral fallback (text-text-subtle) which gets overridden by an
         * inner span when L2 wraps the icon (e.g. text-icon-folder for File
         * Tree folders). Icon color is intentionally STABLE across selected /
         * expanded / hover states — only the chevron darkens on expansion. */}
        {activeIcon && (
          <span className="flex shrink-0 items-center text-text-subtle [&_svg]:size-4">
            {activeIcon}
          </span>
        )}

        {/* Label */}
        <span className="flex-1 truncate">{label}</span>

        {/* Hover actions — Focus + Overflow, visible on hover.
         * Both buttons render unconditionally when the node is selectable
         * (matches Figma `.TreeNode` design — visibility is structural, not
         * callback-dependent). Click handlers are optional; if a callback is
         * not provided, the button is cosmetic (consumer can wire later). */}
        {trailing ? (
          <span className="flex shrink-0 items-center gap-1 text-text-subtle opacity-0 group-hover/tree-item:opacity-100 transition-opacity">
            {trailing}
          </span>
        ) : selectable && (
          <span className="flex shrink-0 items-center gap-0 opacity-0 group-hover/tree-item:opacity-100 transition-opacity">
            {/* Focus action — only shown for "namespace-shaped" rows. Default
             * is the same as `isExpandable` (any row with children gets it),
             * but L2 wrappers (DataTree/FileTree) flip this off for asset
             * leaves so e.g. you can't focus on a table or notebook. */}
            {(focusable ?? isExpandable) && (
              <button
                className="flex size-6 items-center justify-center rounded-1 text-text-subtle hover:bg-action-default-hover hover:text-text-base active:bg-action-selected-press outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-inset [&_svg]:size-4"
                aria-label="Focus here"
                title="Focus here"
                onClick={(e) => {
                  e.stopPropagation()
                  onFocusNode?.(idRef.current, label, activeIcon)
                }}
              >
                <Target />
              </button>
            )}
            <button
              className="flex size-6 items-center justify-center rounded-1 text-text-subtle hover:bg-action-default-hover hover:text-text-base active:bg-action-selected-press outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-inset [&_svg]:size-4"
              aria-label="More options"
              title="More options"
              onClick={(e) => {
                e.stopPropagation()
                onNodeMenu?.(idRef.current, label)
              }}
            >
              <Overflow />
            </button>
          </span>
        )}
      </button>
  )

  const rowWithPreview = preview ? (
    <Popover.Root
      open={previewOpen}
      onOpenChange={(o) => {
        setPreviewOpen(o)
        if (!o) cancelOpen()
      }}
    >
      <Popover.Trigger render={rowButton} />
      <Popover.Portal>
        <Popover.Positioner
          // Default anchor = trigger (the hovered row), so the popup's vertical
          // position follows the row — Asset Title aligns with the row label
          // when there's space to the right. Base UI auto-flips to side="left"
          // or align="end" when the popup would overflow the viewport.
          //
          // alignOffset compensates for internal padding so AssetName visually
          // aligns with the TreeNode label rather than the row's top edge:
          //   row (h-7 / leading-20)         → label center @ 14px from top
          //   popup (py-3 + AssetNameRow)    → label center @ 24px from top
          //   delta = 10 → lift popup by 10px
          side="right"
          sideOffset={4}
          align="start"
          alignOffset={-10}
          className="z-50"
        >
          <Popover.Popup
            data-slot="tree-item-preview"
            className="outline-none"
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            {preview}
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  ) : (
    rowButton
  )

  return (
    <>
      {rowWithPreview}

      {/* Children with trail line */}
      {isExpanded && (
        <TreeParentContext.Provider value={idRef.current}>
          <div
            data-slot="tree-item-children"
            className="relative overflow-visible"
          >
            {/* Trail line — `border-border-base` for resting tracks (matches the
             * Figma `.Track lines` stroke binding). Steps up to
             * `border-text-subtle` (matching the expanded chevron's
             * color) for the *most recently expanded* row, or the parent
             * track of the *most recently collapsed* row. Gives the user a
             * brief visual anchor for their last action. */}
            {showTrailLine && (
              <div
                className={cn(
                  "absolute border-l pointer-events-none z-10 transition-colors",
                  isHighlighted ? "border-text-subtle" : "border-border-base",
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
                className="flex h-7 items-center type-label text-text-subtle"
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

// ─── TreeNodeTag — optional trailing tag/pill ───

function TreeNodeTag({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="tree-node-tag"
      className={cn(
        "inline-flex items-center gap-1 rounded bg-surface-subtle px-1.5 type-hint text-text-subtle",
        className
      )}
      {...props}
    />
  )
}

// ─── Data-driven API ───

/**
 * TreeNodeData — shape of a node in a tree data structure.
 * The tree renderer auto-computes depth, expandable, selectable from this shape.
 *
 * Note: this is the DATA shape, not the rendered component. The visual component
 * is `TreeNode` (matching Figma `.TreeNode`).
 */
type TreeNodeData = {
  id: string
  label: string
  icon?: React.ReactNode
  /** Alternate icon when expanded (File Tree: FolderOpen) */
  iconExpanded?: React.ReactNode
  /** Whether this node can be selected. Default: true. Consumer decides. */
  selectable?: boolean
  /** Whether this row's "Focus here" hover action is shown. Defaults to
   *  isExpandable. L2 wrappers flip this off for asset leaves. */
  focusable?: boolean
  /** Whether this is a leaf node (no expand chevron). E.g., columns, files. */
  leaf?: boolean
  /** Child nodes */
  children?: TreeNodeData[]
  /** Trailing content */
  trailing?: React.ReactNode
  /** Start expanded */
  defaultExpanded?: boolean
  /** Optional hover-popup content (e.g. <PreviewPopup ... />). Shows after a hover delay. */
  preview?: React.ReactNode
}

/**
 * TreeSection data for grouped trees (Data Tree "My organization", "Delta shared", etc.)
 */
type TreeSectionData = {
  label: string
  defaultExpanded?: boolean
  nodes: TreeNodeData[]
}

/**
 * Recursively renders TreeNodeData into TreeNode components.
 * Auto-computes: depth, expandable (has children), selectable (not leaf), icons.
 */
function TreeNodeRenderer({
  node,
  depth,
}: {
  node: TreeNodeData
  depth: number
}) {
  const hasChildren = node.children && node.children.length > 0
  const isLeaf = node.leaf ?? false
  const isSelectable = node.selectable ?? true
  const isExpandable = !isLeaf

  return (
    <TreeNode
      nodeId={node.id}
      icon={node.icon}
      iconExpanded={node.iconExpanded}
      label={node.label}
      depth={depth}
      selectable={isSelectable}
      expandable={isExpandable}
      focusable={node.focusable}
      defaultExpanded={node.defaultExpanded}
      trailing={node.trailing}
      preview={node.preview}
    >
      {hasChildren && node.children!.map((child) => (
        <TreeNodeRenderer key={child.id} node={child} depth={depth + 1} />
      ))}
    </TreeNode>
  )
}

// ╔══════════════════════════════════════════════════════════════════════╗
// ║ L2 — Data Tree                                                       ║
// ╚══════════════════════════════════════════════════════════════════════╝

/**
 * DataAssetKind — vocabulary for typed nodes in a Data Tree.
 *
 * Level conventions (Databricks Unity Catalog reality):
 *
 *   L1 (top-level)  catalog                            — the root namespace
 *   L2              schema                             — every catalog has `default` and `information_schema`
 *   L3              table | view | volume | model | function   — assets live inside schemas
 *   L4 (leaves)     column                             — only inside a table or view; auto-leaf
 *
 * Special "anywhere" kinds:
 *   folder | file   — escape hatches for non-asset organizational nodes; can
 *                     appear at any level (e.g. shared notebooks pinned to a
 *                     catalog, generic blobs under a schema).
 *
 * Each kind has a canonical icon. Provide `icon` on a DataTreeNode only when
 * you need to distinguish a sub-variant (e.g. `CatalogShared` vs the default
 * `Catalog`, `TableView`/`TableStream` etc. for specialized table types).
 *
 * @see DATA_KIND_ICON for the canonical icon mapping.
 * @see DataTree for the renderer.
 */
export type DataAssetKind =
  | "catalog"
  | "schema"
  | "table"
  | "view"
  | "volume"
  | "model"
  | "function"
  | "column"
  | "folder"
  | "file"

/**
 * Default icon for each DataAssetKind. The L2 `<DataTree>` reads this map to
 * resolve `icon` automatically. Override per-node by passing `icon` on the
 * DataTreeNode.
 *
 * Kept as a named export so consumers and Storybook stories can reuse the
 * resolver for non-tree contexts (badges, breadcrumbs, asset cards, etc.).
 */
export const DATA_KIND_ICON: Record<DataAssetKind, React.ComponentType> = {
  catalog: Catalog,
  schema: Database,           // schemas use the Database glyph by Databricks convention
  table: Table,
  view: TableView,
  volume: FolderCloud,
  model: Models,
  function: FunctionIcon,
  column: Letters,            // generic-text column; consumers may override per data type (Hash, Numbers, …)
  folder: Folder,
  file: FileIcon,
}

/** Kinds that are leaves by default (no chevron, no children allowed). */
const DATA_KIND_LEAF: ReadonlySet<DataAssetKind> = new Set(["column"])

/**
 * Kinds for which the "Focus here" hover action should appear. Only
 * namespace-shaped rows: catalog, schema, and the generic-folder escape
 * hatch. Asset rows (table / view / volume / model / function / column / file)
 * never get the focus action because "set this as root" is meaningless for a
 * leaf-or-near-leaf asset.
 */
const DATA_KIND_FOCUSABLE: ReadonlySet<DataAssetKind> = new Set([
  "catalog",
  "schema",
  "folder",
])

/**
 * Shape of a node in a Data Tree. Mirrors `TreeNodeData` (L1) but replaces the
 * loose `icon`/`leaf` fields with a typed `kind` that drives both. Override
 * the icon by passing `icon` explicitly.
 *
 * @example A schema with two tables and one view:
 *   const node: DataTreeNode = {
 *     id: "main.sales",
 *     label: "sales",
 *     kind: "schema",
 *     children: [
 *       { id: "main.sales.orders", label: "orders", kind: "table" },
 *       { id: "main.sales.customers", label: "customers", kind: "table" },
 *       { id: "main.sales.daily_kpi", label: "daily_kpi", kind: "view" },
 *     ],
 *   }
 */
export type DataTreeNode = {
  id: string
  label: string
  /** Asset kind — drives default icon and leaf behavior. */
  kind: DataAssetKind
  /** Override the default icon for this kind (e.g. CatalogShared). */
  icon?: React.ReactNode
  /** Whether this node can be selected. Default: true. */
  selectable?: boolean
  /** Force leaf state (overrides kind default). */
  leaf?: boolean
  children?: DataTreeNode[]
  /** Trailing UI (badges, tags). */
  trailing?: React.ReactNode
  defaultExpanded?: boolean
  /** Hover-popup body (typically a `<PreviewPopup ... />`). Shown after a 700ms delay. */
  preview?: React.ReactNode
}

/**
 * A grouped section in a Data Tree. Section headers are a *virtual* level —
 * they sit leftmost and do not contribute a depth indent or track line.
 *
 * Typical sections: "My organization", "Delta shared", "Legacy".
 */
export type DataTreeSection = {
  label: string
  defaultExpanded?: boolean
  nodes: DataTreeNode[]
}

/** Convert DataTreeNode → TreeNodeData (resolve icon, leaf, focusable from kind). */
function dataNodeToTreeNodeData(node: DataTreeNode): TreeNodeData {
  const KindIcon = DATA_KIND_ICON[node.kind]
  return {
    id: node.id,
    label: node.label,
    icon: node.icon ?? React.createElement(KindIcon),
    leaf: node.leaf ?? DATA_KIND_LEAF.has(node.kind),
    focusable: DATA_KIND_FOCUSABLE.has(node.kind),
    selectable: node.selectable,
    trailing: node.trailing,
    defaultExpanded: node.defaultExpanded,
    preview: node.preview,
    children: node.children?.map(dataNodeToTreeNodeData),
  }
}

/**
 * `<DataTree />` — semantic Data Tree for catalogs / schemas / tables / models.
 *
 * Resolves icons from `kind`, auto-marks columns as leaves, and uses the
 * "virtual section" convention: section headers sit leftmost and top-level
 * catalogs underneath them start at depth 0 (no track line), matching the
 * Figma `Data Tree` master (`3824:3098`).
 *
 * @example
 *   <DataTree sections={[
 *     {
 *       label: "My organization",
 *       nodes: [
 *         {
 *           id: "cat-main", label: "main", kind: "catalog",
 *           children: [
 *             { id: "main.default", label: "default", kind: "schema" },
 *             { id: "main.sales", label: "sales", kind: "schema",
 *               children: [
 *                 { id: "main.sales.orders", label: "orders", kind: "table" },
 *               ],
 *             },
 *           ],
 *         },
 *       ],
 *     },
 *   ]} />
 *
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=3824-3098
 */
function DataTree({
  sections,
  className,
  onSelect,
  onFocusNode,
  onNodeMenu,
}: {
  sections: DataTreeSection[]
  className?: string
  onSelect?: (id: string) => void
  onFocusNode?: (id: string, label: string, icon?: React.ReactNode) => void
  onNodeMenu?: (id: string, label: string) => void
}) {
  return (
    <Tree className={className} onSelect={onSelect} onFocusNode={onFocusNode} onNodeMenu={onNodeMenu}>
      {sections.map((section, i) => (
        <TreeSection key={i} label={section.label} defaultExpanded={section.defaultExpanded ?? true}>
          {/* Top-level catalogs are children of the section header. The header
           * itself is "virtual" (no track line above the catalog rows), but
           * the catalogs visually indent one level to read as the section's
           * children. So depth = 1 for the section's direct nodes; nested
           * schemas / tables / columns continue from there. */}
          {section.nodes.map((node) => (
            <TreeNodeRenderer key={node.id} node={dataNodeToTreeNodeData(node)} depth={1} />
          ))}
        </TreeSection>
      ))}
    </Tree>
  )
}

// ╔══════════════════════════════════════════════════════════════════════╗
// ║ L2 — File Tree                                                       ║
// ╚══════════════════════════════════════════════════════════════════════╝

/**
 * FileAssetKind — vocabulary for typed nodes in a File Tree.
 *
 * Folder kinds (each pairs a closed icon with an open-state icon for chevron-down):
 *   folder           — generic folder (Folder / FolderOpen)
 *   git-folder       — git-tracked repo (FolderBranch / FolderOpenBranch)
 *   bundle-folder    — Databricks Asset Bundle (FolderCube / FolderOpenCube)
 *   pipeline-folder  — Lakeflow / DLT pipeline (FolderSolidPipeline / FolderOpenPipeline)
 *
 * File kinds (always leaves):
 *   file             — generic file
 *   code-file        — .py / .ts / .js / .scala (FileCode)
 *   notebook         — .ipynb / .dbnb (Notebook)
 *   query            — .sql (Query)
 *   pipeline-file    — DLT/pipeline source file (FilePipeline)
 *
 * Unlike DataTree, File Tree has NO virtual section level — every row is a
 * real, indented entity starting at depth 0.
 *
 * @see FILE_KIND_ICON for the canonical icon mapping.
 * @see FileTree for the renderer.
 */
export type FileAssetKind =
  | "folder"
  | "git-folder"
  | "bundle-folder"
  | "pipeline-folder"
  | "file"
  | "code-file"
  | "notebook"
  | "query"
  | "pipeline-file"

/**
 * Default icons for each FileAssetKind.
 *
 * Folder kinds include `iconExpanded` for the open-state swap (`<TreeNode>`
 * automatically swaps icon ↔ iconExpanded when a folder is expanded).
 *
 * Closed-folder glyphs use the FILLED variants (FolderFill / FolderBranchFill
 * / FolderCube / FolderSolidPipeline) — matches Figma's File Tree where the
 * folder body reads as a solid blue silhouette. Open-folder glyphs (FolderOpen
 * / FolderOpenBranch / FolderOpenCube / FolderOpenPipeline) keep their
 * existing shapes since they're already the canonical "open" pose.
 *
 * The `tone` field selects the icon color via a Tailwind text-* class. It
 * matches Figma's per-kind binding on the `TreeNodeIcon` layer:
 *   • Folder kinds → `text-icon-folder` (#8ACAFF, primitive blue/blue400)
 *   • File kinds   → `text-text-subtle` (default for the row)
 */
export const FILE_KIND_ICON: Record<
  FileAssetKind,
  { icon: React.ComponentType; iconExpanded?: React.ComponentType; tone?: string }
> = {
  folder: { icon: FolderFill, iconExpanded: FolderOpen, tone: "text-icon-folder" },
  "git-folder": { icon: FolderBranchFill, iconExpanded: FolderOpenBranch, tone: "text-icon-folder" },
  "bundle-folder": { icon: FolderCube, iconExpanded: FolderOpenCube, tone: "text-icon-folder" },
  "pipeline-folder": { icon: FolderSolidPipeline, iconExpanded: FolderOpenPipeline, tone: "text-icon-folder" },
  file: { icon: FileIcon },
  "code-file": { icon: FileCode },
  notebook: { icon: Notebook },
  query: { icon: Query },
  "pipeline-file": { icon: FilePipeline },
}

/** Kinds that are leaves by default. */
const FILE_KIND_LEAF: ReadonlySet<FileAssetKind> = new Set([
  "file",
  "code-file",
  "notebook",
  "query",
  "pipeline-file",
])

/**
 * Kinds for which the "Focus here" hover action should appear. All folder
 * kinds qualify (any folder can be set as the workspace root); file kinds
 * never do, since you can't focus into a leaf file.
 */
const FILE_KIND_FOCUSABLE: ReadonlySet<FileAssetKind> = new Set([
  "folder",
  "git-folder",
  "bundle-folder",
  "pipeline-folder",
])

/**
 * Shape of a node in a File Tree. `kind` drives both icons (closed + open) and
 * the default leaf state.
 *
 * @example A git-tracked repo with notebooks and a query:
 *   const repo: FileTreeNode = {
 *     id: "analytics",
 *     label: "analytics-repo",
 *     kind: "git-folder",
 *     children: [
 *       { id: "explore", label: "01_exploration.ipynb", kind: "notebook" },
 *       { id: "report", label: "weekly_report.sql", kind: "query" },
 *     ],
 *   }
 */
export type FileTreeNode = {
  id: string
  label: string
  kind: FileAssetKind
  /** Override the default icon for this kind. */
  icon?: React.ReactNode
  /** Override the default expanded-state icon (folders only). */
  iconExpanded?: React.ReactNode
  selectable?: boolean
  leaf?: boolean
  children?: FileTreeNode[]
  trailing?: React.ReactNode
  defaultExpanded?: boolean
  preview?: React.ReactNode
}

/**
 * Wrap an icon node in a `<span>` carrying the kind's tone class. The span's
 * `currentColor` propagates to the SVG `fill="currentColor"` inside, giving us
 * per-kind icon coloring without changing the icons themselves.
 *
 * Returns the original element when no tone is specified (caller already
 * provided their own colored element, or the kind has no tone override).
 */
function applyTone(el: React.ReactNode, tone: string | undefined): React.ReactNode {
  if (!tone || el == null) return el
  return React.createElement("span", { className: tone }, el)
}

/** Convert FileTreeNode → TreeNodeData (resolve icon, iconExpanded, leaf, focusable, tone from kind). */
function fileNodeToTreeNodeData(node: FileTreeNode): TreeNodeData {
  const kindIcons = FILE_KIND_ICON[node.kind]
  // Default-icon path: build the element here, then apply the kind's tone.
  // Override path: respect the consumer's own element (don't force a tone).
  const iconBase = node.icon ?? React.createElement(kindIcons.icon)
  const iconExpandedBase =
    node.iconExpanded ??
    (kindIcons.iconExpanded ? React.createElement(kindIcons.iconExpanded) : undefined)
  return {
    id: node.id,
    label: node.label,
    icon: node.icon ? iconBase : applyTone(iconBase, kindIcons.tone),
    iconExpanded: node.iconExpanded ? iconExpandedBase : applyTone(iconExpandedBase, kindIcons.tone),
    leaf: node.leaf ?? FILE_KIND_LEAF.has(node.kind),
    focusable: FILE_KIND_FOCUSABLE.has(node.kind),
    selectable: node.selectable,
    trailing: node.trailing,
    defaultExpanded: node.defaultExpanded,
    preview: node.preview,
    children: node.children?.map(fileNodeToTreeNodeData),
  }
}

/**
 * `<FileTree />` — semantic File Tree for folders / files / notebooks / queries.
 *
 * Resolves icons from `kind` (including the closed/open icon pairing for
 * folders), auto-marks files as leaves, and starts every row at depth 0 — no
 * virtual section level. Matches the Figma `File Tree` master (`3829:12526`).
 *
 * @example
 *   <FileTree nodes={[
 *     {
 *       id: "home", label: "Home", kind: "folder",
 *       defaultExpanded: true,
 *       children: [
 *         {
 *           id: "repo", label: "analytics-repo", kind: "git-folder",
 *           children: [
 *             { id: "nb", label: "explore.ipynb", kind: "notebook" },
 *             { id: "q", label: "report.sql", kind: "query" },
 *           ],
 *         },
 *         {
 *           id: "bundle", label: "customer-360", kind: "bundle-folder",
 *           children: [{ id: "yml", label: "databricks.yml", kind: "code-file" }],
 *         },
 *         {
 *           id: "pipe", label: "lakeflow-pipelines", kind: "pipeline-folder",
 *           children: [{ id: "ing", label: "ingest.py", kind: "pipeline-file" }],
 *         },
 *       ],
 *     },
 *   ]} />
 *
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=3829-12526
 */
function FileTree({
  nodes,
  className,
  onSelect,
  onFocusNode,
  onNodeMenu,
}: {
  nodes: FileTreeNode[]
  className?: string
  onSelect?: (id: string) => void
  onFocusNode?: (id: string, label: string, icon?: React.ReactNode) => void
  onNodeMenu?: (id: string, label: string) => void
}) {
  return (
    <Tree className={className} onSelect={onSelect} onFocusNode={onFocusNode} onNodeMenu={onNodeMenu}>
      {nodes.map((node) => (
        <TreeNodeRenderer key={node.id} node={fileNodeToTreeNodeData(node)} depth={0} />
      ))}
    </Tree>
  )
}

// ─── Legacy aliases (one-cycle deprecation; remove after consumers migrate) ─

/**
 * @deprecated Use `<DataTree>` with kind-driven `DataTreeNode[]` instead.
 * This alias accepts the L1 `TreeSectionData[]` shape for backwards compat.
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
            <TreeNodeRenderer key={node.id} node={node} depth={0} />
          ))}
        </TreeSection>
      ))}
    </Tree>
  )
}

/**
 * @deprecated Use `<FileTree>` with kind-driven `FileTreeNode[]` instead.
 * This alias accepts the L1 `TreeNodeData[]` shape for backwards compat.
 */
function FileTreeView({
  nodes,
  className,
  onSelect,
  onFocusNode,
  onNodeMenu,
}: {
  nodes: TreeNodeData[]
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
  // L1 primitives — names match Figma `.TreeNode` / `.TreeNodeTag`
  Tree,
  TreeSection,
  TreeNode,
  TreeNodeTag,
  TreeNodeRenderer,
  // L2 semantic trees (new, preferred)
  DataTree,
  FileTree,
  // L1.5 legacy aliases (deprecated — accept TreeNodeData)
  DataTreeView,
  FileTreeView,
  // Context for opting into stable-X popup positioning
  TreePreviewAnchorContext,
}

export type { TreeNodeData, TreeSectionData }
 
