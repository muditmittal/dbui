import type { Meta, StoryObj } from "@storybook/react"
import { Shell } from "dbui-shells/shell"
import { CatalogLayout } from "dbui-shells/catalog"
import { FacetedFilter } from "../components/FacetedFilter"
import { treeSections, catalogItems } from "./catalog-data"

const meta: Meta = {
  title: "Surfaces/Catalog Explorer",
  parameters: { layout: "fullscreen" },
}

export default meta

const catalogFacets = {
  "Type": { values: ["Table", "View", "Materialized View", "Streaming Table", "Volume", "Model", "Function"] },
  "Tag": {
    values: ["billing", "production", "cost_center", "marketing", "finance", "env"],
    nested: {
      "env": ["dev", "staging", "production", "sandbox"],
    },
  },
  "Owner": { values: ["me", "my_team", "all"] },
}

export const Playground: StoryObj = {
  render: () => (
    <Shell defaultActive="catalog">
      <CatalogLayout
        sections={treeSections}
        items={catalogItems}
        title="Catalog"
        filter={<FacetedFilter facets={catalogFacets} />}
      />
    </Shell>
  ),
}
