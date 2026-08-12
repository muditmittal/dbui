/**
 * Plain data, deliberately not in DocsNav.tsx. That file is `"use client"`, and
 * a server component importing a non-component export from a client module gets
 * a client reference rather than the value — so `DOCS_NAV.map` is not a function.
 *
 * Only routes that exist. A nav entry that 404s is worse than a missing one.
 *
 * URLs stay flat. `Docs` and `Tools` are groups in the nav, but nothing sits at
 * `/docs/design-system/tokens`. Grouping is a navigation concern, so it does not
 * get to rewrite every route and link.
 *
 * Two groups, no ungrouped entries. `Tools` links to the page it heads; `Docs`
 * does not — it is a heading only.
 *
 * Tokens, Icons and Components are not in the rail. They are top-level entries in
 * the site header, and a second copy here would be the two-doors-to-one-page
 * problem that once put the component index behind the Storybook sandbox. The
 * `Design system` group that used to hold them is gone with them; what remained of
 * it — Layout, Patterns, Shells — reads as part of Docs rather than as a set of its
 * own, so it moved up rather than keeping a group alive for three rows.
 *
 * `/docs/utilities` and `/docs/foundations` still render but nothing links to
 * them: Utilities was cut from the rail, and Foundations only ever existed as the
 * `Design system` landing page.
 *
 * `/docs` still exists and still renders — it is kept for a later purpose — but
 * nothing links to it. As a landing page it was a stop on the way to the page
 * the reader wanted, and it broke the header's selected state: the top-level
 * `Docs` entry had to match `/docs` exactly to avoid staying lit across the whole
 * section, which meant it went dim the moment you opened anything inside it.
 * Pointing the header at the first real page fixes both.
 */

export type DocsNavItem = {
  href: string
  label: string
  /**
   * The entry leaves the docs section. The rail marks its own page by matching
   * the pathname, so an entry pointing outside `/docs` can never be the current
   * one — it would read as the single row that is always dim. Marking it says
   * that is the destination's doing rather than the rail's.
   */
  outbound?: true
}

export type DocsNavEntry = Omit<DocsNavItem, "href"> & {
  /**
   * Absent when the label heads a group without being a destination itself. The
   * rail then renders it as text, so the word is a heading rather than a link
   * that goes somewhere the reader did not ask for.
   */
  href?: string
  /** Present on a group. */
  items?: DocsNavItem[]
}

export const DOCS_NAV: DocsNavEntry[] = [
  {
    // No href. `Docs` is the section's name, not a page.
    label: "Docs",
    items: [
      { href: "/docs/principles", label: "Design principles" },
      { href: "/docs/voice", label: "Voice and tone" },
      { href: "/docs/constraints", label: "Constraints" },
      // Third of the three, and last on purpose. Principles and constraints are
      // how to think; guidelines are what good looks like on one surface, and
      // the page opens by pointing back at both. A reader who meets it first
      // meets thirteen surfaces before the two ideas that order them.
      { href: "/docs/guidelines", label: "Guidelines" },
      // Standards moved out of Tools when it stopped being called Checks. The
      // split this group is built on is stated two entries up: Docs holds a
      // standard you follow, Tools holds machinery you run. A page named
      // Standards fails that test in Tools. Its three commands went with it —
      // how you verify a floor is part of the floor, and splitting them would
      // put the rule and its check on two pages.
      { href: "/docs/standards", label: "Standards" },
      // Not "Accessibility and internationalization". That label wrapped to
      // three rail lines, and nobody scans a rail for a twenty-letter word. The
      // language rules are announced in the page's own description.
      //
      // Sits here rather than under Tools because it is a standard you follow,
      // like the principles and the voice guide. Tools holds machinery you run.
      { href: "/docs/accessibility", label: "Accessibility" },
      // Layout above Patterns because it answers the earlier question. Layout
      // settles the frame, the regions and which container scrolls; Patterns
      // settles what happens inside them over time.
      { href: "/docs/layout", label: "Layout" },
      { href: "/docs/patterns", label: "Patterns" },
      // The shells used to be a top-level `/templates` gallery. One page reads
      // the generated module now, and `/templates` redirects here.
      { href: "/docs/shells", label: "Shells" },
    ],
  },
  {
    href: "/docs/overview",
    label: "Tools",
    items: [
      { href: "/docs/cli", label: "CLI" },
      { href: "/docs/mcp", label: "MCP servers" },
    ],
  },
]
