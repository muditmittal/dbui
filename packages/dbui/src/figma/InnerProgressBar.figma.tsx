import figma from "@figma/code-connect"
import { Progress } from "../components/ui/progress"

// .ProgressBar — inner building block for Progress component (the visual bar)
// This is not a standalone component — use Progress instead
figma.connect(Progress, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=1060-3972", {
  example: () => (
    <Progress value={60} />
  ),
})
