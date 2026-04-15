import type { Meta, StoryObj } from "@storybook/react"
import { CatalogLanding } from "dbui-shells/catalog"
import { catalogItems } from "./catalog-data"

const meta: Meta = {
  title: "Surfaces/Catalog Explorer/Landing Page",
  parameters: { layout: "padded" },
}

export default meta

export const Playground: StoryObj = {
  render: () => (
    <div className="h-[600px] border border-border rounded-lg overflow-hidden">
      <CatalogLanding title="Catalog" items={catalogItems} />
    </div>
  ),
}
