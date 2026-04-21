import figma from "@figma/code-connect"
import { Progress, ProgressLabel, ProgressValue } from "../components/ui/progress"

figma.connect(Progress, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3157-2839", {
  example: () => (
    <Progress value={60}>
      <ProgressLabel>Progress</ProgressLabel>
      <ProgressValue>{(formattedValue) => formattedValue}</ProgressValue>
    </Progress>
  ),
})
