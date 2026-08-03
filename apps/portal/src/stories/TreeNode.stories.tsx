import type { Meta, StoryObj } from "@storybook/react"
import {
  Tree,
  TreeNode,
  // Importing L2 wrappers so the story shows TreeNode in the "as Data Tree
  // uses it" arrangement, not just as an isolated row.
  DataTree,
  type DataTreeSection,
} from "dbui/components/ui/data-tree"
import { Catalog } from "@/components/icons/Catalog"
import { Database } from "@/components/icons/Database"
import { Table } from "@/components/icons/Table"
import { Hash } from "@/components/icons/Hash"
import { Letters } from "@/components/icons/Letters"
import { Overflow } from "@/components/icons/Overflow"
import { Button } from "dbui/components/ui/button"
import { ComponentMeta } from "./components/ComponentMeta"
import componentSource from "dbui/components/ui/data-tree?raw"

/**
 * `Content/Tree/TreeNode` — canonical state reference for the L1 primitive.
 *
 * `<TreeNode>` is the row primitive. It owns: chevron, optional asset icon
 * (color stays neutral; L2 wrappers override per kind), label, optional
 * trailing slot, hover preview popup, hover action buttons, and the trail
 * line for expanded children.
 *
 * For real-world usage prefer the L2 wrappers (`<DataTree>` / `<FileTree>`),
 * which resolve icons and depths from a typed `kind`. This story shows the
 * L1 surface as a *reference*, not as the canonical usage path.
 */
const meta: Meta = {
  title: "Content/Tree/TreeNode",
  parameters: { layout: "padded" },
}
export default meta

const Section: React.FC<{ title: string; description?: string; children: React.ReactNode }> = ({
  title,
  description,
  children,
}) => (
  <section className="flex flex-col gap-2">
    <header>
      <h3 className="text-[11px] font-semibold uppercase tracking-wider text-text-subtle">
        {title}
      </h3>
      {description && <p className="text-[12px] text-text-subtle">{description}</p>}
    </header>
    <div className="w-[280px] rounded-md border border-border-base p-1">{children}</div>
  </section>
)

// ─── Canonical states (matching Figma `.TreeNode` variant set) ─────────────

// Shared ComponentMeta for every TreeNode story
const TreeNodeMeta: React.FC = () => (
  <ComponentMeta
    source={componentSource}
    componentKey="tree"
    figmaUrl="https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=3179-24295"
  />
)

export const States: StoryObj = {
  name: "States",
  render: () => (
    <div className="flex flex-col gap-8">
      <Section title="Default" description="Resting row, no interaction.">
        <Tree>
          <TreeNode icon={<Catalog />} label="my_catalog" depth={0} />
        </Tree>
      </Section>

      <Section
        title="Selected"
        description="Row stays in this state until another row is selected. Icon and label colors are stable — only the row background and chevron change."
      >
        <Tree>
          <TreeNode icon={<Database />} label="customer_purchase_orders" depth={0} selected />
        </Tree>
      </Section>

      <Section
        title="Expandable — collapsed"
        description="Has children but is currently collapsed. Chevron points right."
      >
        <Tree>
          <TreeNode icon={<Catalog />} label="my_catalog" depth={0}>
            <TreeNode icon={<Database />} label="main" depth={1} />
          </TreeNode>
        </Tree>
      </Section>

      <Section
        title="Expandable — expanded with trail line"
        description="Trail lines connect each expanded parent to its children. The most-recently-expanded row's track darkens to muted-foreground (matching the expanded chevron) to anchor the user's last action."
      >
        <Tree>
          <TreeNode icon={<Catalog />} label="my_catalog" defaultExpanded depth={0}>
            <TreeNode icon={<Database />} label="main" defaultExpanded depth={1}>
              <TreeNode icon={<Table />} label="orders" defaultExpanded depth={2}>
                <TreeNode icon={<Hash />} label="order_id" depth={3} />
                <TreeNode icon={<Hash />} label="customer_id" depth={3} />
                <TreeNode icon={<Letters />} label="status" depth={3} />
              </TreeNode>
              <TreeNode icon={<Table />} label="customers" depth={2} />
            </TreeNode>
            <TreeNode icon={<Database />} label="system" depth={1} />
          </TreeNode>
        </Tree>
      </Section>

      <Section
        title='Empty — "No items" placeholder'
        description="Expandable but with zero children. The renderer drops a placeholder row."
      >
        <Tree>
          <TreeNode icon={<Database />} label="empty_schema" depth={0} expandable defaultExpanded />
        </Tree>
      </Section>

      <Section
        title="Leaf node (column)"
        description='No chevron. Shown when `leaf` is set or kind is "column".'
      >
        <Tree>
          <TreeNode icon={<Hash />} label="order_id" depth={0} />
          <TreeNode icon={<Letters />} label="customer_name" depth={0} />
        </Tree>
      </Section>

      <TreeNodeMeta />
    </div>
  ),
}

