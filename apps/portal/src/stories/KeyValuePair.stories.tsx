import type { Meta, StoryObj } from "@storybook/react"
import { KeyValuePair, KeyValueRow, KeyValueKey, KeyValueValue, KeyValueValueEnd } from "dbui/components/ui/key-value-pair"
import { ComponentMeta } from "./components/ComponentMeta"
import { ProductionMap } from "./components/ProductionMap"
import componentSource from "dbui/components/ui/key-value-pair?raw"

const meta: Meta = {
  title: "Content/KeyValuePair",
  argTypes: {
    layout: { control: "radio", options: ["horizontal", "vertical", "flexible"] },
  },
  args: {
    layout: "horizontal",
  },
}

export default meta

export const Playground: StoryObj = {
  render: (args: any) => (
    <>
      <KeyValuePair layout={args.layout}>
        <KeyValueRow layout={args.layout}>
          <KeyValueKey layout={args.layout}>Owner</KeyValueKey>
          {args.layout === "flexible"
            ? <KeyValueValueEnd>mudit@databricks.com</KeyValueValueEnd>
            : <KeyValueValue>mudit@databricks.com</KeyValueValue>
          }
        </KeyValueRow>
        <KeyValueRow layout={args.layout}>
          <KeyValueKey layout={args.layout}>Created</KeyValueKey>
          {args.layout === "flexible"
            ? <KeyValueValueEnd>2026-04-14</KeyValueValueEnd>
            : <KeyValueValue>2026-04-14</KeyValueValue>
          }
        </KeyValueRow>
        <KeyValueRow layout={args.layout}>
          <KeyValueKey layout={args.layout}>Type</KeyValueKey>
          {args.layout === "flexible"
            ? <KeyValueValueEnd>Managed Table</KeyValueValueEnd>
            : <KeyValueValue>Managed Table</KeyValueValue>
          }
        </KeyValueRow>
      </KeyValuePair>
      <ComponentMeta source={componentSource} componentKey="key-value-pair" />
      <ProductionMap componentKey="key-value-pair" />
    </>
  ),
}
