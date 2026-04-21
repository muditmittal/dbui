import React, { useState } from "react"
import { Button, ButtonChevron } from "dbui/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuItemIcon, DropdownMenuItemDescription, DropdownMenuSeparator, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "dbui/components/ui/dropdown-menu"
import { Input } from "dbui/components/ui/input"
import { Badge } from "dbui/components/ui/badge"
import { SidebarOpen } from "dbui/components/icons/SidebarOpen"
import { SidebarClosed } from "dbui/components/icons/SidebarClosed"
import { Search } from "dbui/components/icons/Search"
import { App } from "dbui/components/icons/App"
import { GenieCode } from "dbui/components/icons/GenieCode"
import { ChevronDown } from "dbui/components/icons/ChevronDown"
import { DatabricksLogo } from "dbui/components/icons/DatabricksLogo"
import { SearchPopup } from "./SearchPopup"

/* Product icons — 32×32 brand marks for the App Switcher menu */
function ProductLakehouse() {
  return (
    <svg className="!size-8" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.0001 4.4082L26.2848 13.1225V16H5.80823V13.1225L16.0001 4.4082Z" fill="#FABFBA"/>
      <path d="M21.1617 28.3986C19.3047 28.3985 17.563 27.9628 16.0446 27.2003L16.0455 27.2003C14.5269 26.436 12.7845 25.9991 10.9264 25.9991C9.1846 25.9991 7.54619 26.383 6.09534 27.0607L5.80725 27.2003L5.80725 23.5109L26.2848 23.5109L26.2848 27.2003L26.2789 27.2003C24.7586 27.9627 23.0188 28.3986 21.1617 28.3986Z" fill="#FF5F46"/>
      <path d="M21.1617 20.5725C19.3047 20.5725 17.563 20.1367 16.0446 19.3743L16.0455 19.3743C14.5269 18.6099 12.7845 18.1731 10.9264 18.1731C9.1846 18.1731 7.54619 18.557 6.09534 19.2346L5.80725 19.3743L5.80725 16.0002L26.2848 16.0002L26.2848 19.3743L26.2789 19.3743C24.7586 20.1367 23.0188 20.5725 21.1617 20.5725Z" fill="#FABFBA"/>
      <path d="M10.9303 20.5725C12.7874 20.5725 14.529 21.0083 16.0475 21.7708H16.0465C17.5652 22.5351 19.3076 22.9719 21.1656 22.9719C22.9074 22.9719 24.5459 22.5881 25.9967 21.9104L26.2848 21.7708V25.4592H5.80725L5.80725 21.7708H5.81311C7.33344 21.0083 9.07326 20.5725 10.9303 20.5725Z" fill="#FF5F46"/>
    </svg>
  )
}

function ProductDatabricksOne() {
  return (
    <svg className="!size-8" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.6328 11.2849L8.99121 12.7195V21.3591L11.6328 22.7947V26.6033L5.5 23.0769V11.0017L11.6328 7.47632V11.2849ZM26.5 11.0017V23.0769L20.3828 26.5945V22.7869L23.0088 21.3591V12.7195L20.3828 11.2927V7.48511L26.5 11.0017Z" fill="#FFDB96"/>
      <path d="M20.841 14.3676V19.7123L16.0407 22.3846L11.2405 19.7123V14.3676L16.0407 11.6953L20.841 14.3676ZM12.5979 15.1279V18.9519L16.0407 20.8686L19.4835 18.9519V15.1279L16.0407 13.2113L12.5979 15.1279Z" fill="#FFAB00"/>
      <path d="M12.5979 15.1279V18.9519L16.0407 20.8686L19.4835 18.9519V15.1279L16.0407 13.2113L12.5979 15.1279Z" fill="#FFAB00"/>
    </svg>
  )
}

