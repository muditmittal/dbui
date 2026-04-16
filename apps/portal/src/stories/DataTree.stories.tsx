import type { Meta, StoryObj } from "@storybook/react"
import { Tree, TreeSection, TreeItem } from "dbui/components/ui/data-tree"
import { Catalog } from "@/components/icons/Catalog"
import { CatalogUserHome } from "@/components/icons/CatalogUserHome"
import { CatalogHome } from "@/components/icons/CatalogHome"
import { CatalogShared } from "@/components/icons/CatalogShared"
import { CatalogGear } from "@/components/icons/CatalogGear"
import { Database } from "@/components/icons/Database"
import { Table } from "@/components/icons/Table"
import { Folder } from "@/components/icons/Folder"
import { FolderOpen } from "@/components/icons/FolderOpen"
import { Notebook } from "@/components/icons/Notebook"
import { Hash } from "@/components/icons/Hash"
import { Letters } from "@/components/icons/Letters"
import { Numbers } from "@/components/icons/Numbers"
import { CalendarClock } from "@/components/icons/CalendarClock"
import { Binary } from "@/components/icons/Binary"
import { Decimal } from "@/components/icons/Decimal"
import { ComponentMeta } from "./components/ComponentMeta"
import componentSource from "dbui/components/ui/data-tree?raw"

const meta: Meta = {
  title: "Content/Tree",
  parameters: { layout: "padded" },
}

export default meta

// ─── Data Tree variant ───

function DataTreeExample() {
  return (
    <div className="w-[260px]">
      <Tree>
        <TreeSection label="My organization">
          {/* Catalog (depth 1) → Schema (depth 2) → Table (depth 3) → Column (depth 4) */}
          <TreeItem icon={<CatalogUserHome />} label="my_catalog" defaultExpanded depth={1}>
            <TreeItem icon={<Database />} label="main" defaultExpanded depth={2}>
              <TreeItem icon={<Table />} label="cancelled_orders" depth={3}>
                <TreeItem icon={<Hash />} label="order_id" depth={4} selectable={false} />
                <TreeItem icon={<Hash />} label="customer_id" depth={4} selectable={false} />
                <TreeItem icon={<Numbers />} label="amount_usd" depth={4} selectable={false} />
              </TreeItem>
              <TreeItem icon={<Table />} label="customer_order_details" defaultExpanded depth={3}>
                <TreeItem icon={<Hash />} label="order_id" depth={4} selectable={false} />
                <TreeItem icon={<Hash />} label="customer_id" depth={4} selectable={false} />
                <TreeItem icon={<Numbers />} label="order_subtotal_usd" depth={4} selectable={false} />
                <TreeItem icon={<Numbers />} label="order_tax_usd" depth={4} selectable={false} />
                <TreeItem icon={<Decimal />} label="order_discount_usd" depth={4} selectable={false} />
                <TreeItem icon={<CalendarClock />} label="order_received_date" depth={4} selectable={false} />
                <TreeItem icon={<CalendarClock />} label="order_shipped_date" depth={4} selectable={false} />
                <TreeItem icon={<Letters />} label="shipping_address" depth={4} selectable={false} />
                <TreeItem icon={<Letters />} label="billing_address" depth={4} selectable={false} />
                <TreeItem icon={<Letters />} label="payment_method" depth={4} selectable={false} />
                <TreeItem icon={<Binary />} label="is_gift" depth={4} selectable={false} />
              </TreeItem>
              <TreeItem icon={<Table />} label="customer_feedback" depth={3} expandable />
              <TreeItem icon={<Table />} label="discount_usage" depth={3} expandable />
            </TreeItem>
            <TreeItem icon={<Database />} label="system" depth={2} expandable />
          </TreeItem>
          <TreeItem icon={<CatalogHome />} label="main" depth={1} expandable />
          <TreeItem icon={<Catalog />} label="customers" depth={1} expandable />
          <TreeItem icon={<Catalog />} label="dbt_catalog" depth={1} expandable />
          <TreeItem icon={<Catalog />} label="demand_forecasting" depth={1} expandable />
          <TreeItem icon={<Catalog />} label="snowflake_catalog" depth={1} expandable />
        </TreeSection>

        <TreeSection label="Delta shared">
          <TreeItem icon={<CatalogShared />} label="samples" depth={1} expandable />
          <TreeItem icon={<CatalogShared />} label="european_gas_and_power" depth={1} expandable />
        </TreeSection>

        <TreeSection label="Legacy">
          <TreeItem icon={<CatalogGear />} label="hive_metastore" depth={1} expandable />
        </TreeSection>
      </Tree>
    </div>
  )
}

// ─── File Tree variant ───
// Infinite nesting. Folders and files can appear at any level.
// Folders use FolderOpen icon when expanded.

function FileTreeExample() {
  return (
    <div className="w-[260px]">
      <Tree>
        <TreeItem icon={<Folder />} iconExpanded={<FolderOpen />} label="my_project" defaultExpanded depth={0}>
          <TreeItem icon={<Folder />} iconExpanded={<FolderOpen />} label="src" defaultExpanded depth={1}>
            <TreeItem icon={<Notebook />} label="notebook_1.py" depth={2} />
            <TreeItem icon={<Notebook />} label="notebook_2.py" depth={2} />
            <TreeItem icon={<Notebook />} label="utils.py" depth={2} />
          </TreeItem>
          <TreeItem icon={<Folder />} iconExpanded={<FolderOpen />} label="data" depth={1}>
            <TreeItem icon={<Table />} label="customers.csv" depth={2} />
            <TreeItem icon={<Table />} label="orders.csv" depth={2} />
          </TreeItem>
          <TreeItem icon={<Folder />} iconExpanded={<FolderOpen />} label="configs" depth={1} expandable />
          <TreeItem icon={<Notebook />} label="README.md" depth={1} />
        </TreeItem>
      </Tree>
    </div>
  )
}

export const Playground: StoryObj = {
  render: () => (
    <div>
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Tree</h2>

      <div style={{ display: "flex", gap: 48 }}>
        <div>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: "#8C8C8C", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12 }}>Data Tree</h3>
          <DataTreeExample />
        </div>
        <div>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: "#8C8C8C", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12 }}>File Tree</h3>
          <FileTreeExample />
        </div>
      </div>

      <ComponentMeta source={componentSource} />
    </div>
  ),
}
