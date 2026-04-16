import figma from "@figma/code-connect"
import { InputGroup, InputGroupControl, InputGroupAddon } from "../components/ui/input-group"
import { Button } from "../components/ui/button"

figma.connect(InputGroup, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3178-3973", {
  props: {
    type: figma.enum("Type", {
      "Browse": "browse",
      "Filter": "filter",
    }),
  },
  example: ({ type }) => (
    <InputGroup>
      <InputGroupControl placeholder="Search..." />
      <InputGroupAddon align="inline-end">
        {type === "browse" ? (
          <Button variant="ghost" size="sm">Browse</Button>
        ) : (
          <>{/* SlidersIcon */}</>
        )}
      </InputGroupAddon>
    </InputGroup>
  ),
})
