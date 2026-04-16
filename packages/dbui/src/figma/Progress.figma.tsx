import figma from "@figma/code-connect"
import { Progress, ProgressTrack, ProgressIndicator, ProgressLabel, ProgressValue } from "../components/ui/progress"

figma.connect(Progress, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3157-2839", {
  example: () => (
    <Progress value={60}>
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
      <ProgressLabel>Progress</ProgressLabel>
      <ProgressValue>60%</ProgressValue>
    </Progress>
  ),
})
