// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3157-2839
// source=packages/dbui/src/components/ui/progress.tsx
// component=Progress
const figma = require('figma')
const instance = figma.selectedInstance

export default {
  example: figma.tsx`<Progress value={60}>
  <ProgressTrack>
    <ProgressIndicator />
  </ProgressTrack>
  <ProgressLabel>Progress</ProgressLabel>
  <ProgressValue>60%</ProgressValue>
</Progress>`,
  imports: ['import { Progress, ProgressTrack, ProgressIndicator, ProgressLabel, ProgressValue } from "@/components/ui/progress"'],
  id: 'progress',
  metadata: {
    nestable: false,
  }
}
