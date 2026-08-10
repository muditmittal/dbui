import { useState } from "react"
import { Button } from "dbui/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "dbui/components/ui/dropdown-menu"
import { Input } from "dbui/components/ui/input"
import { Badge } from "dbui/components/ui/badge"
import { SidebarOpen } from "dbui/components/icons/SidebarOpen"
import { SidebarClosed } from "dbui/components/icons/SidebarClosed"
import { Search } from "dbui/components/icons/Search"
import { App } from "dbui/components/icons/App"
import { ChevronDown } from "dbui/components/icons/ChevronDown"
import { DatabricksLogo } from "dbui/components/icons/DatabricksLogo"
import { SearchPopup } from "./SearchPopup"

/**
 * PlatformHeader — the 48px top bar shared by every Databricks page.
 *
 * Layout: [Left fixed] — 16px — [Search flexible] — 16px — [Switcher shrinkable | Buttons fixed]
 *
 * Shrink order:
 *   1. Search placeholder truncates
 *   2. Workspace switcher name truncates (down to min 56px)
 *   3. Search bar shrinks (down to min 80px)
 *   4. Left side and action buttons NEVER shrink
 *
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=3225-4233
 */
export function PlatformHeader({
  cloudLabel = "Microsoft Azure",
  warehouseLabel = "unity-catalog-us-east-1",
  avatarInitial = "M",
  sidebarCollapsed = false,
  onSidebarToggle,
  onGenieToggle,
}: {
  cloudLabel?: string
  warehouseLabel?: string
  avatarInitial?: string
  sidebarCollapsed?: boolean
  onSidebarToggle?: () => void
  onGenieToggle?: () => void
}) {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="flex h-12 shrink-0 items-center px-3 bg-surface-subtle">
      {/* Left — fixed, never shrinks */}
      <div className="flex items-center gap-1 shrink-0">
        <Button variant="ghost" size="icon-md" aria-label="Toggle sidebar" onClick={onSidebarToggle}>
          {sidebarCollapsed ? <SidebarClosed /> : <SidebarOpen />}
        </Button>
        <span className="type-label text-text-base">{cloudLabel}</span>
        <DatabricksLogo className="ml-1 h-8 w-auto" />
      </div>

      {/* Center wrapper — fills available space, search centered inside with 40px margins */}
      <div className="flex-1 flex items-center justify-center min-w-0 px-10">
      <div className="relative w-full h-8" style={{ maxWidth: 640 }}>
        <Button
          variant="outline"
          className={`w-full justify-start gap-2 px-3 shadow-xs overflow-hidden hover:border-input-border-hover active:border-focus-ring ${searchOpen ? "opacity-0 pointer-events-none" : ""}`}
          onClick={() => setSearchOpen(true)}
        >
          <Search className="size-4 shrink-0 text-text-subtle" />
          <span className="flex-1 min-w-0 truncate text-left text-text-subtle">Search data, notebooks, recents, and more...</span>
          <kbd className="shrink-0 type-hint text-text-subtle">⌘ + P</kbd>
        </Button>
        {searchOpen && <SearchPopup onClose={() => setSearchOpen(false)} />}
      </div>
      </div>

      {/* Right — switcher shrinks FIRST (flex-shrink:3), actions never shrink */}
      {/* min-w: 56px switcher + 4px gap + 32+32+24 actions + 8px gaps = ~160px */}
      {/* Right — switcher shrinks SECOND (flex-shrink:1), actions never shrink */}
      <div className="flex items-center gap-1 shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <Button
              variant="ghost"
              size="sm"
              className="min-w-[56px] min-h-8 gap-1 px-2 overflow-hidden"
              aria-label="Switch workspace"
            >
              <span className="min-w-0 truncate font-normal">{warehouseLabel}</span>
              <ChevronDown className="size-4 shrink-0 text-text-subtle" />
            </Button>
          } />
          <DropdownMenuContent align="end" style={{ width: 340, borderRadius: 8 }}>
            {/* Search */}
            <div className="px-2 pb-2">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-subtle" />
                <Input placeholder="Search workspaces" className="h-8 pl-8" />
              </div>
            </div>

            {/* Workspaces — radio group with native checkmark indicator */}
            <DropdownMenuRadioGroup value={warehouseLabel}>
              {[
                { name: warehouseLabel, region: "us-west-2" },
                { name: "7a99b43c-test-workspace-nvirginia-staging", region: "us-east-1" },
                { name: "ar-mlserv-cmk-bugbash-us-east-1", region: "us-east-1" },
                { name: "brickfood-hms-fed", region: "us-east-1" },
              ].map((ws) => (
                <DropdownMenuRadioItem key={ws.name} value={ws.name}>
                  <div className="flex flex-col" style={{ gap: 2 }}>
                    <span className="type-label text-text-base">{ws.name}</span>
                    <span className="type-hint text-text-subtle">{ws.region}</span>
                  </div>
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem inset>Manage account</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-1 shrink-0">
          <Button variant="ghost" size="icon-md" aria-label="Genie" onClick={onGenieToggle}>
            <span
              className="flex size-4 items-center justify-center rounded-1"
              style={{ backgroundImage: "var(--ai-gradient)" }}
              aria-hidden
            />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger render={
              <Button variant="ghost" size="icon-md" aria-label="Apps">
                <App />
              </Button>
            } />
            <DropdownMenuContent align="end" style={{ width: 320, padding: 12, gap: 12, borderRadius: 4 }}>
              {[
                { icon: <DatabricksLogo className="h-8 w-auto" />, title: "Lakehouse", desc: "Analytics & AI on large-scale data" },
                { icon: <DatabricksLogo className="h-8 w-auto" />, title: "Databricks One", desc: "Business insights from data and AI" },
                { icon: <DatabricksLogo className="h-8 w-auto" />, title: "Lakebase", desc: "Operational databases for applications" },
                { icon: <DatabricksLogo className="h-8 w-auto" />, title: "Account Console", desc: "Governance, observability, and settings", badge: "BETA" },
              ].map((item) => (
                <DropdownMenuItem key={item.title} className="!p-0 shape-square" style={{ gap: 8 }}>
                    <div className="shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex flex-col" style={{ gap: 2 }}>
                      <div className="flex items-center gap-2">
                        <span className="type-label text-text-base">{item.title}</span>
                        {item.badge && (
                          <Badge
                            variant="outline"
                            className="type-label-bold bg-status-surface-info text-link-base border-transparent px-2 py-0 shape-pill"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      <span className="type-hint text-text-subtle">{item.desc}</span>
                    </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger render={
              <Button variant="ghost" size="icon-md" aria-label="Profile menu">
                <span className="flex size-6 items-center justify-center shape-pill bg-action-primary-base type-label-bold text-action-label-inverse-base">
                  {avatarInitial}
                </span>
              </Button>
            } />
            <DropdownMenuContent align="end" style={{ width: 280 }}>
              {/* User info */}
              <div className="px-3 py-2">
                <p className="type-label-bold text-text-base">Mudit Mittal</p>
                <p className="type-hint text-text-subtle truncate">mudit.mittal@databricks.com</p>
              </div>

              <DropdownMenuSeparator />

              {/* Workspace info */}
              <div className="px-3 py-2">
                <p className="type-label text-text-base">E2 Dogfood</p>
              </div>

              <DropdownMenuSeparator />

              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Privacy policy</DropdownMenuItem>
              <DropdownMenuItem>Contact Support</DropdownMenuItem>
              <DropdownMenuItem>Send feedback</DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
