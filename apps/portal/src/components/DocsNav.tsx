"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { ArrowRight } from "dbui/components/icons/ArrowRight"

import { DOCS_NAV, type DocsNavEntry, type DocsNavItem } from "./docs-nav-data"

/**
 * Every row is a flex line whether or not it has a mark, so the one that does
 * sits on the same baseline as the thirteen that do not.
 *
 * An outbound row can never go active — its page is outside the section the
 * rail describes, and the rail is not rendered there. The arrow is what stops
 * that reading as a row that is broken: it says the entry leads out, so a
 * reader is not waiting for it to light up. It is decorative and the link text
 * already names the destination, so it is hidden from the accessibility tree
 * rather than given a second name.
 *
 * `aria-current` carries the same state the accent fill and the heavier weight
 * carry. Those two are the whole of "you are here" for a sighted reader and
 * none of it for anyone else, so the attribute is not decoration on top of the
 * styling — it is the only form of the state that reaches assistive tech. Keep
 * it on whatever branch decides `active`.
 */
function NavLink({ item, indent }: { item: DocsNavItem; indent?: boolean }) {
  const pathname = usePathname()
  const active = pathname === item.href

  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={`flex items-center gap-2 rounded-1 py-1 no-underline transition-colors ${
        indent ? "pr-2 pl-6" : "px-2"
      } ${
        active
          ? // `label-bold` is the ramp's own step at this size — same 13/16 box,
            // heavier weight — so the row does not move when a link goes active.
            "type-label-bold bg-surface-accent text-text-accent"
          : "type-label text-text-base hover:bg-action-default-hover hover:text-text-strong"
      }`}
    >
      {item.label}
      {item.outbound && <ArrowRight aria-hidden className="size-3 shrink-0" />}
    </Link>
  )
}

/**
 * A group label with no page behind it. Same box and baseline as `NavLink` so it
 * sits in the rail's rhythm, and `type-label-bold` rather than the accent pair,
 * because a heading is not a row you can be on.
 *
 * Rendered as a `<p>` inside the group's own container rather than an `<h*>`: the
 * rail is a `<nav>` and the group is already a list of links under a name, so a
 * heading level here would claim a place in the document outline that the page's
 * own headings own.
 */
function NavHeading({ label }: { label: string }) {
  return <p className="type-label-bold px-2 py-1 text-text-subtle">{label}</p>
}

export function DocsNav() {
  return (
    // Wraps into rows on narrow screens, stacks into a rail from md up. The rail
    // has no heading of its own: `Docs` is the first group's label, so a heading
    // above it would be the same word twice.
    <nav
      aria-label="Docs"
      className="flex flex-row flex-wrap gap-x-6 gap-y-4 md:flex-col md:gap-1"
    >
      {DOCS_NAV.map((entry: DocsNavEntry) =>
        entry.items ? (
          // A group whose label is a page gets a link; one whose label is only a
          // name gets text. `Docs` is the second kind.
          <div key={entry.label} className="flex flex-col gap-1 md:mt-3 md:first:mt-0">
            {entry.href ? (
              <NavLink item={{ ...entry, href: entry.href }} />
            ) : (
              <NavHeading label={entry.label} />
            )}
            {entry.items.map((item) => (
              <NavLink key={item.href} item={item} indent />
            ))}
          </div>
        ) : entry.href ? (
          <NavLink key={entry.label} item={{ ...entry, href: entry.href }} />
        ) : (
          <NavHeading key={entry.label} label={entry.label} />
        )
      )}
    </nav>
  )
}
