"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CheckCircleFill } from "../icons/CheckCircleFill"
import { InfoFill } from "../icons/InfoFill"
import { WarningFill } from "../icons/WarningFill"
import { DangerFill } from "../icons/DangerFill"
import { Loading } from "../icons/Loading"

/**
 * @standard Toast
 * @guideline Use for transient feedback after an action (save, delete, copy)
 * @guideline Auto-dismisses after a few seconds
 * @constraint Don't use for critical errors that need user action — use Alert
 * @constraint Max 3 toasts stacked at once
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=968-944
 *
 * Theme defaults to "system". If you want app-driven theming, pass a `theme` prop
 * explicitly (e.g. wired up to your own theme provider). Removed the `next-themes`
 * dependency to keep DBUI install zero-npm.
 */

const Toaster = ({ theme = "system", ...props }: ToasterProps) => {
  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <CheckCircleFill className="size-4 text-status-text-positive" />
        ),
        info: (
          <InfoFill className="size-4 text-text-base" />
        ),
        warning: (
          <WarningFill className="size-4 text-status-text-warning" />
        ),
        error: (
          <DangerFill className="size-4 text-status-text-negative" />
        ),
        loading: (
          <Loading className="size-4 animate-loop text-text-base" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--db-surface-base)",
          "--normal-text": "var(--db-text-base)",
          "--normal-border": "var(--db-border-base)",
          "--border-radius": "var(--db-radius-1)",
          "--success-bg": "var(--db-status-surface-positive)",
          "--success-border": "var(--db-action-positive-base)",
          "--success-text": "var(--db-action-positive-base)",
          "--warning-bg": "var(--db-status-surface-warning)",
          "--warning-border": "var(--db-status-text-warning)",
          "--warning-text": "var(--db-status-text-warning)",
          "--error-bg": "var(--db-status-surface-negative)",
          "--error-border": "var(--db-action-negative-base)",
          "--error-text": "var(--db-action-negative-base)",
          "--info-bg": "var(--db-status-surface-info)",
          "--info-border": "var(--db-border-base)",
          "--info-text": "var(--db-text-base)",
          "font-size": "13px",
          "line-height": "20px",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
