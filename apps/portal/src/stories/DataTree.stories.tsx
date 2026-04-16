import type { Meta, StoryObj } from "@storybook/react"
import { DataTreeView, FileTreeView, type TreeNode, type TreeSectionData } from "dbui/components/ui/data-tree"
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

// ─── Data Tree — structured data ───
// Node behavior is auto-computed:
//   - Nodes with children → expandable + selectable
//   - Leaf nodes (leaf: true) → not expandable, not selectable (columns)
//   - Nodes with no children and no leaf flag → expandable (shows "No items")

const dataSections: TreeSectionData[] = [
  {
    label: "My organization",
    nodes: [
      {
        id: "my_catalog", label: "my_catalog", icon: <CatalogUserHome />, defaultExpanded: true,
        children: [
          {
            id: "main", label: "main", icon: <Database />, defaultExpanded: true,
            children: [
              {
                id: "cancelled_orders", label: "cancelled_orders", icon: <Table />,
                children: [
                  { id: "co_order_id", label: "order_id", icon: <Hash />, leaf: true },
                  { id: "co_customer_id", label: "customer_id", icon: <Hash />, leaf: true },
                  { id: "co_amount", label: "amount_usd", icon: <Numbers />, leaf: true },
                ],
              },
              {
                id: "customer_order_details", label: "customer_order_details", icon: <Table />, defaultExpanded: true,
                children: [
                  { id: "cod_order_id", label: "order_id", icon: <Hash />, leaf: true },
                  { id: "cod_customer_id", label: "customer_id", icon: <Hash />, leaf: true },
                  { id: "cod_subtotal", label: "order_subtotal_usd", icon: <Numbers />, leaf: true },
                  { id: "cod_tax", label: "order_tax_usd", icon: <Numbers />, leaf: true },
                  { id: "cod_discount", label: "order_discount_usd", icon: <Decimal />, leaf: true },
                  { id: "cod_received", label: "order_received_date", icon: <CalendarClock />, leaf: true },
                  { id: "cod_shipped", label: "order_shipped_date", icon: <CalendarClock />, leaf: true },
                  { id: "cod_shipping", label: "shipping_address", icon: <Letters />, leaf: true },
                  { id: "cod_billing", label: "billing_address", icon: <Letters />, leaf: true },
                  { id: "cod_payment", label: "payment_method", icon: <Letters />, leaf: true },
                  { id: "cod_gift", label: "is_gift", icon: <Binary />, leaf: true },
                ],
              },
              { id: "customer_feedback", label: "customer_feedback", icon: <Table />, children: [] },
              { id: "discount_usage", label: "discount_usage", icon: <Table />, children: [] },
            ],
          },
          { id: "system", label: "system", icon: <Database />, children: [] },
        ],
      },
      { id: "main_catalog", label: "main", icon: <CatalogHome />, children: [] },
      { id: "customers", label: "customers", icon: <Catalog />, children: [] },
      { id: "dbt_catalog", label: "dbt_catalog", icon: <Catalog />, children: [] },
      { id: "demand_forecasting", label: "demand_forecasting", icon: <Catalog />, children: [] },
      { id: "snowflake_catalog", label: "snowflake_catalog", icon: <Catalog />, children: [] },
    ],
  },
  {
    label: "Delta shared",
    nodes: [
      { id: "samples", label: "samples", icon: <CatalogShared />, children: [] },
      { id: "european_gas", label: "european_gas_and_power", icon: <CatalogShared />, children: [] },
    ],
  },
  {
    label: "Legacy",
    nodes: [
      { id: "hive_metastore", label: "hive_metastore", icon: <CatalogGear />, children: [] },
    ],
  },
]

// ─── File Tree — structured data ───
// Folders have children (expandable). Files are leaf nodes.

const fileNodes: TreeNode[] = [
  {
    id: "project", label: "my_project", icon: <Folder />, iconExpanded: <FolderOpen />, defaultExpanded: true,
    children: [
      {
        id: "src", label: "src", icon: <Folder />, iconExpanded: <FolderOpen />, defaultExpanded: true,
        children: [
          { id: "nb1", label: "notebook_1.py", icon: <Notebook />, leaf: true },
          { id: "nb2", label: "notebook_2.py", icon: <Notebook />, leaf: true },
          { id: "utils", label: "utils.py", icon: <Notebook />, leaf: true },
        ],
      },
      {
        id: "data", label: "data", icon: <Folder />, iconExpanded: <FolderOpen />,
        children: [
          { id: "csv1", label: "customers.csv", icon: <Table />, leaf: true },
          { id: "csv2", label: "orders.csv", icon: <Table />, leaf: true },
        ],
      },
      { id: "configs", label: "configs", icon: <Folder />, iconExpanded: <FolderOpen />, children: [] },
      { id: "readme", label: "README.md", icon: <Notebook />, leaf: true },
    ],
  },
]

export const Playground: StoryObj = {
  render: () => (
    <div>
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Tree</h2>

      <div style={{ display: "flex", gap: 48 }}>
        <div>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: "#8C8C8C", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12 }}>Data Tree</h3>
          <div className="w-[280px]">
            <DataTreeView sections={dataSections} />
          </div>
        </div>
        <div>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: "#8C8C8C", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12 }}>File Tree</h3>
          <div className="w-[260px]">
            <FileTreeView nodes={fileNodes} />
          </div>
        </div>
      </div>

      <ComponentMeta source={componentSource} />
    </div>
  ),
}
