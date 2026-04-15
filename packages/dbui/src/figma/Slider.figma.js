// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=1039-2406
// source=packages/dbui/src/components/ui/slider.tsx
// component=Slider
const figma = require('figma')
const instance = figma.selectedInstance

// ─── State ───
// States (Hover, Press, Focus, Disabled) are CSS-driven in code, not props.
// Only Disabled maps to an HTML attribute.
const state = instance.getEnum('State', {
  'Default': undefined,
  'Hover': undefined,
  'Press': undefined,
  'Focus': undefined,
  'Disabled': 'disabled',
})

// ─── Build output ───
const disabledProp = state === 'disabled' ? ' disabled' : ''

export default {
  example: figma.tsx`<Slider defaultValue={[50]} min={0} max={100}${disabledProp} />`,
  imports: ['import { Slider } from "@/components/ui/slider"'],
  id: 'slider',
  metadata: {
    nestable: true,
  }
}
