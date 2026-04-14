// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3155-1983
// source=apps/portal/src/components/ui/accordion.tsx
// component=Accordion
const figma = require('figma')
const instance = figma.selectedInstance

export default {
  example: figma.tsx`<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section One</AccordionTrigger>
    <AccordionContent>Content for section one.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Section Two</AccordionTrigger>
    <AccordionContent>Content for section two.</AccordionContent>
  </AccordionItem>
</Accordion>`,
  imports: ['import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"'],
  id: 'accordion',
  metadata: {
    nestable: false,
  }
}
