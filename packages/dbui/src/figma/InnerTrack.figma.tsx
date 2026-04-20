import figma from "@figma/code-connect"
import { Slider } from "../components/ui/slider"

// Track — inner building block for Slider (the track line)
// This is not a standalone component — use Slider instead
figma.connect(Slider, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=3179-18489", {
  example: () => (
    <Slider defaultValue={[50]} min={0} max={100} />
  ),
})
