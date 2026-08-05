/**
 * Plain data, deliberately not in DocsNav.tsx. That file is `"use client"`, and
 * a server component importing a non-component export from a client module gets
 * a client reference rather than the value — so `DOCS_NAV.map` is not a function.
 *
 * Only routes that exist. A nav entry that 404s is worse than a missing one.
 */
export const DOCS_NAV = [
  {
    title: "Start",
    items: [
      { href: "/docs", label: "Overview" },
      { href: "/docs/principles", label: "Design principles" },
    ],
  },
  {
    title: "Foundations",
    items: [
      { href: "/docs/tokens", label: "Tokens" },
      { href: "/docs/voice", label: "Voice and tone" },
    ],
  },
  {
    title: "Tooling",
    items: [
      { href: "/docs/overview", label: "Overview" },
      { href: "/docs/cli", label: "CLI" },
      { href: "/docs/mcp", label: "MCP server" },
      { href: "/docs/checks", label: "Checks and skills" },
    ],
  },
]
