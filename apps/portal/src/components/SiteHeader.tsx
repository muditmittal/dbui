"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "dbui/components/ui/button"
import { DbuiLogo } from "./DbuiLogo"

/**
 * `exact` marks the entries that are prefixes of other entries. Without it, "/"
 * would match every route.
 *
 * `match` separates where an entry GOES from what it counts as being on. Docs
 * needs both because the two differ: it goes to the first real page, and it
 * stays lit anywhere under `/docs`. Before, one value did both jobs and could
 * only do one of them — `/docs` with `exact` went dim as soon as you opened a
 * child, and without `exact` the section had a landing page nobody wanted.
 */
const NAV = [
  // `/docs` still renders and is kept for a later purpose, but it is not a
  // destination: it sat between the reader and the page they came for.
  { href: "/docs/principles", label: "Docs", match: "/docs" },
  // Tokens and Icons are top-level doors of their own, even though they live
  // under `/docs`. That is why the current entry is the LONGEST match rather
  // than the first: on `/docs/tokens` both this and Docs match, and matching
  // Docs there would light two entries at once and announce the wrong one.
  { href: "/docs/tokens", label: "Tokens" },
  { href: "/docs/icons", label: "Icons" },
  { href: "/components", label: "Components" },
]

/**
 * No Home entry — the logo is the way home, and a second one beside it spent a
 * slot on the row's least ambiguous target.
 */

/**
 * `currentHref` overrides which entry reads as the page you are on. Leave it
 * off and the pathname decides, which is right for every route but one.
 *
 * `usePathname()` drops the query, so `/components?path=…` — the Storybook
 * sandbox — looks to the header exactly like `/components`, the gallery. That
 * lit the Components entry as "you are here" while its bare href was in fact a
 * working way back, which made the more prominent of the two exits look inert.
 * The sandbox passes `null` to say that no entry is the current page.
 *
 * Deliberately not a rule that compares the whole URL. `?path=` is the only
 * query in the portal that selects a different page; `?theme=` and `?scale=`
 * are display preferences that apply to every route, and a URL comparison
 * would drop the highlight on `/?theme=dark` — a link this repo hands out for
 * screenshots.
 *
 * `isCurrent` decides both the accent fill and `aria-current`, from one call.
 * They are two renderings of one fact, and the reason to keep them on the same
 * expression is the sandbox: passing `null` has to drop the announcement as
 * well as the highlight, or the header tells a screen reader the reader is on a
 * page they navigated away from.
 */
export function SiteHeader({ currentHref }: { currentHref?: string | null }) {
  const pathname = usePathname()

  /**
   * The longest match wins. `Docs` claims all of `/docs`, and Tokens and Icons
   * live inside it, so a first-match rule lit Docs on `/docs/tokens` — two lit
   * entries, and `aria-current` on the one the reader is not reading.
   */
  const current = (() => {
    if (currentHref !== undefined) {
      return NAV.find((item) => item.href === currentHref) ?? null
    }
    const scope = (item: (typeof NAV)[number]) => item.match ?? item.href
    return (
      NAV.filter((item) => pathname.startsWith(scope(item))).sort(
        (a, b) => scope(b).length - scope(a).length
      )[0] ?? null
    )
  })()

  return (
    <header className="sticky top-0 z-sticky border-b border-border-base bg-surface-base/85 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-8 px-6">
        <Link
          href="/"
          aria-label="DBUI home"
          className="shrink-0 text-text-strong no-underline"
        >
          <DbuiLogo className="h-5 w-auto" />
        </Link>

        <nav className="flex items-center gap-2">
          {NAV.map((item) => {
            const active = item === current
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                // 24px tall on the size scale, matching the `sm` button at the
                // other end of the same row.
                className={`type-label rounded-1 px-3 py-1 no-underline transition-colors ${
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

        {/* Wider than the nav's gap: a text link beside a filled button needs
            more separation than two links of the same weight.

            Install sits here rather than in the nav because it is a task, not a
            section — you do it once and never navigate back to it. Human page;
            agents fetch /install.md for the raw step list. */}
        <div className="ml-auto flex items-center gap-4">
          <Link
            href="/install"
            aria-current={pathname === "/install" ? "page" : undefined}
            className="type-label text-text-subtle no-underline hover:text-text-strong aria-[current=page]:text-text-strong"
          >
            Install
          </Link>
          <Button size="sm" nativeButton={false} render={<Link href="/docs/principles" />}>
            Get started
          </Button>
        </div>
      </div>
    </header>
  )
}
