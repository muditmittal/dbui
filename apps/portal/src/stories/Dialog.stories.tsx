import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "dbui/components/ui/button"
import { CloseSmall } from "@/components/icons/CloseSmall"
import { ComponentMeta } from "./components/ComponentMeta"
import componentSource from "dbui/components/ui/dialog?raw"
import { ProductionMap } from "./components/ProductionMap"

const meta: Meta = {
  title: "Overlays/Dialog",
  parameters: { layout: "padded" },
}

export default meta

export const Playground: StoryObj = {
  render: () => (
    <div>
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Dialog</h2>

      {/* Static visual representation — not interactive */}
      <div
        className="w-[640px] rounded-md bg-surface-base shadow-lg ring-1 ring-foreground/10"
        style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" }}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-4 pt-4 pb-2">
          <div>
            <div className="text-[13px] font-semibold text-text-base">Dialog Title</div>
            <div className="text-[13px] text-text-subtle mt-0.5">This is a description of the dialog content.</div>
          </div>
          <button className="inline-flex size-6 items-center justify-center rounded-sm text-text-subtle hover:text-text-base">
            <CloseSmall />
          </button>
        </div>

        {/* Body */}
        <div className="px-4 py-4 text-[13px] text-text-subtle border-t border-border-base">
          Dialog body content goes here. This maps to the Figma .Slot inner component.
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-border-base">
          <Button variant="outline">Cancel</Button>
          <Button>Confirm</Button>
        </div>
      </div>


      <ComponentMeta source={componentSource} componentKey="dialog" />

      <ProductionMap componentKey="dialog" />
    </div>
  ),
}
