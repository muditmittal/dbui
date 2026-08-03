"use client"

import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "dbui/components/ui/table"

import { cn } from "../lib/utils"

/**
 * @standard Response
 * @guideline Use for every assistant answer — it renders the markdown models emit
 * @guideline Safe to re-render on every streamed chunk; unterminated code fences degrade gracefully
 * @guideline Markdown tables render as a real dbui Table, so they match product tables exactly
 * @constraint Zero external dependencies by design — no markdown library is installable in the Databricks environment
 * @constraint Supports a deliberate subset: headings, emphasis, links, lists, quotes, code, tables, rules. Nested lists are flattened.
 * @constraint Never renders raw HTML from model output — text is escaped by React
 */

/**
 * Inline token order matters: `code` wins over everything so its contents stay
 * literal, and `**bold**` is matched before `*italic*`.
 */
const INLINE_TOKEN =
  /(`[^`]+`)|(\*\*[^*]+?\*\*)|(__[^_]+?__)|(~~[^~]+?~~)|(\*[^*\n]+?\*)|(_[^_\n]+?_)|(\[[^\]]*\]\([^)\s]+\))/

function renderInline(text: string, keyPrefix: string): React.ReactNode {
  const nodes: React.ReactNode[] = []
  let rest = text
  let cursor = 0
  let index = 0

  while (rest.length > 0) {
    const match = INLINE_TOKEN.exec(rest)
    if (!match || match.index === undefined) break

    if (match.index > 0) nodes.push(rest.slice(0, match.index))

    const token = match[0]
    const key = `${keyPrefix}-i${index++}`

    if (token.startsWith("`")) {
      nodes.push(
        <code
          key={key}
          className="rounded-sm bg-surface-inset px-1 py-0.5 font-mono text-[12px]"
        >
          {token.slice(1, -1)}
        </code>
      )
    } else if (token.startsWith("**") || token.startsWith("__")) {
      nodes.push(
        <strong key={key} className="font-semibold">
          {renderInline(token.slice(2, -2), key)}
        </strong>
      )
    } else if (token.startsWith("~~")) {
      nodes.push(
        <s key={key} className="text-text-subtle">
          {renderInline(token.slice(2, -2), key)}
        </s>
      )
    } else if (token.startsWith("[")) {
      const link = /^\[([^\]]*)\]\(([^)\s]+)\)$/.exec(token)
      if (link) {
        nodes.push(
          <a
            key={key}
            href={link[2]}
            target="_blank"
            rel="noreferrer"
            className="text-link-base underline underline-offset-2 hover:text-link-hover"
          >
            {renderInline(link[1], key)}
          </a>
        )
      } else {
        nodes.push(token)
      }
    } else {
      nodes.push(
        <em key={key} className="italic">
          {renderInline(token.slice(1, -1), key)}
        </em>
      )
    }

    rest = rest.slice(match.index + token.length)
    cursor += match.index + token.length
  }

  if (rest.length > 0) nodes.push(rest)
  return nodes.length === 1 ? nodes[0] : nodes
}

