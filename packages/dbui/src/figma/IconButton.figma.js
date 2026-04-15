// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=566-534
// source=packages/dbui/src/components/ui/button.tsx
// component=Button
const figma = require('figma')
const instance = figma.selectedInstance

// ─── Variant ───
// Icon Button has 6 variants (no Link — icon-only link is not a valid pattern)
const variant = instance.getEnum('Variant', {
  'Primary': 'default',
  'Outline': 'outline',
  'Secondary': 'secondary',
  'Ghost': 'ghost',
  'Destructive': 'destructive',
  'Danger': 'danger',
})

// ─── Size ───
// Icon Button always uses icon sizes (Icon only is always true in Figma)
const size = instance.getEnum('Size', {
  'Default': 'icon-md',
  'Small': 'icon-sm',
})

// ─── State ───
// States are CSS-driven. Only Disabled maps to a code prop.
const state = instance.getEnum('State', {
  'Default': undefined,
  'Hover': undefined,
  'Press': undefined,
  'Focus': undefined,
  'Disabled': 'disabled',
})

// ─── Icon ───
// Icon Button contains a single icon instance (e.g. Plus)
// The icon is a direct child, not inside .Action Label
const iconInstance = instance.findInstance('Plus', { traverseInstances: true })
let iconCode
if (iconInstance && iconInstance.type === 'INSTANCE' && iconInstance.hasCodeConnect()) {
  iconCode = iconInstance.executeTemplate().example
}

// ─── Build output ───
const variantProp = variant !== 'default' ? figma.tsx`variant="${variant}"` : ''
const sizeProp = size !== 'icon-md' ? figma.tsx`size="${size}"` : ''
const disabledProp = state === 'disabled' ? 'disabled' : ''

export default {
  example: figma.tsx`<Button${variantProp ? figma.tsx` ${variantProp}` : ''} size="${size}"${disabledProp ? ' disabled' : ''}>${iconCode || figma.tsx`<PlusIcon />`}</Button>`,
  imports: ['import { Button } from "@/components/ui/button"'],
  id: 'icon-button',
  metadata: {
    nestable: true,
    props: {
      variant,
      size,
    }
  }
}
