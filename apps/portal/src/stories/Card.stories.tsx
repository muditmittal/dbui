import type { Meta, StoryObj } from "@storybook/react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "dbui/components/ui/card"
import { Button } from "dbui/components/ui/button"
import { ComponentMeta } from "./components/ComponentMeta"
import componentSource from "dbui/components/ui/card?raw"
import { ProductionMap } from "./components/ProductionMap"

const meta: Meta = {
  title: "Components/Content/Card",
  parameters: { layout: "padded" },
}

export default meta

const label: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: 0.5,
  color: "#8C8C8C",
  marginBottom: 8,
}

export const Playground: StoryObj = {
  render: () => (
    <div>
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Card</h2>

      <table style={{ borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0", width: 120 }}>Example</th>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0" }}>Preview</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: "14px 24px 14px 0", color: "#6F6F6F", fontSize: 12, verticalAlign: "top" }}>Basic</td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <Card className="w-[320px]">
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card description with supporting text.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-[13px] text-text-subtle">Card content goes here.</p>
                </CardContent>
              </Card>
            </td>
          </tr>
          <tr>
            <td style={{ padding: "14px 24px 14px 0", color: "#6F6F6F", fontSize: 12, verticalAlign: "top" }}>With Footer</td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <Card className="w-[320px]">
                <CardHeader>
                  <CardTitle>Edit Settings</CardTitle>
                  <CardDescription>Make changes to your workspace configuration.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-[13px] text-text-subtle">Configuration fields would go here.</p>
                </CardContent>
                <CardFooter className="justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save</Button>
                </CardFooter>
              </Card>
            </td>
          </tr>
        </tbody>
      </table>


      <ComponentMeta source={componentSource} componentKey="card" />

      <ProductionMap componentKey="card" />
    </div>
  ),
}

/**
 * `spotlight` — the border picks up a highlight that follows the pointer.
 *
 * Move slowly along a card's edge. The top row tracks; the bottom row is the
 * same card without the prop, for comparison. Under `prefers-reduced-motion` the
 * tracking drops and the hover becomes a flat border.
 */
export const Spotlight: StoryObj = {
  render: () => {
    const assets = [
      { title: "at_risk_renewals", body: "sales_main.crm · 2.1M rows" },
      { title: "renewal_risk_model", body: "ml_prod.models · v4, served" },
      { title: "Weekly renewal review", body: "workspace / analytics" },
      { title: "Renewal risk", body: "shared dashboards · 6 widgets" },
    ]

    return (
      <div className="flex max-w-[720px] flex-col gap-6">
        <section className="flex flex-col gap-2">
          <h3 className="type-label-bold text-text-base">
            interactive + spotlight — rests at xs, lifts to sm under the pointer
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {assets.map((asset) => (
              <Card key={asset.title} size="sm" interactive spotlight>
                <CardHeader>
                  <CardTitle>{asset.title}</CardTitle>
                  <CardDescription>{asset.body}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-2">
          <h3 className="type-label-bold text-text-base">
            interactive only — the resting lift, no halo
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {assets.slice(0, 2).map((asset) => (
              <Card key={asset.title} size="sm" interactive>
                <CardHeader>
                  <CardTitle>{asset.title}</CardTitle>
                  <CardDescription>{asset.body}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-2">
          <h3 className="type-label-bold text-text-base">
            Neither — a card that only holds content
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {assets.slice(0, 2).map((asset) => (
              <Card key={asset.title} size="sm">
                <CardHeader>
                  <CardTitle>{asset.title}</CardTitle>
                  <CardDescription>{asset.body}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      </div>
    )
  },
}
