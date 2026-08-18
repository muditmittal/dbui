import type { Meta, StoryObj } from "@storybook/react"
import { StatCard } from "dbui/components/ui/stat-card"
import { ComponentMeta } from "./components/ComponentMeta"
import componentSource from "dbui/components/ui/stat-card?raw"
import { ProductionMap } from "./components/ProductionMap"

const meta: Meta = {
  title: "Components/Content/Stat Card",
  parameters: { layout: "padded" },
}

export default meta

function Section({
  title,
  hint,
  children,
}: {
  title: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-10">
      <h3 className="mb-1 type-body-bold text-text-base">{title}</h3>
      {hint ? <p className="mb-3 type-hint text-text-subtle">{hint}</p> : null}
      {children}
    </section>
  )
}

export const Playground: StoryObj = {
  render: () => (
    <div>
      <Section
        title="The band"
        hint="Three across is the shape this component is for. The delta splits in two — the change takes the tone, the window stays subtle."
      >
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          <StatCard
            label="Total Catalogs"
            value="177"
            hint="Catalogs visible in this account"
            delta="+2.7%"
            deltaWindow="vs past 30d"
            deltaTone="positive"
          />
          <StatCard
            label="Total Assets"
            value="24.8K"
            hint="Tables, volumes, models and functions"
            delta="+2.7%"
            deltaWindow="vs past 30d"
            deltaTone="positive"
          />
          <StatCard
            label="Total Principals"
            value="13.1K"
            hint="Users, groups and service principals"
            action={{ label: "Manage" }}
          />
        </div>
      </Section>

      <Section
        title="Tone is the reader's verdict"
        hint="The arithmetic does not decide. Cost rising is negative; coverage rising is positive."
      >
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          <StatCard
            label="Governed coverage"
            value="68.4%"
            delta="+4.1%"
            deltaWindow="vs past 30d"
            deltaTone="positive"
          />
          <StatCard
            label="Monthly spend"
            value="$41.2K"
            delta="+12.8%"
            deltaWindow="vs past 30d"
            deltaTone="negative"
          />
          <StatCard
            label="Open requests"
            value="312"
            delta="0.0%"
            deltaWindow="vs past 30d"
          />
        </div>
      </Section>

      <Section
        title="Bare"
        hint="No trend and no handoff. Use it when the total is the whole answer."
      >
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          <StatCard label="Metastores" value="3" />
          <StatCard label="Regions" value="7" />
          <StatCard label="Workspaces" value="42" />
        </div>
      </Section>

      <ComponentMeta source={componentSource} componentKey="stat-card" />

      <ProductionMap componentKey="stat-card" />
    </div>
  ),
}
