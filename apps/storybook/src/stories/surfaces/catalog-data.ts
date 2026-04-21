import React from "react"
import type { TreeSectionData } from "dbui/components/ui/data-tree"
import type { CatalogItem } from "dbui-shells/catalog"
import { CatalogUserHome } from "@/components/icons/CatalogUserHome"
import { CatalogHome } from "@/components/icons/CatalogHome"
import { Catalog } from "@/components/icons/Catalog"
import { CatalogShared } from "@/components/icons/CatalogShared"
import { CatalogGear } from "@/components/icons/CatalogGear"
import { Database } from "@/components/icons/Database"
import { Table } from "@/components/icons/Table"
import { FolderCloud } from "@/components/icons/FolderCloud"

export const treeSections: TreeSectionData[] = [
  {
    label: "My organization",
    nodes: [
      {
        id: "my_catalog", label: "my_catalog", icon: React.createElement(CatalogUserHome), defaultExpanded: true,
        children: [
          {
            id: "main", label: "main", icon: React.createElement(Database), defaultExpanded: true,
            children: [
              { id: "customer_purchase_orders", label: "customer_purchase_orders", icon: React.createElement(Database), children: [] },
              { id: "gold", label: "gold", icon: React.createElement(Database), children: [] },
              { id: "operations", label: "operations", icon: React.createElement(Database), children: [] },
              { id: "revenue", label: "revenue", icon: React.createElement(Database), children: [] },
              { id: "silver", label: "silver", icon: React.createElement(Database), children: [] },
              { id: "transactions", label: "transactions", icon: React.createElement(Database), children: [] },
            ],
          },
          { id: "system", label: "system", icon: React.createElement(Database), children: [] },
        ],
      },
      { id: "main_cat", label: "main", icon: React.createElement(CatalogHome), children: [] },
      { id: "customers", label: "customers", icon: React.createElement(Catalog), children: [] },
      { id: "dbt_catalog", label: "dbt_catalog", icon: React.createElement(Catalog), children: [] },
      { id: "demand_forecasting", label: "demand_forecasting", icon: React.createElement(Catalog), children: [] },
      { id: "snowflake_catalog", label: "snowflake_catalog", icon: React.createElement(Catalog), children: [] },
    ],
  },
  {
    label: "Delta shared",
    nodes: [
      { id: "samples", label: "samples", icon: React.createElement(CatalogShared), children: [] },
      { id: "european_gas_and_power", label: "european_gas_and_power", icon: React.createElement(CatalogShared), children: [] },
    ],
  },
  {
    label: "Legacy",
    nodes: [
      { id: "hive_metastore", label: "hive_metastore", icon: React.createElement(CatalogGear), children: [] },
    ],
  },
]

export const catalogItems: CatalogItem[] = [
  { name: "my_catalog", subtitle: "My default", icon: React.createElement(Catalog), reason: "Default for new items", type: "Catalog" },
  { name: "my_volume", subtitle: "My default", icon: React.createElement(FolderCloud), reason: "Default for file uploads", type: "Volume" },
  { name: "main", subtitle: "Workspace default", icon: React.createElement(Catalog), reason: "Shared in workspace", type: "Catalog" },
  { name: "customer_lifetime_value", subtitle: "sales.customer_purchase_orders", icon: React.createElement(Table), reason: "Viewed 6 times", type: "Table" },
  { name: "live_order_tracking_updates", subtitle: "shop_ease.default", icon: React.createElement(Table), reason: "Viewed 3 times", type: "Stream" },
  { name: "instant_order_notifications", subtitle: "sales.customer_purchase_orders", icon: React.createElement(Table), reason: "Favorited", type: "Table" },
  { name: "cancelled_orders", subtitle: "sales.customer_purchase_orders", icon: React.createElement(Table), reason: "Viewed 1 time", type: "Table" },
  { name: "order_payment_discrepancies_mv", subtitle: "demand_forecasting.customer_purchase_orders", icon: React.createElement(Table), reason: "Viewed 1 time", type: "Table" },
]
