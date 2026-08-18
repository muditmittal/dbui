"use client"

import * as React from "react"

import { cn } from "../../lib/utils"

/**
 * @standard Terminal
 * @guideline Use for command output a reader watches arrive — a build, a test run, a pipeline log
 * @guideline Set `isStreaming` while output is still coming. The caret shows, and the view follows the last line
 * @guideline Pass `command` to show what produced the output. A log with no command above it is evidence of nothing
 * @guideline Give it a fixed height and let it scroll. A terminal that grows the page pushes everything below it out of view on every line
 * @constraint Output is a string and stays preformatted. Never wrap it — a wrapped log line reads as two events
 * @constraint It follows the last line only while the reader is already at the bottom, the same rule the chat transcript uses. Scrolling up to read is never interrupted
 * @constraint ANSI colour codes are stripped rather than rendered. A log that paints its own colours is a log that ignores the theme, and eight ANSI colours cannot answer to a mode switch
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=5087-7848
 */

export interface TerminalProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  /** The output so far. Append to it while streaming. */
  output: string
  /** The command that produced it, shown above. */
  command?: string
  isStreaming?: boolean
  /** Replaces the empty message. */
  placeholder?: string
}

/**
 * Strips ANSI escape sequences.
 *
 * Logs arrive coloured, and those colours are a second theme fighting ours — eight
 * fixed values that cannot answer to a mode switch, on a surface where contrast is
 * the whole job. Stripping them is a deliberate loss: the text survives, the
 * palette does not.
 */
const ANSI = /\u001B\[[0-9;]*m/g
const stripAnsi = (s: string) => s.replace(ANSI, "")

function Terminal({
  output,
  command,
  isStreaming,
  placeholder = "No output yet.",
  className,
  ...props
}: TerminalProps) {
  const viewport = React.useRef<HTMLDivElement>(null)
  const atBottom = React.useRef(true)

  const clean = React.useMemo(() => stripAnsi(output), [output])

  // Follow the last line, but only for a reader who was already there — the same
  // rule the transcript uses, so scrolling up to read is never interrupted.
  React.useEffect(() => {
    const el = viewport.current
    if (!el || !atBottom.current) return
    el.scrollTop = el.scrollHeight
  }, [clean])

  return (
    <div
      data-slot="terminal"
      data-streaming={isStreaming || undefined}
      className={cn(
        "flex min-w-0 flex-col overflow-hidden shape-container border border-border-base bg-surface-inset",
        className
      )}
      {...props}
    >
      {command ? (
        <div className="flex items-center gap-2 border-b border-border-base px-3 py-2">
          <span aria-hidden className="type-code text-text-disabled">
            $
          </span>
          <span className="min-w-0 flex-1 truncate type-code text-text-subtle">
            {command}
          </span>
        </div>
      ) : null}

      <div
        ref={viewport}
        onScroll={(event) => {
          const el = event.currentTarget
          atBottom.current =
            el.scrollHeight - el.scrollTop - el.clientHeight < 24
        }}
        className="min-h-0 flex-1 overflow-auto p-3"
        role="log"
        aria-live={isStreaming ? "polite" : "off"}
      >
        {clean.trim() ? (
          <pre className="type-code whitespace-pre text-text-base">
            {clean}
            {isStreaming ? (
              <span aria-hidden className="animate-pulse text-text-base">
                ▌
              </span>
            ) : null}
          </pre>
        ) : (
          <p className="type-code text-text-subtle">{placeholder}</p>
        )}
      </div>
    </div>
  )
}

export { Terminal }
