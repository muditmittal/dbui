"use client"

import * as React from "react"

import { cn } from "../../lib/utils"
import { Tree, TreeSection, TreeNodeRenderer } from "./data-tree"
import { Numbers } from "../icons/Numbers"
import { Decimal } from "../icons/Decimal"
import { Float } from "../icons/Float"
import { Letters } from "../icons/Letters"
import { Binary } from "../icons/Binary"
import { CalendarClock } from "../icons/CalendarClock"
import { Hash } from "../icons/Hash"
import { LettersNumbers } from "../icons/LettersNumbers"
import { Table as TableIcon } from "../icons/Table"

/**
 * @standard Schema Browser
 * @guideline Use for reading a table's shape — the columns, their types, and which ones are keys
 * @guideline Give every column a `type` so the glyph carries it. The type is the thing a reader scans for, and reading eight words is slower than reading eight shapes
 * @guideline Group by table when a query touches several. One table needs no grouping and a section header for a single table is a wasted row
 * @guideline Pass `nullable` and `key` rather than writing them into the label. They render as the trailing column, so a reader compares down the column instead of along each row
 * @constraint Built on `Tree`, not a tree of its own. A second tree would drift from the catalog tree a reader used ten seconds earlier, and the expand, select and keyboard behaviour is already correct here
 * @constraint Columns are leaves. A column has no children, so it takes no chevron and no focus action
 * @constraint Not a data preview. This is the shape of the table, never its rows — rows belong in a Table
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=5087-7890
 */

/** The column types the browser can draw, mapping to `columnTypeIcons`. */
export type SchemaColumnType =
  | "integer"
  | "decimal"
  | "float"
  | "string"
  | "boolean"
  | "timestamp"
  | "id"
  | "alphanumeric"

const TYPE_ICON: Record<SchemaColumnType, React.ComponentType> = {
  integer: Numbers,
  decimal: Decimal,
  float: Float,
  string: Letters,
  boolean: Binary,
  timestamp: CalendarClock,
  id: Hash,
  alphanumeric: LettersNumbers,
}

export interface SchemaColumn {
  id: string
  name: string
  type: SchemaColumnType
  /** The declared type, shown trailing — "bigint", "varchar(255)". */
  dataType?: string
  nullable?: boolean
  /** Marks a primary or foreign key. Overrides the type glyph with `id`. */
  key?: "primary" | "foreign"
}

export interface SchemaTable {
  id: string
  name: string
  /** Where it lives — "main.sales". Shown under the name. */
  path?: string
  columns: SchemaColumn[]
  defaultExpanded?: boolean
}

export interface SchemaBrowserProps
  extends Omit<React.ComponentProps<"div">, "children" | "onSelect"> {
  tables: SchemaTable[]
  /** Section label. Omit for a single unlabelled table list. */
  label?: string
  onSelect?: (id: string) => void
}

function SchemaBrowser({
  tables,
  label,
  onSelect,
  className,
  ...props
}: SchemaBrowserProps) {
  const nodes = React.useMemo(
    () =>
      tables.map((table) => ({
        id: table.id,
        label: table.name,
        icon: <TableIcon />,
        defaultExpanded: table.defaultExpanded,
        // A table groups its columns, so it expands; a column does not.
        children: table.columns.map((column) => {
          const Glyph = TYPE_ICON[column.key ? "id" : column.type]
          return {
            id: column.id,
            label: column.name,
            icon: <Glyph />,
            leaf: true,
            focusable: false,
            trailing: (
              <span className="flex shrink-0 items-center gap-2 type-hint text-text-subtle">
                {column.dataType ? <span>{column.dataType}</span> : null}
                {column.nullable === false ? (
                  <span className="text-text-disabled">not null</span>
                ) : null}
              </span>
            ),
          }
        }),
      })),
    [tables]
  )

  return (
    <div
      data-slot="schema-browser"
      className={cn("flex min-w-0 flex-col", className)}
      {...props}
    >
      <Tree onSelect={onSelect}>
        {label ? (
          <TreeSection label={label} defaultExpanded>
            {nodes.map((node) => (
              <TreeNodeRenderer key={node.id} node={node} depth={0} />
            ))}
          </TreeSection>
        ) : (
          nodes.map((node) => <TreeNodeRenderer key={node.id} node={node} depth={0} />)
        )}
      </Tree>
    </div>
  )
}

export { SchemaBrowser }
