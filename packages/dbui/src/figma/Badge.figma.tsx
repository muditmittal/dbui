import figma from "@figma/code-connect"
import { Badge } from "../components/ui/badge"

figma.connect(Badge, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=1088-1544", {
  props: {
    variant: figma.enum("Variant", {
      "Fill": "fill",
      "Outline": "outline",
    }),
  },
  example: ({ variant }) => <Badge variant={variant}>Badge</Badge>,
})
