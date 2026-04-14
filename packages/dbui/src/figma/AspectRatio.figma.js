// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3178-2833
// source=apps/portal/src/components/ui/aspect-ratio.tsx
// component=Aspect Ratio
const figma = require('figma')
const instance = figma.selectedInstance

// ─── Ratio ───
const ratio = instance.getEnum('Aspect ratio', {
  '1:1': 1,
  '5:4': 5/4,
  '4:3': 4/3,
  '3:2': 3/2,
  'Golden ratio': 1.618,
  '16:9': 16/9,
})

export default {
  example: figma.tsx`<AspectRatio ratio={${ratio}}>
  <img src="/placeholder.jpg" alt="Image" className="size-full rounded-lg object-cover" />
</AspectRatio>`,
  imports: ['import { AspectRatio } from "@/components/ui/aspect-ratio"'],
  id: 'aspect-ratio',
  metadata: {
    nestable: false,
    props: { ratio }
  }
}
