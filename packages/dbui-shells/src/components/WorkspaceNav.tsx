import React, { useState } from "react"
import { Navbar, NavbarSection, NavbarSectionHeader, NavbarItem, NavbarItemIcon } from "dbui/components/ui/navbar"
import { Plus } from "dbui/components/icons/Plus"
import { Clock } from "dbui/components/icons/Clock"
import { Folder } from "dbui/components/icons/Folder"
import { Data } from "dbui/components/icons/Data"
import { Workflows } from "dbui/components/icons/Workflows"
import { Cloud } from "dbui/components/icons/Cloud"
import { Storefront } from "dbui/components/icons/Storefront"
import { QueryEditor } from "dbui/components/icons/QueryEditor"
import { Query } from "dbui/components/icons/Query"
import { Dashboard } from "dbui/components/icons/Dashboard"
import { SparkleRectangle } from "dbui/components/icons/SparkleRectangle"
import { Notification } from "dbui/components/icons/Notification"
import { History } from "dbui/components/icons/History"
import { CloudDatabase } from "dbui/components/icons/CloudDatabase"
import { Checklist } from "dbui/components/icons/Checklist"
import { Ingestion } from "dbui/components/icons/Ingestion"
import { Pipeline } from "dbui/components/icons/Pipeline"
import { Robot } from "dbui/components/icons/Robot"
import { Beaker } from "dbui/components/icons/Beaker"
import { Layer } from "dbui/components/icons/Layer"
import { Models } from "dbui/components/icons/Models"
import { CloudModel } from "dbui/components/icons/CloudModel"

type NavDef = { id: string; label: string; icon: React.ComponentType<any> }

const navItems: NavDef[] = [
  { id: "recents", label: "Recents", icon: Clock },
  { id: "workspace", label: "Workspace", icon: Folder },
  { id: "catalog", label: "Catalog", icon: Data },
  { id: "workflows", label: "Workflows", icon: Workflows },
  { id: "compute", label: "Compute", icon: Cloud },
  { id: "marketplace", label: "Marketplace", icon: Storefront },
]

const sqlItems: NavDef[] = [
  { id: "editor", label: "Editor", icon: QueryEditor },
  { id: "queries", label: "Queries", icon: Query },
  { id: "dashboards", label: "Dashboards", icon: Dashboard },
  { id: "genie", label: "Genie", icon: SparkleRectangle },
  { id: "alerts", label: "Alerts", icon: Notification },
  { id: "query-history", label: "Query History", icon: History },
  { id: "sql-warehouses", label: "SQL Warehouses", icon: CloudDatabase },
]

const deItems: NavDef[] = [
  { id: "job-runs", label: "Job runs", icon: Checklist },
  { id: "ingestion", label: "Ingestion", icon: Ingestion },
  { id: "pipelines", label: "Pipelines", icon: Pipeline },
]

const mlItems: NavDef[] = [
  { id: "playground", label: "Playground", icon: Robot },
  { id: "experiments", label: "Experiments", icon: Beaker },
  { id: "features", label: "Features", icon: Layer },
  { id: "models", label: "Models", icon: Models },
  { id: "serving", label: "Serving", icon: CloudModel },
]

/**
 * WorkspaceNav — the default Databricks sidebar with all product nav items.
 * Customizable: pass `defaultActive` to highlight a different nav item.
 * Pass `onNavigate` to handle route changes.
 */
export function WorkspaceNav({
  defaultActive = "catalog",
  onNavigate,
}: {
  defaultActive?: string
  onNavigate?: (id: string) => void
}) {
  const [active, setActive] = useState(defaultActive)

  const handleClick = (id: string) => {
    setActive(id)
    onNavigate?.(id)
  }

  const renderItem = (item: NavDef) => {
    const Icon = item.icon
    return (
      <NavbarItem key={item.id} active={active === item.id} onClick={() => handleClick(item.id)}>
        <NavbarItemIcon><Icon /></NavbarItemIcon>
        {item.label}
      </NavbarItem>
    )
  }

  return (
    <nav className="w-[180px] shrink-0 overflow-y-auto">
      {/* New button */}
      <button className="flex h-10 w-full items-center gap-2 rounded-lg border border-[#FDE2E8] bg-[#F5ECEE] pl-3 pr-4 text-[13px] font-medium text-[#11171C]">
        <Plus className="size-4 text-[#E65B77]" />
        New
      </button>

      <Navbar className="mt-2">
        {navItems.map(renderItem)}

        <NavbarSection>
          <NavbarSectionHeader>SQL</NavbarSectionHeader>
          {sqlItems.map(renderItem)}
        </NavbarSection>

        <NavbarSection>
          <NavbarSectionHeader>Data Engineering</NavbarSectionHeader>
          {deItems.map(renderItem)}
        </NavbarSection>

        <NavbarSection>
          <NavbarSectionHeader>Machine Learning</NavbarSectionHeader>
          {mlItems.map(renderItem)}
        </NavbarSection>
      </Navbar>
    </nav>
  )
}
