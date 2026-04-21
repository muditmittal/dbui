import figma from "@figma/code-connect"
import { AspectRatio } from "../components/ui/aspect-ratio"

figma.connect(AspectRatio, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3178-2833", {
  props: {
    ratio: figma.enum("Aspect ratio", {
      "1:1": 1,
      "5:4": 1.25,
      "4:3": 1.333,
      "3:2": 1.5,
      "Golden ratio": 1.618,
      "16:9": 1.778,
    }),
  },
  example: ({ ratio }) => (
    <AspectRatio ratio={ratio}>
      <img src="/placeholder.jpg" alt="Image" className="size-full rounded-lg object-cover" />
    </AspectRatio>
  ),
})
