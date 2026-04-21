import figma from "@figma/code-connect"
import { InputGroup, InputGroupInput, InputGroupAddon } from "../components/ui/input-group"
import { Button } from "../components/ui/button"

figma.connect(InputGroup, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3178-3973", {
  props: {
    type: figma.enum("Type", {
      "Browse": "browse",
      "Filter": "filter",
    }),
    active: figma.enum("Active", {
      "False": false,
      "True": true,
    }),
  },
  example: ({ type, active }) => (
    <InputGroup>
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon align="inline-end">
        <Button variant="ghost" size="sm">{type}</Button>
      </InputGroupAddon>
    </InputGroup>
  ),
})
