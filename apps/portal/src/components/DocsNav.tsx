"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { DOCS_NAV, type DocsNavItem } from "./docs-nav-data"

function NavLink({ item, indent }: { item: DocsNavItem; indent?: boolean }) {
  const pathname = usePathname()
  const active = pathname === item.href

  return (
    <Link
      href={item.href}
      className={`type-label rounded-1 py-1.5 no-underline transition-colors ${
        indent ? "pr-2 pl-5" : "px-2"
      } ${
        active
          ? "bg-surface-accent font-semibold text-text-accent"
          : "text-text-base hover:bg-action-default-hover hover:text-text-strong"
      }`}
    >
      {item.label}
    </Link>
  )
}

export function DocsNav() {
  return (
    // Wraps into rows on narrow screens, stacks into a rail from md up.
    <nav className="flex flex-col gap-4">
      <span className="type-eyebrow px-2 text-text-subtle">Docs</span>
      <div className="flex flex-row flex-wrap gap-x-6 gap-y-4 md:flex-col md:gap-1">
        {DOCS_NAV.map((entry) =>
          entry.items ? (
            // A group's own entry is its landing page, so it is a link like any
            // other. The children are indented rather than given a separate
            // heading, which would make the landing page unreachable.
            <div key={entry.href} className="flex flex-col gap-1 md:mt-3 md:first:mt-0">
              <NavLink item={entry} />
              {entry.items.map((item) => (
                <NavLink key={item.href} item={item} indent />
              ))}
            </div>
          ) : (
            <NavLink key={entry.href} item={entry} />
          )
        )}
      </div>
    </nav>
  )
}
