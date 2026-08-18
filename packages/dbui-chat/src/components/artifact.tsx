"use client"

import * as React from "react"

import { Button } from "dbui/components/ui/button"
import { NewWindow } from "dbui/components/icons/NewWindow"

import { cn } from "../lib/utils"

/**
 * @standard Artifact
 * @guideline Use to wrap something the agent produced that a reader can open — a notebook, a query, a dashboard, a file it wrote
 * @guideline Title it with the thing, not the act: "revenue_by_region.sql", not "Generated a query"
 * @guideline Pass `onOpen` so it opens in the workbench as a tab. A produced thing a reader cannot open is a screenshot
 * @guideline Put a preview in children — the first lines of the file, a chart, a row count. Enough to decide whether to open it
 * @constraint It is a handle, not the thing. Cap the preview and let the workbench show the whole of it — a full notebook inside a transcript makes the transcript unusable
 * @constraint Not a `Details`. Details answers "what is this asset" about something that already existed; an Artifact is something the agent just made
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=5080-7902
 */

export interface ArtifactProps
  extends Omit<React.ComponentProps<"div">, "title"> {
  /** The thing, named as itself. */
  title: React.ReactNode
  /** What kind it is — "SQL", "Notebook", "Dashboard". */
  kind?: React.ReactNode
  /** Entity icon for the kind. */
  icon?: React.ReactNode
  /** Opens it in the workbench. */
  onOpen?: () => void
  openLabel?: string
  /** Trailing controls, beside the open button. */
  actions?: React.ReactNode
}

function Artifact({
  title,
  kind,
  icon,
  onOpen,
  openLabel = "Open",
  actions,
  className,
  children,
  ...props
}: ArtifactProps) {
  return (
    <div
      data-slot="artifact"
      className={cn(
        "flex w-full min-w-0 flex-col overflow-hidden shape-container border border-border-base bg-surface-base",
        className
      )}
      {...props}
    >
      <div className="flex min-w-0 items-center gap-2 border-b border-border-base px-3 py-2">
        {icon ? (
          <span aria-hidden className="shrink-0 text-text-subtle [&_svg]:size-4">
            {icon}
          </span>
        ) : null}
        <span className="min-w-0 flex-1 truncate type-body-bold text-text-base">
          {title}
        </span>
        {kind ? (
          <span className="shrink-0 type-hint text-text-subtle">{kind}</span>
        ) : null}
        {actions}
        {onOpen ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="shrink-0"
            onClick={onOpen}
          >
            {openLabel}
            <NewWindow />
          </Button>
        ) : null}
      </div>

      {/* Capped, because the transcript is not the place to read the whole of it.
          The cap is here rather than at the call site so every artifact in a
          thread ends at the same height. */}
      {children ? (
        <div className="max-h-64 min-w-0 overflow-auto p-1">{children}</div>
      ) : null}
    </div>
  )
}

export { Artifact }
