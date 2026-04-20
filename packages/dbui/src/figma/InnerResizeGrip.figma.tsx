import figma from "@figma/code-connect"

// ResizeGrip — decorative drag handle for resizable panels
// This is a visual indicator only, not a standalone component
// Used inside resizable panel layouts
figma.connect("https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=684-1470", {
  example: () => (
    <>{/* ResizeGrip — decorative handle rendered by resizable panel components */}</>
  ),
})
