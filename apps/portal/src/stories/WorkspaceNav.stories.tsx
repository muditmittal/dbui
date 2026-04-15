import type { Meta, StoryObj } from "@storybook/react"
import { Navbar, NavbarSection, NavbarSectionHeader, NavbarItem, NavbarItemIcon } from "dbui/components/ui/navbar"
import { Button, ButtonIcon } from "dbui/components/ui/button"
import { Plus } from "@/components/icons/Plus"
import { Clock } from "@/components/icons/Clock"
import { FolderOpen } from "@/components/icons/FolderOpen"
import { Catalog } from "@/components/icons/Catalog"
import { Workflows } from "@/components/icons/Workflows"
import { Cloud } from "@/components/icons/Cloud"
import { Storefront } from "@/components/icons/Storefront"
import { QueryEditor } from "@/components/icons/QueryEditor"
import { Query } from "@/components/icons/Query"
import { Dashboard } from "@/components/icons/Dashboard"
import { GenieCode } from "@/components/icons/GenieCode"
import { Notification } from "@/components/icons/Notification"
import { History } from "@/components/icons/History"
import { Workspaces } from "@/components/icons/Workspaces"
import { Checklist } from "@/components/icons/Checklist"
import { Ingestion } from "@/components/icons/Ingestion"
import { Pipeline } from "@/components/icons/Pipeline"
import { GenieDeepResearch } from "@/components/icons/GenieDeepResearch"
import { Beaker } from "@/components/icons/Beaker"
import { Layer } from "@/components/icons/Layer"
import { Models } from "@/components/icons/Models"
import { MCP } from "@/components/icons/MCP"

const meta: Meta = {
  title: "Compositions/Workspace Nav",
  parameters: { layout: "padded" },
}

export default meta

export const Playground: StoryObj = {
  render: () => (
    <div>
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Workspace Nav</h2>

      <div className="w-[180px] bg-background">
        {/* New button */}
        <div className="px-2 py-2">
          <Button variant="outline" className="w-full justify-start gap-2 text-primary">
            <ButtonIcon><Plus /></ButtonIcon>
            New
          </Button>
        </div>

        {/* Main nav — no section header */}
        <Navbar>
          <NavbarItem><NavbarItemIcon><Clock /></NavbarItemIcon>Recents</NavbarItem>
          <NavbarItem><NavbarItemIcon><FolderOpen /></NavbarItemIcon>Workspace</NavbarItem>
          <NavbarItem active><NavbarItemIcon><Catalog /></NavbarItemIcon>Catalog</NavbarItem>
          <NavbarItem><NavbarItemIcon><Workflows /></NavbarItemIcon>Workflows</NavbarItem>
          <NavbarItem><NavbarItemIcon><Cloud /></NavbarItemIcon>Compute</NavbarItem>
          <NavbarItem><NavbarItemIcon><Storefront /></NavbarItemIcon>Marketplace</NavbarItem>

          {/* SQL */}
          <NavbarSection>
            <NavbarSectionHeader>SQL</NavbarSectionHeader>
            <NavbarItem><NavbarItemIcon><QueryEditor /></NavbarItemIcon>Editor</NavbarItem>
            <NavbarItem><NavbarItemIcon><Query /></NavbarItemIcon>Queries</NavbarItem>
            <NavbarItem><NavbarItemIcon><Dashboard /></NavbarItemIcon>Dashboards</NavbarItem>
            <NavbarItem><NavbarItemIcon><GenieCode /></NavbarItemIcon>Genie</NavbarItem>
            <NavbarItem><NavbarItemIcon><Notification /></NavbarItemIcon>Alerts</NavbarItem>
            <NavbarItem><NavbarItemIcon><History /></NavbarItemIcon>Query History</NavbarItem>
            <NavbarItem><NavbarItemIcon><Workspaces /></NavbarItemIcon>SQL Warehouses</NavbarItem>
          </NavbarSection>

          {/* Data Engineering */}
          <NavbarSection>
            <NavbarSectionHeader>Data Engineering</NavbarSectionHeader>
            <NavbarItem><NavbarItemIcon><Checklist /></NavbarItemIcon>Job runs</NavbarItem>
            <NavbarItem><NavbarItemIcon><Ingestion /></NavbarItemIcon>Ingestion</NavbarItem>
            <NavbarItem><NavbarItemIcon><Pipeline /></NavbarItemIcon>Pipelines</NavbarItem>
          </NavbarSection>

          {/* Machine Learning */}
          <NavbarSection>
            <NavbarSectionHeader>Machine Learning</NavbarSectionHeader>
            <NavbarItem><NavbarItemIcon><GenieDeepResearch /></NavbarItemIcon>Playground</NavbarItem>
            <NavbarItem><NavbarItemIcon><Beaker /></NavbarItemIcon>Experiments</NavbarItem>
            <NavbarItem><NavbarItemIcon><Layer /></NavbarItemIcon>Features</NavbarItem>
            <NavbarItem><NavbarItemIcon><Models /></NavbarItemIcon>Models</NavbarItem>
            <NavbarItem><NavbarItemIcon><MCP /></NavbarItemIcon>Serving</NavbarItem>
          </NavbarSection>
        </Navbar>
      </div>
    </div>
  ),
}
