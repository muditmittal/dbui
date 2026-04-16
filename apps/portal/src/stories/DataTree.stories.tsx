import type { Meta, StoryObj } from "@storybook/react"
import { Tree, TreeSection, TreeItem } from "dbui/components/ui/data-tree"
import { Catalog } from "@/components/icons/Catalog"
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
import { useState } from "react"
import { ComponentMeta } from "./components/ComponentMeta"
import componentSource from "dbui/components/ui/data-tree?raw"

const meta: Meta = {
  title: "Content/Tree",
  parameters: { layout: "padded" },
}

export default meta

// ─── Data Tree variant ───

function DataTreeExample() {
  const [selected, setSelected] = useState("customer_purchase_orders")

  return (
    <div className="w-[260px]">
      <Tree>
        <TreeSection label="My organization">
          <TreeItem icon={<Catalog />} label="my_catalog" defaultExpanded depth={0} onSelect={() => setSelected("my_catalog")} selected={selected === "my_catalog"}>
            <TreeItem icon={<Folder />} label="main" defaultExpanded depth={1} onSelect={() => setSelected("main")} selected={selected === "main"}>
              <TreeItem icon={<Database />} label="customer_purchase_orders" defaultExpanded depth={2} onSelect={() => setSelected("customer_purchase_orders")} selected={selected === "customer_purchase_orders"}>
                <TreeItem icon={<Table />} label="cancelled_orders" depth={3} onSelect={() => setSelected("cancelled_orders")} selected={selected === "cancelled_orders"} />
                <TreeItem icon={<Table />} label="customer_order_details" defaultExpanded depth={3} onSelect={() => setSelected("customer_order_details")} selected={selected === "customer_order_details"}>
                  <TreeItem icon={<Hash />} label="order_id" depth={4} onSelect={() => setSelected("order_id")} selected={selected === "order_id"} />
                  <TreeItem icon={<Hash />} label="customer_id" depth={4} onSelect={() => setSelected("customer_id")} selected={selected === "customer_id"} />
                  <TreeItem icon={<Numbers />} label="order_subtotal_usd" depth={4} onSelect={() => setSelected("order_subtotal")} selected={selected === "order_subtotal"} />
                  <TreeItem icon={<Numbers />} label="order_tax_usd" depth={4} />
                  <TreeItem icon={<Decimal />} label="order_discount_usd" depth={4} />
                  <TreeItem icon={<CalendarClock />} label="order_received_date" depth={4} />
                  <TreeItem icon={<CalendarClock />} label="order_shipped_date" depth={4} />
                  <TreeItem icon={<Letters />} label="shipping_address" depth={4} />
                  <TreeItem icon={<Letters />} label="billing_address" depth={4} />
                  <TreeItem icon={<Letters />} label="payment_method" depth={4} />
                  <TreeItem icon={<Binary />} label="is_gift" depth={4} />
                </TreeItem>
              </TreeItem>
              <TreeItem icon={<Folder />} label="gold" depth={2} />
              <TreeItem icon={<Folder />} label="operations" depth={2} />
              <TreeItem icon={<Folder />} label="revenue" depth={2} />
              <TreeItem icon={<Folder />} label="silver" depth={2} />
              <TreeItem icon={<Folder />} label="transactions" depth={2} />
            </TreeItem>
            <TreeItem icon={<Folder />} label="system" depth={1} />
          </TreeItem>
          <TreeItem icon={<Catalog />} label="customers" depth={0} />
          <TreeItem icon={<Catalog />} label="dbt_catalog" depth={0} />
          <TreeItem icon={<Catalog />} label="demand_forecasting" depth={0} />
          <TreeItem icon={<Catalog />} label="snowflake_catalog" depth={0} />
        </TreeSection>

        <TreeSection label="Delta shared">
          <TreeItem icon={<Catalog />} label="samples" depth={0} />
          <TreeItem icon={<Catalog />} label="european_gas_and_power" depth={0} />
        </TreeSection>

        <TreeSection label="Legacy">
          <TreeItem icon={<Database />} label="hive_metastore" depth={0} />
        </TreeSection>
      </Tree>
    </div>
  )
}

// ─── File Tree variant ───

function FileTreeExample() {
  const [selected, setSelected] = useState("notebook_1")

  return (
    <div className="w-[260px]">
      <Tree>
        <TreeItem icon={<Folder />} iconExpanded={<FolderOpen />} label="my_project" defaultExpanded depth={0}>
          <TreeItem icon={<Folder />} iconExpanded={<FolderOpen />} label="src" defaultExpanded depth={1}>
            <TreeItem icon={<Notebook />} label="notebook_1.py" depth={2} onSelect={() => setSelected("notebook_1")} selected={selected === "notebook_1"} />
            <TreeItem icon={<Notebook />} label="notebook_2.py" depth={2} onSelect={() => setSelected("notebook_2")} selected={selected === "notebook_2"} />
            <TreeItem icon={<Notebook />} label="utils.py" depth={2} onSelect={() => setSelected("utils")} selected={selected === "utils"} />
          </TreeItem>
          <TreeItem icon={<Folder />} iconExpanded={<FolderOpen />} label="data" depth={1}>
            <TreeItem icon={<Table />} label="customers.csv" depth={2} />
            <TreeItem icon={<Table />} label="orders.csv" depth={2} />
          </TreeItem>
          <TreeItem icon={<Notebook />} label="README.md" depth={1} onSelect={() => setSelected("readme")} selected={selected === "readme"} />
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
