// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=477-773
// source=apps/portal/src/components/ui/button.tsx
// component=Button
const figma = require('figma')
const instance = figma.selectedInstance

// ─── Variant ───
const variant = instance.getEnum('Variant', {
  'Primary': 'default',
  'Outline': 'outline',
  'Secondary': 'secondary',
  'Ghost': 'ghost',
  'Link': 'link',
  'Destructive': 'destructive',
  'Danger': 'danger',
})

// ─── Size ───
// Button always uses label sizes. Icon sizes are handled by IconButton.figma.js.
const size = instance.getEnum('Size', {
  'Default': 'md',
  'Small': 'sm',
})

// ─── State ───
// States (Hover, Press, Focus, Disabled, Loading) are CSS-driven in code, not props.
// We only surface Disabled since it's an HTML attribute.
const state = instance.getEnum('State', {
  'Default': undefined,
  'Hover': undefined,
  'Press': undefined,
  'Focus': undefined,
  'Disabled': 'disabled',
  'Loading': undefined,
})

// ─── Content from .Action Label ───
const actionLabel = instance.findInstance('.Action Label')
let label = ''
let iconCode
let menuCode

if (actionLabel && actionLabel.type === 'INSTANCE') {
  // Label text
  const labelText = actionLabel.findText('Label')
  if (labelText) {
    label = labelText.textContent
  }

  // Prefix icon
  const showIcon = actionLabel.getBoolean('Show Icon')
  if (showIcon) {
    const icon = actionLabel.getInstanceSwap('Icon')
    if (icon && icon.type === 'INSTANCE' && icon.hasCodeConnect()) {
      iconCode = icon.executeTemplate().example
    }
  }

  // Suffix icon (menu chevron)
  const showMenu = actionLabel.getBoolean('Show Menu')
  if (showMenu) {
    const menu = actionLabel.getInstanceSwap('Menu')
    if (menu && menu.type === 'INSTANCE' && menu.hasCodeConnect()) {
      menuCode = menu.executeTemplate().example
    }
  }
}

// ─── Build output ───
const variantProp = variant !== 'default' ? figma.tsx`variant="${variant}"` : ''
const sizeProp = size !== 'md' ? figma.tsx`size="${size}"` : ''
const disabledProp = state === 'disabled' ? 'disabled' : ''

export default {
  example: figma.tsx`<Button${variantProp ? figma.tsx` ${variantProp}` : ''}${sizeProp ? figma.tsx` ${sizeProp}` : ''}${disabledProp ? ' disabled' : ''}>${iconCode ? figma.tsx`${iconCode} ` : ''}${label}${menuCode ? figma.tsx` ${menuCode}` : ''}</Button>`,
  imports: ['import { Button } from "@/components/ui/button"'],
  id: 'button',
  metadata: {
    nestable: true,
    props: {
      variant,
      size,
    }
  }
}
