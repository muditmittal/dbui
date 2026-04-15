import type { Meta, StoryObj } from "@storybook/react"
import { Shell } from "dbui-shells/shell"
import { CatalogLayout, CatalogTree, CatalogLanding } from "dbui-shells/catalog"
import { treeSections, catalogItems } from "./catalog-data"

const meta: Meta = {
  title: "Surfaces/Catalog Explorer",
  parameters: { layout: "fullscreen" },
}

export default meta

/** Full assembled catalog explorer inside the platform shell */
export const Playground: StoryObj = {
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
