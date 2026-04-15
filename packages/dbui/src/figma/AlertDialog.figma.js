// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=882-4236
// source=packages/dbui/src/components/ui/alert-dialog.tsx
// component=AlertDialog
const figma = require('figma')
const instance = figma.selectedInstance

// ─── Content ───
const body = instance.findInstance('.AlertDialogBody')
let title = 'Are you sure?'
let subtitle = ''

if (body) {
  const titleText = body.findText('Title')
  if (titleText) title = titleText.textContent

  const subtitleText = body.findText('Subtitle')
  if (subtitleText) subtitle = subtitleText.textContent
}

// ─── Build output ───
const descriptionLine = subtitle
  ? figma.tsx`\n        <AlertDialogDescription>${subtitle}</AlertDialogDescription>`
  : ''

export default {
  example: figma.tsx`<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">Open</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>${title}</AlertDialogTitle>${descriptionLine}
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Apply</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
  imports: [
    'import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"',
    'import { Button } from "@/components/ui/button"',
  ],
  id: 'alert-dialog',
  metadata: {
    nestable: false,
  }
}
