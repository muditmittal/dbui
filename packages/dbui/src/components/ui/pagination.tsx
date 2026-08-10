import * as React from "react"

import { cn } from "../../lib/utils"
import { Button } from "./button"
import { ChevronLeft } from "../icons/ChevronLeft"
import { ChevronRight } from "../icons/ChevronRight"
import { Overflow } from "../icons/Overflow"

/**
 * @standard Pagination
 * @guideline Use ellipsis for large page counts
 * @guideline Always show previous/next buttons, even when disabled
 * @constraint Don't use for fewer than 2 pages
 * @constraint Don't use for infinite scroll — those load automatically
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=3140-1999
 */

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex items-center gap-0.5", className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">

/**
 * PaginationLink — one page in the strip.
 *
 * `isActive` is a fill, an accent foreground, and `aria-current`. No border: the
 * current page used to draw one in the focus colour, which spent a focus signal on
 * a resting state, so a focused page and the current one read almost alike. `ghost`
 * already carries a transparent border and focus still recolours it, so nothing
 * here restates the width.
 *
 * The foreground is the cue that survives. The accent surface is 1.20:1 on light
 * and 1.07:1 on dark against the page, so the fill only tints — it is the accent
 * foreground, at 6.63:1 and 9.61:1 on that fill, that a reader actually sees. Same
 * division of labour `NavbarItem` uses for `active`.
 */
function PaginationLink({
  className,
  isActive,
  size = "icon-md",
  ...props
}: PaginationLinkProps) {
  return (
    <Button
      variant="ghost"
      size={size}
      className={cn(
        isActive && "bg-surface-accent text-text-accent hover:bg-surface-accent",
        className
      )}
      nativeButton={false}
      render={
        <a
          aria-current={isActive ? "page" : undefined}
          data-slot="pagination-link"
          data-active={isActive}
          {...props}
        />
      }
    />
  )
}

function PaginationPrevious({
  className,
  text = "Previous",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="md"
      className={cn("pl-2!", className)}
      {...props}
    >
      <ChevronLeft data-icon="inline-start" />
      <span className="hidden sm:block">{text}</span>
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  text = "Next",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="md"
      className={cn("pr-2!", className)}
      {...props}
    >
      <span className="hidden sm:block">{text}</span>
      <ChevronRight data-icon="inline-end" />
    </PaginationLink>
  )
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <Overflow
      />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
