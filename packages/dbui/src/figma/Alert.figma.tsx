import figma from "@figma/code-connect"
import { Alert, AlertTitle, AlertDescription } from "../components/ui/alert"

figma.connect(
  Alert,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=949-962",
  {
    props: {
      variant: figma.enum("Variant", {
        Danger: "destructive",
        Warning: "warning",
        Info: "info",
        Success: "success",
      }),
    },
    example: ({ variant }) => (
      <Alert variant={variant}>
        <AlertTitle>Heading</AlertTitle>
        <AlertDescription>Description text goes here.</AlertDescription>
      </Alert>
    ),
  }
)
