import figma from "@figma/code-connect"
import { PlatformHeader } from "../components/ui/platform-header"
import { PageHeader, PageHeaderTitle } from "../components/ui/page-header"

// Header — inner building block with Platform and Page variants
figma.connect(PlatformHeader, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=3247-5957", {
  props: {
    type: figma.enum("Type", {
      Platform: "platform",
      Page: "page",
    }),
  },
  example: ({ type }) => (
    type === "platform"
      ? <PlatformHeader />
      : <PageHeader><PageHeaderTitle>Page Title</PageHeaderTitle></PageHeader>
  ),
})
