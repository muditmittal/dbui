// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=882-2798
// source=apps/portal/src/components/ui/dialog.tsx
// component=Dialog
const figma = require('figma')
const instance = figma.selectedInstance

// ─── Content ───
const dialogBody = instance.findInstance('.DialogBody')
let title = 'Dialog title'
let subtitle = ''

if (dialogBody) {
  const header = dialogBody.findInstance('.DialogHeader')
  if (header) {
    const titleText = header.findText('Title')
    if (titleText) title = titleText.textContent

    const subtitleText = header.findText('Subtitle')
    if (subtitleText) subtitle = subtitleText.textContent
  }
}

// ─── Size from nested .DialogBody ───
let size = 'normal'
if (dialogBody) {
  const sizeEnum = dialogBody.getEnum('Size', {
    'Normal · 640px': 'normal',
    'Wide · 880px': 'wide',
    'Extrawide · 1200px': 'extrawide',
  })
  if (sizeEnum) size = sizeEnum
}

// ─── Build output ───
const sizeProp = size !== 'normal' ? figma.tsx` size="${size}"` : ''
const descriptionLine = subtitle
  ? figma.tsx`\n        <DialogDescription>${subtitle}</DialogDescription>`
  : ''

export default {
  example: figma.tsx`<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open Dialog</Button>
  </DialogTrigger>
  <DialogContent${sizeProp}>
    <DialogHeader>
      <DialogTitle>${title}</DialogTitle>${descriptionLine}
    </DialogHeader>
    <div>{/* content */}</div>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button>Apply</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
  imports: [
    'import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"',
    'import { Button } from "@/components/ui/button"',
  ],
  id: 'dialog',
  metadata: {
    nestable: false,
  }
}
