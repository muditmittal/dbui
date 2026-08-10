"use client"

import * as React from "react"

import { cn } from "../../lib/utils"
import { ChevronDown } from "../icons/ChevronDown"

/**
 * @standard Navbar
 * @guideline Use for top-level product navigation (workspace switcher, global actions)
 * @guideline Fixed to top of viewport
 * @constraint Don't duplicate navigation that belongs in Tabs or Breadcrumb
 * @constraint Max one Navbar per page
 * @constraint Mark the current item with `active`, never by styling it — `active` is what emits `aria-current`, so a hand-tinted item reads as current to the eye and as an ordinary link to a screen reader
 * @guideline `active` announces `aria-current="page"`. Where the item switches something other than the page, pass your own `aria-current` — it overrides
 * @constraint A rail that scrolls needs a gutter on both axes. `overflow-y-auto` clips
 * horizontally too, and the first and last items have nowhere further to scroll, so
 *             `px-3 py-1` — not `px-3` alone, which is all `scroll-container-gutter` checks for
 * @guideline Where a destination is unavailable, leave it out rather than passing `disabled`. A rail
 * answers "where can I go"; a place you cannot go is noise, and a dimmed row is a
 * question the reader has to resolve. `disabled` is styled for the case where the item
 * has to hold its position in a list the reader already knows
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=3179-14163
 */

/**
 * Navbar — fixed-width sidebar navigation.
 * Figma: 180px, flex-col, no gap between items.
 */
function Navbar({ className, ...props }: React.ComponentProps<"nav">) {
 return (
    <nav
 data-slot="navbar"
 className={cn(
        "flex w-full flex-col",
 className
      )}
      {...props}
    />
  )
}

/**
 * NavbarSection — collapsible group of nav items.
 * Separated from previous section by a border-top + padding.
 */
function NavbarSection({
 className,
 children,
 defaultExpanded = true,
  ...props
}: React.ComponentProps<"div"> & { defaultExpanded?: boolean }) {
 const [expanded, setExpanded] = React.useState(defaultExpanded)

 return (
    <div
 data-slot="navbar-section"
 className={cn("flex flex-col border-t border-border-base pt-2 mt-2", className)}
      {...props}
    >
      {React.Children.map(children, (child) => {
 if (React.isValidElement(child) && (child.type as any)?.displayName === "NavbarSectionHeader") {
 return React.cloneElement(child as React.ReactElement<any>, {
 expanded,
 onToggle: () => setExpanded(!expanded),
          })
        }
 if (expanded) return child
 return null
      })}
    </div>
  )
}

/**
 * NavbarSectionHeader — section title with chevron toggle.
 * 12px Hint style, muted-foreground, ChevronDown rotates when collapsed.
 */
function NavbarSectionHeader({
 className,
 expanded = true,
 onToggle,
 children,
  ...props
}: React.ComponentProps<"button"> & {
 expanded?: boolean
 onToggle?: () => void
}) {
 return (
    <button
 type="button"
 data-slot="navbar-section-header"
 data-expanded={expanded || undefined}
 aria-expanded={expanded}
 onClick={onToggle}
 className={cn(
        "flex w-full items-center gap-1 px-2 py-1 type-hint text-text-subtle hover:text-text-base",
 className
      )}
      {...props}
    >
      <span className="flex-1 truncate text-left">{children}</span>
      <ChevronDown
 className={cn("size-3 shrink-0 text-text-subtle transition-transform", !expanded && "-rotate-90")}
      />
    </button>
  )
}
NavbarSectionHeader.displayName = "NavbarSectionHeader"

/**
 * NavbarItem — single navigation item.
 *
 * `active` is one fact with three renderings: the accent fill, the accent
 * foreground, and `aria-current`. They are emitted from the same expression so
 * they cannot drift — the first two are the whole of "you are here" for a sighted
 * reader and none of it for anyone else.
 *
 * The accent foreground carries the state; the fill only tints it. `surface-accent`
 * on a `surface-subtle` rail is 1.15:1 under light and 1.11:1 under dark, so the
 * fill alone would not register as a boundary — `text-accent` and the matching icon
 * colour are what a reader actually sees, at 6.63:1 and 9.61:1 on that fill.
 *
 * This item used to add `border-accent` and a bolder ramp step on top. Both were
 * removed by design decision, which leaves colour as the only visual channel for
 * the state and means 1.4.1 rests on the accent foreground reading as a deliberate
 * difference rather than a hue swap. `aria-current` is unaffected and remains the
 * whole of the state for assistive tech.
 *
 * The hover wash is scoped to items that are not current. Bare, it outranked
 * the accent fill and replaced it, so pointing at the current item erased the
 * one tint that distinguished it from its twenty siblings — B13. Scoping fixes
 * the erasure and costs the current item its hover response, which is the right
 * trade only because there is nowhere for it to take you. Giving it a response
 * of its own needs an accent stop that does not exist; see the note there.
 *
 * Every item still carries a transparent border. Nothing recolours it at rest now,
 * but focus does, and the rail is a flush vertical stack — a border that appeared
 * only on the focused item would inset that one item's label a pixel and leave
 * twenty others where they were.
 *
 * Focus is the system's ring — `border-focus-ring` under a 3px halo — and it takes
 * the border the item already has, so it costs no layout. Now that the current item
 * has no border of its own, the ring is the only thing that ever colours one, so
 * focus and current no longer compete for the same edge.
 *
 * `scroll-my-1` is load-bearing. Tab on an item below the fold scrolls it flush
 * to the rail's edge, and a rail is `overflow-y-auto`, so the lower 3px of the
 * ring is cut off — measured at exactly -3px without it. The rail needs a `py`
 * gutter as well, for the first and last items, which have nowhere left to
 * scroll; see the constraint on `Navbar`.
 *
 * `aria-current` sits before the spread, so a consumer whose item does not
 * change the page can pass a different value and win.
 */
