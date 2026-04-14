"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon className="size-4" />
        ),
        info: (
          <InfoIcon className="size-4" />
        ),
        warning: (
          <TriangleAlertIcon className="size-4" />
        ),
        error: (
          <OctagonXIcon className="size-4" />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin" />
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
