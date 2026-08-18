import figma from "@figma/code-connect"
import { Dropzone } from "../components/ui/dropzone"

// `Dropzone` — 828×240, a dashed `action/primary/base` border around an Empty.
//
// This was the library's one Figma-only component: it existed in the design file
// with no React counterpart and no index row, which made it invisible to the
// React → Figma check as well — that walk only covers components the index knows
// about. A designer could specify it and nobody could build it.
//
// No properties on the Figma component, so nothing to map. The Figma frame's own
// child is named `EmptyMedia`, which is the clue that it was always meant to be
// built on `Empty` rather than beside it.
figma.connect(
  Dropzone,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3907-17740",
  {
    example: () => (
      <Dropzone
        hint="Upload up to 20,000 files (max size 5GB per file)"
        onFiles={(files) => console.log(files)}
      />
    ),
  }
)
