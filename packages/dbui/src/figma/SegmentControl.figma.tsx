import figma from "@figma/code-connect"
import { SegmentControl, SegmentControlItem } from "../components/ui/segment-control"

// SegmentControl — 2 variants × 2 sizes
// Figma node: https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=481-661
figma.connect(SegmentControl, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=481-661", {
  props: {
    variant: figma.enum("Variant", {
      Slider: "default",
      Outline: "outline",
    }),
    size: figma.enum("Size", {
      Default: "md",
      Small: "sm",
    }),
  },
  example: ({ variant, size }) => (
    <SegmentControl variant={variant} size={size} defaultValue="label">
      <SegmentControlItem value="label">Label</SegmentControlItem>
      <SegmentControlItem value="label-2">Label</SegmentControlItem>
      <SegmentControlItem value="label-3">Label</SegmentControlItem>
    </SegmentControl>
  ),
})
