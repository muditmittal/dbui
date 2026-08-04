"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "dbui/components/ui/button"

const NAV = [
  { href: "/docs", label: "Docs" },
  { href: "/components", label: "Components" },
  { href: "/docs/tokens", label: "Tokens" },
  { href: "/docs/install", label: "Install" },
]

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-10 border-b border-border-base bg-surface-base/85 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-8 px-6">
        <Link href="/" className="type-title-4 text-text-strong no-underline">
          dbui
        </Link>

        <nav className="flex items-center gap-1">
          {NAV.map((item) => {
            // /docs must not light up for every /docs/* child beyond itself.
            const active =
              item.href === "/docs" ? pathname === "/docs" : pathname.startsWith(item.href)
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
          <Button size="sm" render={<Link href="/docs" />}>
            Get started
          </Button>
        </div>
      </div>
    </header>
  )
}
