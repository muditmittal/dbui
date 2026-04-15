import React from "react"
import { PlatformHeader } from "../components/PlatformHeader"
import { WorkspaceNav } from "../components/WorkspaceNav"

/**
 * Shell — the Databricks product chrome.
 * Provides: platform header + sidebar nav + content surface.
 * Pass children for page content. Pass sidebar prop to customize nav.
 */
export function Shell({
  children,
  defaultActive = "catalog",
  sidebar,
  onNavigate,
}: {
  children: React.ReactNode
  defaultActive?: string
  sidebar?: React.ReactNode
  onNavigate?: (id: string) => void
}) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-muted" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" }}>
      <PlatformHeader />

      <div className="flex flex-1 min-h-0 px-2 pb-2 gap-2">
        {/* Sidebar — customizable or default WorkspaceNav */}
        {sidebar ?? <WorkspaceNav defaultActive={defaultActive} onNavigate={onNavigate} />}

        {/* Content surface */}
        <main className="flex-1 min-w-0 min-h-0 overflow-y-auto bg-background border border-border rounded-lg">
          {children}
        </main>
      </div>
    </div>
  )
}
