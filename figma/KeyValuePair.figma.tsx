import figma from "@figma/code-connect"

// KeyValuePair is a layout composition — no dedicated component import needed
figma.connect("https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3178-3901", {
  props: {
    layout: figma.enum("Layout", {
      "Horizontal": "horizontal",
      "Vertical": "vertical",
    }),
  },
  example: ({ layout }) => (
    <div className={`flex ${layout === "vertical" ? "flex-col gap-1" : "flex-row gap-4"}`}>
      <dt className="text-[13px] font-semibold text-foreground">Key</dt>
      <dd className="text-[13px] text-muted-foreground">Value</dd>
    </div>
  ),
})
