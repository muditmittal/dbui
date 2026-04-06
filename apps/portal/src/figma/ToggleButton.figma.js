// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=478-613
// source=apps/portal/src/components/ui/toggle.tsx
// component=Toggle
const figma = require('figma')
const instance = figma.selectedInstance

// ─── Variant ───
const variant = instance.getEnum('Variant', {
  'Default': 'default',
  'Outline': 'outline',
  'Button': 'button',
  'Icon': 'icon',
})

// ─── Size ───
// Icon variant uses icon sizes; others use label sizes.
const isIcon = variant === 'icon'
const size = instance.getEnum('Size', isIcon
  ? { 'Default': 'icon-md', 'Small': 'icon-sm' }
  : { 'Default': 'md', 'Small': 'sm' }
)

// ─── State ───
// Hover, Press, Focus are CSS-driven. Selected maps to defaultPressed prop.
const state = instance.getEnum('State', {
  'Default': undefined,
  'Hover': undefined,
  'Press': undefined,
  'Selected': 'selected',
  'Disabled': 'disabled',
})

// ─── Content from .Action Label ───
const actionLabel = instance.findInstance('.Action Label')
let label = ''
let iconCode

if (actionLabel && actionLabel.type === 'INSTANCE') {
  const labelText = actionLabel.findText('Label')
  if (labelText) {
    label = labelText.textContent
  }

  const showIcon = actionLabel.getBoolean('Show Icon')
  if (showIcon) {
    const icon = actionLabel.getInstanceSwap('Icon')
    if (icon && icon.type === 'INSTANCE' && icon.hasCodeConnect()) {
      iconCode = icon.executeTemplate().example
    }
  }
}

// ─── Build output ───
const variantProp = variant !== 'default' ? figma.tsx`variant="${variant}"` : ''
const sizeProp = size !== 'md' ? figma.tsx`size="${size}"` : ''
const pressedProp = state === 'selected' ? 'defaultPressed' : ''
const disabledProp = state === 'disabled' ? 'disabled' : ''

export default {
  example: figma.tsx`<Toggle${variantProp ? figma.tsx` ${variantProp}` : ''}${sizeProp ? figma.tsx` ${sizeProp}` : ''}${pressedProp ? ' defaultPressed' : ''}${disabledProp ? ' disabled' : ''}>${iconCode ? figma.tsx`${iconCode} ` : ''}${label}</Toggle>`,
  imports: ['import { Toggle } from "@/components/ui/toggle"'],
  id: 'toggle-button',
  metadata: {
    nestable: true,
    props: {
      variant,
      size,
    }
  }
}
