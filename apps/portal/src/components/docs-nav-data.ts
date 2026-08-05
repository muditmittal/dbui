/**
 * Plain data, deliberately not in DocsNav.tsx. That file is `"use client"`, and
 * a server component importing a non-component export from a client module gets
 * a client reference rather than the value — so `DOCS_NAV.map` is not a function.
 *
 * Only routes that exist. A nav entry that 404s is worse than a missing one.
 *
 * URLs stay flat. `Foundations` and `Tooling` are groups in the nav and landing
 * pages of their own, but nothing sits at `/docs/foundations/tokens`. Grouping is
 * a navigation concern, so it does not get to rewrite every route and link.
 */

export type DocsNavItem = { href: string; label: string }

export type DocsNavEntry = DocsNavItem & {
  /** Present on a group. The entry itself is the group's landing page. */
  items?: DocsNavItem[]
}

export const DOCS_NAV: DocsNavEntry[] = [
  { href: "/docs/principles", label: "Design principles" },
  { href: "/docs/voice", label: "Voice and tone" },
  {
    href: "/docs/foundations",
    label: "Foundations",
    items: [
      { href: "/docs/tokens", label: "Tokens" },
      { href: "/docs/icons", label: "Icons" },
      { href: "/docs/components", label: "Components" },
      { href: "/docs/patterns", label: "Patterns" },
      { href: "/docs/accessibility", label: "Accessibility and internationalization" },
    ],
  },
  {
    href: "/docs/overview",
    label: "Tooling",
    items: [
      { href: "/docs/cli", label: "CLI" },
      { href: "/docs/mcp", label: "MCP servers" },
      { href: "/docs/checks", label: "Design linters" },
    ],
  },
]
