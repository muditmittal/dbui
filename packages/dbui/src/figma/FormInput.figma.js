// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3157-3399
// source=packages/dbui/src/components/ui/field.tsx
// component=Form Input (Field)
const figma = require('figma')
const instance = figma.selectedInstance

// ─── Type ───
const type = instance.getEnum('Type', {
  'Input': 'input',
  'Textarea': 'textarea',
  'Select': 'select',
  'Combobox': 'combobox',
  'Typeahead Combobox': 'typeahead',
})

// ─── Show (state) ───
const show = instance.getEnum('Show', {
  'Default': undefined,
  'Active': undefined,
  'Error': 'error',
})

// ─── Hint ───
const showHint = instance.getBoolean('Hint')

const errorAttr = show === 'error' ? figma.tsx` aria-invalid` : ''
const hintCode = showHint ? figma.tsx`\n  <p className="text-[12px] text-muted-foreground">Helper text</p>` : ''

const inputMap = {
  'input': figma.tsx`<Input placeholder="Enter value..."${errorAttr} />`,
  'textarea': figma.tsx`<Textarea placeholder="Enter value..."${errorAttr} />`,
  'select': figma.tsx`<Select>\n    <SelectTrigger${errorAttr}><SelectValue placeholder="Select..." /></SelectTrigger>\n  </Select>`,
  'combobox': figma.tsx`<Combobox>\n    <ComboboxInput placeholder="Search..."${errorAttr} />\n  </Combobox>`,
  'typeahead': figma.tsx`<Combobox>\n    <ComboboxInput placeholder="Type to search..."${errorAttr} />\n  </Combobox>`,
}

export default {
  example: figma.tsx`<div className="grid gap-2">
  <Label>Field label</Label>
  ${inputMap[type] || inputMap['input']}${hintCode}
</div>`,
  imports: [
    'import { Label } from "@/components/ui/label"',
    'import { Input } from "@/components/ui/input"',
  ],
  id: 'form-input',
  metadata: {
    nestable: false,
    props: { type, show }
  }
}
