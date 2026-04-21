import type { Meta, StoryObj } from "@storybook/react"
import { FacetedFilter } from "./components/FacetedFilter"

const meta: Meta = {
  title: "Compositions/Faceted Filter",
  parameters: { layout: "padded" },
}

export default meta

const facets = {
  "Type": { values: ["Table", "View", "Materialized View", "Streaming Table"] },
  "Tag": {
    values: ["billing", "production", "cost_center", "class", "marketing", "finance", "env"],
    nested: {
      "class": ["email", "phone_number", "us_passport", "ip_address", "location", "name"],
      "env": ["dev", "staging", "production", "sandbox"],
    },
  },
  "Column": { values: ["id", "name", "email", "created_at", "updated_at", "status"] },
  "Location": { values: ["us-east-1", "us-west-2", "eu-west-1", "ap-southeast-1"] },
}

export const Playground: StoryObj = {
  render: () => (
    <div>
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Faceted Filter</h2>
      <div style={{ fontSize: 12, color: "#6F6F6F", marginBottom: 12 }}>Click the Sliders icon to open the drill-down filter menu. Select values, drill into nested facets, and see chips below the search bar. Click a chip to edit that facet.</div>
      <FacetedFilter facets={facets} className="w-[360px]" />
    </div>
  ),
}
