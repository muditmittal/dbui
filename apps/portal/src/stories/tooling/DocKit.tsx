import * as React from "react"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "dbui/components/ui/table"
import { Badge } from "dbui/components/ui/badge"
import { Alert, AlertIcon, AlertContent, AlertTitle, AlertDescription } from "dbui/components/ui/alert"
import { InfoSmall } from "dbui/components/icons/InfoSmall"

/**
 * Documentation primitives for the Tooling pages, built from DBUI components so
 * the docs dogfood the system they describe. Storybook's MDX has no GFM plugin,
 * so markdown tables do not render — these replace them.
 */

export function DocPage({ children }: { children: React.ReactNode }) {
  return <div className="flex max-w-4xl flex-col gap-10 pb-16">{children}</div>
}

export function Lede({ children }: { children: React.ReactNode }) {
  return <p className="max-w-[68ch] text-[16px] leading-[22px] text-text-subtle">{children}</p>
}

/**
 * Storybook's docs stylesheet already draws a rule under every `h2`, so this
 * adds none of its own — an earlier version did, which produced two.
 */
export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-[16px] leading-[22px] font-semibold text-text-strong">{title}</h2>
      {children}
    </section>
  )
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="max-w-[68ch] text-[13px] leading-[20px] text-text-base">{children}</p>
}

/** Inline code, on the Code text style — mono at the paragraph size. */
export function C({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-sm bg-surface-inset px-1 py-0.5 font-mono text-[13px] leading-[20px] text-text-base">
      {children}
    </code>
  )
}

/**
 * Terminal block. Each entry is a command and an optional trailing note; the
 * note is dimmed so the command leads. Long lines scroll rather than wrap,
 * because a wrapped command is unreadable.
 */
export function Cmd({ lines }: { lines: Array<[string, string?]> }) {
  return (
    <div className="overflow-x-auto rounded-md border border-border-base bg-surface-inset px-4 py-3">
      <pre className="w-max font-mono text-[13px] leading-[20px] text-text-base">
        {lines.map(([cmd, note], i) => (
          <div key={i}>
            <span>{cmd}</span>
            {note ? <span className="text-text-subtle">{`  # ${note}`}</span> : null}
          </div>
        ))}
      </pre>
    </div>
  )
}

/**
 * A block of literal output or code. Unlike Cmd there is no comment column, and
 * lines are preserved exactly — this is what a caller actually receives.
 */
export function CodeBlock({ children, caption }: { children: string; caption?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      {caption ? <span className="text-[12px] leading-[16px] text-text-subtle">{caption}</span> : null}
      <div className="overflow-x-auto rounded-md border border-border-base bg-surface-inset px-4 py-3">
        <pre className="w-max font-mono text-[13px] leading-[20px] text-text-base">{children}</pre>
      </div>
    </div>
  )
}

/** A short list of what a page covers, shown directly under the lede. */
export function Covers({ items }: { items: Array<[string, string]> }) {
  return (
    <ul className="flex max-w-[68ch] flex-col gap-1.5">
      {items.map(([name, why]) => (
        <li key={name} className="text-[13px] leading-[20px] text-text-base">
          <span className="font-semibold text-text-strong">{name}</span>
          <span className="text-text-subtle">{` — ${why}`}</span>
        </li>
      ))}
    </ul>
  )
}

type Col = { key: string; header: string; width?: string; mono?: boolean }

/**
 * Scrolls inside its own container rather than widening the page, which is what
 * pushed the whole document into a horizontal scroll before.
 */
export function DocTable({
  columns,
  rows,
}: {
  columns: Col[]
  rows: Array<Record<string, React.ReactNode>>
}) {
  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-lg">
        <TableHeader>
          <TableRow>
            {columns.map((c) => (
              <TableHead key={c.key} className={c.width}>
                {c.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r, i) => (
            <TableRow key={i}>
              {columns.map((c) => (
                <TableCell
                  key={c.key}
                  className={c.mono ? "align-top py-2 font-mono text-[12px]" : "align-top py-2"}
                >
                  {r[c.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

/**
 * Alert is a flex row of [icon][content][action]. Title and description must sit
 * inside AlertContent or they become siblings of the icon and lay out beside
 * each other instead of stacking.
 */
export function Note({
  title,
  variant = "info",
  children,
}: {
  title: string
  variant?: "info" | "warning" | "success" | "danger"
  children: React.ReactNode
}) {
  return (
    <Alert variant={variant}>
      <AlertIcon>
        <InfoSmall />
      </AlertIcon>
      <AlertContent>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{children}</AlertDescription>
      </AlertContent>
    </Alert>
  )
}

export function Tag({ children }: { children: React.ReactNode }) {
  return <Badge variant="outline">{children}</Badge>
}
