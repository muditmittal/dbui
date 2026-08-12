import Link from "next/link"

import { ColorModeControl } from "./ColorModeControl"
import { ThemeControl } from "./ThemeControl"
import { TypeScaleControl } from "./TypeScaleControl"

/**
 * Site-wide, mounted once in the root layout so the controls are reachable from
 * every route rather than only from the docs rail they used to live in.
 *
 * Everything here does something. There is no tagline: a line naming the system
 * under a header that already names it changes nothing about what anyone does
 * next.
 */

/**
 * The library file every `@figma` tag in the component JSDoc points into. No
 * node id — those address one component, and this link addresses the file.
 */
const FIGMA_URL = "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System"

const LINKS = [
  { href: FIGMA_URL, label: "Figma", external: true },
  // Human install page. Agents fetch /install.md.
  { href: "/install", label: "Install", external: false },
  { href: "https://github.com/muditmittal/dbui", label: "GitHub", external: true },
]

const LINK_CLASS = "type-label text-text-subtle no-underline hover:text-text-strong"

export function SiteFooter() {
  return (
    // `mt-auto` against the column on <body>, so the footer sits at the bottom
    // of a short page instead of halfway up it.
    <footer className="mt-auto border-t border-border-base">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Wide enough that segment controls sharing a container fill read as
            separate controls rather than as one long group.

            Theme leads because it is the widest axis of the three: mode and
            scale change how the same aesthetic is rendered, and this changes
            which aesthetic it is. */}
        <div className="flex flex-wrap items-center gap-4">
          <ThemeControl />
          <ColorModeControl />
          <TypeScaleControl />
        </div>
        <nav className="flex items-center gap-6">
          {LINKS.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={LINK_CLASS}
              >
                {link.label}
              </a>
            ) : (
              <Link key={link.label} href={link.href} className={LINK_CLASS}>
                {link.label}
              </Link>
            )
          )}
        </nav>
      </div>
    </footer>
  )
}
