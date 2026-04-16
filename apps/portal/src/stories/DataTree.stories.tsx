import type { Meta, StoryObj } from "@storybook/react"
import { DataTree, DataTreeHeader, DataTreeSection, DataTreeItem, DataTreeItemTag } from "dbui/components/ui/data-tree"
import { Button } from "dbui/components/ui/button"
import { Input } from "dbui/components/ui/input"
import { Data } from "@/components/icons/Data"
import { Folder } from "@/components/icons/Folder"
import { Schema } from "@/components/icons/Schema"
import { Table } from "@/components/icons/Table"
import { Column } from "@/components/icons/Column"
import { Cloud } from "@/components/icons/Cloud"
import { Database } from "@/components/icons/Database"
import { Plus } from "@/components/icons/Plus"
import { Overflow } from "@/components/icons/Overflow"
import { Search } from "@/components/icons/Search"
import { Gear } from "@/components/icons/Gear"
import { useState } from "react"
import { ComponentMeta } from "./components/ComponentMeta"
import componentSource from "dbui/components/ui/data-tree?raw"

const meta: Meta = {
  title: "Content/DataTree",
  parameters: { layout: "padded" },
}

export default meta

function CatalogTree() {
  const [selected, setSelected] = useState("customer_purchase_orders")
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    my_catalog: true,
    main: true,
  })

  const toggle = (id: string) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }))

  return (
    <div className="w-[280px] border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <DataTreeHeader
        icon={<Data />}
        onBack={() => {}}
        actions={
          <>
            <Button variant="ghost" size="icon-sm"><Plus /></Button>
            <Button variant="ghost" size="icon-sm"><Overflow /></Button>
          </>
        }
        status={<span className="inline-block size-2 rounded-full bg-success" />}
      >
        Catalog
      </DataTreeHeader>

      {/* Search */}
      <div className="px-2 pb-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input placeholder="Search" className="pl-8 h-8" />
        </div>
      </div>

      {/* Tree */}
      <div className="overflow-y-auto px-1 pb-4" style={{ maxHeight: 500 }}>
        <DataTree>
          <DataTreeSection label="My organization">
            <DataTreeItem
              icon={<Data />}
              label="my_catalog"
              expandable
              expanded={expanded.my_catalog}
              onToggle={() => toggle("my_catalog")}
              depth={0}
            >
              <DataTreeItem
                icon={<Folder />}
                label="main"
                expandable
                expanded={expanded.main}
                onToggle={() => toggle("main")}
                depth={1}
              >
                <DataTreeItem
                  icon={<Schema />}
                  label="customer_purchase_orders"
                  selected={selected === "customer_purchase_orders"}
                  onClick={() => setSelected("customer_purchase_orders")}
                  expandable
                  expanded={expanded.customer_purchase_orders}
                  onToggle={() => toggle("customer_purchase_orders")}
                  depth={2}
                >
                  <DataTreeItem icon={<Table />} label="cancelled_orders" depth={3} onClick={() => setSelected("cancelled_orders")} selected={selected === "cancelled_orders"} />
                  <DataTreeItem icon={<Table />} label="customer_order_details" depth={3} onClick={() => setSelected("customer_order_details")} selected={selected === "customer_order_details"} />
                  <DataTreeItem icon={<Table />} label="customer_feedback" depth={3} onClick={() => setSelected("customer_feedback")} selected={selected === "customer_feedback"} />
                </DataTreeItem>
                <DataTreeItem icon={<Folder />} label="gold" expandable depth={2} onToggle={() => toggle("gold")} expanded={expanded.gold} />
                <DataTreeItem icon={<Folder />} label="operations" expandable depth={2} onToggle={() => toggle("operations")} expanded={expanded.operations} />
                <DataTreeItem icon={<Folder />} label="revenue" expandable depth={2} onToggle={() => toggle("revenue")} expanded={expanded.revenue} />
                <DataTreeItem icon={<Folder />} label="silver" expandable depth={2} onToggle={() => toggle("silver")} expanded={expanded.silver} />
                <DataTreeItem icon={<Folder />} label="transactions" expandable depth={2} onToggle={() => toggle("transactions")} expanded={expanded.transactions} />
              </DataTreeItem>
              <DataTreeItem icon={<Folder />} label="system" expandable depth={1} onToggle={() => toggle("system")} expanded={expanded.system} />
            </DataTreeItem>
            <DataTreeItem icon={<Data />} label="customers" expandable depth={0} onToggle={() => toggle("customers")} expanded={expanded.customers} />
            <DataTreeItem icon={<Data />} label="dbt_catalog" expandable depth={0} onToggle={() => toggle("dbt_catalog")} expanded={expanded.dbt_catalog} />
            <DataTreeItem icon={<Data />} label="demand_forecasting" expandable depth={0} onToggle={() => toggle("demand_forecasting")} expanded={expanded.demand_forecasting} />
            <DataTreeItem icon={<Data />} label="snowflake_catalog" expandable depth={0} onToggle={() => toggle("snowflake_catalog")} expanded={expanded.snowflake_catalog} />
          </DataTreeSection>

          <DataTreeSection label="Delta shared">
            <DataTreeItem icon={<Data />} label="samples" expandable depth={0} />
            <DataTreeItem icon={<Data />} label="european_gas_and_power" expandable depth={0} />
          </DataTreeSection>

          <DataTreeSection label="Legacy">
            <DataTreeItem icon={<Database />} label="hive_metastore" expandable depth={0} />
          </DataTreeSection>
        </DataTree>
      </div>
    </div>
  )
}

export const Playground: StoryObj = {
  render: () => (
    <div>
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Tree</h2>
      <CatalogTree />
      <ComponentMeta source={componentSource} />
    </div>
  ),
}
