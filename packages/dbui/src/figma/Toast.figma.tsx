import figma from "@figma/code-connect"

// The Toast (Sonner) component is a function call, not a React component.
// Code Connect maps the Figma Toast component to the toast() imperative API.
figma.connect(
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=968-944",
  {
    props: {
      type: figma.enum("Type", {
        Success: "success",
        Info: "info",
        Warning: "warning",
        Error: "error",
      }),
    },
    example: ({ type }) => {
      // @ts-expect-error — toast is called imperatively, not rendered as JSX
      toast[type]("Your message here")
    },
    imports: ['import { toast } from "sonner"'],
  }
)
