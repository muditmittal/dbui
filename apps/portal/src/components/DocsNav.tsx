"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { DOCS_NAV } from "./docs-nav-data"


export function DocsNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-7">
      {DOCS_NAV.map((group) => (
        <div key={group.title} className="flex flex-col gap-1">
          <span className="type-eyebrow px-2 pb-1 text-text-subtle">{group.title}</span>
          {group.items.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`type-label rounded-sm px-2 py-1.5 no-underline transition-colors ${
                  active
                    ? "bg-surface-accent font-semibold text-text-accent"
                    : "text-text-base hover:bg-action-default-hover hover:text-text-strong"
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      ))}
    </nav>
  )
}
