// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=766-671
// source=packages/dbui/src/components/ui/dropdown-menu.tsx
// component=.DropdownMenuItem
const figma = require('figma')
const instance = figma.selectedInstance

// ─── Type ───
const type = instance.getEnum('Type', {
  'Action': 'action',
  'SingleSelect': 'radio',
  'MultiSelect': 'checkbox',
  'Submenu': 'submenu',
  'Destructive': 'destructive',
})

// ─── State ───
const state = instance.getEnum('State', {
  'Default': undefined,
  'Hover': undefined,
  'Press': undefined,
  'Selected': 'selected',
  'Disabled': 'disabled',
})

// ─── Label from nested .MenuLabel ───
const menuLabel = instance.findInstance('.MenuLabel')
let label = 'Option'
if (menuLabel) {
  const labelText = menuLabel.findText('Label')
  if (labelText) label = labelText.textContent
}

// ─── Shortcut from nested .MenuTrailing ───
const menuTrailing = instance.findInstance('.MenuTrailing')
let shortcut = ''
if (menuTrailing) {
  const shortcutText = menuTrailing.findText('⌘K')
  if (shortcutText) shortcut = shortcutText.textContent
}

// ─── Build output per type ───
const disabledProp = state === 'disabled' ? ' disabled' : ''

if (type === 'action') {
  const shortcutSnippet = shortcut ? figma.tsx`
      <DropdownMenuShortcut>${shortcut}</DropdownMenuShortcut>` : ''
  export default {
    example: figma.tsx`<DropdownMenuItem${disabledProp}>
  ${label}${shortcutSnippet}
</DropdownMenuItem>`,
    imports: ['import { DropdownMenuItem, DropdownMenuShortcut } from "@/components/ui/dropdown-menu"'],
    id: 'dropdown-menu-item-action',
    metadata: { nestable: true }
  }
} else if (type === 'radio') {
  const checkedProp = state === 'selected' ? figma.tsx` checked` : ''
  export default {
    example: figma.tsx`<DropdownMenuRadioItem value="option"${checkedProp}${disabledProp}>
  ${label}
</DropdownMenuRadioItem>`,
    imports: ['import { DropdownMenuRadioItem } from "@/components/ui/dropdown-menu"'],
    id: 'dropdown-menu-item-radio',
    metadata: { nestable: true }
  }
} else if (type === 'checkbox') {
  const checkedProp = state === 'selected' ? ' checked' : ''
  export default {
    example: figma.tsx`<DropdownMenuCheckboxItem${checkedProp}${disabledProp}>
  ${label}
</DropdownMenuCheckboxItem>`,
    imports: ['import { DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu"'],
    id: 'dropdown-menu-item-checkbox',
    metadata: { nestable: true }
  }
} else if (type === 'submenu') {
  export default {
    example: figma.tsx`<DropdownMenuSub>
  <DropdownMenuSubTrigger${disabledProp}>${label}</DropdownMenuSubTrigger>
  <DropdownMenuSubContent>
    <DropdownMenuItem>Sub Item 1</DropdownMenuItem>
    <DropdownMenuItem>Sub Item 2</DropdownMenuItem>
  </DropdownMenuSubContent>
</DropdownMenuSub>`,
    imports: ['import { DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"'],
    id: 'dropdown-menu-item-submenu',
    metadata: { nestable: true }
  }
} else if (type === 'destructive') {
  export default {
    example: figma.tsx`<DropdownMenuItem variant="destructive"${disabledProp}>
  ${label}
</DropdownMenuItem>`,
    imports: ['import { DropdownMenuItem } from "@/components/ui/dropdown-menu"'],
    id: 'dropdown-menu-item-destructive',
    metadata: { nestable: true }
  }
}
