import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { AspectRatio } from "dbui/components/ui/aspect-ratio"
import { Card, CardContent } from "dbui/components/ui/card"
import { Image } from "dbui/components/icons/Image"

const meta: Meta = {
  title: "Components/Content/Aspect Ratio",
  parameters: { layout: "padded" },
}

export default meta

function Section({
  title,
  hint,
  children,
}: {
  title: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-10">
      <h3 className="mb-1 type-body-bold text-text-base">{title}</h3>
      {hint ? <p className="mb-3 type-hint text-text-subtle">{hint}</p> : null}
      {children}
    </section>
  )
}

/** Stands in for real media, so the box the component reserves is the visible thing. */
function Placeholder({ label }: { label?: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-surface-subtle shape-container text-text-subtle">
      <Image className="size-5" aria-hidden />
      {label ? <span className="type-hint">{label}</span> : null}
    </div>
  )
}

const RATIOS: [string, number][] = [
  ["1:1", 1],
  ["3:2", 3 / 2],
  ["4:3", 4 / 3],
  ["5:4", 5 / 4],
  ["16:9", 16 / 9],
  ["Golden", 1.618],
]

export const Playground: StoryObj = {
  render: () => (
    <div className="max-w-[880px]">
      <Section
        title="16:9, the default choice"
        hint="Reach for this unless the media says otherwise. The point is the box is reserved before the image loads, so a grid does not reflow as thumbnails arrive."
      >
        <div className="w-[360px]">
          <AspectRatio ratio={16 / 9}>
            <Placeholder label="16:9" />
          </AspectRatio>
        </div>
      </Section>

      <Section
        title="The ratios the system draws"
        hint="Every box is the same width, so the ratio is the only thing changing. The label sits under each box rather than inside it — in a grid the row stretches to the tallest ratio, and a centred label makes it hard to see where a shorter box actually ends."
      >
        <div className="grid grid-cols-3 items-start gap-4">
          {RATIOS.map(([label, ratio]) => (
            <div key={label} className="flex flex-col gap-2">
              <AspectRatio ratio={ratio}>
                <Placeholder />
              </AspectRatio>
              <span className="type-hint text-text-subtle">{label}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="In a card grid"
        hint="Where it earns its keep. Three cards with different image heights would step out of line at the footer; with the ratio locked, every card's text starts at the same y."
      >
        <div className="grid grid-cols-3 gap-4">
          {["Revenue by region", "Order volume", "Customer cohorts"].map((title) => (
            <Card key={title}>
              <AspectRatio ratio={16 / 9}>
                <Placeholder label="Preview" />
              </AspectRatio>
              <CardContent>
                <p className="type-body-bold text-text-base">{title}</p>
                <p className="type-hint text-text-subtle">Updated 2 hours ago</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        title="Set it on the wrapper, not the child"
        hint="The component is the box. An image that sets its own ratio inside one is two sources of truth, and the one that wins depends on which loads first."
      >
        <div className="w-[280px]">
          <AspectRatio ratio={4 / 3} className="overflow-hidden shape-container">
            <Placeholder label="4:3 wrapper" />
          </AspectRatio>
        </div>
      </Section>
    </div>
  ),
}
