import type { Meta, StoryObj } from "@storybook/react"
import { Shell } from "dbui-shell/shell"
import { CatalogLayout, type TreeNode, type CatalogSection, type CatalogItem } from "dbui-shell/catalog"
import { Data } from "@/components/icons/Data"
import { Folder } from "@/components/icons/Folder"
import { Table } from "@/components/icons/Table"
import { Cloud } from "@/components/icons/Cloud"

const meta: Meta = {
  title: "Compositions/Catalog Explorer",
  parameters: { layout: "fullscreen" },
}

export default meta

// ─── Sample tree data (matches the screenshot) ───

const treeSections: CatalogSection[] = [
  {
    label: "My organization",
    nodes: [
      {
        id: "my_catalog",
        label: "my_catalog",
        icon: Data,
        children: [
          {
            id: "main",
            label: "main",
            icon: Folder,
            children: [
              { id: "customer_purchase_orders", label: "customer_purchase_orders", icon: Folder },
              { id: "gold", label: "gold", icon: Folder },
              {
                id: "operations",
                label: "operations",
                icon: Folder,
              },
              { id: "revenue", label: "revenue", icon: Folder },
              { id: "silver", label: "silver", icon: Folder },
              { id: "transactions", label: "transactions", icon: Folder },
            ],
          },
          { id: "system", label: "system", icon: Folder },
        ],
      },
      { id: "customers", label: "customers", icon: Data },
      { id: "dbt_catalog", label: "dbt_catalog", icon: Data },
      { id: "demand_forecasting", label: "demand_forecasting", icon: Data },
      { id: "snowflake_catalog", label: "snowflake_catalog", icon: Data },
    ],
  },
  {
    label: "Delta shared",
    nodes: [
      { id: "samples", label: "samples", icon: Data },
      { id: "european_gas_and_power", label: "european_gas_and_power", icon: Data },
    ],
  },
  {
    label: "Legacy",
    nodes: [
      { id: "hive_metastore", label: "hive_metastore", icon: Data },
    ],
  },
]

// ─── Sample table data ───

const catalogItems: CatalogItem[] = [
  { name: "my_catalog", subtitle: "My default", icon: Data, reason: "Default for new items", type: "Catalog" },
  { name: "my_volume", subtitle: "My default", icon: Cloud, reason: "Default for file uploads", type: "Volume" },
  { name: "main", subtitle: "Workspace default", icon: Data, reason: "Shared in workspace", type: "Catalog" },
  { name: "customer_lifetime_value", subtitle: "sales.customer_purchase_orders", icon: Table, reason: "Viewed 6 times", type: "Table" },
  { name: "live_order_tracking_updates", subtitle: "shop_ease.default", icon: Table, reason: "Viewed 3 times", type: "Stream" },
  { name: "instant_order_notifications", subtitle: "sales.customer_purchase_orders", icon: Table, reason: "Favorited", type: "Table" },
  { name: "cancelled_orders", subtitle: "sales.customer_purchase_orders", icon: Table, reason: "Viewed 1 time", type: "Table" },
  { name: "cancelled_orders", subtitle: "sales.customer_purchase_orders", icon: Table, reason: "Viewed 1 time", type: "Table" },
  { name: "cancelled_orders", subtitle: "sales.customer_purchase_orders", icon: Table, reason: "Viewed 1 time", type: "Table" },
  { name: "order_payment_discrepancies_mv", subtitle: "demand_forecasting.customer_purchase_orders", icon: Table, reason: "Viewed 1 time", type: "Table" },
]

export const Default: StoryObj = {
  render: () => (
    <Shell defaultActive="catalog">
      <CatalogLayout
        sections={treeSections}
        items={catalogItems}
        title="Catalog"
      />
    </Shell>
  ),
}
