"use client"

import * as React from "react"

import { cn } from "../../lib/utils"

/**
 * @standard Table
 * @guideline Use for structured data with sortable columns
 * @guideline Framed by default — outer border, rounded corners, filled header —
 *   so tabular content reads as one unit rather than rows adrift on the page.
 * @guideline The header pins while the table scrolls and releases as the last row
 *   passes. Default, not opt-in: nothing to pass per call site.
 * @guideline A page that pins its own chrome above the scrollport publishes that
 *   chrome's height as `--db-sticky-offset` on any ancestor, and the header pins
 *   below it. Unset means flush to the top of whatever scrolls, which is what a
 *   shell's content container wants.
 * @guideline `unframed` drops the border and the corners, for a table whose
 *   surroundings already draw them — inside a Card, a panel, a preview tile.
 *   Reach for it when a second border would nest inside the first, not when the
 *   frame merely feels heavy for the number of rows.
 * @constraint `unframed` takes the border and the corners and nothing else. The
 *   container still clips and still isolates, and the header still pins — an
 *   unframed table is no less likely to scroll than a framed one, so it needs
 *   the pinned header just as much.
 * @constraint `unframed` does not remove the header fill. The fill belongs to
 *   the pinning, not to the frame: a header with nothing behind it shows the
 *   rows traveling underneath whether or not there is a border around them.
 * @constraint Never wrap a Table in a scroll container. `overflow-x: auto` forces
 *   the block axis to `auto` as well, and that scrollport — exactly the table's
 *   own height — becomes what the header pins against, so it can never travel.
 *   Scroll belongs to the region; `composition.md` owns which one.
 * @constraint The header fill stays opaque. Rows pass under it, and any alpha
 *   below 1 shows them through.
 * @constraint Don't use for layout — Tables are for data only
 * @constraint Header cells use font-semibold, body cells use font-normal
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=3157-2794
 */

function Table({
  className,
  unframed,
  ...props
}: React.ComponentProps<"table"> & { unframed?: boolean }) {
  return (
    <div
      // The frame. Three parts of this are load-bearing and none are decorative:
      //
      // `w-fit min-w-full` — the frame hugs the table instead of the container.
      // Cells are `whitespace-nowrap`, so a catalog listing or a query result is
      // routinely wider than the space it is given; a `w-full` frame would have
      // the table cross its own right border. Sized to content, the border stays
      // around the table at any width and the region scrolls to reach the rest.
      //
      // `overflow-clip`, not `overflow-hidden`. Both clip the header's fill to
      // the rounded corners — which a collapsed table cannot do for itself,
      // since `border-radius` does not apply to cells under `border-collapse:
      // collapse` — but `hidden` creates a scroll container and `clip` does not.
      // A scroll container here is what the sticky header would pin against, and
      // it is exactly the table's height, so the header would never move.
      //
      // `isolate` makes this a stacking context, so the header's `z-index` is
      // spent inside the frame. It cannot reach the page's own pinned chrome
      // however high it climbs, which is what keeps a table off the site header.
      //
      // Which is why `unframed` leaves all three alone. They are the structure
      // the pinned header is built on, and a table that has given up its border
      // has given up none of its need for a header that stays put. The border
      // and the corners are what is left to drop.
      data-slot="table-container"
      data-unframed={unframed ? "" : undefined}
      className={cn(
        "relative isolate w-fit min-w-full overflow-clip",
        !unframed && "shape-container border border-border-base"
      )}
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom type-body", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      // Sticky is clamped to its containing block, so the release the header has
      // to perform — letting go once the last row is past — is the geometry
      // rather than something to script.
      //
      // The offset is a variable because the component cannot know the page. A
      // shell's content container has nothing pinned above it and wants 0; a
      // docs page has a site header and possibly a bar under it. `0px` is the
      // fallback rather than a guess at somebody's chrome, and it is the answer
      // for every consumer that scrolls a region rather than a document.
      //
      // `z-raised` clears the rows, which is not free: a cell may hold something
      // positioned — `Avatar` is `position: relative` — and a positioned box in
      // a later row outranks a `z-index: auto` header on document order alone.
      className={cn(
        "sticky top-[var(--db-sticky-offset,0px)] z-raised bg-surface-subtle [&_tr]:border-b",
        className
      )}
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
        "border-t bg-surface-subtle/50 font-semibold [&>tr]:last:border-b-0",
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
        "border-b transition-colors hover:bg-surface-subtle/50 data-[state=selected]:bg-surface-subtle",
        className
      )}
      {...props}
    />
  )
}

/**
 * @guideline Mirror `numeric` from the cells below it, or the header will sit
 *   left while its column sits right.
 */
function TableHead({
  className,
  numeric,
  ...props
}: React.ComponentProps<"th"> & { numeric?: boolean }) {
  return (
    <th
      data-slot="table-head"
      data-numeric={numeric ? "" : undefined}
      className={cn(
        "h-10 px-2 text-left align-middle font-semibold whitespace-nowrap text-text-base [&:has([role=checkbox])]:pr-0",
        numeric && "text-right",
        className
      )}
      {...props}
    />
  )
}

/**
 * @guideline Set `numeric` on any cell holding a number. Figtree's digits are
 *   not equal-width — they vary by about 3px across 0–9 — so a column of figures
 *   visibly jitters without tabular numerals. `numeric` also right-aligns, which
 *   is what lets the eye compare magnitudes down a column.
 * @constraint `numeric` is a property of the cell, not a type style: alignment
 *   cannot be expressed by a font, and correct number rendering is not something
 *   an author should have to opt into style-by-style.
 */
function TableCell({
  className,
  numeric,
  ...props
}: React.ComponentProps<"td"> & { numeric?: boolean }) {
  return (
    <td
      data-slot="table-cell"
      data-numeric={numeric ? "" : undefined}
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0",
        numeric && "text-right tabular-nums",
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
      className={cn("mt-4 type-body text-text-subtle", className)}
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
        "truncate type-hint text-text-subtle",
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
        "flex items-center gap-2 text-left type-code text-text-accent",
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
        className="h-2 shrink-0 bg-text-accent"
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
        "inline-flex size-5 items-center justify-center rounded-1 p-1 text-text-subtle hover:text-text-base",
        sorted && "text-text-base",
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
