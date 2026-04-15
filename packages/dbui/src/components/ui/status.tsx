import * as React from "react"

import { cn } from "../../lib/utils"
import { Circle } from "../icons/Circle"
import { CircleOutline } from "../icons/CircleOutline"
import { CircleOutlineLarge } from "../icons/CircleOutlineLarge"
import { CircleOff } from "../icons/CircleOff"
import { CircleOffLarge } from "../icons/CircleOffLarge"
import { DotsCircle } from "../icons/DotsCircle"
import { Running } from "../icons/Running"
import { Sync } from "../icons/Sync"
import { SyncSmall } from "../icons/SyncSmall"
import { XCircle } from "../icons/XCircle"
import { CloseSmall } from "../icons/CloseSmall"
import { StopCircle } from "../icons/StopCircle"
import { Stop } from "../icons/Stop"
import { Info } from "../icons/Info"
import { InfoSmall } from "../icons/InfoSmall"
import { CheckCircle } from "../icons/CheckCircle"
import { CheckCircleSmall } from "../icons/CheckCircleSmall"
import { Warning } from "../icons/Warning"
import { Triangle } from "../icons/Triangle"
import { Danger } from "../icons/Danger"
import { DangerSmall } from "../icons/DangerSmall"

type StatusType =
  | "online"
  | "ready"
  | "offline"
  | "pending"
  | "running"
  | "syncing"
  | "canceled"
  | "stopped"
  | "info"
  | "success"
  | "warning"
  | "error"

const statusIconMap: Record<StatusType, Record<"sm" | "md", React.ComponentType<{ className?: string }>>> = {
  online: { sm: Circle, md: Circle },
  ready: { sm: CircleOutline, md: CircleOutlineLarge },
  offline: { sm: CircleOff, md: CircleOffLarge },
  pending: { sm: DotsCircle, md: DotsCircle },
  running: { sm: Running, md: Running },
  syncing: { sm: SyncSmall, md: Sync },
  canceled: { sm: CloseSmall, md: XCircle },
  stopped: { sm: Stop, md: StopCircle },
  info: { sm: InfoSmall, md: Info },
  success: { sm: CheckCircleSmall, md: CheckCircle },
  warning: { sm: Triangle, md: Warning },
  error: { sm: DangerSmall, md: Danger },
}

const statusColorMap: Record<StatusType, string> = {
  online: "text-success",
  ready: "text-success",
  offline: "text-destructive",
  pending: "text-input",
  running: "text-primary",
  syncing: "text-muted-foreground",
  canceled: "text-muted-foreground",
  stopped: "text-muted-foreground",
  info: "text-muted-foreground",
  success: "text-success",
  warning: "text-warning",
  error: "text-destructive",
}

function Status({
  className,
  status = "offline",
  size = "md",
  ...props
}: React.ComponentProps<"span"> & {
  status?: StatusType
  size?: "sm" | "md"
}) {
  const Icon = statusIconMap[status]?.[size] ?? CircleOutline

  return (
    <span
      data-slot="status"
      role="status"
      aria-label={status}
      className={cn(
        "inline-flex size-4 shrink-0 items-center justify-center",
        statusColorMap[status],
        className
      )}
      {...props}
    >
      <Icon className="size-4" />
    </span>
  )
}

export { Status }
export type { StatusType }
