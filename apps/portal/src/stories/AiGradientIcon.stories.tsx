import type { Meta, StoryObj } from "@storybook/react"
import { AiGradientIcon } from "dbui/components/ui/ai-gradient-icon"
import { Button, ButtonIcon } from "dbui/components/ui/button"
import { Sparkle } from "dbui/components/icons/Sparkle"
import { SparkleDouble } from "dbui/components/icons/SparkleDouble"
import { GenieCode } from "dbui/components/icons/GenieCode"
import { ComponentMeta } from "./components/ComponentMeta"
import componentSource from "dbui/components/ui/ai-gradient-icon?raw"

const meta: Meta = {
  title: "Components/Content/AI Gradient Icon",
  parameters: { layout: "padded" },
}

export default meta

export const Playground: StoryObj = {
  render: () => (
    <div className="flex max-w-[560px] flex-col gap-8">
      <section className="flex flex-col gap-2">
        <h3 className="type-label-bold text-text-base">Sizes</h3>
        <p className="type-hint text-text-subtle">
          The wrapper does not size the icon. Size it as you would any other.
        </p>
        <div className="flex items-end gap-4">
          <AiGradientIcon>
            <Sparkle />
          </AiGradientIcon>
          <AiGradientIcon>
            <Sparkle className="size-6" />
          </AiGradientIcon>
          <AiGradientIcon>
            <Sparkle className="size-12" />
          </AiGradientIcon>
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <h3 className="type-label-bold text-text-base">Other glyphs</h3>
        <p className="type-hint text-text-subtle">
          Any DBUI icon works — only the parts drawn with currentColor are repainted.
        </p>
        <div className="flex items-center gap-4">
          <AiGradientIcon>
            <SparkleDouble className="size-6" />
          </AiGradientIcon>
          <AiGradientIcon>
            <GenieCode className="size-6" />
          </AiGradientIcon>
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <h3 className="type-label-bold text-text-base">Inside a Button</h3>
        <p className="type-hint text-text-subtle">
          A starter prompt marks itself as Genie without the button becoming loud.
        </p>
        <div className="flex flex-wrap gap-2">
          {["Investigate", "Assign", "Fix"].map((label) => (
            <Button key={label} variant="secondary" size="md">
              <ButtonIcon>
                <AiGradientIcon>
                  <Sparkle />
                </AiGradientIcon>
              </ButtonIcon>
              {label}
            </Button>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <h3 className="type-label-bold text-text-base">Against a flat icon</h3>
        <p className="type-hint text-text-subtle">
          Left is the gradient, right is the same glyph on a text token. The
          gradient identifies; it is not a second way to colour an icon.
        </p>
        <div className="flex items-center gap-4">
          <AiGradientIcon>
            <Sparkle className="size-6" />
          </AiGradientIcon>
          <Sparkle className="size-6 text-text-subtle" />
        </div>
      </section>

      <ComponentMeta source={componentSource} componentKey="ai-gradient-icon" />
    </div>
  ),
}
