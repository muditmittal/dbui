import figma from "@figma/code-connect"
import { Button } from "../components/ui/button"

// SplitButton — 2 variants × 2 sizes (composition pattern: Button + divider + IconButton)
// Figma node: https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=580-527
figma.connect(Button, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=580-527", {
  props: {
    variant: figma.enum("Variant", {
      Primary: "default",
      Outline: "outline",
    }),
    size: figma.enum("Size", {
      Default: "md",
      Small: "sm",
    }),
    label: figma.string("Label"),
  },
  example: ({ variant, size, label }) => (
    <div className="inline-flex overflow-clip rounded-sm">
      <Button variant={variant} size={size} className="rounded-r-none">
        {label}
      </Button>
      <div className={variant === "outline" ? "bg-border w-px self-stretch" : "bg-primary-foreground/20 w-px self-stretch"} />
      <Button variant={variant} size={size === "sm" ? "icon-sm" : "icon-md"} className="rounded-l-none">
        {/* ChevronDown icon */}
      </Button>
    </div>
  ),
})
