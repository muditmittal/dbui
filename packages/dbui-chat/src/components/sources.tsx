"use client"

import * as React from "react"
import { Button } from "dbui/components/ui/button"

import { useDisclosureState } from "./disclosure"
import { cn } from "../lib/utils"

/**
 * @standard Sources
 * @guideline Use under an assistant answer to name what it drew on — tables, notebooks, docs
 * @guideline Give each Source the entity icon for its kind, so a table and a doc are told apart before the label is read
 * @guideline Name the asset, not the URL: "main.sales.orders", not the workspace link
 * @guideline Place it as the last child of the answer's action row. Its trigger sits inline beside
 *   the copy and feedback buttons; the list it opens takes the next full-width line by itself
 * @constraint Collapsed by default, and only ever below the answer it supports
 * @constraint Every entry must resolve. A source the reader cannot open is a claim, not a citation
 * @constraint Not Actions. The action row acts on the answer; Sources explains where it came from
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=4890-5458
 */

export interface SourcesProps
  extends Omit<React.ComponentProps<typeof Button>, "children"> {
  /** Entry count for the trigger. */
  count: number
  /** Replaces the generated "N sources" text. */
  label?: string
  defaultOpen?: boolean
  /** Controlled open state. */
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

/**
 * Returns a fragment rather than a container on purpose. Figma puts the trigger at
 * the end of the answer's action row and the list on the line below it — one
 * element cannot be both inline and full-width, so the two are siblings and the
 * caller's `flex-wrap` row does the placing. `basis-full` is what forces the break.
 */
function Sources({
  count,
  label,
  defaultOpen = false,
  open,
  onOpenChange,
  className,
  children,
  ...props
}: SourcesProps) {
  const { isOpen, handleOpenChange } = useDisclosureState({
    open,
    defaultOpen,
    onOpenChange,
  })

  const contentId = React.useId()

  return (
    <>
      <Button
        data-slot="sources-trigger"
        type="button"
        variant="ghost"
        size="sm"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => handleOpenChange(!isOpen)}
        className={cn("type-label text-text-subtle", className)}
        {...props}
      >
        {/* Singular at one. "1 sources" is the tell that a count was interpolated
            rather than written. */}
        {label ?? `${count} ${count === 1 ? "source" : "sources"}`}
      </Button>
      {isOpen ? (
        <div
          id={contentId}
          data-slot="sources"
          className="flex basis-full flex-col gap-1"
        >
          {children}
        </div>
      ) : null}
    </>
  )
}

export interface SourceProps extends React.ComponentProps<"a"> {
  /** Entity icon for the asset kind. */
  icon?: React.ReactNode
}

function Source({ icon, className, children, ...props }: SourceProps) {
  return (
    <a
      data-slot="source"
      className={cn(
        "flex min-w-0 items-center gap-2 rounded-1 type-label text-link-base no-underline outline-none",
        "hover:text-link-hover hover:underline",
        "focus-visible:border focus-visible:border-focus-ring focus-visible:shadow-focus",
        "[&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-text-subtle",
        className
      )}
      {...props}
    >
      {icon}
      <span className="min-w-0 truncate">{children}</span>
    </a>
  )
}

export { Sources, Source }
