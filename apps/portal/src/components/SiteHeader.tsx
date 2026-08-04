"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "dbui/components/ui/button"
import { DbuiLogo } from "./DbuiLogo"

/**
 * `exact` marks the entries that are prefixes of other entries. Without it,
 * "/" would match every route and "/docs" would stay lit on every docs child.
 */
const NAV = [
  { href: "/", label: "Home", exact: true },
  { href: "/docs", label: "Docs", exact: true },
  { href: "/components", label: "Components" },
  { href: "/templates", label: "Templates" },
  { href: "/docs/install", label: "Install" },
]

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-10 border-b border-border-base bg-surface-base/85 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-8 px-6">
        <Link
          href="/"
          aria-label="DBUI home"
          className="shrink-0 text-text-strong no-underline"
        >
          <DbuiLogo className="h-5 w-auto" />
        </Link>

        <nav className="flex items-center gap-1">
          {NAV.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`type-label rounded-sm px-2.5 py-1.5 no-underline transition-colors ${
                  active
                    ? "bg-surface-accent text-text-accent"
                    : "text-text-subtle hover:bg-action-default-hover hover:text-text-strong"
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <a
            href="https://github.com/muditmittal/dbui"
            target="_blank"
            rel="noreferrer"
            className="type-label text-text-subtle no-underline hover:text-text-strong"
          >
            GitHub
          </a>
          <Button size="sm" nativeButton={false} render={<Link href="/docs" />}>
            Get started
          </Button>
        </div>
      </div>
    </header>
  )
}
