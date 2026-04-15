// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3178-3973
// source=packages/dbui/src/components/ui/input-group.tsx
// component=Input Group
const figma = require('figma')
const instance = figma.selectedInstance

// ─── Type ───
const type = instance.getEnum('Type', {
  'Browse': 'browse',
  'Filter': 'filter',
})

// ─── Active ───
const active = instance.getEnum('Active', {
  'False': false,
  'True': true,
})

const suffix = type === 'browse'
  ? figma.tsx`\n  <InputGroupAddon align="inline-end">\n    <Button variant="ghost" size="sm">Browse</Button>\n  </InputGroupAddon>`
  : figma.tsx`\n  <InputGroupAddon align="inline-end">\n    <SlidersIcon />\n  </InputGroupAddon>`

export default {
  example: figma.tsx`<InputGroup>
  <InputGroupControl placeholder="Search..." />${suffix}
</InputGroup>`,
  imports: [
    'import { InputGroup, InputGroupControl, InputGroupAddon } from "@/components/ui/input-group"',
  ],
  id: 'input-group',
  metadata: {
    nestable: false,
    props: { type, active }
  }
}
