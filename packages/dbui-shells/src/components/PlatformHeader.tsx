import React from "react"
import { Button } from "dbui/components/ui/button"
import { SidebarOpen } from "dbui/components/icons/SidebarOpen"
import { Search } from "dbui/components/icons/Search"
import { App } from "dbui/components/icons/App"
import { Star } from "dbui/components/icons/Star"

/**
 * PlatformHeader — the 48px top bar shared by every Databricks page.
 * Contains: sidebar toggle, cloud badge, Databricks logo, search, warehouse selector, actions, avatar.
 */
export function PlatformHeader({
  cloudLabel = "Microsoft Azure",
  warehouseLabel = "unity-catalog-us-east-1",
  avatarInitial = "M",
  onSidebarToggle,
}: {
  cloudLabel?: string
  warehouseLabel?: string
  avatarInitial?: string
  onSidebarToggle?: () => void
}) {
  return (
    <header className="flex h-12 shrink-0 items-center gap-4 px-3 bg-muted">
      {/* Left: sidebar toggle + cloud + logo */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon-md" aria-label="Toggle sidebar" onClick={onSidebarToggle}>
          <SidebarOpen />
        </Button>
        <span className="text-[13px] text-foreground">{cloudLabel}</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/databricks-logo.svg" alt="Databricks" height={32} className="ml-2" />
      </div>

      {/* Center: search */}
      <div className="flex-1 max-w-[560px] mx-auto">
        <div className="flex items-center gap-2 rounded border border-[#C0CDD8] bg-background px-3 py-1 text-[13px] text-muted-foreground">
          <Search className="size-4" />
          <span>Search data, notebooks, recents, and more...</span>
          <span className="ml-auto text-[12px] text-muted-foreground">⌘ + P</span>
        </div>
      </div>

      {/* Right: warehouse + actions + avatar */}
      <div className="flex items-center gap-1">
        <span className="text-[13px] text-foreground mr-1">{warehouseLabel}</span>
        <Button variant="ghost" size="icon-md" aria-label="Sparkle"><Star /></Button>
        <Button variant="ghost" size="icon-md" aria-label="Apps"><App /></Button>
        <div className="flex size-8 items-center justify-center rounded-full bg-primary text-[13px] font-semibold text-primary-foreground">
          {avatarInitial}
        </div>
      </div>
    </header>
  )
}
