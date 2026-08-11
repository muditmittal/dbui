"use client"

import * as React from "react"
import { Status } from "dbui/components/ui/status"

import { Disclosure } from "./disclosure"
import { cn } from "../lib/utils"

/**
 * @standard Task
 * @guideline Use for one thing the agent did on its own — read a file, ran a query, searched the catalog
 * @guideline Title it in past tense with the object: "Read customers.sql", not "Reading file"
 * @guideline Set status="running" while it is in flight; the indicator spins and the label pulses
 * @guideline Put what it touched inside as TaskItem rows, so a reader can audit the step
 * @constraint Collapsed by default — a task is evidence, not the answer
 * @constraint One Task per tool call. A run of six reads is six Tasks, not one with six titles
 * @constraint Never use it for something the user did — that is a Message
 */

export type TaskStatus = "running" | "complete" | "error"

export interface TaskProps extends Omit<React.ComponentProps<"div">, "title"> {
  /** Past-tense summary of the step. */
  title: React.ReactNode
  status?: TaskStatus
  defaultOpen?: boolean
  /** Controlled open state. */
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

/**
 * The status indicator is the system's own `Status`, not a local icon set. It
 * already pairs each state with the right glyph and colour, and `running` spins.
 * A second vocabulary here would be a third opinion about what "error" looks like.
 */
const STATUS_MAP: Record<TaskStatus, "running" | "success" | "error"> = {
  running: "running",
  complete: "success",
  error: "error",
}

function Task({
  title,
  status = "complete",
  defaultOpen = false,
  open,
  onOpenChange,
  className,
  children,
  ...props
}: TaskProps) {
  return (
    <Disclosure
      slot="task"
      data-status={status}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      className={className}
      trigger={
        <>
          <Status status={STATUS_MAP[status]} />
          <span
            className={cn(
              "min-w-0 flex-1 truncate",
              status === "running" && "animate-pulse"
            )}
          >
            {title}
          </span>
        </>
      }
      triggerClassName="type-label text-text-subtle hover:text-text-base"
      // Same rail as Reasoning. Both are the agent showing its work, and a reader
      // scanning a thread should not have to learn two indents.
      rail
      contentClassName="flex flex-col gap-1"
      {...props}
    >
      {children}
    </Disclosure>
  )
}

export interface TaskItemProps extends React.ComponentProps<"div"> {
  /**
   * Leading glyph — an entity icon for a file, a Terminal for a command.
   * Optional, and the column is held either way: a row with no icon keeps its
   * label in the same place as the rows around it rather than sliding left.
   */
  icon?: React.ReactNode
}

function TaskItem({ icon, className, children, ...props }: TaskItemProps) {
  return (
    <div
      data-slot="task-item"
      className={cn(
        "flex min-w-0 items-center gap-2 type-label text-text-subtle",
        className
      )}
      {...props}
    >
      <span
        aria-hidden
        className="inline-flex size-4 shrink-0 items-center justify-center [&_svg]:size-4 [&_svg]:shrink-0"
      >
        {icon}
      </span>
      <span className="min-w-0 truncate">{children}</span>
    </div>
  )
}

export { Task, TaskItem }
