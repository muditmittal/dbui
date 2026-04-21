import figma from "@figma/code-connect"
import { Alert, AlertIcon, AlertContent, AlertTitle, AlertDescription, AlertClose } from "../components/ui/alert"
import { InfoFill } from "../components/icons/InfoFill"

figma.connect(
  Alert,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=949-962",
  {
    props: {
      variant: figma.enum("Variant", {
        Danger: "danger",
        Warning: "warning",
        Info: "info",
        Success: "success",
      }),
      // Layout is structural — shown in example but not a code prop (handled by content composition)
      closeButton: figma.boolean("Removable", { true: <AlertClose />, false: <></> }),
    },
    example: ({ variant, closeButton }) => (
      <Alert variant={variant}>
        <AlertIcon><InfoFill /></AlertIcon>
        <AlertContent>
          <AlertTitle>Alert title</AlertTitle>
          <AlertDescription>Alert description</AlertDescription>
        </AlertContent>
        {closeButton}
      </Alert>
    ),
  }
)
