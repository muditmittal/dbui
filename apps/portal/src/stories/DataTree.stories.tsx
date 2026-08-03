import type { Meta, StoryObj } from "@storybook/react"
import { DataTree, type DataTreeSection } from "dbui/components/ui/data-tree"
import { CatalogShared } from "@/components/icons/CatalogShared"
import { CatalogGear } from "@/components/icons/CatalogGear"
import { CatalogUserHome } from "@/components/icons/CatalogUserHome"
import { Hash } from "@/components/icons/Hash"
import { Numbers } from "@/components/icons/Numbers"
import { Decimal } from "@/components/icons/Decimal"
import { Letters } from "@/components/icons/Letters"
import { CalendarClock } from "@/components/icons/CalendarClock"
import { Binary } from "@/components/icons/Binary"
import { ComponentMeta } from "./components/ComponentMeta"
import componentSource from "dbui/components/ui/data-tree?raw"

/**
 * `Content/Tree/Data Tree` — Storybook home for the L2 `<DataTree>` component.
 *
 * `<DataTree>` is the **semantic** Data Tree: it knows the Databricks Unity
 * Catalog conventions (catalog → schema → asset → column) and resolves icons
 * automatically from the `kind` field on each node.
 *
 * Level conventions:
 *   L1 catalog · L2 schema · L3 table | view | volume | model | function · L4 column (auto-leaf)
 *   "folder" / "file" can appear at any level as escape hatches for non-asset nodes.
 *
 * Section headers are a "virtual" level — leftmost, no track lines, no depth indent.
 * Top-level catalogs underneath sit at the same x-origin as the section header itself.
 */
const meta: Meta = {
  title: "Content/Tree/Data Tree",
  parameters: { layout: "padded" },
}
export default meta

// ─── Realistic Unity-Catalog data, kind-driven ───
//
// Notice how the data is now self-documenting: every node says what it IS via
// `kind`. No icon imports required for the standard cases. Pass `icon` only
// when overriding (e.g. CatalogShared / CatalogUserHome variants, or a typed
// column icon like Hash for INT, Letters for STRING).

const dataSections: DataTreeSection[] = [
  {
    label: "My organization",
    nodes: [
      {
        id: "my_catalog",
        label: "my_catalog",
        kind: "catalog",
        icon: <CatalogUserHome />, // override: my-organization variant
        children: [
          {
            id: "main",
            label: "main",
            kind: "schema",
            children: [
              {
                id: "cancelled_orders",
                label: "cancelled_orders",
                kind: "table",
                children: [
                  // Columns auto-leaf via kind. Override icons by SQL type.
                  { id: "co_order_id", label: "order_id", kind: "column", icon: <Hash />, selectable: false },
                  { id: "co_customer_id", label: "customer_id", kind: "column", icon: <Hash />, selectable: false },
                  { id: "co_amount", label: "amount_usd", kind: "column", icon: <Numbers />, selectable: false },
                ],
              },
              {
                id: "customer_order_details",
                label: "customer_order_details",
                kind: "table",
                children: [
                  { id: "cod_order_id", label: "order_id", kind: "column", icon: <Hash />, selectable: false },
                  { id: "cod_customer_id", label: "customer_id", kind: "column", icon: <Hash />, selectable: false },
                  { id: "cod_subtotal", label: "order_subtotal_usd", kind: "column", icon: <Numbers />, selectable: false },
                  { id: "cod_tax", label: "order_tax_usd", kind: "column", icon: <Numbers />, selectable: false },
                  { id: "cod_discount", label: "order_discount_usd", kind: "column", icon: <Decimal />, selectable: false },
                  { id: "cod_received", label: "order_received_date", kind: "column", icon: <CalendarClock />, selectable: false },
                  { id: "cod_shipped", label: "order_shipped_date", kind: "column", icon: <CalendarClock />, selectable: false },
                  { id: "cod_shipping", label: "shipping_address", kind: "column", icon: <Letters />, selectable: false },
                  { id: "cod_billing", label: "billing_address", kind: "column", icon: <Letters />, selectable: false },
                  { id: "cod_payment", label: "payment_method", kind: "column", icon: <Letters />, selectable: false },
                  { id: "cod_gift", label: "is_gift", kind: "column", icon: <Binary />, selectable: false },
                ],
              },
              { id: "customer_feedback", label: "customer_feedback", kind: "table", children: [] },
              { id: "discount_usage", label: "discount_usage", kind: "table", children: [] },
            ],
          },
          { id: "system", label: "system", kind: "schema", children: [] },
          {
            id: "showcase",
            label: "showcase",
            kind: "schema",
            children: [
              // Each row's icon is picked automatically from `kind`.
              { id: "orders", label: "orders", kind: "table", children: [] },
              { id: "orders_view", label: "orders_view", kind: "view", children: [] },
              { id: "revenue_metrics", label: "revenue_metrics", kind: "table", children: [] },
              { id: "fraud_model", label: "fraud_model", kind: "model" },
              { id: "raw_data", label: "raw_data", kind: "volume" },
              { id: "clean_address", label: "clean_address", kind: "function" },
            ],
          },
        ],
      },
      { id: "main_catalog", label: "main", kind: "catalog", children: [] },
      { id: "customers", label: "customers", kind: "catalog", children: [] },
      { id: "dbt_catalog", label: "dbt_catalog", kind: "catalog", children: [] },
      { id: "demand_forecasting", label: "demand_forecasting", kind: "catalog", children: [] },
      { id: "snowflake_catalog", label: "snowflake_catalog", kind: "catalog", children: [] },
    ],
  },
  {
    label: "Delta shared",
    nodes: [
      // CatalogShared icon is the convention for shared-catalog top rows.
      { id: "samples", label: "samples", kind: "catalog", icon: <CatalogShared />, children: [] },
      { id: "european_gas", label: "european_gas_and_power", kind: "catalog", icon: <CatalogShared />, children: [] },
    ],
  },
  {
    label: "Legacy",
    nodes: [
      { id: "hive_metastore", label: "hive_metastore", kind: "catalog", icon: <CatalogGear />, children: [] },
    ],
  },
]

export const Default: StoryObj = {
  render: () => (
    <div>
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 8px 0", color: "#161616" }}>Data Tree</h2>
      <p style={{ maxWidth: 720, fontSize: 13, color: "#6F6F6F", lineHeight: "20px", margin: "0 0 16px 0" }}>
        Semantic L2 component. Nodes carry <code>kind</code> (catalog / schema / table / view / volume /
        model / function / column / folder / file) — icons resolve automatically.
      </p>
      <div className="w-[280px] border border-border-base rounded-md p-1">
        <DataTree sections={dataSections} />
      </div>

      <ComponentMeta
        source={componentSource}
        componentKey="data-tree"
        figmaUrl="https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=3824-3098"
      />
    </div>
  ),
}
