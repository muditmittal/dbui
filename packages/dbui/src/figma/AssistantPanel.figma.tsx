import figma from "@figma/code-connect"

// Figma: Assistant Panel (Genie Code)
// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3567-1639

const AssistantPanel = ({onClose}: {onClose?: any}) => null

figma.connect(AssistantPanel, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3567-1639", {
  example: () => (
    <AssistantPanel onClose={() => {}} />
  ),
  imports: ["import { AssistantPanel } from 'dbui-shells/components/AssistantPanel'"],
})