// ─── Slots & overrides ────────────────────────────────────────────────────

export const SlotsAndOverrides: StoryObj = {
  name: "Slots & Overrides",
  render: () => (
    <div className="flex flex-col gap-8">
      <Section
        title="Custom trailing slot"
        description="Pass `trailing` to replace the default Focus + Overflow hover cluster."
      >
        <Tree>
          <TreeNode
            icon={<Table />}
            label="customer_orders"
            depth={0}
            trailing={
              <Button variant="ghost" size="icon-sm" aria-label="More">
                <Overflow />
              </Button>
            }
          />
        </Tree>
      </Section>

      <Section
        title="Icon swap on expand (File Tree pattern)"
        description="`iconExpanded` is shown when the row is expanded. Used by `<FileTree>` to swap closed/open folder glyphs."
      >
        <Tree>
          <TreeNode icon={<Database />} iconExpanded={<Catalog />} label="schema_then_catalog" defaultExpanded depth={0}>
            <TreeNode icon={<Table />} label="orders" depth={1} />
          </TreeNode>
        </Tree>
      </Section>

      <Section
        title="Depth levels"
        description="`depth` controls the chevron-area width (`16 + depth * 8`px). Mirrors the Unity Catalog hierarchy: catalog → schema → table → column."
      >
        <Tree>
          <TreeNode icon={<Catalog />} label="depth=0 (catalog)" defaultExpanded depth={0}>
            <TreeNode icon={<Database />} label="depth=1 (schema)" defaultExpanded depth={1}>
              <TreeNode icon={<Table />} label="depth=2 (table)" defaultExpanded depth={2}>
                <TreeNode icon={<Hash />} label="depth=3 (column)" depth={3} />
              </TreeNode>
            </TreeNode>
          </TreeNode>
        </Tree>
      </Section>

      <TreeNodeMeta />
    </div>
  ),
}

// ─── L1 inside L2: how Data Tree composes TreeNode ─────────────────────────

const dataTreeReferenceSections: DataTreeSection[] = [
  {
    label: "My organization",
    nodes: [
      {
        id: "main",
        label: "main",
        kind: "catalog",
        defaultExpanded: true,
        children: [
          {
            id: "main.sales",
            label: "sales",
            kind: "schema",
            defaultExpanded: true,
            children: [
              { id: "main.sales.orders", label: "orders", kind: "table", leaf: true },
              { id: "main.sales.customers", label: "customers", kind: "table", leaf: true },
              { id: "main.sales.daily_kpi", label: "daily_kpi", kind: "view", leaf: true },
            ],
          },
          { id: "main.default", label: "default", kind: "schema", children: [] },
          { id: "main.information_schema", label: "information_schema", kind: "schema", children: [] },
        ],
      },
    ],
  },
]

export const InsideDataTree: StoryObj = {
  name: "Inside Data Tree",
  render: () => (
    <div className="flex flex-col gap-8">
      <Section
        title="Canonical Data Tree composition"
        description="What Data Tree (L2) builds out of TreeNode (L1). This is the reference look."
      >
        <DataTree sections={dataTreeReferenceSections} />
      </Section>

      <TreeNodeMeta />
    </div>
  ),
}
