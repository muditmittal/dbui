// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=1060-3708
// source=apps/portal/src/components/ui/tooltip.tsx
// component=Tooltip
const figma = require('figma')
const instance = figma.selectedInstance

// ─── Content ───
const text = instance.findText('Tooltip text')
const content = text ? text.textContent : 'Tooltip text'

// ─── Build output ───
export default {
  example: figma.tsx`<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover me</TooltipTrigger>
    <TooltipContent>${content}</TooltipContent>
  </Tooltip>
</TooltipProvider>`,
  imports: ['import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"'],
  id: 'tooltip',
  metadata: {
    nestable: false,
  }
}
