import React, { useState } from "react"
import { Navbar, NavbarSection, NavbarSectionHeader, NavbarItem, NavbarItemIcon } from "dbui/components/ui/navbar"
import { Plus } from "@/components/icons/Plus"
import { Clock } from "@/components/icons/Clock"
import { Folder } from "@/components/icons/Folder"
import { Data } from "@/components/icons/Data"
import { Workflows } from "@/components/icons/Workflows"
import { Cloud } from "@/components/icons/Cloud"
import { Storefront } from "@/components/icons/Storefront"
import { QueryEditor } from "@/components/icons/QueryEditor"
import { Query } from "@/components/icons/Query"
import { Dashboard } from "@/components/icons/Dashboard"
import { SparkleRectangle } from "@/components/icons/SparkleRectangle"
import { Notification } from "@/components/icons/Notification"
import { History } from "@/components/icons/History"
import { CloudDatabase } from "@/components/icons/CloudDatabase"
import { Checklist } from "@/components/icons/Checklist"
import { Ingestion } from "@/components/icons/Ingestion"
import { Pipeline } from "@/components/icons/Pipeline"
import { Robot } from "@/components/icons/Robot"
import { Beaker } from "@/components/icons/Beaker"
import { Layer } from "@/components/icons/Layer"
import { Models } from "@/components/icons/Models"
import { CloudModel } from "@/components/icons/CloudModel"

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

export function PlatformNav({ defaultActive = "catalog" }: { defaultActive?: string }) {
  const [active, setActive] = useState(defaultActive)

  const renderItem = (item: NavDef) => {
    const Icon = item.icon
    return (
      <NavbarItem key={item.id} active={active === item.id} onClick={() => setActive(item.id)}>
        <NavbarItemIcon><Icon /></NavbarItemIcon>
        {item.label}
      </NavbarItem>
    )
  }

  return (
    <nav className="w-[180px] shrink-0 overflow-y-auto">
      {/* New button — Figma: #FFF5F7 base + 4% black overlay, border #FDE2E8, radius 8, pad 10/12/10/16, gap 8, plus icon #E65B77 */}
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
