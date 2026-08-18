"use client"

import * as React from "react"

import { cn } from "../../lib/utils"
import { Button } from "./button"
import { Copy } from "../icons/Copy"
import { Check } from "../icons/Check"

/**
 * @standard Code Block
 * @guideline Use for a block of code on its own — a query the agent wrote, a snippet in a doc, a preview tab
 * @guideline Name the language so the caption says what it is. It is a label, not a highlighter — nothing here parses the code
 * @guideline Turn on `lineNumbers` when a reader has to refer to a line by number, and leave it off otherwise — the gutter is noise in a four-line snippet
 * @guideline `Response` renders fenced code through this component, so a fence in an answer and a standalone block are the same surface by construction
 * @constraint No syntax highlighting, and this is a constraint rather than a gap. Every highlighter is a dependency, and the Databricks environment cannot install one — a block that colours in one product and not another is worse than one that never does
 * @constraint The code is preformatted and scrolls horizontally. Never wrap it: a wrapped line changes what the code says
 * @constraint Pass code as a string, not as children markup. React would escape it inconsistently and a copy would return the wrong thing
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=5087-7835
 */

export interface CodeBlockProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  /** The code. Passed as a string so copy returns exactly what is shown. */
  code: string
  /** Shown in the caption, and set as `data-language`. Not used to highlight. */
  language?: string
  /** A filename or a short description, shown beside the language. */
  label?: string
  lineNumbers?: boolean
  /** Hide the copy control for a block nobody would copy. */
  copyable?: boolean
}

const COPIED_MS = 2000

function CodeBlock({
  code,
  language,
  label,
  lineNumbers,
  copyable = true,
  className,
  ...props
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    []
  )

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      return
    }
    setCopied(true)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), COPIED_MS)
  }

  const lines = React.useMemo(() => code.replace(/\n$/, "").split("\n"), [code])
  const hasHeader = Boolean(language || label || copyable)

  return (
    <div
      data-slot="code-block"
      data-language={language}
      className={cn(
        "flex min-w-0 flex-col overflow-hidden shape-container border border-border-base bg-surface-inset",
        className
      )}
      {...props}
    >
      {hasHeader ? (
        <div className="flex items-center gap-2 border-b border-border-base px-3 py-2">
          <span className="min-w-0 flex-1 truncate type-hint text-text-subtle">
            {label ?? language}
          </span>
          {copyable ? (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={copied ? "Copied" : "Copy code"}
              onClick={copy}
            >
              {copied ? <Check /> : <Copy />}
            </Button>
          ) : null}
        </div>
      ) : null}

      {/* The scroll container is the pre, so the gutter scrolls with the code
          rather than detaching from the line it numbers. */}
      <pre className="overflow-x-auto p-3">
        <code className="type-code-block block whitespace-pre">
          {lineNumbers
            ? lines.map((line, index) => (
                <span key={index} className="grid grid-cols-[2.5ch_1fr] gap-3">
                  <span
                    aria-hidden
                    className="select-none text-right text-text-disabled"
                  >
                    {index + 1}
                  </span>
                  <span>{line}</span>
                </span>
              ))
            : code.replace(/\n$/, "")}
        </code>
      </pre>
    </div>
  )
}

export { CodeBlock }