function NavbarItem({
 className,
 active = false,
  ...props
}: React.ComponentProps<"button"> & { active?: boolean }) {
 return (
    <button
 data-slot="navbar-item"
 data-active={active || undefined}
 aria-current={active ? "page" : undefined}
 className={cn(
        "flex h-7 w-full items-center gap-2 rounded-1 border border-transparent px-2 text-text-base text-left",
        // Scoped, not bare. Both this and the accent fill below land in
        // different `twMerge` groups, so `cn()` keeps both and then `:hover`
        // outranks a plain class — pointing at the current item used to repaint
        // it in the ordinary wash and throw its state away (B13). The selector
        // is the fix: an item that is current is never a hover target for this
        // rule, so the accent fill survives the pointer.
        "not-data-active:hover:bg-action-default-hover",
        // The ring draws outward from a border it already has, so focus costs
        // no layout. z-10 is for the flush stack: the next item down paints
        // after this one, and an accent fill would cover the ring's lower edge.
        // scroll-my-1 is what keeps the ring inside the rail. Tab on an item
        // below the fold scrolls it flush to the container edge, and a rail is
        // `overflow-y-auto`, so the whole 3px would be cut off — measured at
        // exactly -3px before this. The rail's px-3 only ever covered the
        // horizontal axis; `scroll-container-gutter` now reads all four, and
        // the rail carries py-1 as well. This does not replace that gutter —
        // the first and last item have nowhere further to scroll.
        "outline-none focus-visible:z-10 focus-visible:border-focus-ring focus-visible:shadow-focus scroll-my-1",
        // The icon sets its own color, so dimming the label leaves it behind.
        "disabled:pointer-events-none disabled:text-text-disabled disabled:[&_[data-slot=navbar-item-icon]]:text-text-disabled",
        // One ramp class, never two. Each is the whole style, so a second would
        // replace the first outright rather than adjust it. The current item takes
        // the same step as its siblings — the accent colour is what marks it.
        "type-label",
 active && "bg-surface-accent text-text-accent [&_[data-slot=navbar-item-icon]]:text-text-accent",
        "[&_svg:not([class*='size-'])]:size-4",
 className
      )}
      {...props}
    />
  )
}

/**
 * NavbarItemIcon — leading icon slot.
 */
function NavbarItemIcon({
 className,
  ...props
}: React.ComponentProps<"span">) {
 return (
    <span
 data-slot="navbar-item-icon"
 className={cn(
        "pointer-events-none flex shrink-0 items-center text-text-subtle [&_svg:not([class*='size-'])]:size-4",
 className
      )}
      {...props}
    />
  )
}

/**
 * NavbarNewButton — the creation affordance at the top of the rail.
 *
 * The rail is `surface-subtle` and this button carries no border, so its fill
 * is the whole of "raised". `surface-base` is the far end of the surface ramp
 * in both themes — the whitest step under light, the darkest under dark — so on
 * a subtle rail it sits above the backdrop in light and below it in dark. The
 * `dark:` step moves it to `surface-strong`, the ramp's light end under dark,
 * which puts the fill back on the same side of the rail in both themes. The
 * shadow cannot carry that on its own: black at 45% over a near-black rail
 * reads as more recess, not less.
 *
 * @constraint Neutral by design. This button carries no accent.
 * @guideline A `className` that replaces the fill must replace both halves. `cn()`
 * groups a bare utility and a `dark:` one separately, so passing `bg-*` alone
 * wins under light and leaves the `dark:` step standing under dark.
 */
function NavbarNewButton({ className, ...props }: React.ComponentProps<"button">) {
 return (
    <button
 data-slot="navbar-new-button"
 className={cn(
        "flex h-8 w-full items-center gap-2 rounded-3 bg-surface-base dark:bg-surface-strong px-3 shadow-md type-label-bold text-text-base",
        "[&_svg:not([class*='size-'])]:size-4",
 className
      )}
      {...props}
    />
  )
}

export { Navbar, NavbarSection, NavbarSectionHeader, NavbarItem, NavbarItemIcon, NavbarNewButton }
