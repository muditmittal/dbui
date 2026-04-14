"use client"

import * as React from "react"

import { cn } from "../../lib/utils"

function EditorTabs({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="editor-tabs"
      role="tablist"
      className={cn(
        "flex items-center bg-muted border-b border-border",
        className
      )}
      {...props}
    />
  )
}

function EditorTab({
  className,
  active = false,
  closable = true,
  children,
  onClose,
  ...props
}: React.ComponentProps<"button"> & {
  active?: boolean
  closable?: boolean
  onClose?: () => void
}) {
  return (
    <button
      data-slot="editor-tab"
      role="tab"
      aria-selected={active}
      data-active={active || undefined}
      className={cn(
        "group/editor-tab relative flex h-8 shrink-0 items-center gap-2 border-l border-r border-border px-2 py-1 text-[13px] leading-[20px] font-normal select-none",
        active
          ? "bg-background text-foreground"
          : "bg-transparent text-muted-foreground",
        "[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      {closable && (
        <span
          data-slot="editor-tab-close"
          role="button"
          aria-label="Close tab"
          onClick={(e) => {
            e.stopPropagation()
            onClose?.()
          }}
          className={cn(
            "inline-flex size-4 shrink-0 items-center justify-center",
            active ? "opacity-100" : "opacity-0 group-hover/editor-tab:opacity-100"
          )}
        >
          ×
        </span>
      )}
    </button>
  )
}

function EditorTabAddButton({ className, ...props }: React.ComponentProps<"button">) {
  return (
    <button
      data-slot="editor-tab-add"
      aria-label="Add tab"
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-sm p-2 text-muted-foreground hover:text-foreground",
        "[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      +
    </button>
  )
}

export { EditorTabs, EditorTab, EditorTabAddButton }