function ProductLakebase() {
  return (
    <svg className="!size-8" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M26.2861 17.5002H5.80859V13.7649H26.2861V17.5002Z" fill="#9ED6C4"/>
      <path d="M26.2852 27.0977H5.80762V23.75H26.2852V27.0977Z" fill="#00A972"/>
      <path d="M10.9307 20.5725C12.7877 20.5725 14.5294 21.0083 16.0479 21.7708H16.0469C17.5656 22.5351 19.308 22.9719 21.166 22.9719C22.9078 22.9719 24.5462 22.5881 25.9971 21.9104L26.2852 21.7708V25.4592H5.80762L5.80762 21.7708H5.81348C7.3338 21.0083 9.07363 20.5725 10.9307 20.5725Z" fill="#00A972"/>
      <path d="M21.1621 20.5725C19.305 20.5725 17.5634 20.1367 16.0449 19.3743L16.0459 19.3743C14.5272 18.6099 12.7848 18.1731 10.9268 18.1731C9.18497 18.1731 7.54655 18.557 6.0957 19.2346L5.80762 19.3743L5.80762 15.6858L26.2852 15.6858L26.2852 19.3743L26.2793 19.3743C24.759 20.1367 23.0191 20.5725 21.1621 20.5725Z" fill="#9ED6C4"/>
      <rect x="5.80811" y="5.97913" width="20.4777" height="5.64812" fill="#9ED6C4"/>
    </svg>
  )
}