const HEADING = /^(#{1,6})\s+(.*)$/
const FENCE = /^```(\S*)\s*$/
const RULE = /^\s*([-*_])(\s*\1){2,}\s*$/
const QUOTE = /^>\s?(.*)$/
const UNORDERED = /^\s*[-*+]\s+(.*)$/
const ORDERED = /^\s*\d+[.)]\s+(.*)$/
const TABLE_DIVIDER = /^\s*\|?[\s:|-]*-[\s:|-]*\|?\s*$/

function splitTableRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim())
}

const HEADING_CLASS = [
  "text-[22px] leading-[28px] font-semibold",
  "text-[18px] leading-[24px] font-semibold",
  "text-[13px] leading-[20px] font-semibold",
]

function parseBlocks(markdown: string): React.ReactNode[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n")
  const blocks: React.ReactNode[] = []
  let index = 0
  let key = 0

  while (index < lines.length) {
    const line = lines[index]

    if (line.trim() === "") {
      index++
      continue
    }

    const fence = FENCE.exec(line)
    if (fence) {
      const body: string[] = []
      index++
      while (index < lines.length && !/^```/.test(lines[index])) {
        body.push(lines[index])
        index++
      }
      index++ // consume the closing fence when present
      blocks.push(
        <pre
          key={`b${key++}`}
          data-language={fence[1] || undefined}
          className="overflow-x-auto rounded-md bg-surface-inset p-3"
        >
          <code className="font-mono text-[12px] leading-[18px] whitespace-pre">
            {body.join("\n")}
          </code>
        </pre>
      )
      continue
    }

    if (
      line.includes("|") &&
      index + 1 < lines.length &&
      TABLE_DIVIDER.test(lines[index + 1])
    ) {
      const headers = splitTableRow(line)
      index += 2
      const rows: string[][] = []
      while (index < lines.length && lines[index].includes("|")) {
        rows.push(splitTableRow(lines[index]))
        index++
      }
      const tableKey = `b${key++}`
      blocks.push(
        <Table key={tableKey}>
          <TableHeader>
            <TableRow>
              {headers.map((header, i) => (
                <TableHead key={`${tableKey}-h${i}`}>
                  {renderInline(header, `${tableKey}-h${i}`)}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, r) => (
              <TableRow key={`${tableKey}-r${r}`}>
                {row.map((cell, c) => (
                  <TableCell key={`${tableKey}-r${r}c${c}`}>
                    {renderInline(cell, `${tableKey}-r${r}c${c}`)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )
      continue
    }

    const heading = HEADING.exec(line)
    if (heading) {
      const level = Math.min(heading[1].length, 3)
      const Tag = (`h${level}` as unknown) as keyof React.JSX.IntrinsicElements
      const headingKey = `b${key++}`
      blocks.push(
        React.createElement(
          Tag,
          { key: headingKey, className: HEADING_CLASS[level - 1] },
          renderInline(heading[2], headingKey)
        )
      )
      continue
    }

    if (RULE.test(line)) {
      blocks.push(<hr key={`b${key++}`} className="border-border-base" />)
      index++
      continue
    }

    const quote = QUOTE.exec(line)
    if (quote) {
      const body: string[] = [quote[1]]
      index++
      while (index < lines.length && QUOTE.test(lines[index])) {
        body.push((QUOTE.exec(lines[index]) as RegExpExecArray)[1])
        index++
      }
      const quoteKey = `b${key++}`
      blocks.push(
        <blockquote
          key={quoteKey}
          className="border-l-2 border-border-base pl-3 text-text-subtle"
        >
          {renderInline(body.join(" "), quoteKey)}
        </blockquote>
      )
      continue
    }

    const isUnordered = UNORDERED.test(line)
    const isOrdered = !isUnordered && ORDERED.test(line)
    if (isUnordered || isOrdered) {
      const pattern = isUnordered ? UNORDERED : ORDERED
      const items: string[] = []
      while (index < lines.length && pattern.test(lines[index])) {
        items.push((pattern.exec(lines[index]) as RegExpExecArray)[1])
        index++
      }
      const listKey = `b${key++}`
      const ListTag = isUnordered ? "ul" : "ol"
      blocks.push(
        React.createElement(
          ListTag,
          {
            key: listKey,
            className: cn(
              "flex flex-col gap-1 pl-5",
              isUnordered ? "list-disc" : "list-decimal"
            ),
          },
          items.map((item, i) => (
            <li key={`${listKey}-l${i}`} className="marker:text-text-subtle">
              {renderInline(item, `${listKey}-l${i}`)}
            </li>
          ))
        )
      )
      continue
    }

    // Paragraph: consume until a blank line or the start of another block.
    const paragraph: string[] = []
    while (
      index < lines.length &&
      lines[index].trim() !== "" &&
      !FENCE.test(lines[index]) &&
      !HEADING.test(lines[index]) &&
      !RULE.test(lines[index]) &&
      !QUOTE.test(lines[index]) &&
      !UNORDERED.test(lines[index]) &&
      !ORDERED.test(lines[index])
    ) {
      paragraph.push(lines[index])
      index++
    }
    const paragraphKey = `b${key++}`
    blocks.push(
      <p key={paragraphKey}>{renderInline(paragraph.join(" "), paragraphKey)}</p>
    )
  }

  return blocks
}

export interface ResponseProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  /** Markdown emitted by the model. */
  children?: string
}

function Response({ children = "", className, ...props }: ResponseProps) {
  const blocks = React.useMemo(() => parseBlocks(children), [children])

  return (
    <div
      data-slot="response"
      className={cn(
        "flex w-full min-w-0 flex-col gap-3 text-[13px] leading-[20px] text-text-base",
        className
      )}
      {...props}
    >
      {blocks}
    </div>
  )
}

export { Response }
