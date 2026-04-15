"use client"

import * as React from "react"

import { cn } from "../../lib/utils"

/**
 * @standard Table
 * @guideline Use for structured data with sortable columns
 * @guideline Row hover uses muted/50 background
 * @constraint Don't use for layout — Tables are for data only
 * @constraint Header cells use font-semibold, body cells use font-normal
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=3157-2794
 */

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-[13px]", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t bg-muted/50 font-semibold [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-10 px-2 text-left align-middle font-semibold whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-[13px] text-muted-foreground", className)}
      {...props}
    />
  )
}

// ─── Cell content sub-components ───
// Maps to Figma .Content (8 cell types) and .TableCell (5 types)

/**
 * TableCellIcon — leading icon in a table cell.
 * Maps to Figma .Content "With Icon" cell type icon slot.
 */
function TableCellIcon({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="table-cell-icon"
      className={cn(
        "pointer-events-none shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

/**
 * TableCellTitle — two-line cell with primary text + metadata.
 * Maps to Figma .Content Cell type="Title" (icon + name + secondary text).
 *
 * Usage:
 *   <TableCell>
 *     <TableCellTitle>
 *       <TableCellIcon><TableIcon /></TableCellIcon>
 *       <TableCellTitleContent>
 *         <span>my_table</span>
 *         <TableCellMeta>catalog.schema</TableCellMeta>
 *       </TableCellTitleContent>
 *     </TableCellTitle>
 *   </TableCell>
 */
function TableCellTitle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="table-cell-title"
      className={cn("flex items-start gap-2", className)}
      {...props}
    />
  )
}

/**
 * TableCellTitleContent — text stack inside TableCellTitle (name + metadata).
 */
function TableCellTitleContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="table-cell-title-content"
      className={cn(
        "flex min-w-0 flex-1 flex-col gap-0",
        className
      )}
      {...props}
    />
  )
}

/**
 * TableCellMeta — secondary metadata text in a cell.
 * Maps to Figma .Content Title metadata line (Hint style: 12px, muted-foreground).
 */
function TableCellMeta({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="table-cell-meta"
      className={cn(
        "truncate text-[12px] leading-[16px] text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

/**
 * TableCellStatus — status indicator + label in a cell.
 * Maps to Figma .Content Cell type="Status" (status icon + text).
 *
 * Usage:
 *   <TableCell>
 *     <TableCellStatus>
 *       <TableCellIcon><Status status="success" /></TableCellIcon>
 *       Healthy
 *     </TableCellStatus>
 *   </TableCell>
 */
function TableCellStatus({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="table-cell-status"
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  )
}

/**
 * TableCellUser — avatar + name in a cell.
 * Maps to Figma .Content Cell type="User" (24px avatar + text).
 *
 * Usage:
 *   <TableCell>
 *     <TableCellUser>
 *       <Avatar className="size-6"><AvatarFallback>U</AvatarFallback></Avatar>
 *       username@example.com
 *     </TableCellUser>
 *   </TableCell>
 */
function TableCellUser({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="table-cell-user"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
}

/**
 * TableCellExpandable — expandable row trigger with chevron.
 * Maps to Figma .Content Cell type="Expandable" (ChevronRight + code-styled text).
 */
function TableCellExpandable({
  className,
  expanded = false,
  ...props
}: React.ComponentProps<"button"> & { expanded?: boolean }) {
  return (
    <button
      data-slot="table-cell-expandable"
      data-expanded={expanded || undefined}
      aria-expanded={expanded}
      className={cn(
        "flex items-center gap-2 text-left font-mono text-[13px] leading-[20px] text-accent-foreground",
        "[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("size-4 shrink-0 transition-transform", expanded && "rotate-90")}
      >
        <path
          d="M6 4L10 8L6 12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {props.children}
    </button>
  )
}

/**
 * TableCellTime — time/duration bar + value.
 * Maps to Figma .Content Cell type="Time" (colored bar + text).
 */
function TableCellTime({
  className,
  barWidth = 20,
  children,
  ...props
}: React.ComponentProps<"div"> & { barWidth?: number }) {
  return (
    <div
      data-slot="table-cell-time"
      className={cn("flex items-center gap-1", className)}
      {...props}
    >
      <span
        className="h-2 shrink-0 rounded-[1px] bg-accent-foreground"
        style={{ width: barWidth }}
      />
      {children}
    </div>
  )
}

/**
 * TableSortButton — sort indicator button in header cells.
 * Maps to Figma .Sort (Sorted: True/False).
 */
function TableSortButton({
  className,
  sorted = false,
  direction = "asc",
  ...props
}: React.ComponentProps<"button"> & {
  sorted?: boolean
  direction?: "asc" | "desc"
}) {
  return (
    <button
      data-slot="table-sort-button"
      data-sorted={sorted || undefined}
      data-direction={sorted ? direction : undefined}
      aria-label="Sort column"
      className={cn(
        "inline-flex size-5 items-center justify-center rounded-sm p-1 text-muted-foreground hover:text-foreground",
        sorted && "text-foreground",
        className
      )}
      {...props}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-4"
      >
        {sorted && direction === "asc" ? (
          <path d="M4 10L8 6L12 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        ) : sorted && direction === "desc" ? (
          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <>
            <path d="M4 6L8 3L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 10L8 13L12 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </>
        )}
      </svg>
    </button>
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableCellIcon,
  TableCellTitle,
  TableCellTitleContent,
  TableCellMeta,
  TableCellStatus,
  TableCellUser,
  TableCellExpandable,
  TableCellTime,
  TableSortButton,
}
