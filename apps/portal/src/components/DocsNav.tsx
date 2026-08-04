"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

/**
 * Grouped by the order someone actually needs them: understand the system, then
 * its foundations, then the rules, then the tooling.
 */
export const DOCS_NAV = [
  {
    title: "Start",
    items: [
      { href: "/docs", label: "Overview" },
      { href: "/docs/install", label: "Installation" },
      { href: "/docs/principles", label: "Design principles" },
    ],
  },
  {
    title: "Foundations",
    items: [
      { href: "/docs/tokens", label: "Tokens" },
      { href: "/docs/type", label: "Typography" },
      { href: "/docs/icons", label: "Icons" },
      { href: "/docs/layout", label: "Layout" },
    ],
  },
  {
    title: "Guides",
    items: [
      { href: "/docs/voice", label: "Voice and tone" },
      { href: "/docs/accessibility", label: "Accessibility" },
      { href: "/docs/i18n", label: "Internationalization" },
    ],
  },
  {
    title: "Tooling",
    items: [
      { href: "/docs/cli", label: "CLI" },
      { href: "/docs/mcp", label: "MCP server" },
      { href: "/docs/checks", label: "Checks and skills" },
    ],
  },
]

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
