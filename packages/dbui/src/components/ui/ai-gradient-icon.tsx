"use client"

import * as React from "react"

import { cn } from "../../lib/utils"

/**
 * @standard AI Gradient Icon
 * @guideline Wrap a DBUI icon in it to mark something as Genie or AI. The gradient is the
 *   system's one AI signal, so it identifies — it never decorates
 * @guideline Size the icon as usual; this only changes how it is painted
 * @constraint One per surface at the largest size. A screen with the gradient on six things
 *   has told the reader nothing about any of them
 * @constraint Never put it on chrome — a composer, a toolbar, a panel edge. Those are the
 *   frame around the AI, not the AI
 * @constraint Not for status or state. The gradient says what this is, never how it is doing
 */

export interface AiGradientIconProps extends React.ComponentProps<"span"> {
  children: React.ReactNode
}

/**
 * The `<defs>` travel with the instance rather than living in a shared sprite at
 * the app root, because `fill: url(#id)` resolves against the document and a
 * shared id would make every gradient icon depend on one element being mounted
 * somewhere else. `useId` keeps the ids distinct, so two of these on a page do
 * not collide — the cost is one empty inline `<svg>` per icon, which paints
 * nothing and measures nothing.
 */
function AiGradientIcon({ className, children, style, ...props }: AiGradientIconProps) {
  // useId returns a string containing colons, which are not valid in a CSS
  // url(#…) reference.
  const id = `db-ai-icon-${React.useId().replace(/:/g, "")}`

  return (
    <span
      data-slot="ai-gradient-icon"
      className={cn("ai-gradient-icon", className)}
      style={{ ...style, "--db-ai-icon-fill": `url(#${id})` } as React.CSSProperties}
      {...props}
    >
      <svg
        data-ai-gradient-defs
        aria-hidden
        focusable="false"
        width="0"
        height="0"
        className="absolute"
      >
        <defs>
          {/* The same three stops and offsets as --ai-gradient, which is a
              linear-gradient and therefore unusable as an SVG paint server. */}
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="24%" stopColor="var(--ai-gradient-start)" />
            <stop offset="47%" stopColor="var(--ai-gradient-mid)" />
            <stop offset="76%" stopColor="var(--ai-gradient-end)" />
          </linearGradient>
        </defs>
      </svg>
      {children}
    </span>
  )
}

export { AiGradientIcon }
