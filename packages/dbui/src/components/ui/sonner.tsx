"use client"

import { useTheme } from "next-themes"
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
 */

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <CheckCircleFill className="size-4 text-success" />
        ),
        info: (
          <InfoFill className="size-4 text-foreground" />
        ),
        warning: (
          <WarningFill className="size-4 text-warning" />
        ),
        error: (
          <DangerFill className="size-4 text-destructive" />
        ),
        loading: (
          <Loading className="size-4 animate-spin text-foreground" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--background)",
          "--normal-text": "var(--foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius-sm)",
          "--success-bg": "var(--surface-success)",
          "--success-border": "var(--success)",
          "--success-text": "var(--success)",
          "--warning-bg": "var(--surface-warning)",
          "--warning-border": "var(--warning)",
          "--warning-text": "var(--warning)",
          "--error-bg": "var(--surface-danger)",
          "--error-border": "var(--destructive)",
          "--error-text": "var(--destructive)",
          "--info-bg": "var(--surface-info)",
          "--info-border": "var(--border)",
          "--info-text": "var(--foreground)",
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