function ProductAccountConsole() {
  return (
    <svg className="!size-8" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.79981 16.7402C10.8082 16.5039 13.2736 16.5247 15.4434 17.3926C18.2733 18.5245 21.3083 18.5039 23.5498 18.2402C24.2539 18.1574 24.8931 18.0459 25.4414 17.9355C23.3385 26.5315 16 28 16 28C15.9905 27.9981 8.22844 26.4398 6.38867 17.1709C6.98192 17.0268 7.82005 16.8555 8.79981 16.7402Z" fill="#4299E0"/>
      <path d="M26 7C26 7 26 0 26 13C26 13.6049 25.9778 14.186 25.9365 14.7441C25.8435 14.7686 25.7411 14.7969 25.6289 14.8242C25.0347 14.9692 24.1898 15.1443 23.2002 15.2607C21.1919 15.497 18.7264 15.4753 16.5566 14.6074C13.7267 13.4755 10.6917 13.4971 8.4502 13.7607C7.50458 13.872 6.67509 14.0295 6.02735 14.1758C6.00878 13.7942 6 13.4024 6 13C6 10.6569 6 7 6 7L16 4L26 7Z" fill="#4299E0"/>
      <path d="M8.7998 16.7402C10.8082 16.5039 13.2736 16.5246 15.4434 17.3926C18.2733 18.5245 21.3083 18.5039 23.5498 18.2402C24.2539 18.1574 24.8931 18.0459 25.4414 17.9355C23.3385 26.5315 16 28 16 28C15.9905 27.9981 8.22844 26.4398 6.38867 17.1709C6.98192 17.0268 7.82005 16.8555 8.7998 16.7402Z" fill="#BAE1FC"/>
    </svg>
  )
}

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
    <header className="flex h-12 shrink-0 items-center px-3 bg-muted" style={{ gap: 40 }}>
      {/* Left — fixed, never shrinks */}
      <div className="flex items-center gap-1 shrink-0">
        <Button variant="ghost" size="icon-md" aria-label="Toggle sidebar" onClick={onSidebarToggle}>
          {sidebarCollapsed ? <SidebarClosed /> : <SidebarOpen />}
        </Button>
        <span className="text-[13px] text-foreground">{cloudLabel}</span>
        <DatabricksLogo className="ml-1 h-8 w-auto" />
      </div>

      {/* Search — clickable trigger styled as input, grows to fill, shrinks first, max 640px */}
      <div className="relative flex-1 h-8" style={{ flexShrink: 3, minWidth: 400, maxWidth: 640 }}>
        <button
          className={`w-full flex items-center gap-2 rounded-sm border border-input bg-background px-3 h-8 text-[13px] shadow-xs overflow-hidden cursor-pointer hover:border-primary active:border-primary-press transition-colors ${searchOpen ? 'invisible' : ''}`}
          onClick={() => setSearchOpen(true)}
        >
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <span className="flex-1 min-w-0 truncate text-left text-muted-foreground">Search data, notebooks, recents, and more...</span>
          <kbd className="shrink-0 text-[12px] text-muted-foreground">⌘ + P</kbd>
        </button>
        {searchOpen && <SearchPopup onClose={() => setSearchOpen(false)} />}
      </div>

      {/* Right — switcher shrinks FIRST (flex-shrink:3), actions never shrink */}
      {/* min-w: 56px switcher + 4px gap + 32+32+24 actions + 8px gaps = ~160px */}
      {/* Right — switcher shrinks SECOND (flex-shrink:1), actions never shrink */}
      <div className="flex items-center gap-1" style={{ flexShrink: 1, minWidth: 160 }}>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button className="flex items-center gap-1 min-w-[56px] min-h-8 rounded-sm px-2 text-[13px] text-foreground hover:bg-hover active:bg-press transition-colors overflow-hidden">
              <span className="min-w-0 truncate">{warehouseLabel}</span>
              <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" style={{ width: 340, borderRadius: 8 }}>
            {/* Search */}
            <div className="px-2 pb-2">
              <div className="flex items-center gap-2 rounded-sm border border-input bg-background px-3 h-8 text-[13px] shadow-xs focus-within:border-ring">
                <Search className="size-4 shrink-0 text-muted-foreground" />
                <input className="flex-1 bg-transparent text-[13px] text-foreground placeholder:text-muted-foreground outline-none" placeholder="Search workspaces" />
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
                    <span className="text-[13px] leading-[20px] text-foreground">{ws.name}</span>
                    <span className="text-[12px] leading-[16px] text-muted-foreground">{ws.region}</span>
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
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="ai-gradient" x1="0" y1="8" x2="16" y2="8" gradientUnits="userSpaceOnUse">
                  <stop offset="24%" stopColor="#4299E0" />
                  <stop offset="47%" stopColor="#CA42E0" />
                  <stop offset="76%" stopColor="#FF5F46" />
                </linearGradient>
              </defs>
              <path
                fill="url(#ai-gradient)"
                d="M0 8.75v-.744c0-.97.786-1.756 1.756-1.756h1.1c.372 0 .712.21.878.543l.595 1.188a4.104 4.104 0 0 0 7.342 0l.595-1.188.069-.12a.98.98 0 0 1 .809-.423H16v1.5h-2.536l-.451.902a5.604 5.604 0 0 1-10.026 0l-.45-.902h-.781a.256.256 0 0 0-.256.256v.744a.5.5 0 0 0 .5.5v1.5a2 2 0 0 1-2-2m10.5 4v1.5h-5v-1.5zM8 1.75a.75.75 0 0 1 .74.621l.226 1.303a.75.75 0 0 0 .61.61l1.303.227a.75.75 0 0 1 0 1.478l-1.303.227a.75.75 0 0 0-.61.61L8.739 8.13a.75.75 0 0 1-1.478 0l-.227-1.303a.75.75 0 0 0-.61-.61L5.12 5.989a.75.75 0 0 1 0-1.478l1.303-.227a.75.75 0 0 0 .61-.61l.227-1.303.035-.13A.75.75 0 0 1 8 1.75"
              />
            </svg>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" size="icon-md" aria-label="Apps">
                <App />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" style={{ width: 320, padding: 12, gap: 12, borderRadius: 4 }}>
              {[
                { icon: <ProductLakehouse />, title: "Lakehouse", desc: "Analytics & AI on large-scale data" },
                { icon: <ProductDatabricksOne />, title: "Databricks One", desc: "Business insights from data and AI" },
                { icon: <ProductLakebase />, title: "Lakebase", desc: "Operational databases for applications" },
                { icon: <ProductAccountConsole />, title: "Account Console", desc: "Governance, observability, and settings", badge: "BETA" },
              ].map((item) => (
                <DropdownMenuItem key={item.title} className="!p-0 rounded-none" style={{ gap: 8 }}>
                    <div className="shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex flex-col" style={{ gap: 2 }}>
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] leading-[20px] text-foreground">{item.title}</span>
                        {item.badge && (
                          <Badge variant="outline" className="text-[11px] leading-[20px] font-semibold bg-[rgba(59,0,255,0.05)] text-[#5746af] border-transparent px-2 py-0 rounded-full">{item.badge}</Badge>
                        )}
                      </div>
                      <span className="text-[12px] leading-[16px] text-muted-foreground">{item.desc}</span>
                    </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" size="icon-md" aria-label="Profile menu">
                <span className="flex size-6 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
                  {avatarInitial}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" style={{ width: 280 }}>
              {/* User info */}
              <div className="px-3 py-2">
                <p className="text-[13px] font-semibold text-foreground">Mudit Mittal</p>
                <p className="text-[12px] text-muted-foreground truncate">mudit.mittal@databricks.com</p>
              </div>

              <DropdownMenuSeparator />

              {/* Workspace info */}
              <div className="px-3 py-2">
                <p className="text-[13px] text-foreground">E2 Dogfood</p>
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
