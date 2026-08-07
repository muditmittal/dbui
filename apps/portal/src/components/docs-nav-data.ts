/**
 * Plain data, deliberately not in DocsNav.tsx. That file is `"use client"`, and
 * a server component importing a non-component export from a client module gets
 * a client reference rather than the value — so `DOCS_NAV.map` is not a function.
 *
 * Only routes that exist. A nav entry that 404s is worse than a missing one.
 *
 * URLs stay flat. `Docs`, `Design system` and `Tools` are groups in the nav and
 * landing pages of their own, but nothing sits at `/docs/design-system/tokens`.
 * Grouping is a navigation concern, so it does not get to rewrite every route
 * and link.
 *
 * Three groups, no ungrouped entries. Every top-level label is a link to the
 * page it heads, so no heading is a dead word.
 */

export type DocsNavItem = { href: string; label: string }

export type DocsNavEntry = DocsNavItem & {
  /** Present on a group. The entry itself is the group's landing page. */
  items?: DocsNavItem[]
}

export const DOCS_NAV: DocsNavEntry[] = [
  {
    href: "/docs",
    label: "Docs",
    items: [
      { href: "/docs/principles", label: "Design principles" },
      { href: "/docs/voice", label: "Voice and tone" },
      { href: "/docs/constraints", label: "Constraints" },
    ],
  },
  {
    // Labelled `Design system` and served from `/docs/foundations`. The label is
    // the reader's word for what the group holds; the route is older than the
    // label and every link already written against it still resolves.
    href: "/docs/foundations",
    label: "Design system",
    items: [
      { href: "/docs/tokens", label: "Tokens" },
      { href: "/docs/icons", label: "Icons" },
      { href: "/docs/components", label: "Components" },
      // Above Patterns because it answers the earlier question. Layout settles
      // the frame, the regions and which container scrolls; Patterns settles
      // what happens inside them over time.
      { href: "/docs/layout", label: "Layout" },
      { href: "/docs/patterns", label: "Patterns" },
      // The shells used to be a top-level `/templates` gallery. One page reads
      // the generated module now, and `/templates` redirects here.
      { href: "/docs/shells", label: "Shells" },
      { href: "/docs/utilities", label: "Utilities" },
    ],
  },
  {
    href: "/docs/overview",
    label: "Tools",
    items: [
      // Not "Accessibility and internationalization". That label wrapped to
      // three rail lines, and nobody scans a rail for a twenty-letter word. The
      // language rules are announced in the page's own description.
      { href: "/docs/accessibility", label: "Accessibility" },
      { href: "/docs/cli", label: "CLI" },
      { href: "/docs/mcp", label: "MCP servers" },
      { href: "/docs/checks", label: "Checks" },
    ],
  },
]
