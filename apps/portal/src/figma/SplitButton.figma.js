// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=580-527
// source=apps/portal/src/components/ui/button.tsx
// component=SplitButton (composition pattern)
const figma = require('figma')
const instance = figma.selectedInstance

// ─── Variant ───
const variant = instance.getEnum('Variant', {
  'Primary': 'default',
  'Outline': 'outline',
})

// ─── Size ───
const size = instance.getEnum('Size', {
  'Default': 'md',
  'Small': 'sm',
})

// Icon size maps
const iconSize = size === 'sm' ? 'icon-sm' : 'icon-md'

// ─── Label from nested Button > .Action Label ───
const buttonChild = instance.findInstance('Button')
let label = 'Label'
let iconCode

if (buttonChild && buttonChild.type === 'INSTANCE') {
  const actionLabel = buttonChild.findInstance('.Action Label')
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
}

// ─── Build output ───
// Split Button is a composition pattern, not a standalone component.
// It assembles Button + Separator + Icon Button in an overflow-clip container.
const variantProp = variant !== 'default' ? ` variant="${variant}"` : ''
const sizeProp = size !== 'md' ? ` size="${size}"` : ''

export default {
  example: figma.tsx`
<div className="inline-flex overflow-clip rounded-sm">
  <Button${variantProp}${sizeProp} className="rounded-r-none">
    ${iconCode ? figma.tsx`${iconCode} ` : ''}${label}
  </Button>
  <div className="${variant === 'outline' ? 'bg-border' : 'bg-primary-foreground/20'} w-px self-stretch" />
  <Button${variantProp} size="${iconSize}" className="rounded-l-none">
    <ChevronDownIcon />
  </Button>
</div>
  `,
  imports: [
    'import { Button } from "@/components/ui/button"',
    'import { ChevronDownIcon } from "lucide-react"',
  ],
  id: 'split-button',
  metadata: {
    nestable: false,
    props: {
      variant,
      size,
    }
  }
}
