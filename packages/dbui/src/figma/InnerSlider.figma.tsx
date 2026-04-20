import figma from "@figma/code-connect"
import { Slider } from "../components/ui/slider"

// Slider — inner composition variant (with label/value display)
// See also: Slider.figma.tsx for the base slider control
figma.connect(Slider, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=3157-4312", {
  example: () => (
    <Slider defaultValue={[50]} min={0} max={100} />
  ),
})
