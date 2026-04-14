import type { Meta, StoryObj } from "@storybook/react"
import { PlatformHeader, PlatformHeaderLeft, PlatformHeaderCenter, PlatformHeaderRight, PlatformHeaderBadge } from "dbui/components/ui/platform-header"
import { Navbar, NavbarSection, NavbarSectionHeader, NavbarItem, NavbarItemIcon, NavbarNewButton } from "dbui/components/ui/navbar"
import { PageHeader, PageHeaderBack, PageHeaderTitle, PageHeaderActions } from "dbui/components/ui/page-header"
import { Button } from "dbui/components/ui/button"
import { Input } from "dbui/components/ui/input"
import { SidebarOpen } from "@/components/icons/SidebarOpen"
import { Home } from "@/components/icons/Home"
import { Notebook } from "@/components/icons/Notebook"
import { Gear } from "@/components/icons/Gear"
import { App } from "@/components/icons/App"
import { Plus } from "@/components/icons/Plus"
import { useState } from "react"

const meta: Meta = {
  title: "Compositions/Platform Shell",
  parameters: { layout: "fullscreen" },
}

export default meta

export const FullShell: StoryObj = {
  render: () => {
    const [expanded, setExpanded] = useState(true)
    return (
      <div className="flex h-screen flex-col overflow-hidden bg-muted">
        {/* Platform Header */}
        <PlatformHeader>
          <PlatformHeaderLeft>
            <Button variant="ghost" size="icon-md"><SidebarOpen /></Button>
            <PlatformHeaderBadge>Production</PlatformHeaderBadge>
          </PlatformHeaderLeft>
          <PlatformHeaderCenter>
            <Input placeholder="Search data, notebooks, recents, and more..." className="w-full" />
          </PlatformHeaderCenter>
          <PlatformHeaderRight>
            <Button variant="ghost" size="icon-md"><App /></Button>
            <div className="flex size-8 items-center justify-center rounded-full bg-primary text-[13px] font-semibold text-primary-foreground">M</div>
          </PlatformHeaderRight>
        </PlatformHeader>

        {/* Page area */}
        <div className="flex flex-1 min-h-0 pb-2 pr-2">
          {/* Navbar */}
          <Navbar className="overflow-y-auto">
            <NavbarNewButton><Plus /> New</NavbarNewButton>
            <NavbarSection>
              <NavbarSectionHeader expanded={expanded} onToggle={() => setExpanded(!expanded)}>
                Workspace
              </NavbarSectionHeader>
              {expanded && (
                <>
                  <NavbarItem active>
                    <NavbarItemIcon><Home /></NavbarItemIcon>
                    Home
                  </NavbarItem>
                  <NavbarItem>
                    <NavbarItemIcon><Notebook /></NavbarItemIcon>
                    Notebooks
                  </NavbarItem>
                  <NavbarItem>
                    <NavbarItemIcon><Gear /></NavbarItemIcon>
                    Settings
                  </NavbarItem>
                </>
              )}
            </NavbarSection>
          </Navbar>

          {/* Content surface */}
          <main className="flex-1 min-w-0 min-h-0 overflow-y-auto bg-background border border-border rounded-[8px] shadow-md">
            <PageHeader>
              <PageHeaderBack />
              <PageHeaderTitle>My Notebook</PageHeaderTitle>
              <PageHeaderActions>
                <Button>Run All</Button>
              </PageHeaderActions>
            </PageHeader>
            <div className="px-6 py-4 text-[13px] text-muted-foreground">
              Content scrolls within this white surface.
            </div>
          </main>
        </div>
      </div>
    )
  },
}
