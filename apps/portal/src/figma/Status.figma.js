// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3174-4132
// source=apps/portal/src/components/ui/status.tsx
// component=Status
const figma = require('figma')
const instance = figma.selectedInstance

// ─── Size ───
const size = instance.getEnum('Size', {
  'sm': 'sm',
  'md': 'md',
})

// ─── Status ───
const status = instance.getEnum('Status', {
  'Online': 'online',
  'Ready': 'ready',
  'Offline': 'offline',
  'Pending': 'pending',
  'Running': 'running',
  'Syncing': 'syncing',
  'Canceled': 'canceled',
  'Stopped': 'stopped',
  'Info': 'info',
  'Success': 'success',
  'Warning': 'warning',
  'Error': 'error',
})

const sizeProp = size !== 'md' ? figma.tsx` size="${size}"` : ''

export default {
  example: figma.tsx`<Status status="${status}"${sizeProp} />`,
  imports: ['import { Status } from "@/components/ui/status"'],
  id: 'status',
  metadata: {
    nestable: false,
    props: { status, size }
  }
}
