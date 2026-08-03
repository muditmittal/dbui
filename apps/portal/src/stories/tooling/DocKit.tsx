import * as React from "react"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "dbui/components/ui/table"
import { Badge } from "dbui/components/ui/badge"
import { Alert, AlertIcon, AlertTitle, AlertDescription } from "dbui/components/ui/alert"
import { Separator } from "dbui/components/ui/separator"
import { InfoSmall } from "dbui/components/icons/InfoSmall"

/**
 * Documentation primitives for the Tooling pages, built from DBUI components so
 * the docs dogfood the system they describe. Storybook's MDX has no GFM plugin,
 * so markdown tables do not render — these replace them.
 */

export function DocPage({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto flex max-w-4xl flex-col gap-6 pb-16">{children}</div>
}

export function Lede({ children }: { children: React.ReactNode }) {
  return <p className="text-[16px] leading-[22px] text-text-subtle">{children}</p>
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="mt-2 text-[16px] leading-[22px] font-semibold text-text-strong">{title}</h2>
      <Separator />
      {children}
    </section>
  )
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[13px] leading-[20px] text-text-base">{children}</p>
}

/** Inline code that reads as a token, not as prose. */
export function C({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-sm bg-surface-inset px-1 py-0.5 font-mono text-[12px] text-text-base">
      {children}
    </code>
  )
}

/** A terminal block. Comments are dimmed so the command itself leads. */
export function Cmd({ lines }: { lines: Array<[string, string?]> }) {
  return (
    <div className="overflow-x-auto rounded-md border border-border-base bg-surface-subtle p-3">
      <pre className="font-mono text-[12px] leading-[22px] text-text-base">
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

type Col = { key: string; header: string; width?: string; mono?: boolean }

export function DocTable({
  columns,
  rows,
}: {
  columns: Col[]
  rows: Array<Record<string, React.ReactNode>>
}) {
  return (
    <Table>
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
              <TableCell key={c.key} className={c.mono ? "align-top font-mono text-[12px]" : "align-top"}>
                {r[c.key]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

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
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  )
}

export function Tag({ children }: { children: React.ReactNode }) {
  return <Badge variant="outline">{children}</Badge>
}
