import figma from "@figma/code-connect"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion"

figma.connect(
  Accordion,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3155-1983",
  {
    example: () => (
      <Accordion>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section One</AccordionTrigger>
          <AccordionContent>Content for section one.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Section Two</AccordionTrigger>
          <AccordionContent>Content for section two.</AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
  }
)
