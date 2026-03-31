"use client"

import { useEffect, useState } from "react"

/**
 * Renders preview content only on the client. Avoids SSR errors for components
 * that use browser APIs or context (e.g. Base UI Menu used by DropdownMenu).
 */
export function ComponentPreview({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div
        className={className}
        aria-hidden
        suppressHydrationWarning
      >
        <span className="text-sm text-muted-foreground">Loading preview…</span>
      </div>
    )
  }

  return (
    <div suppressHydrationWarning className="contents">
      {children}
    </div>
  )
}
