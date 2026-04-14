// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3154-4736
// source=apps/portal/src/components/ui/card.tsx
// component=Card
const figma = require('figma')
const instance = figma.selectedInstance

// ─── Type ───
const type = instance.getEnum('Type', {
  'Post': 'post',
  'Asset Preview': 'asset-preview',
  'Source': 'source',
  'Asset Result': 'asset-result',
})

const typeProp = type !== 'post' ? figma.tsx` type="${type}"` : ''

export default {
  example: figma.tsx`<Card${typeProp}>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description text goes here.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content</p>
  </CardContent>
  <CardFooter>
    <p>Footer</p>
  </CardFooter>
</Card>`,
  imports: ['import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"'],
  id: 'card',
  metadata: {
    nestable: false,
    props: { type }
  }
}
