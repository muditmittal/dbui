import type { Meta, StoryObj } from "@storybook/react"
import { Base } from "dbui-shells/shell"
import { CatalogLayout } from "dbui-shells/catalog"
import React from "react"
import { FacetedFilter } from "../components/FacetedFilter"
import { treeSections, catalogItems } from "./catalog-data"
import { CatalogUserHome } from "@/components/icons/CatalogUserHome"

const meta: Meta = {
  title: "Shells/Catalog Explorer",
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
    <Base defaultActive="catalog">
      <CatalogLayout
        sections={treeSections}
        items={catalogItems}
        title="Catalog"
        filter={<FacetedFilter facets={catalogFacets} />}
        goToItems={[
          { id: "for_you", label: "For you", icon: React.createElement(CatalogUserHome) },
          { id: "my_catalog", label: "my_catalog", icon: React.createElement(CatalogUserHome) },
        ]}
      />
    </Base>
  ),
}
