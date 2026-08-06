/**
 * Code and terminal blocks for the docs pages.
 *
 * Deliberately NOT part of DocKit: these are async server components, and
 * DocKit is a client module because of the collapsible in `ContentSummary`.
 * Keeping them separate is what lets the highlighter stay on the server.
 *
 * Both blocks sit on `surface-subtle`, not `surface-inset`. `surface-inset` is an
 * 8% wash tuned for control-sized chrome — the reasoning is written down beside
 * `surface-hover` in theme.config.mjs: area changes how the same alpha reads, so
 * a large surface needs its own value rather than borrowing the control one. At
 * the size of a code block that wash lands within 1.05:1 of `border-base`, so the
 * fill swallows its own border and the block reads as a slab. `surface-subtle` is
 * a solid step that leaves the border legible and lets the code lead.
 */
import { highlight, type Language } from "./syntax"

/** The shared chrome: one frame, one background, one border, for both blocks. */
function Frame({ caption, children }: { caption?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      {caption ? <span className="type-hint text-text-subtle">{caption}</span> : null}
      <div className="overflow-x-auto rounded-2 border border-border-base bg-surface-subtle px-4 py-3">
        {children}
      </div>
    </div>
  )
}

const PRE = "m-0 w-max font-mono type-block"

/**
 * A block of literal output or code. `language` is opt-in: much of what these
 * pages show is CLI output rather than source, and running a grammar over a
 * record listing invents structure that isn't there. Left unset, the block
 * renders as plain text on the code foreground.
 */
export async function CodeBlock({
  children,
  caption,
  language,
}: {
  children: string
  caption?: string
  language?: Language
}) {
  if (!language) {
    return (
      <Frame caption={caption}>
        <pre className={`${PRE} text-text-base`}>{children}</pre>
      </Frame>
    )
  }
  const html = await highlight(children, language, PRE)
  return (
    <Frame caption={caption}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Frame>
  )
}

/**
 * Terminal block. Each entry is a command and an optional trailing note. The note
 * is appended as a shell comment rather than styled by hand, so the grammar dims
 * it for the same reason it dims every other comment — one rule, not two.
 */
export async function Cmd({ lines }: { lines: Array<[string, string?]> }) {
  const source = lines.map(([cmd, note]) => (note ? `${cmd}  # ${note}` : cmd)).join("\n")
  const html = await highlight(source, "bash", PRE)
  return (
    <Frame>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Frame>
  )
}
