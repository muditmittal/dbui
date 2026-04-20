import figma from "@figma/code-connect"
import { Input } from "../components/ui/input"

// .Cursor — inner building block for text inputs (blinking caret)
// This is not a standalone component — it's part of Input, Textarea, Combobox
figma.connect(Input, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=3175-4575", {
  example: () => (
    <Input placeholder="Text input with cursor" />
  ),
})
