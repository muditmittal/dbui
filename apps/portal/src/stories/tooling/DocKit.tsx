import * as React from "react"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "dbui/components/ui/table"
import { Badge } from "dbui/components/ui/badge"
import { Alert, AlertIcon, AlertContent, AlertTitle, AlertDescription } from "dbui/components/ui/alert"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "dbui/components/ui/collapsible"
import { InfoSmall } from "dbui/components/icons/InfoSmall"
import { ChevronDown } from "dbui/components/icons/ChevronDown"
import { ChevronUp } from "dbui/components/icons/ChevronUp"

/**
 * Documentation primitives for the Tooling pages, built from DBUI components so
 * the docs dogfood the system they describe. Storybook's MDX has no GFM plugin,
 * so markdown tables do not render — these replace them.
 */

/**
 * Storybook's docs stylesheet sets margins on every element it renders —
 * headings, paragraphs, lists and sections alike — and those margins *add* to
 * the flex gaps below, which is what produced the 40px gutters everywhere. Every
 * primitive here zeroes them so the flex gap is the only thing setting spacing.
 */
const RESET: React.CSSProperties = { margin: 0, padding: 0 }
const HEADING_RESET: React.CSSProperties = { ...RESET, border: "none" }

/**
 * Space goes *between* sections, not inside them. A section title, its intro
 * sentence and its table are one unit and sit close together; 32px separates
 * one unit from the next. That proximity is what tells a reader what belongs to
 * what.
 */
export function DocPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    // MDX wraps the children of a JSX component in its own <p>, and Storybook's
    // docs stylesheet gives every <p>, <ul> and <li> a 16px margin. Those nested
    // elements are not reachable by a style prop on the outer component, so they
    // are zeroed here once. Flex gap is then the only thing setting spacing.
    // Storybook's own selectors outrank a plain descendant rule, so these are
    // forced. Measured: without them the nested <p> keeps a 16px margin.
    // `sb-unstyled` opts the whole page out of Storybook's docs stylesheet,
    // which otherwise overrides font-family on prose and code — docs rendered in
    // Storybook's font would misrepresent the type system they document.
    <div className="sb-unstyled flex w-full max-w-3xl flex-col gap-7 pb-16 [&_li]:m-0! [&_ol]:m-0! [&_p]:m-0! [&_pre]:m-0! [&_ul]:m-0!">
      <h1
        style={HEADING_RESET}
        className="type-title-1 text-text-strong"
      >
        {title}
      </h1>
      {children}
    </div>
  )
}

/**
 * The lede, the contents list and any opening note are metadata about the page
 * rather than the page itself, so they sit in a container that reads as chrome
 * and start collapsed. A reader who already knows the material goes straight to
 * the first section; anyone orienting themselves opens it.
 */
export function ContentSummary({ children }: { children: React.ReactNode }) {
  return (
    <Collapsible defaultOpen={false}>
      <div className="overflow-hidden rounded-md border border-border-base bg-surface-subtle">
        <CollapsibleTrigger className="group/summary flex w-full cursor-default items-center gap-2 px-4 py-2.5 text-left text-[13px] leading-[20px] font-semibold text-text-base outline-none hover:bg-action-default-hover focus-visible:shadow-focus [&_svg:not([class*='size-'])]:size-4">
          <ChevronDown className="shrink-0 text-text-subtle group-aria-expanded/summary:hidden" />
          <ChevronUp className="hidden shrink-0 text-text-subtle group-aria-expanded/summary:inline" />
          Content summary
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="flex flex-col gap-4 border-t border-border-base px-4 py-4">
            {children}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}

export function Lede({ children }: { children: React.ReactNode }) {
  return (
    <p style={RESET} className="max-w-[64ch] type-paragraph text-text-subtle">
      {children}
    </p>
  )
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={RESET} className="flex flex-col gap-4">
      <h2
        style={HEADING_RESET}
        className="type-title-2 text-text-strong"
      >
        {title}
      </h2>
      {children}
    </section>
  )
}

export function P({ children }: { children: React.ReactNode }) {
  return (
    <p style={RESET} className="max-w-[64ch] type-paragraph text-text-base">
      {children}
    </p>
  )
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
      <pre style={RESET} className="w-max font-mono type-block text-text-base">
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
        <pre style={RESET} className="w-max font-mono type-block text-text-base">{children}</pre>
      </div>
    </div>
  )
}

/** A short list of what a page covers, shown directly under the lede. */
export function Covers({ items }: { items: Array<[string, string]> }) {
  return (
    <ul style={{ ...RESET, listStyle: "none" }} className="flex max-w-[64ch] flex-col gap-1.5">
      {items.map(([name, why]) => (
        <li key={name} style={RESET} className="type-paragraph text-text-base">
          <span className="font-semibold text-text-strong">{name}</span>
          <span className="text-text-subtle">{` — ${why}`}</span>
        </li>
      ))}
    </ul>
  )
}

type Col = { key: string; header: string; width?: string; mono?: boolean }

/**
 * Scrolls inside its own container rather than widening the page. Cells also
 * override DBUI's whitespace-nowrap: that is correct for a data table, where a
 * wrapped catalog name is worse than a scroll, but wrong for documentation full
 * of sentences.
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
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((c) => (
              <TableHead key={c.key} className={`h-auto py-2.5 align-bottom text-[13px] whitespace-normal! ${c.width ?? ""}`}>
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
                  className={
                    c.mono
                      ? "align-top py-2.5 font-mono text-[13px] whitespace-normal!"
                      : "align-top py-2.5 type-paragraph whitespace-normal!"
                  }
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
