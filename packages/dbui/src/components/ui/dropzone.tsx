"use client"

import * as React from "react"

import { cn } from "../../lib/utils"
import { Button } from "./button"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "./empty"
import { FileNew } from "../icons/FileNew"

/**
 * @standard Dropzone
 * @guideline Use for a file upload target a reader can drop onto or click into — ingestion, volume uploads, attaching evidence to a review
 * @guideline Say the real limits in `hint`. "Up to 20,000 files, 5GB each" is the sentence that stops a failed upload; "Upload files" is not
 * @guideline Keep the browse affordance in the prompt. A drop target with no click path is unusable by keyboard and unnoticed by most people
 * @constraint Built on `Empty` — it is an empty state that accepts a drop, so the media, title and description come from Empty's parts rather than new ones
 * @constraint Don't render it in a loading state. A dropzone that is busy should be replaced by progress, because a target that ignores a drop reads as broken
 * @constraint `onFiles` receives a `File[]` and never a `DragEvent`. The component owns the drag plumbing so every call site cannot get `preventDefault` wrong
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=3907-17740
 */

export interface DropzoneProps
  extends Omit<React.ComponentProps<"div">, "onDrop" | "children"> {
  /** The files that were dropped or chosen. */
  onFiles?: (files: File[]) => void
  /** Passed straight to the file input, e.g. ".csv,.parquet". */
  accept?: string
  multiple?: boolean
  /** The prompt. The browse affordance is appended to it. */
  label?: string
  /** The limits, under the prompt. Say the real numbers. */
  hint?: string
  /** Defaults to `FileNew`. */
  icon?: React.ReactNode
  disabled?: boolean
}

function Dropzone({
  onFiles,
  accept,
  multiple = true,
  label = "Drop one or more files here, or",
  hint,
  icon,
  disabled,
  className,
  ...props
}: DropzoneProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = React.useState(false)
  // A drag over a child fires dragleave on the parent, so counting entries is the
  // only way to know when the pointer has actually left the target.
  const depth = React.useRef(0)

  const emit = (list: FileList | null) => {
    if (!list?.length) return
    onFiles?.(Array.from(list))
  }

  const stop = (event: React.DragEvent) => {
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <div
      data-slot="dropzone"
      data-dragging={dragging || undefined}
      data-disabled={disabled || undefined}
      onDragEnter={(event) => {
        if (disabled) return
        stop(event)
        depth.current += 1
        setDragging(true)
      }}
      onDragOver={(event) => {
        if (disabled) return
        stop(event)
      }}
      onDragLeave={(event) => {
        if (disabled) return
        stop(event)
        depth.current -= 1
        if (depth.current <= 0) {
          depth.current = 0
          setDragging(false)
        }
      }}
      onDrop={(event) => {
        if (disabled) return
        stop(event)
        depth.current = 0
        setDragging(false)
        emit(event.dataTransfer?.files ?? null)
      }}
      className={cn("flex w-full min-w-0", className)}
      {...props}
    >
      <Empty
        className={cn(
          "border border-dashed border-action-primary-base",
          "data-[dragging]:bg-surface-subtle",
          disabled && "border-border-base opacity-60"
        )}
      >
        <EmptyHeader>
          <EmptyMedia variant="icon">{icon ?? <FileNew />}</EmptyMedia>
          <EmptyTitle>
            {label}{" "}
            <Button
              variant="link"
              size="sm"
              className="h-auto px-0 align-baseline"
              disabled={disabled}
              onClick={() => inputRef.current?.click()}
            >
              browse
            </Button>
          </EmptyTitle>
          {hint ? <EmptyDescription>{hint}</EmptyDescription> : null}
        </EmptyHeader>
      </Empty>
      {/* The input is the keyboard and assistive path, not a fallback. `sr-only`
          rather than `hidden` so it stays focusable and labelled. */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        aria-label={label}
        className="sr-only"
        onChange={(event) => {
          emit(event.target.files)
          // Clear it, or choosing the same file twice fires nothing the second time.
          event.target.value = ""
        }}
      />
    </div>
  )
}

export { Dropzone }
