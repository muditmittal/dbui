import figma from "@figma/code-connect"
import { Slider } from "../components/ui/slider"

// Slider — 5 states
// Figma node: https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=1039-2406
figma.connect(Slider, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=1039-2406", {
  props: {
    disabled: figma.enum("State", {
      Default: false,
      Hover: false,
      Press: false,
      Focus: false,
      Disabled: true,
    }),
  },
  example: ({ disabled }) => (
    <Slider defaultValue={[50]} min={0} max={100} disabled={disabled} />
  ),
})
