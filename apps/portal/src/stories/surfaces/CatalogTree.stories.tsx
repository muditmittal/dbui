import type { Meta, StoryObj } from "@storybook/react"
import { CatalogTree } from "dbui-shells/catalog"
import { treeSections } from "./catalog-data"
import { useState } from "react"

const meta: Meta = {
  title: "Surfaces/Catalog Explorer/Tree Panel",
  parameters: { layout: "padded" },
}

export default meta

function InteractiveTree() {
  const [selected, setSelected] = useState<string | undefined>("my_catalog")
  return (
    <div className="w-[280px] h-[600px] border border-border rounded-lg overflow-hidden">
      <CatalogTree sections={treeSections} selectedId={selected} onSelect={setSelected} />
    </div>
  )
}

export const Playground: StoryObj = {
  render: () => <InteractiveTree />,
}
