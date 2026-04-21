import React, { useState } from "react"
import { PlatformHeader } from "./components/PlatformHeader"
import { WorkspaceNav } from "./components/WorkspaceNav"
import { AssistantPanel } from "./components/AssistantPanel"

/**
 * Base — the Databricks Base shell. EVERY product page starts here.
 *
 * Provides:
 *   - Platform header (48px, bg-muted, fixed)
 *   - Sidebar nav (180px, collapsible)
 *   - Content surface (white, rounded-lg, scrollable)
 *
 * Usage:
 *   <Base defaultActive="catalog">
 *     <CatalogLayout ... />
 *   </Base>
 *
 *   <Base defaultActive="editor" sidebarCollapsed>
 *     <NotebookEditor ... />
 *   </Base>
 */
export function Base({
  children,
  defaultActive = "catalog",
  sidebar,
  sidebarCollapsed: sidebarCollapsedProp,
  onNavigate,
  onSidebarToggle,
}: {
  children: React.ReactNode
  /** Which nav item is active */
  defaultActive?: string
  /** Custom sidebar content — replaces default WorkspaceNav */
  sidebar?: React.ReactNode
  /** Start with sidebar collapsed */
  sidebarCollapsed?: boolean
  /** Called when a nav item is clicked */
  onNavigate?: (id: string) => void
  /** Called when sidebar toggle is clicked — if not provided, Base manages its own state */
  onSidebarToggle?: () => void
}) {
  const [collapsed, setCollapsed] = useState(sidebarCollapsedProp ?? false)
  const [genieOpen, setGenieOpen] = useState(false)

  const handleSidebarToggle = () => {
    if (onSidebarToggle) {
      onSidebarToggle()
    } else {
      setCollapsed(!collapsed)
    }
  }

  const isCollapsed = sidebarCollapsedProp !== undefined ? sidebarCollapsedProp : collapsed

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-muted" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" }}>
      <PlatformHeader sidebarCollapsed={isCollapsed} onSidebarToggle={handleSidebarToggle} onGenieToggle={() => setGenieOpen(!genieOpen)} />

      <div className="flex flex-1 min-h-0 pb-2 pr-2">
        {/* Sidebar — collapsible */}
        {!isCollapsed && (
          sidebar ?? <WorkspaceNav defaultActive={defaultActive} onNavigate={onNavigate} />
        )}

        {/* Content surface — no gap when nav open, 8px when collapsed */}
        <main className={`flex-1 min-w-0 min-h-0 overflow-y-auto bg-background border border-border rounded-md ${isCollapsed ? 'ml-2' : ''}`}>
          {children}
        </main>

        {genieOpen && <AssistantPanel onClose={() => setGenieOpen(false)} />}
      </div>
    </div>
  )
}
