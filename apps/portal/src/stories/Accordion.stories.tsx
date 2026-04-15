import type { Meta, StoryObj } from "@storybook/react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "dbui/components/ui/accordion"
import { ComponentMeta } from "./components/ComponentMeta"
import manifest from "../../../../specs/components/accordion.manifest.json"

const meta: Meta = {
  title: "Content/Accordion",
  parameters: { layout: "padded" },
}

export default meta

export const Playground: StoryObj = {
  render: () => (
    <div>
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Accordion</h2>

      <Accordion type="single" collapsible defaultValue="item-1" className="w-[400px]">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is DBUI?</AccordionTrigger>
          <AccordionContent>DBUI is a shadcn-based component library reskinned with Databricks DuBois design tokens.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How are tokens structured?</AccordionTrigger>
          <AccordionContent>Tokens are organized into semantic colors, primitives, radius, spacing, shadows, and typography.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>How do I contribute?</AccordionTrigger>
          <AccordionContent>Follow the component spec workflow in the specs/ directory and ensure Figma-code parity.</AccordionContent>
        </AccordionItem>
      </Accordion>

      <ComponentMeta manifest={manifest} />
    </div>
  ),
}
