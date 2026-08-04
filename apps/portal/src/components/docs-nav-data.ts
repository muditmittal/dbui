/**
 * Plain data, deliberately not in DocsNav.tsx. That file is `"use client"`, and
 * a server component importing a non-component export from a client module gets
 * a client reference rather than the value — so `DOCS_NAV.map` is not a function.
 *
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
